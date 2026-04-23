from __future__ import annotations

import argparse
import os
from dataclasses import dataclass
from pathlib import Path

import psycopg2
from psycopg2 import sql


BASE_DIR = Path(__file__).resolve().parents[1]
CLEAN_DIR = BASE_DIR / "data" / "clean"
ENV_PATH = BASE_DIR / ".env"


@dataclass(frozen=True)
class DatasetConfig:
    file_name: str
    table_name: str
    columns_sql: str


DATASETS = {
    "homicidios": DatasetConfig(
        file_name="homicidios.csv",
        table_name="homicidios",
        columns_sql="""
            fecha_hecho DATE,
            cod_depto TEXT,
            departamento TEXT,
            cod_muni TEXT,
            municipio TEXT,
            zona TEXT,
            sexo TEXT,
            arma_medio TEXT,
            _modalidad_presunta TEXT,
            spoa_caracterizacion TEXT,
            cantidad INTEGER,
            "FECHA" DATE,
            "ANO" INTEGER,
            "MES" INTEGER
        """,
    ),
    "delitos_sexuales": DatasetConfig(
        file_name="delitos_sexuales.csv",
        table_name="delitos_sexuales",
        columns_sql="""
            departamento TEXT,
            municipio TEXT,
            codigo_dane TEXT,
            armas_medios TEXT,
            fecha_hecho TEXT,
            genero TEXT,
            grupo_etario TEXT,
            cantidad INTEGER,
            delito TEXT,
            "FECHA" DATE,
            "ANO" INTEGER,
            "MES" INTEGER
        """,
    ),
    "hurtos_personas": DatasetConfig(
        file_name="hurtos_personas.csv",
        table_name="hurtos_personas",
        columns_sql="""
            departamento TEXT,
            municipio TEXT,
            codigo_dane TEXT,
            armas_medios TEXT,
            fecha_hecho TEXT,
            genero TEXT,
            grupo_etario TEXT,
            tipo_de_hurto TEXT,
            cantidad INTEGER,
            "FECHA" DATE,
            "ANO" INTEGER,
            "MES" INTEGER
        """,
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
        description="Conecta el proyecto a PostgreSQL y carga los CSV limpios."
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
        raise ValueError(
            "Falta PGPASSWORD. Crea un archivo .env basado en .env.example con tu password real."
        )

    target_database = os.getenv("PGDATABASE", "criminalidad")
    schema_name = os.getenv("PGSCHEMA", "criminalidad")
    maintenance_database = os.getenv("PGMAINTENANCE_DB", "postgres")
    return settings, target_database, schema_name, maintenance_database


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
            exists = cursor.fetchone() is not None
            if not exists:
                cursor.execute(
                    sql.SQL("CREATE DATABASE {}").format(sql.Identifier(target_database))
                )
    finally:
        connection.close()


def ensure_schema(cursor, schema_name: str) -> None:
    cursor.execute(
        sql.SQL("CREATE SCHEMA IF NOT EXISTS {}").format(sql.Identifier(schema_name))
    )


def ensure_table(cursor, schema_name: str, config: DatasetConfig) -> None:
    cursor.execute(
        sql.SQL("CREATE TABLE IF NOT EXISTS {}.{} ({})").format(
            sql.Identifier(schema_name),
            sql.Identifier(config.table_name),
            sql.SQL(config.columns_sql),
        )
    )


def truncate_table(cursor, schema_name: str, table_name: str) -> None:
    cursor.execute(
        sql.SQL("TRUNCATE TABLE {}.{}").format(
            sql.Identifier(schema_name),
            sql.Identifier(table_name),
        )
    )


def create_indexes(cursor, schema_name: str, table_name: str) -> None:
    index_columns = ["FECHA", "departamento", "municipio"]
    for column in index_columns:
        cursor.execute(
            sql.SQL(
                "CREATE INDEX IF NOT EXISTS {} ON {}.{} ({})"
            ).format(
                sql.Identifier(f"idx_{table_name}_{column.lower()}"),
                sql.Identifier(schema_name),
                sql.Identifier(table_name),
                sql.Identifier(column),
            )
        )


def copy_csv_to_table(connection, cursor, schema_name: str, config: DatasetConfig) -> int:
    source = CLEAN_DIR / config.file_name
    if not source.exists():
        raise FileNotFoundError(f"No existe el archivo limpio requerido: {source}")

    copy_query = sql.SQL(
        "COPY {}.{} FROM STDIN WITH (FORMAT CSV, HEADER TRUE, ENCODING 'UTF8')"
    ).format(sql.Identifier(schema_name), sql.Identifier(config.table_name))

    with source.open("r", encoding="utf-8", newline="") as file_handle:
        cursor.copy_expert(copy_query.as_string(connection), file_handle)

    cursor.execute(
        sql.SQL("SELECT COUNT(*) FROM {}.{}").format(
            sql.Identifier(schema_name),
            sql.Identifier(config.table_name),
        )
    )
    return int(cursor.fetchone()[0])


def print_connection_summary(
    settings: dict[str, str | int], target_database: str, schema_name: str
) -> None:
    print("=" * 90)
    print("POSTGRESQL: INICIO DE CARGA")
    print("-" * 90)
    print(
        f"host={settings['host']} port={settings['port']} "
        f"user={settings['user']} db={target_database} schema={schema_name}"
    )


def main() -> None:
    args = parse_args()
    selected_names = args.only or list(DATASETS.keys())
    settings, target_database, schema_name, maintenance_database = get_settings()

    print_connection_summary(settings, target_database, schema_name)
    ensure_database_exists(settings, target_database, maintenance_database)

    connection = open_connection(settings, target_database)
    connection.autocommit = False

    try:
        with connection.cursor() as cursor:
            ensure_schema(cursor, schema_name)

            for dataset_name in selected_names:
                config = DATASETS[dataset_name]
                ensure_table(cursor, schema_name, config)
                truncate_table(cursor, schema_name, config.table_name)
                total_rows = copy_csv_to_table(connection, cursor, schema_name, config)
                create_indexes(cursor, schema_name, config.table_name)
                print(
                    f"CORRECTO: {dataset_name} cargado en "
                    f"{schema_name}.{config.table_name} ({total_rows} filas)"
                )

        connection.commit()
        print("-" * 90)
        print("TODO BIEN: PostgreSQL conectado y carga completada.")
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()


if __name__ == "__main__":
    main()
