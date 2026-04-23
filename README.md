# 🚨 Proyecto de Criminalidad en Colombia

Un mini pipeline de datos para **descargar, limpiar y organizar** información de criminalidad en Colombia usando **Python + PySpark**.  
El proyecto toma datos abiertos, los guarda en `data/raw`, los procesa y deja una versión lista para análisis en `data/clean`. 📊

## ✨ ¿Qué hace este proyecto?

- 📥 Descarga datasets de criminalidad desde `datos.gov.co`
- 🗂️ Guarda los archivos originales en `data/raw`
- 🧹 Limpia y estandariza los datos con PySpark
- 🧠 Corrige formatos de fecha y agrega `FECHA`, `ANO` y `MES`
- 📍 Normaliza ubicaciones como `municipio` y `departamento`
- 🔁 Consolida filas repetidas sumando `cantidad`
- 💾 Guarda los resultados finales en `data/clean`
- ✅ Muestra tablas de ejemplo y resúmenes de limpieza en consola

## 🧱 Estructura del proyecto

```text
proyecto_criminalidad/
├── data/
│   ├── raw/
│   │   ├── homicidios.csv
│   │   ├── delitos_sexuales.csv
│   │   └── hurtos_personas.csv
│   └── clean/
│       ├── homicidios.csv
│       ├── delitos_sexuales.csv
│       └── hurtos_personas.csv
├── src/
│   ├── ingesta_selenium.py
│   └── procesamiento.py
└── README.md
```

## 📚 Datasets utilizados

- 🔪 `homicidios`
- ⚠️ `delitos_sexuales`
- 👜 `hurtos_personas`

Fuentes configuradas en el proyecto:

- `https://www.datos.gov.co/resource/m8fd-ahd9.csv?$limit=10000`
- `https://www.datos.gov.co/resource/fpe5-yrmw.csv?$limit=10000`
- `https://www.datos.gov.co/resource/9vha-vh9n.csv?$limit=10000`

## ⚙️ Requisitos

- 🐍 Python 3.10 o superior
- ☕ Java instalado para ejecutar PySpark
- 📦 Librerías de Python:

```bash
pip install pyspark requests
```

## 🚀 Cómo ejecutar el proyecto

Ejecuta siempre desde la raíz del proyecto:

### 1. Descargar los datos crudos

```bash
python src/ingesta_selenium.py
```

Esto deja los archivos en `data/raw`.  
Aunque el archivo se llama `ingesta_selenium.py`, actualmente la descarga se hace con `requests`. 🌐

### 2. Procesar y limpiar los datos

```bash
python src/procesamiento.py
```

Esto:

- limpia columnas y valores
- corrige fechas
- elimina registros inválidos
- consolida duplicados sin perder la suma de `cantidad`
- guarda los resultados en `data/clean`

## 🧼 Reglas principales de limpieza

El pipeline de `procesamiento.py` aplica estas transformaciones:

- 🔠 normaliza nombres de columnas
- 🪄 pasa texto a mayúsculas y elimina espacios sobrantes
- 📍 limpia sufijos como `(CT)` en municipios
- 🔢 convierte `cantidad` a entero
- 📅 interpreta fechas según el formato de cada dataset
- 🗓️ crea `FECHA`, `ANO` y `MES`
- 🚫 filtra registros con fecha o cantidad inválida
- 🔁 agrupa filas repetidas y suma `cantidad`
- 💽 escribe un CSV limpio final por dataset

## 🖥️ ¿Qué muestra la ejecución?

Cuando corres `python src/procesamiento.py`, el script imprime:

- una tabla de muestra por cada dataset
- total de registros originales
- total de registros finales
- cuántos registros se limpiaron
- cuántas filas se consolidaron
- suma original y final de `cantidad`
- mensajes `CORRECTO` por cada proceso
- un resumen general al final

## 📦 Salida esperada

Archivos finales en:

- `data/clean/homicidios.csv`
- `data/clean/delitos_sexuales.csv`
- `data/clean/hurtos_personas.csv`

## 💡 Nota importante

En `homicidios`, la columna `fecha_hecho` queda guardada solo con la fecha, sin la hora `00:00:00.000`, para dejar el archivo más limpio y consistente. 🗓️

## 🌟 Estado del proyecto

Proyecto funcional para:

- prácticas de ingeniería de datos
- limpieza de datos con PySpark
- análisis exploratorio posterior en notebooks o dashboards

---

Hecho con datos abiertos, Python y bastante limpieza de datos. 🧹🇨🇴
