import { motion } from "framer-motion";
import { ArrowRight, CircleDot } from "lucide-react";
import { DashboardEmbed } from "../components/DashboardEmbed";
import { InsightCard } from "../components/InsightCard";
import { KPI } from "../components/KPI";
import { PageReveal } from "../components/PageReveal";
import { useUi } from "../context/UiContext";
import { DashboardConfig, getDashboardByKey } from "../data/dashboards";
import { siteCopy } from "../data/siteCopy";

type DashboardPageProps = {
  dashboardKey: DashboardConfig["key"];
};

export function DashboardPage({ dashboardKey }: DashboardPageProps) {
  const { language } = useUi();
  const dashboard = getDashboardByKey(language, dashboardKey);
  const copy = siteCopy[language].dashboardPage;

  return (
    <PageReveal>
      <section className="grid gap-6 xl:min-h-[calc(100dvh-9.5rem)] xl:grid-cols-[22rem_minmax(0,1fr)]">
        <motion.aside
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className={`relative overflow-hidden rounded-[2rem] border p-5 shadow-[0_18px_48px_rgba(148,163,184,0.18)] backdrop-blur-xl dark:shadow-glass ${dashboard.panelClass}`}
        >
          <div
            className={`absolute right-0 top-0 h-40 w-40 rounded-full blur-3xl ${dashboard.heroGlowClass}`}
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative flex h-full flex-col gap-5"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/85 px-4 py-2 text-sm font-semibold text-slate-700 shadow-[0_12px_35px_rgba(148,163,184,0.16)] dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:shadow-none">
              <CircleDot size={14} className={dashboard.accentTextClass} />
              {dashboard.badge}
            </div>

            <div className="space-y-3">
              <h1 className="font-display text-4xl leading-tight text-slate-950 dark:text-white">
                {dashboard.title}
              </h1>
              <p className={`text-base font-semibold ${dashboard.accentTextClass}`}>
                {dashboard.subtitle}
              </p>
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                {dashboard.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {dashboard.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200/80 bg-white/75 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600 shadow-[0_12px_35px_rgba(148,163,184,0.12)] dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:shadow-none"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-2">
              {dashboard.kpis.map((kpi) => (
                <KPI
                  key={kpi.label}
                  label={kpi.label}
                  value={kpi.value}
                  detail={kpi.detail}
                  accentClass={dashboard.accentClass}
                />
              ))}
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-2xl text-slate-950 dark:text-white">
                {copy.panelTitle}
              </h2>
              <p className="text-sm leading-7 text-slate-700 dark:text-slate-200/90">
                {copy.panelDescription}
              </p>
              {copy.bullets.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-3 text-sm text-slate-700 shadow-[0_12px_35px_rgba(148,163,184,0.12)] dark:border-white/10 dark:bg-slate-950/25 dark:text-slate-100 dark:shadow-none"
                >
                  <ArrowRight size={16} className={dashboard.accentTextClass} />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.aside>

        <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_20rem]">
          <DashboardEmbed
            title={dashboard.title}
            url={dashboard.embedUrl}
            accentClass={dashboard.accentClass}
            fillViewport
          />

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
            {dashboard.insights.map((insight) => (
              <InsightCard
                key={insight.title}
                title={insight.title}
                description={insight.description}
                accentClass={dashboard.accentClass}
                icon={insight.icon}
              />
            ))}
          </div>
        </div>
      </section>
    </PageReveal>
  );
}
