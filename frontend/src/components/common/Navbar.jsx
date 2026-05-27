import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { useCart } from "../../hooks/useCart";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { items } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClass = "text-neutral-700 dark:text-neutral-200 hover:text-accent-500 transition";

  return (
    <nav className="bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-300 dark:border-neutral-700">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="font-serif text-2xl font-bold text-accent-500">
          ORLEVE
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={linkClass}>Home</Link>
          <Link to="/shop" className={linkClass}>Shop</Link>
          <Link to="/about" className={linkClass}>About</Link>
          <Link to="/faq" className={linkClass}>FAQ</Link>
          <Link to="/size-guide" className={linkClass}>Size Guide</Link>
          <Link to="/contact" className={linkClass}>Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded"
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <Link
            to="/cart"
            className="relative p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded"
          >
            🛒
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-neutral-700 dark:text-neutral-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            <Link to="/" className={linkClass} onClick={() => setMobileOpen(false)}>Home</Link>
            <Link to="/shop" className={linkClass} onClick={() => setMobileOpen(false)}>Shop</Link>
            <Link to="/about" className={linkClass} onClick={() => setMobileOpen(false)}>About</Link>
            <Link to="/faq" className={linkClass} onClick={() => setMobileOpen(false)}>FAQ</Link>
            <Link to="/size-guide" className={linkClass} onClick={() => setMobileOpen(false)}>Size Guide</Link>
            <Link to="/contact" className={linkClass} onClick={() => setMobileOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
