import type { Language } from "../context/UiContext";

type KPIItem = {
  label: string;
  value: string;
  detail: string;
};

type HypothesisItem = {
  label: string;
  description: string;
};

type StepItem = {
  step: string;
  title: string;
  description: string;
};

type ExplainCard = {
  title: string;
  description: string;
};

type AnalysisCard = {
  title: string;
  group: string;
  target: string;
  question: string;
};

type IndicatorRow = {
  dashboard: string;
  indicator: string;
  group: string;
};

type SummaryRow = {
  dashboard: string;
  group: string;
  fStatistic: string;
  pValue: string;
  decision: string;
  interpretation: string;
};

type TukeyRow = {
  groupA: string;
  groupB: string;
  significant: string;
  reading: string;
};

type TukeySection = {
  title: string;
  subtitle: string;
  rows: TukeyRow[];
};

type StatisticsContent = {
  introBadge: string;
  pageTitle: string;
  pageDescription: string;
  introText: string;
  finalTitle: string;
  finalDescription: string;
  whyTitle: string;
  whyDescription: string;
  kpis: KPIItem[];
  hypothesisTitle: string;
  stepsTitle: string;
  hypotheses: HypothesisItem[];
  steps: StepItem[];
  explainCards: ExplainCard[];
  analysesTitle: string;
  analysesDescription: string;
  analysisCards: AnalysisCard[];
  indicatorTitle: string;
  indicatorDescription: string;
  indicatorColumns: {
    dashboard: string;
    indicator: string;
    group: string;
  };
  indicatorRows: IndicatorRow[];
  operationsTitle: string;
  operationsDescription: string;
  operationsPoints: string[];
  summaryTitle: string;
  summaryDescription: string;
  summaryColumns: {
    dashboard: string;
    group: string;
    fStatistic: string;
    pValue: string;
    decision: string;
    interpretation: string;
  };
  summaryRows: SummaryRow[];
  tukeyTitle: string;
  tukeyDescription: string;
  tukeyColumns: {
    groupA: string;
    groupB: string;
    significant: string;
    reading: string;
  };
  tukeySections: TukeySection[];
};

const tukeyReadingEs =
  "Estos grupos presentan diferencias significativas en la cantidad agregada de casos.";

const tukeyReadingEn =
  "These groups show significant differences in the aggregated number of cases.";

const statisticsContent: Record<Language, StatisticsContent> = {
  es: {
    introBadge: "Validacion estadistica",
    pageTitle: "Validacion estadistica: ANOVA y Tukey",
    pageDescription:
      "Como complemento a los dashboards, se aplicaron pruebas ANOVA por separado para cada tipo de delito. Esto permite validar si las diferencias observadas dentro de cada dashboard son estadisticamente significativas.",
    introText:
      "La comparacion entre homicidios, delitos sexuales y hurto de vehiculos se mantiene como una lectura descriptiva. La validacion formal se realizo dentro de cada dashboard para no mezclar datasets con periodos y estructuras diferentes.",
    finalTitle: "Conclusion facil",
    finalDescription:
      "Los resultados sugieren diferencias significativas dentro de cada dashboard, lo que complementa la interpretacion visual de los datos.",
    whyTitle: "Por que se hizo asi",
    whyDescription:
      "Los tres datasets no cubren los mismos periodos ni tienen la misma estructura. Por eso ANOVA no se usa aqui para compararlos entre si, sino para revisar diferencias internas dentro de cada dashboard.",
    kpis: [
      {
        label: "Homicidios",
        value: "F = 12.94",
        detail:
          "p < 0.001. Se rechaza H0 y se observan diferencias significativas entre departamentos.",
      },
      {
        label: "Delitos sexuales",
        value: "F = 58.60",
        detail:
          "p < 0.001. Se rechaza H0 y se observan diferencias significativas entre grupos etarios.",
      },
      {
        label: "Hurto de vehiculos",
        value: "F = 25.74",
        detail:
          "p < 0.001. Se rechaza H0 y se observan diferencias significativas entre departamentos.",
      },
    ],
    hypothesisTitle: "Hipotesis",
    stepsTitle: "Que hicimos en esta prueba",
    hypotheses: [
      {
        label: "H0",
        description:
          "No existen diferencias significativas entre los grupos analizados dentro de cada dashboard.",
      },
      {
        label: "H1",
        description:
          "Existen diferencias significativas entre al menos dos grupos dentro de cada dashboard.",
      },
    ],
    steps: [
      {
        step: "1",
        title: "Tomamos cada dashboard por separado",
        description:
          "Se revisaron homicidios, delitos sexuales y hurto de vehiculos como analisis independientes.",
      },
      {
        step: "2",
        title: "Agrupamos la cantidad de casos",
        description:
          "Se agrego la cantidad por grupos internos coherentes, como departamentos o grupos etarios.",
      },
      {
        step: "3",
        title: "Aplicamos ANOVA",
        description:
          "La prueba ANOVA indica si las diferencias observadas entre grupos son significativas o si podrian deberse al azar.",
      },
      {
        step: "4",
        title: "Revisamos Tukey",
        description:
          "La prueba Tukey ayuda a identificar entre que grupos aparecen las diferencias significativas.",
      },
    ],
    explainCards: [
      {
        title: "Que significa ANOVA",
        description:
          "ANOVA es una prueba que sirve para comparar varios grupos al mismo tiempo. Aqui se usa para revisar si la cantidad de casos cambia de forma significativa dentro de cada dashboard.",
      },
      {
        title: "Que significa el p-valor",
        description:
          "El p-valor ayuda a decidir si una diferencia es importante. Cuando es menor que 0.05, se rechaza H0 y la diferencia se considera significativa.",
      },
      {
        title: "Que significa Tukey",
        description:
          "Despues de observar diferencias generales con ANOVA, Tukey permite ubicar entre que grupos se presentan esas diferencias.",
      },
    ],
    analysesTitle: "Analisis realizados",
    analysesDescription:
      "Cada dashboard se valido por separado, usando la variable cantidad y un grupo interno coherente con la estructura de sus datos.",
    analysisCards: [
      {
        title: "Homicidios",
        group: "Departamentos",
        target: "Cantidad",
        question: "Hay diferencias significativas entre departamentos?",
      },
      {
        title: "Delitos sexuales",
        group: "Grupo etario",
        target: "Cantidad",
        question: "Hay diferencias significativas entre grupos etarios?",
      },
      {
        title: "Hurto de vehiculos",
        group: "Departamentos",
        target: "Cantidad",
        question: "Hay diferencias significativas entre departamentos?",
      },
    ],
    indicatorTitle: "Indicador utilizado",
    indicatorDescription:
      "El indicador utilizado fue la cantidad agregada de casos registrados. Este indicador permite comparar la incidencia de cada delito segun el grupo analizado dentro de cada dashboard.",
    indicatorColumns: {
      dashboard: "Dashboard",
      indicator: "Indicador",
      group: "Grupo comparado",
    },
    indicatorRows: [
      {
        dashboard: "Homicidios",
        indicator: "Cantidad total de homicidios",
        group: "Departamento",
      },
      {
        dashboard: "Delitos sexuales",
        indicator: "Cantidad total de delitos sexuales",
        group: "Grupo etario",
      },
      {
        dashboard: "Hurto de vehiculos",
        indicator: "Cantidad total de hurtos",
        group: "Departamento",
      },
    ],
    operationsTitle: "Como se hicieron las operaciones",
    operationsDescription:
      "Primero se tomo la columna cantidad de cada dataset. Luego se agruparon los datos segun el analisis de cada dashboard: homicidios por departamento, delitos sexuales por grupo etario y hurtos por departamento. Despues se sumo la cantidad de casos por cada grupo. Con esos valores agregados se aplico ANOVA para revisar si las diferencias entre grupos eran significativas.",
    operationsPoints: [
      "ANOVA compara varios grupos al mismo tiempo.",
      "El estadistico F mide la diferencia entre grupos.",
      "El p-valor indica si la diferencia es significativa.",
      "Si p < 0.05, se rechaza H0.",
      "Tukey se usa despues para saber entre que grupos estan las diferencias.",
    ],
    summaryTitle: "Resumen ANOVA",
    summaryDescription:
      "La tabla resume la lectura principal de cada prueba. Cuando el p-valor es muy pequeno, se muestra como p < 0.001 para facilitar la exposicion.",
    summaryColumns: {
      dashboard: "Dashboard",
      group: "Grupo comparado",
      fStatistic: "Estadistico F",
      pValue: "p-valor",
      decision: "Decision",
      interpretation: "Interpretacion",
    },
    summaryRows: [
      {
        dashboard: "Homicidios",
        group: "Departamentos",
        fStatistic: "12.94",
        pValue: "p < 0.001",
        decision: "Rechazar H0",
        interpretation:
          "Los resultados sugieren diferencias significativas entre algunos departamentos.",
      },
      {
        dashboard: "Delitos sexuales",
        group: "Grupo etario",
        fStatistic: "58.60",
        pValue: "p < 0.001",
        decision: "Rechazar H0",
        interpretation:
          "Los resultados sugieren diferencias significativas entre algunos grupos etarios.",
      },
      {
        dashboard: "Hurto de vehiculos",
        group: "Departamentos",
        fStatistic: "25.74",
        pValue: "p < 0.001",
        decision: "Rechazar H0",
        interpretation:
          "Los resultados sugieren diferencias significativas entre algunos departamentos.",
      },
    ],
    tukeyTitle: "Prueba post hoc Tukey",
    tukeyDescription:
      "ANOVA indica si hay diferencias generales, pero Tukey ayuda a ver entre que grupos aparecen esas diferencias. Aqui se muestran solo algunas comparaciones significativas para mantener una lectura clara.",
    tukeyColumns: {
      groupA: "Grupo A",
      groupB: "Grupo B",
      significant: "Diferencia significativa?",
      reading: "Lectura simple",
    },
    tukeySections: [
      {
        title: "Homicidios",
        subtitle: "Comparaciones destacadas entre departamentos",
        rows: [
          {
            groupA: "AMAZONAS",
            groupB: "ANTIOQUIA",
            significant: "Si",
            reading: tukeyReadingEs,
          },
          {
            groupA: "AMAZONAS",
            groupB: "VALLE DEL CAUCA",
            significant: "Si",
            reading: tukeyReadingEs,
          },
          {
            groupA: "ANTIOQUIA",
            groupB: "BOGOTA D.C.",
            significant: "Si",
            reading: tukeyReadingEs,
          },
          {
            groupA: "ANTIOQUIA",
            groupB: "CALDAS",
            significant: "Si",
            reading: tukeyReadingEs,
          },
          {
            groupA: "ANTIOQUIA",
            groupB: "CASANARE",
            significant: "Si",
            reading: tukeyReadingEs,
          },
        ],
      },
      {
        title: "Delitos sexuales",
        subtitle: "Comparaciones destacadas entre grupos etarios",
        rows: [
          {
            groupA: "ADOLESCENTES",
            groupB: "ADULTOS",
            significant: "Si",
            reading: tukeyReadingEs,
          },
          {
            groupA: "ADULTOS",
            groupB: "MENORES",
            significant: "Si",
            reading: tukeyReadingEs,
          },
        ],
      },
      {
        title: "Hurto de vehiculos",
        subtitle: "Comparaciones destacadas entre departamentos",
        rows: [
          {
            groupA: "AMAZONAS",
            groupB: "ANTIOQUIA",
            significant: "Si",
            reading: tukeyReadingEs,
          },
          {
            groupA: "AMAZONAS",
            groupB: "BOGOTA",
            significant: "Si",
            reading: tukeyReadingEs,
          },
          {
            groupA: "ANTIOQUIA",
            groupB: "ARAUCA",
            significant: "Si",
            reading: tukeyReadingEs,
          },
          {
            groupA: "ANTIOQUIA",
            groupB: "ATLANTICO",
            significant: "Si",
            reading: tukeyReadingEs,
          },
          {
            groupA: "ANTIOQUIA",
            groupB: "CALDAS",
            significant: "Si",
            reading: tukeyReadingEs,
          },
        ],
      },
    ],
  },
  en: {
    introBadge: "Statistical validation",
    pageTitle: "Statistical validation: ANOVA and Tukey",
    pageDescription:
      "As a complement to the dashboards, separate ANOVA tests were applied to each crime category. This helps validate whether the differences observed inside each dashboard are statistically significant.",
    introText:
      "The comparison between homicides, sexual crimes, and vehicle theft remains descriptive. The formal statistical validation was done inside each dashboard so that datasets with different periods and structures are not mixed.",
    finalTitle: "Simple conclusion",
    finalDescription:
      "The results suggest significant differences inside each dashboard, which complements the visual interpretation of the data.",
    whyTitle: "Why this approach",
    whyDescription:
      "The three datasets do not cover the same periods and do not share the same structure. For that reason, ANOVA is not used here to compare them directly, but to assess internal differences inside each dashboard.",
    kpis: [
      {
        label: "Homicides",
        value: "F = 12.94",
        detail:
          "p < 0.001. H0 is rejected and significant differences are observed across departments.",
      },
      {
        label: "Sexual crimes",
        value: "F = 58.60",
        detail:
          "p < 0.001. H0 is rejected and significant differences are observed across age groups.",
      },
      {
        label: "Vehicle theft",
        value: "F = 25.74",
        detail:
          "p < 0.001. H0 is rejected and significant differences are observed across departments.",
      },
    ],
    hypothesisTitle: "Hypotheses",
    stepsTitle: "What did we do in this test",
    hypotheses: [
      {
        label: "H0",
        description:
          "There are no significant differences between the groups analyzed inside each dashboard.",
      },
      {
        label: "H1",
        description:
          "There are significant differences between at least two groups inside each dashboard.",
      },
    ],
    steps: [
      {
        step: "1",
        title: "We treated each dashboard separately",
        description:
          "Homicides, sexual crimes, and vehicle theft were reviewed as independent analyses.",
      },
      {
        step: "2",
        title: "We aggregated case counts",
        description:
          "Case counts were aggregated by coherent internal groups such as departments or age groups.",
      },
      {
        step: "3",
        title: "We applied ANOVA",
        description:
          "ANOVA indicates whether the observed differences between groups are significant or could be explained by chance.",
      },
      {
        step: "4",
        title: "We reviewed Tukey",
        description:
          "The Tukey test helps identify exactly which groups show significant differences.",
      },
    ],
    explainCards: [
      {
        title: "What ANOVA means",
        description:
          "ANOVA is a test used to compare several groups at the same time. Here it checks whether case counts differ significantly inside each dashboard.",
      },
      {
        title: "What the p-value means",
        description:
          "The p-value helps decide whether a difference matters. When it is below 0.05, H0 is rejected and the difference is considered significant.",
      },
      {
        title: "What Tukey means",
        description:
          "After ANOVA shows general differences, Tukey helps locate which specific groups differ from each other.",
      },
    ],
    analysesTitle: "Analyses performed",
    analysesDescription:
      "Each dashboard was validated separately, using case count as the target variable and a group that matches its own data structure.",
    analysisCards: [
      {
        title: "Homicides",
        group: "Departments",
        target: "Case count",
        question: "Are there significant differences across departments?",
      },
      {
        title: "Sexual crimes",
        group: "Age group",
        target: "Case count",
        question: "Are there significant differences across age groups?",
      },
      {
        title: "Vehicle theft",
        group: "Departments",
        target: "Case count",
        question: "Are there significant differences across departments?",
      },
    ],
    indicatorTitle: "Indicator used",
    indicatorDescription:
      "The indicator used was the aggregated number of registered cases. This indicator makes it possible to compare the incidence of each crime according to the group analyzed inside each dashboard.",
    indicatorColumns: {
      dashboard: "Dashboard",
      indicator: "Indicator",
      group: "Compared group",
    },
    indicatorRows: [
      {
        dashboard: "Homicides",
        indicator: "Total number of homicides",
        group: "Department",
      },
      {
        dashboard: "Sexual crimes",
        indicator: "Total number of sexual crimes",
        group: "Age group",
      },
      {
        dashboard: "Vehicle theft",
        indicator: "Total number of thefts",
        group: "Department",
      },
    ],
    operationsTitle: "How were the operations performed",
    operationsDescription:
      "First, the quantity column was taken from each dataset. Then the data were grouped according to the analysis of each dashboard: homicides by department, sexual crimes by age group, and thefts by department. After that, the number of cases was summed for each group. With those aggregated values, ANOVA was applied to review whether the differences between groups were significant.",
    operationsPoints: [
      "ANOVA compares several groups at the same time.",
      "The F statistic measures the difference between groups.",
      "The p-value indicates whether the difference is significant.",
      "If p < 0.05, H0 is rejected.",
      "Tukey is used afterward to identify which groups differ.",
    ],
    summaryTitle: "ANOVA summary",
    summaryDescription:
      "This table condenses the main reading of each test. When the p-value is very small, it is displayed as p < 0.001 for easier presentation.",
    summaryColumns: {
      dashboard: "Dashboard",
      group: "Compared group",
      fStatistic: "F statistic",
      pValue: "p-value",
      decision: "Decision",
      interpretation: "Interpretation",
    },
    summaryRows: [
      {
        dashboard: "Homicides",
        group: "Departments",
        fStatistic: "12.94",
        pValue: "p < 0.001",
        decision: "Reject H0",
        interpretation:
          "The results suggest significant differences between some departments.",
      },
      {
        dashboard: "Sexual crimes",
        group: "Age group",
        fStatistic: "58.60",
        pValue: "p < 0.001",
        decision: "Reject H0",
        interpretation:
          "The results suggest significant differences between some age groups.",
      },
      {
        dashboard: "Vehicle theft",
        group: "Departments",
        fStatistic: "25.74",
        pValue: "p < 0.001",
        decision: "Reject H0",
        interpretation:
          "The results suggest significant differences between some departments.",
      },
    ],
    tukeyTitle: "Post hoc Tukey test",
    tukeyDescription:
      "ANOVA indicates whether there are general differences, but Tukey helps identify which groups contain those differences. Only a few significant comparisons are shown here to keep the page easy to read.",
    tukeyColumns: {
      groupA: "Group A",
      groupB: "Group B",
      significant: "Significant difference?",
      reading: "Simple reading",
    },
    tukeySections: [
      {
        title: "Homicides",
        subtitle: "Highlighted comparisons across departments",
        rows: [
          {
            groupA: "AMAZONAS",
            groupB: "ANTIOQUIA",
            significant: "Yes",
            reading: tukeyReadingEn,
          },
          {
            groupA: "AMAZONAS",
            groupB: "VALLE DEL CAUCA",
            significant: "Yes",
            reading: tukeyReadingEn,
          },
          {
            groupA: "ANTIOQUIA",
            groupB: "BOGOTA D.C.",
            significant: "Yes",
            reading: tukeyReadingEn,
          },
          {
            groupA: "ANTIOQUIA",
            groupB: "CALDAS",
            significant: "Yes",
            reading: tukeyReadingEn,
          },
          {
            groupA: "ANTIOQUIA",
            groupB: "CASANARE",
            significant: "Yes",
            reading: tukeyReadingEn,
          },
        ],
      },
      {
        title: "Sexual crimes",
        subtitle: "Highlighted comparisons across age groups",
        rows: [
          {
            groupA: "ADOLESCENTES",
            groupB: "ADULTOS",
            significant: "Yes",
            reading: tukeyReadingEn,
          },
          {
            groupA: "ADULTOS",
            groupB: "MENORES",
            significant: "Yes",
            reading: tukeyReadingEn,
          },
        ],
      },
      {
        title: "Vehicle theft",
        subtitle: "Highlighted comparisons across departments",
        rows: [
          {
            groupA: "AMAZONAS",
            groupB: "ANTIOQUIA",
            significant: "Yes",
            reading: tukeyReadingEn,
          },
          {
            groupA: "AMAZONAS",
            groupB: "BOGOTA",
            significant: "Yes",
            reading: tukeyReadingEn,
          },
          {
            groupA: "ANTIOQUIA",
            groupB: "ARAUCA",
            significant: "Yes",
            reading: tukeyReadingEn,
          },
          {
            groupA: "ANTIOQUIA",
            groupB: "ATLANTICO",
            significant: "Yes",
            reading: tukeyReadingEn,
          },
          {
            groupA: "ANTIOQUIA",
            groupB: "CALDAS",
            significant: "Yes",
            reading: tukeyReadingEn,
          },
        ],
      },
    ],
  },
};

export function getStatisticsContent(language: Language) {
  return statisticsContent[language];
}
