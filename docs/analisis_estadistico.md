# Analisis estadistico ANOVA

## Objetivo del analisis estadistico

Este modulo complementa los dashboards del proyecto **Radar Delito / Analisis de Criminalidad en Colombia** con una validacion estadistica clara y separada por dashboard.

La idea no es mezclar los tres delitos como si fueran el mismo dataset. La idea es validar si las diferencias observadas dentro de cada dashboard son estadisticamente significativas.

## Por que no se comparan directamente los tres delitos

Los datasets de homicidios, delitos sexuales y hurto de vehiculos no tienen la misma cobertura temporal ni la misma estructura interna.

Por esa razon:

- la comparacion entre los tres delitos se mantiene como lectura descriptiva
- la validacion inferencial formal se hace por separado dentro de cada dataset

## Datasets usados

- `data/clean/homicidios_clean.csv`
- `data/clean/delitos_sexuales_clean.csv`
- `data/clean/hurtos_personas_clean.csv`

## Variable objetivo

- `cantidad`

## Analisis por dashboard

### Homicidios

- Grupo comparado: `departamento`
- Variable objetivo: `cantidad`
- Unidad usada para ANOVA: cantidad agregada por `departamento + periodo`

### Delitos sexuales

- Grupo comparado: `grupo_etario`
- Variable objetivo: `cantidad`
- Unidad usada para ANOVA: cantidad agregada por `grupo_etario + periodo`

### Hurto de vehiculos

- Grupo comparado: `departamento`
- Variable objetivo: `cantidad`
- Unidad usada para ANOVA: cantidad agregada por `departamento + periodo`

## Que es ANOVA

ANOVA es una prueba estadistica que permite comparar varios grupos al mismo tiempo.

En este proyecto se usa para responder preguntas como:

- hay diferencias significativas entre departamentos en homicidios?
- hay diferencias significativas entre grupos etarios en delitos sexuales?
- hay diferencias significativas entre departamentos en hurto de vehiculos?

## Que es Tukey

La prueba post hoc de Tukey se usa despues de ANOVA.

Su funcion es identificar entre que grupos especificos aparecen las diferencias detectadas por ANOVA.

## Como interpretar p < 0.05

- Si `p < 0.05`, se rechaza la hipotesis nula.
- En lenguaje simple, eso sugiere que las diferencias observadas no parecen deberse solo al azar.
- Si `p >= 0.05`, no hay evidencia suficiente para afirmar diferencias significativas.

## Archivos generados

El script genera:

- `src/estadistica/resultados/anova_homicidios_departamento.csv`
- `src/estadistica/resultados/tukey_homicidios_departamento.csv`
- `src/estadistica/resultados/anova_sexuales_grupo_etario.csv`
- `src/estadistica/resultados/tukey_sexuales_grupo_etario.csv`
- `src/estadistica/resultados/anova_hurtos_departamento.csv`
- `src/estadistica/resultados/tukey_hurtos_departamento.csv`
- `src/estadistica/resultados/resumen_descriptivo.csv`
- `src/estadistica/resultados/interpretacion_estadistica_final.txt`

## Ejecucion

Desde la raiz del proyecto:

```bash
python src/estadistica/anova_delitos.py
```

## Conclusion final sencilla

La validacion estadistica refuerza los dashboards sin mezclar datasets que no son homogeneos entre si.

En lugar de comparar directamente homicidios, delitos sexuales y hurto de vehiculos como si fueran una sola serie comparable, el proyecto analiza cada dashboard por separado y valida si sus grupos internos presentan diferencias significativas.
