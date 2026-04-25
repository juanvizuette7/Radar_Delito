# Radar Delito Analytics Web

Frontend en React + Vite + TypeScript para visualizar dashboards de criminalidad con una interfaz moderna, oscura y orientada a producto real.

## Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router
- lucide-react

## Ejecutar en local

```bash
npm install
npm run dev
```

La app queda disponible en la URL que muestre Vite, normalmente:

```bash
http://localhost:5173
```

## Build de producción

```bash
npm run build
```

El resultado queda en:

```bash
dist/
```

## Deploy en Firebase Hosting

### 1. Instalar Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Iniciar sesión

```bash
firebase login
```

### 3. Inicializar hosting dentro de la carpeta `web`

```bash
firebase init hosting
```

Usa estas respuestas:

- `What do you want to use as your public directory?` → `dist`
- `Configure as a single-page app?` → `Yes`
- `Set up automatic builds and deploys with GitHub?` → `No`
- `File dist/index.html already exists. Overwrite?` → `No`

### 4. Generar el build

```bash
npm run build
```

### 5. Desplegar

```bash
firebase deploy
```

## Archivos útiles

- `src/` → componentes, páginas, rutas y estilos
- `firebase.json` → configuración de hosting para SPA
- `.firebaserc.example` → ejemplo de configuración del proyecto Firebase

## Rutas de la app

- `/`
- `/homicidios`
- `/sexuales`
- `/hurtos`
