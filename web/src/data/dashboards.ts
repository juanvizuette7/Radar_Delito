import {
  Activity,
  ArrowUpRight,
  CarFront,
  LucideIcon,
  ShieldAlert,
  Siren,
  Sparkles,
  Target,
} from "lucide-react";
import { Language } from "../context/UiContext";

export type DashboardKpi = {
  label: string;
  value: string;
  detail: string;
};

export type DashboardInsight = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type DashboardConfig = {
  key: "homicidios" | "sexuales" | "hurtos";
  path: string;
  embedUrl: string;
  navLabel: string;
  title: string;
  subtitle: string;
  description: string;
  accentClass: string;
  accentTextClass: string;
  panelClass: string;
  heroGlowClass: string;
  icon: LucideIcon;
  badge: string;
  kpis: DashboardKpi[];
  insights: DashboardInsight[];
  tags: string[];
};

export type OverviewCard = {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
};

type LocalizedText = Record<Language, string>;

type LocalizedDashboard = {
  key: DashboardConfig["key"];
  path: string;
  embedUrl: string;
  navLabel: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  accentClass: string;
  accentTextClass: string;
  panelClass: string;
  heroGlowClass: string;
  icon: LucideIcon;
  badge: LocalizedText;
  kpis: {
    label: LocalizedText;
    value: string;
    detail: LocalizedText;
  }[];
  insights: {
    title: LocalizedText;
    description: LocalizedText;
    icon: LucideIcon;
  }[];
  tags: Record<Language, string[]>;
};

type LocalizedOverviewCard = {
  label: LocalizedText;
  value: LocalizedText;
  description: LocalizedText;
  icon: LucideIcon;
};

export const powerBiBaseUrl =
  "https://app.powerbi.com/view?r=eyJrIjoiMzg3YjkwODYtZTVhZS00MjUwLTkxNzMtMGQ3MWExNTM2ZjIwIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9";

const withPageName = (pageName: string) =>
  `${powerBiBaseUrl}&pageName=${pageName}`;

const localizedDashboards: LocalizedDashboard[] = [
  {
    key: "homicidios",
    path: "/homicidios",
    embedUrl: withPageName("677a4457658e84a21853"),
    navLabel: { es: "Homicidios", en: "Homicides" },
    title: {
      es: "Centro de monitoreo de homicidios",
      en: "Homicide monitoring center",
    },
    subtitle: {
      es: "Deteccion territorial y lectura tactica por modalidad",
      en: "Territorial detection and tactical reading by modality",
    },
    description: {
      es: "Consulta la evolucion de los homicidios por fecha, departamento, municipio, zona, arma o medio utilizado y modalidad reportada para apoyar lectura territorial y seguimiento institucional.",
      en: "Review homicide trends by date, department, municipality, area, weapon or method and reported modality to support territorial reading and institutional monitoring.",
    },
    accentClass: "from-sky-500 via-blue-500 to-indigo-500",
    accentTextClass: "text-sky-600 dark:text-sky-300",
    panelClass:
      "border-sky-300/60 bg-gradient-to-br from-sky-100/90 via-white to-indigo-100/90 dark:border-sky-400/20 dark:from-sky-500/14 dark:via-blue-500/10 dark:to-indigo-500/14",
    heroGlowClass: "bg-sky-500/20",
    icon: ShieldAlert,
    badge: {
      es: "Seguimiento territorial",
      en: "Territorial tracking",
    },
    kpis: [
      {
        label: { es: "Registros consolidados", en: "Consolidated records" },
        value: "7.367",
        detail: {
          es: "Eventos consolidados para consulta y analisis",
          en: "Consolidated events ready for consultation and analysis",
        },
      },
      {
        label: { es: "Casos acumulados", en: "Accumulated cases" },
        value: "10.114",
        detail: {
          es: "Suma de cantidad registrada en la base final",
          en: "Sum of quantity recorded in the final database",
        },
      },
      {
        label: { es: "Lecturas posibles", en: "Available views" },
        value: "Zona + arma + modalidad",
        detail: {
          es: "Cruces tacticos para priorizacion y seguimiento",
          en: "Tactical combinations for prioritization and monitoring",
        },
      },
      {
        label: { es: "Cobertura", en: "Coverage" },
        value: "Nacional",
        detail: {
          es: "Seguimiento geografico por departamento y municipio",
          en: "Geographic monitoring by department and municipality",
        },
      },
    ],
    insights: [
      {
        title: { es: "Modalidad reportada", en: "Reported modality" },
        description: {
          es: "Permite distinguir eventos con caracterizacion reportada frente a registros con menor nivel de detalle.",
          en: "Distinguishes events with reported characterization from records with less detail.",
        },
        icon: Target,
      },
      {
        title: { es: "Caracterizacion del hecho", en: "Event characterization" },
        description: {
          es: "La combinacion de zona, sexo y arma o medio facilita identificar patrones de ocurrencia mas especificos.",
          en: "Combining area, sex and weapon or method helps identify more specific occurrence patterns.",
        },
        icon: Activity,
      },
      {
        title: { es: "Seguimiento temporal", en: "Time monitoring" },
        description: {
          es: "Las columnas fecha, ano, mes y periodo permiten construir series de tiempo, tendencias y cortes mensuales.",
          en: "Date, year, month and period columns support time series, trends and monthly cuts.",
        },
        icon: ArrowUpRight,
      },
    ],
    tags: {
      es: ["Zona", "Sexo", "Arma/medio", "Modalidad", "Periodo"],
      en: ["Area", "Sex", "Weapon/method", "Modality", "Period"],
    },
  },
  {
    key: "sexuales",
    path: "/sexuales",
    embedUrl: withPageName("601c0c7720683d5689a6"),
    navLabel: { es: "Delitos sexuales", en: "Sexual crimes" },
    title: {
      es: "Radar de delitos sexuales",
      en: "Sexual crimes radar",
    },
    subtitle: {
      es: "Perfil poblacional y analisis por tipologia delictiva",
      en: "Population profile and analysis by offense type",
    },
    description: {
      es: "Analiza los delitos sexuales por genero, grupo etario, tipologia del hecho, ubicacion y condiciones reportadas para orientar prevencion, caracterizacion y seguimiento de victimas.",
      en: "Analyze sexual crimes by gender, age group, offense type, location and reported conditions to support prevention, victim profiling and monitoring.",
    },
    accentClass: "from-fuchsia-500 via-pink-500 to-rose-500",
    accentTextClass: "text-pink-600 dark:text-pink-300",
    panelClass:
      "border-pink-300/60 bg-gradient-to-br from-pink-100/90 via-white to-rose-100/90 dark:border-pink-400/20 dark:from-pink-500/14 dark:via-fuchsia-500/10 dark:to-rose-500/14",
    heroGlowClass: "bg-pink-500/20",
    icon: Siren,
    badge: {
      es: "Caracterizacion de victimas",
      en: "Victim characterization",
    },
    kpis: [
      {
        label: { es: "Registros consolidados", en: "Consolidated records" },
        value: "9.521",
        detail: {
          es: "Base consolidada para consulta analitica",
          en: "Consolidated database for analytical consultation",
        },
      },
      {
        label: { es: "Dimensiones clave", en: "Key dimensions" },
        value: "Genero + edad + delito",
        detail: {
          es: "Cruces utiles para segmentacion y prevencion",
          en: "Useful combinations for segmentation and prevention",
        },
      },
      {
        label: { es: "Columnas estrategicas", en: "Strategic columns" },
        value: "14",
        detail: {
          es: "Mayor detalle para filtros y segmentacion",
          en: "More detail for filters and segmentation",
        },
      },
      {
        label: { es: "Referencia territorial", en: "Territorial reference" },
        value: "Codigo DANE",
        detail: {
          es: "Ubicacion detallada para mapas y cruces geograficos",
          en: "Detailed location for maps and geographic combinations",
        },
      },
    ],
    insights: [
      {
        title: { es: "Poblacion afectada", en: "Affected population" },
        description: {
          es: "Genero y grupo etario permiten identificar concentracion del riesgo por segmento poblacional.",
          en: "Gender and age group help identify risk concentration by population segment.",
        },
        icon: Sparkles,
      },
      {
        title: { es: "Clasificacion del delito", en: "Crime classification" },
        description: {
          es: "La variable delito permite establecer que conductas presentan mayor concentracion dentro del periodo consultado.",
          en: "The crime variable helps determine which behaviors concentrate the highest volume in the selected period.",
        },
        icon: Target,
      },
      {
        title: { es: "Condiciones reportadas", en: "Reported conditions" },
        description: {
          es: "Las variables de armas o medios amplian la lectura del hecho y mejoran la segmentacion de consultas.",
          en: "Weapon or method variables expand event reading and improve query segmentation.",
        },
        icon: ArrowUpRight,
      },
    ],
    tags: {
      es: ["Genero", "Grupo etario", "Delito", "Armas/medios", "Codigo DANE"],
      en: ["Gender", "Age group", "Crime", "Weapons/methods", "DANE code"],
    },
  },
  {
    key: "hurtos",
    path: "/hurtos",
    embedUrl: withPageName("b6636cc114d3e4043487"),
    navLabel: { es: "Hurtos de vehiculos", en: "Vehicle theft" },
    title: {
      es: "Sala analitica de hurtos de vehiculos",
      en: "Vehicle theft analytical room",
    },
    subtitle: {
      es: "Seguimiento de modalidades, territorios y patrones operativos",
      en: "Monitoring modalities, territories and operational patterns",
    },
    description: {
      es: "Consulta el comportamiento de los hurtos de vehiculos por tipo, territorio, fecha, perfil de la victima y condiciones reportadas para apoyar vigilancia, control y focalizacion operativa.",
      en: "Review vehicle theft behavior by type, territory, date, victim profile and reported conditions to support surveillance, control and operational targeting.",
    },
    accentClass: "from-emerald-400 via-green-500 to-lime-500",
    accentTextClass: "text-emerald-600 dark:text-emerald-300",
    panelClass:
      "border-emerald-300/60 bg-gradient-to-br from-emerald-100/90 via-white to-lime-100/90 dark:border-emerald-400/20 dark:from-emerald-500/14 dark:via-green-500/10 dark:to-lime-500/14",
    heroGlowClass: "bg-emerald-500/20",
    icon: CarFront,
    badge: {
      es: "Seguimiento operativo",
      en: "Operational tracking",
    },
    kpis: [
      {
        label: { es: "Registros consolidados", en: "Consolidated records" },
        value: "9.584",
        detail: {
          es: "Tabla consolidada para consulta y explotacion",
          en: "Consolidated table for consultation and analysis",
        },
      },
      {
        label: { es: "Tipo de hurto", en: "Theft type" },
        value: "Detalle operativo",
        detail: {
          es: "Util para ranking, focos de riesgo y series comparativas",
          en: "Useful for rankings, risk hotspots and comparative series",
        },
      },
      {
        label: { es: "Cruce poblacional", en: "Population cross" },
        value: "Genero + grupo etario",
        detail: {
          es: "Profundiza el analisis sobre perfil de afectados",
          en: "Expands analysis of the affected population profile",
        },
      },
      {
        label: { es: "Seguimiento temporal", en: "Time monitoring" },
        value: "Fecha + periodo",
        detail: {
          es: "Permite curvas de tendencia y variacion mensual",
          en: "Supports trend curves and monthly variation analysis",
        },
      },
    ],
    insights: [
      {
        title: { es: "Tipologia del hurto", en: "Theft typology" },
        description: {
          es: "El tipo de hurto ofrece una dimension directa para comparar focos territoriales y modalidades registradas.",
          en: "The theft type provides a direct dimension to compare territorial hotspots and recorded modalities.",
        },
        icon: Target,
      },
      {
        title: { es: "Ubicacion precisa", en: "Accurate location" },
        description: {
          es: "Departamento, municipio y codigo DANE facilitan mapas, jerarquias geograficas y segmentacion regional.",
          en: "Department, municipality and DANE code support maps, geographic hierarchies and regional segmentation.",
        },
        icon: Activity,
      },
      {
        title: { es: "Condiciones del hecho", en: "Event conditions" },
        description: {
          es: "Armas o medios reportados enriquecen la lectura del riesgo y el analisis por condicion del evento.",
          en: "Reported weapons or methods enrich risk reading and analysis by event condition.",
        },
        icon: ArrowUpRight,
      },
    ],
    tags: {
      es: ["Tipo de hurto", "Armas/medios", "Genero", "Grupo etario", "Periodo"],
      en: ["Theft type", "Weapons/methods", "Gender", "Age group", "Period"],
    },
  },
];

const localizedOverviewCards: LocalizedOverviewCard[] = [
  {
    label: {
      es: "Cobertura analitica",
      en: "Analytical coverage",
    },
    value: {
      es: "3 frentes de analisis",
      en: "3 analysis fronts",
    },
    description: {
      es: "Homicidios, delitos sexuales y hurto de vehiculos en una sola plataforma de consulta.",
      en: "Homicides, sexual crimes and vehicle theft in a single consultation platform.",
    },
    icon: Sparkles,
  },
  {
    label: {
      es: "Fuente consolidada",
      en: "Consolidated source",
    },
    value: {
      es: "CSV limpio + Power BI",
      en: "Clean CSV + Power BI",
    },
    description: {
      es: "La informacion proviene de tablas limpias y consolidadas para consulta, analisis y seguimiento.",
      en: "Information comes from cleaned and consolidated tables for consultation, analysis and monitoring.",
    },
    icon: Activity,
  },
  {
    label: {
      es: "Uso institucional",
      en: "Institutional use",
    },
    value: {
      es: "Consulta y seguimiento",
      en: "Consultation and monitoring",
    },
    description: {
      es: "La plataforma permite revisar indicadores, patrones y variaciones territoriales desde un mismo entorno.",
      en: "The platform allows indicator review, pattern analysis and territorial comparison from the same environment.",
    },
    icon: ArrowUpRight,
  },
];

export function getDashboards(language: Language): DashboardConfig[] {
  return localizedDashboards.map((dashboard) => ({
    key: dashboard.key,
    path: dashboard.path,
    embedUrl: dashboard.embedUrl,
    navLabel: dashboard.navLabel[language],
    title: dashboard.title[language],
    subtitle: dashboard.subtitle[language],
    description: dashboard.description[language],
    accentClass: dashboard.accentClass,
    accentTextClass: dashboard.accentTextClass,
    panelClass: dashboard.panelClass,
    heroGlowClass: dashboard.heroGlowClass,
    icon: dashboard.icon,
    badge: dashboard.badge[language],
    kpis: dashboard.kpis.map((kpi) => ({
      label: kpi.label[language],
      value: kpi.value,
      detail: kpi.detail[language],
    })),
    insights: dashboard.insights.map((insight) => ({
      title: insight.title[language],
      description: insight.description[language],
      icon: insight.icon,
    })),
    tags: dashboard.tags[language],
  }));
}

export function getDashboardByKey(
  language: Language,
  key: DashboardConfig["key"],
): DashboardConfig {
  const dashboard = getDashboards(language).find((item) => item.key === key);

  if (!dashboard) {
    throw new Error(`No existe configuracion para el dashboard ${key}.`);
  }

  return dashboard;
}

export function getOverviewCards(language: Language): OverviewCard[] {
  return localizedOverviewCards.map((card) => ({
    label: card.label[language],
    value: card.value[language],
    description: card.description[language],
    icon: card.icon,
  }));
}
