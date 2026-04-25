SELECT COUNT(*) AS total_homicidios FROM public.homicidios;
SELECT COUNT(*) AS total_delitos_sexuales FROM public.delitos_sexuales;
SELECT COUNT(*) AS total_hurtos FROM public.hurtos;

SELECT departamento, municipio, modalidad_presunta, modalidad_reportada, cantidad
FROM public.homicidios
LIMIT 10;

SELECT departamento, municipio, armas_medios, armas_medios_reportado, delito, cantidad
FROM public.delitos_sexuales
LIMIT 10;

SELECT departamento, municipio, armas_medios, armas_medios_reportado, tipo_de_hurto, cantidad
FROM public.hurtos
LIMIT 10;
