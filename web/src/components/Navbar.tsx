import { AnimatePresence, motion } from "framer-motion";
import { Menu, Radar, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { dashboards } from "../data/dashboards";

const navItems = [
  { label: "Inicio", to: "/" },
  ...dashboards.map(({ navLabel, path }) => ({ label: navLabel, to: path })),
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300",
    isActive ? "text-white" : "text-slate-300 hover:text-white",
  ].join(" ");

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6">
      <div className="mx-auto flex max-w-8xl items-center justify-between rounded-full border border-white/10 bg-slate-950/65 px-5 py-3 shadow-glass backdrop-blur-xl">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-full transition-transform duration-300 hover:scale-[1.02]"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-blue-500 to-emerald-400 text-white shadow-[0_10px_45px_rgba(59,130,246,0.35)]">
            <Radar size={20} />
          </div>
          <div>
            <p className="font-display text-sm uppercase tracking-[0.28em] text-sky-300/80">
              Radar Delito
            </p>
            <p className="text-xs text-slate-400">
              Criminalidad en Colombia
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={navLinkClass}>
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/10"
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    />
                  ) : null}
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
            Seguimiento nacional
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 lg:hidden"
          aria-label="Abrir menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-3 max-w-8xl rounded-3xl border border-white/10 bg-slate-950/90 p-4 shadow-glass backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    [
                      "rounded-2xl px-4 py-3 text-sm font-semibold transition-colors duration-300",
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-slate-300 hover:bg-white/5 hover:text-white",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
