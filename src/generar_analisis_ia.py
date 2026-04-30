from __future__ import annotations

import csv
import json
import unicodedata
from collections import Counter
from dataclasses import dataclass
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[1]
CLEAN_DIR = BASE_DIR / "data" / "clean"
OUTPUT_PATH = BASE_DIR / "web" / "src" / "data" / "aiReports.ts"


def fix_text(value: str) -> str:
    text = (value or "").strip()
    if not text:
        return ""

    try:
        text = text.encode("latin1").decode("utf-8")
    except UnicodeError:
        pass

    text = unicodedata.normalize("NFKD", text)
    text = "".join(character for character in text if not unicodedata.combining(character))
    return text


def format_int_es(value: int) -> str:
    return f"{value:,}".replace(",", ".")


def format_int_en(value: int) -> str:
    return f"{value:,}"


def format_pct(value: float) -> str:
    return f"{value:.1f}%"


def format_month(value: int) -> str:
    return f"{value:02d}"


def translate_common_en(value: str) -> str:
    translations = {
        "MASCULINO": "male",
        "FEMENINO": "female",
        "ADULTOS": "adults",
        "MENORES": "minors",
        "ADOLESCENTES": "adolescents",
        "URBANA": "urban",
        "RURAL": "rural",
        "NO REPORTADA": "not reported",
        "NO REPORTADO": "not reported",
        "ARMA DE FUEGO": "firearm",
        "ARMA BLANCA / CORTOPUNZANTE": "sharp weapon",
        "ARTICULO 239. HURTO MOTOCICLETAS": "article 239. motorcycle theft",
        "ARTICULO 239. HURTO AUTOMOTORES": "article 239. motor vehicle theft",
    }
    return translations.get(value, value.title())


@dataclass(frozen=True)
class DatasetStats:
    rows: int
    total: int
    start_date: str
    end_date: str
    by_year: Counter[int]
    by_month: Counter[int]
    departments: Counter[str]
    municipalities: Counter[str]
    primary: Counter[str]
    secondary: Counter[str]
    tertiary: Counter[str]


def read_dataset(
    file_name: str,
    primary_column: str,
    secondary_column: str,
    tertiary_column: str,
) -> DatasetStats:
    rows = 0
    total = 0
    dates: list[str] = []
    by_year: Counter[int] = Counter()
    by_month: Counter[int] = Counter()
    departments: Counter[str] = Counter()
    municipalities: Counter[str] = Counter()
    primary: Counter[str] = Counter()
    secondary: Counter[str] = Counter()
    tertiary: Counter[str] = Counter()

    with (CLEAN_DIR / file_name).open(encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        for row in reader:
            rows += 1
            quantity = int(row["cantidad"])
            total += quantity

            current_date = row["FECHA"]
            dates.append(current_date)
            year = int(row["ANO"])
            month = int(row["MES"])
            by_year[year] += quantity
            by_month[month] += quantity

            departments[fix_text(row["departamento"])] += quantity
            municipalities[fix_text(row["municipio"])] += quantity
            primary[fix_text(row[primary_column])] += quantity
            secondary[fix_text(row[secondary_column])] += quantity
            tertiary[fix_text(row[tertiary_column])] += quantity

    return DatasetStats(
        rows=rows,
        total=total,
        start_date=min(dates),
        end_date=max(dates),
        by_year=by_year,
        by_month=by_month,
        departments=departments,
        municipalities=municipalities,
        primary=primary,
        secondary=secondary,
        tertiary=tertiary,
    )


def top_share(counter: Counter[str], total: int) -> tuple[str, int, str]:
    label, value = counter.most_common(1)[0]
    return label, value, format_pct(value / total * 100)


def top_five_share(counter: Counter[str], total: int) -> str:
    total_top_five = sum(value for _, value in counter.most_common(5))
    return format_pct(total_top_five / total * 100)


def build_homicidios_report() -> tuple[dict[str, object], dict[str, object]]:
    stats = read_dataset("homicidios.csv", "arma_medio", "_modalidad_presunta", "sexo")
    top_department, top_department_value, top_department_share = top_share(
        stats.departments, stats.total
    )
    top_municipality, top_municipality_value, top_municipality_share = top_share(
        stats.municipalities, stats.total
    )
    top_weapon, top_weapon_value, top_weapon_share = top_share(stats.primary, stats.total)
    top_modality, _, top_modality_share = top_share(stats.secondary, stats.total)
    top_sex, _, top_sex_share = top_share(stats.tertiary, stats.total)
    urban_share = format_pct(stats.by_year.total() and (stats.secondary.total() or 0))

    zone_counter = Counter()
    with (CLEAN_DIR / "homicidios.csv").open(encoding="utf-8", newline="") as handle:
        for row in csv.DictReader(handle):
            zone_counter[fix_text(row["zona"])] += int(row["cantidad"])
    top_zone, _, top_zone_share = top_share(zone_counter, stats.total)

    top_year, top_year_value = stats.by_year.most_common(1)[0]
    peak_month, peak_month_value = stats.by_month.most_common(1)[0]
    top_five_departments_share = top_five_share(stats.departments, stats.total)

    es = {
        "summary": (
            f"La lectura asistida sobre homicidios muestra {format_int_es(stats.total)} casos "
            f"acumulados en {format_int_es(stats.rows)} registros, con corte entre {stats.start_date} "
            f"y {stats.end_date}. El patron dominante combina {top_weapon.lower()} "
            f"({top_weapon_share}), concentracion territorial en {top_department.title()} "
            f"({top_department_share}) y una victimizacion principalmente {top_sex.lower()} "
            f"({top_sex_share})."
        ),
        "metrics": [
            {"label": "Cobertura temporal", "value": f"{stats.start_date} a {stats.end_date}"},
            {"label": "Foco principal", "value": f"{top_department.title()} {top_department_share}"},
            {"label": "Patron dominante", "value": f"{top_weapon.title()} {top_weapon_share}"},
        ],
        "findings": [
            {
                "title": "Concentracion territorial",
                "description": (
                    f"{top_department.title()} aporta {top_department_share} del total y los cinco "
                    f"primeros departamentos concentran {top_five_departments_share}. "
                    f"{top_municipality.title()} lidera a nivel municipal con "
                    f"{format_int_es(top_municipality_value)} casos ({top_municipality_share})."
                ),
            },
            {
                "title": "Patron operativo dominante",
                "description": (
                    f"{top_weapon.title()} explica {top_weapon_share} de los casos y la ocurrencia "
                    f"se inclina hacia zona {top_zone.lower()} ({top_zone_share}). El mes de mayor "
                    f"peso en el corte fue {format_month(peak_month)} con {format_int_es(peak_month_value)} casos."
                ),
            },
            {
                "title": "Brecha de caracterizacion",
                "description": (
                    f"La modalidad {top_modality.lower()} representa {top_modality_share}, lo que "
                    "reduce el nivel de detalle disponible para interpretar motivaciones y dinamicas del hecho."
                ),
            },
        ],
        "actions": [
            {
                "title": "Priorizar focos territoriales",
                "description": (
                    f"Antioquia, Valle del Cauca y Bogota D.C. aparecen como el nucleo mas fuerte del corte, "
                    "por lo que conviene enfocar comparacion operativa y seguimiento mensual en esos territorios."
                ),
            },
            {
                "title": "Mejorar completitud del registro",
                "description": (
                    "La modalidad reportada necesita mayor completitud para enriquecer la lectura de homicidios, "
                    "especialmente si se quiere cruzar con arma, zona y perfil de victima."
                ),
            },
        ],
        "coverageNote": (
            f"Base IA: {format_int_es(stats.rows)} registros y {format_int_es(stats.total)} casos. "
            f"El corte disponible se concentra en {top_year} y alcanza su mayor volumen mensual en {format_month(peak_month)}."
        ),
    }

    en = {
        "summary": (
            f"The assisted reading for homicides shows {format_int_en(stats.total)} accumulated cases "
            f"across {format_int_en(stats.rows)} records, covering {stats.start_date} to {stats.end_date}. "
            f"The dominant pattern combines {translate_common_en(top_weapon)} ({top_weapon_share}), territorial concentration "
            f"in {top_department.title()} ({top_department_share}) and mainly {translate_common_en(top_sex)} victims ({top_sex_share})."
        ),
        "metrics": [
            {"label": "Time coverage", "value": f"{stats.start_date} to {stats.end_date}"},
            {"label": "Main hotspot", "value": f"{top_department.title()} {top_department_share}"},
            {"label": "Dominant pattern", "value": f"{translate_common_en(top_weapon).title()} {top_weapon_share}"},
        ],
        "findings": [
            {
                "title": "Territorial concentration",
                "description": (
                    f"{top_department.title()} contributes {top_department_share} of the total and the top "
                    f"five departments account for {top_five_departments_share}. {top_municipality.title()} "
                    f"leads at municipality level with {format_int_en(top_municipality_value)} cases "
                    f"({top_municipality_share})."
                ),
            },
            {
                "title": "Dominant operational pattern",
                "description": (
                    f"{translate_common_en(top_weapon).title()} explains {top_weapon_share} of cases and the events lean toward "
                    f"{translate_common_en(top_zone)} areas ({top_zone_share}). The heaviest month in the cut was "
                    f"{format_month(peak_month)} with {format_int_en(peak_month_value)} cases."
                ),
            },
            {
                "title": "Characterization gap",
                "description": (
                    f"{translate_common_en(top_modality).title()} represents {top_modality_share}, reducing the detail available "
                    "to interpret motivations and operational dynamics behind the events."
                ),
            },
        ],
        "actions": [
            {
                "title": "Prioritize territorial hotspots",
                "description": (
                    "Antioquia, Valle del Cauca and Bogota D.C. form the strongest cluster in the cut, "
                    "so they should be the first comparison axis for operational review and follow-up."
                ),
            },
            {
                "title": "Improve field completeness",
                "description": (
                    "Reported modality needs better completion to enrich homicide interpretation, "
                    "especially when crossing weapon, area and victim profile."
                ),
            },
        ],
        "coverageNote": (
            f"AI base: {format_int_en(stats.rows)} records and {format_int_en(stats.total)} cases. "
            f"The available cut is concentrated in {top_year} and reaches its highest monthly volume in {format_month(peak_month)}."
        ),
    }
    return es, en


def build_delitos_report() -> tuple[dict[str, object], dict[str, object]]:
    stats = read_dataset("delitos_sexuales.csv", "delito", "genero", "grupo_etario")
    top_department, top_department_value, top_department_share = top_share(
        stats.departments, stats.total
    )
    top_municipality, top_municipality_value, top_municipality_share = top_share(
        stats.municipalities, stats.total
    )
    top_offense, _, top_offense_share = top_share(stats.primary, stats.total)
    top_gender, _, top_gender_share = top_share(stats.secondary, stats.total)
    top_age_group, _, top_age_group_share = top_share(stats.tertiary, stats.total)
    top_year, top_year_value = stats.by_year.most_common(1)[0]
    peak_month, peak_month_value = stats.by_month.most_common(1)[0]
    top_five_departments_share = top_five_share(stats.departments, stats.total)

    age_counter = Counter()
    weapons_counter = Counter()
    with (CLEAN_DIR / "delitos_sexuales.csv").open(encoding="utf-8", newline="") as handle:
        for row in csv.DictReader(handle):
            quantity = int(row["cantidad"])
            age_counter[fix_text(row["grupo_etario"])] += quantity
            weapons_counter[fix_text(row["armas_medios"])] += quantity

    minors_and_teens = age_counter["MENORES"] + age_counter["ADOLESCENTES"]
    minors_and_teens_share = format_pct(minors_and_teens / stats.total * 100)
    no_weapon_report_share = format_pct(
        weapons_counter["NO REPORTADO"] / stats.total * 100
    )

    es = {
        "summary": (
            f"La lectura asistida de delitos sexuales identifica {format_int_es(stats.total)} casos en "
            f"{format_int_es(stats.rows)} registros entre {stats.start_date} y {stats.end_date}. "
            f"El pico se ubica en {top_year} con {format_int_es(top_year_value)} casos, con mayor peso "
            f"territorial en {top_department.title()} ({top_department_share}) y una victimizacion "
            f"principalmente {top_gender.lower()} ({top_gender_share})."
        ),
        "metrics": [
            {"label": "Cobertura temporal", "value": f"{stats.start_date} a {stats.end_date}"},
            {"label": "Foco principal", "value": f"{top_department.title()} {top_department_share}"},
            {"label": "Delito dominante", "value": f"{top_offense_share} del total"},
        ],
        "findings": [
            {
                "title": "Concentracion temporal y territorial",
                "description": (
                    f"El ano {top_year} concentra {format_pct(top_year_value / stats.total * 100)} del total. "
                    f"{top_department.title()} lidera con {format_int_es(top_department_value)} casos "
                    f"({top_department_share}) y {top_municipality.title()} concentra por si sola {top_municipality_share}."
                ),
            },
            {
                "title": "Perfil de victimizacion",
                "description": (
                    f"{top_gender.title()} representa {top_gender_share} y el grupo {top_age_group.lower()} "
                    f"aporta {top_age_group_share}. Si se agrupan menores y adolescentes, el peso conjunto llega a "
                    f"{minors_and_teens_share}, lo que exige lectura diferenciada por ciclo de vida."
                ),
            },
            {
                "title": "Limite de calidad del registro",
                "description": (
                    f"La variable armas o medios aparece como no reportada en {no_weapon_report_share} de la base, "
                    "por lo que la explicacion contextual del hecho depende mas del tipo penal y del perfil territorial."
                ),
            },
        ],
        "actions": [
            {
                "title": "Focalizar seguimiento territorial",
                "description": (
                    "Bogota, Valle y Santander deben ser el primer eje de seguimiento comparado por volumen y persistencia del registro."
                ),
            },
            {
                "title": "Separar lineas de atencion por edad",
                "description": (
                    "La mezcla entre adultos, menores y adolescentes sugiere construir consultas y alertas separadas para evitar lecturas planas."
                ),
            },
        ],
        "coverageNote": (
            f"Base IA: {format_int_es(stats.rows)} registros y {format_int_es(stats.total)} casos. "
            f"El mes de mayor carga fue {format_month(peak_month)} con {format_int_es(peak_month_value)} casos."
        ),
    }

    en = {
        "summary": (
            f"The assisted reading for sexual crimes identifies {format_int_en(stats.total)} cases across "
            f"{format_int_en(stats.rows)} records between {stats.start_date} and {stats.end_date}. "
            f"The peak occurs in {top_year} with {format_int_en(top_year_value)} cases, with the strongest "
            f"territorial weight in {top_department.title()} ({top_department_share}) and mainly "
            f"{translate_common_en(top_gender)} victims ({top_gender_share})."
        ),
        "metrics": [
            {"label": "Time coverage", "value": f"{stats.start_date} to {stats.end_date}"},
            {"label": "Main hotspot", "value": f"{top_department.title()} {top_department_share}"},
            {"label": "Dominant offense", "value": f"{top_offense_share} of the total"},
        ],
        "findings": [
            {
                "title": "Temporal and territorial concentration",
                "description": (
                    f"The year {top_year} concentrates {format_pct(top_year_value / stats.total * 100)} of the total. "
                    f"{top_department.title()} leads with {format_int_en(top_department_value)} cases "
                    f"({top_department_share}) and {top_municipality.title()} alone accounts for {top_municipality_share}."
                ),
            },
            {
                "title": "Victim profile",
                "description": (
                    f"{translate_common_en(top_gender).title()} accounts for {top_gender_share} and the {translate_common_en(top_age_group)} group "
                    f"adds {top_age_group_share}. When minors and teenagers are combined, their joint weight reaches "
                    f"{minors_and_teens_share}, which calls for age-specific interpretation."
                ),
            },
            {
                "title": "Data quality limit",
                "description": (
                    f"The weapons or methods field is not reported in {no_weapon_report_share} of the dataset, "
                    "so contextual interpretation depends more on offense type and territorial profile."
                ),
            },
        ],
        "actions": [
            {
                "title": "Focus territorial monitoring",
                "description": (
                    "Bogota, Valle and Santander should be the first comparison axis because of their weight and persistence in the records."
                ),
            },
            {
                "title": "Separate response lines by age",
                "description": (
                    "The mix of adults, minors and teenagers suggests building separate alerts and queries to avoid flat interpretation."
                ),
            },
        ],
        "coverageNote": (
            f"AI base: {format_int_en(stats.rows)} records and {format_int_en(stats.total)} cases. "
            f"The heaviest month was {format_month(peak_month)} with {format_int_en(peak_month_value)} cases."
        ),
    }
    return es, en


def build_hurtos_report() -> tuple[dict[str, object], dict[str, object]]:
    stats = read_dataset("hurtos_personas.csv", "tipo_de_hurto", "genero", "grupo_etario")
    top_department, top_department_value, top_department_share = top_share(
        stats.departments, stats.total
    )
    top_municipality, top_municipality_value, top_municipality_share = top_share(
        stats.municipalities, stats.total
    )
    top_theft_type, top_theft_value, top_theft_share = top_share(stats.primary, stats.total)
    top_gender, _, top_gender_share = top_share(stats.secondary, stats.total)
    top_age_group, _, top_age_group_share = top_share(stats.tertiary, stats.total)
    top_year, top_year_value = stats.by_year.most_common(1)[0]
    peak_month, peak_month_value = stats.by_month.most_common(1)[0]
    top_five_departments_share = top_five_share(stats.departments, stats.total)

    weapons_counter = Counter()
    with (CLEAN_DIR / "hurtos_personas.csv").open(encoding="utf-8", newline="") as handle:
        for row in csv.DictReader(handle):
            weapons_counter[fix_text(row["armas_medios"])] += int(row["cantidad"])

    top_weapon, _, top_weapon_share = top_share(weapons_counter, stats.total)
    years_2023_2025 = sum(stats.by_year[year] for year in (2023, 2024, 2025))
    years_2023_2025_share = format_pct(years_2023_2025 / stats.total * 100)

    es = {
        "summary": (
            f"La lectura asistida de hurtos de vehiculos registra {format_int_es(stats.total)} casos en "
            f"{format_int_es(stats.rows)} eventos entre {stats.start_date} y {stats.end_date}. "
            f"El mayor volumen aparece en {top_year} con {format_int_es(top_year_value)} casos, con foco "
            f"territorial en {top_department.title()} ({top_department_share}) y dominio claro del "
            f"{top_theft_type.lower()} ({top_theft_share})."
        ),
        "metrics": [
            {"label": "Cobertura temporal", "value": f"{stats.start_date} a {stats.end_date}"},
            {"label": "Foco principal", "value": f"{top_department.title()} {top_department_share}"},
            {"label": "Modalidad dominante", "value": f"{top_theft_type.title()} {top_theft_share}"},
        ],
        "findings": [
            {
                "title": "Escalada reciente del registro",
                "description": (
                    f"El bloque 2023-2025 concentra {years_2023_2025_share} del total y {top_year} marca el punto "
                    f"mas alto con {format_int_es(top_year_value)} casos. El corte 2026 llega hasta {stats.end_date}, "
                    "por lo que debe leerse como periodo parcial."
                ),
            },
            {
                "title": "Patron operativo dominante",
                "description": (
                    f"{top_theft_type.title()} explica {top_theft_share} de la base. El registro aparece "
                    f"principalmente en {top_gender.lower()} ({top_gender_share}) y en el grupo {top_age_group.lower()} "
                    f"({top_age_group_share})."
                ),
            },
            {
                "title": "Focos y condicion del hecho",
                "description": (
                    f"{top_department.title()}, Bogota y Valle concentran una parte importante del volumen, mientras "
                    f"{top_municipality.title()} lidera a nivel municipal con {format_int_es(top_municipality_value)} casos "
                    f"({top_municipality_share}). En la variable de armas o medios domina {top_weapon.lower()} ({top_weapon_share})."
                ),
            },
        ],
        "actions": [
            {
                "title": "Seguir la ventana 2023-2025",
                "description": (
                    "Ese tramo concentra la mayor presion reciente y sirve como base para contrastar comportamiento por ciudad y tipo de hurto."
                ),
            },
            {
                "title": "Separar motocicletas y automotores",
                "description": (
                    "La predominancia de hurto a motocicletas aconseja indicadores y alertas propios para no mezclar dinamicas con automotores."
                ),
            },
        ],
        "coverageNote": (
            f"Base IA: {format_int_es(stats.rows)} registros y {format_int_es(stats.total)} casos. "
            f"Los cinco primeros departamentos concentran {top_five_departments_share} y el mes de mayor carga fue {format_month(peak_month)}."
        ),
    }

    en = {
        "summary": (
            f"The assisted reading for vehicle theft records {format_int_en(stats.total)} cases across "
            f"{format_int_en(stats.rows)} events between {stats.start_date} and {stats.end_date}. "
            f"The highest volume appears in {top_year} with {format_int_en(top_year_value)} cases, with territorial "
            f"focus in {top_department.title()} ({top_department_share}) and a clear dominance of "
            f"{translate_common_en(top_theft_type)} ({top_theft_share})."
        ),
        "metrics": [
            {"label": "Time coverage", "value": f"{stats.start_date} to {stats.end_date}"},
            {"label": "Main hotspot", "value": f"{top_department.title()} {top_department_share}"},
            {"label": "Dominant modality", "value": f"{translate_common_en(top_theft_type).title()} {top_theft_share}"},
        ],
        "findings": [
            {
                "title": "Recent rise in records",
                "description": (
                    f"The 2023-2025 block concentrates {years_2023_2025_share} of the total and {top_year} marks "
                    f"the highest point with {format_int_en(top_year_value)} cases. The 2026 cut reaches {stats.end_date}, "
                    "so it should be treated as a partial period."
                ),
            },
            {
                "title": "Dominant operational pattern",
                "description": (
                    f"{translate_common_en(top_theft_type).title()} explains {top_theft_share} of the dataset. The record is mainly found in "
                    f"{translate_common_en(top_gender)} victims ({top_gender_share}) and in the {translate_common_en(top_age_group)} group "
                    f"({top_age_group_share})."
                ),
            },
            {
                "title": "Hotspots and event condition",
                "description": (
                    f"{top_department.title()}, Bogota and Valle hold a large share of the volume, while "
                    f"{top_municipality.title()} leads at municipality level with {format_int_en(top_municipality_value)} cases "
                    f"({top_municipality_share}). The weapons or methods field is dominated by {translate_common_en(top_weapon)} ({top_weapon_share})."
                ),
            },
        ],
        "actions": [
            {
                "title": "Track the 2023-2025 window",
                "description": (
                    "That period concentrates the strongest recent pressure and is the best baseline for comparisons by city and theft type."
                ),
            },
            {
                "title": "Separate motorcycles from automobiles",
                "description": (
                    "The dominance of motorcycle theft supports dedicated indicators and alerts instead of mixing the pattern with automobiles."
                ),
            },
        ],
        "coverageNote": (
            f"AI base: {format_int_en(stats.rows)} records and {format_int_en(stats.total)} cases. "
            f"The top five departments account for {top_five_departments_share} and the heaviest month was {format_month(peak_month)}."
        ),
    }
    return es, en


def build_reports() -> dict[str, dict[str, object]]:
    homicidios_es, homicidios_en = build_homicidios_report()
    sexuales_es, sexuales_en = build_delitos_report()
    hurtos_es, hurtos_en = build_hurtos_report()

    return {
        "es": {
            "homicidios": homicidios_es,
            "sexuales": sexuales_es,
            "hurtos": hurtos_es,
        },
        "en": {
            "homicidios": homicidios_en,
            "sexuales": sexuales_en,
            "hurtos": hurtos_en,
        },
    }


def main() -> None:
    data = build_reports()
    content = """import { Language } from "../context/UiContext";

export type AiReportMetric = {
  label: string;
  value: string;
};

export type AiReportItem = {
  title: string;
  description: string;
};

export type AiReport = {
  summary: string;
  metrics: AiReportMetric[];
  findings: AiReportItem[];
  actions: AiReportItem[];
  coverageNote: string;
};

type DashboardAiKey = "homicidios" | "sexuales" | "hurtos";

const aiReports: Record<Language, Record<DashboardAiKey, AiReport>> = """
    content += json.dumps(data, ensure_ascii=True, indent=2)
    content += """ as Record<Language, Record<DashboardAiKey, AiReport>>;

export function getAiReport(language: Language, key: DashboardAiKey): AiReport {
  return aiReports[language][key];
}
"""

    OUTPUT_PATH.write_text(content, encoding="utf-8")
    print(f"CORRECTO: analisis IA generado en {OUTPUT_PATH.relative_to(BASE_DIR)}")


if __name__ == "__main__":
    main()
