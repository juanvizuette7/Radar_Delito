from __future__ import annotations

import argparse
import csv
import os
from dataclasses import dataclass
from datetime import date
from pathlib import Path
from typing import Callable

import psycopg2
from psycopg2 import sql
from psycopg2.extras import execute_batch


BASE_DIR = Path(__file__).resolve().parents[1]
CLEAN_DIR = BASE_DIR / "data" / "clean"
ENV_PATH = BASE_DIR / ".env"
PUBLIC_SCHEMA = "public"


def as_text(value: str) -> str | None:
    return value or None


def as_int(value: str) -> int | None:
    return int(value) if value else None


def as_date(value: str) -> date | None:
    return date.fromisoformat(value) if value else None


def reported_flag(value: str, not_reported_label: str) -> bool | None:
    if not value:
        return None
    return value != not_reported_label


@dataclass(frozen=True)
class DatasetConfig:
    file_name: str
    table_name: str
    create_sql: str
    insert_columns: list[str]
    row_builder: Callable[[dict[str, str]], tuple[object, ...]]


def build_homicidios_row(row: dict[str, str]) -> tuple[object, ...]:
    modalidad = as_text(row["_modalidad_presunta"])
    fecha = as_date(row["FECHA"])
    ano = as_int(row["ANO"])
    mes = as_int(row["MES"])
    return (
        as_date(row["fecha_hecho"]),
        as_text(row["cod_depto"]),
        as_text(row["departamento"]),
        as_text(row["cod_muni"]),
        as_text(row["municipio"]),
        as_text(row["zona"]),
        as_text(row["sexo"]),
        as_text(row["arma_medio"]),
        modalidad,
        reported_flag(row["_modalidad_presunta"], "NO REPORTADA"),
        as_text(row["spoa_caracterizacion"]),
        as_int(row["cantidad"]),
        fecha,
        ano,
        mes,
        f"{ano}-{mes:02d}" if ano is not None and mes is not None else None,
    )


def build_delitos_row(row: dict[str, str]) -> tuple[object, ...]:
    fecha = as_date(row["FECHA"])
    ano = as_int(row["ANO"])
    mes = as_int(row["MES"])
    return (
        as_text(row["departamento"]),
        as_text(row["municipio"]),
        as_text(row["codigo_dane"]),
        as_text(row["armas_medios"]),
        reported_flag(row["armas_medios"], "NO REPORTADO"),
        as_text(row["fecha_hecho"]),
        fecha,
        ano,
        mes,
        f"{ano}-{mes:02d}" if ano is not None and mes is not None else None,
        as_text(row["genero"]),
        as_text(row["grupo_etario"]),
        as_text(row["delito"]),
        as_int(row["cantidad"]),
    )


def build_hurtos_row(row: dict[str, str]) -> tuple[object, ...]:
    fecha = as_date(row["FECHA"])
    ano = as_int(row["ANO"])
    mes = as_int(row["MES"])
    return (
        as_text(row["departamento"]),
        as_text(row["municipio"]),
        as_text(row["codigo_dane"]),
        as_text(row["armas_medios"]),
        reported_flag(row["armas_medios"], "NO REPORTADO"),
        as_text(row["fecha_hecho"]),
        fecha,
        ano,
        mes,
        f"{ano}-{mes:02d}" if ano is not None and mes is not None else None,
        as_text(row["genero"]),
        as_text(row["grupo_etario"]),
        as_text(row["tipo_de_hurto"]),
        as_int(row["cantidad"]),
    )


DATASETS = {
    "homicidios": DatasetConfig(
        file_name="homicidios.csv",
        table_name="homicidios",
        create_sql="""
            CREATE TABLE public.homicidios (
                fecha_hecho DATE,
                cod_depto TEXT,
                departamento TEXT,
                cod_muni TEXT,
                municipio TEXT,
                zona TEXT,
                sexo TEXT,
                arma_medio TEXT,
                modalidad_presunta TEXT,
                modalidad_reportada BOOLEAN,
                spoa_caracterizacion TEXT,
                cantidad INTEGER,
                fecha DATE,
                ano INTEGER,
                mes INTEGER,
                periodo TEXT
            )
        """,
        insert_columns=[
            "fecha_hecho",
            "cod_depto",
            "departamento",
            "cod_muni",
            "municipio",
            "zona",
            "sexo",
            "arma_medio",
            "modalidad_presunta",
            "modalidad_reportada",
            "spoa_caracterizacion",
            "cantidad",
            "fecha",
            "ano",
            "mes",
            "periodo",
        ],
        row_builder=build_homicidios_row,
    ),
    "delitos_sexuales": DatasetConfig(
        file_name="delitos_sexuales.csv",
        table_name="delitos_sexuales",
        create_sql="""
            CREATE TABLE public.delitos_sexuales (
                departamento TEXT,
                municipio TEXT,
                codigo_dane TEXT,
                armas_medios TEXT,
                armas_medios_reportado BOOLEAN,
                fecha_hecho TEXT,
                fecha DATE,
                ano INTEGER,
                mes INTEGER,
                periodo TEXT,
                genero TEXT,
                grupo_etario TEXT,
                delito TEXT,
                cantidad INTEGER
            )
        """,
        insert_columns=[
            "departamento",
            "municipio",
            "codigo_dane",
            "armas_medios",
            "armas_medios_reportado",
            "fecha_hecho",
            "fecha",
            "ano",
            "mes",
            "periodo",
            "genero",
            "grupo_etario",
            "delito",
            "cantidad",
        ],
        row_builder=build_delitos_row,
    ),
    "hurtos": DatasetConfig(
        file_name="hurtos_personas.csv",
        table_name="hurtos",
        create_sql="""
            CREATE TABLE public.hurtos (
                departamento TEXT,
                municipio TEXT,
                codigo_dane TEXT,
                armas_medios TEXT,
                armas_medios_reportado BOOLEAN,
                fecha_hecho TEXT,
                fecha DATE,
                ano INTEGER,
                mes INTEGER,
                periodo TEXT,
                genero TEXT,
                grupo_etario TEXT,
                tipo_de_hurto TEXT,
                cantidad INTEGER
            )
        """,
        insert_columns=[
            "departamento",
            "municipio",
            "codigo_dane",
            "armas_medios",
            "armas_medios_reportado",
            "fecha_hecho",
            "fecha",
            "ano",
            "mes",
            "periodo",
            "genero",
            "grupo_etario",
            "tipo_de_hurto",
            "cantidad",
        ],
        row_builder=build_hurtos_row,
    ),
}


def load_env_file(path: Path) -> None:
    if not path.exists():
        return

    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Crea la base criminalidad y carga los CSV limpios en PostgreSQL."
    )
    parser.add_argument(
        "--only",
        nargs="+",
        choices=sorted(DATASETS.keys()),
        help="Carga solo uno o varios datasets especificos.",
    )
    return parser.parse_args()


def get_settings() -> tuple[dict[str, str | int], str, str]:
    load_env_file(ENV_PATH)

    settings: dict[str, str | int] = {
        "host": os.getenv("PGHOST", "localhost"),
        "port": int(os.getenv("PGPORT", "5432")),
        "user": os.getenv("PGUSER", "postgres"),
        "password": os.getenv("PGPASSWORD", ""),
    }

    if not settings["password"]:
        raise ValueError("Falta PGPASSWORD en .env.")

    target_database = os.getenv("PGDATABASE", "criminalidad")
    maintenance_database = os.getenv("PGMAINTENANCE_DB", "postgres")
    return settings, target_database, maintenance_database


def open_connection(settings: dict[str, str | int], dbname: str):
    return psycopg2.connect(dbname=dbname, connect_timeout=5, **settings)


def ensure_database_exists(
    settings: dict[str, str | int], target_database: str, maintenance_database: str
) -> None:
    connection = open_connection(settings, maintenance_database)
    try:
        connection.autocommit = True
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT 1 FROM pg_database WHERE datname = %s",
                (target_database,),
            )
            if cursor.fetchone() is None:
                cursor.execute(
                    sql.SQL("CREATE DATABASE {}").format(sql.Identifier(target_database))
                )
    finally:
        connection.close()


def recreate_table(cursor, config: DatasetConfig) -> None:
    cursor.execute(
        sql.SQL("DROP TABLE IF EXISTS {}.{}").format(
            sql.Identifier(PUBLIC_SCHEMA),
            sql.Identifier(config.table_name),
        )
    )
    cursor.execute(config.create_sql)


def create_indexes(cursor, table_name: str) -> None:
    index_columns = ["fecha", "departamento", "municipio", "periodo"]
    for column in index_columns:
        cursor.execute(
            sql.SQL("CREATE INDEX {} ON {}.{} ({})").format(
                sql.Identifier(f"idx_{table_name}_{column}"),
                sql.Identifier(PUBLIC_SCHEMA),
                sql.Identifier(table_name),
                sql.Identifier(column),
            )
        )


def load_csv_rows(config: DatasetConfig) -> list[tuple[object, ...]]:
    source = CLEAN_DIR / config.file_name
    if not source.exists():
        raise FileNotFoundError(f"No existe el archivo limpio requerido: {source}")

    rows: list[tuple[object, ...]] = []
    with source.open("r", encoding="utf-8", newline="") as file_handle:
        reader = csv.DictReader(file_handle)
        if reader.fieldnames is None:
            raise ValueError(f"El archivo no tiene encabezados: {source}")

        for row in reader:
            rows.append(config.row_builder(row))
    return rows


def insert_rows(cursor, config: DatasetConfig, rows: list[tuple[object, ...]]) -> None:
    placeholders = sql.SQL(", ").join(sql.Placeholder() for _ in config.insert_columns)
    column_sql = sql.SQL(", ").join(map(sql.Identifier, config.insert_columns))
    insert_sql = sql.SQL("INSERT INTO {}.{} ({}) VALUES ({})").format(
        sql.Identifier(PUBLIC_SCHEMA),
        sql.Identifier(config.table_name),
        column_sql,
        placeholders,
    )
    execute_batch(cursor, insert_sql.as_string(cursor.connection), rows, page_size=1000)


def count_rows(cursor, table_name: str) -> int:
    cursor.execute(
        sql.SQL("SELECT COUNT(*) FROM {}.{}").format(
            sql.Identifier(PUBLIC_SCHEMA),
            sql.Identifier(table_name),
        )
    )
    return int(cursor.fetchone()[0])


def print_summary(settings: dict[str, str | int], target_database: str) -> None:
    print("=" * 90)
    print("POSTGRESQL: INICIO DE CARGA")
    print("-" * 90)
    print(
        f"host={settings['host']} port={settings['port']} "
        f"user={settings['user']} db={target_database} schema={PUBLIC_SCHEMA}"
    )


def main() -> None:
    args = parse_args()
    selected_names = args.only or list(DATASETS.keys())
    settings, target_database, maintenance_database = get_settings()

    print_summary(settings, target_database)
    ensure_database_exists(settings, target_database, maintenance_database)

    connection = open_connection(settings, target_database)
    connection.autocommit = False

    try:
        with connection.cursor() as cursor:
            for dataset_name in selected_names:
                config = DATASETS[dataset_name]
                recreate_table(cursor, config)
                rows = load_csv_rows(config)
                insert_rows(cursor, config, rows)
                create_indexes(cursor, config.table_name)
                total_rows = count_rows(cursor, config.table_name)
                print(
                    f"CORRECTO: public.{config.table_name} cargada ({total_rows} filas)"
                )

            print("-" * 90)
            print("VERIFICACION")
            for dataset_name in selected_names:
                table_name = DATASETS[dataset_name].table_name
                print(
                    f"SELECT COUNT(*) FROM public.{table_name}; -> {count_rows(cursor, table_name)}"
                )

        connection.commit()
        print("-" * 90)
        print("TODO BIEN: PostgreSQL listo para consultas y Power BI.")
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()


if __name__ == "__main__":
    main()
