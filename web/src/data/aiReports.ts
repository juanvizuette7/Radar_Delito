import { Language } from "../context/UiContext";

export type AiReportMetric = {
  label: string;
  value: string;
};

export type AiReportItem = {
  title: string;
  description: string;
};

export type AiReport = {
  summary: string;
  metrics: AiReportMetric[];
  findings: AiReportItem[];
  actions: AiReportItem[];
  coverageNote: string;
};

type DashboardAiKey = "homicidios" | "sexuales" | "hurtos";

const aiReports: Record<Language, Record<DashboardAiKey, AiReport>> = {
  "es": {
    "homicidios": {
      "summary": "La lectura asistida sobre homicidios muestra 10.114 casos acumulados en 7.367 registros, con corte entre 2003-01-01 y 2003-06-01. El patron dominante combina arma de fuego (84.8%), concentracion territorial en Antioquia (19.8%) y una victimizacion principalmente masculino (91.7%).",
      "metrics": [
        {
          "label": "Cobertura temporal",
          "value": "2003-01-01 a 2003-06-01"
        },
        {
          "label": "Foco principal",
          "value": "Antioquia 19.8%"
        },
        {
          "label": "Patron dominante",
          "value": "Arma De Fuego 84.8%"
        }
      ],
      "findings": [
        {
          "title": "Concentracion territorial",
          "description": "Antioquia aporta 19.8% del total y los cinco primeros departamentos concentran 52.8%. Medellin lidera a nivel municipal con 957 casos (9.5%)."
        },
        {
          "title": "Patron operativo dominante",
          "description": "Arma De Fuego explica 84.8% de los casos y la ocurrencia se inclina hacia zona urbana (65.8%). El mes de mayor peso en el corte fue 03 con 2.061 casos."
        },
        {
          "title": "Brecha de caracterizacion",
          "description": "La modalidad no reportada representa 68.9%, lo que reduce el nivel de detalle disponible para interpretar motivaciones y dinamicas del hecho."
        }
      ],
      "actions": [
        {
          "title": "Priorizar focos territoriales",
          "description": "Antioquia, Valle del Cauca y Bogota D.C. aparecen como el nucleo mas fuerte del corte, por lo que conviene enfocar comparacion operativa y seguimiento mensual en esos territorios."
        },
        {
          "title": "Mejorar completitud del registro",
          "description": "La modalidad reportada necesita mayor completitud para enriquecer la lectura de homicidios, especialmente si se quiere cruzar con arma, zona y perfil de victima."
        }
      ],
      "coverageNote": "Base IA: 7.367 registros y 10.114 casos. El corte disponible se concentra en 2003 y alcanza su mayor volumen mensual en 03."
    },
    "sexuales": {
      "summary": "La lectura asistida de delitos sexuales identifica 10.000 casos en 9.521 registros entre 2010-01-01 y 2017-02-01. El pico se ubica en 2012 con 2.714 casos, con mayor peso territorial en Bogota (14.7%) y una victimizacion principalmente femenino (83.7%).",
      "metrics": [
        {
          "label": "Cobertura temporal",
          "value": "2010-01-01 a 2017-02-01"
        },
        {
          "label": "Foco principal",
          "value": "Bogota 14.7%"
        },
        {
          "label": "Delito dominante",
          "value": "23.5% del total"
        }
      ],
      "findings": [
        {
          "title": "Concentracion temporal y territorial",
          "description": "El ano 2012 concentra 27.1% del total. Bogota lidera con 1.473 casos (14.7%) y Bogota D.C. concentra por si sola 14.7%."
        },
        {
          "title": "Perfil de victimizacion",
          "description": "Femenino representa 83.7% y el grupo adultos aporta 54.1%. Si se agrupan menores y adolescentes, el peso conjunto llega a 45.8%, lo que exige lectura diferenciada por ciclo de vida."
        },
        {
          "title": "Limite de calidad del registro",
          "description": "La variable armas o medios aparece como no reportada en 100.0% de la base, por lo que la explicacion contextual del hecho depende mas del tipo penal y del perfil territorial."
        }
      ],
      "actions": [
        {
          "title": "Focalizar seguimiento territorial",
          "description": "Bogota, Valle y Santander deben ser el primer eje de seguimiento comparado por volumen y persistencia del registro."
        },
        {
          "title": "Separar lineas de atencion por edad",
          "description": "La mezcla entre adultos, menores y adolescentes sugiere construir consultas y alertas separadas para evitar lecturas planas."
        }
      ],
      "coverageNote": "Base IA: 9.521 registros y 10.000 casos. El mes de mayor carga fue 05 con 1.072 casos."
    },
    "hurtos": {
      "summary": "La lectura asistida de hurtos de vehiculos registra 10.000 casos en 9.584 eventos entre 2010-02-04 y 2026-03-31. El mayor volumen aparece en 2024 con 1.507 casos, con foco territorial en Antioquia (14.0%) y dominio claro del articulo 239. hurto motocicletas (85.0%).",
      "metrics": [
        {
          "label": "Cobertura temporal",
          "value": "2010-02-04 a 2026-03-31"
        },
        {
          "label": "Foco principal",
          "value": "Antioquia 14.0%"
        },
        {
          "label": "Modalidad dominante",
          "value": "Articulo 239. Hurto Motocicletas 85.0%"
        }
      ],
      "findings": [
        {
          "title": "Escalada reciente del registro",
          "description": "El bloque 2023-2025 concentra 42.8% del total y 2024 marca el punto mas alto con 1.507 casos. El corte 2026 llega hasta 2026-03-31, por lo que debe leerse como periodo parcial."
        },
        {
          "title": "Patron operativo dominante",
          "description": "Articulo 239. Hurto Motocicletas explica 85.0% de la base. El registro aparece principalmente en masculino (80.3%) y en el grupo adultos (98.0%)."
        },
        {
          "title": "Focos y condicion del hecho",
          "description": "Antioquia, Bogota y Valle concentran una parte importante del volumen, mientras Bogota D.C. lidera a nivel municipal con 1.102 casos (11.0%). En la variable de armas o medios domina arma blanca / cortopunzante (81.5%)."
        }
      ],
      "actions": [
        {
          "title": "Seguir la ventana 2023-2025",
          "description": "Ese tramo concentra la mayor presion reciente y sirve como base para contrastar comportamiento por ciudad y tipo de hurto."
        },
        {
          "title": "Separar motocicletas y automotores",
          "description": "La predominancia de hurto a motocicletas aconseja indicadores y alertas propios para no mezclar dinamicas con automotores."
        }
      ],
      "coverageNote": "Base IA: 9.584 registros y 10.000 casos. Los cinco primeros departamentos concentran 53.2% y el mes de mayor carga fue 11."
    }
  },
  "en": {
    "homicidios": {
      "summary": "The assisted reading for homicides shows 10,114 accumulated cases across 7,367 records, covering 2003-01-01 to 2003-06-01. The dominant pattern combines firearm (84.8%), territorial concentration in Antioquia (19.8%) and mainly male victims (91.7%).",
      "metrics": [
        {
          "label": "Time coverage",
          "value": "2003-01-01 to 2003-06-01"
        },
        {
          "label": "Main hotspot",
          "value": "Antioquia 19.8%"
        },
        {
          "label": "Dominant pattern",
          "value": "Firearm 84.8%"
        }
      ],
      "findings": [
        {
          "title": "Territorial concentration",
          "description": "Antioquia contributes 19.8% of the total and the top five departments account for 52.8%. Medellin leads at municipality level with 957 cases (9.5%)."
        },
        {
          "title": "Dominant operational pattern",
          "description": "Firearm explains 84.8% of cases and the events lean toward urban areas (65.8%). The heaviest month in the cut was 03 with 2,061 cases."
        },
        {
          "title": "Characterization gap",
          "description": "Not Reported represents 68.9%, reducing the detail available to interpret motivations and operational dynamics behind the events."
        }
      ],
      "actions": [
        {
          "title": "Prioritize territorial hotspots",
          "description": "Antioquia, Valle del Cauca and Bogota D.C. form the strongest cluster in the cut, so they should be the first comparison axis for operational review and follow-up."
        },
        {
          "title": "Improve field completeness",
          "description": "Reported modality needs better completion to enrich homicide interpretation, especially when crossing weapon, area and victim profile."
        }
      ],
      "coverageNote": "AI base: 7,367 records and 10,114 cases. The available cut is concentrated in 2003 and reaches its highest monthly volume in 03."
    },
    "sexuales": {
      "summary": "The assisted reading for sexual crimes identifies 10,000 cases across 9,521 records between 2010-01-01 and 2017-02-01. The peak occurs in 2012 with 2,714 cases, with the strongest territorial weight in Bogota (14.7%) and mainly female victims (83.7%).",
      "metrics": [
        {
          "label": "Time coverage",
          "value": "2010-01-01 to 2017-02-01"
        },
        {
          "label": "Main hotspot",
          "value": "Bogota 14.7%"
        },
        {
          "label": "Dominant offense",
          "value": "23.5% of the total"
        }
      ],
      "findings": [
        {
          "title": "Temporal and territorial concentration",
          "description": "The year 2012 concentrates 27.1% of the total. Bogota leads with 1,473 cases (14.7%) and Bogota D.C. alone accounts for 14.7%."
        },
        {
          "title": "Victim profile",
          "description": "Female accounts for 83.7% and the adults group adds 54.1%. When minors and teenagers are combined, their joint weight reaches 45.8%, which calls for age-specific interpretation."
        },
        {
          "title": "Data quality limit",
          "description": "The weapons or methods field is not reported in 100.0% of the dataset, so contextual interpretation depends more on offense type and territorial profile."
        }
      ],
      "actions": [
        {
          "title": "Focus territorial monitoring",
          "description": "Bogota, Valle and Santander should be the first comparison axis because of their weight and persistence in the records."
        },
        {
          "title": "Separate response lines by age",
          "description": "The mix of adults, minors and teenagers suggests building separate alerts and queries to avoid flat interpretation."
        }
      ],
      "coverageNote": "AI base: 9,521 records and 10,000 cases. The heaviest month was 05 with 1,072 cases."
    },
    "hurtos": {
      "summary": "The assisted reading for vehicle theft records 10,000 cases across 9,584 events between 2010-02-04 and 2026-03-31. The highest volume appears in 2024 with 1,507 cases, with territorial focus in Antioquia (14.0%) and a clear dominance of article 239. motorcycle theft (85.0%).",
      "metrics": [
        {
          "label": "Time coverage",
          "value": "2010-02-04 to 2026-03-31"
        },
        {
          "label": "Main hotspot",
          "value": "Antioquia 14.0%"
        },
        {
          "label": "Dominant modality",
          "value": "Article 239. Motorcycle Theft 85.0%"
        }
      ],
      "findings": [
        {
          "title": "Recent rise in records",
          "description": "The 2023-2025 block concentrates 42.8% of the total and 2024 marks the highest point with 1,507 cases. The 2026 cut reaches 2026-03-31, so it should be treated as a partial period."
        },
        {
          "title": "Dominant operational pattern",
          "description": "Article 239. Motorcycle Theft explains 85.0% of the dataset. The record is mainly found in male victims (80.3%) and in the adults group (98.0%)."
        },
        {
          "title": "Hotspots and event condition",
          "description": "Antioquia, Bogota and Valle hold a large share of the volume, while Bogota D.C. leads at municipality level with 1,102 cases (11.0%). The weapons or methods field is dominated by sharp weapon (81.5%)."
        }
      ],
      "actions": [
        {
          "title": "Track the 2023-2025 window",
          "description": "That period concentrates the strongest recent pressure and is the best baseline for comparisons by city and theft type."
        },
        {
          "title": "Separate motorcycles from automobiles",
          "description": "The dominance of motorcycle theft supports dedicated indicators and alerts instead of mixing the pattern with automobiles."
        }
      ],
      "coverageNote": "AI base: 9,584 records and 10,000 cases. The top five departments account for 53.2% and the heaviest month was 11."
    }
  }
} as Record<Language, Record<DashboardAiKey, AiReport>>;

export function getAiReport(language: Language, key: DashboardAiKey): AiReport {
  return aiReports[language][key];
}
