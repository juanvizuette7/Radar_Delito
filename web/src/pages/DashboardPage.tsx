import { motion } from "framer-motion";
import { ArrowRight, CircleDot } from "lucide-react";
import { DashboardEmbed } from "../components/DashboardEmbed";
import { InsightCard } from "../components/InsightCard";
import { KPI } from "../components/KPI";
import { PageReveal } from "../components/PageReveal";
import { DashboardConfig } from "../data/dashboards";

type DashboardPageProps = {
  dashboard: DashboardConfig;
};

export function DashboardPage({ dashboard }: DashboardPageProps) {
  const HeroIcon = dashboard.icon;

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
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200">
              <CircleDot size={14} className={dashboard.accentTextClass} />
              {dashboard.badge}
            </div>

            <div className="space-y-4">
              <h1 className="font-display text-5xl leading-tight text-white xl:text-6xl">
                {dashboard.title}
              </h1>
              <p className={`text-lg font-semibold ${dashboard.accentTextClass}`}>
                {dashboard.subtitle}
              </p>
              <p className="max-w-3xl text-base leading-8 text-slate-300">
                {dashboard.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {dashboard.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className={`relative overflow-hidden rounded-[2rem] border p-6 shadow-glass backdrop-blur-xl ${dashboard.panelClass}`}
          >
            <div className={`absolute right-0 top-0 h-48 w-48 rounded-full blur-3xl ${dashboard.heroGlowClass}`} />
            <div className="relative">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-gradient-to-br ${dashboard.accentClass} text-white shadow-[0_18px_45px_rgba(15,23,42,0.35)]`}
              >
                <HeroIcon size={28} />
              </div>
              <h2 className="mt-6 font-display text-3xl text-white">
                Consulta analítica integrada
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-200/90">
                Esta vista reúne el tablero principal con indicadores y apoyos
                de lectura para facilitar seguimiento, comparación y consulta.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  "Consulta directa del tablero en Power BI",
                  "Indicadores de apoyo para lectura rápida",
                  "Acceso desde escritorio, tableta y móvil",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/25 px-4 py-3 text-sm text-slate-100"
                  >
                    <ArrowRight size={16} className={dashboard.accentTextClass} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
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

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
          <DashboardEmbed
            title={dashboard.title}
            url={dashboard.embedUrl}
            accentClass={dashboard.accentClass}
          />

          <div className="space-y-5">
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
