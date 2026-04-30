import pandas as pd

# RUTAS
raw_path = "data/raw/"
clean_path = "data/clean/"

# LEER LOS DATASETS
print("Leyendo datasets...")
denuncias = pd.read_csv(raw_path + "delitos_sexuales.csv")
homicidios = pd.read_csv(raw_path + "homicidios.csv")
hurtos = pd.read_csv(raw_path + "hurtos_personas.csv")

# FUNCION DE LIMPIEZA
def limpiar(df, tipo):
    print(f"Limpiando {tipo}...")
    initial = len(df)
    
    # Eliminar duplicados
    df = df.drop_duplicates()
    
    # Eliminar filas con valores nulos
    df = df.dropna()
    
    # Normalizar columnas a minúsculas
    df.columns = df.columns.str.lower()
    
    # detectar columna de fecha automaticamente
    for col in df.columns:
        if "fecha" in col:
            df['fecha'] = pd.to_datetime(df[col], errors='coerce')
    
    # Eliminar filas con fechas inválidas
    df = df.dropna(subset=['fecha'])
    
    final = len(df)
    print(f"  {initial} -> {final} registros")
    
    df['tipo'] = tipo
    return df

# LIMPIAR CADA DATASET
denuncias_clean = limpiar(denuncias, "denuncia")
homicidios_clean = limpiar(homicidios, "homicidio")
hurtos_clean = limpiar(hurtos, "hurto")

# GUARDAR ARCHIVOS SEPARADOS
print("Guardando archivos limpios...")
denuncias_clean.to_csv(clean_path + "delitos_sexuales_clean.csv", index=False)
homicidios_clean.to_csv(clean_path + "homicidios_clean.csv", index=False)
hurtos_clean.to_csv(clean_path + "hurtos_personas_clean.csv", index=False)

