import { motion } from "framer-motion";
import { ArrowRight, DatabaseZap, Play, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { DashboardCard } from "../components/DashboardCard";
import { InsightCard } from "../components/InsightCard";
import { PageReveal } from "../components/PageReveal";
import { useUi } from "../context/UiContext";
import { getDashboards, getOverviewCards } from "../data/dashboards";
import { siteCopy } from "../data/siteCopy";

export function HomePage() {
  const { language } = useUi();
  const copy = siteCopy[language].home;
  const dashboards = getDashboards(language);
  const overviewCards = getOverviewCards(language);

  return (
    <PageReveal>
      <section className="grid gap-8 pb-12 pt-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 rounded-full border border-sky-300/60 bg-sky-100/80 px-4 py-2 text-sm font-semibold text-sky-700 shadow-[0_10px_28px_rgba(59,130,246,0.12)] dark:border-sky-400/20 dark:bg-sky-500/10 dark:text-sky-300 dark:shadow-none"
          >
            <Sparkles size={16} />
            {copy.badge}
          </motion.div>

          <div className="max-w-4xl space-y-6">
            <h1 className="font-display text-5xl leading-tight text-slate-950 dark:text-white sm:text-6xl xl:text-7xl">
              {copy.titleLead}{" "}
              <span className="bg-gradient-to-r from-sky-500 via-pink-500 to-emerald-500 bg-clip-text text-transparent dark:from-sky-300 dark:via-pink-300 dark:to-emerald-300">
                {copy.titleAccent}
              </span>{" "}
              {copy.titleTail}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              {copy.description}
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              to="/homicidios"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 px-6 py-4 font-semibold text-white shadow-[0_18px_40px_rgba(59,130,246,0.35)] transition-transform duration-300 hover:-translate-y-1"
            >
              {copy.primaryCta}
              <ArrowRight size={18} />
            </Link>
            <a
              href="#resumen"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-6 py-4 font-semibold text-slate-900 shadow-[0_12px_28px_rgba(148,163,184,0.12)] transition-colors duration-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:shadow-none dark:hover:bg-white/10"
            >
              <Play size={18} />
              {copy.secondaryCta}
            </a>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {overviewCards.map((card) => (
              <div
                key={card.label}
                className="rounded-[1.75rem] border border-slate-200/80 bg-white/80 p-5 shadow-[0_18px_48px_rgba(148,163,184,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-glass"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/6 text-slate-900 dark:bg-white/10 dark:text-slate-100">
                  <card.icon size={18} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  {card.label}
                </p>
                <p className="mt-3 font-display text-2xl text-slate-950 dark:text-white">
                  {card.value}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55 }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-[2.25rem] bg-gradient-to-br from-sky-500/18 via-fuchsia-500/12 to-emerald-500/16 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2.25rem] border border-slate-200/80 bg-white/85 p-6 shadow-[0_18px_48px_rgba(148,163,184,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/65 dark:shadow-glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                  {copy.previewEyebrow}
                </p>
                <h2 className="mt-3 font-display text-3xl text-slate-950 dark:text-white">
                  {copy.previewTitle}
                </h2>
              </div>
              <div className="rounded-full border border-emerald-300/60 bg-emerald-100/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                {copy.previewStatus}
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {dashboards.map((dashboard, index) => (
                <motion.div
                  key={dashboard.key}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.08, duration: 0.35 }}
                  className={`rounded-[1.6rem] border p-5 shadow-[0_12px_30px_rgba(148,163,184,0.12)] dark:shadow-none ${dashboard.panelClass}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${dashboard.accentClass} text-white`}
                    >
                      <dashboard.icon size={20} />
                    </div>
                    <div className="rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:border-white/10 dark:bg-black/10 dark:text-slate-200">
                      {dashboard.badge}
                    </div>
                  </div>
                  <p className="mt-5 font-display text-xl text-slate-950 dark:text-white">
                    {dashboard.title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {dashboard.subtitle}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.6rem] border border-slate-200/80 bg-white/75 p-5 shadow-[0_12px_30px_rgba(148,163,184,0.12)] dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  {copy.coverageLabel}
                </p>
                <p className="mt-3 font-display text-2xl text-slate-950 dark:text-white">
                  {copy.coverageTitle}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {copy.coverageDescription}
                </p>
              </div>
              <div className="rounded-[1.6rem] border border-slate-200/80 bg-white/75 p-5 shadow-[0_12px_30px_rgba(148,163,184,0.12)] dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  {copy.scopeLabel}
                </p>
                <p className="mt-3 font-display text-2xl text-slate-950 dark:text-white">
                  {copy.scopeTitle}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {copy.scopeDescription}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="resumen" className="space-y-6 pb-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              {copy.dashboardsEyebrow}
            </p>
            <h2 className="mt-3 font-display text-4xl text-slate-950 dark:text-white">
              {copy.dashboardsTitle}
            </h2>
          </div>
          <div className="rounded-full border border-slate-200/80 bg-white/75 px-4 py-2 text-sm text-slate-600 shadow-[0_10px_24px_rgba(148,163,184,0.12)] dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:shadow-none">
            {copy.dashboardsPill}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {dashboards.map((dashboard) => (
            <DashboardCard
              key={dashboard.key}
              to={dashboard.path}
              title={dashboard.navLabel}
              description={dashboard.description}
              accentClass={dashboard.accentClass}
              accentTextClass={dashboard.accentTextClass}
              icon={dashboard.icon}
              tags={dashboard.tags}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-6 pb-10 lg:grid-cols-[1fr_0.95fr]">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_18px_48px_rgba(148,163,184,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/50 dark:shadow-glass">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-blue-500 to-emerald-400 text-white">
              <DatabaseZap size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                {copy.architectureEyebrow}
              </p>
              <h3 className="mt-1 font-display text-2xl text-slate-950 dark:text-white">
                {copy.architectureTitle}
              </h3>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {copy.architectureSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-[1.5rem] border border-slate-200/80 bg-white/75 p-5 shadow-[0_12px_30px_rgba(148,163,184,0.12)] dark:border-white/10 dark:bg-white/5 dark:shadow-none"
              >
                <p className="font-display text-3xl text-slate-900/90 dark:text-white/90">
                  {item.step}
                </p>
                <h4 className="mt-4 text-lg font-semibold text-slate-950 dark:text-white">
                  {item.title}
                </h4>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <InsightCard
            title={copy.insights[0].title}
            description={copy.insights[0].description}
            accentClass="from-sky-500 to-indigo-500"
            icon={ShieldCheck}
          />
          <InsightCard
            title={copy.insights[1].title}
            description={copy.insights[1].description}
            accentClass="from-pink-500 to-fuchsia-500"
            icon={Sparkles}
          />
          <InsightCard
            title={copy.insights[2].title}
            description={copy.insights[2].description}
            accentClass="from-emerald-500 to-lime-500"
            icon={ArrowRight}
          />
          <InsightCard
            title={copy.insights[3].title}
            description={copy.insights[3].description}
            accentClass="from-amber-500 to-orange-500"
            icon={DatabaseZap}
          />
        </div>
      </section>
    </PageReveal>
  );
}
