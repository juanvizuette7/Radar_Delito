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
    <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-5 backdrop-blur-xl">
      <div
        className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accentClass} text-white`}
      >
        <Icon size={18} />
      </div>
      <h3 className="font-display text-xl text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p>
    </div>
  );
}
