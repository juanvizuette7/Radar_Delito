import { Language } from "../context/UiContext";

type SiteCopy = {
  nav: {
    home: string;
    badge: string;
    themeLabel: string;
    light: string;
    dark: string;
    languageLabel: string;
    spanish: string;
    english: string;
    openMenu: string;
    closeMenu: string;
  };
  footer: {
    title: string;
    subtitle: string;
    author: string;
    credits: string;
  };
  home: {
    badge: string;
    titleLead: string;
    titleAccent: string;
    titleTail: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    previewEyebrow: string;
    previewTitle: string;
    previewStatus: string;
    coverageLabel: string;
    coverageTitle: string;
    coverageDescription: string;
    scopeLabel: string;
    scopeTitle: string;
    scopeDescription: string;
    dashboardsEyebrow: string;
    dashboardsTitle: string;
    dashboardsPill: string;
    architectureEyebrow: string;
    architectureTitle: string;
    architectureSteps: { step: string; title: string; copy: string }[];
    insights: { title: string; description: string }[];
  };
  dashboardPage: {
    panelTitle: string;
    panelDescription: string;
    bullets: string[];
  };
  embed: {
    subtitle: string;
    active: string;
    openFullscreen: string;
    closeFullscreen: string;
  };
  notFound: {
    title: string;
    description: string;
    backHome: string;
  };
};

export const siteCopy: Record<Language, SiteCopy> = {
  es: {
    nav: {
      home: "Inicio",
      badge: "Seguimiento nacional",
      themeLabel: "Tema",
      light: "Blanco",
      dark: "Negro",
      languageLabel: "Idioma",
      spanish: "ES",
      english: "EN",
      openMenu: "Abrir menu",
      closeMenu: "Cerrar menu",
    },
    footer: {
      title:
        "Radar Delito. Plataforma de consulta para seguimiento de homicidios, delitos sexuales y hurto de vehiculos en Colombia.",
      subtitle: "Informacion consolidada para analisis territorial y temporal.",
      author: "Web hecha por Juan Vizuette.",
      credits: "Creditos: Sebastian Rojas y Juan Lucero.",
    },
    home: {
      badge: "Plataforma analitica de criminalidad",
      titleLead: "Seguimiento nacional para",
      titleAccent: "homicidios, delitos sexuales y hurto de vehiculos",
      titleTail: "en Colombia.",
      description:
        "Esta plataforma centraliza la consulta de indicadores de criminalidad con lectura territorial, temporal y tematica para apoyar analisis, seguimiento y toma de decisiones.",
      primaryCta: "Explorar dashboards",
      secondaryCta: "Ver resumen",
      previewEyebrow: "Resumen nacional",
      previewTitle: "Frentes de seguimiento",
      previewStatus: "Activo",
      coverageLabel: "Cobertura",
      coverageTitle: "Consulta por tematica",
      coverageDescription:
        "Cada seccion concentra variables y lecturas propias del frente analitico correspondiente.",
      scopeLabel: "Alcance",
      scopeTitle: "Seguimiento continuo",
      scopeDescription:
        "La consulta reune metricas, filtros y visualizaciones para revision periodica de los datos.",
      dashboardsEyebrow: "Dashboards",
      dashboardsTitle: "Selecciona un frente de analisis",
      dashboardsPill: "Consulta consolidada para seguimiento territorial y temporal.",
      architectureEyebrow: "Arquitectura",
      architectureTitle: "Flujo listo para operacion",
      architectureSteps: [
        {
          step: "01",
          title: "Datos limpios",
          copy: "Las tablas parten de archivos ya normalizados, validados y consolidados.",
        },
        {
          step: "02",
          title: "PostgreSQL",
          copy: "La base centraliza la informacion y permite consulta estructurada de los indicadores.",
        },
        {
          step: "03",
          title: "Consulta integrada",
          copy: "La plataforma reune los tableros y facilita la lectura operativa desde un mismo entorno.",
        },
      ],
      insights: [
        {
          title: "Lectura ejecutiva",
          description:
            "Cada vista resume indicadores y variables clave para entender la situacion general de forma rapida.",
        },
        {
          title: "Cobertura tematica",
          description:
            "Los tres tableros permiten revisar violencia letal, delitos sexuales y hurto de vehiculos en un mismo sitio.",
        },
        {
          title: "Acceso multiplataforma",
          description:
            "La navegacion y los tableros pueden consultarse desde escritorio, tableta o movil.",
        },
        {
          title: "Escalabilidad analitica",
          description:
            "La estructura permite incorporar nuevos tableros, indicadores o fuentes cuando el proyecto lo requiera.",
        },
      ],
    },
    dashboardPage: {
      panelTitle: "Consulta analitica integrada",
      panelDescription:
        "Esta vista reune el tablero principal con indicadores y apoyos de lectura para facilitar seguimiento, comparacion y consulta.",
      bullets: [
        "Consulta directa del tablero en Power BI",
        "Indicadores de apoyo para lectura rapida",
        "Acceso desde escritorio, tableta y movil",
      ],
    },
    embed: {
      subtitle: "Consulta territorial, temporal y tematica",
      active: "Consulta activa",
      openFullscreen: "Pantalla completa",
      closeFullscreen: "Salir de pantalla completa",
    },
    notFound: {
      title: "La vista no existe",
      description: "Vuelve al inicio y entra por una de las rutas activas del dashboard.",
      backHome: "Regresar al inicio",
    },
  },
  en: {
    nav: {
      home: "Home",
      badge: "National monitoring",
      themeLabel: "Theme",
      light: "Light",
      dark: "Dark",
      languageLabel: "Language",
      spanish: "ES",
      english: "EN",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    footer: {
      title:
        "Radar Delito. Monitoring platform for homicides, sexual crimes and vehicle theft in Colombia.",
      subtitle: "Consolidated information for territorial and time-based analysis.",
      author: "Website built by Juan Vizuette.",
      credits: "Credits: Sebastian Rojas and Juan Lucero.",
    },
    home: {
      badge: "Crime analytics platform",
      titleLead: "National monitoring for",
      titleAccent: "homicides, sexual crimes and vehicle theft",
      titleTail: "in Colombia.",
      description:
        "This platform centralizes crime indicators with territorial, time-based and thematic analysis to support monitoring and decision-making.",
      primaryCta: "Explore dashboards",
      secondaryCta: "View summary",
      previewEyebrow: "National overview",
      previewTitle: "Monitoring fronts",
      previewStatus: "Active",
      coverageLabel: "Coverage",
      coverageTitle: "Topic-based review",
      coverageDescription:
        "Each section concentrates variables and readings related to its own analytical front.",
      scopeLabel: "Scope",
      scopeTitle: "Continuous monitoring",
      scopeDescription:
        "The platform brings together metrics, filters and visualizations for periodic review of the data.",
      dashboardsEyebrow: "Dashboards",
      dashboardsTitle: "Choose an analysis front",
      dashboardsPill: "Integrated consultation for territorial and time-based monitoring.",
      architectureEyebrow: "Architecture",
      architectureTitle: "Operational flow",
      architectureSteps: [
        {
          step: "01",
          title: "Clean data",
          copy: "The tables come from files that were already normalized, validated and consolidated.",
        },
        {
          step: "02",
          title: "PostgreSQL",
          copy: "The database centralizes the information and supports structured indicator queries.",
        },
        {
          step: "03",
          title: "Integrated access",
          copy: "The platform gathers the dashboards and makes operational reading easier from one place.",
        },
      ],
      insights: [
        {
          title: "Executive reading",
          description:
            "Each view summarizes key indicators and variables to understand the general situation quickly.",
        },
        {
          title: "Thematic coverage",
          description:
            "The three dashboards let you review lethal violence, sexual crimes and vehicle theft in one place.",
        },
        {
          title: "Multi-device access",
          description:
            "Navigation and dashboards can be consulted from desktop, tablet or mobile.",
        },
        {
          title: "Analytical scalability",
          description:
            "The structure allows new dashboards, indicators or sources to be added as the project grows.",
        },
      ],
    },
    dashboardPage: {
      panelTitle: "Integrated analytical view",
      panelDescription:
        "This view combines the main report with supporting indicators to improve monitoring, comparison and consultation.",
      bullets: [
        "Direct access to the report in Power BI",
        "Supporting indicators for quick reading",
        "Access from desktop, tablet and mobile",
      ],
    },
    embed: {
      subtitle: "Territorial, time-based and thematic consultation",
      active: "Live access",
      openFullscreen: "Open fullscreen",
      closeFullscreen: "Exit fullscreen",
    },
    notFound: {
      title: "This view does not exist",
      description: "Go back home and enter through one of the active dashboard routes.",
      backHome: "Back to home",
    },
  },
};
