SELECT COUNT(*) AS total_homicidios FROM public.homicidios;
SELECT COUNT(*) AS total_delitos_sexuales FROM public.delitos_sexuales;
SELECT COUNT(*) AS total_hurtos FROM public.hurtos;

SELECT fecha, departamento, municipio, modalidad_presunta, cantidad
FROM public.homicidios
LIMIT 10;

SELECT fecha, departamento, municipio, delito, cantidad
FROM public.delitos_sexuales
LIMIT 10;

SELECT fecha, departamento, municipio, tipo_de_hurto, cantidad
FROM public.hurtos
LIMIT 10;
