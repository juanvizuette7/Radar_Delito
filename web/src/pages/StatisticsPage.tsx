import { motion } from "framer-motion";
import {
  BarChart3,
  CheckCircle2,
  CircleHelp,
  FlaskConical,
  Landmark,
  Sigma,
  Sparkles,
  Table2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { InsightCard } from "../components/InsightCard";
import { KPI } from "../components/KPI";
import { PageReveal } from "../components/PageReveal";
import { useUi } from "../context/UiContext";
import { getStatisticsContent } from "../data/statistics";

export function StatisticsPage() {
  const { language } = useUi();
  const content = getStatisticsContent(language);

  return (
    <PageReveal>
      <section className="space-y-8 pb-12">
        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-amber-100/80 px-4 py-2 text-sm font-semibold text-amber-700 shadow-[0_10px_28px_rgba(245,158,11,0.16)] dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-300 dark:shadow-none">
              <FlaskConical size={16} />
              {content.introBadge}
            </div>

            <div className="space-y-4">
              <h1 className="font-display text-5xl leading-tight text-slate-950 dark:text-white xl:text-6xl">
                {content.pageTitle}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
                {content.pageDescription}
              </p>
            </div>

            <div className="rounded-[1.9rem] border border-slate-200/80 bg-white/80 p-5 shadow-[0_18px_48px_rgba(148,163,184,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-glass">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 text-white">
                  <Sparkles size={18} />
                </div>
                <p className="text-sm leading-8 text-slate-700 dark:text-slate-200">
                  {content.introText}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="relative overflow-hidden rounded-[2rem] border border-cyan-300/60 bg-gradient-to-br from-cyan-100/90 via-white to-amber-100/90 p-6 shadow-[0_18px_48px_rgba(148,163,184,0.18)] backdrop-blur-xl dark:border-cyan-400/20 dark:from-cyan-500/14 dark:via-slate-950/70 dark:to-amber-500/14 dark:shadow-glass"
          >
            <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-cyan-500 via-sky-500 to-amber-500 text-white shadow-[0_18px_45px_rgba(15,23,42,0.2)] dark:shadow-[0_18px_45px_rgba(15,23,42,0.35)]">
                <BarChart3 size={28} />
              </div>
              <h2 className="mt-6 font-display text-3xl text-slate-950 dark:text-white">
                {content.finalTitle}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-200/90">
                {content.finalDescription}
              </p>

              <div className="mt-6 rounded-[1.5rem] border border-slate-200/80 bg-white/75 p-4 dark:border-white/10 dark:bg-slate-950/30">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  {content.whyTitle}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {content.whyDescription}
                </p>
              </div>

              <Link
                to="/"
                className="mt-6 inline-flex rounded-full border border-slate-200/80 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 shadow-[0_12px_28px_rgba(148,163,184,0.12)] transition-colors duration-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:shadow-none dark:hover:bg-white/10"
              >
                {language === "es" ? "Volver al inicio" : "Back to home"}
              </Link>
            </div>
          </motion.aside>
        </div>

        <div className="grid gap-5 xl:grid-cols-3">
          {content.kpis.map((kpi) => (
            <KPI
              key={kpi.label}
              label={kpi.label}
              value={kpi.value}
              detail={kpi.detail}
              accentClass="from-amber-500 via-orange-500 to-rose-500"
            />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_18px_48px_rgba(148,163,184,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-glass">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-500 text-white">
                <CircleHelp size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  {content.hypothesisTitle}
                </p>
                <h2 className="mt-1 font-display text-2xl text-slate-950 dark:text-white">
                  {content.stepsTitle}
                </h2>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {content.hypotheses.map((hypothesis) => (
                <div
                  key={hypothesis.label}
                  className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-slate-950/30"
                >
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">
                    {hypothesis.label}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {hypothesis.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_18px_48px_rgba(148,163,184,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-glass">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  {language === "es" ? "Proceso" : "Process"}
                </p>
                <h2 className="mt-1 font-display text-2xl text-slate-950 dark:text-white">
                  {language === "es" ? "Proceso resumido" : "Process summary"}
                </h2>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {content.steps.map((item) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/90 p-5 dark:border-white/10 dark:bg-slate-950/30"
                >
                  <p className="font-display text-3xl text-slate-950 dark:text-white">
                    {item.step}
                  </p>
                  <h3 className="mt-4 text-lg font-semibold text-slate-950 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <InsightCard
            title={content.explainCards[0].title}
            description={content.explainCards[0].description}
            accentClass="from-cyan-500 to-sky-500"
            icon={Sigma}
          />
          <InsightCard
            title={content.explainCards[1].title}
            description={content.explainCards[1].description}
            accentClass="from-amber-500 to-orange-500"
            icon={CircleHelp}
          />
          <InsightCard
            title={content.explainCards[2].title}
            description={content.explainCards[2].description}
            accentClass="from-emerald-500 to-lime-500"
            icon={FlaskConical}
          />
        </div>

        <div className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_18px_48px_rgba(148,163,184,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-glass">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
              <Landmark size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                {content.analysesTitle}
              </p>
              <h2 className="mt-1 font-display text-2xl text-slate-950 dark:text-white">
                {language === "es" ? "Analisis por dashboard" : "Analysis by dashboard"}
              </h2>
            </div>
          </div>

          <p className="mt-6 text-sm leading-8 text-slate-600 dark:text-slate-300">
            {content.analysesDescription}
          </p>

          <div className="mt-6 grid gap-4 xl:grid-cols-3">
            {content.analysisCards.map((card) => (
              <div
                key={card.title}
                className="rounded-[1.6rem] border border-slate-200/80 bg-slate-50/90 p-5 dark:border-white/10 dark:bg-slate-950/30"
              >
                <h3 className="font-display text-2xl text-slate-950 dark:text-white">
                  {card.title}
                </h3>
                <div className="mt-4 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  <p>
                    <span className="font-semibold text-slate-950 dark:text-white">
                      {language === "es" ? "Grupo comparado:" : "Compared group:"}
                    </span>{" "}
                    {card.group}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-950 dark:text-white">
                      {language === "es" ? "Variable objetivo:" : "Target variable:"}
                    </span>{" "}
                    {card.target}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-950 dark:text-white">
                      {language === "es" ? "Pregunta:" : "Question:"}
                    </span>{" "}
                    {card.question}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
          <div className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_18px_48px_rgba(148,163,184,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-glass">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
                <Sigma size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  {content.indicatorTitle}
                </p>
                <h2 className="mt-1 font-display text-2xl text-slate-950 dark:text-white">
                  {language === "es" ? "Indicador principal" : "Main indicator"}
                </h2>
              </div>
            </div>

            <p className="mt-6 text-sm leading-8 text-slate-600 dark:text-slate-300">
              {content.indicatorDescription}
            </p>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    <th className="px-4 py-2">{content.indicatorColumns.dashboard}</th>
                    <th className="px-4 py-2">{content.indicatorColumns.indicator}</th>
                    <th className="px-4 py-2">{content.indicatorColumns.group}</th>
                  </tr>
                </thead>
                <tbody>
                  {content.indicatorRows.map((row) => (
                    <tr
                      key={`${row.dashboard}-${row.group}`}
                      className="rounded-[1.25rem] bg-slate-50/90 dark:bg-slate-950/30"
                    >
                      <td className="rounded-l-[1.25rem] px-4 py-4 text-sm font-semibold text-slate-950 dark:text-white">
                        {row.dashboard}
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-200">
                        {row.indicator}
                      </td>
                      <td className="rounded-r-[1.25rem] px-4 py-4 text-sm text-slate-700 dark:text-slate-200">
                        {row.group}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_18px_48px_rgba(148,163,184,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-glass">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  {content.operationsTitle}
                </p>
                <h2 className="mt-1 font-display text-2xl text-slate-950 dark:text-white">
                  {language === "es" ? "Operacion resumida" : "Operation summary"}
                </h2>
              </div>
            </div>

            <p className="mt-6 text-sm leading-8 text-slate-600 dark:text-slate-300">
              {content.operationsDescription}
            </p>

            <div className="mt-6 grid gap-3">
              {content.operationsPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-[1.4rem] border border-slate-200/80 bg-slate-50/90 px-4 py-4 dark:border-white/10 dark:bg-slate-950/30"
                >
                  <p className="text-sm leading-7 text-slate-700 dark:text-slate-200">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_18px_48px_rgba(148,163,184,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-glass">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white">
              <Table2 size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                {content.summaryTitle}
              </p>
              <h2 className="mt-1 font-display text-2xl text-slate-950 dark:text-white">
                {language === "es" ? "Resumen de resultados ANOVA" : "ANOVA results summary"}
              </h2>
            </div>
          </div>

          <p className="mt-6 text-sm leading-8 text-slate-600 dark:text-slate-300">
            {content.summaryDescription}
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  <th className="px-4 py-2">{content.summaryColumns.dashboard}</th>
                  <th className="px-4 py-2">{content.summaryColumns.group}</th>
                  <th className="px-4 py-2">{content.summaryColumns.fStatistic}</th>
                  <th className="px-4 py-2">{content.summaryColumns.pValue}</th>
                  <th className="px-4 py-2">{content.summaryColumns.decision}</th>
                  <th className="px-4 py-2">{content.summaryColumns.interpretation}</th>
                </tr>
              </thead>
              <tbody>
                {content.summaryRows.map((row) => (
                  <tr key={row.dashboard} className="rounded-[1.25rem] bg-slate-50/90 dark:bg-slate-950/30">
                    <td className="rounded-l-[1.25rem] px-4 py-4 text-sm font-semibold text-slate-950 dark:text-white">
                      {row.dashboard}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-200">
                      {row.group}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-200">
                      {row.fStatistic}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-200">
                      {row.pValue}
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-rose-600 dark:text-rose-300">
                      {row.decision}
                    </td>
                    <td className="rounded-r-[1.25rem] px-4 py-4 text-sm text-slate-700 dark:text-slate-200">
                      {row.interpretation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-lime-500 text-white">
              <FlaskConical size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                {content.tukeyTitle}
              </p>
              <h2 className="mt-1 font-display text-2xl text-slate-950 dark:text-white">
                {language === "es" ? "Comparaciones significativas" : "Significant comparisons"}
              </h2>
            </div>
          </div>

          <p className="text-sm leading-8 text-slate-600 dark:text-slate-300">
            {content.tukeyDescription}
          </p>

          <div className="grid gap-6">
            {content.tukeySections.map((section) => (
              <div
                key={section.title}
                className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_18px_48px_rgba(148,163,184,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-glass"
              >
                <h3 className="font-display text-2xl text-slate-950 dark:text-white">
                  {section.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {section.subtitle}
                </p>

                <div className="mt-5 overflow-x-auto">
                  <table className="min-w-full border-separate border-spacing-y-3">
                    <thead>
                      <tr className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                        <th className="px-4 py-2">{content.tukeyColumns.groupA}</th>
                        <th className="px-4 py-2">{content.tukeyColumns.groupB}</th>
                        <th className="px-4 py-2">{content.tukeyColumns.significant}</th>
                        <th className="px-4 py-2">{content.tukeyColumns.reading}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.rows.map((row) => (
                        <tr
                          key={`${section.title}-${row.groupA}-${row.groupB}`}
                          className="rounded-[1.25rem] bg-slate-50/90 dark:bg-slate-950/30"
                        >
                          <td className="rounded-l-[1.25rem] px-4 py-4 text-sm font-semibold text-slate-950 dark:text-white">
                            {row.groupA}
                          </td>
                          <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-200">
                            {row.groupB}
                          </td>
                          <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-200">
                            {row.significant}
                          </td>
                          <td className="rounded-r-[1.25rem] px-4 py-4 text-sm text-slate-700 dark:text-slate-200">
                            {row.reading}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageReveal>
  );
}
