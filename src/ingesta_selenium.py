from __future__ import annotations

from pathlib import Path

import requests


BASE_DIR = Path(__file__).resolve().parents[1]
RAW_DIR = BASE_DIR / "data" / "raw"

DATASETS = {
    "homicidios": "https://www.datos.gov.co/resource/m8fd-ahd9.csv?$limit=10000",
    "delitos_sexuales": "https://www.datos.gov.co/resource/fpe5-yrmw.csv?$limit=10000",
    "hurtos_personas": "https://www.datos.gov.co/resource/9vha-vh9n.csv?$limit=10000",
}

HEADERS = {
    "User-Agent": "Mozilla/5.0",
    "Accept": "text/csv",
}


def download_dataset(name: str, url: str) -> None:
    print(f"Descargando {name}...")

    response = requests.get(url, headers=HEADERS, timeout=60)
    if response.status_code != 200 or len(response.content) <= 100:
        raise RuntimeError(f"Error en {name} (status {response.status_code})")

    destination = RAW_DIR / f"{name}.csv"
    destination.write_bytes(response.content)
    print(f"CORRECTO: {name} guardado en {destination}")


def main() -> None:
    RAW_DIR.mkdir(parents=True, exist_ok=True)

    for name, url in DATASETS.items():
        try:
            download_dataset(name, url)
        except Exception as error:
            print(f"ERROR: {name} no pudo descargarse: {error}")

    print("TODO BIEN: data/raw actualizado.")


if __name__ == "__main__":
    main()
