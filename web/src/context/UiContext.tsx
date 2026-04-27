import {
  ReactNode,
  createContext,
  startTransition,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Theme = "light" | "dark";
export type Language = "es" | "en";

type UiContextValue = {
  theme: Theme;
  language: Language;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  toggleTheme: () => void;
  toggleLanguage: () => void;
};

const THEME_KEY = "radar-delito-theme";
const LANGUAGE_KEY = "radar-delito-language";

const UiContext = createContext<UiContextValue | null>(null);

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  const storedTheme = window.localStorage.getItem(THEME_KEY);
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getInitialLanguage(): Language {
  if (typeof window === "undefined") {
    return "es";
  }

  const storedLanguage = window.localStorage.getItem(LANGUAGE_KEY);
  if (storedLanguage === "es" || storedLanguage === "en") {
    return storedLanguage;
  }

  return "es";
}

type UiProviderProps = {
  children: ReactNode;
};

export function UiProvider({ children }: UiProviderProps) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(LANGUAGE_KEY, language);
  }, [language]);

  const value = useMemo<UiContextValue>(
    () => ({
      theme,
      language,
      setTheme: (nextTheme) => {
        startTransition(() => setThemeState(nextTheme));
      },
      setLanguage: (nextLanguage) => {
        startTransition(() => setLanguageState(nextLanguage));
      },
      toggleTheme: () => {
        startTransition(() =>
          setThemeState((currentTheme) => (currentTheme === "dark" ? "light" : "dark")),
        );
      },
      toggleLanguage: () => {
        startTransition(() =>
          setLanguageState((currentLanguage) => (currentLanguage === "es" ? "en" : "es")),
        );
      },
    }),
    [language, theme],
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi() {
  const context = useContext(UiContext);

  if (!context) {
    throw new Error("useUi debe usarse dentro de UiProvider.");
  }

  return context;
}
