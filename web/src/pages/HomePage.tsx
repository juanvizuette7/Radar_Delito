import { motion } from "framer-motion";
import { ArrowRight, DatabaseZap, Play, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { DashboardCard } from "../components/DashboardCard";
import { InsightCard } from "../components/InsightCard";
import { PageReveal } from "../components/PageReveal";
import { dashboards, overviewCards } from "../data/dashboards";

export function HomePage() {
  return (
    <PageReveal>
      <section className="grid gap-8 pb-12 pt-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-300"
          >
            <Sparkles size={16} />
            Plataforma analítica de criminalidad
          </motion.div>

          <div className="max-w-4xl space-y-6">
            <h1 className="font-display text-5xl leading-tight text-white sm:text-6xl xl:text-7xl">
              Seguimiento nacional para{" "}
              <span className="bg-gradient-to-r from-sky-300 via-pink-300 to-emerald-300 bg-clip-text text-transparent">
                homicidios, delitos sexuales y hurto de vehículos
              </span>{" "}
              en Colombia.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              Esta plataforma centraliza la consulta de indicadores de criminalidad
              con lectura territorial, temporal y temática para apoyar análisis,
              seguimiento y toma de decisiones.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              to="/homicidios"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 px-6 py-4 font-semibold text-white shadow-[0_18px_40px_rgba(59,130,246,0.35)] transition-transform duration-300 hover:-translate-y-1"
            >
              Explorar dashboards
              <ArrowRight size={18} />
            </Link>
            <a
              href="#resumen"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-4 font-semibold text-slate-100 transition-colors duration-300 hover:bg-white/10"
            >
              <Play size={18} />
              Ver resumen
            </a>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {overviewCards.map((card) => (
              <div
                key={card.label}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-glass backdrop-blur-xl"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-slate-100">
                  <card.icon size={18} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {card.label}
                </p>
                <p className="mt-3 font-display text-2xl text-white">{card.value}</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
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
          <div className="absolute inset-0 rounded-[2.25rem] bg-gradient-to-br from-sky-500/20 via-fuchsia-500/15 to-emerald-500/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-slate-950/65 p-6 shadow-glass backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Resumen nacional
                </p>
                <h2 className="mt-3 font-display text-3xl text-white">
                  Frentes de seguimiento
                </h2>
              </div>
              <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Activo
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {dashboards.map((dashboard, index) => (
                <motion.div
                  key={dashboard.key}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.08, duration: 0.35 }}
                  className={`rounded-[1.6rem] border p-5 ${dashboard.panelClass}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${dashboard.accentClass} text-white`}
                    >
                      <dashboard.icon size={20} />
                    </div>
                    <div className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200">
                      {dashboard.badge}
                    </div>
                  </div>
                  <p className="mt-5 font-display text-xl text-white">
                    {dashboard.title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    {dashboard.subtitle}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Cobertura
                </p>
                <p className="mt-3 font-display text-2xl text-white">
                  Consulta por temática
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Cada sección concentra variables y lecturas propias del frente
                  analítico correspondiente.
                </p>
              </div>
              <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Alcance
                </p>
                <p className="mt-3 font-display text-2xl text-white">
                  Seguimiento continuo
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  La consulta reúne métricas, filtros y visualizaciones para
                  revisión periódica de los datos.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="resumen" className="space-y-6 pb-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Dashboards
            </p>
            <h2 className="mt-3 font-display text-4xl text-white">
              Selecciona un frente de análisis
            </h2>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            Consulta consolidada para seguimiento territorial y temporal.
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
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/50 p-6 shadow-glass backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-blue-500 to-emerald-400 text-white">
              <DatabaseZap size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Arquitectura
              </p>
              <h3 className="mt-1 font-display text-2xl text-white">
                Flujo listo para operación
              </h3>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Datos limpios",
                copy: "Las tablas parten de archivos ya normalizados, validados y consolidados.",
              },
              {
                step: "02",
                title: "PostgreSQL",
                copy: "La base centraliza la información y permite consulta estructurada de los indicadores.",
              },
              {
                step: "03",
                title: "Consulta integrada",
                copy: "La plataforma reúne los tableros y facilita la lectura operativa desde un mismo entorno.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"
              >
                <p className="font-display text-3xl text-white/90">{item.step}</p>
                <h4 className="mt-4 text-lg font-semibold text-white">
                  {item.title}
                </h4>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <InsightCard
            title="Lectura ejecutiva"
            description="Cada vista resume indicadores y variables clave para entender la situación general de forma rápida."
            accentClass="from-sky-500 to-indigo-500"
            icon={ShieldCheck}
          />
          <InsightCard
            title="Cobertura temática"
            description="Los tres tableros permiten revisar violencia letal, delitos sexuales y hurto de vehículos en un mismo sitio."
            accentClass="from-pink-500 to-fuchsia-500"
            icon={Sparkles}
          />
          <InsightCard
            title="Acceso multiplataforma"
            description="La navegación y los tableros pueden consultarse desde escritorio, tableta o móvil."
            accentClass="from-emerald-500 to-lime-500"
            icon={ArrowRight}
          />
          <InsightCard
            title="Escalabilidad analítica"
            description="La estructura permite incorporar nuevos tableros, indicadores o fuentes cuando el proyecto lo requiera."
            accentClass="from-amber-500 to-orange-500"
            icon={DatabaseZap}
          />
        </div>
      </section>
    </PageReveal>
  );
}
