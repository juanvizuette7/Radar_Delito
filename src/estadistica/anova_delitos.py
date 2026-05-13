from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
import unicodedata

import pandas as pd
from scipy.stats import f_oneway
from statsmodels.stats.multicomp import pairwise_tukeyhsd


BASE_DIR = Path(__file__).resolve().parents[2]
CLEAN_DIR = BASE_DIR / "data" / "clean"
RESULTS_DIR = BASE_DIR / "src" / "estadistica" / "resultados"


@dataclass(frozen=True)
class AnalysisConfig:
    key: str
    dashboard_name: str
    file_name: str
    group_column: str
    group_label: str
    question: str
    anova_output: str
    tukey_output: str


ANALYSES = [
    AnalysisConfig(
        key="homicidios",
        dashboard_name="Homicidios",
        file_name="homicidios_clean.csv",
        group_column="departamento",
        group_label="departamento",
        question="Hay diferencias significativas en la cantidad de homicidios entre departamentos?",
        anova_output="anova_homicidios_departamento.csv",
        tukey_output="tukey_homicidios_departamento.csv",
    ),
    AnalysisConfig(
        key="sexuales",
        dashboard_name="Delitos sexuales",
        file_name="delitos_sexuales_clean.csv",
        group_column="grupo_etario",
        group_label="grupo_etario",
        question="Hay diferencias significativas en la cantidad de delitos sexuales entre grupos etarios?",
        anova_output="anova_sexuales_grupo_etario.csv",
        tukey_output="tukey_sexuales_grupo_etario.csv",
    ),
    AnalysisConfig(
        key="hurtos",
        dashboard_name="Hurto de vehiculos",
        file_name="hurtos_personas_clean.csv",
        group_column="departamento",
        group_label="departamento",
        question="Hay diferencias significativas en la cantidad de hurtos de vehiculos entre departamentos?",
        anova_output="anova_hurtos_departamento.csv",
        tukey_output="tukey_hurtos_departamento.csv",
    ),
]


def normalize_text(value: object) -> str:
    text = str(value or "").strip()
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


def validate_sources() -> None:
    missing_files = [
        str((CLEAN_DIR / config.file_name).relative_to(BASE_DIR))
        for config in ANALYSES
        if not (CLEAN_DIR / config.file_name).exists()
    ]
    if missing_files:
        missing_text = ", ".join(missing_files)
        raise FileNotFoundError(f"Faltan archivos limpios requeridos: {missing_text}")


def load_dataset(config: AnalysisConfig) -> pd.DataFrame:
    file_path = CLEAN_DIR / config.file_name
    print(f"LEYENDO DATASET: {file_path.relative_to(BASE_DIR)}")

    dataframe = pd.read_csv(file_path)
    required_columns = {"cantidad", "fecha", config.group_column}
    missing_columns = sorted(required_columns - set(dataframe.columns))
    if missing_columns:
        missing_text = ", ".join(missing_columns)
        raise ValueError(f"Faltan columnas en {config.file_name}: {missing_text}")

    dataframe = dataframe[[config.group_column, "cantidad", "fecha"]].copy()
    dataframe[config.group_column] = dataframe[config.group_column].map(normalize_text)
    dataframe["cantidad"] = pd.to_numeric(dataframe["cantidad"], errors="coerce")
    dataframe["fecha"] = pd.to_datetime(dataframe["fecha"], errors="coerce")
    dataframe = dataframe.dropna(subset=[config.group_column, "cantidad", "fecha"])
    dataframe["cantidad"] = dataframe["cantidad"].astype(int)
    dataframe["periodo"] = dataframe["fecha"].dt.strftime("%Y-%m")
    return dataframe


def aggregate_group_period(dataframe: pd.DataFrame, group_column: str) -> pd.DataFrame:
    # ANOVA necesita varias observaciones por grupo, por eso se trabaja con totales por grupo y periodo.
    aggregated = (
        dataframe.groupby([group_column, "periodo"], as_index=False)["cantidad"]
        .sum()
        .sort_values([group_column, "periodo"])
    )

    counts_by_group = aggregated.groupby(group_column).size()
    valid_groups = counts_by_group[counts_by_group >= 2].index
    filtered = aggregated[aggregated[group_column].isin(valid_groups)].copy()

    if filtered.empty or filtered[group_column].nunique() < 2:
        raise ValueError(
            f"No hay suficientes grupos con al menos dos periodos para analizar {group_column}."
        )

    return filtered


def run_anova(
    aggregated: pd.DataFrame,
    config: AnalysisConfig,
) -> tuple[pd.DataFrame, float, float, str]:
    groups = []
    valid_group_names = []

    for group_name, group_frame in aggregated.groupby(config.group_column):
        values = group_frame["cantidad"].to_numpy()
        if len(values) >= 2:
            valid_group_names.append(group_name)
            groups.append(values)

    if len(groups) < 2:
        raise ValueError(
            f"No hay suficientes grupos validos para ejecutar ANOVA en {config.dashboard_name}."
        )

    f_statistic, p_value = f_oneway(*groups)
    conclusion = (
        "Se rechaza la hipotesis nula: los resultados sugieren diferencias significativas entre algunos grupos."
        if p_value < 0.05
        else "No se rechaza la hipotesis nula: no hay evidencia suficiente para afirmar diferencias significativas entre los grupos."
    )

    output = pd.DataFrame(
        [
            {
                "dashboard": config.dashboard_name,
                "pregunta": config.question,
                "grupo_comparado": config.group_label,
                "variable_objetivo": "cantidad",
                "unidad_analisis": f"{config.group_label} + periodo",
                "grupos_validos": len(valid_group_names),
                "observaciones": len(aggregated),
                "estadistico_f": round(float(f_statistic), 6),
                "valor_p": float(p_value),
                "decision": "Rechazar H0" if p_value < 0.05 else "No rechazar H0",
                "interpretacion": conclusion,
            }
        ]
    )

    output_path = RESULTS_DIR / config.anova_output
    output.to_csv(output_path, index=False, encoding="utf-8-sig")
    print(f"ARCHIVO GENERADO: {output_path.relative_to(BASE_DIR)}")
    return output, float(f_statistic), float(p_value), conclusion


def run_tukey(aggregated: pd.DataFrame, config: AnalysisConfig) -> pd.DataFrame:
    tukey = pairwise_tukeyhsd(
        endog=aggregated["cantidad"],
        groups=aggregated[config.group_column],
        alpha=0.05,
    )
    result_table = pd.DataFrame(tukey.summary().data[1:], columns=tukey.summary().data[0])
    result_table["dashboard"] = config.dashboard_name
    result_table["grupo_comparado"] = config.group_label
    result_table["interpretacion"] = result_table["reject"].map(
        lambda value: (
            "La comparacion sugiere una diferencia significativa entre estos grupos."
            if str(value).lower() == "true"
            else "No se detecta una diferencia significativa entre estos grupos."
        )
    )

    output_path = RESULTS_DIR / config.tukey_output
    result_table.to_csv(output_path, index=False, encoding="utf-8-sig")
    print(f"ARCHIVO GENERADO: {output_path.relative_to(BASE_DIR)}")
    return result_table


def build_descriptive_summary(summary_rows: list[dict[str, object]]) -> None:
    output_path = RESULTS_DIR / "resumen_descriptivo.csv"
    pd.DataFrame(summary_rows).to_csv(output_path, index=False, encoding="utf-8-sig")
    print(f"ARCHIVO GENERADO: {output_path.relative_to(BASE_DIR)}")


def save_final_interpretation(results: list[dict[str, object]]) -> None:
    output_path = RESULTS_DIR / "interpretacion_estadistica_final.txt"

    lines = [
        "VALIDACION ESTADISTICA FINAL",
        "",
        "1. Que se hizo",
        "- Se aplicaron pruebas ANOVA por separado para cada dashboard del proyecto.",
        "- En homicidios se compararon departamentos.",
        "- En delitos sexuales se compararon grupos etarios.",
        "- En hurto de vehiculos se compararon departamentos.",
        "",
        "2. Por que no se compararon directamente los tres delitos",
        "- Los tres datasets tienen periodos temporales y estructuras distintas.",
        "- Por esa razon, la comparacion entre homicidios, delitos sexuales y hurtos queda como lectura descriptiva en los dashboards, no como conclusion inferencial general.",
        "",
        "3. Como se construyo la prueba",
        "- La variable objetivo fue cantidad.",
        "- Para que ANOVA fuera valido, se trabajo con cantidades agregadas por grupo y periodo.",
        "- Esto permite contar con varias observaciones por grupo dentro de cada dashboard.",
        "",
        "4. Que significa p < 0.05",
        "- Cuando el valor p es menor que 0.05, se rechaza la hipotesis nula.",
        "- En lenguaje simple, eso sugiere que las diferencias observadas no parecen deberse solo al azar.",
        "",
        "5. Que hace Tukey",
        "- ANOVA indica si hay diferencias generales.",
        "- Tukey ayuda a identificar entre que grupos aparecen esas diferencias.",
        "",
        "6. Resultados por dashboard",
    ]

    for result in results:
        lines.extend(
            [
                f"- {result['dashboard']}:",
                f"  - Grupo comparado: {result['grupo_comparado']}",
                f"  - Estadistico F: {result['estadistico_f']}",
                f"  - Valor p: {result['valor_p']}",
                f"  - Decision: {result['decision']}",
                f"  - Lectura simple: {result['interpretacion']}",
            ]
        )

    lines.extend(
        [
            "",
            "7. Conclusion sencilla",
            "- Los resultados permiten complementar los dashboards con una validacion estadistica por separado para cada tipo de delito.",
            "- En lugar de mezclar datasets distintos, se evaluo cada dashboard con sus propios grupos internos.",
            "- Esto deja una interpretacion mas clara, mas prudente y mejor sustentada para exposicion.",
        ]
    )

    output_path.write_text("\n".join(lines), encoding="utf-8")
    print(f"ARCHIVO GENERADO: {output_path.relative_to(BASE_DIR)}")


def remove_outdated_outputs() -> None:
    outdated_files = [
        "resultados_anova_tipo_delito.csv",
        "resultados_tukey_tipo_delito.csv",
        "resultados_anova_departamento.csv",
        "resultados_tukey_departamento_top10.csv",
        "interpretacion_anova.txt",
        "boxplot_tipo_delito.png",
    ]

    for file_name in outdated_files:
        file_path = RESULTS_DIR / file_name
        if file_path.exists():
            file_path.unlink()
            print(f"ARCHIVO ELIMINADO: {file_path.relative_to(BASE_DIR)}")


def main() -> None:
    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    validate_sources()
    remove_outdated_outputs()

    summary_rows: list[dict[str, object]] = []
    final_results: list[dict[str, object]] = []

    for config in ANALYSES:
        dataframe = load_dataset(config)
        aggregated = aggregate_group_period(dataframe, config.group_column)
        _, f_statistic, p_value, interpretation = run_anova(aggregated, config)
        run_tukey(aggregated, config)

        summary_rows.append(
            {
                "dashboard": config.dashboard_name,
                "grupo_comparado": config.group_label,
                "variable_objetivo": "cantidad",
                "observaciones": len(aggregated),
                "grupos_validos": aggregated[config.group_column].nunique(),
                "promedio": round(float(aggregated["cantidad"].mean()), 4),
                "desviacion_estandar": round(float(aggregated["cantidad"].std()), 4),
                "minimo": int(aggregated["cantidad"].min()),
                "maximo": int(aggregated["cantidad"].max()),
            }
        )

        final_results.append(
            {
                "dashboard": config.dashboard_name,
                "grupo_comparado": config.group_label,
                "estadistico_f": round(f_statistic, 6),
                "valor_p": p_value,
                "decision": "Rechazar H0" if p_value < 0.05 else "No rechazar H0",
                "interpretacion": interpretation,
            }
        )

    build_descriptive_summary(summary_rows)
    save_final_interpretation(final_results)
    print("TODO BIEN: analisis ANOVA y Tukey corregidos por dashboard.")


if __name__ == "__main__":
    main()
