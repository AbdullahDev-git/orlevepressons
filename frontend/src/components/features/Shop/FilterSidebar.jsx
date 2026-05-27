import { useState } from "react";

export default function FilterSidebar({ filters, onFilterChange }) {
  const [expandedFilter, setExpandedFilter] = useState("collections");

  const toggleFilter = (filterName) => {
    setExpandedFilter(expandedFilter === filterName ? null : filterName);
  };

  return (
    <div className="space-y-6">
      {/* Collections Filter */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-6 animate-fade-in">
        <button
          onClick={() => toggleFilter("collections")}
          className="w-full flex justify-between items-center mb-4 hover:text-accent-500 transition"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Collections
          </h3>
          <span
            className={`text-lg transition ${expandedFilter === "collections" ? "rotate-180" : ""}`}
          >
            ▼
          </span>
        </button>
        {expandedFilter === "collections" && (
          <div className="space-y-3">
            {["All", "Classic", "Modern", "Luxury", "Seasonal"].map(
              (collection) => (
                <label
                  key={collection}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.collections.includes(collection)}
                    onChange={() => onFilterChange("collections", collection)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    {collection}
                  </span>
                </label>
              ),
            )}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-6 animate-fade-in">
        <button
          onClick={() => toggleFilter("price")}
          className="w-full flex justify-between items-center mb-4 hover:text-accent-500 transition"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Price Range
          </h3>
          <span
            className={`text-lg transition ${expandedFilter === "price" ? "rotate-180" : ""}`}
          >
            ▼
          </span>
        </button>
        {expandedFilter === "price" && (
          <div className="space-y-3">
            {[
              { label: "Under Rs. 5,000", max: 5000 },
              { label: "Rs. 5,000 - Rs. 7,500", min: 5000, max: 7500 },
              { label: "Rs. 7,500 - Rs. 10,000", min: 7500, max: 10000 },
              { label: "Over Rs. 10,000", min: 10000 },
            ].map((range) => (
              <label
                key={range.label}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="price"
                  checked={filters.priceRange === range.label}
                  onChange={() => onFilterChange("priceRange", range.label)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Size Filter */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-6 animate-fade-in">
        <button
          onClick={() => toggleFilter("size")}
          className="w-full flex justify-between items-center mb-4 hover:text-accent-500 transition"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white">Sizes</h3>
          <span
            className={`text-lg transition ${expandedFilter === "size" ? "rotate-180" : ""}`}
          >
            ▼
          </span>
        </button>
        {expandedFilter === "size" && (
          <div className="space-y-3">
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <label
                key={size}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.sizes.includes(size)}
                  onChange={() => onFilterChange("sizes", size)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  Size {size}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="animate-fade-in">
        <button
          onClick={() => toggleFilter("rating")}
          className="w-full flex justify-between items-center mb-4 hover:text-accent-500 transition"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Rating
          </h3>
          <span
            className={`text-lg transition ${expandedFilter === "rating" ? "rotate-180" : ""}`}
          >
            ▼
          </span>
        </button>
        {expandedFilter === "rating" && (
          <div className="space-y-3">
            {[5, 4, 3].map((stars) => (
              <label
                key={stars}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === stars}
                  onChange={() => onFilterChange("rating", stars)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  ★ {stars}+ ({stars === 5 ? "5" : stars === 4 ? "4-5" : "3-5"}{" "}
                  stars)
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => onFilterChange("clear")}
        className="w-full py-2 text-sm font-semibold text-accent-500 hover:text-accent-600 border border-accent-500 rounded hover:bg-accent-50 dark:hover:bg-accent-500/10 transition"
      >
        Clear All Filters
      </button>
    </div>
  );
}
