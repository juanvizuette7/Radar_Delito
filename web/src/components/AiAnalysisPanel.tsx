import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Bot,
  BrainCircuit,
  ChevronDown,
  ChevronUp,
  Map,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { startTransition, useDeferredValue, useEffect, useState } from "react";
import { AiCrimeChat } from "./AiCrimeChat";
import { Language } from "../context/UiContext";
import { AiReport } from "../data/aiReports";

type AiAnalysisPanelProps = {
  report: AiReport;
  language: Language;
  accentClass: string;
  accentTextClass: string;
};

const copy = {
  es: {
    badge: "Motor analitico y predictivo",
    helper:
      "Lectura operativa construida sobre tus datasets limpios, con proyeccion de la siguiente ventana y retroprueba historica del comportamiento reciente.",
    predictiveTitle: "Asistente interactivo de riesgo",
    toggleOpen: "Mostrar modulo de IA",
    toggleClose: "Ocultar modulo de IA",
    predictiveDescription:
      "Selecciona el territorio y revisa el patron dominante y el territorio que conviene vigilar primero.",
    territoryLabel: "Territorio",
    dominantFactor: "Patron dominante",
    dominantFactorHelper: "Factor que mas pesa en el comportamiento esperado",
    hotspot: "Territorio prioritario",
    hotspotHelper: "Lugar que conviene vigilar primero",
    operationalTitle: "Enfoque operativo",
    recommendations: "Acciones sugeridas",
    summary: "Lectura del dataset",
    findings: "Hallazgos clave",
  },
  en: {
    badge: "Analytical and predictive engine",
    helper:
      "Operational reading built from your clean datasets, with a next-window projection and historical backtesting over recent behavior.",
    predictiveTitle: "Interactive risk assistant",
    toggleOpen: "Show AI module",
    toggleClose: "Hide AI module",
    predictiveDescription:
      "Select the territory and review the dominant pattern and the location that should be watched first.",
    territoryLabel: "Territory",
    dominantFactor: "Dominant pattern",
    dominantFactorHelper: "Factor carrying the strongest expected weight",
    hotspot: "Priority territory",
    hotspotHelper: "Location that should be watched first",
    operationalTitle: "Operational focus",
    recommendations: "Suggested actions",
    summary: "Dataset reading",
    findings: "Key findings",
  },
} as const;

export function AiAnalysisPanel({
  report,
  language,
  accentClass,
  accentTextClass,
}: AiAnalysisPanelProps) {
  const labels = copy[language];
  const firstTerritoryId = report.predictive.territories[0]?.id ?? "";
  const [selectedTerritoryId, setSelectedTerritoryId] = useState(firstTerritoryId);
  const [isExpanded, setIsExpanded] = useState(false);
  const deferredTerritoryId = useDeferredValue(selectedTerritoryId);

  useEffect(() => {
    if (!report.predictive.territories.some((item) => item.id === selectedTerritoryId)) {
      setSelectedTerritoryId(firstTerritoryId);
    }
  }, [firstTerritoryId, report.predictive.territories, selectedTerritoryId]);

  const selectedTerritory =
    report.predictive.territories.find((item) => item.id === deferredTerritoryId) ??
    report.predictive.territories[0];

  if (!selectedTerritory) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-[2rem] border border-slate-200/80 bg-white/85 p-6 shadow-[0_18px_48px_rgba(148,163,184,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/55 dark:shadow-glass"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-gradient-to-br ${accentClass} text-white shadow-[0_18px_45px_rgba(15,23,42,0.2)] dark:shadow-[0_18px_45px_rgba(15,23,42,0.35)]`}
          >
            <Bot size={24} />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              <BrainCircuit size={14} className={accentTextClass} />
              {labels.badge}
            </div>
            <h2 className="mt-3 font-display text-3xl text-slate-950 dark:text-white">
              {labels.predictiveTitle}
            </h2>
            <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {labels.helper}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded((current) => !current)}
          className={`inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200/80 bg-white/85 px-4 py-3 text-sm font-semibold text-slate-700 shadow-[0_12px_35px_rgba(148,163,184,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(148,163,184,0.2)] dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:shadow-none ${accentTextClass}`}
          aria-expanded={isExpanded}
          aria-controls="ai-analysis-content"
        >
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          {isExpanded ? labels.toggleClose : labels.toggleOpen}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded ? (
          <motion.div
            id="ai-analysis-content"
            key="expanded-ai-analysis"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 24 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="rounded-[1.9rem] border border-slate-200/80 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-white/5">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                <div className="max-w-3xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    {labels.predictiveTitle}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {labels.predictiveDescription}
                  </p>
                </div>

                <label className="block min-w-[18rem]">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    {labels.territoryLabel}
                  </span>
                  <select
                    value={selectedTerritoryId}
                    onChange={(event) => {
                      const nextValue = event.target.value;
                      startTransition(() => setSelectedTerritoryId(nextValue));
                    }}
                    className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-[0_12px_35px_rgba(148,163,184,0.12)] outline-none transition-colors duration-300 focus:border-slate-400 dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-100 dark:shadow-none dark:focus:border-slate-400"
                  >
                    {report.predictive.territories.map((territory) => (
                      <option key={territory.id} value={territory.id}>
                        {territory.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/85 p-4 shadow-[0_12px_30px_rgba(148,163,184,0.12)] dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    {labels.dominantFactor}
                  </p>
                  <p className="mt-3 text-lg font-semibold leading-8 text-slate-950 dark:text-white">
                    {selectedTerritory.dominantFactor}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400">
                    {labels.dominantFactorHelper}
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/85 p-4 shadow-[0_12px_30px_rgba(148,163,184,0.12)] dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    {labels.hotspot}
                  </p>
                  <p className="mt-3 text-lg font-semibold leading-8 text-slate-950 dark:text-white">
                    {selectedTerritory.hotspot}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400">
                    {labels.hotspotHelper}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
                <AiCrimeChat
                  report={report}
                  territory={selectedTerritory}
                  language={language}
                  accentClass={accentClass}
                  accentTextClass={accentTextClass}
                />

                <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/85 p-5 shadow-[0_12px_30px_rgba(148,163,184,0.12)] dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className={accentTextClass} />
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      {labels.operationalTitle}
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {selectedTerritory.answers.focus}
                  </p>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div className="rounded-[1.35rem] border border-slate-200/80 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-slate-950/30">
                      <div className="flex items-center gap-2">
                        <Target size={16} className={accentTextClass} />
                        <p className="text-sm font-semibold text-slate-950 dark:text-white">
                          {labels.dominantFactor}
                        </p>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                        {selectedTerritory.dominantFactor}
                      </p>
                    </div>

                    <div className="rounded-[1.35rem] border border-slate-200/80 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-slate-950/30">
                      <div className="flex items-center gap-2">
                        <Map size={16} className={accentTextClass} />
                        <p className="text-sm font-semibold text-slate-950 dark:text-white">
                          {labels.hotspot}
                        </p>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                        {selectedTerritory.hotspot}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={16} className={accentTextClass} />
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                        {labels.recommendations}
                      </p>
                    </div>

                    <div className="mt-4 space-y-3">
                      {selectedTerritory.recommendations.map((recommendation) => (
                        <div
                          key={recommendation}
                          className="rounded-[1.25rem] border border-slate-200/80 bg-white/80 px-4 py-3 text-sm leading-7 text-slate-700 shadow-[0_10px_24px_rgba(148,163,184,0.1)] dark:border-white/10 dark:bg-slate-950/35 dark:text-slate-200 dark:shadow-none"
                        >
                          {recommendation}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-5">
                <div className="flex items-center gap-2">
                  <Activity size={16} className={accentTextClass} />
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    {labels.summary}
                  </p>
                </div>

                <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/90 p-5 dark:border-white/10 dark:bg-white/5">
                  <p className="text-sm leading-8 text-slate-700 dark:text-slate-200">
                    {report.summary}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className={accentTextClass} />
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    {labels.findings}
                  </p>
                </div>

                {report.findings.map((finding) => (
                  <div
                    key={finding.title}
                    className="rounded-[1.5rem] border border-slate-200/80 bg-white/80 p-5 shadow-[0_12px_30px_rgba(148,163,184,0.12)] dark:border-white/10 dark:bg-white/5 dark:shadow-none"
                  >
                    <h3 className="font-display text-xl text-slate-950 dark:text-white">
                      {finding.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {finding.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.section>
  );
}
