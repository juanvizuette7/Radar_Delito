import { Language } from "../context/UiContext";

export type AiReportMetric = {
  label: string;
  value: string;
};

export type AiReportItem = {
  title: string;
  description: string;
};

export type AiForecastQuestionKey = "forecast" | "pressure" | "focus" | "action";

export type AiForecastPoint = {
  period: string;
  value: number;
};

export type AiForecastTerritory = {
  id: string;
  label: string;
  forecastPeriod: string;
  forecastValue: number;
  lastObservedValue: number;
  changePct: number;
  direction: "up" | "down" | "stable";
  accuracyScore: number;
  confidence: "high" | "medium" | "low";
  risk: "high" | "medium" | "low";
  dominantFactor: string;
  hotspot: string;
  modelLabelEs: string;
  modelLabelEn: string;
  historyMonths: number;
  series: AiForecastPoint[];
  recommendations: string[];
  answers: Record<AiForecastQuestionKey, string>;
};

export type AiPredictiveReport = {
  nextPeriod: string;
  territories: AiForecastTerritory[];
};

export type AiReport = {
  summary: string;
  metrics: AiReportMetric[];
  findings: AiReportItem[];
  actions: AiReportItem[];
  coverageNote: string;
  predictive: AiPredictiveReport;
};

type DashboardAiKey = "homicidios" | "sexuales" | "hurtos";

const aiReports: Record<Language, Record<DashboardAiKey, AiReport>> = {
  "es": {
    "homicidios": {
      "summary": "La base de homicidios consolida 7.512 casos en 7.404 registros. Predomina arma de fuego (82.1%) y la mayor concentracion territorial se ubica en Antioquia (16.6%).",
      "metrics": [
        {
          "label": "Casos consolidados",
          "value": "7.512"
        },
        {
          "label": "Foco principal",
          "value": "Antioquia 16.6%"
        },
        {
          "label": "Patron dominante",
          "value": "Arma de Fuego 82.1%"
        }
      ],
      "findings": [
        {
          "title": "Concentracion territorial",
          "description": "Antioquia lidera con 1.246 casos (16.6%), mientras Cali aparece como el principal municipio con 393 registros."
        },
        {
          "title": "Patron operativo",
          "description": "Arma de Fuego explica 82.1% del total. El comportamiento tambien se inclina hacia urbana (61.5%)."
        },
        {
          "title": "Detalle reportado",
          "description": "La modalidad no reportada concentra 67.3% y la victimizacion se mantiene principalmente en masculino (90.0%)."
        }
      ],
      "actions": [
        {
          "title": "Despliegue focalizado",
          "description": "Conviene concentrar seguimiento institucional en Antioquia y Cali, porque ahi se sostiene el mayor peso observado."
        },
        {
          "title": "Respuesta por patron dominante",
          "description": "La planeacion operativa gana precision cuando se parte de Arma de Fuego y de la caracterizacion disponible en no reportada."
        }
      ],
      "coverageNote": "Base IA: 7.404 registros y 7.512 casos. La lectura combina territorio, patron operativo y perfil reportado para orientar seguimiento.",
      "predictive": {
        "nextPeriod": "2003-06",
        "territories": [
          {
            "id": "national",
            "forecastPeriod": "2003-06",
            "forecastValue": 1490,
            "lastObservedValue": 1490,
            "changePct": -3.2,
            "direction": "stable",
            "accuracyScore": 97.3,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 1509
              },
              {
                "period": "2003-02",
                "value": 1442
              },
              {
                "period": "2003-03",
                "value": 1576
              },
              {
                "period": "2003-04",
                "value": 1431
              },
              {
                "period": "2003-05",
                "value": 1490
              }
            ],
            "label": "Nacional",
            "dominantFactor": "Arma de Fuego (82.1%)",
            "hotspot": "Departamento: Antioquia (16.6%)",
            "recommendations": [
              "Priorizar seguimiento sobre Antioquia en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 1.490 casos en Nacional. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa.",
              "pressure": "La presion reciente se mantiene estable frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Nacional sigue siendo Arma de Fuego, mientras Departamento: Antioquia (16.6%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Antioquia y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "antioquia",
            "forecastPeriod": "2003-06",
            "forecastValue": 249,
            "lastObservedValue": 237,
            "changePct": -8.4,
            "direction": "down",
            "accuracyScore": 94.6,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 278
              },
              {
                "period": "2003-02",
                "value": 205
              },
              {
                "period": "2003-03",
                "value": 280
              },
              {
                "period": "2003-04",
                "value": 229
              },
              {
                "period": "2003-05",
                "value": 237
              }
            ],
            "label": "Antioquia",
            "dominantFactor": "Arma de Fuego (84.8%)",
            "hotspot": "Municipio: Medellin (30.8%)",
            "recommendations": [
              "Priorizar seguimiento sobre Medellin en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 249 casos en Antioquia. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa.",
              "pressure": "El promedio reciente baja 8.4% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Antioquia sigue siendo Arma de Fuego, mientras Municipio: Medellin (30.8%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Medellin y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "valle-del-cauca",
            "forecastPeriod": "2003-06",
            "forecastValue": 211,
            "lastObservedValue": 210,
            "changePct": 0.5,
            "direction": "stable",
            "accuracyScore": 98.8,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 202
              },
              {
                "period": "2003-02",
                "value": 196
              },
              {
                "period": "2003-03",
                "value": 235
              },
              {
                "period": "2003-04",
                "value": 214
              },
              {
                "period": "2003-05",
                "value": 210
              }
            ],
            "label": "Valle del Cauca",
            "dominantFactor": "Arma de Fuego (83.6%)",
            "hotspot": "Municipio: Cali (37.0%)",
            "recommendations": [
              "Priorizar seguimiento sobre Cali en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 211 casos en Valle del Cauca. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa.",
              "pressure": "La presion reciente se mantiene estable frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Valle del Cauca sigue siendo Arma de Fuego, mientras Municipio: Cali (37.0%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Cali y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "norte-de-santander",
            "forecastPeriod": "2003-06",
            "forecastValue": 82,
            "lastObservedValue": 68,
            "changePct": -12.8,
            "direction": "down",
            "accuracyScore": 87.8,
            "confidence": "low",
            "risk": "low",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 101
              },
              {
                "period": "2003-02",
                "value": 80
              },
              {
                "period": "2003-03",
                "value": 89
              },
              {
                "period": "2003-04",
                "value": 89
              },
              {
                "period": "2003-05",
                "value": 68
              }
            ],
            "label": "Norte de Santander",
            "dominantFactor": "Arma de Fuego (84.7%)",
            "hotspot": "Municipio: Cucuta (40.7%)",
            "recommendations": [
              "Priorizar seguimiento sobre Cucuta en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 82 casos en Norte de Santander. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa.",
              "pressure": "El promedio reciente baja 12.8% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Norte de Santander sigue siendo Arma de Fuego, mientras Municipio: Cucuta (40.7%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Cucuta y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "bogota-dc",
            "forecastPeriod": "2003-06",
            "forecastValue": 80,
            "lastObservedValue": 84,
            "changePct": 10.2,
            "direction": "up",
            "accuracyScore": 94.3,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Tendencia ponderada reciente",
            "modelLabelEn": "Weighted recent trend",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 60
              },
              {
                "period": "2003-02",
                "value": 74
              },
              {
                "period": "2003-03",
                "value": 81
              },
              {
                "period": "2003-04",
                "value": 74
              },
              {
                "period": "2003-05",
                "value": 84
              }
            ],
            "label": "Bogota D.C.",
            "dominantFactor": "Arma de Fuego (57.3%)",
            "hotspot": "Municipio: Bogota D.C. (100.0%)",
            "recommendations": [
              "Priorizar seguimiento sobre Bogota D.C. en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 80 casos en Bogota D.C.. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa.",
              "pressure": "El promedio reciente sube 10.2% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Bogota D.C. sigue siendo Arma de Fuego, mientras Municipio: Bogota D.C. (100.0%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Bogota D.C. y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "cundinamarca",
            "forecastPeriod": "2003-06",
            "forecastValue": 68,
            "lastObservedValue": 68,
            "changePct": -7.5,
            "direction": "down",
            "accuracyScore": 97.1,
            "confidence": "low",
            "risk": "low",
            "modelLabelEs": "Ultimo valor",
            "modelLabelEn": "Last value",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 78
              },
              {
                "period": "2003-02",
                "value": 71
              },
              {
                "period": "2003-03",
                "value": 70
              },
              {
                "period": "2003-04",
                "value": 67
              },
              {
                "period": "2003-05",
                "value": 68
              }
            ],
            "label": "Cundinamarca",
            "dominantFactor": "Arma de Fuego (74.9%)",
            "hotspot": "Municipio: Soacha (11.3%)",
            "recommendations": [
              "Priorizar seguimiento sobre Soacha en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 68 casos en Cundinamarca. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente baja 7.5% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Cundinamarca sigue siendo Arma de Fuego, mientras Municipio: Soacha (11.3%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Soacha y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "caldas",
            "forecastPeriod": "2003-06",
            "forecastValue": 61,
            "lastObservedValue": 59,
            "changePct": 1.6,
            "direction": "stable",
            "accuracyScore": 93.0,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 72
              },
              {
                "period": "2003-02",
                "value": 62
              },
              {
                "period": "2003-03",
                "value": 55
              },
              {
                "period": "2003-04",
                "value": 69
              },
              {
                "period": "2003-05",
                "value": 59
              }
            ],
            "label": "Caldas",
            "dominantFactor": "Arma de Fuego (82.1%)",
            "hotspot": "Municipio: Manizales (23.5%)",
            "recommendations": [
              "Priorizar seguimiento sobre Manizales en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 61 casos en Caldas. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa.",
              "pressure": "La presion reciente se mantiene estable frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Caldas sigue siendo Arma de Fuego, mientras Municipio: Manizales (23.5%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Manizales y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "risaralda",
            "forecastPeriod": "2003-06",
            "forecastValue": 56,
            "lastObservedValue": 56,
            "changePct": -13.0,
            "direction": "down",
            "accuracyScore": 89.6,
            "confidence": "low",
            "risk": "low",
            "modelLabelEs": "Ultimo valor",
            "modelLabelEn": "Last value",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 65
              },
              {
                "period": "2003-02",
                "value": 66
              },
              {
                "period": "2003-03",
                "value": 69
              },
              {
                "period": "2003-04",
                "value": 60
              },
              {
                "period": "2003-05",
                "value": 56
              }
            ],
            "label": "Risaralda",
            "dominantFactor": "Arma de Fuego (83.0%)",
            "hotspot": "Municipio: Pereira (45.4%)",
            "recommendations": [
              "Priorizar seguimiento sobre Pereira en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 56 casos en Risaralda. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa.",
              "pressure": "El promedio reciente baja 13.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Risaralda sigue siendo Arma de Fuego, mientras Municipio: Pereira (45.4%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Pereira y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "bolivar",
            "forecastPeriod": "2003-06",
            "forecastValue": 50,
            "lastObservedValue": 53,
            "changePct": -3.9,
            "direction": "stable",
            "accuracyScore": 90.8,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 51
              },
              {
                "period": "2003-02",
                "value": 49
              },
              {
                "period": "2003-03",
                "value": 53
              },
              {
                "period": "2003-04",
                "value": 45
              },
              {
                "period": "2003-05",
                "value": 53
              }
            ],
            "label": "Bolivar",
            "dominantFactor": "Arma de Fuego (89.8%)",
            "hotspot": "Municipio: Cartagena de Indias (42.6%)",
            "recommendations": [
              "Priorizar seguimiento sobre Cartagena de Indias en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 50 casos en Bolivar. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa.",
              "pressure": "La presion reciente se mantiene estable frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Bolivar sigue siendo Arma de Fuego, mientras Municipio: Cartagena de Indias (42.6%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Cartagena de Indias y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "magdalena",
            "forecastPeriod": "2003-06",
            "forecastValue": 53,
            "lastObservedValue": 61,
            "changePct": 14.3,
            "direction": "up",
            "accuracyScore": 88.1,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 47
              },
              {
                "period": "2003-02",
                "value": 47
              },
              {
                "period": "2003-03",
                "value": 49
              },
              {
                "period": "2003-04",
                "value": 48
              },
              {
                "period": "2003-05",
                "value": 61
              }
            ],
            "label": "Magdalena",
            "dominantFactor": "Arma de Fuego (86.3%)",
            "hotspot": "Municipio: Santa Marta (34.5%)",
            "recommendations": [
              "Priorizar seguimiento sobre Santa Marta en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 53 casos en Magdalena. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa.",
              "pressure": "El promedio reciente sube 14.3% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Magdalena sigue siendo Arma de Fuego, mientras Municipio: Santa Marta (34.5%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Santa Marta y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "santander",
            "forecastPeriod": "2003-06",
            "forecastValue": 51,
            "lastObservedValue": 51,
            "changePct": 9.9,
            "direction": "up",
            "accuracyScore": 96.2,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Ultimo valor",
            "modelLabelEn": "Last value",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 57
              },
              {
                "period": "2003-02",
                "value": 34
              },
              {
                "period": "2003-03",
                "value": 51
              },
              {
                "period": "2003-04",
                "value": 53
              },
              {
                "period": "2003-05",
                "value": 51
              }
            ],
            "label": "Santander",
            "dominantFactor": "Arma de Fuego (77.5%)",
            "hotspot": "Municipio: Bucaramanga (25.3%)",
            "recommendations": [
              "Priorizar seguimiento sobre Bucaramanga en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 51 casos en Santander. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa.",
              "pressure": "El promedio reciente sube 9.9% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Santander sigue siendo Arma de Fuego, mientras Municipio: Bucaramanga (25.3%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Bucaramanga y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "cesar",
            "forecastPeriod": "2003-06",
            "forecastValue": 48,
            "lastObservedValue": 48,
            "changePct": -6.9,
            "direction": "down",
            "accuracyScore": 96.9,
            "confidence": "low",
            "risk": "low",
            "modelLabelEs": "Tendencia ponderada reciente",
            "modelLabelEn": "Weighted recent trend",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 53
              },
              {
                "period": "2003-02",
                "value": 51
              },
              {
                "period": "2003-03",
                "value": 49
              },
              {
                "period": "2003-04",
                "value": 47
              },
              {
                "period": "2003-05",
                "value": 48
              }
            ],
            "label": "Cesar",
            "dominantFactor": "Arma de Fuego (90.3%)",
            "hotspot": "Municipio: Valledupar (39.5%)",
            "recommendations": [
              "Priorizar seguimiento sobre Valledupar en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 48 casos en Cesar. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente baja 6.9% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Cesar sigue siendo Arma de Fuego, mientras Municipio: Valledupar (39.5%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Valledupar y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "meta",
            "forecastPeriod": "2003-06",
            "forecastValue": 49,
            "lastObservedValue": 49,
            "changePct": 16.8,
            "direction": "up",
            "accuracyScore": 95.1,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Ultimo valor",
            "modelLabelEn": "Last value",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 33
              },
              {
                "period": "2003-02",
                "value": 44
              },
              {
                "period": "2003-03",
                "value": 54
              },
              {
                "period": "2003-04",
                "value": 53
              },
              {
                "period": "2003-05",
                "value": 49
              }
            ],
            "label": "Meta",
            "dominantFactor": "Arma de Fuego (86.3%)",
            "hotspot": "Municipio: Villavicencio (26.5%)",
            "recommendations": [
              "Priorizar seguimiento sobre Villavicencio en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 49 casos en Meta. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa.",
              "pressure": "El promedio reciente sube 16.8% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Meta sigue siendo Arma de Fuego, mientras Municipio: Villavicencio (26.5%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Villavicencio y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "atlantico",
            "forecastPeriod": "2003-06",
            "forecastValue": 46,
            "lastObservedValue": 43,
            "changePct": -15.3,
            "direction": "down",
            "accuracyScore": 86.5,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 49
              },
              {
                "period": "2003-02",
                "value": 43
              },
              {
                "period": "2003-03",
                "value": 55
              },
              {
                "period": "2003-04",
                "value": 40
              },
              {
                "period": "2003-05",
                "value": 43
              }
            ],
            "label": "Atlantico",
            "dominantFactor": "Arma de Fuego (86.7%)",
            "hotspot": "Municipio: Barranquilla (58.8%)",
            "recommendations": [
              "Priorizar seguimiento sobre Barranquilla en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 46 casos en Atlantico. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa.",
              "pressure": "El promedio reciente baja 15.3% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Atlantico sigue siendo Arma de Fuego, mientras Municipio: Barranquilla (58.8%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Barranquilla y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "tolima",
            "forecastPeriod": "2003-06",
            "forecastValue": 45,
            "lastObservedValue": 51,
            "changePct": -4.0,
            "direction": "stable",
            "accuracyScore": 80.4,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 48
              },
              {
                "period": "2003-02",
                "value": 47
              },
              {
                "period": "2003-03",
                "value": 41
              },
              {
                "period": "2003-04",
                "value": 36
              },
              {
                "period": "2003-05",
                "value": 51
              }
            ],
            "label": "Tolima",
            "dominantFactor": "Arma de Fuego (78.3%)",
            "hotspot": "Municipio: Ibague (23.9%)",
            "recommendations": [
              "Priorizar seguimiento sobre Ibague en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 45 casos en Tolima. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa.",
              "pressure": "La presion reciente se mantiene estable frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Tolima sigue siendo Arma de Fuego, mientras Municipio: Ibague (23.9%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Ibague y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "huila",
            "forecastPeriod": "2003-06",
            "forecastValue": 48,
            "lastObservedValue": 61,
            "changePct": 18.7,
            "direction": "up",
            "accuracyScore": 66.2,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 29
              },
              {
                "period": "2003-02",
                "value": 33
              },
              {
                "period": "2003-03",
                "value": 53
              },
              {
                "period": "2003-04",
                "value": 30
              },
              {
                "period": "2003-05",
                "value": 61
              }
            ],
            "label": "Huila",
            "dominantFactor": "Arma de Fuego (81.2%)",
            "hotspot": "Municipio: Neiva (14.4%)",
            "recommendations": [
              "Priorizar seguimiento sobre Neiva en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 48 casos en Huila. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa.",
              "pressure": "El promedio reciente sube 18.7% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Huila sigue siendo Arma de Fuego, mientras Municipio: Neiva (14.4%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Neiva y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "narino",
            "forecastPeriod": "2003-06",
            "forecastValue": 40,
            "lastObservedValue": 35,
            "changePct": 14.6,
            "direction": "up",
            "accuracyScore": 82.3,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 37
              },
              {
                "period": "2003-02",
                "value": 30
              },
              {
                "period": "2003-03",
                "value": 39
              },
              {
                "period": "2003-04",
                "value": 46
              },
              {
                "period": "2003-05",
                "value": 35
              }
            ],
            "label": "Narino",
            "dominantFactor": "Arma de Fuego (64.7%)",
            "hotspot": "Municipio: Pasto (34.7%)",
            "recommendations": [
              "Priorizar seguimiento sobre Pasto en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 40 casos en Narino. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa.",
              "pressure": "El promedio reciente sube 14.6% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Narino sigue siendo Arma de Fuego, mientras Municipio: Pasto (34.7%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Pasto y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "arauca",
            "forecastPeriod": "2003-06",
            "forecastValue": 33,
            "lastObservedValue": 34,
            "changePct": -21.1,
            "direction": "down",
            "accuracyScore": 79.8,
            "confidence": "low",
            "risk": "low",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 35
              },
              {
                "period": "2003-02",
                "value": 41
              },
              {
                "period": "2003-03",
                "value": 38
              },
              {
                "period": "2003-04",
                "value": 26
              },
              {
                "period": "2003-05",
                "value": 34
              }
            ],
            "label": "Arauca",
            "dominantFactor": "Arma de Fuego (86.9%)",
            "hotspot": "Municipio: Tame (44.6%)",
            "recommendations": [
              "Priorizar seguimiento sobre Tame en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 33 casos en Arauca. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa.",
              "pressure": "El promedio reciente baja 21.1% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Arauca sigue siendo Arma de Fuego, mientras Municipio: Tame (44.6%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Tame y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "cauca",
            "forecastPeriod": "2003-06",
            "forecastValue": 26,
            "lastObservedValue": 29,
            "changePct": -8.2,
            "direction": "down",
            "accuracyScore": 90.2,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 20
              },
              {
                "period": "2003-02",
                "value": 39
              },
              {
                "period": "2003-03",
                "value": 26
              },
              {
                "period": "2003-04",
                "value": 23
              },
              {
                "period": "2003-05",
                "value": 29
              }
            ],
            "label": "Cauca",
            "dominantFactor": "Arma de Fuego (71.9%)",
            "hotspot": "Municipio: Popayan (23.0%)",
            "recommendations": [
              "Priorizar seguimiento sobre Popayan en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 26 casos en Cauca. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa.",
              "pressure": "El promedio reciente baja 8.2% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Cauca sigue siendo Arma de Fuego, mientras Municipio: Popayan (23.0%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Popayan y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "la-guajira",
            "forecastPeriod": "2003-06",
            "forecastValue": 26,
            "lastObservedValue": 28,
            "changePct": 5.2,
            "direction": "up",
            "accuracyScore": 96.3,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 28
              },
              {
                "period": "2003-02",
                "value": 31
              },
              {
                "period": "2003-03",
                "value": 18
              },
              {
                "period": "2003-04",
                "value": 26
              },
              {
                "period": "2003-05",
                "value": 28
              }
            ],
            "label": "La Guajira",
            "dominantFactor": "Arma de Fuego (95.5%)",
            "hotspot": "Municipio: Maicao (34.6%)",
            "recommendations": [
              "Priorizar seguimiento sobre Maicao en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 26 casos en La Guajira. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa.",
              "pressure": "El promedio reciente sube 5.2% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en La Guajira sigue siendo Arma de Fuego, mientras Municipio: Maicao (34.6%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Maicao y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "caqueta",
            "forecastPeriod": "2003-06",
            "forecastValue": 28,
            "lastObservedValue": 26,
            "changePct": -1.3,
            "direction": "stable",
            "accuracyScore": 100.0,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 27
              },
              {
                "period": "2003-02",
                "value": 19
              },
              {
                "period": "2003-03",
                "value": 33
              },
              {
                "period": "2003-04",
                "value": 26
              },
              {
                "period": "2003-05",
                "value": 26
              }
            ],
            "label": "Caqueta",
            "dominantFactor": "Arma de Fuego (87.8%)",
            "hotspot": "Municipio: Florencia (26.7%)",
            "recommendations": [
              "Priorizar seguimiento sobre Florencia en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 28 casos en Caqueta. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "La presion reciente se mantiene estable frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Caqueta sigue siendo Arma de Fuego, mientras Municipio: Florencia (26.7%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Florencia y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "putumayo",
            "forecastPeriod": "2003-06",
            "forecastValue": 11,
            "lastObservedValue": 11,
            "changePct": -61.3,
            "direction": "down",
            "accuracyScore": 81.3,
            "confidence": "low",
            "risk": "low",
            "modelLabelEs": "Ultimo valor",
            "modelLabelEn": "Last value",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 29
              },
              {
                "period": "2003-02",
                "value": 52
              },
              {
                "period": "2003-03",
                "value": 16
              },
              {
                "period": "2003-04",
                "value": 14
              },
              {
                "period": "2003-05",
                "value": 11
              }
            ],
            "label": "Putumayo",
            "dominantFactor": "Arma de Fuego (90.2%)",
            "hotspot": "Municipio: Puerto Asis (20.5%)",
            "recommendations": [
              "Priorizar seguimiento sobre Puerto Asis en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 11 casos en Putumayo. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente baja 61.3% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Putumayo sigue siendo Arma de Fuego, mientras Municipio: Puerto Asis (20.5%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Puerto Asis y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "quindio",
            "forecastPeriod": "2003-06",
            "forecastValue": 24,
            "lastObservedValue": 24,
            "changePct": 16.4,
            "direction": "up",
            "accuracyScore": 88.0,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 25
              },
              {
                "period": "2003-02",
                "value": 23
              },
              {
                "period": "2003-03",
                "value": 19
              },
              {
                "period": "2003-04",
                "value": 28
              },
              {
                "period": "2003-05",
                "value": 24
              }
            ],
            "label": "Quindio",
            "dominantFactor": "Arma de Fuego (84.9%)",
            "hotspot": "Municipio: Armenia (42.0%)",
            "recommendations": [
              "Priorizar seguimiento sobre Armenia en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 24 casos en Quindio. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 16.4% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Quindio sigue siendo Arma de Fuego, mientras Municipio: Armenia (42.0%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Armenia y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "boyaca",
            "forecastPeriod": "2003-06",
            "forecastValue": 14,
            "lastObservedValue": 14,
            "changePct": -32.7,
            "direction": "down",
            "accuracyScore": 64.0,
            "confidence": "low",
            "risk": "low",
            "modelLabelEs": "Ultimo valor",
            "modelLabelEn": "Last value",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 15
              },
              {
                "period": "2003-02",
                "value": 34
              },
              {
                "period": "2003-03",
                "value": 29
              },
              {
                "period": "2003-04",
                "value": 21
              },
              {
                "period": "2003-05",
                "value": 14
              }
            ],
            "label": "Boyaca",
            "dominantFactor": "Arma de Fuego (81.7%)",
            "hotspot": "Municipio: Tunja (8.7%)",
            "recommendations": [
              "Priorizar seguimiento sobre Tunja en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 14 casos en Boyaca. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa.",
              "pressure": "El promedio reciente baja 32.7% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Boyaca sigue siendo Arma de Fuego, mientras Municipio: Tunja (8.7%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Tunja y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "cordoba",
            "forecastPeriod": "2003-06",
            "forecastValue": 22,
            "lastObservedValue": 21,
            "changePct": 3.1,
            "direction": "stable",
            "accuracyScore": 93.1,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 22
              },
              {
                "period": "2003-02",
                "value": 21
              },
              {
                "period": "2003-03",
                "value": 21
              },
              {
                "period": "2003-04",
                "value": 23
              },
              {
                "period": "2003-05",
                "value": 21
              }
            ],
            "label": "Cordoba",
            "dominantFactor": "Arma de Fuego (79.8%)",
            "hotspot": "Municipio: Monteria (29.4%)",
            "recommendations": [
              "Priorizar seguimiento sobre Monteria en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 22 casos en Cordoba. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa.",
              "pressure": "La presion reciente se mantiene estable frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Cordoba sigue siendo Arma de Fuego, mientras Municipio: Monteria (29.4%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Monteria y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "casanare",
            "forecastPeriod": "2003-06",
            "forecastValue": 22,
            "lastObservedValue": 22,
            "changePct": 17.0,
            "direction": "up",
            "accuracyScore": 87.2,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Ultimo valor",
            "modelLabelEn": "Last value",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 17
              },
              {
                "period": "2003-02",
                "value": 16
              },
              {
                "period": "2003-03",
                "value": 17
              },
              {
                "period": "2003-04",
                "value": 17
              },
              {
                "period": "2003-05",
                "value": 22
              }
            ],
            "label": "Casanare",
            "dominantFactor": "Arma de Fuego (86.7%)",
            "hotspot": "Municipio: Yopal (43.3%)",
            "recommendations": [
              "Priorizar seguimiento sobre Yopal en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 22 casos en Casanare. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa.",
              "pressure": "El promedio reciente sube 17.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Casanare sigue siendo Arma de Fuego, mientras Municipio: Yopal (43.3%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Yopal y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "sucre",
            "forecastPeriod": "2003-06",
            "forecastValue": 19,
            "lastObservedValue": 29,
            "changePct": 17.0,
            "direction": "up",
            "accuracyScore": 45.2,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 13
              },
              {
                "period": "2003-02",
                "value": 19
              },
              {
                "period": "2003-03",
                "value": 18
              },
              {
                "period": "2003-04",
                "value": 10
              },
              {
                "period": "2003-05",
                "value": 29
              }
            ],
            "label": "Sucre",
            "dominantFactor": "Arma de Fuego (96.6%)",
            "hotspot": "Municipio: Sincelejo (38.2%)",
            "recommendations": [
              "Priorizar seguimiento sobre Sincelejo en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 19 casos en Sucre. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 17.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Sucre sigue siendo Arma de Fuego, mientras Municipio: Sincelejo (38.2%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Sincelejo y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "choco",
            "forecastPeriod": "2003-06",
            "forecastValue": 6,
            "lastObservedValue": 6,
            "changePct": -37.1,
            "direction": "down",
            "accuracyScore": 70.1,
            "confidence": "low",
            "risk": "low",
            "modelLabelEs": "Ultimo valor",
            "modelLabelEn": "Last value",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 11
              },
              {
                "period": "2003-02",
                "value": 9
              },
              {
                "period": "2003-03",
                "value": 11
              },
              {
                "period": "2003-04",
                "value": 7
              },
              {
                "period": "2003-05",
                "value": 6
              }
            ],
            "label": "Choco",
            "dominantFactor": "Arma de Fuego (84.4%)",
            "hotspot": "Municipio: Quibdo (55.6%)",
            "recommendations": [
              "Priorizar seguimiento sobre Quibdo en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 6 casos en Choco. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario. El cierre mas reciente luce parcial y el pronostico toma como base la ultima ventana completa.",
              "pressure": "El promedio reciente baja 37.1% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Choco sigue siendo Arma de Fuego, mientras Municipio: Quibdo (55.6%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Quibdo y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "guaviare",
            "forecastPeriod": "2003-06",
            "forecastValue": 6,
            "lastObservedValue": 8,
            "changePct": 131.8,
            "direction": "up",
            "accuracyScore": 38.5,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 6
              },
              {
                "period": "2003-02",
                "value": 3
              },
              {
                "period": "2003-03",
                "value": 2
              },
              {
                "period": "2003-04",
                "value": 9
              },
              {
                "period": "2003-05",
                "value": 8
              }
            ],
            "label": "Guaviare",
            "dominantFactor": "Arma de Fuego (64.3%)",
            "hotspot": "Municipio: San Jose del Guaviare (71.4%)",
            "recommendations": [
              "Priorizar seguimiento sobre San Jose del Guaviare en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 6 casos en Guaviare. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 131.8% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Guaviare sigue siendo Arma de Fuego, mientras Municipio: San Jose del Guaviare (71.4%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre San Jose del Guaviare y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "amazonas",
            "forecastPeriod": "2003-06",
            "forecastValue": 2,
            "lastObservedValue": 2,
            "changePct": -40.0,
            "direction": "down",
            "accuracyScore": 0.0,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Ultimo valor",
            "modelLabelEn": "Last value",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 1
              },
              {
                "period": "2003-02",
                "value": 2
              },
              {
                "period": "2003-03",
                "value": 2
              },
              {
                "period": "2003-04",
                "value": 0
              },
              {
                "period": "2003-05",
                "value": 2
              }
            ],
            "label": "Amazonas",
            "dominantFactor": "Arma de Fuego (57.1%)",
            "hotspot": "Municipio: Leticia (57.1%)",
            "recommendations": [
              "Priorizar seguimiento sobre Leticia en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 2 casos en Amazonas. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente baja 40.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Amazonas sigue siendo Arma de Fuego, mientras Municipio: Leticia (57.1%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Leticia y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "san-andres-islas",
            "forecastPeriod": "2003-05",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": -33.3,
            "direction": "down",
            "accuracyScore": 0.0,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 3,
            "series": [
              {
                "period": "2003-02",
                "value": 1
              },
              {
                "period": "2003-03",
                "value": 2
              },
              {
                "period": "2003-04",
                "value": 1
              }
            ],
            "label": "San Andres Islas",
            "dominantFactor": "Arma de Fuego (50.0%)",
            "hotspot": "Municipio: San Andres (100.0%)",
            "recommendations": [
              "Priorizar seguimiento sobre San Andres en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 1 casos en San Andres Islas. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente baja 33.3% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en San Andres Islas sigue siendo Arma de Fuego, mientras Municipio: San Andres (100.0%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre San Andres y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "vichada",
            "forecastPeriod": "2003-06",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 0.0,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 3,
            "series": [
              {
                "period": "2003-03",
                "value": 1
              },
              {
                "period": "2003-04",
                "value": 0
              },
              {
                "period": "2003-05",
                "value": 1
              }
            ],
            "label": "Vichada",
            "dominantFactor": "Arma Blanca / Cortopunzante (100.0%)",
            "hotspot": "Municipio: Puerto Carreno (100.0%)",
            "recommendations": [
              "Priorizar seguimiento sobre Puerto Carreno en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma Blanca / Cortopunzante sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 1 casos en Vichada. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Vichada sigue siendo Arma Blanca / Cortopunzante, mientras Municipio: Puerto Carreno (100.0%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Puerto Carreno y monitorear si Arma Blanca / Cortopunzante conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "vaupes",
            "forecastPeriod": "2003-06",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 0.0,
            "direction": "stable",
            "accuracyScore": 0.0,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 1,
            "series": [
              {
                "period": "2003-05",
                "value": 1
              }
            ],
            "label": "Vaupes",
            "dominantFactor": "Arma de Fuego (100.0%)",
            "hotspot": "Municipio: Mitu (100.0%)",
            "recommendations": [
              "Priorizar seguimiento sobre Mitu en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con arma dominante para validar si Arma de Fuego sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 1 casos en Vaupes. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "La presion reciente se mantiene estable frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Vaupes sigue siendo Arma de Fuego, mientras Municipio: Mitu (100.0%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Mitu y monitorear si Arma de Fuego conserva su peso en la siguiente ventana operativa."
            }
          }
        ]
      }
    },
    "sexuales": {
      "summary": "La base de delitos sexuales consolida 4.016 casos en 4.016 registros. Bogota concentra 14.8% del total y el hecho dominante es articulo 209. actos sexuales con menor de 14 anos (22.1%).",
      "metrics": [
        {
          "label": "Casos consolidados",
          "value": "4.016"
        },
        {
          "label": "Foco principal",
          "value": "Bogota 14.8%"
        },
        {
          "label": "Delito dominante",
          "value": "22.1% del total"
        }
      ],
      "findings": [
        {
          "title": "Concentracion territorial",
          "description": "Bogota lidera con 593 casos y Bogota D.C. concentra la mayor carga municipal."
        },
        {
          "title": "Perfil de victimizacion",
          "description": "Femenino representa 83.9% y el grupo adultos aporta 54.2%."
        },
        {
          "title": "Calidad del registro",
          "description": "La variable no reportado domina 100.0% de la base, por lo que la lectura depende mas del tipo penal y del territorio."
        }
      ],
      "actions": [
        {
          "title": "Seguimiento por perfil afectado",
          "description": "Conviene revisar adultos, adolescentes y menores por separado para no mezclar dinamicas de riesgo."
        },
        {
          "title": "Focalizacion territorial",
          "description": "La lectura institucional debe sostenerse sobre Bogota y Bogota D.C., por ser los puntos con mayor carga observada."
        }
      ],
      "coverageNote": "Base IA: 4.016 registros y 4.016 casos. La lectura combina territorio, delito y perfil poblacional para orientar seguimiento.",
      "predictive": {
        "nextPeriod": "2018-01",
        "territories": [
          {
            "id": "national",
            "forecastPeriod": "2018-01",
            "forecastValue": 2,
            "lastObservedValue": 5,
            "changePct": 50.0,
            "direction": "up",
            "accuracyScore": 70.4,
            "confidence": "medium",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 96,
            "series": [
              {
                "period": "2017-01",
                "value": 5
              },
              {
                "period": "2017-02",
                "value": 2
              },
              {
                "period": "2017-03",
                "value": 1
              },
              {
                "period": "2017-04",
                "value": 0
              },
              {
                "period": "2017-05",
                "value": 0
              },
              {
                "period": "2017-06",
                "value": 2
              },
              {
                "period": "2017-07",
                "value": 2
              },
              {
                "period": "2017-08",
                "value": 1
              },
              {
                "period": "2017-09",
                "value": 1
              },
              {
                "period": "2017-10",
                "value": 1
              },
              {
                "period": "2017-11",
                "value": 0
              },
              {
                "period": "2017-12",
                "value": 5
              }
            ],
            "label": "Nacional",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (22.1%)",
            "hotspot": "Departamento: Bogota (14.8%)",
            "recommendations": [
              "Priorizar seguimiento sobre Bogota en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 209. Actos Sexuales Con Menor de 14 Anos sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 2 casos en Nacional. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 50.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es media.",
              "focus": "El foco principal en Nacional sigue siendo Articulo 209. Actos Sexuales Con Menor de 14 Anos, mientras Departamento: Bogota (14.8%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Bogota y monitorear si Articulo 209. Actos Sexuales Con Menor de 14 Anos conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "bogota",
            "forecastPeriod": "2017-02",
            "forecastValue": 3,
            "lastObservedValue": 3,
            "changePct": 11.1,
            "direction": "up",
            "accuracyScore": 51.1,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Tendencia reciente + estacionalidad",
            "modelLabelEn": "Recent trend + seasonality",
            "historyMonths": 85,
            "series": [
              {
                "period": "2016-02",
                "value": 2
              },
              {
                "period": "2016-03",
                "value": 3
              },
              {
                "period": "2016-04",
                "value": 1
              },
              {
                "period": "2016-05",
                "value": 0
              },
              {
                "period": "2016-06",
                "value": 1
              },
              {
                "period": "2016-07",
                "value": 4
              },
              {
                "period": "2016-08",
                "value": 4
              },
              {
                "period": "2016-09",
                "value": 1
              },
              {
                "period": "2016-10",
                "value": 4
              },
              {
                "period": "2016-11",
                "value": 3
              },
              {
                "period": "2016-12",
                "value": 4
              },
              {
                "period": "2017-01",
                "value": 3
              }
            ],
            "label": "Bogota",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (16.5%)",
            "hotspot": "Municipio: Bogota D.C. (100.0%)",
            "recommendations": [
              "Priorizar seguimiento sobre Bogota D.C. en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 209. Actos Sexuales Con Menor de 14 Anos sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 3 casos en Bogota. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 11.1% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Bogota sigue siendo Articulo 209. Actos Sexuales Con Menor de 14 Anos, mientras Municipio: Bogota D.C. (100.0%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Bogota D.C. y monitorear si Articulo 209. Actos Sexuales Con Menor de 14 Anos conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "valle",
            "forecastPeriod": "2017-08",
            "forecastValue": 1,
            "lastObservedValue": 2,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 47.2,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 91,
            "series": [
              {
                "period": "2016-08",
                "value": 3
              },
              {
                "period": "2016-09",
                "value": 2
              },
              {
                "period": "2016-10",
                "value": 2
              },
              {
                "period": "2016-11",
                "value": 2
              },
              {
                "period": "2016-12",
                "value": 3
              },
              {
                "period": "2017-01",
                "value": 1
              },
              {
                "period": "2017-02",
                "value": 0
              },
              {
                "period": "2017-03",
                "value": 0
              },
              {
                "period": "2017-04",
                "value": 0
              },
              {
                "period": "2017-05",
                "value": 0
              },
              {
                "period": "2017-06",
                "value": 0
              },
              {
                "period": "2017-07",
                "value": 2
              }
            ],
            "label": "Valle",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (23.7%)",
            "hotspot": "Municipio: Cali (46.3%)",
            "recommendations": [
              "Priorizar seguimiento sobre Cali en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 209. Actos Sexuales Con Menor de 14 Anos sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 1 casos en Valle. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Valle sigue siendo Articulo 209. Actos Sexuales Con Menor de 14 Anos, mientras Municipio: Cali (46.3%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Cali y monitorear si Articulo 209. Actos Sexuales Con Menor de 14 Anos conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "santander",
            "forecastPeriod": "2017-03",
            "forecastValue": 2,
            "lastObservedValue": 1,
            "changePct": -71.4,
            "direction": "down",
            "accuracyScore": 49.4,
            "confidence": "low",
            "risk": "low",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 86,
            "series": [
              {
                "period": "2016-03",
                "value": 4
              },
              {
                "period": "2016-04",
                "value": 3
              },
              {
                "period": "2016-05",
                "value": 1
              },
              {
                "period": "2016-06",
                "value": 1
              },
              {
                "period": "2016-07",
                "value": 1
              },
              {
                "period": "2016-08",
                "value": 1
              },
              {
                "period": "2016-09",
                "value": 2
              },
              {
                "period": "2016-10",
                "value": 4
              },
              {
                "period": "2016-11",
                "value": 1
              },
              {
                "period": "2016-12",
                "value": 1
              },
              {
                "period": "2017-01",
                "value": 0
              },
              {
                "period": "2017-02",
                "value": 1
              }
            ],
            "label": "Santander",
            "dominantFactor": "Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir (24.2%)",
            "hotspot": "Municipio: Bucaramanga (27.7%)",
            "recommendations": [
              "Priorizar seguimiento sobre Bucaramanga en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 2 casos en Santander. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente baja 71.4% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Santander sigue siendo Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir, mientras Municipio: Bucaramanga (27.7%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Bucaramanga y monitorear si Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "antioquia",
            "forecastPeriod": "2017-10",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 42.1,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Tendencia ponderada reciente",
            "modelLabelEn": "Weighted recent trend",
            "historyMonths": 93,
            "series": [
              {
                "period": "2016-10",
                "value": 1
              },
              {
                "period": "2016-11",
                "value": 1
              },
              {
                "period": "2016-12",
                "value": 1
              },
              {
                "period": "2017-01",
                "value": 0
              },
              {
                "period": "2017-02",
                "value": 0
              },
              {
                "period": "2017-03",
                "value": 0
              },
              {
                "period": "2017-04",
                "value": 0
              },
              {
                "period": "2017-05",
                "value": 0
              },
              {
                "period": "2017-06",
                "value": 0
              },
              {
                "period": "2017-07",
                "value": 0
              },
              {
                "period": "2017-08",
                "value": 1
              },
              {
                "period": "2017-09",
                "value": 1
              }
            ],
            "label": "Antioquia",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (21.8%)",
            "hotspot": "Municipio: Medellin (21.8%)",
            "recommendations": [
              "Priorizar seguimiento sobre Medellin en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 209. Actos Sexuales Con Menor de 14 Anos sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 1 casos en Antioquia. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Antioquia sigue siendo Articulo 209. Actos Sexuales Con Menor de 14 Anos, mientras Municipio: Medellin (21.8%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Medellin y monitorear si Articulo 209. Actos Sexuales Con Menor de 14 Anos conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "atlantico",
            "forecastPeriod": "2017-01",
            "forecastValue": 2,
            "lastObservedValue": 4,
            "changePct": 133.3,
            "direction": "up",
            "accuracyScore": 26.8,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Tendencia reciente + estacionalidad",
            "modelLabelEn": "Recent trend + seasonality",
            "historyMonths": 84,
            "series": [
              {
                "period": "2016-01",
                "value": 0
              },
              {
                "period": "2016-02",
                "value": 1
              },
              {
                "period": "2016-03",
                "value": 0
              },
              {
                "period": "2016-04",
                "value": 1
              },
              {
                "period": "2016-05",
                "value": 0
              },
              {
                "period": "2016-06",
                "value": 2
              },
              {
                "period": "2016-07",
                "value": 0
              },
              {
                "period": "2016-08",
                "value": 3
              },
              {
                "period": "2016-09",
                "value": 0
              },
              {
                "period": "2016-10",
                "value": 2
              },
              {
                "period": "2016-11",
                "value": 1
              },
              {
                "period": "2016-12",
                "value": 4
              }
            ],
            "label": "Atlantico",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (27.0%)",
            "hotspot": "Municipio: Barranquilla (57.9%)",
            "recommendations": [
              "Priorizar seguimiento sobre Barranquilla en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 209. Actos Sexuales Con Menor de 14 Anos sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 2 casos en Atlantico. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 133.3% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Atlantico sigue siendo Articulo 209. Actos Sexuales Con Menor de 14 Anos, mientras Municipio: Barranquilla (57.9%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Barranquilla y monitorear si Articulo 209. Actos Sexuales Con Menor de 14 Anos conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "huila",
            "forecastPeriod": "2016-12",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": -50.0,
            "direction": "down",
            "accuracyScore": 22.5,
            "confidence": "low",
            "risk": "low",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 83,
            "series": [
              {
                "period": "2015-12",
                "value": 0
              },
              {
                "period": "2016-01",
                "value": 2
              },
              {
                "period": "2016-02",
                "value": 0
              },
              {
                "period": "2016-03",
                "value": 1
              },
              {
                "period": "2016-04",
                "value": 1
              },
              {
                "period": "2016-05",
                "value": 2
              },
              {
                "period": "2016-06",
                "value": 0
              },
              {
                "period": "2016-07",
                "value": 0
              },
              {
                "period": "2016-08",
                "value": 2
              },
              {
                "period": "2016-09",
                "value": 0
              },
              {
                "period": "2016-10",
                "value": 0
              },
              {
                "period": "2016-11",
                "value": 1
              }
            ],
            "label": "Huila",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (21.4%)",
            "hotspot": "Municipio: Neiva (39.1%)",
            "recommendations": [
              "Priorizar seguimiento sobre Neiva en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 209. Actos Sexuales Con Menor de 14 Anos sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Huila. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente baja 50.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Huila sigue siendo Articulo 209. Actos Sexuales Con Menor de 14 Anos, mientras Municipio: Neiva (39.1%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Neiva y monitorear si Articulo 209. Actos Sexuales Con Menor de 14 Anos conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "risaralda",
            "forecastPeriod": "2018-01",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 33.2,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 96,
            "series": [
              {
                "period": "2017-01",
                "value": 0
              },
              {
                "period": "2017-02",
                "value": 0
              },
              {
                "period": "2017-03",
                "value": 0
              },
              {
                "period": "2017-04",
                "value": 0
              },
              {
                "period": "2017-05",
                "value": 0
              },
              {
                "period": "2017-06",
                "value": 0
              },
              {
                "period": "2017-07",
                "value": 0
              },
              {
                "period": "2017-08",
                "value": 0
              },
              {
                "period": "2017-09",
                "value": 0
              },
              {
                "period": "2017-10",
                "value": 0
              },
              {
                "period": "2017-11",
                "value": 0
              },
              {
                "period": "2017-12",
                "value": 1
              }
            ],
            "label": "Risaralda",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (33.0%)",
            "hotspot": "Municipio: Pereira (57.4%)",
            "recommendations": [
              "Priorizar seguimiento sobre Pereira en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 209. Actos Sexuales Con Menor de 14 Anos sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Risaralda. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Risaralda sigue siendo Articulo 209. Actos Sexuales Con Menor de 14 Anos, mientras Municipio: Pereira (57.4%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Pereira y monitorear si Articulo 209. Actos Sexuales Con Menor de 14 Anos conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "meta",
            "forecastPeriod": "2017-07",
            "forecastValue": 0,
            "lastObservedValue": 2,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 16.9,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 90,
            "series": [
              {
                "period": "2016-07",
                "value": 0
              },
              {
                "period": "2016-08",
                "value": 0
              },
              {
                "period": "2016-09",
                "value": 1
              },
              {
                "period": "2016-10",
                "value": 0
              },
              {
                "period": "2016-11",
                "value": 1
              },
              {
                "period": "2016-12",
                "value": 1
              },
              {
                "period": "2017-01",
                "value": 0
              },
              {
                "period": "2017-02",
                "value": 0
              },
              {
                "period": "2017-03",
                "value": 0
              },
              {
                "period": "2017-04",
                "value": 0
              },
              {
                "period": "2017-05",
                "value": 0
              },
              {
                "period": "2017-06",
                "value": 2
              }
            ],
            "label": "Meta",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (16.3%)",
            "hotspot": "Municipio: Villavicencio (63.4%)",
            "recommendations": [
              "Priorizar seguimiento sobre Villavicencio en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 209. Actos Sexuales Con Menor de 14 Anos sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Meta. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Meta sigue siendo Articulo 209. Actos Sexuales Con Menor de 14 Anos, mientras Municipio: Villavicencio (63.4%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Villavicencio y monitorear si Articulo 209. Actos Sexuales Con Menor de 14 Anos conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "boyaca",
            "forecastPeriod": "2016-11",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 0.0,
            "direction": "stable",
            "accuracyScore": 33.6,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Tendencia reciente + estacionalidad",
            "modelLabelEn": "Recent trend + seasonality",
            "historyMonths": 81,
            "series": [
              {
                "period": "2015-11",
                "value": 0
              },
              {
                "period": "2015-12",
                "value": 2
              },
              {
                "period": "2016-01",
                "value": 0
              },
              {
                "period": "2016-02",
                "value": 0
              },
              {
                "period": "2016-03",
                "value": 1
              },
              {
                "period": "2016-04",
                "value": 1
              },
              {
                "period": "2016-05",
                "value": 0
              },
              {
                "period": "2016-06",
                "value": 2
              },
              {
                "period": "2016-07",
                "value": 1
              },
              {
                "period": "2016-08",
                "value": 1
              },
              {
                "period": "2016-09",
                "value": 1
              },
              {
                "period": "2016-10",
                "value": 1
              }
            ],
            "label": "Boyaca",
            "dominantFactor": "Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir (26.4%)",
            "hotspot": "Municipio: Tunja (13.2%)",
            "recommendations": [
              "Priorizar seguimiento sobre Tunja en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 1 casos en Boyaca. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "La presion reciente se mantiene estable frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Boyaca sigue siendo Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir, mientras Municipio: Tunja (13.2%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Tunja y monitorear si Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "sucre",
            "forecastPeriod": "2018-01",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 24.9,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 96,
            "series": [
              {
                "period": "2017-01",
                "value": 0
              },
              {
                "period": "2017-02",
                "value": 0
              },
              {
                "period": "2017-03",
                "value": 0
              },
              {
                "period": "2017-04",
                "value": 0
              },
              {
                "period": "2017-05",
                "value": 0
              },
              {
                "period": "2017-06",
                "value": 0
              },
              {
                "period": "2017-07",
                "value": 0
              },
              {
                "period": "2017-08",
                "value": 0
              },
              {
                "period": "2017-09",
                "value": 0
              },
              {
                "period": "2017-10",
                "value": 0
              },
              {
                "period": "2017-11",
                "value": 0
              },
              {
                "period": "2017-12",
                "value": 1
              }
            ],
            "label": "Sucre",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (25.2%)",
            "hotspot": "Municipio: Sincelejo (32.3%)",
            "recommendations": [
              "Priorizar seguimiento sobre Sincelejo en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 209. Actos Sexuales Con Menor de 14 Anos sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Sucre. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Sucre sigue siendo Articulo 209. Actos Sexuales Con Menor de 14 Anos, mientras Municipio: Sincelejo (32.3%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Sincelejo y monitorear si Articulo 209. Actos Sexuales Con Menor de 14 Anos conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "norte-de-santander",
            "forecastPeriod": "2017-04",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 0.0,
            "direction": "stable",
            "accuracyScore": 0.0,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Ultimo valor",
            "modelLabelEn": "Last value",
            "historyMonths": 81,
            "series": [
              {
                "period": "2016-04",
                "value": 3
              },
              {
                "period": "2016-05",
                "value": 1
              },
              {
                "period": "2016-06",
                "value": 1
              },
              {
                "period": "2016-07",
                "value": 0
              },
              {
                "period": "2016-08",
                "value": 0
              },
              {
                "period": "2016-09",
                "value": 0
              },
              {
                "period": "2016-10",
                "value": 1
              },
              {
                "period": "2016-11",
                "value": 0
              },
              {
                "period": "2016-12",
                "value": 0
              },
              {
                "period": "2017-01",
                "value": 0
              },
              {
                "period": "2017-02",
                "value": 0
              },
              {
                "period": "2017-03",
                "value": 1
              }
            ],
            "label": "Norte de Santander",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (39.8%)",
            "hotspot": "Municipio: Cucuta (58.5%)",
            "recommendations": [
              "Priorizar seguimiento sobre Cucuta en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 209. Actos Sexuales Con Menor de 14 Anos sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 1 casos en Norte de Santander. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "La presion reciente se mantiene estable frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Norte de Santander sigue siendo Articulo 209. Actos Sexuales Con Menor de 14 Anos, mientras Municipio: Cucuta (58.5%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Cucuta y monitorear si Articulo 209. Actos Sexuales Con Menor de 14 Anos conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "caldas",
            "forecastPeriod": "2017-11",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 18.2,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Tendencia ponderada reciente",
            "modelLabelEn": "Weighted recent trend",
            "historyMonths": 94,
            "series": [
              {
                "period": "2016-11",
                "value": 0
              },
              {
                "period": "2016-12",
                "value": 1
              },
              {
                "period": "2017-01",
                "value": 0
              },
              {
                "period": "2017-02",
                "value": 0
              },
              {
                "period": "2017-03",
                "value": 0
              },
              {
                "period": "2017-04",
                "value": 0
              },
              {
                "period": "2017-05",
                "value": 0
              },
              {
                "period": "2017-06",
                "value": 0
              },
              {
                "period": "2017-07",
                "value": 0
              },
              {
                "period": "2017-08",
                "value": 0
              },
              {
                "period": "2017-09",
                "value": 0
              },
              {
                "period": "2017-10",
                "value": 1
              }
            ],
            "label": "Caldas",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (31.7%)",
            "hotspot": "Municipio: Manizales (41.5%)",
            "recommendations": [
              "Priorizar seguimiento sobre Manizales en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 209. Actos Sexuales Con Menor de 14 Anos sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Caldas. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Caldas sigue siendo Articulo 209. Actos Sexuales Con Menor de 14 Anos, mientras Municipio: Manizales (41.5%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Manizales y monitorear si Articulo 209. Actos Sexuales Con Menor de 14 Anos conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "quindio",
            "forecastPeriod": "2017-01",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 0.0,
            "direction": "stable",
            "accuracyScore": 6.8,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Tendencia reciente + estacionalidad",
            "modelLabelEn": "Recent trend + seasonality",
            "historyMonths": 82,
            "series": [
              {
                "period": "2016-01",
                "value": 0
              },
              {
                "period": "2016-02",
                "value": 0
              },
              {
                "period": "2016-03",
                "value": 1
              },
              {
                "period": "2016-04",
                "value": 0
              },
              {
                "period": "2016-05",
                "value": 0
              },
              {
                "period": "2016-06",
                "value": 0
              },
              {
                "period": "2016-07",
                "value": 0
              },
              {
                "period": "2016-08",
                "value": 0
              },
              {
                "period": "2016-09",
                "value": 1
              },
              {
                "period": "2016-10",
                "value": 0
              },
              {
                "period": "2016-11",
                "value": 0
              },
              {
                "period": "2016-12",
                "value": 1
              }
            ],
            "label": "Quindio",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (70.5%)",
            "hotspot": "Municipio: Armenia (54.1%)",
            "recommendations": [
              "Priorizar seguimiento sobre Armenia en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 209. Actos Sexuales Con Menor de 14 Anos sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Quindio. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "La presion reciente se mantiene estable frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Quindio sigue siendo Articulo 209. Actos Sexuales Con Menor de 14 Anos, mientras Municipio: Armenia (54.1%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Armenia y monitorear si Articulo 209. Actos Sexuales Con Menor de 14 Anos conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "caqueta",
            "forecastPeriod": "2016-07",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 20.6,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 78,
            "series": [
              {
                "period": "2015-07",
                "value": 0
              },
              {
                "period": "2015-08",
                "value": 1
              },
              {
                "period": "2015-09",
                "value": 0
              },
              {
                "period": "2015-10",
                "value": 1
              },
              {
                "period": "2015-11",
                "value": 1
              },
              {
                "period": "2015-12",
                "value": 1
              },
              {
                "period": "2016-01",
                "value": 0
              },
              {
                "period": "2016-02",
                "value": 0
              },
              {
                "period": "2016-03",
                "value": 0
              },
              {
                "period": "2016-04",
                "value": 0
              },
              {
                "period": "2016-05",
                "value": 0
              },
              {
                "period": "2016-06",
                "value": 1
              }
            ],
            "label": "Caqueta",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (39.8%)",
            "hotspot": "Municipio: Florencia (65.3%)",
            "recommendations": [
              "Priorizar seguimiento sobre Florencia en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 209. Actos Sexuales Con Menor de 14 Anos sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Caqueta. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Caqueta sigue siendo Articulo 209. Actos Sexuales Con Menor de 14 Anos, mientras Municipio: Florencia (65.3%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Florencia y monitorear si Articulo 209. Actos Sexuales Con Menor de 14 Anos conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "tolima",
            "forecastPeriod": "2017-01",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 14.7,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 82,
            "series": [
              {
                "period": "2016-01",
                "value": 0
              },
              {
                "period": "2016-02",
                "value": 0
              },
              {
                "period": "2016-03",
                "value": 0
              },
              {
                "period": "2016-04",
                "value": 0
              },
              {
                "period": "2016-05",
                "value": 0
              },
              {
                "period": "2016-06",
                "value": 1
              },
              {
                "period": "2016-07",
                "value": 0
              },
              {
                "period": "2016-08",
                "value": 0
              },
              {
                "period": "2016-09",
                "value": 1
              },
              {
                "period": "2016-10",
                "value": 1
              },
              {
                "period": "2016-11",
                "value": 0
              },
              {
                "period": "2016-12",
                "value": 1
              }
            ],
            "label": "Tolima",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (23.9%)",
            "hotspot": "Municipio: Ibague (32.7%)",
            "recommendations": [
              "Priorizar seguimiento sobre Ibague en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 209. Actos Sexuales Con Menor de 14 Anos sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Tolima. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Tolima sigue siendo Articulo 209. Actos Sexuales Con Menor de 14 Anos, mientras Municipio: Ibague (32.7%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Ibague y monitorear si Articulo 209. Actos Sexuales Con Menor de 14 Anos conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "narino",
            "forecastPeriod": "2016-09",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 18.1,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 80,
            "series": [
              {
                "period": "2015-09",
                "value": 2
              },
              {
                "period": "2015-10",
                "value": 0
              },
              {
                "period": "2015-11",
                "value": 0
              },
              {
                "period": "2015-12",
                "value": 0
              },
              {
                "period": "2016-01",
                "value": 0
              },
              {
                "period": "2016-02",
                "value": 1
              },
              {
                "period": "2016-03",
                "value": 0
              },
              {
                "period": "2016-04",
                "value": 0
              },
              {
                "period": "2016-05",
                "value": 0
              },
              {
                "period": "2016-06",
                "value": 0
              },
              {
                "period": "2016-07",
                "value": 1
              },
              {
                "period": "2016-08",
                "value": 1
              }
            ],
            "label": "Narino",
            "dominantFactor": "Articulo 210 A. Acoso Sexual (16.3%)",
            "hotspot": "Municipio: Pasto (37.0%)",
            "recommendations": [
              "Priorizar seguimiento sobre Pasto en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 210 A. Acoso Sexual sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Narino. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Narino sigue siendo Articulo 210 A. Acoso Sexual, mientras Municipio: Pasto (37.0%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Pasto y monitorear si Articulo 210 A. Acoso Sexual conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "bolivar",
            "forecastPeriod": "2017-01",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": -50.0,
            "direction": "down",
            "accuracyScore": 0.0,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Ultimo valor",
            "modelLabelEn": "Last value",
            "historyMonths": 84,
            "series": [
              {
                "period": "2016-01",
                "value": 2
              },
              {
                "period": "2016-02",
                "value": 0
              },
              {
                "period": "2016-03",
                "value": 0
              },
              {
                "period": "2016-04",
                "value": 0
              },
              {
                "period": "2016-05",
                "value": 0
              },
              {
                "period": "2016-06",
                "value": 1
              },
              {
                "period": "2016-07",
                "value": 0
              },
              {
                "period": "2016-08",
                "value": 2
              },
              {
                "period": "2016-09",
                "value": 0
              },
              {
                "period": "2016-10",
                "value": 0
              },
              {
                "period": "2016-11",
                "value": 0
              },
              {
                "period": "2016-12",
                "value": 1
              }
            ],
            "label": "Bolivar",
            "dominantFactor": "Articulo 206. Acto Sexual Violento (14.6%)",
            "hotspot": "Municipio: Cartagena (39.3%)",
            "recommendations": [
              "Priorizar seguimiento sobre Cartagena en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 206. Acto Sexual Violento sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 1 casos en Bolivar. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente baja 50.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Bolivar sigue siendo Articulo 206. Acto Sexual Violento, mientras Municipio: Cartagena (39.3%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Cartagena y monitorear si Articulo 206. Acto Sexual Violento conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "magdalena",
            "forecastPeriod": "2016-12",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 13.1,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Tendencia reciente + estacionalidad",
            "modelLabelEn": "Recent trend + seasonality",
            "historyMonths": 83,
            "series": [
              {
                "period": "2015-12",
                "value": 0
              },
              {
                "period": "2016-01",
                "value": 0
              },
              {
                "period": "2016-02",
                "value": 0
              },
              {
                "period": "2016-03",
                "value": 0
              },
              {
                "period": "2016-04",
                "value": 0
              },
              {
                "period": "2016-05",
                "value": 0
              },
              {
                "period": "2016-06",
                "value": 0
              },
              {
                "period": "2016-07",
                "value": 0
              },
              {
                "period": "2016-08",
                "value": 0
              },
              {
                "period": "2016-09",
                "value": 0
              },
              {
                "period": "2016-10",
                "value": 2
              },
              {
                "period": "2016-11",
                "value": 1
              }
            ],
            "label": "Magdalena",
            "dominantFactor": "Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir (14.8%)",
            "hotspot": "Municipio: Santa Marta (58.0%)",
            "recommendations": [
              "Priorizar seguimiento sobre Santa Marta en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 1 casos en Magdalena. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Magdalena sigue siendo Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir, mientras Municipio: Santa Marta (58.0%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Santa Marta y monitorear si Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "cundinamarca",
            "forecastPeriod": "2016-08",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 21.8,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 79,
            "series": [
              {
                "period": "2015-08",
                "value": 1
              },
              {
                "period": "2015-09",
                "value": 0
              },
              {
                "period": "2015-10",
                "value": 0
              },
              {
                "period": "2015-11",
                "value": 0
              },
              {
                "period": "2015-12",
                "value": 0
              },
              {
                "period": "2016-01",
                "value": 2
              },
              {
                "period": "2016-02",
                "value": 0
              },
              {
                "period": "2016-03",
                "value": 0
              },
              {
                "period": "2016-04",
                "value": 0
              },
              {
                "period": "2016-05",
                "value": 1
              },
              {
                "period": "2016-06",
                "value": 1
              },
              {
                "period": "2016-07",
                "value": 1
              }
            ],
            "label": "Cundinamarca",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (24.6%)",
            "hotspot": "Municipio: Soacha (34.4%)",
            "recommendations": [
              "Priorizar seguimiento sobre Soacha en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 209. Actos Sexuales Con Menor de 14 Anos sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Cundinamarca. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Cundinamarca sigue siendo Articulo 209. Actos Sexuales Con Menor de 14 Anos, mientras Municipio: Soacha (34.4%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Soacha y monitorear si Articulo 209. Actos Sexuales Con Menor de 14 Anos conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "cordoba",
            "forecastPeriod": "2017-01",
            "forecastValue": 1,
            "lastObservedValue": 2,
            "changePct": 66.7,
            "direction": "up",
            "accuracyScore": 12.7,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 80,
            "series": [
              {
                "period": "2016-01",
                "value": 1
              },
              {
                "period": "2016-02",
                "value": 3
              },
              {
                "period": "2016-03",
                "value": 0
              },
              {
                "period": "2016-04",
                "value": 0
              },
              {
                "period": "2016-05",
                "value": 1
              },
              {
                "period": "2016-06",
                "value": 0
              },
              {
                "period": "2016-07",
                "value": 1
              },
              {
                "period": "2016-08",
                "value": 0
              },
              {
                "period": "2016-09",
                "value": 2
              },
              {
                "period": "2016-10",
                "value": 1
              },
              {
                "period": "2016-11",
                "value": 2
              },
              {
                "period": "2016-12",
                "value": 2
              }
            ],
            "label": "Cordoba",
            "dominantFactor": "Articulo 205. Acceso Carnal Violento (20.0%)",
            "hotspot": "Municipio: Monteria (45.0%)",
            "recommendations": [
              "Priorizar seguimiento sobre Monteria en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 205. Acceso Carnal Violento sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 1 casos en Cordoba. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 66.7% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Cordoba sigue siendo Articulo 205. Acceso Carnal Violento, mientras Municipio: Monteria (45.0%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Monteria y monitorear si Articulo 205. Acceso Carnal Violento conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "putumayo",
            "forecastPeriod": "2017-02",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 30.2,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 85,
            "series": [
              {
                "period": "2016-02",
                "value": 0
              },
              {
                "period": "2016-03",
                "value": 0
              },
              {
                "period": "2016-04",
                "value": 0
              },
              {
                "period": "2016-05",
                "value": 0
              },
              {
                "period": "2016-06",
                "value": 0
              },
              {
                "period": "2016-07",
                "value": 0
              },
              {
                "period": "2016-08",
                "value": 0
              },
              {
                "period": "2016-09",
                "value": 0
              },
              {
                "period": "2016-10",
                "value": 0
              },
              {
                "period": "2016-11",
                "value": 0
              },
              {
                "period": "2016-12",
                "value": 1
              },
              {
                "period": "2017-01",
                "value": 1
              }
            ],
            "label": "Putumayo",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (30.2%)",
            "hotspot": "Municipio: Mocoa (39.5%)",
            "recommendations": [
              "Priorizar seguimiento sobre Mocoa en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 209. Actos Sexuales Con Menor de 14 Anos sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Putumayo. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Putumayo sigue siendo Articulo 209. Actos Sexuales Con Menor de 14 Anos, mientras Municipio: Mocoa (39.5%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Mocoa y monitorear si Articulo 209. Actos Sexuales Con Menor de 14 Anos conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "guajira",
            "forecastPeriod": "2016-04",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 12.0,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 75,
            "series": [
              {
                "period": "2015-04",
                "value": 1
              },
              {
                "period": "2015-05",
                "value": 0
              },
              {
                "period": "2015-06",
                "value": 0
              },
              {
                "period": "2015-07",
                "value": 0
              },
              {
                "period": "2015-08",
                "value": 1
              },
              {
                "period": "2015-09",
                "value": 0
              },
              {
                "period": "2015-10",
                "value": 0
              },
              {
                "period": "2015-11",
                "value": 0
              },
              {
                "period": "2015-12",
                "value": 0
              },
              {
                "period": "2016-01",
                "value": 1
              },
              {
                "period": "2016-02",
                "value": 0
              },
              {
                "period": "2016-03",
                "value": 1
              }
            ],
            "label": "Guajira",
            "dominantFactor": "Articulo 211. Actos Sexuales Con Menor de 14 Anos (Circunstancias de Agravacion) (19.5%)",
            "hotspot": "Municipio: Riohacha (36.6%)",
            "recommendations": [
              "Priorizar seguimiento sobre Riohacha en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 211. Actos Sexuales Con Menor de 14 Anos (Circunstancias de Agravacion) sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Guajira. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Guajira sigue siendo Articulo 211. Actos Sexuales Con Menor de 14 Anos (Circunstancias de Agravacion), mientras Municipio: Riohacha (36.6%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Riohacha y monitorear si Articulo 211. Actos Sexuales Con Menor de 14 Anos (Circunstancias de Agravacion) conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "cauca",
            "forecastPeriod": "2018-01",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 30.8,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 91,
            "series": [
              {
                "period": "2017-01",
                "value": 0
              },
              {
                "period": "2017-02",
                "value": 1
              },
              {
                "period": "2017-03",
                "value": 0
              },
              {
                "period": "2017-04",
                "value": 0
              },
              {
                "period": "2017-05",
                "value": 0
              },
              {
                "period": "2017-06",
                "value": 0
              },
              {
                "period": "2017-07",
                "value": 0
              },
              {
                "period": "2017-08",
                "value": 0
              },
              {
                "period": "2017-09",
                "value": 0
              },
              {
                "period": "2017-10",
                "value": 0
              },
              {
                "period": "2017-11",
                "value": 0
              },
              {
                "period": "2017-12",
                "value": 1
              }
            ],
            "label": "Cauca",
            "dominantFactor": "Articulo 205. Acceso Carnal Violento (20.5%)",
            "hotspot": "Municipio: Popayan (51.3%)",
            "recommendations": [
              "Priorizar seguimiento sobre Popayan en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 205. Acceso Carnal Violento sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Cauca. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Cauca sigue siendo Articulo 205. Acceso Carnal Violento, mientras Municipio: Popayan (51.3%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Popayan y monitorear si Articulo 205. Acceso Carnal Violento conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "cesar",
            "forecastPeriod": "2016-08",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 25.3,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 78,
            "series": [
              {
                "period": "2015-08",
                "value": 1
              },
              {
                "period": "2015-09",
                "value": 0
              },
              {
                "period": "2015-10",
                "value": 1
              },
              {
                "period": "2015-11",
                "value": 2
              },
              {
                "period": "2015-12",
                "value": 1
              },
              {
                "period": "2016-01",
                "value": 0
              },
              {
                "period": "2016-02",
                "value": 0
              },
              {
                "period": "2016-03",
                "value": 0
              },
              {
                "period": "2016-04",
                "value": 0
              },
              {
                "period": "2016-05",
                "value": 0
              },
              {
                "period": "2016-06",
                "value": 0
              },
              {
                "period": "2016-07",
                "value": 1
              }
            ],
            "label": "Cesar",
            "dominantFactor": "Articulo 211. Acceso Carnal Abusivo Con Menor de 14 Anos (Circunstancias Agravacion) (23.7%)",
            "hotspot": "Municipio: Valledupar (65.8%)",
            "recommendations": [
              "Priorizar seguimiento sobre Valledupar en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 211. Acceso Carnal Abusivo Con Menor de 14 Anos (Circunstancias Agravacion) sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Cesar. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Cesar sigue siendo Articulo 211. Acceso Carnal Abusivo Con Menor de 14 Anos (Circunstancias Agravacion), mientras Municipio: Valledupar (65.8%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Valledupar y monitorear si Articulo 211. Acceso Carnal Abusivo Con Menor de 14 Anos (Circunstancias Agravacion) conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "choco",
            "forecastPeriod": "2018-01",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 34.2,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 96,
            "series": [
              {
                "period": "2017-01",
                "value": 0
              },
              {
                "period": "2017-02",
                "value": 0
              },
              {
                "period": "2017-03",
                "value": 0
              },
              {
                "period": "2017-04",
                "value": 0
              },
              {
                "period": "2017-05",
                "value": 0
              },
              {
                "period": "2017-06",
                "value": 0
              },
              {
                "period": "2017-07",
                "value": 0
              },
              {
                "period": "2017-08",
                "value": 0
              },
              {
                "period": "2017-09",
                "value": 0
              },
              {
                "period": "2017-10",
                "value": 0
              },
              {
                "period": "2017-11",
                "value": 0
              },
              {
                "period": "2017-12",
                "value": 1
              }
            ],
            "label": "Choco",
            "dominantFactor": "Articulo 205. Acceso Carnal Violento (27.3%)",
            "hotspot": "Municipio: Quibdo (51.5%)",
            "recommendations": [
              "Priorizar seguimiento sobre Quibdo en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 205. Acceso Carnal Violento sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Choco. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Choco sigue siendo Articulo 205. Acceso Carnal Violento, mientras Municipio: Quibdo (51.5%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Quibdo y monitorear si Articulo 205. Acceso Carnal Violento conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "arauca",
            "forecastPeriod": "2016-02",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 28.9,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Tendencia reciente + estacionalidad",
            "modelLabelEn": "Recent trend + seasonality",
            "historyMonths": 72,
            "series": [
              {
                "period": "2015-02",
                "value": 1
              },
              {
                "period": "2015-03",
                "value": 0
              },
              {
                "period": "2015-04",
                "value": 0
              },
              {
                "period": "2015-05",
                "value": 0
              },
              {
                "period": "2015-06",
                "value": 0
              },
              {
                "period": "2015-07",
                "value": 0
              },
              {
                "period": "2015-08",
                "value": 0
              },
              {
                "period": "2015-09",
                "value": 0
              },
              {
                "period": "2015-10",
                "value": 0
              },
              {
                "period": "2015-11",
                "value": 1
              },
              {
                "period": "2015-12",
                "value": 0
              },
              {
                "period": "2016-01",
                "value": 1
              }
            ],
            "label": "Arauca",
            "dominantFactor": "Articulo 211. Acceso Carnal Abusivo Con Menor de 14 Anos (Circunstancias Agravacion) (22.6%)",
            "hotspot": "Municipio: Arauca (54.8%)",
            "recommendations": [
              "Priorizar seguimiento sobre Arauca en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 211. Acceso Carnal Abusivo Con Menor de 14 Anos (Circunstancias Agravacion) sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 1 casos en Arauca. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Arauca sigue siendo Articulo 211. Acceso Carnal Abusivo Con Menor de 14 Anos (Circunstancias Agravacion), mientras Municipio: Arauca (54.8%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Arauca y monitorear si Articulo 211. Acceso Carnal Abusivo Con Menor de 14 Anos (Circunstancias Agravacion) conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "casanare",
            "forecastPeriod": "2016-12",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 41.2,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Ultimo valor",
            "modelLabelEn": "Last value",
            "historyMonths": 79,
            "series": [
              {
                "period": "2015-12",
                "value": 1
              },
              {
                "period": "2016-01",
                "value": 0
              },
              {
                "period": "2016-02",
                "value": 0
              },
              {
                "period": "2016-03",
                "value": 0
              },
              {
                "period": "2016-04",
                "value": 0
              },
              {
                "period": "2016-05",
                "value": 1
              },
              {
                "period": "2016-06",
                "value": 0
              },
              {
                "period": "2016-07",
                "value": 0
              },
              {
                "period": "2016-08",
                "value": 0
              },
              {
                "period": "2016-09",
                "value": 0
              },
              {
                "period": "2016-10",
                "value": 0
              },
              {
                "period": "2016-11",
                "value": 1
              }
            ],
            "label": "Casanare",
            "dominantFactor": "Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir (26.1%)",
            "hotspot": "Municipio: Yopal (39.1%)",
            "recommendations": [
              "Priorizar seguimiento sobre Yopal en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 1 casos en Casanare. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Casanare sigue siendo Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir, mientras Municipio: Yopal (39.1%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Yopal y monitorear si Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "amazonas",
            "forecastPeriod": "2018-01",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 57.0,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 96,
            "series": [
              {
                "period": "2017-01",
                "value": 0
              },
              {
                "period": "2017-02",
                "value": 0
              },
              {
                "period": "2017-03",
                "value": 0
              },
              {
                "period": "2017-04",
                "value": 0
              },
              {
                "period": "2017-05",
                "value": 0
              },
              {
                "period": "2017-06",
                "value": 0
              },
              {
                "period": "2017-07",
                "value": 0
              },
              {
                "period": "2017-08",
                "value": 0
              },
              {
                "period": "2017-09",
                "value": 0
              },
              {
                "period": "2017-10",
                "value": 0
              },
              {
                "period": "2017-11",
                "value": 0
              },
              {
                "period": "2017-12",
                "value": 1
              }
            ],
            "label": "Amazonas",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (31.8%)",
            "hotspot": "Municipio: Leticia (68.2%)",
            "recommendations": [
              "Priorizar seguimiento sobre Leticia en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 209. Actos Sexuales Con Menor de 14 Anos sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Amazonas. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Amazonas sigue siendo Articulo 209. Actos Sexuales Con Menor de 14 Anos, mientras Municipio: Leticia (68.2%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Leticia y monitorear si Articulo 209. Actos Sexuales Con Menor de 14 Anos conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "guaviare",
            "forecastPeriod": "2016-06",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 61.3,
            "confidence": "medium",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 34,
            "series": [
              {
                "period": "2015-06",
                "value": 0
              },
              {
                "period": "2015-07",
                "value": 0
              },
              {
                "period": "2015-08",
                "value": 0
              },
              {
                "period": "2015-09",
                "value": 0
              },
              {
                "period": "2015-10",
                "value": 0
              },
              {
                "period": "2015-11",
                "value": 0
              },
              {
                "period": "2015-12",
                "value": 0
              },
              {
                "period": "2016-01",
                "value": 0
              },
              {
                "period": "2016-02",
                "value": 0
              },
              {
                "period": "2016-03",
                "value": 1
              },
              {
                "period": "2016-04",
                "value": 0
              },
              {
                "period": "2016-05",
                "value": 1
              }
            ],
            "label": "Guaviare",
            "dominantFactor": "Articulo 210 A. Acoso Sexual (25.0%)",
            "hotspot": "Municipio: San Jose del Guaviare (75.0%)",
            "recommendations": [
              "Priorizar seguimiento sobre San Jose del Guaviare en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 210 A. Acoso Sexual sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Guaviare. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es media.",
              "focus": "El foco principal en Guaviare sigue siendo Articulo 210 A. Acoso Sexual, mientras Municipio: San Jose del Guaviare (75.0%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre San Jose del Guaviare y monitorear si Articulo 210 A. Acoso Sexual conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "san-andres",
            "forecastPeriod": "2014-11",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 76.7,
            "confidence": "high",
            "risk": "high",
            "modelLabelEs": "Ultimo valor",
            "modelLabelEn": "Last value",
            "historyMonths": 46,
            "series": [
              {
                "period": "2013-11",
                "value": 0
              },
              {
                "period": "2013-12",
                "value": 0
              },
              {
                "period": "2014-01",
                "value": 0
              },
              {
                "period": "2014-02",
                "value": 0
              },
              {
                "period": "2014-03",
                "value": 0
              },
              {
                "period": "2014-04",
                "value": 0
              },
              {
                "period": "2014-05",
                "value": 0
              },
              {
                "period": "2014-06",
                "value": 0
              },
              {
                "period": "2014-07",
                "value": 0
              },
              {
                "period": "2014-08",
                "value": 0
              },
              {
                "period": "2014-09",
                "value": 0
              },
              {
                "period": "2014-10",
                "value": 1
              }
            ],
            "label": "San Andres",
            "dominantFactor": "Articulo 205. Acceso Carnal Violento (28.6%)",
            "hotspot": "Municipio: San Andres (100.0%)",
            "recommendations": [
              "Priorizar seguimiento sobre San Andres en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 205. Acceso Carnal Violento sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 1 casos en San Andres. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es alta.",
              "focus": "El foco principal en San Andres sigue siendo Articulo 205. Acceso Carnal Violento, mientras Municipio: San Andres (100.0%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre San Andres y monitorear si Articulo 205. Acceso Carnal Violento conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "vichada",
            "forecastPeriod": "2014-05",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 0.0,
            "direction": "stable",
            "accuracyScore": 80.6,
            "confidence": "high",
            "risk": "high",
            "modelLabelEs": "Tendencia reciente + estacionalidad",
            "modelLabelEn": "Recent trend + seasonality",
            "historyMonths": 43,
            "series": [
              {
                "period": "2013-05",
                "value": 1
              },
              {
                "period": "2013-06",
                "value": 0
              },
              {
                "period": "2013-07",
                "value": 0
              },
              {
                "period": "2013-08",
                "value": 0
              },
              {
                "period": "2013-09",
                "value": 0
              },
              {
                "period": "2013-10",
                "value": 0
              },
              {
                "period": "2013-11",
                "value": 1
              },
              {
                "period": "2013-12",
                "value": 0
              },
              {
                "period": "2014-01",
                "value": 0
              },
              {
                "period": "2014-02",
                "value": 0
              },
              {
                "period": "2014-03",
                "value": 0
              },
              {
                "period": "2014-04",
                "value": 1
              }
            ],
            "label": "Vichada",
            "dominantFactor": "Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir (16.7%)",
            "hotspot": "Municipio: Puerto Carreno (83.3%)",
            "recommendations": [
              "Priorizar seguimiento sobre Puerto Carreno en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Vichada. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "La presion reciente se mantiene estable frente a la ventana previa. La confiabilidad operativa del escenario actual es alta.",
              "focus": "El foco principal en Vichada sigue siendo Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir, mientras Municipio: Puerto Carreno (83.3%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Puerto Carreno y monitorear si Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "guainia",
            "forecastPeriod": "2016-11",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 86.7,
            "confidence": "high",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 78,
            "series": [
              {
                "period": "2015-11",
                "value": 0
              },
              {
                "period": "2015-12",
                "value": 1
              },
              {
                "period": "2016-01",
                "value": 0
              },
              {
                "period": "2016-02",
                "value": 0
              },
              {
                "period": "2016-03",
                "value": 0
              },
              {
                "period": "2016-04",
                "value": 0
              },
              {
                "period": "2016-05",
                "value": 0
              },
              {
                "period": "2016-06",
                "value": 0
              },
              {
                "period": "2016-07",
                "value": 0
              },
              {
                "period": "2016-08",
                "value": 0
              },
              {
                "period": "2016-09",
                "value": 0
              },
              {
                "period": "2016-10",
                "value": 1
              }
            ],
            "label": "Guainia",
            "dominantFactor": "Articulo 205. Acceso Carnal Violento (50.0%)",
            "hotspot": "Municipio: Inirida (100.0%)",
            "recommendations": [
              "Priorizar seguimiento sobre Inirida en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 205. Acceso Carnal Violento sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Guainia. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es alta.",
              "focus": "El foco principal en Guainia sigue siendo Articulo 205. Acceso Carnal Violento, mientras Municipio: Inirida (100.0%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Inirida y monitorear si Articulo 205. Acceso Carnal Violento conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "vaupes",
            "forecastPeriod": "2016-07",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 71.4,
            "confidence": "medium",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 17,
            "series": [
              {
                "period": "2015-07",
                "value": 0
              },
              {
                "period": "2015-08",
                "value": 0
              },
              {
                "period": "2015-09",
                "value": 0
              },
              {
                "period": "2015-10",
                "value": 0
              },
              {
                "period": "2015-11",
                "value": 1
              },
              {
                "period": "2015-12",
                "value": 0
              },
              {
                "period": "2016-01",
                "value": 0
              },
              {
                "period": "2016-02",
                "value": 0
              },
              {
                "period": "2016-03",
                "value": 0
              },
              {
                "period": "2016-04",
                "value": 0
              },
              {
                "period": "2016-05",
                "value": 0
              },
              {
                "period": "2016-06",
                "value": 1
              }
            ],
            "label": "Vaupes",
            "dominantFactor": "Articulo 205. Acceso Carnal Violento (33.3%)",
            "hotspot": "Municipio: Mitu (100.0%)",
            "recommendations": [
              "Priorizar seguimiento sobre Mitu en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con delito dominante para validar si Articulo 205. Acceso Carnal Violento sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Vaupes. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es media.",
              "focus": "El foco principal en Vaupes sigue siendo Articulo 205. Acceso Carnal Violento, mientras Municipio: Mitu (100.0%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Mitu y monitorear si Articulo 205. Acceso Carnal Violento conserva su peso en la siguiente ventana operativa."
            }
          }
        ]
      }
    },
    "hurtos": {
      "summary": "La base de hurtos de vehiculos consolida 3.758 casos en 3.758 registros. El mayor peso territorial esta en Antioquia (13.9%) y la modalidad dominante es articulo 239. hurto motocicletas (85.2%).",
      "metrics": [
        {
          "label": "Casos consolidados",
          "value": "3.758"
        },
        {
          "label": "Foco principal",
          "value": "Antioquia 13.9%"
        },
        {
          "label": "Modalidad dominante",
          "value": "85.2% del total"
        }
      ],
      "findings": [
        {
          "title": "Concentracion reciente",
          "description": "Antioquia lidera con 523 casos y Bogota D.C. aparece como el principal municipio del corte."
        },
        {
          "title": "Patron dominante",
          "description": "Articulo 239. Hurto Motocicletas explica 85.2% del total. El perfil mas frecuente sigue siendo masculino (80.1%) y adultos (98.1%)."
        },
        {
          "title": "Condiciones del hecho",
          "description": "En armas o medios domina arma blanca / cortopunzante (81.1%), lo que sirve para focalizar consultas operativas."
        }
      ],
      "actions": [
        {
          "title": "Seguimiento territorial",
          "description": "Conviene reforzar seguimiento sobre Antioquia y Bogota D.C., porque concentran la mayor carga observada."
        },
        {
          "title": "Respuesta por modalidad",
          "description": "La lectura mejora cuando se diferencian las modalidades de hurto para no mezclar dinamicas distintas."
        }
      ],
      "coverageNote": "Base IA: 3.758 registros y 3.758 casos. La lectura combina territorio, modalidad y perfil afectado para orientar seguimiento.",
      "predictive": {
        "nextPeriod": "2027-01",
        "territories": [
          {
            "id": "national",
            "forecastPeriod": "2027-01",
            "forecastValue": 13,
            "lastObservedValue": 9,
            "changePct": 79.2,
            "direction": "up",
            "accuracyScore": 62.1,
            "confidence": "medium",
            "risk": "high",
            "modelLabelEs": "Tendencia ponderada reciente",
            "modelLabelEn": "Weighted recent trend",
            "historyMonths": 204,
            "series": [
              {
                "period": "2026-01",
                "value": 8
              },
              {
                "period": "2026-02",
                "value": 11
              },
              {
                "period": "2026-03",
                "value": 11
              },
              {
                "period": "2026-04",
                "value": 10
              },
              {
                "period": "2026-05",
                "value": 5
              },
              {
                "period": "2026-06",
                "value": 9
              },
              {
                "period": "2026-07",
                "value": 8
              },
              {
                "period": "2026-08",
                "value": 10
              },
              {
                "period": "2026-09",
                "value": 6
              },
              {
                "period": "2026-10",
                "value": 15
              },
              {
                "period": "2026-11",
                "value": 19
              },
              {
                "period": "2026-12",
                "value": 9
              }
            ],
            "label": "Nacional",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (85.2%)",
            "hotspot": "Departamento: Antioquia (13.9%)",
            "recommendations": [
              "Priorizar seguimiento sobre Antioquia en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 13 casos en Nacional. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 79.2% frente a la ventana previa. La confiabilidad operativa del escenario actual es media.",
              "focus": "El foco principal en Nacional sigue siendo Articulo 239. Hurto Motocicletas, mientras Departamento: Antioquia (13.9%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Antioquia y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "antioquia",
            "forecastPeriod": "2027-01",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 200.0,
            "direction": "up",
            "accuracyScore": 48.8,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 199,
            "series": [
              {
                "period": "2026-01",
                "value": 1
              },
              {
                "period": "2026-02",
                "value": 2
              },
              {
                "period": "2026-03",
                "value": 2
              },
              {
                "period": "2026-04",
                "value": 0
              },
              {
                "period": "2026-05",
                "value": 0
              },
              {
                "period": "2026-06",
                "value": 0
              },
              {
                "period": "2026-07",
                "value": 0
              },
              {
                "period": "2026-08",
                "value": 2
              },
              {
                "period": "2026-09",
                "value": 0
              },
              {
                "period": "2026-10",
                "value": 1
              },
              {
                "period": "2026-11",
                "value": 4
              },
              {
                "period": "2026-12",
                "value": 1
              }
            ],
            "label": "Antioquia",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (70.6%)",
            "hotspot": "Municipio: Medellin (59.1%)",
            "recommendations": [
              "Priorizar seguimiento sobre Medellin en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 1 casos en Antioquia. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 200.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Antioquia sigue siendo Articulo 239. Hurto Motocicletas, mientras Municipio: Medellin (59.1%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Medellin y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "bogota",
            "forecastPeriod": "2026-12",
            "forecastValue": 2,
            "lastObservedValue": 2,
            "changePct": 25.0,
            "direction": "up",
            "accuracyScore": 59.1,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Tendencia ponderada reciente",
            "modelLabelEn": "Weighted recent trend",
            "historyMonths": 193,
            "series": [
              {
                "period": "2025-12",
                "value": 8
              },
              {
                "period": "2026-01",
                "value": 0
              },
              {
                "period": "2026-02",
                "value": 2
              },
              {
                "period": "2026-03",
                "value": 1
              },
              {
                "period": "2026-04",
                "value": 4
              },
              {
                "period": "2026-05",
                "value": 1
              },
              {
                "period": "2026-06",
                "value": 2
              },
              {
                "period": "2026-07",
                "value": 2
              },
              {
                "period": "2026-08",
                "value": 0
              },
              {
                "period": "2026-09",
                "value": 1
              },
              {
                "period": "2026-10",
                "value": 2
              },
              {
                "period": "2026-11",
                "value": 2
              }
            ],
            "label": "Bogota",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (53.9%)",
            "hotspot": "Municipio: Bogota D.C. (100.0%)",
            "recommendations": [
              "Priorizar seguimiento sobre Bogota D.C. en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 2 casos en Bogota. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 25.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Bogota sigue siendo Articulo 239. Hurto Motocicletas, mientras Municipio: Bogota D.C. (100.0%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Bogota D.C. y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "valle",
            "forecastPeriod": "2027-01",
            "forecastValue": 2,
            "lastObservedValue": 3,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 53.9,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 204,
            "series": [
              {
                "period": "2026-01",
                "value": 2
              },
              {
                "period": "2026-02",
                "value": 1
              },
              {
                "period": "2026-03",
                "value": 3
              },
              {
                "period": "2026-04",
                "value": 1
              },
              {
                "period": "2026-05",
                "value": 1
              },
              {
                "period": "2026-06",
                "value": 0
              },
              {
                "period": "2026-07",
                "value": 0
              },
              {
                "period": "2026-08",
                "value": 1
              },
              {
                "period": "2026-09",
                "value": 2
              },
              {
                "period": "2026-10",
                "value": 2
              },
              {
                "period": "2026-11",
                "value": 1
              },
              {
                "period": "2026-12",
                "value": 3
              }
            ],
            "label": "Valle",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (94.3%)",
            "hotspot": "Municipio: Cali (55.9%)",
            "recommendations": [
              "Priorizar seguimiento sobre Cali en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 2 casos en Valle. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Valle sigue siendo Articulo 239. Hurto Motocicletas, mientras Municipio: Cali (55.9%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Cali y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "huila",
            "forecastPeriod": "2026-12",
            "forecastValue": 2,
            "lastObservedValue": 2,
            "changePct": -20.0,
            "direction": "down",
            "accuracyScore": 48.3,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Tendencia ponderada reciente",
            "modelLabelEn": "Weighted recent trend",
            "historyMonths": 203,
            "series": [
              {
                "period": "2025-12",
                "value": 7
              },
              {
                "period": "2026-01",
                "value": 2
              },
              {
                "period": "2026-02",
                "value": 0
              },
              {
                "period": "2026-03",
                "value": 0
              },
              {
                "period": "2026-04",
                "value": 2
              },
              {
                "period": "2026-05",
                "value": 1
              },
              {
                "period": "2026-06",
                "value": 2
              },
              {
                "period": "2026-07",
                "value": 2
              },
              {
                "period": "2026-08",
                "value": 1
              },
              {
                "period": "2026-09",
                "value": 1
              },
              {
                "period": "2026-10",
                "value": 1
              },
              {
                "period": "2026-11",
                "value": 2
              }
            ],
            "label": "Huila",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (99.1%)",
            "hotspot": "Municipio: Neiva (34.7%)",
            "recommendations": [
              "Priorizar seguimiento sobre Neiva en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 2 casos en Huila. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente baja 20.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Huila sigue siendo Articulo 239. Hurto Motocicletas, mientras Municipio: Neiva (34.7%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Neiva y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "cauca",
            "forecastPeriod": "2026-12",
            "forecastValue": 1,
            "lastObservedValue": 3,
            "changePct": 33.3,
            "direction": "up",
            "accuracyScore": 44.1,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 193,
            "series": [
              {
                "period": "2025-12",
                "value": 1
              },
              {
                "period": "2026-01",
                "value": 0
              },
              {
                "period": "2026-02",
                "value": 0
              },
              {
                "period": "2026-03",
                "value": 2
              },
              {
                "period": "2026-04",
                "value": 2
              },
              {
                "period": "2026-05",
                "value": 0
              },
              {
                "period": "2026-06",
                "value": 0
              },
              {
                "period": "2026-07",
                "value": 2
              },
              {
                "period": "2026-08",
                "value": 1
              },
              {
                "period": "2026-09",
                "value": 0
              },
              {
                "period": "2026-10",
                "value": 1
              },
              {
                "period": "2026-11",
                "value": 3
              }
            ],
            "label": "Cauca",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (96.1%)",
            "hotspot": "Municipio: Popayan (67.1%)",
            "recommendations": [
              "Priorizar seguimiento sobre Popayan en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 1 casos en Cauca. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 33.3% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Cauca sigue siendo Articulo 239. Hurto Motocicletas, mientras Municipio: Popayan (67.1%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Popayan y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "atlantico",
            "forecastPeriod": "2026-12",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 0.0,
            "direction": "stable",
            "accuracyScore": 48.7,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 203,
            "series": [
              {
                "period": "2025-12",
                "value": 4
              },
              {
                "period": "2026-01",
                "value": 2
              },
              {
                "period": "2026-02",
                "value": 1
              },
              {
                "period": "2026-03",
                "value": 1
              },
              {
                "period": "2026-04",
                "value": 0
              },
              {
                "period": "2026-05",
                "value": 0
              },
              {
                "period": "2026-06",
                "value": 1
              },
              {
                "period": "2026-07",
                "value": 1
              },
              {
                "period": "2026-08",
                "value": 0
              },
              {
                "period": "2026-09",
                "value": 0
              },
              {
                "period": "2026-10",
                "value": 1
              },
              {
                "period": "2026-11",
                "value": 1
              }
            ],
            "label": "Atlantico",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (83.8%)",
            "hotspot": "Municipio: Barranquilla (49.7%)",
            "recommendations": [
              "Priorizar seguimiento sobre Barranquilla en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 1 casos en Atlantico. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "La presion reciente se mantiene estable frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Atlantico sigue siendo Articulo 239. Hurto Motocicletas, mientras Municipio: Barranquilla (49.7%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Barranquilla y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "narino",
            "forecastPeriod": "2027-01",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 50.0,
            "direction": "up",
            "accuracyScore": 36.5,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 195,
            "series": [
              {
                "period": "2026-01",
                "value": 0
              },
              {
                "period": "2026-02",
                "value": 1
              },
              {
                "period": "2026-03",
                "value": 0
              },
              {
                "period": "2026-04",
                "value": 0
              },
              {
                "period": "2026-05",
                "value": 0
              },
              {
                "period": "2026-06",
                "value": 1
              },
              {
                "period": "2026-07",
                "value": 0
              },
              {
                "period": "2026-08",
                "value": 2
              },
              {
                "period": "2026-09",
                "value": 0
              },
              {
                "period": "2026-10",
                "value": 1
              },
              {
                "period": "2026-11",
                "value": 1
              },
              {
                "period": "2026-12",
                "value": 1
              }
            ],
            "label": "Narino",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (85.0%)",
            "hotspot": "Municipio: Pasto (43.9%)",
            "recommendations": [
              "Priorizar seguimiento sobre Pasto en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 1 casos en Narino. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 50.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Narino sigue siendo Articulo 239. Hurto Motocicletas, mientras Municipio: Pasto (43.9%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Pasto y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "meta",
            "forecastPeriod": "2027-01",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 66.7,
            "direction": "up",
            "accuracyScore": 42.2,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 196,
            "series": [
              {
                "period": "2026-01",
                "value": 0
              },
              {
                "period": "2026-02",
                "value": 0
              },
              {
                "period": "2026-03",
                "value": 0
              },
              {
                "period": "2026-04",
                "value": 0
              },
              {
                "period": "2026-05",
                "value": 1
              },
              {
                "period": "2026-06",
                "value": 1
              },
              {
                "period": "2026-07",
                "value": 0
              },
              {
                "period": "2026-08",
                "value": 2
              },
              {
                "period": "2026-09",
                "value": 1
              },
              {
                "period": "2026-10",
                "value": 2
              },
              {
                "period": "2026-11",
                "value": 2
              },
              {
                "period": "2026-12",
                "value": 1
              }
            ],
            "label": "Meta",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (94.9%)",
            "hotspot": "Municipio: Villavicencio (77.5%)",
            "recommendations": [
              "Priorizar seguimiento sobre Villavicencio en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 1 casos en Meta. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 66.7% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Meta sigue siendo Articulo 239. Hurto Motocicletas, mientras Municipio: Villavicencio (77.5%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Villavicencio y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "cesar",
            "forecastPeriod": "2026-08",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 0.0,
            "direction": "stable",
            "accuracyScore": 44.1,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 191,
            "series": [
              {
                "period": "2025-08",
                "value": 2
              },
              {
                "period": "2025-09",
                "value": 2
              },
              {
                "period": "2025-10",
                "value": 2
              },
              {
                "period": "2025-11",
                "value": 2
              },
              {
                "period": "2025-12",
                "value": 1
              },
              {
                "period": "2026-01",
                "value": 0
              },
              {
                "period": "2026-02",
                "value": 0
              },
              {
                "period": "2026-03",
                "value": 0
              },
              {
                "period": "2026-04",
                "value": 1
              },
              {
                "period": "2026-05",
                "value": 0
              },
              {
                "period": "2026-06",
                "value": 0
              },
              {
                "period": "2026-07",
                "value": 1
              }
            ],
            "label": "Cesar",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (97.1%)",
            "hotspot": "Municipio: Valledupar (52.5%)",
            "recommendations": [
              "Priorizar seguimiento sobre Valledupar en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Cesar. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "La presion reciente se mantiene estable frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Cesar sigue siendo Articulo 239. Hurto Motocicletas, mientras Municipio: Valledupar (52.5%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Valledupar y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "bolivar",
            "forecastPeriod": "2027-01",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 41.7,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Tendencia ponderada reciente",
            "modelLabelEn": "Weighted recent trend",
            "historyMonths": 199,
            "series": [
              {
                "period": "2026-01",
                "value": 0
              },
              {
                "period": "2026-02",
                "value": 0
              },
              {
                "period": "2026-03",
                "value": 1
              },
              {
                "period": "2026-04",
                "value": 0
              },
              {
                "period": "2026-05",
                "value": 0
              },
              {
                "period": "2026-06",
                "value": 0
              },
              {
                "period": "2026-07",
                "value": 0
              },
              {
                "period": "2026-08",
                "value": 0
              },
              {
                "period": "2026-09",
                "value": 0
              },
              {
                "period": "2026-10",
                "value": 1
              },
              {
                "period": "2026-11",
                "value": 1
              },
              {
                "period": "2026-12",
                "value": 1
              }
            ],
            "label": "Bolivar",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (96.3%)",
            "hotspot": "Municipio: Cartagena (56.7%)",
            "recommendations": [
              "Priorizar seguimiento sobre Cartagena en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 1 casos en Bolivar. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Bolivar sigue siendo Articulo 239. Hurto Motocicletas, mientras Municipio: Cartagena (56.7%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Cartagena y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "santander",
            "forecastPeriod": "2027-01",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 44.9,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 179,
            "series": [
              {
                "period": "2026-01",
                "value": 0
              },
              {
                "period": "2026-02",
                "value": 0
              },
              {
                "period": "2026-03",
                "value": 1
              },
              {
                "period": "2026-04",
                "value": 0
              },
              {
                "period": "2026-05",
                "value": 0
              },
              {
                "period": "2026-06",
                "value": 0
              },
              {
                "period": "2026-07",
                "value": 0
              },
              {
                "period": "2026-08",
                "value": 0
              },
              {
                "period": "2026-09",
                "value": 0
              },
              {
                "period": "2026-10",
                "value": 0
              },
              {
                "period": "2026-11",
                "value": 1
              },
              {
                "period": "2026-12",
                "value": 1
              }
            ],
            "label": "Santander",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (100.0%)",
            "hotspot": "Municipio: Bucaramanga (41.0%)",
            "recommendations": [
              "Priorizar seguimiento sobre Bucaramanga en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Santander. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Santander sigue siendo Articulo 239. Hurto Motocicletas, mientras Municipio: Bucaramanga (41.0%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Bucaramanga y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "norte-de-santander",
            "forecastPeriod": "2027-01",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 33.5,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 167,
            "series": [
              {
                "period": "2026-01",
                "value": 0
              },
              {
                "period": "2026-02",
                "value": 1
              },
              {
                "period": "2026-03",
                "value": 0
              },
              {
                "period": "2026-04",
                "value": 0
              },
              {
                "period": "2026-05",
                "value": 0
              },
              {
                "period": "2026-06",
                "value": 0
              },
              {
                "period": "2026-07",
                "value": 0
              },
              {
                "period": "2026-08",
                "value": 0
              },
              {
                "period": "2026-09",
                "value": 0
              },
              {
                "period": "2026-10",
                "value": 1
              },
              {
                "period": "2026-11",
                "value": 0
              },
              {
                "period": "2026-12",
                "value": 1
              }
            ],
            "label": "Norte de Santander",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (89.0%)",
            "hotspot": "Municipio: Cucuta (61.4%)",
            "recommendations": [
              "Priorizar seguimiento sobre Cucuta en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 1 casos en Norte de Santander. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Norte de Santander sigue siendo Articulo 239. Hurto Motocicletas, mientras Municipio: Cucuta (61.4%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Cucuta y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "guajira",
            "forecastPeriod": "2026-03",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": -33.3,
            "direction": "down",
            "accuracyScore": 31.7,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 155,
            "series": [
              {
                "period": "2025-03",
                "value": 1
              },
              {
                "period": "2025-04",
                "value": 0
              },
              {
                "period": "2025-05",
                "value": 0
              },
              {
                "period": "2025-06",
                "value": 0
              },
              {
                "period": "2025-07",
                "value": 0
              },
              {
                "period": "2025-08",
                "value": 2
              },
              {
                "period": "2025-09",
                "value": 2
              },
              {
                "period": "2025-10",
                "value": 1
              },
              {
                "period": "2025-11",
                "value": 0
              },
              {
                "period": "2025-12",
                "value": 0
              },
              {
                "period": "2026-01",
                "value": 1
              },
              {
                "period": "2026-02",
                "value": 1
              }
            ],
            "label": "Guajira",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (94.5%)",
            "hotspot": "Municipio: Riohacha (58.2%)",
            "recommendations": [
              "Priorizar seguimiento sobre Riohacha en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 1 casos en Guajira. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente baja 33.3% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Guajira sigue siendo Articulo 239. Hurto Motocicletas, mientras Municipio: Riohacha (58.2%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Riohacha y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "cundinamarca",
            "forecastPeriod": "2026-12",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 37.5,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 192,
            "series": [
              {
                "period": "2025-12",
                "value": 0
              },
              {
                "period": "2026-01",
                "value": 0
              },
              {
                "period": "2026-02",
                "value": 0
              },
              {
                "period": "2026-03",
                "value": 0
              },
              {
                "period": "2026-04",
                "value": 0
              },
              {
                "period": "2026-05",
                "value": 1
              },
              {
                "period": "2026-06",
                "value": 0
              },
              {
                "period": "2026-07",
                "value": 0
              },
              {
                "period": "2026-08",
                "value": 0
              },
              {
                "period": "2026-09",
                "value": 0
              },
              {
                "period": "2026-10",
                "value": 1
              },
              {
                "period": "2026-11",
                "value": 1
              }
            ],
            "label": "Cundinamarca",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (57.6%)",
            "hotspot": "Municipio: Soacha (30.6%)",
            "recommendations": [
              "Priorizar seguimiento sobre Soacha en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Cundinamarca. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Cundinamarca sigue siendo Articulo 239. Hurto Motocicletas, mientras Municipio: Soacha (30.6%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Soacha y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "magdalena",
            "forecastPeriod": "2025-09",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 38.3,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 184,
            "series": [
              {
                "period": "2024-09",
                "value": 1
              },
              {
                "period": "2024-10",
                "value": 0
              },
              {
                "period": "2024-11",
                "value": 0
              },
              {
                "period": "2024-12",
                "value": 0
              },
              {
                "period": "2025-01",
                "value": 0
              },
              {
                "period": "2025-02",
                "value": 0
              },
              {
                "period": "2025-03",
                "value": 0
              },
              {
                "period": "2025-04",
                "value": 1
              },
              {
                "period": "2025-05",
                "value": 0
              },
              {
                "period": "2025-06",
                "value": 1
              },
              {
                "period": "2025-07",
                "value": 0
              },
              {
                "period": "2025-08",
                "value": 1
              }
            ],
            "label": "Magdalena",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (98.6%)",
            "hotspot": "Municipio: Santa Marta (35.2%)",
            "recommendations": [
              "Priorizar seguimiento sobre Santa Marta en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Magdalena. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Magdalena sigue siendo Articulo 239. Hurto Motocicletas, mientras Municipio: Santa Marta (35.2%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Santa Marta y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "tolima",
            "forecastPeriod": "2026-07",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 0.0,
            "direction": "stable",
            "accuracyScore": 56.1,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 195,
            "series": [
              {
                "period": "2025-07",
                "value": 0
              },
              {
                "period": "2025-08",
                "value": 1
              },
              {
                "period": "2025-09",
                "value": 2
              },
              {
                "period": "2025-10",
                "value": 1
              },
              {
                "period": "2025-11",
                "value": 0
              },
              {
                "period": "2025-12",
                "value": 1
              },
              {
                "period": "2026-01",
                "value": 0
              },
              {
                "period": "2026-02",
                "value": 1
              },
              {
                "period": "2026-03",
                "value": 0
              },
              {
                "period": "2026-04",
                "value": 0
              },
              {
                "period": "2026-05",
                "value": 0
              },
              {
                "period": "2026-06",
                "value": 1
              }
            ],
            "label": "Tolima",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (92.3%)",
            "hotspot": "Municipio: Ibague (38.5%)",
            "recommendations": [
              "Priorizar seguimiento sobre Ibague en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Tolima. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "La presion reciente se mantiene estable frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Tolima sigue siendo Articulo 239. Hurto Motocicletas, mientras Municipio: Ibague (38.5%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Ibague y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "choco",
            "forecastPeriod": "2026-01",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 0.0,
            "direction": "stable",
            "accuracyScore": 29.5,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 151,
            "series": [
              {
                "period": "2025-01",
                "value": 2
              },
              {
                "period": "2025-02",
                "value": 0
              },
              {
                "period": "2025-03",
                "value": 0
              },
              {
                "period": "2025-04",
                "value": 1
              },
              {
                "period": "2025-05",
                "value": 0
              },
              {
                "period": "2025-06",
                "value": 0
              },
              {
                "period": "2025-07",
                "value": 1
              },
              {
                "period": "2025-08",
                "value": 1
              },
              {
                "period": "2025-09",
                "value": 0
              },
              {
                "period": "2025-10",
                "value": 0
              },
              {
                "period": "2025-11",
                "value": 1
              },
              {
                "period": "2025-12",
                "value": 1
              }
            ],
            "label": "Choco",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (100.0%)",
            "hotspot": "Municipio: Quibdo (98.5%)",
            "recommendations": [
              "Priorizar seguimiento sobre Quibdo en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 1 casos en Choco. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "La presion reciente se mantiene estable frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Choco sigue siendo Articulo 239. Hurto Motocicletas, mientras Municipio: Quibdo (98.5%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Quibdo y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "sucre",
            "forecastPeriod": "2025-04",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 45.4,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 169,
            "series": [
              {
                "period": "2024-04",
                "value": 1
              },
              {
                "period": "2024-05",
                "value": 1
              },
              {
                "period": "2024-06",
                "value": 1
              },
              {
                "period": "2024-07",
                "value": 0
              },
              {
                "period": "2024-08",
                "value": 0
              },
              {
                "period": "2024-09",
                "value": 0
              },
              {
                "period": "2024-10",
                "value": 0
              },
              {
                "period": "2024-11",
                "value": 0
              },
              {
                "period": "2024-12",
                "value": 1
              },
              {
                "period": "2025-01",
                "value": 0
              },
              {
                "period": "2025-02",
                "value": 1
              },
              {
                "period": "2025-03",
                "value": 1
              }
            ],
            "label": "Sucre",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (98.4%)",
            "hotspot": "Municipio: Sincelejo (62.3%)",
            "recommendations": [
              "Priorizar seguimiento sobre Sincelejo en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Sucre. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Sucre sigue siendo Articulo 239. Hurto Motocicletas, mientras Municipio: Sincelejo (62.3%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Sincelejo y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "casanare",
            "forecastPeriod": "2026-07",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 39.9,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 155,
            "series": [
              {
                "period": "2025-07",
                "value": 0
              },
              {
                "period": "2025-08",
                "value": 0
              },
              {
                "period": "2025-09",
                "value": 0
              },
              {
                "period": "2025-10",
                "value": 0
              },
              {
                "period": "2025-11",
                "value": 1
              },
              {
                "period": "2025-12",
                "value": 1
              },
              {
                "period": "2026-01",
                "value": 0
              },
              {
                "period": "2026-02",
                "value": 0
              },
              {
                "period": "2026-03",
                "value": 0
              },
              {
                "period": "2026-04",
                "value": 0
              },
              {
                "period": "2026-05",
                "value": 0
              },
              {
                "period": "2026-06",
                "value": 1
              }
            ],
            "label": "Casanare",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (97.8%)",
            "hotspot": "Municipio: Yopal (75.6%)",
            "recommendations": [
              "Priorizar seguimiento sobre Yopal en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Casanare. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Casanare sigue siendo Articulo 239. Hurto Motocicletas, mientras Municipio: Yopal (75.6%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Yopal y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "cordoba",
            "forecastPeriod": "2026-01",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 0.0,
            "direction": "stable",
            "accuracyScore": 44.3,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 155,
            "series": [
              {
                "period": "2025-01",
                "value": 0
              },
              {
                "period": "2025-02",
                "value": 0
              },
              {
                "period": "2025-03",
                "value": 0
              },
              {
                "period": "2025-04",
                "value": 0
              },
              {
                "period": "2025-05",
                "value": 0
              },
              {
                "period": "2025-06",
                "value": 2
              },
              {
                "period": "2025-07",
                "value": 1
              },
              {
                "period": "2025-08",
                "value": 0
              },
              {
                "period": "2025-09",
                "value": 0
              },
              {
                "period": "2025-10",
                "value": 0
              },
              {
                "period": "2025-11",
                "value": 0
              },
              {
                "period": "2025-12",
                "value": 1
              }
            ],
            "label": "Cordoba",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (93.2%)",
            "hotspot": "Municipio: Monteria (34.1%)",
            "recommendations": [
              "Priorizar seguimiento sobre Monteria en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Cordoba. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "La presion reciente se mantiene estable frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Cordoba sigue siendo Articulo 239. Hurto Motocicletas, mientras Municipio: Monteria (34.1%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Monteria y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "caqueta",
            "forecastPeriod": "2026-01",
            "forecastValue": 1,
            "lastObservedValue": 2,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 61.4,
            "confidence": "medium",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 186,
            "series": [
              {
                "period": "2025-01",
                "value": 0
              },
              {
                "period": "2025-02",
                "value": 0
              },
              {
                "period": "2025-03",
                "value": 0
              },
              {
                "period": "2025-04",
                "value": 0
              },
              {
                "period": "2025-05",
                "value": 0
              },
              {
                "period": "2025-06",
                "value": 0
              },
              {
                "period": "2025-07",
                "value": 0
              },
              {
                "period": "2025-08",
                "value": 0
              },
              {
                "period": "2025-09",
                "value": 0
              },
              {
                "period": "2025-10",
                "value": 0
              },
              {
                "period": "2025-11",
                "value": 0
              },
              {
                "period": "2025-12",
                "value": 2
              }
            ],
            "label": "Caqueta",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (97.5%)",
            "hotspot": "Municipio: Florencia (72.5%)",
            "recommendations": [
              "Priorizar seguimiento sobre Florencia en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 1 casos en Caqueta. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es media.",
              "focus": "El foco principal en Caqueta sigue siendo Articulo 239. Hurto Motocicletas, mientras Municipio: Florencia (72.5%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Florencia y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "quindio",
            "forecastPeriod": "2026-09",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 73.9,
            "confidence": "medium",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 156,
            "series": [
              {
                "period": "2025-09",
                "value": 0
              },
              {
                "period": "2025-10",
                "value": 0
              },
              {
                "period": "2025-11",
                "value": 0
              },
              {
                "period": "2025-12",
                "value": 0
              },
              {
                "period": "2026-01",
                "value": 0
              },
              {
                "period": "2026-02",
                "value": 0
              },
              {
                "period": "2026-03",
                "value": 0
              },
              {
                "period": "2026-04",
                "value": 0
              },
              {
                "period": "2026-05",
                "value": 0
              },
              {
                "period": "2026-06",
                "value": 0
              },
              {
                "period": "2026-07",
                "value": 0
              },
              {
                "period": "2026-08",
                "value": 1
              }
            ],
            "label": "Quindio",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (51.9%)",
            "hotspot": "Municipio: Armenia (70.4%)",
            "recommendations": [
              "Priorizar seguimiento sobre Armenia en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Quindio. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es media.",
              "focus": "El foco principal en Quindio sigue siendo Articulo 239. Hurto Motocicletas, mientras Municipio: Armenia (70.4%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Armenia y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "risaralda",
            "forecastPeriod": "2025-09",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 70.3,
            "confidence": "medium",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 151,
            "series": [
              {
                "period": "2024-09",
                "value": 0
              },
              {
                "period": "2024-10",
                "value": 0
              },
              {
                "period": "2024-11",
                "value": 0
              },
              {
                "period": "2024-12",
                "value": 1
              },
              {
                "period": "2025-01",
                "value": 0
              },
              {
                "period": "2025-02",
                "value": 0
              },
              {
                "period": "2025-03",
                "value": 0
              },
              {
                "period": "2025-04",
                "value": 0
              },
              {
                "period": "2025-05",
                "value": 0
              },
              {
                "period": "2025-06",
                "value": 0
              },
              {
                "period": "2025-07",
                "value": 0
              },
              {
                "period": "2025-08",
                "value": 1
              }
            ],
            "label": "Risaralda",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (83.3%)",
            "hotspot": "Municipio: Pereira (37.5%)",
            "recommendations": [
              "Priorizar seguimiento sobre Pereira en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Risaralda. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es media.",
              "focus": "El foco principal en Risaralda sigue siendo Articulo 239. Hurto Motocicletas, mientras Municipio: Pereira (37.5%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Pereira y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "putumayo",
            "forecastPeriod": "2026-11",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 82.4,
            "confidence": "high",
            "risk": "high",
            "modelLabelEs": "Tendencia reciente + estacionalidad",
            "modelLabelEn": "Recent trend + seasonality",
            "historyMonths": 160,
            "series": [
              {
                "period": "2025-11",
                "value": 0
              },
              {
                "period": "2025-12",
                "value": 0
              },
              {
                "period": "2026-01",
                "value": 0
              },
              {
                "period": "2026-02",
                "value": 1
              },
              {
                "period": "2026-03",
                "value": 0
              },
              {
                "period": "2026-04",
                "value": 0
              },
              {
                "period": "2026-05",
                "value": 0
              },
              {
                "period": "2026-06",
                "value": 0
              },
              {
                "period": "2026-07",
                "value": 0
              },
              {
                "period": "2026-08",
                "value": 0
              },
              {
                "period": "2026-09",
                "value": 0
              },
              {
                "period": "2026-10",
                "value": 1
              }
            ],
            "label": "Putumayo",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (100.0%)",
            "hotspot": "Municipio: Valle del Guamuez (40.0%)",
            "recommendations": [
              "Priorizar seguimiento sobre Valle del Guamuez en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Putumayo. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es alta.",
              "focus": "El foco principal en Putumayo sigue siendo Articulo 239. Hurto Motocicletas, mientras Municipio: Valle del Guamuez (40.0%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Valle del Guamuez y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "caldas",
            "forecastPeriod": "2025-08",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 0.0,
            "direction": "stable",
            "accuracyScore": 87.4,
            "confidence": "high",
            "risk": "high",
            "modelLabelEs": "Tendencia reciente + estacionalidad",
            "modelLabelEn": "Recent trend + seasonality",
            "historyMonths": 139,
            "series": [
              {
                "period": "2024-08",
                "value": 0
              },
              {
                "period": "2024-09",
                "value": 0
              },
              {
                "period": "2024-10",
                "value": 0
              },
              {
                "period": "2024-11",
                "value": 0
              },
              {
                "period": "2024-12",
                "value": 0
              },
              {
                "period": "2025-01",
                "value": 0
              },
              {
                "period": "2025-02",
                "value": 0
              },
              {
                "period": "2025-03",
                "value": 0
              },
              {
                "period": "2025-04",
                "value": 1
              },
              {
                "period": "2025-05",
                "value": 0
              },
              {
                "period": "2025-06",
                "value": 0
              },
              {
                "period": "2025-07",
                "value": 1
              }
            ],
            "label": "Caldas",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (85.7%)",
            "hotspot": "Municipio: Manizales (21.4%)",
            "recommendations": [
              "Priorizar seguimiento sobre Manizales en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Caldas. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "La presion reciente se mantiene estable frente a la ventana previa. La confiabilidad operativa del escenario actual es alta.",
              "focus": "El foco principal en Caldas sigue siendo Articulo 239. Hurto Motocicletas, mientras Municipio: Manizales (21.4%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Manizales y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "boyaca",
            "forecastPeriod": "2026-01",
            "forecastValue": 0,
            "lastObservedValue": 2,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 87.9,
            "confidence": "high",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 152,
            "series": [
              {
                "period": "2025-01",
                "value": 0
              },
              {
                "period": "2025-02",
                "value": 0
              },
              {
                "period": "2025-03",
                "value": 0
              },
              {
                "period": "2025-04",
                "value": 0
              },
              {
                "period": "2025-05",
                "value": 0
              },
              {
                "period": "2025-06",
                "value": 0
              },
              {
                "period": "2025-07",
                "value": 0
              },
              {
                "period": "2025-08",
                "value": 1
              },
              {
                "period": "2025-09",
                "value": 0
              },
              {
                "period": "2025-10",
                "value": 0
              },
              {
                "period": "2025-11",
                "value": 0
              },
              {
                "period": "2025-12",
                "value": 2
              }
            ],
            "label": "Boyaca",
            "dominantFactor": "Articulo 239. Hurto Automotores (58.3%)",
            "hotspot": "Municipio: Sogamoso (33.3%)",
            "recommendations": [
              "Priorizar seguimiento sobre Sogamoso en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Automotores sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Boyaca. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es alta.",
              "focus": "El foco principal en Boyaca sigue siendo Articulo 239. Hurto Automotores, mientras Municipio: Sogamoso (33.3%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Sogamoso y monitorear si Articulo 239. Hurto Automotores conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "arauca",
            "forecastPeriod": "2025-10",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 90.6,
            "confidence": "high",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 152,
            "series": [
              {
                "period": "2024-10",
                "value": 0
              },
              {
                "period": "2024-11",
                "value": 0
              },
              {
                "period": "2024-12",
                "value": 0
              },
              {
                "period": "2025-01",
                "value": 1
              },
              {
                "period": "2025-02",
                "value": 0
              },
              {
                "period": "2025-03",
                "value": 0
              },
              {
                "period": "2025-04",
                "value": 0
              },
              {
                "period": "2025-05",
                "value": 0
              },
              {
                "period": "2025-06",
                "value": 0
              },
              {
                "period": "2025-07",
                "value": 0
              },
              {
                "period": "2025-08",
                "value": 0
              },
              {
                "period": "2025-09",
                "value": 1
              }
            ],
            "label": "Arauca",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (77.8%)",
            "hotspot": "Municipio: Tame (33.3%)",
            "recommendations": [
              "Priorizar seguimiento sobre Tame en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Arauca. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es alta.",
              "focus": "El foco principal en Arauca sigue siendo Articulo 239. Hurto Motocicletas, mientras Municipio: Tame (33.3%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Tame y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "san-andres",
            "forecastPeriod": "2024-12",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 93.5,
            "confidence": "high",
            "risk": "high",
            "modelLabelEs": "Ultimo valor",
            "modelLabelEn": "Last value",
            "historyMonths": 156,
            "series": [
              {
                "period": "2023-12",
                "value": 0
              },
              {
                "period": "2024-01",
                "value": 0
              },
              {
                "period": "2024-02",
                "value": 0
              },
              {
                "period": "2024-03",
                "value": 0
              },
              {
                "period": "2024-04",
                "value": 0
              },
              {
                "period": "2024-05",
                "value": 0
              },
              {
                "period": "2024-06",
                "value": 0
              },
              {
                "period": "2024-07",
                "value": 0
              },
              {
                "period": "2024-08",
                "value": 0
              },
              {
                "period": "2024-09",
                "value": 0
              },
              {
                "period": "2024-10",
                "value": 0
              },
              {
                "period": "2024-11",
                "value": 1
              }
            ],
            "label": "San Andres",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (100.0%)",
            "hotspot": "Municipio: San Andres (100.0%)",
            "recommendations": [
              "Priorizar seguimiento sobre San Andres en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 1 casos en San Andres. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es alta.",
              "focus": "El foco principal en San Andres sigue siendo Articulo 239. Hurto Motocicletas, mientras Municipio: San Andres (100.0%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre San Andres y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "amazonas",
            "forecastPeriod": "2026-10",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 95.7,
            "confidence": "high",
            "risk": "high",
            "modelLabelEs": "Tendencia reciente + estacionalidad",
            "modelLabelEn": "Recent trend + seasonality",
            "historyMonths": 150,
            "series": [
              {
                "period": "2025-10",
                "value": 0
              },
              {
                "period": "2025-11",
                "value": 0
              },
              {
                "period": "2025-12",
                "value": 0
              },
              {
                "period": "2026-01",
                "value": 0
              },
              {
                "period": "2026-02",
                "value": 0
              },
              {
                "period": "2026-03",
                "value": 0
              },
              {
                "period": "2026-04",
                "value": 0
              },
              {
                "period": "2026-05",
                "value": 0
              },
              {
                "period": "2026-06",
                "value": 0
              },
              {
                "period": "2026-07",
                "value": 0
              },
              {
                "period": "2026-08",
                "value": 0
              },
              {
                "period": "2026-09",
                "value": 1
              }
            ],
            "label": "Amazonas",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (100.0%)",
            "hotspot": "Municipio: Leticia (100.0%)",
            "recommendations": [
              "Priorizar seguimiento sobre Leticia en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 0 casos en Amazonas. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "El promedio reciente sube 100.0% frente a la ventana previa. La confiabilidad operativa del escenario actual es alta.",
              "focus": "El foco principal en Amazonas sigue siendo Articulo 239. Hurto Motocicletas, mientras Municipio: Leticia (100.0%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Leticia y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "vaupes",
            "forecastPeriod": "2015-11",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 0.0,
            "direction": "stable",
            "accuracyScore": 0.0,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 1,
            "series": [
              {
                "period": "2015-10",
                "value": 1
              }
            ],
            "label": "Vaupes",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (100.0%)",
            "hotspot": "Municipio: Mitu (100.0%)",
            "recommendations": [
              "Priorizar seguimiento sobre Mitu en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 1 casos en Vaupes. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "La presion reciente se mantiene estable frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Vaupes sigue siendo Articulo 239. Hurto Motocicletas, mientras Municipio: Mitu (100.0%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre Mitu y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          },
          {
            "id": "guaviare",
            "forecastPeriod": "2022-08",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 0.0,
            "direction": "stable",
            "accuracyScore": 0.0,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 1,
            "series": [
              {
                "period": "2022-07",
                "value": 1
              }
            ],
            "label": "Guaviare",
            "dominantFactor": "Articulo 239. Hurto Motocicletas (100.0%)",
            "hotspot": "Municipio: San Jose del Guaviare (100.0%)",
            "recommendations": [
              "Priorizar seguimiento sobre San Jose del Guaviare en la siguiente ventana operativa, porque concentra la mayor carga del territorio seleccionado.",
              "Cruzar el pronostico con modalidad dominante para validar si Articulo 239. Hurto Motocicletas sigue empujando el comportamiento esperado.",
              "Leer esta salida como orientacion operativa basada en comportamiento previo y no como calendario actual."
            ],
            "answers": {
              "forecast": "En la siguiente ventana operativa, el escenario base estima 1 casos en Guaviare. La lectura se apoya en el comportamiento reciente del territorio y se interpreta como siguiente corte esperado, no como fecha actual del calendario.",
              "pressure": "La presion reciente se mantiene estable frente a la ventana previa. La confiabilidad operativa del escenario actual es baja.",
              "focus": "El foco principal en Guaviare sigue siendo Articulo 239. Hurto Motocicletas, mientras Municipio: San Jose del Guaviare (100.0%) mantiene la mayor presion territorial.",
              "action": "La accion mas util es reforzar seguimiento sobre San Jose del Guaviare y monitorear si Articulo 239. Hurto Motocicletas conserva su peso en la siguiente ventana operativa."
            }
          }
        ]
      }
    }
  },
  "en": {
    "homicidios": {
      "summary": "The homicide base consolidates 7,512 cases across 7,404 records. Firearm leads with 82.1%, and the strongest territorial concentration appears in Antioquia (16.6%).",
      "metrics": [
        {
          "label": "Consolidated cases",
          "value": "7,512"
        },
        {
          "label": "Main hotspot",
          "value": "Antioquia 16.6%"
        },
        {
          "label": "Dominant pattern",
          "value": "Firearm 82.1%"
        }
      ],
      "findings": [
        {
          "title": "Territorial concentration",
          "description": "Antioquia leads with 1,246 cases (16.6%), while Cali is the main municipality with 393 records."
        },
        {
          "title": "Operational pattern",
          "description": "Firearm explains 82.1% of the total. The behavior also leans toward urban areas (61.5%)."
        },
        {
          "title": "Reported detail",
          "description": "Not Reported concentrates 67.3%, and victimization remains mainly male (90.0%)."
        }
      ],
      "actions": [
        {
          "title": "Focused deployment",
          "description": "Institutional monitoring should concentrate on Antioquia and Cali, because that is where the strongest observed weight remains."
        },
        {
          "title": "Response by dominant pattern",
          "description": "Operational planning becomes more precise when it starts from Firearm and from the available characterization in not reported."
        }
      ],
      "coverageNote": "AI base: 7,404 records and 7,512 cases. The reading combines territory, operational pattern and reported profile to support monitoring.",
      "predictive": {
        "nextPeriod": "2003-06",
        "territories": [
          {
            "id": "national",
            "forecastPeriod": "2003-06",
            "forecastValue": 1490,
            "lastObservedValue": 1490,
            "changePct": -3.2,
            "direction": "stable",
            "accuracyScore": 97.3,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 1509
              },
              {
                "period": "2003-02",
                "value": 1442
              },
              {
                "period": "2003-03",
                "value": 1576
              },
              {
                "period": "2003-04",
                "value": 1431
              },
              {
                "period": "2003-05",
                "value": 1490
              }
            ],
            "label": "National",
            "dominantFactor": "Firearm (82.1%)",
            "hotspot": "Department: Antioquia (16.6%)",
            "recommendations": [
              "Prioritize monitoring on Antioquia during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 1,490 cases in National. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window.",
              "pressure": "Recent pressure remains stable versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in National remains Firearm, while Department: Antioquia (16.6%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Antioquia and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "antioquia",
            "forecastPeriod": "2003-06",
            "forecastValue": 249,
            "lastObservedValue": 237,
            "changePct": -8.4,
            "direction": "down",
            "accuracyScore": 94.6,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 278
              },
              {
                "period": "2003-02",
                "value": 205
              },
              {
                "period": "2003-03",
                "value": 280
              },
              {
                "period": "2003-04",
                "value": 229
              },
              {
                "period": "2003-05",
                "value": 237
              }
            ],
            "label": "Antioquia",
            "dominantFactor": "Firearm (84.8%)",
            "hotspot": "Municipality: Medellin (30.8%)",
            "recommendations": [
              "Prioritize monitoring on Medellin during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 249 cases in Antioquia. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window.",
              "pressure": "The recent average falls 8.4% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Antioquia remains Firearm, while Municipality: Medellin (30.8%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Medellin and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "valle-del-cauca",
            "forecastPeriod": "2003-06",
            "forecastValue": 211,
            "lastObservedValue": 210,
            "changePct": 0.5,
            "direction": "stable",
            "accuracyScore": 98.8,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 202
              },
              {
                "period": "2003-02",
                "value": 196
              },
              {
                "period": "2003-03",
                "value": 235
              },
              {
                "period": "2003-04",
                "value": 214
              },
              {
                "period": "2003-05",
                "value": 210
              }
            ],
            "label": "Valle del Cauca",
            "dominantFactor": "Firearm (83.6%)",
            "hotspot": "Municipality: Cali (37.0%)",
            "recommendations": [
              "Prioritize monitoring on Cali during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 211 cases in Valle del Cauca. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window.",
              "pressure": "Recent pressure remains stable versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Valle del Cauca remains Firearm, while Municipality: Cali (37.0%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Cali and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "norte-de-santander",
            "forecastPeriod": "2003-06",
            "forecastValue": 82,
            "lastObservedValue": 68,
            "changePct": -12.8,
            "direction": "down",
            "accuracyScore": 87.8,
            "confidence": "low",
            "risk": "low",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 101
              },
              {
                "period": "2003-02",
                "value": 80
              },
              {
                "period": "2003-03",
                "value": 89
              },
              {
                "period": "2003-04",
                "value": 89
              },
              {
                "period": "2003-05",
                "value": 68
              }
            ],
            "label": "Norte de Santander",
            "dominantFactor": "Firearm (84.7%)",
            "hotspot": "Municipality: Cucuta (40.7%)",
            "recommendations": [
              "Prioritize monitoring on Cucuta during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 82 cases in Norte de Santander. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window.",
              "pressure": "The recent average falls 12.8% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Norte de Santander remains Firearm, while Municipality: Cucuta (40.7%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Cucuta and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "bogota-dc",
            "forecastPeriod": "2003-06",
            "forecastValue": 80,
            "lastObservedValue": 84,
            "changePct": 10.2,
            "direction": "up",
            "accuracyScore": 94.3,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Tendencia ponderada reciente",
            "modelLabelEn": "Weighted recent trend",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 60
              },
              {
                "period": "2003-02",
                "value": 74
              },
              {
                "period": "2003-03",
                "value": 81
              },
              {
                "period": "2003-04",
                "value": 74
              },
              {
                "period": "2003-05",
                "value": 84
              }
            ],
            "label": "Bogota D.C.",
            "dominantFactor": "Firearm (57.3%)",
            "hotspot": "Municipality: Bogota D.C. (100.0%)",
            "recommendations": [
              "Prioritize monitoring on Bogota D.C. during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 80 cases in Bogota D.C.. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window.",
              "pressure": "The recent average rises 10.2% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Bogota D.C. remains Firearm, while Municipality: Bogota D.C. (100.0%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Bogota D.C. and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "cundinamarca",
            "forecastPeriod": "2003-06",
            "forecastValue": 68,
            "lastObservedValue": 68,
            "changePct": -7.5,
            "direction": "down",
            "accuracyScore": 97.1,
            "confidence": "low",
            "risk": "low",
            "modelLabelEs": "Ultimo valor",
            "modelLabelEn": "Last value",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 78
              },
              {
                "period": "2003-02",
                "value": 71
              },
              {
                "period": "2003-03",
                "value": 70
              },
              {
                "period": "2003-04",
                "value": 67
              },
              {
                "period": "2003-05",
                "value": 68
              }
            ],
            "label": "Cundinamarca",
            "dominantFactor": "Firearm (74.9%)",
            "hotspot": "Municipality: Soacha (11.3%)",
            "recommendations": [
              "Prioritize monitoring on Soacha during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 68 cases in Cundinamarca. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average falls 7.5% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Cundinamarca remains Firearm, while Municipality: Soacha (11.3%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Soacha and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "caldas",
            "forecastPeriod": "2003-06",
            "forecastValue": 61,
            "lastObservedValue": 59,
            "changePct": 1.6,
            "direction": "stable",
            "accuracyScore": 93.0,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 72
              },
              {
                "period": "2003-02",
                "value": 62
              },
              {
                "period": "2003-03",
                "value": 55
              },
              {
                "period": "2003-04",
                "value": 69
              },
              {
                "period": "2003-05",
                "value": 59
              }
            ],
            "label": "Caldas",
            "dominantFactor": "Firearm (82.1%)",
            "hotspot": "Municipality: Manizales (23.5%)",
            "recommendations": [
              "Prioritize monitoring on Manizales during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 61 cases in Caldas. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window.",
              "pressure": "Recent pressure remains stable versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Caldas remains Firearm, while Municipality: Manizales (23.5%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Manizales and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "risaralda",
            "forecastPeriod": "2003-06",
            "forecastValue": 56,
            "lastObservedValue": 56,
            "changePct": -13.0,
            "direction": "down",
            "accuracyScore": 89.6,
            "confidence": "low",
            "risk": "low",
            "modelLabelEs": "Ultimo valor",
            "modelLabelEn": "Last value",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 65
              },
              {
                "period": "2003-02",
                "value": 66
              },
              {
                "period": "2003-03",
                "value": 69
              },
              {
                "period": "2003-04",
                "value": 60
              },
              {
                "period": "2003-05",
                "value": 56
              }
            ],
            "label": "Risaralda",
            "dominantFactor": "Firearm (83.0%)",
            "hotspot": "Municipality: Pereira (45.4%)",
            "recommendations": [
              "Prioritize monitoring on Pereira during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 56 cases in Risaralda. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window.",
              "pressure": "The recent average falls 13.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Risaralda remains Firearm, while Municipality: Pereira (45.4%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Pereira and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "bolivar",
            "forecastPeriod": "2003-06",
            "forecastValue": 50,
            "lastObservedValue": 53,
            "changePct": -3.9,
            "direction": "stable",
            "accuracyScore": 90.8,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 51
              },
              {
                "period": "2003-02",
                "value": 49
              },
              {
                "period": "2003-03",
                "value": 53
              },
              {
                "period": "2003-04",
                "value": 45
              },
              {
                "period": "2003-05",
                "value": 53
              }
            ],
            "label": "Bolivar",
            "dominantFactor": "Firearm (89.8%)",
            "hotspot": "Municipality: Cartagena de Indias (42.6%)",
            "recommendations": [
              "Prioritize monitoring on Cartagena de Indias during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 50 cases in Bolivar. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window.",
              "pressure": "Recent pressure remains stable versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Bolivar remains Firearm, while Municipality: Cartagena de Indias (42.6%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Cartagena de Indias and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "magdalena",
            "forecastPeriod": "2003-06",
            "forecastValue": 53,
            "lastObservedValue": 61,
            "changePct": 14.3,
            "direction": "up",
            "accuracyScore": 88.1,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 47
              },
              {
                "period": "2003-02",
                "value": 47
              },
              {
                "period": "2003-03",
                "value": 49
              },
              {
                "period": "2003-04",
                "value": 48
              },
              {
                "period": "2003-05",
                "value": 61
              }
            ],
            "label": "Magdalena",
            "dominantFactor": "Firearm (86.3%)",
            "hotspot": "Municipality: Santa Marta (34.5%)",
            "recommendations": [
              "Prioritize monitoring on Santa Marta during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 53 cases in Magdalena. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window.",
              "pressure": "The recent average rises 14.3% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Magdalena remains Firearm, while Municipality: Santa Marta (34.5%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Santa Marta and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "santander",
            "forecastPeriod": "2003-06",
            "forecastValue": 51,
            "lastObservedValue": 51,
            "changePct": 9.9,
            "direction": "up",
            "accuracyScore": 96.2,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Ultimo valor",
            "modelLabelEn": "Last value",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 57
              },
              {
                "period": "2003-02",
                "value": 34
              },
              {
                "period": "2003-03",
                "value": 51
              },
              {
                "period": "2003-04",
                "value": 53
              },
              {
                "period": "2003-05",
                "value": 51
              }
            ],
            "label": "Santander",
            "dominantFactor": "Firearm (77.5%)",
            "hotspot": "Municipality: Bucaramanga (25.3%)",
            "recommendations": [
              "Prioritize monitoring on Bucaramanga during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 51 cases in Santander. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window.",
              "pressure": "The recent average rises 9.9% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Santander remains Firearm, while Municipality: Bucaramanga (25.3%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Bucaramanga and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "cesar",
            "forecastPeriod": "2003-06",
            "forecastValue": 48,
            "lastObservedValue": 48,
            "changePct": -6.9,
            "direction": "down",
            "accuracyScore": 96.9,
            "confidence": "low",
            "risk": "low",
            "modelLabelEs": "Tendencia ponderada reciente",
            "modelLabelEn": "Weighted recent trend",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 53
              },
              {
                "period": "2003-02",
                "value": 51
              },
              {
                "period": "2003-03",
                "value": 49
              },
              {
                "period": "2003-04",
                "value": 47
              },
              {
                "period": "2003-05",
                "value": 48
              }
            ],
            "label": "Cesar",
            "dominantFactor": "Firearm (90.3%)",
            "hotspot": "Municipality: Valledupar (39.5%)",
            "recommendations": [
              "Prioritize monitoring on Valledupar during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 48 cases in Cesar. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average falls 6.9% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Cesar remains Firearm, while Municipality: Valledupar (39.5%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Valledupar and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "meta",
            "forecastPeriod": "2003-06",
            "forecastValue": 49,
            "lastObservedValue": 49,
            "changePct": 16.8,
            "direction": "up",
            "accuracyScore": 95.1,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Ultimo valor",
            "modelLabelEn": "Last value",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 33
              },
              {
                "period": "2003-02",
                "value": 44
              },
              {
                "period": "2003-03",
                "value": 54
              },
              {
                "period": "2003-04",
                "value": 53
              },
              {
                "period": "2003-05",
                "value": 49
              }
            ],
            "label": "Meta",
            "dominantFactor": "Firearm (86.3%)",
            "hotspot": "Municipality: Villavicencio (26.5%)",
            "recommendations": [
              "Prioritize monitoring on Villavicencio during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 49 cases in Meta. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window.",
              "pressure": "The recent average rises 16.8% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Meta remains Firearm, while Municipality: Villavicencio (26.5%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Villavicencio and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "atlantico",
            "forecastPeriod": "2003-06",
            "forecastValue": 46,
            "lastObservedValue": 43,
            "changePct": -15.3,
            "direction": "down",
            "accuracyScore": 86.5,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 49
              },
              {
                "period": "2003-02",
                "value": 43
              },
              {
                "period": "2003-03",
                "value": 55
              },
              {
                "period": "2003-04",
                "value": 40
              },
              {
                "period": "2003-05",
                "value": 43
              }
            ],
            "label": "Atlantico",
            "dominantFactor": "Firearm (86.7%)",
            "hotspot": "Municipality: Barranquilla (58.8%)",
            "recommendations": [
              "Prioritize monitoring on Barranquilla during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 46 cases in Atlantico. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window.",
              "pressure": "The recent average falls 15.3% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Atlantico remains Firearm, while Municipality: Barranquilla (58.8%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Barranquilla and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "tolima",
            "forecastPeriod": "2003-06",
            "forecastValue": 45,
            "lastObservedValue": 51,
            "changePct": -4.0,
            "direction": "stable",
            "accuracyScore": 80.4,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 48
              },
              {
                "period": "2003-02",
                "value": 47
              },
              {
                "period": "2003-03",
                "value": 41
              },
              {
                "period": "2003-04",
                "value": 36
              },
              {
                "period": "2003-05",
                "value": 51
              }
            ],
            "label": "Tolima",
            "dominantFactor": "Firearm (78.3%)",
            "hotspot": "Municipality: Ibague (23.9%)",
            "recommendations": [
              "Prioritize monitoring on Ibague during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 45 cases in Tolima. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window.",
              "pressure": "Recent pressure remains stable versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Tolima remains Firearm, while Municipality: Ibague (23.9%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Ibague and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "huila",
            "forecastPeriod": "2003-06",
            "forecastValue": 48,
            "lastObservedValue": 61,
            "changePct": 18.7,
            "direction": "up",
            "accuracyScore": 66.2,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 29
              },
              {
                "period": "2003-02",
                "value": 33
              },
              {
                "period": "2003-03",
                "value": 53
              },
              {
                "period": "2003-04",
                "value": 30
              },
              {
                "period": "2003-05",
                "value": 61
              }
            ],
            "label": "Huila",
            "dominantFactor": "Firearm (81.2%)",
            "hotspot": "Municipality: Neiva (14.4%)",
            "recommendations": [
              "Prioritize monitoring on Neiva during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 48 cases in Huila. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window.",
              "pressure": "The recent average rises 18.7% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Huila remains Firearm, while Municipality: Neiva (14.4%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Neiva and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "narino",
            "forecastPeriod": "2003-06",
            "forecastValue": 40,
            "lastObservedValue": 35,
            "changePct": 14.6,
            "direction": "up",
            "accuracyScore": 82.3,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 37
              },
              {
                "period": "2003-02",
                "value": 30
              },
              {
                "period": "2003-03",
                "value": 39
              },
              {
                "period": "2003-04",
                "value": 46
              },
              {
                "period": "2003-05",
                "value": 35
              }
            ],
            "label": "Narino",
            "dominantFactor": "Firearm (64.7%)",
            "hotspot": "Municipality: Pasto (34.7%)",
            "recommendations": [
              "Prioritize monitoring on Pasto during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 40 cases in Narino. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window.",
              "pressure": "The recent average rises 14.6% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Narino remains Firearm, while Municipality: Pasto (34.7%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Pasto and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "arauca",
            "forecastPeriod": "2003-06",
            "forecastValue": 33,
            "lastObservedValue": 34,
            "changePct": -21.1,
            "direction": "down",
            "accuracyScore": 79.8,
            "confidence": "low",
            "risk": "low",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 35
              },
              {
                "period": "2003-02",
                "value": 41
              },
              {
                "period": "2003-03",
                "value": 38
              },
              {
                "period": "2003-04",
                "value": 26
              },
              {
                "period": "2003-05",
                "value": 34
              }
            ],
            "label": "Arauca",
            "dominantFactor": "Firearm (86.9%)",
            "hotspot": "Municipality: Tame (44.6%)",
            "recommendations": [
              "Prioritize monitoring on Tame during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 33 cases in Arauca. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window.",
              "pressure": "The recent average falls 21.1% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Arauca remains Firearm, while Municipality: Tame (44.6%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Tame and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "cauca",
            "forecastPeriod": "2003-06",
            "forecastValue": 26,
            "lastObservedValue": 29,
            "changePct": -8.2,
            "direction": "down",
            "accuracyScore": 90.2,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 20
              },
              {
                "period": "2003-02",
                "value": 39
              },
              {
                "period": "2003-03",
                "value": 26
              },
              {
                "period": "2003-04",
                "value": 23
              },
              {
                "period": "2003-05",
                "value": 29
              }
            ],
            "label": "Cauca",
            "dominantFactor": "Firearm (71.9%)",
            "hotspot": "Municipality: Popayan (23.0%)",
            "recommendations": [
              "Prioritize monitoring on Popayan during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 26 cases in Cauca. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window.",
              "pressure": "The recent average falls 8.2% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Cauca remains Firearm, while Municipality: Popayan (23.0%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Popayan and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "la-guajira",
            "forecastPeriod": "2003-06",
            "forecastValue": 26,
            "lastObservedValue": 28,
            "changePct": 5.2,
            "direction": "up",
            "accuracyScore": 96.3,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 28
              },
              {
                "period": "2003-02",
                "value": 31
              },
              {
                "period": "2003-03",
                "value": 18
              },
              {
                "period": "2003-04",
                "value": 26
              },
              {
                "period": "2003-05",
                "value": 28
              }
            ],
            "label": "La Guajira",
            "dominantFactor": "Firearm (95.5%)",
            "hotspot": "Municipality: Maicao (34.6%)",
            "recommendations": [
              "Prioritize monitoring on Maicao during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 26 cases in La Guajira. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window.",
              "pressure": "The recent average rises 5.2% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in La Guajira remains Firearm, while Municipality: Maicao (34.6%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Maicao and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "caqueta",
            "forecastPeriod": "2003-06",
            "forecastValue": 28,
            "lastObservedValue": 26,
            "changePct": -1.3,
            "direction": "stable",
            "accuracyScore": 100.0,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 27
              },
              {
                "period": "2003-02",
                "value": 19
              },
              {
                "period": "2003-03",
                "value": 33
              },
              {
                "period": "2003-04",
                "value": 26
              },
              {
                "period": "2003-05",
                "value": 26
              }
            ],
            "label": "Caqueta",
            "dominantFactor": "Firearm (87.8%)",
            "hotspot": "Municipality: Florencia (26.7%)",
            "recommendations": [
              "Prioritize monitoring on Florencia during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 28 cases in Caqueta. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "Recent pressure remains stable versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Caqueta remains Firearm, while Municipality: Florencia (26.7%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Florencia and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "putumayo",
            "forecastPeriod": "2003-06",
            "forecastValue": 11,
            "lastObservedValue": 11,
            "changePct": -61.3,
            "direction": "down",
            "accuracyScore": 81.3,
            "confidence": "low",
            "risk": "low",
            "modelLabelEs": "Ultimo valor",
            "modelLabelEn": "Last value",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 29
              },
              {
                "period": "2003-02",
                "value": 52
              },
              {
                "period": "2003-03",
                "value": 16
              },
              {
                "period": "2003-04",
                "value": 14
              },
              {
                "period": "2003-05",
                "value": 11
              }
            ],
            "label": "Putumayo",
            "dominantFactor": "Firearm (90.2%)",
            "hotspot": "Municipality: Puerto Asis (20.5%)",
            "recommendations": [
              "Prioritize monitoring on Puerto Asis during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 11 cases in Putumayo. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average falls 61.3% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Putumayo remains Firearm, while Municipality: Puerto Asis (20.5%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Puerto Asis and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "quindio",
            "forecastPeriod": "2003-06",
            "forecastValue": 24,
            "lastObservedValue": 24,
            "changePct": 16.4,
            "direction": "up",
            "accuracyScore": 88.0,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 25
              },
              {
                "period": "2003-02",
                "value": 23
              },
              {
                "period": "2003-03",
                "value": 19
              },
              {
                "period": "2003-04",
                "value": 28
              },
              {
                "period": "2003-05",
                "value": 24
              }
            ],
            "label": "Quindio",
            "dominantFactor": "Firearm (84.9%)",
            "hotspot": "Municipality: Armenia (42.0%)",
            "recommendations": [
              "Prioritize monitoring on Armenia during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 24 cases in Quindio. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 16.4% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Quindio remains Firearm, while Municipality: Armenia (42.0%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Armenia and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "boyaca",
            "forecastPeriod": "2003-06",
            "forecastValue": 14,
            "lastObservedValue": 14,
            "changePct": -32.7,
            "direction": "down",
            "accuracyScore": 64.0,
            "confidence": "low",
            "risk": "low",
            "modelLabelEs": "Ultimo valor",
            "modelLabelEn": "Last value",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 15
              },
              {
                "period": "2003-02",
                "value": 34
              },
              {
                "period": "2003-03",
                "value": 29
              },
              {
                "period": "2003-04",
                "value": 21
              },
              {
                "period": "2003-05",
                "value": 14
              }
            ],
            "label": "Boyaca",
            "dominantFactor": "Firearm (81.7%)",
            "hotspot": "Municipality: Tunja (8.7%)",
            "recommendations": [
              "Prioritize monitoring on Tunja during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 14 cases in Boyaca. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window.",
              "pressure": "The recent average falls 32.7% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Boyaca remains Firearm, while Municipality: Tunja (8.7%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Tunja and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "cordoba",
            "forecastPeriod": "2003-06",
            "forecastValue": 22,
            "lastObservedValue": 21,
            "changePct": 3.1,
            "direction": "stable",
            "accuracyScore": 93.1,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 22
              },
              {
                "period": "2003-02",
                "value": 21
              },
              {
                "period": "2003-03",
                "value": 21
              },
              {
                "period": "2003-04",
                "value": 23
              },
              {
                "period": "2003-05",
                "value": 21
              }
            ],
            "label": "Cordoba",
            "dominantFactor": "Firearm (79.8%)",
            "hotspot": "Municipality: Monteria (29.4%)",
            "recommendations": [
              "Prioritize monitoring on Monteria during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 22 cases in Cordoba. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window.",
              "pressure": "Recent pressure remains stable versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Cordoba remains Firearm, while Municipality: Monteria (29.4%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Monteria and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "casanare",
            "forecastPeriod": "2003-06",
            "forecastValue": 22,
            "lastObservedValue": 22,
            "changePct": 17.0,
            "direction": "up",
            "accuracyScore": 87.2,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Ultimo valor",
            "modelLabelEn": "Last value",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 17
              },
              {
                "period": "2003-02",
                "value": 16
              },
              {
                "period": "2003-03",
                "value": 17
              },
              {
                "period": "2003-04",
                "value": 17
              },
              {
                "period": "2003-05",
                "value": 22
              }
            ],
            "label": "Casanare",
            "dominantFactor": "Firearm (86.7%)",
            "hotspot": "Municipality: Yopal (43.3%)",
            "recommendations": [
              "Prioritize monitoring on Yopal during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 22 cases in Casanare. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window.",
              "pressure": "The recent average rises 17.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Casanare remains Firearm, while Municipality: Yopal (43.3%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Yopal and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "sucre",
            "forecastPeriod": "2003-06",
            "forecastValue": 19,
            "lastObservedValue": 29,
            "changePct": 17.0,
            "direction": "up",
            "accuracyScore": 45.2,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 13
              },
              {
                "period": "2003-02",
                "value": 19
              },
              {
                "period": "2003-03",
                "value": 18
              },
              {
                "period": "2003-04",
                "value": 10
              },
              {
                "period": "2003-05",
                "value": 29
              }
            ],
            "label": "Sucre",
            "dominantFactor": "Firearm (96.6%)",
            "hotspot": "Municipality: Sincelejo (38.2%)",
            "recommendations": [
              "Prioritize monitoring on Sincelejo during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 19 cases in Sucre. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 17.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Sucre remains Firearm, while Municipality: Sincelejo (38.2%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Sincelejo and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "choco",
            "forecastPeriod": "2003-06",
            "forecastValue": 6,
            "lastObservedValue": 6,
            "changePct": -37.1,
            "direction": "down",
            "accuracyScore": 70.1,
            "confidence": "low",
            "risk": "low",
            "modelLabelEs": "Ultimo valor",
            "modelLabelEn": "Last value",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 11
              },
              {
                "period": "2003-02",
                "value": 9
              },
              {
                "period": "2003-03",
                "value": 11
              },
              {
                "period": "2003-04",
                "value": 7
              },
              {
                "period": "2003-05",
                "value": 6
              }
            ],
            "label": "Choco",
            "dominantFactor": "Firearm (84.4%)",
            "hotspot": "Municipality: Quibdo (55.6%)",
            "recommendations": [
              "Prioritize monitoring on Quibdo during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 6 cases in Choco. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date. The latest close looks partial, so the forecast uses the last complete window.",
              "pressure": "The recent average falls 37.1% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Choco remains Firearm, while Municipality: Quibdo (55.6%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Quibdo and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "guaviare",
            "forecastPeriod": "2003-06",
            "forecastValue": 6,
            "lastObservedValue": 8,
            "changePct": 131.8,
            "direction": "up",
            "accuracyScore": 38.5,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 6
              },
              {
                "period": "2003-02",
                "value": 3
              },
              {
                "period": "2003-03",
                "value": 2
              },
              {
                "period": "2003-04",
                "value": 9
              },
              {
                "period": "2003-05",
                "value": 8
              }
            ],
            "label": "Guaviare",
            "dominantFactor": "Firearm (64.3%)",
            "hotspot": "Municipality: San Jose del Guaviare (71.4%)",
            "recommendations": [
              "Prioritize monitoring on San Jose del Guaviare during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 6 cases in Guaviare. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 131.8% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Guaviare remains Firearm, while Municipality: San Jose del Guaviare (71.4%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on San Jose del Guaviare and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "amazonas",
            "forecastPeriod": "2003-06",
            "forecastValue": 2,
            "lastObservedValue": 2,
            "changePct": -40.0,
            "direction": "down",
            "accuracyScore": 0.0,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Ultimo valor",
            "modelLabelEn": "Last value",
            "historyMonths": 5,
            "series": [
              {
                "period": "2003-01",
                "value": 1
              },
              {
                "period": "2003-02",
                "value": 2
              },
              {
                "period": "2003-03",
                "value": 2
              },
              {
                "period": "2003-04",
                "value": 0
              },
              {
                "period": "2003-05",
                "value": 2
              }
            ],
            "label": "Amazonas",
            "dominantFactor": "Firearm (57.1%)",
            "hotspot": "Municipality: Leticia (57.1%)",
            "recommendations": [
              "Prioritize monitoring on Leticia during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 2 cases in Amazonas. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average falls 40.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Amazonas remains Firearm, while Municipality: Leticia (57.1%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Leticia and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "san-andres-islas",
            "forecastPeriod": "2003-05",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": -33.3,
            "direction": "down",
            "accuracyScore": 0.0,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 3,
            "series": [
              {
                "period": "2003-02",
                "value": 1
              },
              {
                "period": "2003-03",
                "value": 2
              },
              {
                "period": "2003-04",
                "value": 1
              }
            ],
            "label": "San Andres Islas",
            "dominantFactor": "Firearm (50.0%)",
            "hotspot": "Municipality: San Andres (100.0%)",
            "recommendations": [
              "Prioritize monitoring on San Andres during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 1 cases in San Andres Islas. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average falls 33.3% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in San Andres Islas remains Firearm, while Municipality: San Andres (100.0%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on San Andres and check whether Firearm keeps its weight through the next operating window."
            }
          },
          {
            "id": "vichada",
            "forecastPeriod": "2003-06",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 0.0,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 3,
            "series": [
              {
                "period": "2003-03",
                "value": 1
              },
              {
                "period": "2003-04",
                "value": 0
              },
              {
                "period": "2003-05",
                "value": 1
              }
            ],
            "label": "Vichada",
            "dominantFactor": "Sharp weapon (100.0%)",
            "hotspot": "Municipality: Puerto Carreno (100.0%)",
            "recommendations": [
              "Prioritize monitoring on Puerto Carreno during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Sharp weapon is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 1 cases in Vichada. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Vichada remains Sharp weapon, while Municipality: Puerto Carreno (100.0%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Puerto Carreno and check whether Sharp weapon keeps its weight through the next operating window."
            }
          },
          {
            "id": "vaupes",
            "forecastPeriod": "2003-06",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 0.0,
            "direction": "stable",
            "accuracyScore": 0.0,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 1,
            "series": [
              {
                "period": "2003-05",
                "value": 1
              }
            ],
            "label": "Vaupes",
            "dominantFactor": "Firearm (100.0%)",
            "hotspot": "Municipality: Mitu (100.0%)",
            "recommendations": [
              "Prioritize monitoring on Mitu during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant weapon to verify whether Firearm is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 1 cases in Vaupes. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "Recent pressure remains stable versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Vaupes remains Firearm, while Municipality: Mitu (100.0%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Mitu and check whether Firearm keeps its weight through the next operating window."
            }
          }
        ]
      }
    },
    "sexuales": {
      "summary": "The sexual crimes base consolidates 4,016 cases across 4,016 records. Bogota holds 14.8% of the total, and the dominant offense is articulo 209. actos sexuales con menor de 14 anos (22.1%).",
      "metrics": [
        {
          "label": "Consolidated cases",
          "value": "4,016"
        },
        {
          "label": "Main hotspot",
          "value": "Bogota 14.8%"
        },
        {
          "label": "Dominant offense",
          "value": "22.1% of the total"
        }
      ],
      "findings": [
        {
          "title": "Territorial concentration",
          "description": "Bogota leads with 593 cases, and Bogota D.C. holds the strongest municipal load."
        },
        {
          "title": "Victim profile",
          "description": "Female represents 83.9%, and the adults group contributes 54.2%."
        },
        {
          "title": "Record quality",
          "description": "Not Reported dominates 100.0% of the base, so interpretation depends more on offense type and territory."
        }
      ],
      "actions": [
        {
          "title": "Monitoring by affected profile",
          "description": "Adults, teenagers and minors should be reviewed separately to avoid flattening different risk patterns."
        },
        {
          "title": "Territorial targeting",
          "description": "Institutional reading should stay focused on Bogota and Bogota D.C., because they carry the strongest observed load."
        }
      ],
      "coverageNote": "AI base: 4,016 records and 4,016 cases. The reading combines territory, offense type and population profile to support monitoring.",
      "predictive": {
        "nextPeriod": "2018-01",
        "territories": [
          {
            "id": "national",
            "forecastPeriod": "2018-01",
            "forecastValue": 2,
            "lastObservedValue": 5,
            "changePct": 50.0,
            "direction": "up",
            "accuracyScore": 70.4,
            "confidence": "medium",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 96,
            "series": [
              {
                "period": "2017-01",
                "value": 5
              },
              {
                "period": "2017-02",
                "value": 2
              },
              {
                "period": "2017-03",
                "value": 1
              },
              {
                "period": "2017-04",
                "value": 0
              },
              {
                "period": "2017-05",
                "value": 0
              },
              {
                "period": "2017-06",
                "value": 2
              },
              {
                "period": "2017-07",
                "value": 2
              },
              {
                "period": "2017-08",
                "value": 1
              },
              {
                "period": "2017-09",
                "value": 1
              },
              {
                "period": "2017-10",
                "value": 1
              },
              {
                "period": "2017-11",
                "value": 0
              },
              {
                "period": "2017-12",
                "value": 5
              }
            ],
            "label": "National",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (22.1%)",
            "hotspot": "Department: Bogota (14.8%)",
            "recommendations": [
              "Prioritize monitoring on Bogota during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 209. Actos Sexuales Con Menor de 14 Anos is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 2 cases in National. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 50.0% versus the previous window. Current operational confidence is medium.",
              "focus": "The main focus in National remains Articulo 209. Actos Sexuales Con Menor de 14 Anos, while Department: Bogota (14.8%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Bogota and check whether Articulo 209. Actos Sexuales Con Menor de 14 Anos keeps its weight through the next operating window."
            }
          },
          {
            "id": "bogota",
            "forecastPeriod": "2017-02",
            "forecastValue": 3,
            "lastObservedValue": 3,
            "changePct": 11.1,
            "direction": "up",
            "accuracyScore": 51.1,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Tendencia reciente + estacionalidad",
            "modelLabelEn": "Recent trend + seasonality",
            "historyMonths": 85,
            "series": [
              {
                "period": "2016-02",
                "value": 2
              },
              {
                "period": "2016-03",
                "value": 3
              },
              {
                "period": "2016-04",
                "value": 1
              },
              {
                "period": "2016-05",
                "value": 0
              },
              {
                "period": "2016-06",
                "value": 1
              },
              {
                "period": "2016-07",
                "value": 4
              },
              {
                "period": "2016-08",
                "value": 4
              },
              {
                "period": "2016-09",
                "value": 1
              },
              {
                "period": "2016-10",
                "value": 4
              },
              {
                "period": "2016-11",
                "value": 3
              },
              {
                "period": "2016-12",
                "value": 4
              },
              {
                "period": "2017-01",
                "value": 3
              }
            ],
            "label": "Bogota",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (16.5%)",
            "hotspot": "Municipality: Bogota D.C. (100.0%)",
            "recommendations": [
              "Prioritize monitoring on Bogota D.C. during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 209. Actos Sexuales Con Menor de 14 Anos is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 3 cases in Bogota. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 11.1% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Bogota remains Articulo 209. Actos Sexuales Con Menor de 14 Anos, while Municipality: Bogota D.C. (100.0%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Bogota D.C. and check whether Articulo 209. Actos Sexuales Con Menor de 14 Anos keeps its weight through the next operating window."
            }
          },
          {
            "id": "valle",
            "forecastPeriod": "2017-08",
            "forecastValue": 1,
            "lastObservedValue": 2,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 47.2,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 91,
            "series": [
              {
                "period": "2016-08",
                "value": 3
              },
              {
                "period": "2016-09",
                "value": 2
              },
              {
                "period": "2016-10",
                "value": 2
              },
              {
                "period": "2016-11",
                "value": 2
              },
              {
                "period": "2016-12",
                "value": 3
              },
              {
                "period": "2017-01",
                "value": 1
              },
              {
                "period": "2017-02",
                "value": 0
              },
              {
                "period": "2017-03",
                "value": 0
              },
              {
                "period": "2017-04",
                "value": 0
              },
              {
                "period": "2017-05",
                "value": 0
              },
              {
                "period": "2017-06",
                "value": 0
              },
              {
                "period": "2017-07",
                "value": 2
              }
            ],
            "label": "Valle",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (23.7%)",
            "hotspot": "Municipality: Cali (46.3%)",
            "recommendations": [
              "Prioritize monitoring on Cali during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 209. Actos Sexuales Con Menor de 14 Anos is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 1 cases in Valle. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Valle remains Articulo 209. Actos Sexuales Con Menor de 14 Anos, while Municipality: Cali (46.3%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Cali and check whether Articulo 209. Actos Sexuales Con Menor de 14 Anos keeps its weight through the next operating window."
            }
          },
          {
            "id": "santander",
            "forecastPeriod": "2017-03",
            "forecastValue": 2,
            "lastObservedValue": 1,
            "changePct": -71.4,
            "direction": "down",
            "accuracyScore": 49.4,
            "confidence": "low",
            "risk": "low",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 86,
            "series": [
              {
                "period": "2016-03",
                "value": 4
              },
              {
                "period": "2016-04",
                "value": 3
              },
              {
                "period": "2016-05",
                "value": 1
              },
              {
                "period": "2016-06",
                "value": 1
              },
              {
                "period": "2016-07",
                "value": 1
              },
              {
                "period": "2016-08",
                "value": 1
              },
              {
                "period": "2016-09",
                "value": 2
              },
              {
                "period": "2016-10",
                "value": 4
              },
              {
                "period": "2016-11",
                "value": 1
              },
              {
                "period": "2016-12",
                "value": 1
              },
              {
                "period": "2017-01",
                "value": 0
              },
              {
                "period": "2017-02",
                "value": 1
              }
            ],
            "label": "Santander",
            "dominantFactor": "Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir (24.2%)",
            "hotspot": "Municipality: Bucaramanga (27.7%)",
            "recommendations": [
              "Prioritize monitoring on Bucaramanga during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 2 cases in Santander. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average falls 71.4% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Santander remains Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir, while Municipality: Bucaramanga (27.7%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Bucaramanga and check whether Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir keeps its weight through the next operating window."
            }
          },
          {
            "id": "antioquia",
            "forecastPeriod": "2017-10",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 42.1,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Tendencia ponderada reciente",
            "modelLabelEn": "Weighted recent trend",
            "historyMonths": 93,
            "series": [
              {
                "period": "2016-10",
                "value": 1
              },
              {
                "period": "2016-11",
                "value": 1
              },
              {
                "period": "2016-12",
                "value": 1
              },
              {
                "period": "2017-01",
                "value": 0
              },
              {
                "period": "2017-02",
                "value": 0
              },
              {
                "period": "2017-03",
                "value": 0
              },
              {
                "period": "2017-04",
                "value": 0
              },
              {
                "period": "2017-05",
                "value": 0
              },
              {
                "period": "2017-06",
                "value": 0
              },
              {
                "period": "2017-07",
                "value": 0
              },
              {
                "period": "2017-08",
                "value": 1
              },
              {
                "period": "2017-09",
                "value": 1
              }
            ],
            "label": "Antioquia",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (21.8%)",
            "hotspot": "Municipality: Medellin (21.8%)",
            "recommendations": [
              "Prioritize monitoring on Medellin during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 209. Actos Sexuales Con Menor de 14 Anos is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 1 cases in Antioquia. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Antioquia remains Articulo 209. Actos Sexuales Con Menor de 14 Anos, while Municipality: Medellin (21.8%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Medellin and check whether Articulo 209. Actos Sexuales Con Menor de 14 Anos keeps its weight through the next operating window."
            }
          },
          {
            "id": "atlantico",
            "forecastPeriod": "2017-01",
            "forecastValue": 2,
            "lastObservedValue": 4,
            "changePct": 133.3,
            "direction": "up",
            "accuracyScore": 26.8,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Tendencia reciente + estacionalidad",
            "modelLabelEn": "Recent trend + seasonality",
            "historyMonths": 84,
            "series": [
              {
                "period": "2016-01",
                "value": 0
              },
              {
                "period": "2016-02",
                "value": 1
              },
              {
                "period": "2016-03",
                "value": 0
              },
              {
                "period": "2016-04",
                "value": 1
              },
              {
                "period": "2016-05",
                "value": 0
              },
              {
                "period": "2016-06",
                "value": 2
              },
              {
                "period": "2016-07",
                "value": 0
              },
              {
                "period": "2016-08",
                "value": 3
              },
              {
                "period": "2016-09",
                "value": 0
              },
              {
                "period": "2016-10",
                "value": 2
              },
              {
                "period": "2016-11",
                "value": 1
              },
              {
                "period": "2016-12",
                "value": 4
              }
            ],
            "label": "Atlantico",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (27.0%)",
            "hotspot": "Municipality: Barranquilla (57.9%)",
            "recommendations": [
              "Prioritize monitoring on Barranquilla during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 209. Actos Sexuales Con Menor de 14 Anos is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 2 cases in Atlantico. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 133.3% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Atlantico remains Articulo 209. Actos Sexuales Con Menor de 14 Anos, while Municipality: Barranquilla (57.9%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Barranquilla and check whether Articulo 209. Actos Sexuales Con Menor de 14 Anos keeps its weight through the next operating window."
            }
          },
          {
            "id": "huila",
            "forecastPeriod": "2016-12",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": -50.0,
            "direction": "down",
            "accuracyScore": 22.5,
            "confidence": "low",
            "risk": "low",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 83,
            "series": [
              {
                "period": "2015-12",
                "value": 0
              },
              {
                "period": "2016-01",
                "value": 2
              },
              {
                "period": "2016-02",
                "value": 0
              },
              {
                "period": "2016-03",
                "value": 1
              },
              {
                "period": "2016-04",
                "value": 1
              },
              {
                "period": "2016-05",
                "value": 2
              },
              {
                "period": "2016-06",
                "value": 0
              },
              {
                "period": "2016-07",
                "value": 0
              },
              {
                "period": "2016-08",
                "value": 2
              },
              {
                "period": "2016-09",
                "value": 0
              },
              {
                "period": "2016-10",
                "value": 0
              },
              {
                "period": "2016-11",
                "value": 1
              }
            ],
            "label": "Huila",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (21.4%)",
            "hotspot": "Municipality: Neiva (39.1%)",
            "recommendations": [
              "Prioritize monitoring on Neiva during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 209. Actos Sexuales Con Menor de 14 Anos is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Huila. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average falls 50.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Huila remains Articulo 209. Actos Sexuales Con Menor de 14 Anos, while Municipality: Neiva (39.1%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Neiva and check whether Articulo 209. Actos Sexuales Con Menor de 14 Anos keeps its weight through the next operating window."
            }
          },
          {
            "id": "risaralda",
            "forecastPeriod": "2018-01",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 33.2,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 96,
            "series": [
              {
                "period": "2017-01",
                "value": 0
              },
              {
                "period": "2017-02",
                "value": 0
              },
              {
                "period": "2017-03",
                "value": 0
              },
              {
                "period": "2017-04",
                "value": 0
              },
              {
                "period": "2017-05",
                "value": 0
              },
              {
                "period": "2017-06",
                "value": 0
              },
              {
                "period": "2017-07",
                "value": 0
              },
              {
                "period": "2017-08",
                "value": 0
              },
              {
                "period": "2017-09",
                "value": 0
              },
              {
                "period": "2017-10",
                "value": 0
              },
              {
                "period": "2017-11",
                "value": 0
              },
              {
                "period": "2017-12",
                "value": 1
              }
            ],
            "label": "Risaralda",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (33.0%)",
            "hotspot": "Municipality: Pereira (57.4%)",
            "recommendations": [
              "Prioritize monitoring on Pereira during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 209. Actos Sexuales Con Menor de 14 Anos is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Risaralda. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Risaralda remains Articulo 209. Actos Sexuales Con Menor de 14 Anos, while Municipality: Pereira (57.4%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Pereira and check whether Articulo 209. Actos Sexuales Con Menor de 14 Anos keeps its weight through the next operating window."
            }
          },
          {
            "id": "meta",
            "forecastPeriod": "2017-07",
            "forecastValue": 0,
            "lastObservedValue": 2,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 16.9,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 90,
            "series": [
              {
                "period": "2016-07",
                "value": 0
              },
              {
                "period": "2016-08",
                "value": 0
              },
              {
                "period": "2016-09",
                "value": 1
              },
              {
                "period": "2016-10",
                "value": 0
              },
              {
                "period": "2016-11",
                "value": 1
              },
              {
                "period": "2016-12",
                "value": 1
              },
              {
                "period": "2017-01",
                "value": 0
              },
              {
                "period": "2017-02",
                "value": 0
              },
              {
                "period": "2017-03",
                "value": 0
              },
              {
                "period": "2017-04",
                "value": 0
              },
              {
                "period": "2017-05",
                "value": 0
              },
              {
                "period": "2017-06",
                "value": 2
              }
            ],
            "label": "Meta",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (16.3%)",
            "hotspot": "Municipality: Villavicencio (63.4%)",
            "recommendations": [
              "Prioritize monitoring on Villavicencio during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 209. Actos Sexuales Con Menor de 14 Anos is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Meta. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Meta remains Articulo 209. Actos Sexuales Con Menor de 14 Anos, while Municipality: Villavicencio (63.4%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Villavicencio and check whether Articulo 209. Actos Sexuales Con Menor de 14 Anos keeps its weight through the next operating window."
            }
          },
          {
            "id": "boyaca",
            "forecastPeriod": "2016-11",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 0.0,
            "direction": "stable",
            "accuracyScore": 33.6,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Tendencia reciente + estacionalidad",
            "modelLabelEn": "Recent trend + seasonality",
            "historyMonths": 81,
            "series": [
              {
                "period": "2015-11",
                "value": 0
              },
              {
                "period": "2015-12",
                "value": 2
              },
              {
                "period": "2016-01",
                "value": 0
              },
              {
                "period": "2016-02",
                "value": 0
              },
              {
                "period": "2016-03",
                "value": 1
              },
              {
                "period": "2016-04",
                "value": 1
              },
              {
                "period": "2016-05",
                "value": 0
              },
              {
                "period": "2016-06",
                "value": 2
              },
              {
                "period": "2016-07",
                "value": 1
              },
              {
                "period": "2016-08",
                "value": 1
              },
              {
                "period": "2016-09",
                "value": 1
              },
              {
                "period": "2016-10",
                "value": 1
              }
            ],
            "label": "Boyaca",
            "dominantFactor": "Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir (26.4%)",
            "hotspot": "Municipality: Tunja (13.2%)",
            "recommendations": [
              "Prioritize monitoring on Tunja during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 1 cases in Boyaca. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "Recent pressure remains stable versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Boyaca remains Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir, while Municipality: Tunja (13.2%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Tunja and check whether Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir keeps its weight through the next operating window."
            }
          },
          {
            "id": "sucre",
            "forecastPeriod": "2018-01",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 24.9,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 96,
            "series": [
              {
                "period": "2017-01",
                "value": 0
              },
              {
                "period": "2017-02",
                "value": 0
              },
              {
                "period": "2017-03",
                "value": 0
              },
              {
                "period": "2017-04",
                "value": 0
              },
              {
                "period": "2017-05",
                "value": 0
              },
              {
                "period": "2017-06",
                "value": 0
              },
              {
                "period": "2017-07",
                "value": 0
              },
              {
                "period": "2017-08",
                "value": 0
              },
              {
                "period": "2017-09",
                "value": 0
              },
              {
                "period": "2017-10",
                "value": 0
              },
              {
                "period": "2017-11",
                "value": 0
              },
              {
                "period": "2017-12",
                "value": 1
              }
            ],
            "label": "Sucre",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (25.2%)",
            "hotspot": "Municipality: Sincelejo (32.3%)",
            "recommendations": [
              "Prioritize monitoring on Sincelejo during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 209. Actos Sexuales Con Menor de 14 Anos is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Sucre. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Sucre remains Articulo 209. Actos Sexuales Con Menor de 14 Anos, while Municipality: Sincelejo (32.3%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Sincelejo and check whether Articulo 209. Actos Sexuales Con Menor de 14 Anos keeps its weight through the next operating window."
            }
          },
          {
            "id": "norte-de-santander",
            "forecastPeriod": "2017-04",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 0.0,
            "direction": "stable",
            "accuracyScore": 0.0,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Ultimo valor",
            "modelLabelEn": "Last value",
            "historyMonths": 81,
            "series": [
              {
                "period": "2016-04",
                "value": 3
              },
              {
                "period": "2016-05",
                "value": 1
              },
              {
                "period": "2016-06",
                "value": 1
              },
              {
                "period": "2016-07",
                "value": 0
              },
              {
                "period": "2016-08",
                "value": 0
              },
              {
                "period": "2016-09",
                "value": 0
              },
              {
                "period": "2016-10",
                "value": 1
              },
              {
                "period": "2016-11",
                "value": 0
              },
              {
                "period": "2016-12",
                "value": 0
              },
              {
                "period": "2017-01",
                "value": 0
              },
              {
                "period": "2017-02",
                "value": 0
              },
              {
                "period": "2017-03",
                "value": 1
              }
            ],
            "label": "Norte de Santander",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (39.8%)",
            "hotspot": "Municipality: Cucuta (58.5%)",
            "recommendations": [
              "Prioritize monitoring on Cucuta during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 209. Actos Sexuales Con Menor de 14 Anos is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 1 cases in Norte de Santander. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "Recent pressure remains stable versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Norte de Santander remains Articulo 209. Actos Sexuales Con Menor de 14 Anos, while Municipality: Cucuta (58.5%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Cucuta and check whether Articulo 209. Actos Sexuales Con Menor de 14 Anos keeps its weight through the next operating window."
            }
          },
          {
            "id": "caldas",
            "forecastPeriod": "2017-11",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 18.2,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Tendencia ponderada reciente",
            "modelLabelEn": "Weighted recent trend",
            "historyMonths": 94,
            "series": [
              {
                "period": "2016-11",
                "value": 0
              },
              {
                "period": "2016-12",
                "value": 1
              },
              {
                "period": "2017-01",
                "value": 0
              },
              {
                "period": "2017-02",
                "value": 0
              },
              {
                "period": "2017-03",
                "value": 0
              },
              {
                "period": "2017-04",
                "value": 0
              },
              {
                "period": "2017-05",
                "value": 0
              },
              {
                "period": "2017-06",
                "value": 0
              },
              {
                "period": "2017-07",
                "value": 0
              },
              {
                "period": "2017-08",
                "value": 0
              },
              {
                "period": "2017-09",
                "value": 0
              },
              {
                "period": "2017-10",
                "value": 1
              }
            ],
            "label": "Caldas",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (31.7%)",
            "hotspot": "Municipality: Manizales (41.5%)",
            "recommendations": [
              "Prioritize monitoring on Manizales during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 209. Actos Sexuales Con Menor de 14 Anos is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Caldas. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Caldas remains Articulo 209. Actos Sexuales Con Menor de 14 Anos, while Municipality: Manizales (41.5%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Manizales and check whether Articulo 209. Actos Sexuales Con Menor de 14 Anos keeps its weight through the next operating window."
            }
          },
          {
            "id": "quindio",
            "forecastPeriod": "2017-01",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 0.0,
            "direction": "stable",
            "accuracyScore": 6.8,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Tendencia reciente + estacionalidad",
            "modelLabelEn": "Recent trend + seasonality",
            "historyMonths": 82,
            "series": [
              {
                "period": "2016-01",
                "value": 0
              },
              {
                "period": "2016-02",
                "value": 0
              },
              {
                "period": "2016-03",
                "value": 1
              },
              {
                "period": "2016-04",
                "value": 0
              },
              {
                "period": "2016-05",
                "value": 0
              },
              {
                "period": "2016-06",
                "value": 0
              },
              {
                "period": "2016-07",
                "value": 0
              },
              {
                "period": "2016-08",
                "value": 0
              },
              {
                "period": "2016-09",
                "value": 1
              },
              {
                "period": "2016-10",
                "value": 0
              },
              {
                "period": "2016-11",
                "value": 0
              },
              {
                "period": "2016-12",
                "value": 1
              }
            ],
            "label": "Quindio",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (70.5%)",
            "hotspot": "Municipality: Armenia (54.1%)",
            "recommendations": [
              "Prioritize monitoring on Armenia during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 209. Actos Sexuales Con Menor de 14 Anos is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Quindio. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "Recent pressure remains stable versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Quindio remains Articulo 209. Actos Sexuales Con Menor de 14 Anos, while Municipality: Armenia (54.1%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Armenia and check whether Articulo 209. Actos Sexuales Con Menor de 14 Anos keeps its weight through the next operating window."
            }
          },
          {
            "id": "caqueta",
            "forecastPeriod": "2016-07",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 20.6,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 78,
            "series": [
              {
                "period": "2015-07",
                "value": 0
              },
              {
                "period": "2015-08",
                "value": 1
              },
              {
                "period": "2015-09",
                "value": 0
              },
              {
                "period": "2015-10",
                "value": 1
              },
              {
                "period": "2015-11",
                "value": 1
              },
              {
                "period": "2015-12",
                "value": 1
              },
              {
                "period": "2016-01",
                "value": 0
              },
              {
                "period": "2016-02",
                "value": 0
              },
              {
                "period": "2016-03",
                "value": 0
              },
              {
                "period": "2016-04",
                "value": 0
              },
              {
                "period": "2016-05",
                "value": 0
              },
              {
                "period": "2016-06",
                "value": 1
              }
            ],
            "label": "Caqueta",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (39.8%)",
            "hotspot": "Municipality: Florencia (65.3%)",
            "recommendations": [
              "Prioritize monitoring on Florencia during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 209. Actos Sexuales Con Menor de 14 Anos is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Caqueta. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Caqueta remains Articulo 209. Actos Sexuales Con Menor de 14 Anos, while Municipality: Florencia (65.3%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Florencia and check whether Articulo 209. Actos Sexuales Con Menor de 14 Anos keeps its weight through the next operating window."
            }
          },
          {
            "id": "tolima",
            "forecastPeriod": "2017-01",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 14.7,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 82,
            "series": [
              {
                "period": "2016-01",
                "value": 0
              },
              {
                "period": "2016-02",
                "value": 0
              },
              {
                "period": "2016-03",
                "value": 0
              },
              {
                "period": "2016-04",
                "value": 0
              },
              {
                "period": "2016-05",
                "value": 0
              },
              {
                "period": "2016-06",
                "value": 1
              },
              {
                "period": "2016-07",
                "value": 0
              },
              {
                "period": "2016-08",
                "value": 0
              },
              {
                "period": "2016-09",
                "value": 1
              },
              {
                "period": "2016-10",
                "value": 1
              },
              {
                "period": "2016-11",
                "value": 0
              },
              {
                "period": "2016-12",
                "value": 1
              }
            ],
            "label": "Tolima",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (23.9%)",
            "hotspot": "Municipality: Ibague (32.7%)",
            "recommendations": [
              "Prioritize monitoring on Ibague during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 209. Actos Sexuales Con Menor de 14 Anos is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Tolima. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Tolima remains Articulo 209. Actos Sexuales Con Menor de 14 Anos, while Municipality: Ibague (32.7%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Ibague and check whether Articulo 209. Actos Sexuales Con Menor de 14 Anos keeps its weight through the next operating window."
            }
          },
          {
            "id": "narino",
            "forecastPeriod": "2016-09",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 18.1,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 80,
            "series": [
              {
                "period": "2015-09",
                "value": 2
              },
              {
                "period": "2015-10",
                "value": 0
              },
              {
                "period": "2015-11",
                "value": 0
              },
              {
                "period": "2015-12",
                "value": 0
              },
              {
                "period": "2016-01",
                "value": 0
              },
              {
                "period": "2016-02",
                "value": 1
              },
              {
                "period": "2016-03",
                "value": 0
              },
              {
                "period": "2016-04",
                "value": 0
              },
              {
                "period": "2016-05",
                "value": 0
              },
              {
                "period": "2016-06",
                "value": 0
              },
              {
                "period": "2016-07",
                "value": 1
              },
              {
                "period": "2016-08",
                "value": 1
              }
            ],
            "label": "Narino",
            "dominantFactor": "Articulo 210 A. Acoso Sexual (16.3%)",
            "hotspot": "Municipality: Pasto (37.0%)",
            "recommendations": [
              "Prioritize monitoring on Pasto during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 210 A. Acoso Sexual is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Narino. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Narino remains Articulo 210 A. Acoso Sexual, while Municipality: Pasto (37.0%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Pasto and check whether Articulo 210 A. Acoso Sexual keeps its weight through the next operating window."
            }
          },
          {
            "id": "bolivar",
            "forecastPeriod": "2017-01",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": -50.0,
            "direction": "down",
            "accuracyScore": 0.0,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Ultimo valor",
            "modelLabelEn": "Last value",
            "historyMonths": 84,
            "series": [
              {
                "period": "2016-01",
                "value": 2
              },
              {
                "period": "2016-02",
                "value": 0
              },
              {
                "period": "2016-03",
                "value": 0
              },
              {
                "period": "2016-04",
                "value": 0
              },
              {
                "period": "2016-05",
                "value": 0
              },
              {
                "period": "2016-06",
                "value": 1
              },
              {
                "period": "2016-07",
                "value": 0
              },
              {
                "period": "2016-08",
                "value": 2
              },
              {
                "period": "2016-09",
                "value": 0
              },
              {
                "period": "2016-10",
                "value": 0
              },
              {
                "period": "2016-11",
                "value": 0
              },
              {
                "period": "2016-12",
                "value": 1
              }
            ],
            "label": "Bolivar",
            "dominantFactor": "Articulo 206. Acto Sexual Violento (14.6%)",
            "hotspot": "Municipality: Cartagena (39.3%)",
            "recommendations": [
              "Prioritize monitoring on Cartagena during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 206. Acto Sexual Violento is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 1 cases in Bolivar. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average falls 50.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Bolivar remains Articulo 206. Acto Sexual Violento, while Municipality: Cartagena (39.3%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Cartagena and check whether Articulo 206. Acto Sexual Violento keeps its weight through the next operating window."
            }
          },
          {
            "id": "magdalena",
            "forecastPeriod": "2016-12",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 13.1,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Tendencia reciente + estacionalidad",
            "modelLabelEn": "Recent trend + seasonality",
            "historyMonths": 83,
            "series": [
              {
                "period": "2015-12",
                "value": 0
              },
              {
                "period": "2016-01",
                "value": 0
              },
              {
                "period": "2016-02",
                "value": 0
              },
              {
                "period": "2016-03",
                "value": 0
              },
              {
                "period": "2016-04",
                "value": 0
              },
              {
                "period": "2016-05",
                "value": 0
              },
              {
                "period": "2016-06",
                "value": 0
              },
              {
                "period": "2016-07",
                "value": 0
              },
              {
                "period": "2016-08",
                "value": 0
              },
              {
                "period": "2016-09",
                "value": 0
              },
              {
                "period": "2016-10",
                "value": 2
              },
              {
                "period": "2016-11",
                "value": 1
              }
            ],
            "label": "Magdalena",
            "dominantFactor": "Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir (14.8%)",
            "hotspot": "Municipality: Santa Marta (58.0%)",
            "recommendations": [
              "Prioritize monitoring on Santa Marta during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 1 cases in Magdalena. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Magdalena remains Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir, while Municipality: Santa Marta (58.0%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Santa Marta and check whether Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir keeps its weight through the next operating window."
            }
          },
          {
            "id": "cundinamarca",
            "forecastPeriod": "2016-08",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 21.8,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 79,
            "series": [
              {
                "period": "2015-08",
                "value": 1
              },
              {
                "period": "2015-09",
                "value": 0
              },
              {
                "period": "2015-10",
                "value": 0
              },
              {
                "period": "2015-11",
                "value": 0
              },
              {
                "period": "2015-12",
                "value": 0
              },
              {
                "period": "2016-01",
                "value": 2
              },
              {
                "period": "2016-02",
                "value": 0
              },
              {
                "period": "2016-03",
                "value": 0
              },
              {
                "period": "2016-04",
                "value": 0
              },
              {
                "period": "2016-05",
                "value": 1
              },
              {
                "period": "2016-06",
                "value": 1
              },
              {
                "period": "2016-07",
                "value": 1
              }
            ],
            "label": "Cundinamarca",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (24.6%)",
            "hotspot": "Municipality: Soacha (34.4%)",
            "recommendations": [
              "Prioritize monitoring on Soacha during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 209. Actos Sexuales Con Menor de 14 Anos is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Cundinamarca. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Cundinamarca remains Articulo 209. Actos Sexuales Con Menor de 14 Anos, while Municipality: Soacha (34.4%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Soacha and check whether Articulo 209. Actos Sexuales Con Menor de 14 Anos keeps its weight through the next operating window."
            }
          },
          {
            "id": "cordoba",
            "forecastPeriod": "2017-01",
            "forecastValue": 1,
            "lastObservedValue": 2,
            "changePct": 66.7,
            "direction": "up",
            "accuracyScore": 12.7,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 80,
            "series": [
              {
                "period": "2016-01",
                "value": 1
              },
              {
                "period": "2016-02",
                "value": 3
              },
              {
                "period": "2016-03",
                "value": 0
              },
              {
                "period": "2016-04",
                "value": 0
              },
              {
                "period": "2016-05",
                "value": 1
              },
              {
                "period": "2016-06",
                "value": 0
              },
              {
                "period": "2016-07",
                "value": 1
              },
              {
                "period": "2016-08",
                "value": 0
              },
              {
                "period": "2016-09",
                "value": 2
              },
              {
                "period": "2016-10",
                "value": 1
              },
              {
                "period": "2016-11",
                "value": 2
              },
              {
                "period": "2016-12",
                "value": 2
              }
            ],
            "label": "Cordoba",
            "dominantFactor": "Articulo 205. Acceso Carnal Violento (20.0%)",
            "hotspot": "Municipality: Monteria (45.0%)",
            "recommendations": [
              "Prioritize monitoring on Monteria during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 205. Acceso Carnal Violento is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 1 cases in Cordoba. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 66.7% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Cordoba remains Articulo 205. Acceso Carnal Violento, while Municipality: Monteria (45.0%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Monteria and check whether Articulo 205. Acceso Carnal Violento keeps its weight through the next operating window."
            }
          },
          {
            "id": "putumayo",
            "forecastPeriod": "2017-02",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 30.2,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 85,
            "series": [
              {
                "period": "2016-02",
                "value": 0
              },
              {
                "period": "2016-03",
                "value": 0
              },
              {
                "period": "2016-04",
                "value": 0
              },
              {
                "period": "2016-05",
                "value": 0
              },
              {
                "period": "2016-06",
                "value": 0
              },
              {
                "period": "2016-07",
                "value": 0
              },
              {
                "period": "2016-08",
                "value": 0
              },
              {
                "period": "2016-09",
                "value": 0
              },
              {
                "period": "2016-10",
                "value": 0
              },
              {
                "period": "2016-11",
                "value": 0
              },
              {
                "period": "2016-12",
                "value": 1
              },
              {
                "period": "2017-01",
                "value": 1
              }
            ],
            "label": "Putumayo",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (30.2%)",
            "hotspot": "Municipality: Mocoa (39.5%)",
            "recommendations": [
              "Prioritize monitoring on Mocoa during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 209. Actos Sexuales Con Menor de 14 Anos is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Putumayo. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Putumayo remains Articulo 209. Actos Sexuales Con Menor de 14 Anos, while Municipality: Mocoa (39.5%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Mocoa and check whether Articulo 209. Actos Sexuales Con Menor de 14 Anos keeps its weight through the next operating window."
            }
          },
          {
            "id": "guajira",
            "forecastPeriod": "2016-04",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 12.0,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 75,
            "series": [
              {
                "period": "2015-04",
                "value": 1
              },
              {
                "period": "2015-05",
                "value": 0
              },
              {
                "period": "2015-06",
                "value": 0
              },
              {
                "period": "2015-07",
                "value": 0
              },
              {
                "period": "2015-08",
                "value": 1
              },
              {
                "period": "2015-09",
                "value": 0
              },
              {
                "period": "2015-10",
                "value": 0
              },
              {
                "period": "2015-11",
                "value": 0
              },
              {
                "period": "2015-12",
                "value": 0
              },
              {
                "period": "2016-01",
                "value": 1
              },
              {
                "period": "2016-02",
                "value": 0
              },
              {
                "period": "2016-03",
                "value": 1
              }
            ],
            "label": "Guajira",
            "dominantFactor": "Articulo 211. Actos Sexuales Con Menor de 14 Anos (Circunstancias de Agravacion) (19.5%)",
            "hotspot": "Municipality: Riohacha (36.6%)",
            "recommendations": [
              "Prioritize monitoring on Riohacha during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 211. Actos Sexuales Con Menor de 14 Anos (Circunstancias de Agravacion) is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Guajira. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Guajira remains Articulo 211. Actos Sexuales Con Menor de 14 Anos (Circunstancias de Agravacion), while Municipality: Riohacha (36.6%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Riohacha and check whether Articulo 211. Actos Sexuales Con Menor de 14 Anos (Circunstancias de Agravacion) keeps its weight through the next operating window."
            }
          },
          {
            "id": "cauca",
            "forecastPeriod": "2018-01",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 30.8,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 91,
            "series": [
              {
                "period": "2017-01",
                "value": 0
              },
              {
                "period": "2017-02",
                "value": 1
              },
              {
                "period": "2017-03",
                "value": 0
              },
              {
                "period": "2017-04",
                "value": 0
              },
              {
                "period": "2017-05",
                "value": 0
              },
              {
                "period": "2017-06",
                "value": 0
              },
              {
                "period": "2017-07",
                "value": 0
              },
              {
                "period": "2017-08",
                "value": 0
              },
              {
                "period": "2017-09",
                "value": 0
              },
              {
                "period": "2017-10",
                "value": 0
              },
              {
                "period": "2017-11",
                "value": 0
              },
              {
                "period": "2017-12",
                "value": 1
              }
            ],
            "label": "Cauca",
            "dominantFactor": "Articulo 205. Acceso Carnal Violento (20.5%)",
            "hotspot": "Municipality: Popayan (51.3%)",
            "recommendations": [
              "Prioritize monitoring on Popayan during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 205. Acceso Carnal Violento is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Cauca. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Cauca remains Articulo 205. Acceso Carnal Violento, while Municipality: Popayan (51.3%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Popayan and check whether Articulo 205. Acceso Carnal Violento keeps its weight through the next operating window."
            }
          },
          {
            "id": "cesar",
            "forecastPeriod": "2016-08",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 25.3,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 78,
            "series": [
              {
                "period": "2015-08",
                "value": 1
              },
              {
                "period": "2015-09",
                "value": 0
              },
              {
                "period": "2015-10",
                "value": 1
              },
              {
                "period": "2015-11",
                "value": 2
              },
              {
                "period": "2015-12",
                "value": 1
              },
              {
                "period": "2016-01",
                "value": 0
              },
              {
                "period": "2016-02",
                "value": 0
              },
              {
                "period": "2016-03",
                "value": 0
              },
              {
                "period": "2016-04",
                "value": 0
              },
              {
                "period": "2016-05",
                "value": 0
              },
              {
                "period": "2016-06",
                "value": 0
              },
              {
                "period": "2016-07",
                "value": 1
              }
            ],
            "label": "Cesar",
            "dominantFactor": "Articulo 211. Acceso Carnal Abusivo Con Menor de 14 Anos (Circunstancias Agravacion) (23.7%)",
            "hotspot": "Municipality: Valledupar (65.8%)",
            "recommendations": [
              "Prioritize monitoring on Valledupar during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 211. Acceso Carnal Abusivo Con Menor de 14 Anos (Circunstancias Agravacion) is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Cesar. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Cesar remains Articulo 211. Acceso Carnal Abusivo Con Menor de 14 Anos (Circunstancias Agravacion), while Municipality: Valledupar (65.8%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Valledupar and check whether Articulo 211. Acceso Carnal Abusivo Con Menor de 14 Anos (Circunstancias Agravacion) keeps its weight through the next operating window."
            }
          },
          {
            "id": "choco",
            "forecastPeriod": "2018-01",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 34.2,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 96,
            "series": [
              {
                "period": "2017-01",
                "value": 0
              },
              {
                "period": "2017-02",
                "value": 0
              },
              {
                "period": "2017-03",
                "value": 0
              },
              {
                "period": "2017-04",
                "value": 0
              },
              {
                "period": "2017-05",
                "value": 0
              },
              {
                "period": "2017-06",
                "value": 0
              },
              {
                "period": "2017-07",
                "value": 0
              },
              {
                "period": "2017-08",
                "value": 0
              },
              {
                "period": "2017-09",
                "value": 0
              },
              {
                "period": "2017-10",
                "value": 0
              },
              {
                "period": "2017-11",
                "value": 0
              },
              {
                "period": "2017-12",
                "value": 1
              }
            ],
            "label": "Choco",
            "dominantFactor": "Articulo 205. Acceso Carnal Violento (27.3%)",
            "hotspot": "Municipality: Quibdo (51.5%)",
            "recommendations": [
              "Prioritize monitoring on Quibdo during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 205. Acceso Carnal Violento is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Choco. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Choco remains Articulo 205. Acceso Carnal Violento, while Municipality: Quibdo (51.5%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Quibdo and check whether Articulo 205. Acceso Carnal Violento keeps its weight through the next operating window."
            }
          },
          {
            "id": "arauca",
            "forecastPeriod": "2016-02",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 28.9,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Tendencia reciente + estacionalidad",
            "modelLabelEn": "Recent trend + seasonality",
            "historyMonths": 72,
            "series": [
              {
                "period": "2015-02",
                "value": 1
              },
              {
                "period": "2015-03",
                "value": 0
              },
              {
                "period": "2015-04",
                "value": 0
              },
              {
                "period": "2015-05",
                "value": 0
              },
              {
                "period": "2015-06",
                "value": 0
              },
              {
                "period": "2015-07",
                "value": 0
              },
              {
                "period": "2015-08",
                "value": 0
              },
              {
                "period": "2015-09",
                "value": 0
              },
              {
                "period": "2015-10",
                "value": 0
              },
              {
                "period": "2015-11",
                "value": 1
              },
              {
                "period": "2015-12",
                "value": 0
              },
              {
                "period": "2016-01",
                "value": 1
              }
            ],
            "label": "Arauca",
            "dominantFactor": "Articulo 211. Acceso Carnal Abusivo Con Menor de 14 Anos (Circunstancias Agravacion) (22.6%)",
            "hotspot": "Municipality: Arauca (54.8%)",
            "recommendations": [
              "Prioritize monitoring on Arauca during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 211. Acceso Carnal Abusivo Con Menor de 14 Anos (Circunstancias Agravacion) is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 1 cases in Arauca. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Arauca remains Articulo 211. Acceso Carnal Abusivo Con Menor de 14 Anos (Circunstancias Agravacion), while Municipality: Arauca (54.8%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Arauca and check whether Articulo 211. Acceso Carnal Abusivo Con Menor de 14 Anos (Circunstancias Agravacion) keeps its weight through the next operating window."
            }
          },
          {
            "id": "casanare",
            "forecastPeriod": "2016-12",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 41.2,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Ultimo valor",
            "modelLabelEn": "Last value",
            "historyMonths": 79,
            "series": [
              {
                "period": "2015-12",
                "value": 1
              },
              {
                "period": "2016-01",
                "value": 0
              },
              {
                "period": "2016-02",
                "value": 0
              },
              {
                "period": "2016-03",
                "value": 0
              },
              {
                "period": "2016-04",
                "value": 0
              },
              {
                "period": "2016-05",
                "value": 1
              },
              {
                "period": "2016-06",
                "value": 0
              },
              {
                "period": "2016-07",
                "value": 0
              },
              {
                "period": "2016-08",
                "value": 0
              },
              {
                "period": "2016-09",
                "value": 0
              },
              {
                "period": "2016-10",
                "value": 0
              },
              {
                "period": "2016-11",
                "value": 1
              }
            ],
            "label": "Casanare",
            "dominantFactor": "Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir (26.1%)",
            "hotspot": "Municipality: Yopal (39.1%)",
            "recommendations": [
              "Prioritize monitoring on Yopal during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 1 cases in Casanare. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Casanare remains Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir, while Municipality: Yopal (39.1%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Yopal and check whether Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir keeps its weight through the next operating window."
            }
          },
          {
            "id": "amazonas",
            "forecastPeriod": "2018-01",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 57.0,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 96,
            "series": [
              {
                "period": "2017-01",
                "value": 0
              },
              {
                "period": "2017-02",
                "value": 0
              },
              {
                "period": "2017-03",
                "value": 0
              },
              {
                "period": "2017-04",
                "value": 0
              },
              {
                "period": "2017-05",
                "value": 0
              },
              {
                "period": "2017-06",
                "value": 0
              },
              {
                "period": "2017-07",
                "value": 0
              },
              {
                "period": "2017-08",
                "value": 0
              },
              {
                "period": "2017-09",
                "value": 0
              },
              {
                "period": "2017-10",
                "value": 0
              },
              {
                "period": "2017-11",
                "value": 0
              },
              {
                "period": "2017-12",
                "value": 1
              }
            ],
            "label": "Amazonas",
            "dominantFactor": "Articulo 209. Actos Sexuales Con Menor de 14 Anos (31.8%)",
            "hotspot": "Municipality: Leticia (68.2%)",
            "recommendations": [
              "Prioritize monitoring on Leticia during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 209. Actos Sexuales Con Menor de 14 Anos is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Amazonas. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Amazonas remains Articulo 209. Actos Sexuales Con Menor de 14 Anos, while Municipality: Leticia (68.2%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Leticia and check whether Articulo 209. Actos Sexuales Con Menor de 14 Anos keeps its weight through the next operating window."
            }
          },
          {
            "id": "guaviare",
            "forecastPeriod": "2016-06",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 61.3,
            "confidence": "medium",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 34,
            "series": [
              {
                "period": "2015-06",
                "value": 0
              },
              {
                "period": "2015-07",
                "value": 0
              },
              {
                "period": "2015-08",
                "value": 0
              },
              {
                "period": "2015-09",
                "value": 0
              },
              {
                "period": "2015-10",
                "value": 0
              },
              {
                "period": "2015-11",
                "value": 0
              },
              {
                "period": "2015-12",
                "value": 0
              },
              {
                "period": "2016-01",
                "value": 0
              },
              {
                "period": "2016-02",
                "value": 0
              },
              {
                "period": "2016-03",
                "value": 1
              },
              {
                "period": "2016-04",
                "value": 0
              },
              {
                "period": "2016-05",
                "value": 1
              }
            ],
            "label": "Guaviare",
            "dominantFactor": "Articulo 210 A. Acoso Sexual (25.0%)",
            "hotspot": "Municipality: San Jose del Guaviare (75.0%)",
            "recommendations": [
              "Prioritize monitoring on San Jose del Guaviare during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 210 A. Acoso Sexual is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Guaviare. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is medium.",
              "focus": "The main focus in Guaviare remains Articulo 210 A. Acoso Sexual, while Municipality: San Jose del Guaviare (75.0%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on San Jose del Guaviare and check whether Articulo 210 A. Acoso Sexual keeps its weight through the next operating window."
            }
          },
          {
            "id": "san-andres",
            "forecastPeriod": "2014-11",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 76.7,
            "confidence": "high",
            "risk": "high",
            "modelLabelEs": "Ultimo valor",
            "modelLabelEn": "Last value",
            "historyMonths": 46,
            "series": [
              {
                "period": "2013-11",
                "value": 0
              },
              {
                "period": "2013-12",
                "value": 0
              },
              {
                "period": "2014-01",
                "value": 0
              },
              {
                "period": "2014-02",
                "value": 0
              },
              {
                "period": "2014-03",
                "value": 0
              },
              {
                "period": "2014-04",
                "value": 0
              },
              {
                "period": "2014-05",
                "value": 0
              },
              {
                "period": "2014-06",
                "value": 0
              },
              {
                "period": "2014-07",
                "value": 0
              },
              {
                "period": "2014-08",
                "value": 0
              },
              {
                "period": "2014-09",
                "value": 0
              },
              {
                "period": "2014-10",
                "value": 1
              }
            ],
            "label": "San Andres",
            "dominantFactor": "Articulo 205. Acceso Carnal Violento (28.6%)",
            "hotspot": "Municipality: San Andres (100.0%)",
            "recommendations": [
              "Prioritize monitoring on San Andres during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 205. Acceso Carnal Violento is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 1 cases in San Andres. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is high.",
              "focus": "The main focus in San Andres remains Articulo 205. Acceso Carnal Violento, while Municipality: San Andres (100.0%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on San Andres and check whether Articulo 205. Acceso Carnal Violento keeps its weight through the next operating window."
            }
          },
          {
            "id": "vichada",
            "forecastPeriod": "2014-05",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 0.0,
            "direction": "stable",
            "accuracyScore": 80.6,
            "confidence": "high",
            "risk": "high",
            "modelLabelEs": "Tendencia reciente + estacionalidad",
            "modelLabelEn": "Recent trend + seasonality",
            "historyMonths": 43,
            "series": [
              {
                "period": "2013-05",
                "value": 1
              },
              {
                "period": "2013-06",
                "value": 0
              },
              {
                "period": "2013-07",
                "value": 0
              },
              {
                "period": "2013-08",
                "value": 0
              },
              {
                "period": "2013-09",
                "value": 0
              },
              {
                "period": "2013-10",
                "value": 0
              },
              {
                "period": "2013-11",
                "value": 1
              },
              {
                "period": "2013-12",
                "value": 0
              },
              {
                "period": "2014-01",
                "value": 0
              },
              {
                "period": "2014-02",
                "value": 0
              },
              {
                "period": "2014-03",
                "value": 0
              },
              {
                "period": "2014-04",
                "value": 1
              }
            ],
            "label": "Vichada",
            "dominantFactor": "Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir (16.7%)",
            "hotspot": "Municipality: Puerto Carreno (83.3%)",
            "recommendations": [
              "Prioritize monitoring on Puerto Carreno during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Vichada. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "Recent pressure remains stable versus the previous window. Current operational confidence is high.",
              "focus": "The main focus in Vichada remains Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir, while Municipality: Puerto Carreno (83.3%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Puerto Carreno and check whether Articulo 210. Acceso Carnal O Acto Sexual Abusivo Con Incapaz de Resistir keeps its weight through the next operating window."
            }
          },
          {
            "id": "guainia",
            "forecastPeriod": "2016-11",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 86.7,
            "confidence": "high",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 78,
            "series": [
              {
                "period": "2015-11",
                "value": 0
              },
              {
                "period": "2015-12",
                "value": 1
              },
              {
                "period": "2016-01",
                "value": 0
              },
              {
                "period": "2016-02",
                "value": 0
              },
              {
                "period": "2016-03",
                "value": 0
              },
              {
                "period": "2016-04",
                "value": 0
              },
              {
                "period": "2016-05",
                "value": 0
              },
              {
                "period": "2016-06",
                "value": 0
              },
              {
                "period": "2016-07",
                "value": 0
              },
              {
                "period": "2016-08",
                "value": 0
              },
              {
                "period": "2016-09",
                "value": 0
              },
              {
                "period": "2016-10",
                "value": 1
              }
            ],
            "label": "Guainia",
            "dominantFactor": "Articulo 205. Acceso Carnal Violento (50.0%)",
            "hotspot": "Municipality: Inirida (100.0%)",
            "recommendations": [
              "Prioritize monitoring on Inirida during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 205. Acceso Carnal Violento is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Guainia. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is high.",
              "focus": "The main focus in Guainia remains Articulo 205. Acceso Carnal Violento, while Municipality: Inirida (100.0%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Inirida and check whether Articulo 205. Acceso Carnal Violento keeps its weight through the next operating window."
            }
          },
          {
            "id": "vaupes",
            "forecastPeriod": "2016-07",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 71.4,
            "confidence": "medium",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 17,
            "series": [
              {
                "period": "2015-07",
                "value": 0
              },
              {
                "period": "2015-08",
                "value": 0
              },
              {
                "period": "2015-09",
                "value": 0
              },
              {
                "period": "2015-10",
                "value": 0
              },
              {
                "period": "2015-11",
                "value": 1
              },
              {
                "period": "2015-12",
                "value": 0
              },
              {
                "period": "2016-01",
                "value": 0
              },
              {
                "period": "2016-02",
                "value": 0
              },
              {
                "period": "2016-03",
                "value": 0
              },
              {
                "period": "2016-04",
                "value": 0
              },
              {
                "period": "2016-05",
                "value": 0
              },
              {
                "period": "2016-06",
                "value": 1
              }
            ],
            "label": "Vaupes",
            "dominantFactor": "Articulo 205. Acceso Carnal Violento (33.3%)",
            "hotspot": "Municipality: Mitu (100.0%)",
            "recommendations": [
              "Prioritize monitoring on Mitu during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant offense to verify whether Articulo 205. Acceso Carnal Violento is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Vaupes. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is medium.",
              "focus": "The main focus in Vaupes remains Articulo 205. Acceso Carnal Violento, while Municipality: Mitu (100.0%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Mitu and check whether Articulo 205. Acceso Carnal Violento keeps its weight through the next operating window."
            }
          }
        ]
      }
    },
    "hurtos": {
      "summary": "The vehicle theft base consolidates 3,758 cases across 3,758 records. The strongest territorial weight sits in Antioquia (13.9%), and the dominant modality is article 239. motorcycle theft (85.2%).",
      "metrics": [
        {
          "label": "Consolidated cases",
          "value": "3,758"
        },
        {
          "label": "Main hotspot",
          "value": "Antioquia 13.9%"
        },
        {
          "label": "Dominant modality",
          "value": "85.2% of the total"
        }
      ],
      "findings": [
        {
          "title": "Recent concentration",
          "description": "Antioquia leads with 523 cases, and Bogota D.C. stands out as the main municipality in the cut."
        },
        {
          "title": "Dominant pattern",
          "description": "Article 239. Motorcycle theft explains 85.2% of the total. The most frequent profile remains male (80.1%) and adults (98.1%)."
        },
        {
          "title": "Event conditions",
          "description": "The leading weapon or method is sharp weapon (81.1%), which helps focus operational queries."
        }
      ],
      "actions": [
        {
          "title": "Territorial monitoring",
          "description": "Monitoring should reinforce Antioquia and Bogota D.C., because they hold the strongest observed load."
        },
        {
          "title": "Response by modality",
          "description": "Reading improves when theft modalities are separated instead of mixing different operating patterns."
        }
      ],
      "coverageNote": "AI base: 3,758 records and 3,758 cases. The reading combines territory, modality and affected profile to support monitoring.",
      "predictive": {
        "nextPeriod": "2027-01",
        "territories": [
          {
            "id": "national",
            "forecastPeriod": "2027-01",
            "forecastValue": 13,
            "lastObservedValue": 9,
            "changePct": 79.2,
            "direction": "up",
            "accuracyScore": 62.1,
            "confidence": "medium",
            "risk": "high",
            "modelLabelEs": "Tendencia ponderada reciente",
            "modelLabelEn": "Weighted recent trend",
            "historyMonths": 204,
            "series": [
              {
                "period": "2026-01",
                "value": 8
              },
              {
                "period": "2026-02",
                "value": 11
              },
              {
                "period": "2026-03",
                "value": 11
              },
              {
                "period": "2026-04",
                "value": 10
              },
              {
                "period": "2026-05",
                "value": 5
              },
              {
                "period": "2026-06",
                "value": 9
              },
              {
                "period": "2026-07",
                "value": 8
              },
              {
                "period": "2026-08",
                "value": 10
              },
              {
                "period": "2026-09",
                "value": 6
              },
              {
                "period": "2026-10",
                "value": 15
              },
              {
                "period": "2026-11",
                "value": 19
              },
              {
                "period": "2026-12",
                "value": 9
              }
            ],
            "label": "National",
            "dominantFactor": "Article 239. Motorcycle theft (85.2%)",
            "hotspot": "Department: Antioquia (13.9%)",
            "recommendations": [
              "Prioritize monitoring on Antioquia during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 13 cases in National. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 79.2% versus the previous window. Current operational confidence is medium.",
              "focus": "The main focus in National remains Article 239. Motorcycle theft, while Department: Antioquia (13.9%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Antioquia and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "antioquia",
            "forecastPeriod": "2027-01",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 200.0,
            "direction": "up",
            "accuracyScore": 48.8,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 199,
            "series": [
              {
                "period": "2026-01",
                "value": 1
              },
              {
                "period": "2026-02",
                "value": 2
              },
              {
                "period": "2026-03",
                "value": 2
              },
              {
                "period": "2026-04",
                "value": 0
              },
              {
                "period": "2026-05",
                "value": 0
              },
              {
                "period": "2026-06",
                "value": 0
              },
              {
                "period": "2026-07",
                "value": 0
              },
              {
                "period": "2026-08",
                "value": 2
              },
              {
                "period": "2026-09",
                "value": 0
              },
              {
                "period": "2026-10",
                "value": 1
              },
              {
                "period": "2026-11",
                "value": 4
              },
              {
                "period": "2026-12",
                "value": 1
              }
            ],
            "label": "Antioquia",
            "dominantFactor": "Article 239. Motorcycle theft (70.6%)",
            "hotspot": "Municipality: Medellin (59.1%)",
            "recommendations": [
              "Prioritize monitoring on Medellin during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 1 cases in Antioquia. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 200.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Antioquia remains Article 239. Motorcycle theft, while Municipality: Medellin (59.1%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Medellin and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "bogota",
            "forecastPeriod": "2026-12",
            "forecastValue": 2,
            "lastObservedValue": 2,
            "changePct": 25.0,
            "direction": "up",
            "accuracyScore": 59.1,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Tendencia ponderada reciente",
            "modelLabelEn": "Weighted recent trend",
            "historyMonths": 193,
            "series": [
              {
                "period": "2025-12",
                "value": 8
              },
              {
                "period": "2026-01",
                "value": 0
              },
              {
                "period": "2026-02",
                "value": 2
              },
              {
                "period": "2026-03",
                "value": 1
              },
              {
                "period": "2026-04",
                "value": 4
              },
              {
                "period": "2026-05",
                "value": 1
              },
              {
                "period": "2026-06",
                "value": 2
              },
              {
                "period": "2026-07",
                "value": 2
              },
              {
                "period": "2026-08",
                "value": 0
              },
              {
                "period": "2026-09",
                "value": 1
              },
              {
                "period": "2026-10",
                "value": 2
              },
              {
                "period": "2026-11",
                "value": 2
              }
            ],
            "label": "Bogota",
            "dominantFactor": "Article 239. Motorcycle theft (53.9%)",
            "hotspot": "Municipality: Bogota D.C. (100.0%)",
            "recommendations": [
              "Prioritize monitoring on Bogota D.C. during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 2 cases in Bogota. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 25.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Bogota remains Article 239. Motorcycle theft, while Municipality: Bogota D.C. (100.0%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Bogota D.C. and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "valle",
            "forecastPeriod": "2027-01",
            "forecastValue": 2,
            "lastObservedValue": 3,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 53.9,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 204,
            "series": [
              {
                "period": "2026-01",
                "value": 2
              },
              {
                "period": "2026-02",
                "value": 1
              },
              {
                "period": "2026-03",
                "value": 3
              },
              {
                "period": "2026-04",
                "value": 1
              },
              {
                "period": "2026-05",
                "value": 1
              },
              {
                "period": "2026-06",
                "value": 0
              },
              {
                "period": "2026-07",
                "value": 0
              },
              {
                "period": "2026-08",
                "value": 1
              },
              {
                "period": "2026-09",
                "value": 2
              },
              {
                "period": "2026-10",
                "value": 2
              },
              {
                "period": "2026-11",
                "value": 1
              },
              {
                "period": "2026-12",
                "value": 3
              }
            ],
            "label": "Valle",
            "dominantFactor": "Article 239. Motorcycle theft (94.3%)",
            "hotspot": "Municipality: Cali (55.9%)",
            "recommendations": [
              "Prioritize monitoring on Cali during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 2 cases in Valle. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Valle remains Article 239. Motorcycle theft, while Municipality: Cali (55.9%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Cali and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "huila",
            "forecastPeriod": "2026-12",
            "forecastValue": 2,
            "lastObservedValue": 2,
            "changePct": -20.0,
            "direction": "down",
            "accuracyScore": 48.3,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Tendencia ponderada reciente",
            "modelLabelEn": "Weighted recent trend",
            "historyMonths": 203,
            "series": [
              {
                "period": "2025-12",
                "value": 7
              },
              {
                "period": "2026-01",
                "value": 2
              },
              {
                "period": "2026-02",
                "value": 0
              },
              {
                "period": "2026-03",
                "value": 0
              },
              {
                "period": "2026-04",
                "value": 2
              },
              {
                "period": "2026-05",
                "value": 1
              },
              {
                "period": "2026-06",
                "value": 2
              },
              {
                "period": "2026-07",
                "value": 2
              },
              {
                "period": "2026-08",
                "value": 1
              },
              {
                "period": "2026-09",
                "value": 1
              },
              {
                "period": "2026-10",
                "value": 1
              },
              {
                "period": "2026-11",
                "value": 2
              }
            ],
            "label": "Huila",
            "dominantFactor": "Article 239. Motorcycle theft (99.1%)",
            "hotspot": "Municipality: Neiva (34.7%)",
            "recommendations": [
              "Prioritize monitoring on Neiva during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 2 cases in Huila. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average falls 20.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Huila remains Article 239. Motorcycle theft, while Municipality: Neiva (34.7%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Neiva and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "cauca",
            "forecastPeriod": "2026-12",
            "forecastValue": 1,
            "lastObservedValue": 3,
            "changePct": 33.3,
            "direction": "up",
            "accuracyScore": 44.1,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 193,
            "series": [
              {
                "period": "2025-12",
                "value": 1
              },
              {
                "period": "2026-01",
                "value": 0
              },
              {
                "period": "2026-02",
                "value": 0
              },
              {
                "period": "2026-03",
                "value": 2
              },
              {
                "period": "2026-04",
                "value": 2
              },
              {
                "period": "2026-05",
                "value": 0
              },
              {
                "period": "2026-06",
                "value": 0
              },
              {
                "period": "2026-07",
                "value": 2
              },
              {
                "period": "2026-08",
                "value": 1
              },
              {
                "period": "2026-09",
                "value": 0
              },
              {
                "period": "2026-10",
                "value": 1
              },
              {
                "period": "2026-11",
                "value": 3
              }
            ],
            "label": "Cauca",
            "dominantFactor": "Article 239. Motorcycle theft (96.1%)",
            "hotspot": "Municipality: Popayan (67.1%)",
            "recommendations": [
              "Prioritize monitoring on Popayan during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 1 cases in Cauca. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 33.3% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Cauca remains Article 239. Motorcycle theft, while Municipality: Popayan (67.1%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Popayan and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "atlantico",
            "forecastPeriod": "2026-12",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 0.0,
            "direction": "stable",
            "accuracyScore": 48.7,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 203,
            "series": [
              {
                "period": "2025-12",
                "value": 4
              },
              {
                "period": "2026-01",
                "value": 2
              },
              {
                "period": "2026-02",
                "value": 1
              },
              {
                "period": "2026-03",
                "value": 1
              },
              {
                "period": "2026-04",
                "value": 0
              },
              {
                "period": "2026-05",
                "value": 0
              },
              {
                "period": "2026-06",
                "value": 1
              },
              {
                "period": "2026-07",
                "value": 1
              },
              {
                "period": "2026-08",
                "value": 0
              },
              {
                "period": "2026-09",
                "value": 0
              },
              {
                "period": "2026-10",
                "value": 1
              },
              {
                "period": "2026-11",
                "value": 1
              }
            ],
            "label": "Atlantico",
            "dominantFactor": "Article 239. Motorcycle theft (83.8%)",
            "hotspot": "Municipality: Barranquilla (49.7%)",
            "recommendations": [
              "Prioritize monitoring on Barranquilla during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 1 cases in Atlantico. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "Recent pressure remains stable versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Atlantico remains Article 239. Motorcycle theft, while Municipality: Barranquilla (49.7%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Barranquilla and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "narino",
            "forecastPeriod": "2027-01",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 50.0,
            "direction": "up",
            "accuracyScore": 36.5,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 195,
            "series": [
              {
                "period": "2026-01",
                "value": 0
              },
              {
                "period": "2026-02",
                "value": 1
              },
              {
                "period": "2026-03",
                "value": 0
              },
              {
                "period": "2026-04",
                "value": 0
              },
              {
                "period": "2026-05",
                "value": 0
              },
              {
                "period": "2026-06",
                "value": 1
              },
              {
                "period": "2026-07",
                "value": 0
              },
              {
                "period": "2026-08",
                "value": 2
              },
              {
                "period": "2026-09",
                "value": 0
              },
              {
                "period": "2026-10",
                "value": 1
              },
              {
                "period": "2026-11",
                "value": 1
              },
              {
                "period": "2026-12",
                "value": 1
              }
            ],
            "label": "Narino",
            "dominantFactor": "Article 239. Motorcycle theft (85.0%)",
            "hotspot": "Municipality: Pasto (43.9%)",
            "recommendations": [
              "Prioritize monitoring on Pasto during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 1 cases in Narino. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 50.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Narino remains Article 239. Motorcycle theft, while Municipality: Pasto (43.9%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Pasto and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "meta",
            "forecastPeriod": "2027-01",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 66.7,
            "direction": "up",
            "accuracyScore": 42.2,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 196,
            "series": [
              {
                "period": "2026-01",
                "value": 0
              },
              {
                "period": "2026-02",
                "value": 0
              },
              {
                "period": "2026-03",
                "value": 0
              },
              {
                "period": "2026-04",
                "value": 0
              },
              {
                "period": "2026-05",
                "value": 1
              },
              {
                "period": "2026-06",
                "value": 1
              },
              {
                "period": "2026-07",
                "value": 0
              },
              {
                "period": "2026-08",
                "value": 2
              },
              {
                "period": "2026-09",
                "value": 1
              },
              {
                "period": "2026-10",
                "value": 2
              },
              {
                "period": "2026-11",
                "value": 2
              },
              {
                "period": "2026-12",
                "value": 1
              }
            ],
            "label": "Meta",
            "dominantFactor": "Article 239. Motorcycle theft (94.9%)",
            "hotspot": "Municipality: Villavicencio (77.5%)",
            "recommendations": [
              "Prioritize monitoring on Villavicencio during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 1 cases in Meta. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 66.7% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Meta remains Article 239. Motorcycle theft, while Municipality: Villavicencio (77.5%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Villavicencio and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "cesar",
            "forecastPeriod": "2026-08",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 0.0,
            "direction": "stable",
            "accuracyScore": 44.1,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 191,
            "series": [
              {
                "period": "2025-08",
                "value": 2
              },
              {
                "period": "2025-09",
                "value": 2
              },
              {
                "period": "2025-10",
                "value": 2
              },
              {
                "period": "2025-11",
                "value": 2
              },
              {
                "period": "2025-12",
                "value": 1
              },
              {
                "period": "2026-01",
                "value": 0
              },
              {
                "period": "2026-02",
                "value": 0
              },
              {
                "period": "2026-03",
                "value": 0
              },
              {
                "period": "2026-04",
                "value": 1
              },
              {
                "period": "2026-05",
                "value": 0
              },
              {
                "period": "2026-06",
                "value": 0
              },
              {
                "period": "2026-07",
                "value": 1
              }
            ],
            "label": "Cesar",
            "dominantFactor": "Article 239. Motorcycle theft (97.1%)",
            "hotspot": "Municipality: Valledupar (52.5%)",
            "recommendations": [
              "Prioritize monitoring on Valledupar during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Cesar. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "Recent pressure remains stable versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Cesar remains Article 239. Motorcycle theft, while Municipality: Valledupar (52.5%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Valledupar and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "bolivar",
            "forecastPeriod": "2027-01",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 41.7,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Tendencia ponderada reciente",
            "modelLabelEn": "Weighted recent trend",
            "historyMonths": 199,
            "series": [
              {
                "period": "2026-01",
                "value": 0
              },
              {
                "period": "2026-02",
                "value": 0
              },
              {
                "period": "2026-03",
                "value": 1
              },
              {
                "period": "2026-04",
                "value": 0
              },
              {
                "period": "2026-05",
                "value": 0
              },
              {
                "period": "2026-06",
                "value": 0
              },
              {
                "period": "2026-07",
                "value": 0
              },
              {
                "period": "2026-08",
                "value": 0
              },
              {
                "period": "2026-09",
                "value": 0
              },
              {
                "period": "2026-10",
                "value": 1
              },
              {
                "period": "2026-11",
                "value": 1
              },
              {
                "period": "2026-12",
                "value": 1
              }
            ],
            "label": "Bolivar",
            "dominantFactor": "Article 239. Motorcycle theft (96.3%)",
            "hotspot": "Municipality: Cartagena (56.7%)",
            "recommendations": [
              "Prioritize monitoring on Cartagena during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 1 cases in Bolivar. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Bolivar remains Article 239. Motorcycle theft, while Municipality: Cartagena (56.7%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Cartagena and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "santander",
            "forecastPeriod": "2027-01",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 44.9,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 179,
            "series": [
              {
                "period": "2026-01",
                "value": 0
              },
              {
                "period": "2026-02",
                "value": 0
              },
              {
                "period": "2026-03",
                "value": 1
              },
              {
                "period": "2026-04",
                "value": 0
              },
              {
                "period": "2026-05",
                "value": 0
              },
              {
                "period": "2026-06",
                "value": 0
              },
              {
                "period": "2026-07",
                "value": 0
              },
              {
                "period": "2026-08",
                "value": 0
              },
              {
                "period": "2026-09",
                "value": 0
              },
              {
                "period": "2026-10",
                "value": 0
              },
              {
                "period": "2026-11",
                "value": 1
              },
              {
                "period": "2026-12",
                "value": 1
              }
            ],
            "label": "Santander",
            "dominantFactor": "Article 239. Motorcycle theft (100.0%)",
            "hotspot": "Municipality: Bucaramanga (41.0%)",
            "recommendations": [
              "Prioritize monitoring on Bucaramanga during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Santander. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Santander remains Article 239. Motorcycle theft, while Municipality: Bucaramanga (41.0%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Bucaramanga and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "norte-de-santander",
            "forecastPeriod": "2027-01",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 33.5,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 167,
            "series": [
              {
                "period": "2026-01",
                "value": 0
              },
              {
                "period": "2026-02",
                "value": 1
              },
              {
                "period": "2026-03",
                "value": 0
              },
              {
                "period": "2026-04",
                "value": 0
              },
              {
                "period": "2026-05",
                "value": 0
              },
              {
                "period": "2026-06",
                "value": 0
              },
              {
                "period": "2026-07",
                "value": 0
              },
              {
                "period": "2026-08",
                "value": 0
              },
              {
                "period": "2026-09",
                "value": 0
              },
              {
                "period": "2026-10",
                "value": 1
              },
              {
                "period": "2026-11",
                "value": 0
              },
              {
                "period": "2026-12",
                "value": 1
              }
            ],
            "label": "Norte de Santander",
            "dominantFactor": "Article 239. Motorcycle theft (89.0%)",
            "hotspot": "Municipality: Cucuta (61.4%)",
            "recommendations": [
              "Prioritize monitoring on Cucuta during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 1 cases in Norte de Santander. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Norte de Santander remains Article 239. Motorcycle theft, while Municipality: Cucuta (61.4%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Cucuta and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "guajira",
            "forecastPeriod": "2026-03",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": -33.3,
            "direction": "down",
            "accuracyScore": 31.7,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 155,
            "series": [
              {
                "period": "2025-03",
                "value": 1
              },
              {
                "period": "2025-04",
                "value": 0
              },
              {
                "period": "2025-05",
                "value": 0
              },
              {
                "period": "2025-06",
                "value": 0
              },
              {
                "period": "2025-07",
                "value": 0
              },
              {
                "period": "2025-08",
                "value": 2
              },
              {
                "period": "2025-09",
                "value": 2
              },
              {
                "period": "2025-10",
                "value": 1
              },
              {
                "period": "2025-11",
                "value": 0
              },
              {
                "period": "2025-12",
                "value": 0
              },
              {
                "period": "2026-01",
                "value": 1
              },
              {
                "period": "2026-02",
                "value": 1
              }
            ],
            "label": "Guajira",
            "dominantFactor": "Article 239. Motorcycle theft (94.5%)",
            "hotspot": "Municipality: Riohacha (58.2%)",
            "recommendations": [
              "Prioritize monitoring on Riohacha during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 1 cases in Guajira. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average falls 33.3% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Guajira remains Article 239. Motorcycle theft, while Municipality: Riohacha (58.2%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Riohacha and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "cundinamarca",
            "forecastPeriod": "2026-12",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 37.5,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 192,
            "series": [
              {
                "period": "2025-12",
                "value": 0
              },
              {
                "period": "2026-01",
                "value": 0
              },
              {
                "period": "2026-02",
                "value": 0
              },
              {
                "period": "2026-03",
                "value": 0
              },
              {
                "period": "2026-04",
                "value": 0
              },
              {
                "period": "2026-05",
                "value": 1
              },
              {
                "period": "2026-06",
                "value": 0
              },
              {
                "period": "2026-07",
                "value": 0
              },
              {
                "period": "2026-08",
                "value": 0
              },
              {
                "period": "2026-09",
                "value": 0
              },
              {
                "period": "2026-10",
                "value": 1
              },
              {
                "period": "2026-11",
                "value": 1
              }
            ],
            "label": "Cundinamarca",
            "dominantFactor": "Article 239. Motorcycle theft (57.6%)",
            "hotspot": "Municipality: Soacha (30.6%)",
            "recommendations": [
              "Prioritize monitoring on Soacha during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Cundinamarca. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Cundinamarca remains Article 239. Motorcycle theft, while Municipality: Soacha (30.6%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Soacha and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "magdalena",
            "forecastPeriod": "2025-09",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 38.3,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 184,
            "series": [
              {
                "period": "2024-09",
                "value": 1
              },
              {
                "period": "2024-10",
                "value": 0
              },
              {
                "period": "2024-11",
                "value": 0
              },
              {
                "period": "2024-12",
                "value": 0
              },
              {
                "period": "2025-01",
                "value": 0
              },
              {
                "period": "2025-02",
                "value": 0
              },
              {
                "period": "2025-03",
                "value": 0
              },
              {
                "period": "2025-04",
                "value": 1
              },
              {
                "period": "2025-05",
                "value": 0
              },
              {
                "period": "2025-06",
                "value": 1
              },
              {
                "period": "2025-07",
                "value": 0
              },
              {
                "period": "2025-08",
                "value": 1
              }
            ],
            "label": "Magdalena",
            "dominantFactor": "Article 239. Motorcycle theft (98.6%)",
            "hotspot": "Municipality: Santa Marta (35.2%)",
            "recommendations": [
              "Prioritize monitoring on Santa Marta during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Magdalena. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Magdalena remains Article 239. Motorcycle theft, while Municipality: Santa Marta (35.2%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Santa Marta and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "tolima",
            "forecastPeriod": "2026-07",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 0.0,
            "direction": "stable",
            "accuracyScore": 56.1,
            "confidence": "low",
            "risk": "medium",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 195,
            "series": [
              {
                "period": "2025-07",
                "value": 0
              },
              {
                "period": "2025-08",
                "value": 1
              },
              {
                "period": "2025-09",
                "value": 2
              },
              {
                "period": "2025-10",
                "value": 1
              },
              {
                "period": "2025-11",
                "value": 0
              },
              {
                "period": "2025-12",
                "value": 1
              },
              {
                "period": "2026-01",
                "value": 0
              },
              {
                "period": "2026-02",
                "value": 1
              },
              {
                "period": "2026-03",
                "value": 0
              },
              {
                "period": "2026-04",
                "value": 0
              },
              {
                "period": "2026-05",
                "value": 0
              },
              {
                "period": "2026-06",
                "value": 1
              }
            ],
            "label": "Tolima",
            "dominantFactor": "Article 239. Motorcycle theft (92.3%)",
            "hotspot": "Municipality: Ibague (38.5%)",
            "recommendations": [
              "Prioritize monitoring on Ibague during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Tolima. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "Recent pressure remains stable versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Tolima remains Article 239. Motorcycle theft, while Municipality: Ibague (38.5%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Ibague and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "choco",
            "forecastPeriod": "2026-01",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 0.0,
            "direction": "stable",
            "accuracyScore": 29.5,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 151,
            "series": [
              {
                "period": "2025-01",
                "value": 2
              },
              {
                "period": "2025-02",
                "value": 0
              },
              {
                "period": "2025-03",
                "value": 0
              },
              {
                "period": "2025-04",
                "value": 1
              },
              {
                "period": "2025-05",
                "value": 0
              },
              {
                "period": "2025-06",
                "value": 0
              },
              {
                "period": "2025-07",
                "value": 1
              },
              {
                "period": "2025-08",
                "value": 1
              },
              {
                "period": "2025-09",
                "value": 0
              },
              {
                "period": "2025-10",
                "value": 0
              },
              {
                "period": "2025-11",
                "value": 1
              },
              {
                "period": "2025-12",
                "value": 1
              }
            ],
            "label": "Choco",
            "dominantFactor": "Article 239. Motorcycle theft (100.0%)",
            "hotspot": "Municipality: Quibdo (98.5%)",
            "recommendations": [
              "Prioritize monitoring on Quibdo during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 1 cases in Choco. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "Recent pressure remains stable versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Choco remains Article 239. Motorcycle theft, while Municipality: Quibdo (98.5%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Quibdo and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "sucre",
            "forecastPeriod": "2025-04",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 45.4,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 169,
            "series": [
              {
                "period": "2024-04",
                "value": 1
              },
              {
                "period": "2024-05",
                "value": 1
              },
              {
                "period": "2024-06",
                "value": 1
              },
              {
                "period": "2024-07",
                "value": 0
              },
              {
                "period": "2024-08",
                "value": 0
              },
              {
                "period": "2024-09",
                "value": 0
              },
              {
                "period": "2024-10",
                "value": 0
              },
              {
                "period": "2024-11",
                "value": 0
              },
              {
                "period": "2024-12",
                "value": 1
              },
              {
                "period": "2025-01",
                "value": 0
              },
              {
                "period": "2025-02",
                "value": 1
              },
              {
                "period": "2025-03",
                "value": 1
              }
            ],
            "label": "Sucre",
            "dominantFactor": "Article 239. Motorcycle theft (98.4%)",
            "hotspot": "Municipality: Sincelejo (62.3%)",
            "recommendations": [
              "Prioritize monitoring on Sincelejo during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Sucre. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Sucre remains Article 239. Motorcycle theft, while Municipality: Sincelejo (62.3%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Sincelejo and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "casanare",
            "forecastPeriod": "2026-07",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 39.9,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 155,
            "series": [
              {
                "period": "2025-07",
                "value": 0
              },
              {
                "period": "2025-08",
                "value": 0
              },
              {
                "period": "2025-09",
                "value": 0
              },
              {
                "period": "2025-10",
                "value": 0
              },
              {
                "period": "2025-11",
                "value": 1
              },
              {
                "period": "2025-12",
                "value": 1
              },
              {
                "period": "2026-01",
                "value": 0
              },
              {
                "period": "2026-02",
                "value": 0
              },
              {
                "period": "2026-03",
                "value": 0
              },
              {
                "period": "2026-04",
                "value": 0
              },
              {
                "period": "2026-05",
                "value": 0
              },
              {
                "period": "2026-06",
                "value": 1
              }
            ],
            "label": "Casanare",
            "dominantFactor": "Article 239. Motorcycle theft (97.8%)",
            "hotspot": "Municipality: Yopal (75.6%)",
            "recommendations": [
              "Prioritize monitoring on Yopal during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Casanare. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Casanare remains Article 239. Motorcycle theft, while Municipality: Yopal (75.6%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Yopal and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "cordoba",
            "forecastPeriod": "2026-01",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 0.0,
            "direction": "stable",
            "accuracyScore": 44.3,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 155,
            "series": [
              {
                "period": "2025-01",
                "value": 0
              },
              {
                "period": "2025-02",
                "value": 0
              },
              {
                "period": "2025-03",
                "value": 0
              },
              {
                "period": "2025-04",
                "value": 0
              },
              {
                "period": "2025-05",
                "value": 0
              },
              {
                "period": "2025-06",
                "value": 2
              },
              {
                "period": "2025-07",
                "value": 1
              },
              {
                "period": "2025-08",
                "value": 0
              },
              {
                "period": "2025-09",
                "value": 0
              },
              {
                "period": "2025-10",
                "value": 0
              },
              {
                "period": "2025-11",
                "value": 0
              },
              {
                "period": "2025-12",
                "value": 1
              }
            ],
            "label": "Cordoba",
            "dominantFactor": "Article 239. Motorcycle theft (93.2%)",
            "hotspot": "Municipality: Monteria (34.1%)",
            "recommendations": [
              "Prioritize monitoring on Monteria during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Cordoba. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "Recent pressure remains stable versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Cordoba remains Article 239. Motorcycle theft, while Municipality: Monteria (34.1%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Monteria and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "caqueta",
            "forecastPeriod": "2026-01",
            "forecastValue": 1,
            "lastObservedValue": 2,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 61.4,
            "confidence": "medium",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 186,
            "series": [
              {
                "period": "2025-01",
                "value": 0
              },
              {
                "period": "2025-02",
                "value": 0
              },
              {
                "period": "2025-03",
                "value": 0
              },
              {
                "period": "2025-04",
                "value": 0
              },
              {
                "period": "2025-05",
                "value": 0
              },
              {
                "period": "2025-06",
                "value": 0
              },
              {
                "period": "2025-07",
                "value": 0
              },
              {
                "period": "2025-08",
                "value": 0
              },
              {
                "period": "2025-09",
                "value": 0
              },
              {
                "period": "2025-10",
                "value": 0
              },
              {
                "period": "2025-11",
                "value": 0
              },
              {
                "period": "2025-12",
                "value": 2
              }
            ],
            "label": "Caqueta",
            "dominantFactor": "Article 239. Motorcycle theft (97.5%)",
            "hotspot": "Municipality: Florencia (72.5%)",
            "recommendations": [
              "Prioritize monitoring on Florencia during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 1 cases in Caqueta. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is medium.",
              "focus": "The main focus in Caqueta remains Article 239. Motorcycle theft, while Municipality: Florencia (72.5%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Florencia and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "quindio",
            "forecastPeriod": "2026-09",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 73.9,
            "confidence": "medium",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 156,
            "series": [
              {
                "period": "2025-09",
                "value": 0
              },
              {
                "period": "2025-10",
                "value": 0
              },
              {
                "period": "2025-11",
                "value": 0
              },
              {
                "period": "2025-12",
                "value": 0
              },
              {
                "period": "2026-01",
                "value": 0
              },
              {
                "period": "2026-02",
                "value": 0
              },
              {
                "period": "2026-03",
                "value": 0
              },
              {
                "period": "2026-04",
                "value": 0
              },
              {
                "period": "2026-05",
                "value": 0
              },
              {
                "period": "2026-06",
                "value": 0
              },
              {
                "period": "2026-07",
                "value": 0
              },
              {
                "period": "2026-08",
                "value": 1
              }
            ],
            "label": "Quindio",
            "dominantFactor": "Article 239. Motorcycle theft (51.9%)",
            "hotspot": "Municipality: Armenia (70.4%)",
            "recommendations": [
              "Prioritize monitoring on Armenia during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Quindio. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is medium.",
              "focus": "The main focus in Quindio remains Article 239. Motorcycle theft, while Municipality: Armenia (70.4%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Armenia and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "risaralda",
            "forecastPeriod": "2025-09",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 70.3,
            "confidence": "medium",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 151,
            "series": [
              {
                "period": "2024-09",
                "value": 0
              },
              {
                "period": "2024-10",
                "value": 0
              },
              {
                "period": "2024-11",
                "value": 0
              },
              {
                "period": "2024-12",
                "value": 1
              },
              {
                "period": "2025-01",
                "value": 0
              },
              {
                "period": "2025-02",
                "value": 0
              },
              {
                "period": "2025-03",
                "value": 0
              },
              {
                "period": "2025-04",
                "value": 0
              },
              {
                "period": "2025-05",
                "value": 0
              },
              {
                "period": "2025-06",
                "value": 0
              },
              {
                "period": "2025-07",
                "value": 0
              },
              {
                "period": "2025-08",
                "value": 1
              }
            ],
            "label": "Risaralda",
            "dominantFactor": "Article 239. Motorcycle theft (83.3%)",
            "hotspot": "Municipality: Pereira (37.5%)",
            "recommendations": [
              "Prioritize monitoring on Pereira during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Risaralda. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is medium.",
              "focus": "The main focus in Risaralda remains Article 239. Motorcycle theft, while Municipality: Pereira (37.5%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Pereira and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "putumayo",
            "forecastPeriod": "2026-11",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 82.4,
            "confidence": "high",
            "risk": "high",
            "modelLabelEs": "Tendencia reciente + estacionalidad",
            "modelLabelEn": "Recent trend + seasonality",
            "historyMonths": 160,
            "series": [
              {
                "period": "2025-11",
                "value": 0
              },
              {
                "period": "2025-12",
                "value": 0
              },
              {
                "period": "2026-01",
                "value": 0
              },
              {
                "period": "2026-02",
                "value": 1
              },
              {
                "period": "2026-03",
                "value": 0
              },
              {
                "period": "2026-04",
                "value": 0
              },
              {
                "period": "2026-05",
                "value": 0
              },
              {
                "period": "2026-06",
                "value": 0
              },
              {
                "period": "2026-07",
                "value": 0
              },
              {
                "period": "2026-08",
                "value": 0
              },
              {
                "period": "2026-09",
                "value": 0
              },
              {
                "period": "2026-10",
                "value": 1
              }
            ],
            "label": "Putumayo",
            "dominantFactor": "Article 239. Motorcycle theft (100.0%)",
            "hotspot": "Municipality: Valle del Guamuez (40.0%)",
            "recommendations": [
              "Prioritize monitoring on Valle del Guamuez during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Putumayo. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is high.",
              "focus": "The main focus in Putumayo remains Article 239. Motorcycle theft, while Municipality: Valle del Guamuez (40.0%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Valle del Guamuez and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "caldas",
            "forecastPeriod": "2025-08",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 0.0,
            "direction": "stable",
            "accuracyScore": 87.4,
            "confidence": "high",
            "risk": "high",
            "modelLabelEs": "Tendencia reciente + estacionalidad",
            "modelLabelEn": "Recent trend + seasonality",
            "historyMonths": 139,
            "series": [
              {
                "period": "2024-08",
                "value": 0
              },
              {
                "period": "2024-09",
                "value": 0
              },
              {
                "period": "2024-10",
                "value": 0
              },
              {
                "period": "2024-11",
                "value": 0
              },
              {
                "period": "2024-12",
                "value": 0
              },
              {
                "period": "2025-01",
                "value": 0
              },
              {
                "period": "2025-02",
                "value": 0
              },
              {
                "period": "2025-03",
                "value": 0
              },
              {
                "period": "2025-04",
                "value": 1
              },
              {
                "period": "2025-05",
                "value": 0
              },
              {
                "period": "2025-06",
                "value": 0
              },
              {
                "period": "2025-07",
                "value": 1
              }
            ],
            "label": "Caldas",
            "dominantFactor": "Article 239. Motorcycle theft (85.7%)",
            "hotspot": "Municipality: Manizales (21.4%)",
            "recommendations": [
              "Prioritize monitoring on Manizales during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Caldas. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "Recent pressure remains stable versus the previous window. Current operational confidence is high.",
              "focus": "The main focus in Caldas remains Article 239. Motorcycle theft, while Municipality: Manizales (21.4%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Manizales and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "boyaca",
            "forecastPeriod": "2026-01",
            "forecastValue": 0,
            "lastObservedValue": 2,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 87.9,
            "confidence": "high",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 152,
            "series": [
              {
                "period": "2025-01",
                "value": 0
              },
              {
                "period": "2025-02",
                "value": 0
              },
              {
                "period": "2025-03",
                "value": 0
              },
              {
                "period": "2025-04",
                "value": 0
              },
              {
                "period": "2025-05",
                "value": 0
              },
              {
                "period": "2025-06",
                "value": 0
              },
              {
                "period": "2025-07",
                "value": 0
              },
              {
                "period": "2025-08",
                "value": 1
              },
              {
                "period": "2025-09",
                "value": 0
              },
              {
                "period": "2025-10",
                "value": 0
              },
              {
                "period": "2025-11",
                "value": 0
              },
              {
                "period": "2025-12",
                "value": 2
              }
            ],
            "label": "Boyaca",
            "dominantFactor": "Article 239. Motor vehicle theft (58.3%)",
            "hotspot": "Municipality: Sogamoso (33.3%)",
            "recommendations": [
              "Prioritize monitoring on Sogamoso during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motor vehicle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Boyaca. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is high.",
              "focus": "The main focus in Boyaca remains Article 239. Motor vehicle theft, while Municipality: Sogamoso (33.3%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Sogamoso and check whether Article 239. Motor vehicle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "arauca",
            "forecastPeriod": "2025-10",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 90.6,
            "confidence": "high",
            "risk": "high",
            "modelLabelEs": "Promedio movil 6 meses",
            "modelLabelEn": "6-month moving average",
            "historyMonths": 152,
            "series": [
              {
                "period": "2024-10",
                "value": 0
              },
              {
                "period": "2024-11",
                "value": 0
              },
              {
                "period": "2024-12",
                "value": 0
              },
              {
                "period": "2025-01",
                "value": 1
              },
              {
                "period": "2025-02",
                "value": 0
              },
              {
                "period": "2025-03",
                "value": 0
              },
              {
                "period": "2025-04",
                "value": 0
              },
              {
                "period": "2025-05",
                "value": 0
              },
              {
                "period": "2025-06",
                "value": 0
              },
              {
                "period": "2025-07",
                "value": 0
              },
              {
                "period": "2025-08",
                "value": 0
              },
              {
                "period": "2025-09",
                "value": 1
              }
            ],
            "label": "Arauca",
            "dominantFactor": "Article 239. Motorcycle theft (77.8%)",
            "hotspot": "Municipality: Tame (33.3%)",
            "recommendations": [
              "Prioritize monitoring on Tame during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Arauca. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is high.",
              "focus": "The main focus in Arauca remains Article 239. Motorcycle theft, while Municipality: Tame (33.3%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Tame and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "san-andres",
            "forecastPeriod": "2024-12",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 93.5,
            "confidence": "high",
            "risk": "high",
            "modelLabelEs": "Ultimo valor",
            "modelLabelEn": "Last value",
            "historyMonths": 156,
            "series": [
              {
                "period": "2023-12",
                "value": 0
              },
              {
                "period": "2024-01",
                "value": 0
              },
              {
                "period": "2024-02",
                "value": 0
              },
              {
                "period": "2024-03",
                "value": 0
              },
              {
                "period": "2024-04",
                "value": 0
              },
              {
                "period": "2024-05",
                "value": 0
              },
              {
                "period": "2024-06",
                "value": 0
              },
              {
                "period": "2024-07",
                "value": 0
              },
              {
                "period": "2024-08",
                "value": 0
              },
              {
                "period": "2024-09",
                "value": 0
              },
              {
                "period": "2024-10",
                "value": 0
              },
              {
                "period": "2024-11",
                "value": 1
              }
            ],
            "label": "San Andres",
            "dominantFactor": "Article 239. Motorcycle theft (100.0%)",
            "hotspot": "Municipality: San Andres (100.0%)",
            "recommendations": [
              "Prioritize monitoring on San Andres during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 1 cases in San Andres. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is high.",
              "focus": "The main focus in San Andres remains Article 239. Motorcycle theft, while Municipality: San Andres (100.0%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on San Andres and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "amazonas",
            "forecastPeriod": "2026-10",
            "forecastValue": 0,
            "lastObservedValue": 1,
            "changePct": 100.0,
            "direction": "up",
            "accuracyScore": 95.7,
            "confidence": "high",
            "risk": "high",
            "modelLabelEs": "Tendencia reciente + estacionalidad",
            "modelLabelEn": "Recent trend + seasonality",
            "historyMonths": 150,
            "series": [
              {
                "period": "2025-10",
                "value": 0
              },
              {
                "period": "2025-11",
                "value": 0
              },
              {
                "period": "2025-12",
                "value": 0
              },
              {
                "period": "2026-01",
                "value": 0
              },
              {
                "period": "2026-02",
                "value": 0
              },
              {
                "period": "2026-03",
                "value": 0
              },
              {
                "period": "2026-04",
                "value": 0
              },
              {
                "period": "2026-05",
                "value": 0
              },
              {
                "period": "2026-06",
                "value": 0
              },
              {
                "period": "2026-07",
                "value": 0
              },
              {
                "period": "2026-08",
                "value": 0
              },
              {
                "period": "2026-09",
                "value": 1
              }
            ],
            "label": "Amazonas",
            "dominantFactor": "Article 239. Motorcycle theft (100.0%)",
            "hotspot": "Municipality: Leticia (100.0%)",
            "recommendations": [
              "Prioritize monitoring on Leticia during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 0 cases in Amazonas. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "The recent average rises 100.0% versus the previous window. Current operational confidence is high.",
              "focus": "The main focus in Amazonas remains Article 239. Motorcycle theft, while Municipality: Leticia (100.0%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Leticia and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "vaupes",
            "forecastPeriod": "2015-11",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 0.0,
            "direction": "stable",
            "accuracyScore": 0.0,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 1,
            "series": [
              {
                "period": "2015-10",
                "value": 1
              }
            ],
            "label": "Vaupes",
            "dominantFactor": "Article 239. Motorcycle theft (100.0%)",
            "hotspot": "Municipality: Mitu (100.0%)",
            "recommendations": [
              "Prioritize monitoring on Mitu during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 1 cases in Vaupes. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "Recent pressure remains stable versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Vaupes remains Article 239. Motorcycle theft, while Municipality: Mitu (100.0%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on Mitu and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          },
          {
            "id": "guaviare",
            "forecastPeriod": "2022-08",
            "forecastValue": 1,
            "lastObservedValue": 1,
            "changePct": 0.0,
            "direction": "stable",
            "accuracyScore": 0.0,
            "confidence": "low",
            "risk": "high",
            "modelLabelEs": "Promedio movil 3 meses",
            "modelLabelEn": "3-month moving average",
            "historyMonths": 1,
            "series": [
              {
                "period": "2022-07",
                "value": 1
              }
            ],
            "label": "Guaviare",
            "dominantFactor": "Article 239. Motorcycle theft (100.0%)",
            "hotspot": "Municipality: San Jose del Guaviare (100.0%)",
            "recommendations": [
              "Prioritize monitoring on San Jose del Guaviare during the next operating window, because it holds the largest load inside the selected territory.",
              "Cross the forecast with the dominant modality to verify whether Article 239. Motorcycle theft is still driving the expected behavior.",
              "Read this output as operational guidance based on previous behavior and not as the current calendar date."
            ],
            "answers": {
              "forecast": "In the next operating window, the baseline scenario estimates 1 cases in Guaviare. The reading is based on the territory's recent behavior and should be understood as the next expected cut, not as the current calendar date.",
              "pressure": "Recent pressure remains stable versus the previous window. Current operational confidence is low.",
              "focus": "The main focus in Guaviare remains Article 239. Motorcycle theft, while Municipality: San Jose del Guaviare (100.0%) keeps the strongest territorial pressure.",
              "action": "The most useful action is to reinforce monitoring on San Jose del Guaviare and check whether Article 239. Motorcycle theft keeps its weight through the next operating window."
            }
          }
        ]
      }
    }
  }
} as Record<Language, Record<DashboardAiKey, AiReport>>;

export function getAiReport(language: Language, key: DashboardAiKey): AiReport {
  return aiReports[language][key];
}
