import requests
import os

# ================= RUTA DATA LAKE =================
download_path = os.path.abspath("../data/raw")
os.makedirs(download_path, exist_ok=True)

# ================= DATASETS =================
datasets = {
    "homicidios": "https://www.datos.gov.co/resource/m8fd-ahd9.csv?$limit=10000",
    "delitos_sexuales": "https://www.datos.gov.co/resource/fpe5-yrmw.csv?$limit=10000",
    "hurtos_personas": "https://www.datos.gov.co/resource/9vha-vh9n.csv?$limit=10000"
}

headers = {
    "User-Agent": "Mozilla/5.0",
    "Accept": "text/csv"
}

# ================= DESCARGA =================
for nombre, url in datasets.items():
    print(f"Descargando {nombre}...")

    try:
        r = requests.get(url, headers=headers)

        if r.status_code == 200 and len(r.content) > 100:
            with open(f"{download_path}/{nombre}.csv", "wb") as f:
                f.write(r.content)
            print(f" {nombre} guardado en Data Lake")
        else:
            print(f" Error en {nombre} (status {r.status_code})")

    except Exception as e:
        print(f" Error en {nombre}: {e}")

print("Data Lake listo")