import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-beige-300 dark:bg-[#080E1A]">
      <h1 className="text-6xl font-serif mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
      <Link
        to="/"
        className="bg-accent-500 text-white px-6 py-3 rounded hover:bg-accent-600"
      >
        Back to Home
      </Link>
    </div>
  );
}
