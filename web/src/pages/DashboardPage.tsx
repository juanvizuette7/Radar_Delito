import { motion } from "framer-motion";
import { CircleDot } from "lucide-react";
import { DashboardEmbed } from "../components/DashboardEmbed";
import { KPI } from "../components/KPI";
import { PageReveal } from "../components/PageReveal";
import { useUi } from "../context/UiContext";
import { DashboardConfig, getDashboardByKey } from "../data/dashboards";

type DashboardPageProps = {
  dashboardKey: DashboardConfig["key"];
};

export function DashboardPage({ dashboardKey }: DashboardPageProps) {
  const { language } = useUi();
  const dashboard = getDashboardByKey(language, dashboardKey);

  return (
    <PageReveal>
      <section className="flex gap-5 pb-8 xl:h-full xl:min-h-0 xl:flex-col xl:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className={`relative overflow-hidden rounded-[2rem] border p-5 shadow-[0_18px_48px_rgba(148,163,184,0.18)] backdrop-blur-xl dark:shadow-glass ${dashboard.panelClass}`}
        >
          <div
            className={`absolute right-0 top-0 h-40 w-40 rounded-full blur-3xl ${dashboard.heroGlowClass}`}
          />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative grid gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"
          >
            <div className="space-y-4">
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
                <p className="max-w-4xl text-sm leading-7 text-slate-600 dark:text-slate-300">
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
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
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
          </motion.div>
        </motion.div>

        <DashboardEmbed
          title={dashboard.title}
          url={dashboard.embedUrl}
          accentClass={dashboard.accentClass}
          fillViewport
        />
      </section>
    </PageReveal>
  );
}
