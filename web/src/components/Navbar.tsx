import { AnimatePresence, motion } from "framer-motion";
import { Languages, Menu, Moon, Radar, Sun, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useUi } from "../context/UiContext";
import { getDashboards } from "../data/dashboards";
import { siteCopy } from "../data/siteCopy";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300",
    isActive
      ? "text-slate-950 dark:text-white"
      : "text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white",
  ].join(" ");

type QuickToggleProps = {
  label: string;
  value: string;
  onClick: () => void;
  icon: typeof Sun;
};

function QuickToggle({ label, value, onClick, icon: Icon }: QuickToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 shadow-[0_10px_28px_rgba(148,163,184,0.12)] transition-colors duration-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:shadow-none dark:hover:bg-white/10"
      title={label}
      aria-label={label}
    >
      <Icon size={14} />
      <span>{value}</span>
    </button>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { language, theme, toggleLanguage, toggleTheme } = useUi();
  const copy = siteCopy[language].nav;
  const dashboards = getDashboards(language);
  const navItems = [
    { label: copy.home, to: "/" },
    ...dashboards.map(({ navLabel, path }) => ({ label: navLabel, to: path })),
  ];

  const themeLabel = theme === "dark" ? copy.light : copy.dark;
  const ThemeIcon = theme === "dark" ? Sun : Moon;
  const menuLabel = open ? copy.closeMenu : copy.openMenu;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6">
      <div className="mx-auto flex max-w-8xl items-center justify-between rounded-full border border-slate-200/80 bg-white/80 px-5 py-3 shadow-[0_16px_50px_rgba(148,163,184,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/65 dark:shadow-glass">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-full transition-transform duration-300 hover:scale-[1.02]"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-blue-500 to-emerald-400 text-white shadow-[0_10px_45px_rgba(59,130,246,0.35)]">
            <Radar size={20} />
          </div>
          <div>
            <p className="font-display text-sm uppercase tracking-[0.28em] text-sky-600/90 dark:text-sky-300/80">
              Radar Delito
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === "es" ? "Criminalidad en Colombia" : "Crime in Colombia"}
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
                      className="absolute inset-0 -z-10 rounded-full bg-slate-900/8 dark:bg-white/10"
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
          <QuickToggle
            label={`${copy.languageLabel}: ${language === "es" ? copy.english : copy.spanish}`}
            value={language === "es" ? copy.english : copy.spanish}
            onClick={toggleLanguage}
            icon={Languages}
          />
          <QuickToggle
            label={`${copy.themeLabel}: ${themeLabel}`}
            value={themeLabel}
            onClick={toggleTheme}
            icon={ThemeIcon}
          />
          <div className="rounded-full border border-emerald-300/60 bg-emerald-100/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-300">
            {copy.badge}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-900 shadow-[0_10px_28px_rgba(148,163,184,0.12)] dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:shadow-none lg:hidden"
          aria-label={menuLabel}
          title={menuLabel}
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
            className="mx-auto mt-3 max-w-8xl rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-[0_16px_50px_rgba(148,163,184,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90 dark:shadow-glass lg:hidden"
          >
            <div className="mb-4 flex flex-wrap gap-3">
              <QuickToggle
                label={`${copy.languageLabel}: ${language === "es" ? copy.english : copy.spanish}`}
                value={language === "es" ? copy.english : copy.spanish}
                onClick={toggleLanguage}
                icon={Languages}
              />
              <QuickToggle
                label={`${copy.themeLabel}: ${themeLabel}`}
                value={themeLabel}
                onClick={toggleTheme}
                icon={ThemeIcon}
              />
            </div>

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
                        ? "bg-slate-900/8 text-slate-950 dark:bg-white/10 dark:text-white"
                        : "text-slate-600 hover:bg-slate-900/5 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white",
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
