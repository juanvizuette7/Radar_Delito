import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useUi } from "../context/UiContext";
import { siteCopy } from "../data/siteCopy";
import { Navbar } from "./Navbar";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { language } = useUi();
  const footerCopy = siteCopy[language].footer;
  const isDashboardRoute = ["/homicidios", "/sexuales", "/hurtos"].includes(location.pathname);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-ink dark:text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_8%,rgba(59,130,246,0.12),transparent_26%),radial-gradient(circle_at_82%_12%,rgba(236,72,153,0.10),transparent_22%),radial-gradient(circle_at_52%_96%,rgba(34,197,94,0.10),transparent_28%)] opacity-100 dark:bg-mesh dark:opacity-90" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:120px_120px] opacity-[0.05] dark:opacity-[0.08]" />
      <div className="pointer-events-none absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-sky-500/12 blur-3xl dark:bg-sky-500/15" />
      <div className="pointer-events-none absolute right-[-8rem] top-48 h-80 w-80 rounded-full bg-pink-500/8 blur-3xl dark:bg-pink-500/10" />
      <div className="pointer-events-none absolute bottom-[-10rem] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-500/8 blur-3xl dark:bg-emerald-500/10" />

      <Navbar />

      <main
        className={[
          "relative z-10 px-4 sm:px-6",
          isDashboardRoute ? "pb-5 pt-28 sm:pt-32" : "pb-12 pt-32 sm:pt-36",
        ].join(" ")}
      >
        <div className="mx-auto max-w-8xl">{children}</div>
      </main>

      {!isDashboardRoute ? (
        <footer className="relative z-10 border-t border-slate-200/80 px-4 py-8 sm:px-6 dark:border-white/10">
          <div className="mx-auto flex max-w-8xl flex-col gap-3 text-sm text-slate-500 dark:text-slate-400">
            <p>{footerCopy.title}</p>
            <p>{footerCopy.subtitle}</p>
            <p className="text-slate-700 dark:text-slate-300">{footerCopy.author}</p>
            <p>{footerCopy.credits}</p>
          </div>
        </footer>
      ) : null}
    </div>
  );
}
