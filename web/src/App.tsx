import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import { DashboardPage } from "./pages/DashboardPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { dashboards } from "./data/dashboards";

const dashboardMap = {
  homicidios: dashboards[0],
  sexuales: dashboards[1],
  hurtos: dashboards[2],
};

function App() {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/homicidios"
            element={<DashboardPage dashboard={dashboardMap.homicidios} />}
          />
          <Route
            path="/sexuales"
            element={<DashboardPage dashboard={dashboardMap.sexuales} />}
          />
          <Route
            path="/hurtos"
            element={<DashboardPage dashboard={dashboardMap.hurtos} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

export default App;
