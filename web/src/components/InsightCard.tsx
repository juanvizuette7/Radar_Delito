import { LucideIcon } from "lucide-react";

type InsightCardProps = {
  title: string;
  description: string;
  accentClass: string;
  icon: LucideIcon;
};

export function InsightCard({
  title,
  description,
  accentClass,
  icon: Icon,
}: InsightCardProps) {
  return (
    <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/75 p-5 shadow-[0_18px_48px_rgba(148,163,184,0.16)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/45 dark:shadow-glass">
      <div
        className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accentClass} text-white`}
      >
        <Icon size={18} />
      </div>
      <h3 className="font-display text-xl text-slate-950 dark:text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
        {description}
      </p>
    </div>
  );
}
