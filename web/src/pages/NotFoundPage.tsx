import { Link } from "react-router-dom";
import { PageReveal } from "../components/PageReveal";

export function NotFoundPage() {
  return (
    <PageReveal>
      <section className="flex min-h-[60vh] items-center justify-center">
        <div className="max-w-xl rounded-[2rem] border border-white/10 bg-slate-950/60 p-10 text-center shadow-glass backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            Error 404
          </p>
          <h1 className="mt-4 font-display text-5xl text-white">
            La vista no existe
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-300">
            Vuelve al inicio y entra por una de las rutas activas del dashboard.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-white/10"
          >
            Regresar al inicio
          </Link>
        </div>
      </section>
    </PageReveal>
  );
}
