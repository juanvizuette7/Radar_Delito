import { motion } from "framer-motion";
import { Expand, Minimize, Radar } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useUi } from "../context/UiContext";
import { siteCopy } from "../data/siteCopy";

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
  const { language } = useUi();
  const copy = siteCopy[language].embed;
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === sectionRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    const element = sectionRef.current;
    if (!element) {
      return;
    }

    if (document.fullscreenElement === element) {
      await document.exitFullscreen();
      return;
    }

    await element.requestFullscreen();
  };

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="dashboard-fullscreen overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/85 shadow-[0_18px_48px_rgba(148,163,184,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60 dark:shadow-glass"
    >
      <div className="flex flex-col gap-4 border-b border-slate-200/80 px-5 py-4 dark:border-white/10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${accentClass} text-white`}
          >
            <Radar size={18} />
          </div>
          <div>
            <p className="font-display text-lg text-slate-950 dark:text-white">{title}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{copy.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full border border-emerald-300/60 bg-emerald-100/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-300">
            {copy.active}
          </span>
          <button
            type="button"
            onClick={toggleFullscreen}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 shadow-[0_10px_28px_rgba(148,163,184,0.12)] transition-colors duration-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:shadow-none dark:hover:bg-white/10"
            title={isFullscreen ? copy.closeFullscreen : copy.openFullscreen}
            aria-label={isFullscreen ? copy.closeFullscreen : copy.openFullscreen}
          >
            {isFullscreen ? <Minimize size={16} /> : <Expand size={16} />}
            <span className="hidden sm:inline">
              {isFullscreen ? copy.closeFullscreen : copy.openFullscreen}
            </span>
          </button>
        </div>
      </div>

      <div className={`p-3 md:p-4 ${isFullscreen ? "h-full" : ""}`}>
        <div className="overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-slate-100/80 dark:border-white/10 dark:bg-slate-900/70">
          <iframe
            title={title}
            src={url}
            className={isFullscreen ? "h-[calc(100vh-8.5rem)] w-full" : "h-[760px] w-full"}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    </motion.section>
  );
}
