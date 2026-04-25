import {
  Activity,
  ArrowUpRight,
  ShieldAlert,
  Siren,
  Sparkles,
  Target,
  CarFront,
  LucideIcon,
} from "lucide-react";

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

export const powerBiUrl =
  "https://app.powerbi.com/view?r=eyJrIjoiMzg3YjkwODYtZTVhZS00MjUwLTkxNzMtMGQ3MWExNTM2ZjIwIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9";

export const dashboards: DashboardConfig[] = [
  {
    key: "homicidios",
    path: "/homicidios",
    navLabel: "Homicidios",
    title: "Centro de monitoreo de homicidios",
    subtitle: "Detección territorial y lectura táctica por modalidad",
    description:
      "Consulta la evolución de los homicidios por fecha, departamento, municipio, zona, arma o medio utilizado y modalidad reportada para apoyar lectura territorial y seguimiento institucional.",
    accentClass: "from-sky-500 via-blue-500 to-indigo-500",
    accentTextClass: "text-sky-300",
    panelClass:
      "border-sky-400/20 bg-gradient-to-br from-sky-500/14 via-blue-500/10 to-indigo-500/14",
    heroGlowClass: "bg-sky-500/20",
    icon: ShieldAlert,
    badge: "Seguimiento territorial",
    kpis: [
      {
        label: "Registros consolidados",
        value: "7.367",
        detail: "Eventos consolidados para consulta y análisis",
      },
      {
        label: "Casos acumulados",
        value: "10.114",
        detail: "Suma de cantidad registrada en la base final",
      },
      {
        label: "Lecturas posibles",
        value: "Zona + arma + modalidad",
        detail: "Cruces tácticos para priorización y seguimiento",
      },
      {
        label: "Cobertura",
        value: "Nacional",
        detail: "Seguimiento geográfico por departamento y municipio",
      },
    ],
    insights: [
      {
        title: "Modalidad reportada",
        description:
          "Permite distinguir eventos con caracterización reportada frente a registros con menor nivel de detalle.",
        icon: Target,
      },
      {
        title: "Caracterización del hecho",
        description:
          "La combinación de zona, sexo y arma o medio facilita identificar patrones de ocurrencia más específicos.",
        icon: Activity,
      },
      {
        title: "Seguimiento temporal",
        description:
          "Las columnas fecha, año, mes y periodo permiten construir series de tiempo, tendencias y cortes mensuales.",
        icon: ArrowUpRight,
      },
    ],
    tags: ["Zona", "Sexo", "Arma/medio", "Modalidad", "Periodo"],
  },
  {
    key: "sexuales",
    path: "/sexuales",
    navLabel: "Delitos sexuales",
    title: "Radar de delitos sexuales",
    subtitle: "Perfil poblacional y análisis por tipología delictiva",
    description:
      "Analiza los delitos sexuales por género, grupo etario, tipología del hecho, ubicación y condiciones reportadas para orientar prevención, caracterización y seguimiento de víctimas.",
    accentClass: "from-fuchsia-500 via-pink-500 to-rose-500",
    accentTextClass: "text-pink-300",
    panelClass:
      "border-pink-400/20 bg-gradient-to-br from-pink-500/14 via-fuchsia-500/10 to-rose-500/14",
    heroGlowClass: "bg-pink-500/20",
    icon: Siren,
    badge: "Caracterización de víctimas",
    kpis: [
      {
        label: "Registros consolidados",
        value: "9.521",
        detail: "Base consolidada para consulta analítica",
      },
      {
        label: "Dimensiones clave",
        value: "Género + edad + delito",
        detail: "Cruces útiles para segmentación y prevención",
      },
      {
        label: "Columnas estratégicas",
        value: "14",
        detail: "Mayor detalle para filtros y segmentación",
      },
      {
        label: "Referencia territorial",
        value: "Código DANE",
        detail: "Ubicación detallada para mapas y cruces geográficos",
      },
    ],
    insights: [
      {
        title: "Población afectada",
        description:
          "Género y grupo etario permiten identificar concentración del riesgo por segmento poblacional.",
        icon: Sparkles,
      },
      {
        title: "Clasificación del delito",
        description:
          "La variable delito permite establecer qué conductas presentan mayor concentración dentro del periodo consultado.",
        icon: Target,
      },
      {
        title: "Condiciones reportadas",
        description:
          "Las variables de armas o medios amplían la lectura del hecho y mejoran la segmentación de consultas.",
        icon: ArrowUpRight,
      },
    ],
    tags: ["Género", "Grupo etario", "Delito", "Armas/medios", "Código DANE"],
  },
  {
    key: "hurtos",
    path: "/hurtos",
    navLabel: "Hurto de vehículos",
    title: "Sala analítica de hurto de vehículos",
    subtitle: "Seguimiento de modalidades, territorios y patrones operativos",
    description:
      "Consulta el comportamiento del hurto de vehículos por tipo, territorio, fecha, perfil de la víctima y condiciones reportadas para apoyar vigilancia, control y focalización operativa.",
    accentClass: "from-emerald-400 via-green-500 to-lime-500",
    accentTextClass: "text-emerald-300",
    panelClass:
      "border-emerald-400/20 bg-gradient-to-br from-emerald-500/14 via-green-500/10 to-lime-500/14",
    heroGlowClass: "bg-emerald-500/20",
    icon: CarFront,
    badge: "Seguimiento operativo",
    kpis: [
      {
        label: "Registros consolidados",
        value: "9.584",
        detail: "Tabla consolidada para consulta y explotación",
      },
      {
        label: "Tipo de hurto",
        value: "Detalle operativo",
        detail: "Útil para ranking, focos de riesgo y series comparativas",
      },
      {
        label: "Cruce poblacional",
        value: "Género + grupo etario",
        detail: "Profundiza el análisis sobre perfil de afectados",
      },
      {
        label: "Seguimiento temporal",
        value: "Fecha + periodo",
        detail: "Permite curvas de tendencia y variación mensual",
      },
    ],
    insights: [
      {
        title: "Tipología del hurto",
        description:
          "El tipo de hurto ofrece una dimensión directa para comparar focos territoriales y modalidades registradas.",
        icon: Target,
      },
      {
        title: "Ubicación precisa",
        description:
          "Departamento, municipio y código DANE facilitan mapas, jerarquías geográficas y segmentación regional.",
        icon: Activity,
      },
      {
        title: "Condiciones del hecho",
        description:
          "Armas o medios reportados enriquecen la lectura del riesgo y el análisis por condición del evento.",
        icon: ArrowUpRight,
      },
    ],
    tags: ["Tipo de hurto", "Armas/medios", "Género", "Grupo etario", "Periodo"],
  },
];

export const overviewCards = [
  {
    label: "Cobertura analítica",
    value: "3 frentes de análisis",
    description:
      "Homicidios, delitos sexuales y hurto de vehículos en una sola plataforma de consulta.",
    icon: Sparkles,
  },
  {
    label: "Fuente consolidada",
    value: "CSV limpio + Power BI",
    description:
      "La información proviene de tablas limpias y consolidadas para consulta, análisis y seguimiento.",
    icon: Activity,
  },
  {
    label: "Uso institucional",
    value: "Consulta y seguimiento",
    description:
      "La plataforma permite revisar indicadores, patrones y variaciones territoriales desde un mismo entorno.",
    icon: ArrowUpRight,
  },
];
