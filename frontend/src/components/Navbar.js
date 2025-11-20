
import { Link } from "react-router-dom";
import { useTheme } from "../ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        <Link
          to="/"
          className="text-2xl font-bold text-blue-700 dark:text-blue-300"
        >
          AquaLink
        </Link>

        <div className="flex items-center gap-8 text-gray-700 dark:text-gray-300">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-300">Home</Link>
          <Link to="/waterpoints" className="hover:text-blue-600 dark:hover:text-blue-300">Water Points</Link>
          <Link to="/map" className="hover:text-blue-600 dark:hover:text-blue-300">Map View</Link>
          <Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-300">Contact</Link>
        </div>

        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>

      </div>
    </nav>
  );
}
