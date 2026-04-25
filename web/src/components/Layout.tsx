import { ReactNode } from "react";
import { Navbar } from "./Navbar";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink text-white">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-90" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:120px_120px] opacity-[0.08]" />
      <div className="pointer-events-none absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl" />
      <div className="pointer-events-none absolute right-[-8rem] top-48 h-80 w-80 rounded-full bg-pink-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-10rem] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

      <Navbar />

      <main className="relative z-10 px-4 pb-12 pt-32 sm:px-6 sm:pt-36">
        <div className="mx-auto max-w-8xl">{children}</div>
      </main>

      <footer className="relative z-10 border-t border-white/10 px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-8xl flex-col gap-3 text-sm text-slate-400">
          <p>
            Radar Delito. Plataforma de consulta para seguimiento de homicidios,
            delitos sexuales y hurto de vehículos en Colombia.
          </p>
          <p>Información consolidada para análisis territorial y temporal.</p>
          <p className="text-slate-300">Web hecha por Juan Vizuette.</p>
          <p>Créditos: Sebastián Rojas y Juan Lucero.</p>
        </div>
      </footer>
    </div>
  );
}
