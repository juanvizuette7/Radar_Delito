import { Language } from "../context/UiContext";
import { AiForecastTerritory, AiReport } from "../data/aiReports";

const levelLabels = {
  es: {
    high: "alta",
    medium: "media",
    low: "baja",
  },
  en: {
    high: "high",
    medium: "medium",
    low: "low",
  },
} as const;

const sampleFallback = {
  es: "Preguntame por riesgo esperado, foco territorial, modalidad dominante o accion recomendada.",
  en: "Ask about expected risk, territorial focus, dominant factor or recommended action.",
} as const;

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function hasAny(text: string, keywords: string[]): boolean {
  return keywords.some((keyword) => text.includes(keyword));
}

function formatNumber(language: Language, value: number): string {
  return new Intl.NumberFormat(language === "es" ? "es-CO" : "en-US").format(value);
}

function formatDecimal(language: Language, value: number): string {
  return new Intl.NumberFormat(language === "es" ? "es-CO" : "en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
}

export function buildAssistantReply(
  language: Language,
  question: string,
  territory: AiForecastTerritory,
  report: AiReport,
): string {
  const normalizedQuestion = normalize(question);
  const national = report.predictive.territories[0] ?? territory;
  const confidenceLabel = levelLabels[language][territory.confidence];
  const riskLabel = levelLabels[language][territory.risk];
  if (!normalizedQuestion) {
    return sampleFallback[language];
  }

  const asksForCurrentCalendar = hasAny(normalizedQuestion, [
    "hoy",
    "actual",
    "este ano",
    "este año",
    "current year",
    "today",
    "this year",
    "right now",
  ]);

  if (asksForCurrentCalendar) {
    return language === "es"
      ? "Esta lectura no intenta adivinar el calendario actual. Proyecta la siguiente ventana operativa que seguiria si el patron historico observado se repitiera en el territorio seleccionado."
      : "This reading does not try to guess the current calendar. It projects the next operating window that would follow if the observed historical pattern repeated in the selected territory.";
  }

  if (
    hasAny(normalizedQuestion, [
      "compar",
      "vs",
      "versus",
      "against",
      "frente",
      "contra",
    ]) &&
    territory.id !== national.id
  ) {
    const territoryVsNational = territory.forecastValue - national.forecastValue;
    const changeText =
      territoryVsNational >= 0
        ? `${language === "es" ? "por encima" : "above"}`
        : `${language === "es" ? "por debajo" : "below"}`;

    return language === "es"
      ? `${territory.label} proyecta ${formatNumber(language, territory.forecastValue)} casos para la siguiente ventana operativa. Eso lo deja ${changeText} del escenario nacional base del dashboard por ${formatNumber(language, Math.abs(territoryVsNational))} casos. Su presion actual es ${riskLabel} y el foco principal sigue siendo ${territory.dominantFactor}.`
      : `${territory.label} projects ${formatNumber(language, territory.forecastValue)} cases for the next operating window. That places it ${changeText} the dashboard's national baseline by ${formatNumber(language, Math.abs(territoryVsNational))} cases. Its current pressure is ${riskLabel}, and the main focus remains ${territory.dominantFactor}.`;
  }

  if (
    hasAny(normalizedQuestion, [
      "pronost",
      "predic",
      "futuro",
      "proxim",
      "proye",
      "forecast",
      "predict",
      "future",
      "next",
      "expect",
      "escenario",
    ])
  ) {
    return territory.answers.forecast;
  }

  if (
    hasAny(normalizedQuestion, [
      "riesgo",
      "presion",
      "tendencia",
      "sube",
      "baja",
      "trend",
      "pressure",
      "risk",
      "increase",
      "decrease",
    ])
  ) {
    return territory.answers.pressure;
  }

  if (
    hasAny(normalizedQuestion, [
      "foco",
      "hotspot",
      "territorio",
      "municipio",
      "departamento",
      "where",
      "focus",
      "location",
      "zona",
    ])
  ) {
    return territory.answers.focus;
  }

  if (
    hasAny(normalizedQuestion, [
      "accion",
      "recom",
      "priori",
      "hacer",
      "what should",
      "recommend",
      "action",
      "priority",
    ])
  ) {
    return territory.answers.action;
  }

  if (
    hasAny(normalizedQuestion, [
      "precision",
      "confi",
      "accuracy",
      "confidence",
      "modelo",
      "model",
      "exact",
    ])
  ) {
    return language === "es"
      ? `La señal para ${territory.label} es ${confidenceLabel}. Sirve para orientar seguimiento y priorizacion, pero no debe leerse como certeza absoluta ni como calendario actual.`
      : `The signal for ${territory.label} is ${confidenceLabel}. It should guide monitoring and prioritization, but it should not be treated as absolute certainty or as the current calendar.`;
  }

  if (
    hasAny(normalizedQuestion, [
      "modalidad",
      "arma",
      "delito",
      "factor",
      "weapon",
      "offense",
      "modality",
      "driver",
      "cause",
    ])
  ) {
    return language === "es"
      ? `En ${territory.label}, el factor que mas empuja el comportamiento esperado es ${territory.dominantFactor}. Si quieres una lectura mas util, cruzalo con ${territory.hotspot} y con la presion reciente del territorio.`
      : `In ${territory.label}, the factor driving the expected behavior the most is ${territory.dominantFactor}. For a more useful reading, cross it with ${territory.hotspot} and with the recent territorial pressure.`;
  }

  if (
    hasAny(normalizedQuestion, [
      "resumen",
      "dataset",
      "base",
      "datos",
      "overview",
      "summary",
      "data",
    ])
  ) {
    return report.summary;
  }

  return language === "es"
    ? `Para ${territory.label}, la siguiente ventana operativa apunta a ${formatNumber(language, territory.forecastValue)} casos esperados, con presion ${riskLabel}, precision historica de ${formatDecimal(language, territory.accuracyScore)}% y foco dominante en ${territory.dominantFactor}. El punto a priorizar sigue siendo ${territory.hotspot}.`
    : `For ${territory.label}, the next operating window points to ${formatNumber(language, territory.forecastValue)} expected cases, with ${riskLabel} pressure, ${formatDecimal(language, territory.accuracyScore)}% historical accuracy and a dominant focus on ${territory.dominantFactor}. The priority hotspot remains ${territory.hotspot}.`;
}
