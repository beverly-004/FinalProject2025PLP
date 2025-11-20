
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import WaterPointsPage from "./pages/WaterPointsPage";
import ContactPage from "./pages/ContactPage";
import LandingPage from "./components/LandingPage";
import MapView from "./components/MapView";
import IssueHistory from "./components/IssueHistory";
import AddWaterPoint from "./components/AddWaterPoint";
import DashboardCards from "./components/DashboardCards";
import AboutPage from "./components/AboutPage";
import { ThemeProvider } from "./ThemeContext";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import NotFound from "./components/NotFound";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar /> 
        <Toaster position="top-right" />

        <div className="pt-20">
          <Routes>
            {/* Homepage */}
            <Route path="/" element={<LandingPage />} />

            {/* Water Points */}
            <Route path="/waterpoints" element={<WaterPointsPage />} />

            {/* Map */}
            <Route path="/map" element={<MapView />} />

            {/* Issue History */}
            <Route path="/issues/:id" element={<IssueHistory />} />

            {/* Add Water Point */}
            <Route path="/add" element={<AddWaterPoint />} />

            {/* Dashboard (optional - choose your path) */}
            <Route path="/dashboard" element={<DashboardCards />} />

            {/* Contact */}
            <Route path="/contact" element={<ContactPage />} />

            {/* About */}
            <Route path="/about" element={<AboutPage />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}