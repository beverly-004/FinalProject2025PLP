export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200">
      <h1 className="text-7xl font-bold text-blue-600 dark:text-blue-400">404</h1>
      <p className="text-xl mt-4">Oops! The page you’re looking for doesn’t exist.</p>

      <a
        href="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go Home
      </a>
    </div>
  );
}
