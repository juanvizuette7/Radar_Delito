DROP TABLE IF EXISTS public.homicidios;
CREATE TABLE public.homicidios (
    fecha_hecho DATE,
    cod_depto TEXT,
    departamento TEXT,
    cod_muni TEXT,
    municipio TEXT,
    zona TEXT,
    sexo TEXT,
    arma_medio TEXT,
    modalidad_presunta TEXT,
    modalidad_reportada BOOLEAN,
    spoa_caracterizacion TEXT,
    fecha DATE,
    ano INTEGER,
    mes INTEGER,
    cantidad INTEGER,
    periodo TEXT
);

DROP TABLE IF EXISTS public.delitos_sexuales;
CREATE TABLE public.delitos_sexuales (
    departamento TEXT,
    municipio TEXT,
    codigo_dane TEXT,
    armas_medios TEXT,
    armas_medios_reportado BOOLEAN,
    fecha_hecho TEXT,
    fecha DATE,
    ano INTEGER,
    mes INTEGER,
    periodo TEXT,
    genero TEXT,
    grupo_etario TEXT,
    delito TEXT,
    cantidad INTEGER
);

DROP TABLE IF EXISTS public.hurtos;
CREATE TABLE public.hurtos (
    departamento TEXT,
    municipio TEXT,
    codigo_dane TEXT,
    armas_medios TEXT,
    armas_medios_reportado BOOLEAN,
    fecha_hecho TEXT,
    fecha DATE,
    ano INTEGER,
    mes INTEGER,
    periodo TEXT,
    genero TEXT,
    grupo_etario TEXT,
    tipo_de_hurto TEXT,
    cantidad INTEGER
);

CREATE INDEX idx_homicidios_fecha ON public.homicidios (fecha);
CREATE INDEX idx_homicidios_departamento ON public.homicidios (departamento);
CREATE INDEX idx_homicidios_municipio ON public.homicidios (municipio);
CREATE INDEX idx_homicidios_periodo ON public.homicidios (periodo);

CREATE INDEX idx_delitos_sexuales_fecha ON public.delitos_sexuales (fecha);
CREATE INDEX idx_delitos_sexuales_departamento ON public.delitos_sexuales (departamento);
CREATE INDEX idx_delitos_sexuales_municipio ON public.delitos_sexuales (municipio);
CREATE INDEX idx_delitos_sexuales_periodo ON public.delitos_sexuales (periodo);

CREATE INDEX idx_hurtos_fecha ON public.hurtos (fecha);
CREATE INDEX idx_hurtos_departamento ON public.hurtos (departamento);
CREATE INDEX idx_hurtos_municipio ON public.hurtos (municipio);
CREATE INDEX idx_hurtos_periodo ON public.hurtos (periodo);
