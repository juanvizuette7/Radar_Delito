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
      className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-glass backdrop-blur-xl"
    >
      <div
        className={`mb-5 h-1 w-20 rounded-full bg-gradient-to-r ${accentClass}`}
      />
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>
      <p className="mt-4 font-display text-3xl text-white">{value}</p>
      <p className="mt-3 text-sm leading-7 text-slate-300">{detail}</p>
    </motion.div>
  );
}
