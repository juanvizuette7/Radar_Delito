import { motion } from "framer-motion";

type KPIProps = {
  label: string;
  value: string;
  detail: string;
  accentClass: string;
};

export function KPI({ label, value, detail, accentClass }: KPIProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-[1.5rem] border border-slate-200/80 bg-white/80 p-4 shadow-[0_18px_48px_rgba(148,163,184,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-glass"
    >
      <div
        className={`mb-4 h-1 w-16 rounded-full bg-gradient-to-r ${accentClass}`}
      />
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="mt-3 font-display text-2xl text-slate-950 dark:text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{detail}</p>
    </motion.div>
  );
}
