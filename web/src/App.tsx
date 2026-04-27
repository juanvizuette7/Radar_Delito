import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import { UiProvider } from "./context/UiContext";
import { DashboardPage } from "./pages/DashboardPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  const location = useLocation();

  return (
    <UiProvider>
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
