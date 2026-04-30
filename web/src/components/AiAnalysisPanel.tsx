import { motion } from "framer-motion";
import { Bot, BrainCircuit, ShieldCheck, Sparkles } from "lucide-react";
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
    badge: "Analisis asistido por IA",
    helper: "Generado sobre data/clean con lectura territorial, temporal y operativa.",
    summary: "Lectura del dataset",
    findings: "Hallazgos clave",
    actions: "Prioridades sugeridas",
    coverage: "Cobertura del analisis",
  },
  en: {
    badge: "AI-assisted analysis",
    helper: "Built from data/clean with territorial, time-based and operational reading.",
    summary: "Dataset reading",
    findings: "Key findings",
    actions: "Suggested priorities",
    coverage: "Analysis coverage",
  },
} as const;

export function AiAnalysisPanel({
  report,
  language,
  accentClass,
  accentTextClass,
}: AiAnalysisPanelProps) {
  const labels = copy[language];

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
              {labels.summary}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {labels.helper}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/90 p-5 dark:border-white/10 dark:bg-white/5">
            <p className="text-sm leading-8 text-slate-700 dark:text-slate-200">
              {report.summary}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {report.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-[1.5rem] border border-slate-200/80 bg-white/80 p-4 shadow-[0_12px_30px_rgba(148,163,184,0.12)] dark:border-white/10 dark:bg-white/5 dark:shadow-none"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  {metric.label}
                </p>
                <p className="mt-3 font-display text-xl text-slate-950 dark:text-white">
                  {metric.value}
                </p>
              </div>
            ))}
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

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr_1.05fr]">
        {report.actions.map((action) => (
          <div
            key={action.title}
            className="rounded-[1.5rem] border border-slate-200/80 bg-white/80 p-5 shadow-[0_12px_30px_rgba(148,163,184,0.12)] dark:border-white/10 dark:bg-white/5 dark:shadow-none"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className={accentTextClass} />
              <p className="text-sm font-semibold text-slate-950 dark:text-white">
                {action.title}
              </p>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              {action.description}
            </p>
          </div>
        ))}

        <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/90 p-5 dark:border-white/10 dark:bg-slate-900/70">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            {labels.coverage}
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
            {report.coverageNote}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
