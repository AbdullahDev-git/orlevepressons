import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-neutral-100 dark:bg-neutral-800 border-t border-neutral-300 dark:border-neutral-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 mt-10">
          {/* Brand Column */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-4 text-accent-500">
ORLEVE
            </h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              The Art of Digital Couture. Premium press-on nails for the modern
              aesthetic.
            </p>
          </div>

          {/* SHOP Column */}
          <div>
            <h5 className="font-bold mb-4">SHOP</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shop" className="hover:text-accent-500">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-accent-500">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-accent-500">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* SUPPORT Column */}
          <div>
            <h5 className="font-bold mb-4">SUPPORT</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/size-guide" className="hover:text-accent-500">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-accent-500">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent-500">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-neutral-300 dark:border-neutral-700 pt-8 text-center text-sm text-neutral-600 dark:text-neutral-400">
          <p>&copy; 2026 ORLEVE PRESSONS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}