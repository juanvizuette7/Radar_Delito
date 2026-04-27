import { Link } from "react-router-dom";
import { PageReveal } from "../components/PageReveal";
import { useUi } from "../context/UiContext";
import { siteCopy } from "../data/siteCopy";

export function NotFoundPage() {
  const { language } = useUi();
  const copy = siteCopy[language].notFound;

  return (
    <PageReveal>
      <section className="flex min-h-[60vh] items-center justify-center">
        <div className="max-w-xl rounded-[2rem] border border-slate-200/80 bg-white/85 p-10 text-center shadow-[0_18px_48px_rgba(148,163,184,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60 dark:shadow-glass">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            Error 404
          </p>
          <h1 className="mt-4 font-display text-5xl text-slate-950 dark:text-white">
            {copy.title}
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
            {copy.description}
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex rounded-full border border-slate-200/80 bg-white/80 px-6 py-3 font-semibold text-slate-900 shadow-[0_12px_28px_rgba(148,163,184,0.12)] transition-colors duration-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:shadow-none dark:hover:bg-white/10"
          >
            {copy.backHome}
          </Link>
        </div>
      </section>
    </PageReveal>
  );
}
