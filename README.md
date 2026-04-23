# 🚨 Proyecto de Criminalidad en Colombia

Un mini pipeline de datos para **descargar, limpiar y organizar** información de criminalidad en Colombia usando **Python + PySpark**.  
El flujo toma datos abiertos, los guarda en `data/raw`, los limpia en `data/clean` y también los deja listos dentro de **PostgreSQL** para análisis y consultas. 📊

## ✨ ¿Qué hace este proyecto?

- 📥 Descarga datasets de criminalidad desde `datos.gov.co`
- 🗂️ Guarda los archivos originales en `data/raw`
- 🧹 Limpia y estandariza los datos con PySpark
- 🧠 Corrige formatos de fecha y agrega `FECHA`, `ANO` y `MES`
- 📍 Normaliza ubicaciones como `municipio` y `departamento`
- 🔁 Consolida filas repetidas sumando `cantidad`
- 💾 Guarda CSV limpios en `data/clean`
- 🐘 Crea y carga tablas en PostgreSQL
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
│   ├── procesamiento.py
│   └── cargar_postgres.py
├── .env.example
├── requirements.txt
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
- 🐘 PostgreSQL instalado y corriendo
- 📦 Librerías de Python:

```bash
pip install -r requirements.txt
```

## 🚀 Cómo ejecutar el proyecto

Ejecuta siempre desde la raíz del proyecto.

### 1. Descargar los datos crudos

```bash
python src/ingesta_selenium.py
```

### 2. Procesar y limpiar los datos

```bash
python src/procesamiento.py
```

### 3. Configurar PostgreSQL

Crea tu archivo `.env` desde la plantilla:

```bash
copy .env.example .env
```

Luego completa tu password real en `.env`.

Variables incluidas:

- `PGHOST`
- `PGPORT`
- `PGUSER`
- `PGPASSWORD`
- `PGDATABASE`
- `PGSCHEMA`
- `PGMAINTENANCE_DB`

### 4. Cargar los datos en PostgreSQL

```bash
python src/cargar_postgres.py
```

Si quieres cargar solo un dataset:

```bash
python src/cargar_postgres.py --only homicidios
python src/cargar_postgres.py --only delitos_sexuales hurtos_personas
```

El script:

- 🔌 se conecta a PostgreSQL
- 🏗️ crea la base si no existe
- 🧱 crea el esquema si no existe
- 🗃️ crea las tablas necesarias
- ♻️ vacía cada tabla antes de recargarla
- 📥 copia los CSV limpios desde `data/clean`
- 📌 crea índices básicos por fecha y ubicación
- ✅ imprime mensajes `CORRECTO` por cada carga

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

Cuando corres `python src/cargar_postgres.py`, el script imprime:

- los datos de conexión usados
- un mensaje `CORRECTO` por cada tabla cargada
- un mensaje final `TODO BIEN`

## 📦 Salida esperada

Archivos finales:

- `data/clean/homicidios.csv`
- `data/clean/delitos_sexuales.csv`
- `data/clean/hurtos_personas.csv`

Objetos creados en PostgreSQL:

- base `criminalidad` si no existía
- esquema `criminalidad`
- tabla `criminalidad.homicidios`
- tabla `criminalidad.delitos_sexuales`
- tabla `criminalidad.hurtos_personas`

## 💡 Nota importante

En `homicidios`, la columna `fecha_hecho` queda guardada solo con la fecha, sin la hora `00:00:00.000`, para dejar el archivo más limpio y consistente. 🗓️

La contraseña no se deja en el código: se configura por `.env`. 🔐
## 🌟 Estado del proyecto

Proyecto funcional para:

- prácticas de ingeniería de datos
- limpieza de datos con PySpark
- análisis exploratorio posterior en notebooks
- consultas y dashboards sobre PostgreSQL

---

Hecho con datos abiertos, Python y bastante limpieza de datos. 🧹🇨🇴
