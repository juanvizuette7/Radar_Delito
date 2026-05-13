from __future__ import annotations

import csv
import json
import unicodedata
from collections import Counter
from dataclasses import dataclass
from datetime import datetime
from math import ceil, floor
from pathlib import Path
from statistics import mean


BASE_DIR = Path(__file__).resolve().parents[1]
CLEAN_DIR = BASE_DIR / "data" / "clean"
OUTPUT_PATH = BASE_DIR / "web" / "src" / "data" / "aiReports.ts"


@dataclass(frozen=True)
class DatasetConfig:
    key: str
    file_name: str
    primary_field: str
    secondary_field: str
    tertiary_field: str
    quaternary_field: str
    factor_label_es: str
    factor_label_en: str


@dataclass(frozen=True)
class DatasetStats:
    rows_count: int
    total: int
    start_date: str
    end_date: str
    by_year: Counter[int]
    by_period: Counter[str]
    departments: Counter[str]
    municipalities: Counter[str]
    primary: Counter[str]
    secondary: Counter[str]
    tertiary: Counter[str]
    quaternary: Counter[str]


CONFIGS: dict[str, DatasetConfig] = {
    "homicidios": DatasetConfig(
        key="homicidios",
        file_name="homicidios_clean.csv",
        primary_field="arma_medio",
        secondary_field="_modalidad_presunta",
        tertiary_field="sexo",
        quaternary_field="zona",
        factor_label_es="Arma dominante",
        factor_label_en="Dominant weapon",
    ),
    "sexuales": DatasetConfig(
        key="sexuales",
        file_name="delitos_sexuales_clean.csv",
        primary_field="delito",
        secondary_field="genero",
        tertiary_field="grupo_etario",
        quaternary_field="armas_medios",
        factor_label_es="Delito dominante",
        factor_label_en="Dominant offense",
    ),
    "hurtos": DatasetConfig(
        key="hurtos",
        file_name="hurtos_personas_clean.csv",
        primary_field="tipo_de_hurto",
        secondary_field="genero",
        tertiary_field="grupo_etario",
        quaternary_field="armas_medios",
        factor_label_es="Modalidad dominante",
        factor_label_en="Dominant modality",
    ),
}


METHOD_LABELS = {
    "es": {
        "last": "Ultimo valor",
        "ma3": "Promedio movil 3 meses",
        "ma6": "Promedio movil 6 meses",
        "wma3": "Tendencia ponderada reciente",
        "seasonal12": "Repeticion del mismo mes",
        "blend": "Tendencia reciente + estacionalidad",
    },
    "en": {
        "last": "Last value",
        "ma3": "3-month moving average",
        "ma6": "6-month moving average",
        "wma3": "Weighted recent trend",
        "seasonal12": "Same-month repeat",
        "blend": "Recent trend + seasonality",
    },
}


def normalize_text(value: str) -> str:
    text = (value or "").strip()
    if not text:
        return "NO REPORTADO"

    try:
        text = text.encode("latin1").decode("utf-8")
    except UnicodeError:
        pass

    text = unicodedata.normalize("NFKD", text)
    text = "".join(character for character in text if not unicodedata.combining(character))
    text = " ".join(text.replace("(CT)", "").split())
    return text.upper()


def display_label(value: str) -> str:
    text = normalize_text(value)
    special = {
        "BOGOTA D.C.": "Bogota D.C.",
        "BOGOTA": "Bogota",
        "NORTE DE SANTANDER": "Norte de Santander",
        "VALLE DEL CAUCA": "Valle del Cauca",
        "NO REPORTADO": "No Reportado",
        "NO REPORTADA": "No Reportada",
        "NO REPORTA": "No Reporta",
    }
    if text in special:
        return special[text]

    title_text = text.title()
    title_text = title_text.replace(" D.C.", " D.C.")
    title_text = title_text.replace(" Y ", " y ")
    title_text = title_text.replace(" De ", " de ")
    title_text = title_text.replace(" Del ", " del ")
    title_text = title_text.replace(" La ", " la ")
    return title_text


def translate_common_en(value: str) -> str:
    text = normalize_text(value)
    translations = {
        "MASCULINO": "Male",
        "FEMENINO": "Female",
        "NO REPORTA": "Not Reported",
        "NO REPORTADO": "Not Reported",
        "NO REPORTADA": "Not Reported",
        "ADULTOS": "Adults",
        "ADOLESCENTES": "Teenagers",
        "MENORES": "Minors",
        "URBANA": "Urban",
        "RURAL": "Rural",
        "ARMA DE FUEGO": "Firearm",
        "ARMA BLANCA / CORTOPUNZANTE": "Sharp weapon",
        "ARTICULO 239. HURTO MOTOCICLETAS": "Article 239. Motorcycle theft",
        "ARTICULO 239. HURTO AUTOMOTORES": "Article 239. Motor vehicle theft",
    }
    return translations.get(text, display_label(text))


def format_int(value: int, language: str) -> str:
    separator = "." if language == "es" else ","
    return f"{value:,}".replace(",", separator)


def format_pct(value: float) -> str:
    return f"{value:.1f}%"


def month_sequence(start_period: str, end_period: str) -> list[str]:
    year, month = (int(part) for part in start_period.split("-"))
    end_year, end_month = (int(part) for part in end_period.split("-"))
    sequence: list[str] = []

    while (year, month) <= (end_year, end_month):
        sequence.append(f"{year:04d}-{month:02d}")
        if month == 12:
            year += 1
            month = 1
        else:
            month += 1

    return sequence


def next_period(period: str) -> str:
    year, month = (int(part) for part in period.split("-"))
    if month == 12:
        return f"{year + 1:04d}-01"
    return f"{year:04d}-{month + 1:02d}"


def percentile(values: list[int], ratio: float) -> float:
    if not values:
        return 0.0

    ordered = sorted(values)
    if len(ordered) == 1:
        return float(ordered[0])

    index = (len(ordered) - 1) * ratio
    lower_index = floor(index)
    upper_index = ceil(index)
    lower_value = ordered[lower_index]
    upper_value = ordered[upper_index]

    if lower_index == upper_index:
        return float(lower_value)

    fraction = index - lower_index
    return lower_value + (upper_value - lower_value) * fraction


def forecast_series(values: list[int], method: str) -> int:
    history = values[:] if values else [0]
    length = len(history)

    if method == "last":
        return history[-1]

    if method == "ma3":
        return round(mean(history[-min(3, length) :]))

    if method == "ma6":
        return round(mean(history[-min(6, length) :]))

    if method == "wma3":
        window = history[-3:] if length >= 3 else history
        weights = [1, 2, 3][-len(window) :]
        total_weight = sum(weights)
        return round(sum(value * weight for value, weight in zip(window, weights)) / total_weight)

    if method == "seasonal12":
        if length >= 12:
            return history[-12]
        return round(mean(history[-min(3, length) :]))

    if method == "blend":
        recent = forecast_series(history, "wma3")
        if length >= 12:
            seasonal = history[-12]
            return round(recent * 0.6 + seasonal * 0.4)
        return recent

    raise ValueError(f"Metodo no soportado: {method}")


def smape(predicted: int, observed: int) -> float:
    denominator = (abs(predicted) + abs(observed)) / 2
    if denominator == 0:
        return 0.0
    return abs(predicted - observed) / denominator


def evaluate_method(values: list[int], method: str) -> float | None:
    minimum_history = 12 if method in {"seasonal12", "blend"} else 3
    if len(values) <= minimum_history:
        return None

    errors: list[float] = []
    for index in range(minimum_history, len(values)):
        predicted = forecast_series(values[:index], method)
        observed = values[index]
        errors.append(smape(predicted, observed))

    return max(0.0, 100 - (sum(errors) / len(errors) * 100))


def choose_model(values: list[int]) -> tuple[str, float]:
    candidates: list[tuple[float, str]] = []
    for method in ("last", "ma3", "ma6", "wma3", "seasonal12", "blend"):
        score = evaluate_method(values, method)
        if score is not None:
            candidates.append((score, method))

    if not candidates:
        return "ma3", 0.0

    score, method = max(candidates, key=lambda item: item[0])
    return method, round(score, 1)


def detect_partial_tail(series: list[tuple[str, int]]) -> tuple[list[tuple[str, int]], bool]:
    if len(series) < 6:
        return series, False

    values = [value for _, value in series]
    reference = mean(values[-4:-1])
    if reference <= 0:
        return series, False

    if values[-1] < reference * 0.35:
        return series[:-1], True

    return series, False


def change_ratio(values: list[int]) -> float:
    if len(values) >= 6:
        recent = mean(values[-3:])
        previous = mean(values[-6:-3])
    elif len(values) >= 4:
        recent = mean(values[-2:])
        previous = mean(values[:-2])
    elif len(values) >= 2:
        recent = values[-1]
        previous = mean(values[:-1])
    else:
        return 0.0

    if previous == 0:
        return 100.0 if recent > 0 else 0.0

    return ((recent - previous) / previous) * 100


def direction_from_change(change: float) -> str:
    if change > 5:
        return "up"
    if change < -5:
        return "down"
    return "stable"


def confidence_level(accuracy: float, months: int) -> str:
    if months >= 24 and accuracy >= 75:
        return "high"
    if months >= 12 and accuracy >= 60:
        return "medium"
    return "low"


def risk_level(forecast_value: int, values: list[int], change: float) -> str:
    upper_band = percentile(values, 0.75)
    mid_band = percentile(values, 0.45)

    if forecast_value >= upper_band or change >= 12:
        return "high"
    if forecast_value >= mid_band or change >= -5:
        return "medium"
    return "low"


def load_rows(file_name: str) -> list[dict[str, object]]:
    rows: list[dict[str, object]] = []
    with (CLEAN_DIR / file_name).open(encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        for raw_row in reader:
            date_value = datetime.fromisoformat(str(raw_row["fecha"]))
            normalized_row: dict[str, object] = {
                "cantidad": int(raw_row["cantidad"]),
                "fecha": date_value,
                "period": date_value.strftime("%Y-%m"),
                "year": date_value.year,
            }
            for key, value in raw_row.items():
                if key in {"cantidad", "fecha"}:
                    continue
                normalized_row[key] = normalize_text(value or "")
            rows.append(normalized_row)

    return rows


def build_stats(rows: list[dict[str, object]], config: DatasetConfig) -> DatasetStats:
    dates = [row["fecha"] for row in rows]
    rows_count = len(rows)
    total = sum(int(row["cantidad"]) for row in rows)
    by_year: Counter[int] = Counter()
    by_period: Counter[str] = Counter()
    departments: Counter[str] = Counter()
    municipalities: Counter[str] = Counter()
    primary: Counter[str] = Counter()
    secondary: Counter[str] = Counter()
    tertiary: Counter[str] = Counter()
    quaternary: Counter[str] = Counter()

    for row in rows:
        quantity = int(row["cantidad"])
        by_year[int(row["year"])] += quantity
        by_period[str(row["period"])] += quantity
        departments[str(row["departamento"])] += quantity
        municipalities[str(row["municipio"])] += quantity
        primary[str(row[config.primary_field])] += quantity
        secondary[str(row[config.secondary_field])] += quantity
        tertiary[str(row[config.tertiary_field])] += quantity
        quaternary[str(row[config.quaternary_field])] += quantity

    return DatasetStats(
        rows_count=rows_count,
        total=total,
        start_date=min(dates).date().isoformat(),
        end_date=max(dates).date().isoformat(),
        by_year=by_year,
        by_period=by_period,
        departments=departments,
        municipalities=municipalities,
        primary=primary,
        secondary=secondary,
        tertiary=tertiary,
        quaternary=quaternary,
    )


def top_item(counter: Counter[str]) -> tuple[str, int]:
    if not counter:
        return "NO REPORTADO", 0
    return counter.most_common(1)[0]


def share_text(value: int, total: int) -> str:
    if total == 0:
        return "0.0%"
    return format_pct((value / total) * 100)


def build_summary_report(
    key: str,
    stats: DatasetStats,
) -> tuple[dict[str, object], dict[str, object]]:
    top_department, top_department_total = top_item(stats.departments)
    top_municipality, top_municipality_total = top_item(stats.municipalities)
    top_primary, top_primary_total = top_item(stats.primary)
    top_secondary, top_secondary_total = top_item(stats.secondary)
    top_tertiary, top_tertiary_total = top_item(stats.tertiary)
    top_quaternary, top_quaternary_total = top_item(stats.quaternary)
    peak_period, _peak_total = max(stats.by_period.items(), key=lambda item: item[1])
    peak_year, _peak_year_total = max(stats.by_year.items(), key=lambda item: item[1])

    if key == "homicidios":
        es = {
            "summary": (
                f"La base de homicidios consolida {format_int(stats.total, 'es')} casos en "
                f"{format_int(stats.rows_count, 'es')} registros. "
                f"Predomina {display_label(top_primary).lower()} ({share_text(top_primary_total, stats.total)}) y "
                f"la mayor concentracion territorial se ubica en {display_label(top_department)} "
                f"({share_text(top_department_total, stats.total)})."
            ),
            "metrics": [
                {"label": "Casos consolidados", "value": format_int(stats.total, "es")},
                {
                    "label": "Foco principal",
                    "value": f"{display_label(top_department)} {share_text(top_department_total, stats.total)}",
                },
                {
                    "label": "Patron dominante",
                    "value": f"{display_label(top_primary)} {share_text(top_primary_total, stats.total)}",
                },
            ],
            "findings": [
                {
                    "title": "Concentracion territorial",
                    "description": (
                        f"{display_label(top_department)} lidera con {format_int(top_department_total, 'es')} casos "
                        f"({share_text(top_department_total, stats.total)}), mientras {display_label(top_municipality)} "
                        f"aparece como el principal municipio con {format_int(top_municipality_total, 'es')} registros."
                    ),
                },
                {
                    "title": "Patron operativo",
                    "description": (
                        f"{display_label(top_primary)} explica {share_text(top_primary_total, stats.total)} del total. "
                        f"El comportamiento tambien se inclina hacia {display_label(top_quaternary).lower()} "
                        f"({share_text(top_quaternary_total, stats.total)})."
                    ),
                },
                {
                    "title": "Detalle reportado",
                    "description": (
                        f"La modalidad {display_label(top_secondary).lower()} concentra "
                        f"{share_text(top_secondary_total, stats.total)} y la victimizacion se mantiene "
                        f"principalmente en {display_label(top_tertiary).lower()} "
                        f"({share_text(top_tertiary_total, stats.total)})."
                    ),
                },
            ],
            "actions": [
                {
                    "title": "Despliegue focalizado",
                    "description": (
                        f"Conviene concentrar seguimiento institucional en {display_label(top_department)} y "
                        f"{display_label(top_municipality)}, porque ahi se sostiene el mayor peso observado."
                    ),
                },
                {
                    "title": "Respuesta por patron dominante",
                    "description": (
                        f"La planeacion operativa gana precision cuando se parte de {display_label(top_primary)} y "
                        f"de la caracterizacion disponible en {display_label(top_secondary).lower()}."
                    ),
                },
            ],
            "coverageNote": (
                f"Base IA: {format_int(stats.rows_count, 'es')} registros y {format_int(stats.total, 'es')} casos. "
                "La lectura combina territorio, patron operativo y perfil reportado para orientar seguimiento."
            ),
        }

        en = {
            "summary": (
                f"The homicide base consolidates {format_int(stats.total, 'en')} cases across "
                f"{format_int(stats.rows_count, 'en')} records. "
                f"{translate_common_en(top_primary)} leads with {share_text(top_primary_total, stats.total)}, and "
                f"the strongest territorial concentration appears in {display_label(top_department)} "
                f"({share_text(top_department_total, stats.total)})."
            ),
            "metrics": [
                {"label": "Consolidated cases", "value": format_int(stats.total, "en")},
                {
                    "label": "Main hotspot",
                    "value": f"{display_label(top_department)} {share_text(top_department_total, stats.total)}",
                },
                {
                    "label": "Dominant pattern",
                    "value": f"{translate_common_en(top_primary)} {share_text(top_primary_total, stats.total)}",
                },
            ],
            "findings": [
                {
                    "title": "Territorial concentration",
                    "description": (
                        f"{display_label(top_department)} leads with {format_int(top_department_total, 'en')} cases "
                        f"({share_text(top_department_total, stats.total)}), while {display_label(top_municipality)} "
                        f"is the main municipality with {format_int(top_municipality_total, 'en')} records."
                    ),
                },
                {
                    "title": "Operational pattern",
                    "description": (
                        f"{translate_common_en(top_primary)} explains {share_text(top_primary_total, stats.total)} of the total. "
                        f"The behavior also leans toward {translate_common_en(top_quaternary).lower()} areas "
                        f"({share_text(top_quaternary_total, stats.total)})."
                    ),
                },
                {
                    "title": "Reported detail",
                    "description": (
                        f"{translate_common_en(top_secondary)} concentrates {share_text(top_secondary_total, stats.total)}, "
                        f"and victimization remains mainly {translate_common_en(top_tertiary).lower()} "
                        f"({share_text(top_tertiary_total, stats.total)})."
                    ),
                },
            ],
            "actions": [
                {
                    "title": "Focused deployment",
                    "description": (
                        f"Institutional monitoring should concentrate on {display_label(top_department)} and "
                        f"{display_label(top_municipality)}, because that is where the strongest observed weight remains."
                    ),
                },
                {
                    "title": "Response by dominant pattern",
                    "description": (
                        f"Operational planning becomes more precise when it starts from {translate_common_en(top_primary)} "
                        f"and from the available characterization in {translate_common_en(top_secondary).lower()}."
                    ),
                },
            ],
            "coverageNote": (
                f"AI base: {format_int(stats.rows_count, 'en')} records and {format_int(stats.total, 'en')} cases. "
                "The reading combines territory, operational pattern and reported profile to support monitoring."
            ),
        }
        return es, en

    if key == "sexuales":
        es = {
            "summary": (
                f"La base de delitos sexuales consolida {format_int(stats.total, 'es')} casos en "
                f"{format_int(stats.rows_count, 'es')} registros. "
                f"Bogota concentra {share_text(top_department_total, stats.total)} del total y el hecho dominante es "
                f"{display_label(top_primary).lower()} ({share_text(top_primary_total, stats.total)})."
            ),
            "metrics": [
                {"label": "Casos consolidados", "value": format_int(stats.total, "es")},
                {
                    "label": "Foco principal",
                    "value": f"{display_label(top_department)} {share_text(top_department_total, stats.total)}",
                },
                {
                    "label": "Delito dominante",
                    "value": f"{share_text(top_primary_total, stats.total)} del total",
                },
            ],
            "findings": [
                {
                    "title": "Concentracion territorial",
                    "description": (
                        f"{display_label(top_department)} lidera con {format_int(top_department_total, 'es')} casos y "
                        f"{display_label(top_municipality)} concentra la mayor carga municipal."
                    ),
                },
                {
                    "title": "Perfil de victimizacion",
                    "description": (
                        f"{display_label(top_secondary)} representa {share_text(top_secondary_total, stats.total)} y el grupo "
                        f"{display_label(top_tertiary).lower()} aporta {share_text(top_tertiary_total, stats.total)}."
                    ),
                },
                {
                    "title": "Calidad del registro",
                    "description": (
                        f"La variable {display_label(top_quaternary).lower()} domina "
                        f"{share_text(top_quaternary_total, stats.total)} de la base, por lo que la lectura depende mas "
                        "del tipo penal y del territorio."
                    ),
                },
            ],
            "actions": [
                {
                    "title": "Seguimiento por perfil afectado",
                    "description": (
                        "Conviene revisar adultos, adolescentes y menores por separado para no mezclar dinamicas de riesgo."
                    ),
                },
                {
                    "title": "Focalizacion territorial",
                    "description": (
                        f"La lectura institucional debe sostenerse sobre {display_label(top_department)} y "
                        f"{display_label(top_municipality)}, por ser los puntos con mayor carga observada."
                    ),
                },
            ],
            "coverageNote": (
                f"Base IA: {format_int(stats.rows_count, 'es')} registros y {format_int(stats.total, 'es')} casos. "
                "La lectura combina territorio, delito y perfil poblacional para orientar seguimiento."
            ),
        }

        en = {
            "summary": (
                f"The sexual crimes base consolidates {format_int(stats.total, 'en')} cases across "
                f"{format_int(stats.rows_count, 'en')} records. "
                f"Bogota holds {share_text(top_department_total, stats.total)} of the total, and the dominant offense is "
                f"{display_label(top_primary).lower()} ({share_text(top_primary_total, stats.total)})."
            ),
            "metrics": [
                {"label": "Consolidated cases", "value": format_int(stats.total, "en")},
                {
                    "label": "Main hotspot",
                    "value": f"{display_label(top_department)} {share_text(top_department_total, stats.total)}",
                },
                {
                    "label": "Dominant offense",
                    "value": f"{share_text(top_primary_total, stats.total)} of the total",
                },
            ],
            "findings": [
                {
                    "title": "Territorial concentration",
                    "description": (
                        f"{display_label(top_department)} leads with {format_int(top_department_total, 'en')} cases, and "
                        f"{display_label(top_municipality)} holds the strongest municipal load."
                    ),
                },
                {
                    "title": "Victim profile",
                    "description": (
                        f"{translate_common_en(top_secondary)} represents {share_text(top_secondary_total, stats.total)}, and the "
                        f"{translate_common_en(top_tertiary).lower()} group contributes {share_text(top_tertiary_total, stats.total)}."
                    ),
                },
                {
                    "title": "Record quality",
                    "description": (
                        f"{translate_common_en(top_quaternary)} dominates {share_text(top_quaternary_total, stats.total)} of the base, "
                        "so interpretation depends more on offense type and territory."
                    ),
                },
            ],
            "actions": [
                {
                    "title": "Monitoring by affected profile",
                    "description": (
                        "Adults, teenagers and minors should be reviewed separately to avoid flattening different risk patterns."
                    ),
                },
                {
                    "title": "Territorial targeting",
                    "description": (
                        f"Institutional reading should stay focused on {display_label(top_department)} and "
                        f"{display_label(top_municipality)}, because they carry the strongest observed load."
                    ),
                },
            ],
            "coverageNote": (
                f"AI base: {format_int(stats.rows_count, 'en')} records and {format_int(stats.total, 'en')} cases. "
                "The reading combines territory, offense type and population profile to support monitoring."
            ),
        }
        return es, en

    es = {
        "summary": (
            f"La base de hurtos de vehiculos consolida {format_int(stats.total, 'es')} casos en "
            f"{format_int(stats.rows_count, 'es')} registros. "
            f"El mayor peso territorial esta en {display_label(top_department)} "
            f"({share_text(top_department_total, stats.total)}) y la modalidad dominante es "
            f"{display_label(top_primary).lower()} ({share_text(top_primary_total, stats.total)})."
        ),
        "metrics": [
            {"label": "Casos consolidados", "value": format_int(stats.total, "es")},
            {
                "label": "Foco principal",
                "value": f"{display_label(top_department)} {share_text(top_department_total, stats.total)}",
            },
            {
                "label": "Modalidad dominante",
                "value": f"{share_text(top_primary_total, stats.total)} del total",
            },
        ],
        "findings": [
            {
                "title": "Concentracion reciente",
                "description": (
                    f"{display_label(top_department)} lidera con {format_int(top_department_total, 'es')} casos y "
                    f"{display_label(top_municipality)} aparece como el principal municipio del corte."
                ),
            },
            {
                "title": "Patron dominante",
                "description": (
                    f"{display_label(top_primary)} explica {share_text(top_primary_total, stats.total)} del total. "
                    f"El perfil mas frecuente sigue siendo {display_label(top_secondary).lower()} "
                    f"({share_text(top_secondary_total, stats.total)}) y {display_label(top_tertiary).lower()} "
                    f"({share_text(top_tertiary_total, stats.total)})."
                ),
            },
            {
                "title": "Condiciones del hecho",
                "description": (
                    f"En armas o medios domina {display_label(top_quaternary).lower()} "
                    f"({share_text(top_quaternary_total, stats.total)}), lo que sirve para focalizar consultas operativas."
                ),
            },
        ],
        "actions": [
            {
                "title": "Seguimiento territorial",
                "description": (
                    f"Conviene reforzar seguimiento sobre {display_label(top_department)} y "
                    f"{display_label(top_municipality)}, porque concentran la mayor carga observada."
                ),
            },
            {
                "title": "Respuesta por modalidad",
                "description": (
                    "La lectura mejora cuando se diferencian las modalidades de hurto para no mezclar dinamicas distintas."
                ),
            },
        ],
        "coverageNote": (
            f"Base IA: {format_int(stats.rows_count, 'es')} registros y {format_int(stats.total, 'es')} casos. "
            "La lectura combina territorio, modalidad y perfil afectado para orientar seguimiento."
        ),
    }

    en = {
        "summary": (
            f"The vehicle theft base consolidates {format_int(stats.total, 'en')} cases across "
            f"{format_int(stats.rows_count, 'en')} records. "
            f"The strongest territorial weight sits in {display_label(top_department)} "
            f"({share_text(top_department_total, stats.total)}), and the dominant modality is "
            f"{translate_common_en(top_primary).lower()} ({share_text(top_primary_total, stats.total)})."
        ),
        "metrics": [
            {"label": "Consolidated cases", "value": format_int(stats.total, "en")},
            {
                "label": "Main hotspot",
                "value": f"{display_label(top_department)} {share_text(top_department_total, stats.total)}",
            },
            {
                "label": "Dominant modality",
                "value": f"{share_text(top_primary_total, stats.total)} of the total",
            },
        ],
        "findings": [
            {
                "title": "Recent concentration",
                "description": (
                    f"{display_label(top_department)} leads with {format_int(top_department_total, 'en')} cases, and "
                    f"{display_label(top_municipality)} stands out as the main municipality in the cut."
                ),
            },
            {
                "title": "Dominant pattern",
                "description": (
                    f"{translate_common_en(top_primary)} explains {share_text(top_primary_total, stats.total)} of the total. "
                    f"The most frequent profile remains {translate_common_en(top_secondary).lower()} "
                    f"({share_text(top_secondary_total, stats.total)}) and {translate_common_en(top_tertiary).lower()} "
                    f"({share_text(top_tertiary_total, stats.total)})."
                ),
            },
            {
                "title": "Event conditions",
                "description": (
                    f"The leading weapon or method is {translate_common_en(top_quaternary).lower()} "
                    f"({share_text(top_quaternary_total, stats.total)}), which helps focus operational queries."
                ),
            },
        ],
        "actions": [
            {
                "title": "Territorial monitoring",
                "description": (
                    f"Monitoring should reinforce {display_label(top_department)} and "
                    f"{display_label(top_municipality)}, because they hold the strongest observed load."
                ),
            },
            {
                "title": "Response by modality",
                "description": (
                    "Reading improves when theft modalities are separated instead of mixing different operating patterns."
                ),
            },
        ],
        "coverageNote": (
            f"AI base: {format_int(stats.rows_count, 'en')} records and {format_int(stats.total, 'en')} cases. "
            "The reading combines territory, modality and affected profile to support monitoring."
        ),
    }
    return es, en


def build_predictive_snapshot(
    territory_rows: list[dict[str, object]],
    territory_id: str,
    territory_label_es: str,
    territory_label_en: str,
    config: DatasetConfig,
) -> tuple[dict[str, object], dict[str, object]]:
    period_counter: Counter[str] = Counter()
    total = 0
    primary_counter: Counter[str] = Counter()
    department_counter: Counter[str] = Counter()
    municipality_counter: Counter[str] = Counter()

    for row in territory_rows:
        quantity = int(row["cantidad"])
        total += quantity
        period_counter[str(row["period"])] += quantity
        primary_counter[str(row[config.primary_field])] += quantity
        municipality_counter[str(row["municipio"])] += quantity
        if territory_id == "national":
            department_counter[str(row["departamento"])] += quantity

    ordered_periods = month_sequence(min(period_counter), max(period_counter))
    complete_series = [(period, period_counter.get(period, 0)) for period in ordered_periods]
    usable_series, trimmed_tail = detect_partial_tail(complete_series)
    usable_values = [value for _, value in usable_series]
    usable_periods = [period for period, _ in usable_series]

    model_name, accuracy_score = choose_model(usable_values)
    forecast_value = forecast_series(usable_values, model_name)
    forecast_period = next_period(usable_periods[-1])
    recent_change = round(change_ratio(usable_values), 1)
    direction = direction_from_change(recent_change)
    confidence = confidence_level(accuracy_score, len(usable_values))
    risk = risk_level(forecast_value, usable_values, recent_change)
    confidence_es = {"high": "alta", "medium": "media", "low": "baja"}[confidence]
    confidence_en = {"high": "high", "medium": "medium", "low": "low"}[confidence]
    top_factor, top_factor_total = top_item(primary_counter)
    top_factor_share = share_text(top_factor_total, total)

    if territory_id == "national":
        hotspot_name, hotspot_total = top_item(department_counter)
        hotspot_es = f"Departamento: {display_label(hotspot_name)} ({share_text(hotspot_total, total)})"
        hotspot_en = f"Department: {display_label(hotspot_name)} ({share_text(hotspot_total, total)})"
        hotspot_target_es = display_label(hotspot_name)
        hotspot_target_en = display_label(hotspot_name)
    else:
        hotspot_name, hotspot_total = top_item(municipality_counter)
        hotspot_es = f"Municipio: {display_label(hotspot_name)} ({share_text(hotspot_total, total)})"
        hotspot_en = f"Municipality: {display_label(hotspot_name)} ({share_text(hotspot_total, total)})"
        hotspot_target_es = display_label(hotspot_name)
        hotspot_target_en = display_label(hotspot_name)

    factor_es = f"{display_label(top_factor)} ({top_factor_share})"
    factor_en = f"{translate_common_en(top_factor)} ({top_factor_share})"
    trimmed_note_es = (
        " El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa."
        if trimmed_tail
        else ""
    )
    trimmed_note_en = (
        " The latest close looks partial, so the forecast uses the last complete window."
        if trimmed_tail
        else ""
    )

    if direction == "up":
        pressure_text_es = f"El promedio reciente sube {format_pct(abs(recent_change))} frente a la ventana previa."
        pressure_text_en = f"The recent average rises {format_pct(abs(recent_change))} versus the previous window."
    elif direction == "down":
        pressure_text_es = f"El promedio reciente baja {format_pct(abs(recent_change))} frente a la ventana previa."
        pressure_text_en = f"The recent average falls {format_pct(abs(recent_change))} versus the previous window."
    else:
        pressure_text_es = "La presion reciente se mantiene estable frente a la ventana previa."
        pressure_text_en = "Recent pressure remains stable versus the previous window."

    last_observed = usable_values[-1]
    chart_series = [
        {"period": period, "value": value} for period, value in usable_series[-12:]
    ]

    recommendations_es = [
        f"Priorizar seguimiento sobre {hotspot_target_es} en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
        f"Cruzar el pronostico con {config.factor_label_es.lower()} para validar si {display_label(top_factor)} sigue empujando el comportamiento esperado.",
        f"Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual.{trimmed_note_es}",
    ]
    recommendations_en = [
        f"Prioritize monitoring on {hotspot_target_en} during the next operating window, because it holds the largest load inside the selected territory.",
        f"Cross the forecast with the {config.factor_label_en.lower()} to verify whether {translate_common_en(top_factor)} is still driving the expected behavior.",
        f"Read this output as operational guidance based on previous behavior and not as the current calendar date.{trimmed_note_en}",
    ]

    forecast_answer_es = (
        f"En la siguiente ventana operativa, el escenario base estima {format_int(forecast_value, 'es')} casos en {territory_label_es}. "
        f"La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.{trimmed_note_es}"
    )
    pressure_answer_es = (
        f"{pressure_text_es} La confiabilidad operativa del escenario actual es {confidence_es}."
    )
    focus_answer_es = (
        f"El foco principal en {territory_label_es} sigue siendo {display_label(top_factor)}, mientras {hotspot_es} mantiene la mayor presion territorial."
    )
    action_answer_es = (
        f"La accion mas util es reforzar seguimiento sobre {hotspot_target_es} y monitorear si {display_label(top_factor)} conserva su peso en la siguiente ventana operativa."
    )

    forecast_answer_en = (
        f"In the next operating window, the baseline scenario estimates {format_int(forecast_value, 'en')} cases in {territory_label_en}. "
        f"The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.{trimmed_note_en}"
    )
    pressure_answer_en = (
        f"{pressure_text_en} Current operational confidence is {confidence_en}."
    )
    focus_answer_en = (
        f"The main focus in {territory_label_en} remains {translate_common_en(top_factor)}, while {hotspot_en} keeps the strongest territorial pressure."
    )
    action_answer_en = (
        f"The most useful action is to reinforce monitoring on {hotspot_target_en} and check whether {translate_common_en(top_factor)} keeps its weight through the next operating window."
    )

    common_payload = {
        "id": territory_id,
        "forecastPeriod": forecast_period,
        "forecastValue": forecast_value,
        "lastObservedValue": last_observed,
        "changePct": recent_change,
        "direction": direction,
        "accuracyScore": accuracy_score,
        "confidence": confidence,
        "risk": risk,
        "modelLabelEs": METHOD_LABELS["es"][model_name],
        "modelLabelEn": METHOD_LABELS["en"][model_name],
        "historyMonths": len(usable_values),
        "series": chart_series,
    }

    es_payload = {
        **common_payload,
        "label": territory_label_es,
        "dominantFactor": factor_es,
        "hotspot": hotspot_es,
        "recommendations": recommendations_es,
        "answers": {
            "forecast": forecast_answer_es,
            "pressure": pressure_answer_es,
            "focus": focus_answer_es,
            "action": action_answer_es,
        },
    }
    en_payload = {
        **common_payload,
        "label": territory_label_en,
        "dominantFactor": factor_en,
        "hotspot": hotspot_en,
        "recommendations": recommendations_en,
        "answers": {
            "forecast": forecast_answer_en,
            "pressure": pressure_answer_en,
            "focus": focus_answer_en,
            "action": action_answer_en,
        },
    }
    return es_payload, en_payload


def build_predictive_report(
    rows: list[dict[str, object]],
    config: DatasetConfig,
) -> tuple[dict[str, object], dict[str, object]]:
    department_totals: Counter[str] = Counter()
    for row in rows:
        department_totals[str(row["departamento"])] += int(row["cantidad"])

    ordered_departments = [department for department, _ in department_totals.most_common()]
    territories_es: list[dict[str, object]] = []
    territories_en: list[dict[str, object]] = []

    national_es, national_en = build_predictive_snapshot(
        territory_rows=rows,
        territory_id="national",
        territory_label_es="Nacional",
        territory_label_en="National",
        config=config,
    )
    territories_es.append(national_es)
    territories_en.append(national_en)

    for department in ordered_departments:
        territory_rows = [
            row for row in rows if str(row["departamento"]) == department
        ]
        territory_id = department.lower().replace(" ", "-").replace(".", "").replace("/", "-")
        territory_label = display_label(department)
        territory_es, territory_en = build_predictive_snapshot(
            territory_rows=territory_rows,
            territory_id=territory_id,
            territory_label_es=territory_label,
            territory_label_en=territory_label,
            config=config,
        )
        territories_es.append(territory_es)
        territories_en.append(territory_en)

    return (
        {
            "nextPeriod": str(territories_es[0]["forecastPeriod"]),
            "territories": territories_es,
        },
        {
            "nextPeriod": str(territories_en[0]["forecastPeriod"]),
            "territories": territories_en,
        },
    )


def build_dataset_report(config: DatasetConfig) -> tuple[dict[str, object], dict[str, object]]:
    rows = load_rows(config.file_name)
    stats = build_stats(rows, config)
    summary_es, summary_en = build_summary_report(config.key, stats)
    predictive_es, predictive_en = build_predictive_report(rows, config)
    summary_es["predictive"] = predictive_es
    summary_en["predictive"] = predictive_en
    return summary_es, summary_en


def build_reports() -> dict[str, dict[str, object]]:
    homicidios_es, homicidios_en = build_dataset_report(CONFIGS["homicidios"])
    sexuales_es, sexuales_en = build_dataset_report(CONFIGS["sexuales"])
    hurtos_es, hurtos_en = build_dataset_report(CONFIGS["hurtos"])

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


def write_typescript(data: dict[str, dict[str, object]]) -> None:
    content = """import { Language } from "../context/UiContext";

export type AiReportMetric = {
  label: string;
  value: string;
};

export type AiReportItem = {
  title: string;
  description: string;
};

export type AiForecastQuestionKey = "forecast" | "pressure" | "focus" | "action";

export type AiForecastPoint = {
  period: string;
  value: number;
};

export type AiForecastTerritory = {
  id: string;
  label: string;
  forecastPeriod: string;
  forecastValue: number;
  lastObservedValue: number;
  changePct: number;
  direction: "up" | "down" | "stable";
  accuracyScore: number;
  confidence: "high" | "medium" | "low";
  risk: "high" | "medium" | "low";
  dominantFactor: string;
  hotspot: string;
  modelLabelEs: string;
  modelLabelEn: string;
  historyMonths: number;
  series: AiForecastPoint[];
  recommendations: string[];
  answers: Record<AiForecastQuestionKey, string>;
};

export type AiPredictiveReport = {
  nextPeriod: string;
  territories: AiForecastTerritory[];
};

export type AiReport = {
  summary: string;
  metrics: AiReportMetric[];
  findings: AiReportItem[];
  actions: AiReportItem[];
  coverageNote: string;
  predictive: AiPredictiveReport;
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


def main() -> None:
    reports = build_reports()
    write_typescript(reports)
    print(f"CORRECTO: analisis IA generado en {OUTPUT_PATH.relative_to(BASE_DIR)}")


if __name__ == "__main__":
    main()
