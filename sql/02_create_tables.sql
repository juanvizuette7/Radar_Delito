DROP TABLE IF EXISTS public.homicidios;
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
);

DROP TABLE IF EXISTS public.delitos_sexuales;
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
);

DROP TABLE IF EXISTS public.hurtos;
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
);

CREATE INDEX idx_homicidios_fecha ON public.homicidios (fecha);
CREATE INDEX idx_homicidios_departamento ON public.homicidios (departamento);
CREATE INDEX idx_homicidios_municipio ON public.homicidios (municipio);
CREATE INDEX idx_homicidios_ano ON public.homicidios (ano);
CREATE INDEX idx_homicidios_mes ON public.homicidios (mes);

CREATE INDEX idx_delitos_sexuales_fecha ON public.delitos_sexuales (fecha);
CREATE INDEX idx_delitos_sexuales_departamento ON public.delitos_sexuales (departamento);
CREATE INDEX idx_delitos_sexuales_municipio ON public.delitos_sexuales (municipio);
CREATE INDEX idx_delitos_sexuales_ano ON public.delitos_sexuales (ano);
CREATE INDEX idx_delitos_sexuales_mes ON public.delitos_sexuales (mes);

CREATE INDEX idx_hurtos_fecha ON public.hurtos (fecha);
CREATE INDEX idx_hurtos_departamento ON public.hurtos (departamento);
CREATE INDEX idx_hurtos_municipio ON public.hurtos (municipio);
CREATE INDEX idx_hurtos_ano ON public.hurtos (ano);
CREATE INDEX idx_hurtos_mes ON public.hurtos (mes);
