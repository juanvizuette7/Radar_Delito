import { motion } from "framer-motion";
import { Expand, Radar } from "lucide-react";

type DashboardEmbedProps = {
  title: string;
  url: string;
  accentClass: string;
};

export function DashboardEmbed({
  title,
  url,
  accentClass,
}: DashboardEmbedProps) {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/60 shadow-glass backdrop-blur-xl"
    >
      <div className="flex flex-col gap-4 border-b border-white/10 px-5 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${accentClass} text-white`}
          >
            <Radar size={18} />
          </div>
          <div>
            <p className="font-display text-lg text-white">{title}</p>
            <p className="text-sm text-slate-400">
              Consulta territorial, temporal y temática
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Consulta activa
          </span>
          <div className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300">
            <Expand size={16} />
          </div>
        </div>
      </div>

      <div className="p-3 md:p-4">
        <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900/70">
          <iframe
            title={title}
            src={url}
            className="h-[760px] w-full"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    </motion.section>
  );
}
