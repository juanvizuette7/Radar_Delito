import { motion } from "framer-motion";
import { ArrowUpRight, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

type DashboardCardProps = {
  to: string;
  title: string;
  description: string;
  accentClass: string;
  accentTextClass: string;
  icon: LucideIcon;
  tags: string[];
};

export function DashboardCard({
  to,
  title,
  description,
  accentClass,
  accentTextClass,
  icon: Icon,
  tags,
}: DashboardCardProps) {
  return (
    <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.25 }}>
      <Link
        to={to}
        className="group relative block overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glass backdrop-blur-xl"
      >
        <div
          className={`absolute inset-x-6 top-0 h-1 rounded-full bg-gradient-to-r ${accentClass}`}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative flex items-start justify-between">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${accentClass} text-white shadow-[0_12px_35px_rgba(15,23,42,0.35)]`}
          >
            <Icon size={22} />
          </div>
          <ArrowUpRight className="text-slate-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
        </div>

        <div className="relative mt-8 space-y-3">
          <h3 className="font-display text-2xl text-white">{title}</h3>
          <p className="max-w-md text-sm leading-7 text-slate-300">
            {description}
          </p>
        </div>

        <div className="relative mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${accentTextClass}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
