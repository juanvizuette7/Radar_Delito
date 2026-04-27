import { AnimatePresence } from "framer-motion";
import { useEffect, useLayoutEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import { UiProvider } from "./context/UiContext";
import { DashboardPage } from "./pages/DashboardPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";

function NavigationEffects() {
  const location = useLocation();

  useEffect(() => {
    const { history } = window;
    if (!history.scrollRestoration) {
      return;
    }

    const previousScrollRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";

    return () => {
      history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const frameId = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    const timeoutId = window.setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, 120);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
    };
  }, [location.pathname]);

  return null;
}

function App() {
  const location = useLocation();

  return (
    <UiProvider>
      <NavigationEffects />
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/homicidios"
              element={<DashboardPage dashboardKey="homicidios" />}
            />
            <Route
              path="/sexuales"
              element={<DashboardPage dashboardKey="sexuales" />}
            />
            <Route
              path="/hurtos"
              element={<DashboardPage dashboardKey="hurtos" />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </UiProvider>
  );
}

export default App;
