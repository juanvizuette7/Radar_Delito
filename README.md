# Radar Delito

Proyecto de analisis de criminalidad en Colombia con pipeline de datos, carga en PostgreSQL, consumo en Power BI y una aplicacion web en React para visualizar los dashboards.

## Resumen

Este repositorio resuelve el flujo completo del proyecto:

- descarga datos abiertos desde `datos.gov.co`
- guarda archivos crudos en `data/raw`
- limpia y consolida los datasets con PySpark
- genera archivos finales en `data/clean`
- crea y carga tablas en PostgreSQL
- permite conectar la base a Power BI
- incluye una web en React + Vite para presentar los tableros

Los tres frentes analiticos del proyecto son:

- `homicidios`
- `delitos_sexuales`
- `hurtos_personas`

## Flujo general

```text
Datos abiertos -> data/raw -> procesamiento PySpark -> data/clean -> PostgreSQL -> Power BI -> Web React
```

## Estructura del repositorio

```text
proyecto_criminalidad/
|-- data/
|   |-- raw/
|   |   |-- homicidios.csv
|   |   |-- delitos_sexuales.csv
|   |   `-- hurtos_personas.csv
|   `-- clean/
|       |-- homicidios.csv
|       |-- delitos_sexuales.csv
|       `-- hurtos_personas.csv
|-- sql/
|   |-- 01_create_database.sql
|   |-- 02_create_tables.sql
|   `-- 03_verify_load.sql
|-- src/
|   |-- ingesta_selenium.py
|   |-- procesamiento.py
|   `-- cargar_postgres.py
|-- web/
|   |-- src/
|   |-- package.json
|   |-- firebase.json
|   `-- README.md
|-- .env.example
|-- requirements.txt
`-- README.md
```

## Fuentes de datos

Datasets configurados:

- `homicidios`: `https://www.datos.gov.co/resource/m8fd-ahd9.csv?$limit=10000`
- `delitos_sexuales`: `https://www.datos.gov.co/resource/fpe5-yrmw.csv?$limit=10000`
- `hurtos_personas`: `https://www.datos.gov.co/resource/9vha-vh9n.csv?$limit=10000`

## Tecnologias usadas

Backend de datos:

- Python
- Requests
- PySpark
- PostgreSQL
- psycopg2

Visualizacion:

- Power BI
- React
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router

## Requisitos

Para ejecutar todo el proyecto en local necesitas:

- Python 3.10 o superior
- Java instalado para PySpark
- PostgreSQL instalado y corriendo
- Node.js 18 o superior para la web
- npm

Instalacion de dependencias de Python:

```bash
pip install -r requirements.txt
```

Instalacion de dependencias del frontend:

```bash
cd web
npm install
```

## Ejecucion rapida

Si ya tienes PostgreSQL listo, este es el flujo recomendado desde la raiz del proyecto:

```bash
python src/ingesta_selenium.py
python src/procesamiento.py
copy .env.example .env
python src/cargar_postgres.py
```

Luego:

- conecta `criminalidad` a Power BI
- levanta la web con `npm run dev` dentro de `web`

## Paso 1. Descargar los datos crudos

Script:

```bash
python src/ingesta_selenium.py
```

Que hace:

- descarga los 3 CSV desde las URLs configuradas
- crea `data/raw` si no existe
- guarda:
  - `data/raw/homicidios.csv`
  - `data/raw/delitos_sexuales.csv`
  - `data/raw/hurtos_personas.csv`

Salida esperada en consola:

- mensajes `CORRECTO` por cada dataset descargado
- mensaje final `TODO BIEN: data/raw actualizado.`

## Paso 2. Procesar y limpiar los datos

Script:

```bash
python src/procesamiento.py
```

Que hace:

- normaliza nombres de columnas
- estandariza texto en mayusculas
- limpia `municipio` y `departamento`
- convierte `cantidad` a entero
- interpreta fechas segun cada dataset
- crea `FECHA`, `ANO` y `MES`
- filtra registros invalidos
- consolida filas repetidas sumando `cantidad`
- ordena y guarda los CSV finales en `data/clean`

Archivos generados:

- `data/clean/homicidios.csv`
- `data/clean/delitos_sexuales.csv`
- `data/clean/hurtos_personas.csv`

La ejecucion muestra:

- total original por dataset
- total final por dataset
- registros limpiados
- registros invalidos
- filas consolidadas
- suma original y final de `cantidad`
- una muestra de la tabla final
- resumen global al terminar

Nota:

- en `homicidios`, `fecha_hecho` queda guardada solo como fecha, sin la hora `00:00:00.000`

## Paso 3. Configurar PostgreSQL

Crea el archivo `.env` a partir de la plantilla:

```bash
copy .env.example .env
```

Despues de copiarlo, edita `PGPASSWORD` con tu password real de PostgreSQL.

Plantilla incluida:

```env
PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=tu_password
PGDATABASE=criminalidad
PGMAINTENANCE_DB=postgres
```

Variables usadas:

- `PGHOST`: host de PostgreSQL
- `PGPORT`: puerto de la instancia
- `PGUSER`: usuario
- `PGPASSWORD`: password
- `PGDATABASE`: base objetivo
- `PGMAINTENANCE_DB`: base usada para crear `criminalidad` si no existe

## Paso 4. Cargar los datos en PostgreSQL

Script principal:

```bash
python src/cargar_postgres.py
```

Carga parcial opcional:

```bash
python src/cargar_postgres.py --only homicidios
python src/cargar_postgres.py --only delitos_sexuales hurtos
```

Que hace el cargador:

- lee `.env`
- valida conexion
- crea la base `criminalidad` si no existe
- recrea las tablas finales en `public`
- inserta los datos desde `data/clean`
- crea indices por `fecha`, `departamento`, `municipio` y `periodo`
- ejecuta verificaciones `SELECT COUNT(*)`
- muestra mensajes `CORRECTO`

Salida esperada:

- `CORRECTO: public.homicidios cargada (...)`
- `CORRECTO: public.delitos_sexuales cargada (...)`
- `CORRECTO: public.hurtos cargada (...)`
- `TODO BIEN: PostgreSQL listo para consultas y Power BI.`

## Esquema final de tablas

### `public.homicidios`

```text
fecha_hecho
cod_depto
departamento
cod_muni
municipio
zona
sexo
arma_medio
modalidad_presunta
modalidad_reportada
spoa_caracterizacion
cantidad
fecha
ano
mes
periodo
```

### `public.delitos_sexuales`

```text
departamento
municipio
codigo_dane
armas_medios
armas_medios_reportado
fecha_hecho
fecha
ano
mes
periodo
genero
grupo_etario
delito
cantidad
```

### `public.hurtos`

```text
departamento
municipio
codigo_dane
armas_medios
armas_medios_reportado
fecha_hecho
fecha
ano
mes
periodo
genero
grupo_etario
tipo_de_hurto
cantidad
```

## Opcion manual por SQL

Si prefieres trabajar manualmente desde pgAdmin, DBeaver o `psql`, el proyecto ya incluye SQL base:

- [sql/01_create_database.sql](/c:/Users/juanv/Desktop/proyecto_criminalidad/sql/01_create_database.sql)
- [sql/02_create_tables.sql](/c:/Users/juanv/Desktop/proyecto_criminalidad/sql/02_create_tables.sql)
- [sql/03_verify_load.sql](/c:/Users/juanv/Desktop/proyecto_criminalidad/sql/03_verify_load.sql)

Uso sugerido:

1. ejecuta `01_create_database.sql`
2. conecta a la base `criminalidad`
3. ejecuta `02_create_tables.sql`
4. importa los CSV limpios con `COPY`, asistente CSV o DBeaver
5. valida con `03_verify_load.sql`

## Verificacion en PostgreSQL

Consultas minimas:

```sql
SELECT COUNT(*) FROM public.homicidios;
SELECT COUNT(*) FROM public.delitos_sexuales;
SELECT COUNT(*) FROM public.hurtos;
```

Consultas de muestra:

```sql
SELECT * FROM public.homicidios LIMIT 10;
SELECT * FROM public.delitos_sexuales LIMIT 10;
SELECT * FROM public.hurtos LIMIT 10;
```

## Conexion a Power BI

En Power BI Desktop:

1. ve a `Obtener datos`
2. selecciona `PostgreSQL database`
3. usa los datos de conexion

Configuracion:

- `Servidor`: `localhost`
- `Puerto`: el mismo valor de `PGPORT` en tu `.env`
- `Base de datos`: `criminalidad`
- `Modo`: `Import`
- `Autenticacion`: usuario y password

Tablas a seleccionar:

- `public.homicidios`
- `public.delitos_sexuales`
- `public.hurtos`

Consejo:

- si Power BI te muestra un total distinto al numero de filas, revisa si estas usando `COUNTROWS` o `SUM(cantidad)`

## Aplicacion web

La carpeta [web](/c:/Users/juanv/Desktop/proyecto_criminalidad/web) contiene una aplicacion React para presentar los dashboards.

Rutas principales:

- `/`
- `/homicidios`
- `/sexuales`
- `/hurtos`

Ejecucion local:

```bash
cd web
npm install
npm run dev
```

Build de produccion:

```bash
cd web
npm run build
```

Preview local del build:

```bash
cd web
npm run preview
```

La app integra un embed de Power BI y organiza el contenido por frente analitico.

## Deploy de la web en Firebase Hosting

Dentro de `web`:

1. instala Firebase CLI

```bash
npm install -g firebase-tools
```

2. inicia sesion

```bash
firebase login
```

3. genera el build

```bash
npm run build
```

4. si necesitas asociar proyecto, crea `.firebaserc` a partir del ejemplo

```bash
copy .firebaserc.example .firebaserc
```

5. despliega

```bash
firebase deploy
```

Archivo clave de hosting:

- [web/firebase.json](/c:/Users/juanv/Desktop/proyecto_criminalidad/web/firebase.json)

## Estado actual del proyecto

Componentes listos:

- ingesta de datos crudos
- limpieza y consolidacion con PySpark
- carga automatica a PostgreSQL
- scripts SQL de apoyo
- conexion a Power BI
- frontend web para visualizacion
- build web listo para despliegue

Ultima corrida validada:

- `public.homicidios`: `7367` filas
- `public.delitos_sexuales`: `9521` filas
- `public.hurtos`: `9584` filas

## Problemas comunes

### `Falta PGPASSWORD en .env`

Completa tu password real en el archivo `.env`.

### Power BI no conecta

Verifica:

- que PostgreSQL este encendido
- que el puerto coincida con `PGPORT`
- que la base `criminalidad` exista
- que las tablas esten en `public`

### `python src/procesamiento.py` falla con PySpark

Revisa:

- Python instalado correctamente
- Java disponible en el sistema
- dependencias instaladas con `pip install -r requirements.txt`

### La web no levanta

Ejecuta dentro de `web`:

```bash
npm install
npm run dev
```

Si PowerShell bloquea `npm`, usa:

```bash
npm.cmd install
npm.cmd run dev
```

## Archivos mas importantes

- [src/ingesta_selenium.py](/c:/Users/juanv/Desktop/proyecto_criminalidad/src/ingesta_selenium.py): descarga de datasets
- [src/procesamiento.py](/c:/Users/juanv/Desktop/proyecto_criminalidad/src/procesamiento.py): limpieza y consolidacion
- [src/cargar_postgres.py](/c:/Users/juanv/Desktop/proyecto_criminalidad/src/cargar_postgres.py): carga a PostgreSQL
- [sql/02_create_tables.sql](/c:/Users/juanv/Desktop/proyecto_criminalidad/sql/02_create_tables.sql): estructura SQL final
- [web/src/App.tsx](/c:/Users/juanv/Desktop/proyecto_criminalidad/web/src/App.tsx): rutas principales de la web
- [web/src/data/dashboards.ts](/c:/Users/juanv/Desktop/proyecto_criminalidad/web/src/data/dashboards.ts): configuracion de dashboards

## Autoria

Web hecha por Juan Vizuette.

Creditos:

- Sebastian Rojas
- Juan Lucero
