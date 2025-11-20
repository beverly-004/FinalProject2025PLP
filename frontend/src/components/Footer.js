// src/components/Footer.js
export default function Footer() {
  return (
    <footer className="w-full mt-16 bg-blue-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center">

        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400">AquaLink</h2>
          <p className="text-sm opacity-80 mt-1">
            Smart Water Access for Communities © 2025
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-5">

          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 text-2xl">
            <i className="fab fa-facebook"></i>
          </a>

          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 text-2xl">
            <i className="fab fa-twitter"></i>
          </a>

          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 text-2xl">
            <i className="fab fa-github"></i>
          </a>

          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 text-2xl">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
