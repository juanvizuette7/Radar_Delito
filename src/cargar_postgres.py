from __future__ import annotations

import argparse
import csv
import os
from dataclasses import dataclass
from datetime import date
from pathlib import Path
from typing import Callable

import psycopg2
from dotenv import load_dotenv
from psycopg2 import sql
from psycopg2.extras import execute_batch


BASE_DIR = Path(__file__).resolve().parents[1]
CLEAN_DIR = BASE_DIR / "data" / "clean"
ENV_PATH = BASE_DIR / ".env"
PUBLIC_SCHEMA = "public"


def as_text(value: str | None) -> str | None:
    text = (value or "").strip()
    return text or None


def as_int(value: str | None) -> int | None:
    text = (value or "").strip()
    return int(text) if text else None


def parse_iso_date(
    value: str | None,
    *,
    file_name: str,
    row_number: int,
    field_name: str,
) -> date | None:
    text = (value or "").strip()
    if not text:
        return None

    try:
        return date.fromisoformat(text)
    except ValueError as error:
        raise ValueError(
            f"Fecha invalida en {file_name}, fila {row_number}, columna {field_name}: {text}"
        ) from error


def derive_year_month(value: date | None) -> tuple[int | None, int | None]:
    if value is None:
        return None, None
    return value.year, value.month


def require_columns(
    fieldnames: list[str] | None,
    required_columns: set[str],
    *,
    file_name: str,
) -> None:
    if not fieldnames:
        raise ValueError(f"El archivo {file_name} no tiene encabezados.")

    missing = sorted(required_columns - set(fieldnames))
    if missing:
        missing_text = ", ".join(missing)
        raise ValueError(f"Faltan columnas en {file_name}: {missing_text}")


@dataclass(frozen=True)
class DatasetConfig:
    file_name: str
    table_name: str
    create_sql: str
    insert_columns: list[str]
    required_columns: set[str]
    row_builder: Callable[[dict[str, str], int, str], tuple[object, ...]]


def build_homicidios_row(
    row: dict[str, str], row_number: int, file_name: str
) -> tuple[object, ...]:
    fecha = parse_iso_date(
        row.get("fecha"),
        file_name=file_name,
        row_number=row_number,
        field_name="fecha",
    )
    ano, mes = derive_year_month(fecha)
    return (
        as_text(row.get("fecha_hecho")),
        as_text(row.get("cod_depto")),
        as_text(row.get("departamento")),
        as_text(row.get("cod_muni")),
        as_text(row.get("municipio")),
        as_text(row.get("zona")),
        as_text(row.get("sexo")),
        as_text(row.get("arma_medio")),
        as_text(row.get("_modalidad_presunta") or row.get("modalidad_presunta")),
        as_text(row.get("spoa_caracterizacion")),
        as_int(row.get("cantidad")),
        fecha,
        ano,
        mes,
        as_text(row.get("tipo")),
    )


def build_delitos_row(
    row: dict[str, str], row_number: int, file_name: str
) -> tuple[object, ...]:
    fecha = parse_iso_date(
        row.get("fecha"),
        file_name=file_name,
        row_number=row_number,
        field_name="fecha",
    )
    ano, mes = derive_year_month(fecha)
    return (
        as_text(row.get("departamento")),
        as_text(row.get("municipio")),
        as_text(row.get("codigo_dane")),
        as_text(row.get("armas_medios")),
        as_text(row.get("fecha_hecho")),
        as_text(row.get("genero")),
        as_text(row.get("grupo_etario")),
        as_int(row.get("cantidad")),
        as_text(row.get("delito")),
        fecha,
        ano,
        mes,
        as_text(row.get("tipo")),
    )


def build_hurtos_row(
    row: dict[str, str], row_number: int, file_name: str
) -> tuple[object, ...]:
    fecha = parse_iso_date(
        row.get("fecha"),
        file_name=file_name,
        row_number=row_number,
        field_name="fecha",
    )
    ano, mes = derive_year_month(fecha)
    return (
        as_text(row.get("departamento")),
        as_text(row.get("municipio")),
        as_text(row.get("codigo_dane")),
        as_text(row.get("armas_medios")),
        as_text(row.get("fecha_hecho")),
        as_text(row.get("genero")),
        as_text(row.get("grupo_etario")),
        as_text(row.get("tipo_de_hurto")),
        as_int(row.get("cantidad")),
        fecha,
        ano,
        mes,
        as_text(row.get("tipo")),
    )


DATASETS = {
    "homicidios": DatasetConfig(
        file_name="homicidios_clean.csv",
        table_name="homicidios",
        create_sql="""
            CREATE TABLE public.homicidios (
                fecha_hecho TEXT,
                cod_depto TEXT,
                departamento TEXT,
                cod_muni TEXT,
                municipio TEXT,
                zona TEXT,
                sexo TEXT,
                arma_medio TEXT,
                modalidad_presunta TEXT,
                spoa_caracterizacion TEXT,
                cantidad INTEGER,
                fecha DATE,
                ano INTEGER,
                mes INTEGER,
                tipo TEXT
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
            "spoa_caracterizacion",
            "cantidad",
            "fecha",
            "ano",
            "mes",
            "tipo",
        ],
        required_columns={
            "fecha_hecho",
            "cod_depto",
            "departamento",
            "cod_muni",
            "municipio",
            "zona",
            "sexo",
            "arma_medio",
            "_modalidad_presunta",
            "spoa_caracterizacion",
            "cantidad",
            "fecha",
            "tipo",
        },
        row_builder=build_homicidios_row,
    ),
    "delitos_sexuales": DatasetConfig(
        file_name="delitos_sexuales_clean.csv",
        table_name="delitos_sexuales",
        create_sql="""
            CREATE TABLE public.delitos_sexuales (
                departamento TEXT,
                municipio TEXT,
                codigo_dane TEXT,
                armas_medios TEXT,
                fecha_hecho TEXT,
                genero TEXT,
                grupo_etario TEXT,
                cantidad INTEGER,
                delito TEXT,
                fecha DATE,
                ano INTEGER,
                mes INTEGER,
                tipo TEXT
            )
        """,
        insert_columns=[
            "departamento",
            "municipio",
            "codigo_dane",
            "armas_medios",
            "fecha_hecho",
            "genero",
            "grupo_etario",
            "cantidad",
            "delito",
            "fecha",
            "ano",
            "mes",
            "tipo",
        ],
        required_columns={
            "departamento",
            "municipio",
            "codigo_dane",
            "armas_medios",
            "fecha_hecho",
            "genero",
            "grupo_etario",
            "cantidad",
            "delito",
            "fecha",
            "tipo",
        },
        row_builder=build_delitos_row,
    ),
    "hurtos": DatasetConfig(
        file_name="hurtos_personas_clean.csv",
        table_name="hurtos",
        create_sql="""
            CREATE TABLE public.hurtos (
                departamento TEXT,
                municipio TEXT,
                codigo_dane TEXT,
                armas_medios TEXT,
                fecha_hecho TEXT,
                genero TEXT,
                grupo_etario TEXT,
                tipo_de_hurto TEXT,
                cantidad INTEGER,
                fecha DATE,
                ano INTEGER,
                mes INTEGER,
                tipo TEXT
            )
        """,
        insert_columns=[
            "departamento",
            "municipio",
            "codigo_dane",
            "armas_medios",
            "fecha_hecho",
            "genero",
            "grupo_etario",
            "tipo_de_hurto",
            "cantidad",
            "fecha",
            "ano",
            "mes",
            "tipo",
        ],
        required_columns={
            "departamento",
            "municipio",
            "codigo_dane",
            "armas_medios",
            "fecha_hecho",
            "genero",
            "grupo_etario",
            "tipo_de_hurto",
            "cantidad",
            "fecha",
            "tipo",
        },
        row_builder=build_hurtos_row,
    ),
}


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
    # Carga la configuracion de PostgreSQL desde .env sin usar rutas absolutas.
    load_dotenv(ENV_PATH)

    settings: dict[str, str | int] = {
        "host": os.getenv("PGHOST", "localhost"),
        "port": int(os.getenv("PGPORT", "5432")),
        "user": os.getenv("PGUSER", "postgres"),
        "password": os.getenv("PGPASSWORD", ""),
    }

    if not settings["password"]:
        raise ValueError("Falta PGPASSWORD en el archivo .env.")

    target_database = os.getenv("PGDATABASE", "criminalidad")
    maintenance_database = os.getenv("PGMAINTENANCE_DB", "postgres")
    return settings, target_database, maintenance_database


def open_connection(settings: dict[str, str | int], dbname: str):
    return psycopg2.connect(dbname=dbname, connect_timeout=5, **settings)


def ensure_database_exists(
    settings: dict[str, str | int], target_database: str, maintenance_database: str
) -> None:
    # La base se crea desde la base de mantenimiento para evitar errores de conexion inicial.
    connection = open_connection(settings, maintenance_database)
    try:
        connection.autocommit = True
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1 FROM pg_database WHERE datname = %s", (target_database,))
            if cursor.fetchone() is None:
                print(f"BASE DE DATOS: creando {target_database}...")
                cursor.execute(
                    sql.SQL("CREATE DATABASE {}").format(sql.Identifier(target_database))
                )
            else:
                print(f"BASE DE DATOS: {target_database} ya existe.")
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
    print(f"TABLA CREADA: public.{config.table_name}")


def create_indexes(cursor, table_name: str) -> None:
    index_columns = ["fecha", "departamento", "municipio", "ano", "mes"]
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
        raise FileNotFoundError(f"No existe el archivo requerido: {source.relative_to(BASE_DIR)}")

    print(f"LEYENDO ARCHIVO: {source.relative_to(BASE_DIR)}")

    rows: list[tuple[object, ...]] = []
    with source.open("r", encoding="utf-8-sig", newline="") as file_handle:
        reader = csv.DictReader(file_handle)
        require_columns(reader.fieldnames, config.required_columns, file_name=config.file_name)

        for row_number, row in enumerate(reader, start=2):
            # Se deriva ano y mes desde fecha dentro de cada row_builder.
            rows.append(config.row_builder(row, row_number, config.file_name))

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


def print_header(settings: dict[str, str | int], target_database: str) -> None:
    print("=" * 90)
    print("POSTGRESQL: CARGA DE CSV LIMPIOS")
    print("-" * 90)
    print(
        f"host={settings['host']} port={settings['port']} "
        f"user={settings['user']} db={target_database} schema={PUBLIC_SCHEMA}"
    )


def main() -> None:
    args = parse_args()
    selected_names = args.only or list(DATASETS.keys())
    settings, target_database, maintenance_database = get_settings()

    print_header(settings, target_database)
    ensure_database_exists(settings, target_database, maintenance_database)

    connection = open_connection(settings, target_database)
    connection.autocommit = False
    print("CONEXION EXITOSA: PostgreSQL listo para carga.")

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
                    f"ARCHIVO CARGADO: {config.file_name} -> public.{config.table_name}"
                )
                print(f"TOTAL DE FILAS CARGADAS: {total_rows}")
                print("-" * 90)

            # Verificacion final para dejar visible el conteo exacto cargado en cada tabla.
            print("VERIFICACION FINAL")
            for dataset_name in selected_names:
                table_name = DATASETS[dataset_name].table_name
                print(f"SELECT COUNT(*) FROM public.{table_name}; -> {count_rows(cursor, table_name)}")

        connection.commit()
        print("-" * 90)
        print("TODO BIEN: PostgreSQL alineado con los CSV limpios actuales.")
    except Exception as error:
        connection.rollback()
        print(f"ERROR: la carga fue revertida. Detalle: {error}")
        raise
    finally:
        connection.close()


if __name__ == "__main__":
    main()
