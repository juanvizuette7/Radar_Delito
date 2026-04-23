from __future__ import annotations

import csv
import re
from pathlib import Path

from pyspark.sql import DataFrame, SparkSession
from pyspark.sql import functions as F
from pyspark.sql.types import IntegerType, StringType


BASE_DIR = Path(__file__).resolve().parents[1]
RAW_DIR = BASE_DIR / "data" / "raw"
CLEAN_DIR = BASE_DIR / "data" / "clean"

DATASETS = {
    "homicidios": {
        "date_column": "fecha_hecho",
        "date_format": "yyyy-MM-dd'T'HH:mm:ss.SSS",
        "output_date_format": "yyyy-MM-dd",
    },
    "delitos_sexuales": {
        "date_column": "fecha_hecho",
        "date_format": "dd/MM/yyyy",
    },
    "hurtos_personas": {
        "date_column": "fecha_hecho",
        "date_format": "dd/MM/yyyy",
    },
}


def build_spark() -> SparkSession:
    spark = (
        SparkSession.builder.master("local[*]")
        .appName("ProcesamientoCriminalidad")
        .getOrCreate()
    )
    spark.sparkContext.setLogLevel("WARN")
    return spark


def normalize_column_name(name: str) -> str:
    normalized = re.sub(r"[^\w]+", "_", name.strip().lower(), flags=re.UNICODE)
    normalized = re.sub(r"_+", "_", normalized)
    return normalized


def normalize_columns(df: DataFrame) -> DataFrame:
    renamed_df = df
    used_names: set[str] = set()

    for original_name in df.columns:
        new_name = normalize_column_name(original_name)
        if not new_name:
            raise ValueError(f"Nombre de columna invalido: {original_name!r}")
        if new_name in used_names:
            raise ValueError(
                f"Colisiones al normalizar columnas: {original_name!r} -> {new_name!r}"
            )
        if new_name != original_name:
            renamed_df = renamed_df.withColumnRenamed(original_name, new_name)
        used_names.add(new_name)

    return renamed_df


def normalize_text_values(df: DataFrame) -> DataFrame:
    for field in df.schema.fields:
        if isinstance(field.dataType, StringType):
            cleaned = F.regexp_replace(F.trim(F.upper(F.col(field.name))), r"\s+", " ")
            df = df.withColumn(
                field.name,
                F.when(cleaned == "", None).otherwise(cleaned),
            )
    return df


def clean_location_fields(df: DataFrame) -> DataFrame:
    if "municipio" in df.columns:
        municipio = F.regexp_replace(F.col("municipio"), r"\s*\([^)]*\)\s*$", "")
        municipio = F.regexp_replace(F.trim(municipio), r"\s+", " ")
        df = df.withColumn(
            "municipio",
            F.when(municipio == "", None).otherwise(municipio),
        )

    if "departamento" in df.columns:
        departamento = F.regexp_replace(F.trim(F.col("departamento")), r"\s+", " ")
        df = df.withColumn(
            "departamento",
            F.when(departamento == "", None).otherwise(departamento),
        )

    return df


def cast_quantity(df: DataFrame) -> DataFrame:
    if "cantidad" not in df.columns:
        return df

    cleaned = F.regexp_replace(F.trim(F.col("cantidad")), r"[^0-9-]", "")
    return df.withColumn(
        "cantidad",
        F.when(cleaned == "", None).otherwise(cleaned.cast(IntegerType())),
    )


def add_calendar_columns(df: DataFrame, date_column: str, date_format: str) -> DataFrame:
    if date_column not in df.columns:
        raise ValueError(f"No existe la columna de fecha requerida: {date_column}")

    return (
        df.withColumn("FECHA", F.to_date(F.col(date_column), date_format))
        .withColumn("ANO", F.year(F.col("FECHA")))
        .withColumn("MES", F.month(F.col("FECHA")))
    )


def format_source_date_column(
    df: DataFrame, date_column: str, output_date_format: str | None = None
) -> DataFrame:
    if output_date_format is None:
        return df
    return df.withColumn(date_column, F.date_format(F.col("FECHA"), output_date_format))


def collect_metrics(df: DataFrame) -> dict[str, int]:
    aggregations = [F.count("*").alias("filas")]
    if "cantidad" in df.columns:
        aggregations.append(F.coalesce(F.sum("cantidad"), F.lit(0)).alias("cantidad_total"))

    row = df.agg(*aggregations).first().asDict()
    return {key: int(value or 0) for key, value in row.items()}


def count_invalid_rows(df: DataFrame) -> dict[str, int]:
    metrics = {
        "fechas_invalidas": df.filter(F.col("FECHA").isNull()).count(),
        "municipios_nulos": 0,
        "departamentos_nulos": 0,
        "cantidades_invalidas": 0,
    }

    if "municipio" in df.columns:
        metrics["municipios_nulos"] = df.filter(F.col("municipio").isNull()).count()
    if "departamento" in df.columns:
        metrics["departamentos_nulos"] = df.filter(F.col("departamento").isNull()).count()
    if "cantidad" in df.columns:
        metrics["cantidades_invalidas"] = df.filter(
            F.col("cantidad").isNull() | (F.col("cantidad") < 0)
        ).count()

    return metrics


def filter_invalid_rows(df: DataFrame) -> DataFrame:
    filters = [F.col("FECHA").isNotNull()]

    if "cantidad" in df.columns:
        filters.append(F.col("cantidad").isNotNull())
        filters.append(F.col("cantidad") >= 0)
    if "municipio" in df.columns:
        filters.append(F.col("municipio").isNotNull())
    if "departamento" in df.columns:
        filters.append(F.col("departamento").isNotNull())

    condition = filters[0]
    for extra_filter in filters[1:]:
        condition = condition & extra_filter

    return df.filter(condition)


def collapse_repeated_rows(df: DataFrame) -> tuple[DataFrame, dict[str, int]]:
    if "cantidad" not in df.columns:
        return df, {"grupos_repetidos": 0, "filas_consolidadas": 0}

    keys = [column for column in df.columns if column != "cantidad"]
    grouped = df.groupBy(*keys).agg(
        F.count("*").alias("_repeticiones"),
        F.sum("cantidad").cast(IntegerType()).alias("cantidad"),
    )

    stats_row = grouped.agg(
        F.coalesce(F.sum(F.when(F.col("_repeticiones") > 1, 1).otherwise(0)), F.lit(0)).alias(
            "grupos_repetidos"
        ),
        F.coalesce(
            F.sum(
                F.when(F.col("_repeticiones") > 1, F.col("_repeticiones") - 1).otherwise(0)
            ),
            F.lit(0),
        ).alias("filas_consolidadas"),
    ).first()

    stats = {key: int(value or 0) for key, value in stats_row.asDict().items()}
    return grouped.drop("_repeticiones").select(*keys, "cantidad"), stats


def sort_dataframe(df: DataFrame) -> DataFrame:
    sort_columns = [column for column in ("FECHA", "departamento", "municipio") if column in df.columns]
    if not sort_columns:
        return df
    return df.orderBy(*sort_columns)


def write_single_csv(df: DataFrame, destination: Path) -> None:
    if destination.exists():
        destination.unlink()

    with destination.open("w", encoding="utf-8", newline="") as output_file:
        writer = csv.writer(output_file)
        writer.writerow(df.columns)
        for row in df.toLocalIterator():
            writer.writerow(["" if value is None else str(value) for value in row])


def print_dataset_report(
    name: str,
    destination: Path,
    before_metrics: dict[str, int],
    after_metrics: dict[str, int],
    invalid_metrics: dict[str, int],
    duplicate_metrics: dict[str, int],
    sample_df: DataFrame,
) -> None:
    invalid_removed = (
        invalid_metrics["fechas_invalidas"]
        + invalid_metrics["cantidades_invalidas"]
        + invalid_metrics["municipios_nulos"]
        + invalid_metrics["departamentos_nulos"]
    )
    cleaned_rows = before_metrics["filas"] - after_metrics["filas"]

    print("\n" + "=" * 100)
    print(f"PROCESO: {name.upper()}")
    print("-" * 100)
    print(f"Total registros originales : {before_metrics['filas']}")
    print(f"Total registros finales    : {after_metrics['filas']}")
    print(f"Total registros limpiados  : {cleaned_rows}")
    print(f"Registros invalidos        : {invalid_removed}")
    print(f"Filas consolidadas         : {duplicate_metrics['filas_consolidadas']}")
    print(f"Grupos repetidos           : {duplicate_metrics['grupos_repetidos']}")
    print(f"Cantidad original          : {before_metrics.get('cantidad_total', 0)}")
    print(f"Cantidad final             : {after_metrics.get('cantidad_total', 0)}")
    print(f"Archivo guardado           : {destination}")
    print("-" * 100)
    print("TABLA FINAL DE MUESTRA")
    sample_df.show(5, truncate=False)
    print(f"CORRECTO: {name} limpio y guardado en clean.")


def build_text_table(rows: list[dict[str, int | str]], columns: list[tuple[str, str]]) -> str:
    headers = [header for _, header in columns]
    widths = [len(header) for header in headers]

    for row in rows:
        for index, (key, _) in enumerate(columns):
            widths[index] = max(widths[index], len(str(row[key])))

    def format_row(values: list[str]) -> str:
        cells = [value.ljust(widths[index]) for index, value in enumerate(values)]
        return "| " + " | ".join(cells) + " |"

    separator = "+-" + "-+-".join("-" * width for width in widths) + "-+"
    lines = [separator, format_row(headers), separator]

    for row in rows:
        lines.append(format_row([str(row[key]) for key, _ in columns]))

    lines.append(separator)
    return "\n".join(lines)


def print_global_summary(summary_rows: list[dict[str, int | str]]) -> None:
    print("\n" + "=" * 100)
    print("RESUMEN GENERAL")
    print("-" * 100)
    ordered_rows = sorted(summary_rows, key=lambda row: str(row["dataset"]))
    columns = [
        ("dataset", "dataset"),
        ("filas_originales", "filas_originales"),
        ("filas_finales", "filas_finales"),
        ("registros_limpiados", "registros_limpiados"),
        ("invalidos", "invalidos"),
        ("filas_consolidadas", "filas_consolidadas"),
        ("cantidad_original", "cantidad_original"),
        ("cantidad_final", "cantidad_final"),
    ]
    print(build_text_table(ordered_rows, columns))
    print(
        "CORRECTO: resumen general generado."
    )
    print("TODO BIEN: limpieza completada y archivos actualizados en data/clean.")


def process_dataset(spark: SparkSession, name: str, config: dict[str, str]) -> dict[str, int | str]:
    source = RAW_DIR / f"{name}.csv"
    destination = CLEAN_DIR / f"{name}.csv"

    if not source.exists():
        raise FileNotFoundError(f"No existe el archivo fuente: {source}")

    df = (
        spark.read.option("header", True)
        .option("encoding", "UTF-8")
        .csv(str(source))
    )

    df = normalize_columns(df)
    df = normalize_text_values(df)
    df = clean_location_fields(df)
    df = cast_quantity(df)
    original_columns = list(df.columns)
    df = add_calendar_columns(df, config["date_column"], config["date_format"])
    df = format_source_date_column(
        df,
        config["date_column"],
        config.get("output_date_format"),
    )

    before_metrics = collect_metrics(df)
    invalid_metrics = count_invalid_rows(df)

    df = filter_invalid_rows(df)
    df, duplicate_metrics = collapse_repeated_rows(df)
    ordered_columns = original_columns + ["FECHA", "ANO", "MES"]
    df = sort_dataframe(df.select(*ordered_columns))

    after_metrics = collect_metrics(df)
    write_single_csv(df, destination)
    print_dataset_report(
        name=name,
        destination=destination,
        before_metrics=before_metrics,
        after_metrics=after_metrics,
        invalid_metrics=invalid_metrics,
        duplicate_metrics=duplicate_metrics,
        sample_df=df,
    )

    invalid_removed = (
        invalid_metrics["fechas_invalidas"]
        + invalid_metrics["cantidades_invalidas"]
        + invalid_metrics["municipios_nulos"]
        + invalid_metrics["departamentos_nulos"]
    )

    return {
        "dataset": name,
        "filas_originales": before_metrics["filas"],
        "filas_finales": after_metrics["filas"],
        "registros_limpiados": before_metrics["filas"] - after_metrics["filas"],
        "invalidos": invalid_removed,
        "filas_consolidadas": duplicate_metrics["filas_consolidadas"],
        "cantidad_original": before_metrics.get("cantidad_total", 0),
        "cantidad_final": after_metrics.get("cantidad_total", 0),
    }


def main() -> None:
    CLEAN_DIR.mkdir(parents=True, exist_ok=True)

    spark = build_spark()
    try:
        summary_rows: list[dict[str, int | str]] = []
        for dataset_name, config in DATASETS.items():
            summary_rows.append(process_dataset(spark, dataset_name, config))
        print_global_summary(summary_rows)
    finally:
        spark.stop()


if __name__ == "__main__":
    main()
