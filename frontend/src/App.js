
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import WaterPointsPage from "./pages/WaterPointsPage";
import ContactPage from "./pages/ContactPage";
import LandingPage from "./components/LandingPage";

//import Dashboard from "./components/Dashboard";
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
      <Toaster position="top-right" />  {/* 👈 always visible */}
      <div className="pt-20"> {/* pushes content down */}
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/waterpoints" element={<WaterPointsPage />} />

        <Route path="/map" element={<MapView />} />
        <Route path="/issues/:id" element={<IssueHistory />} />
        <Route path="/add" element={<AddWaterPoint />} />
       
         {/* Default homepage */}
        <Route path="/" element={<DashboardCards />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
       
        
        <Route path="*" element={<NotFound />} />

      


      </Routes>
      <Footer />
       </div>
    </Router>
    </ThemeProvider>
  );
}