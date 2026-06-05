import Button from "../../common/Button";
import sizeGuideData from "../../../data/sizeGuideData";

export default function SizeGuideSection() {
  return (
    <section className="py-16 md:py-24 bg-beige-300 dark:bg-[#080E1A]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-in">
          <p className="text-accent-500 text-sm font-serif tracking-widest uppercase mb-3">
            Crafting the Perfect Fit
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-100">
            Size Guide
          </h1>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Image with Label */}
          <div className="animate-fade-in">
            <div className="rounded-2xl overflow-hidden aspect-square relative">
              <img
                src="/images/hero/9.jpg"
                alt="How to measure press-on nails"
              />
            </div>
          </div>

          {/* Right: Size Table */}
          <div className="animate-fade-in">
            {/* Table Header */}
            <div className="mb-4 flex justify-between items-center">
              <h3 className="font-serif font-bold text-neutral-800 dark:text-neutral-100">
                Standard Sizes
              </h3>
              <span className="text-sm text-accent-500">
                Unit: {sizeGuideData.unit}
              </span>
            </div>

            {/* Size Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-neutral-100 dark:bg-neutral-700">
                    <th className="px-4 py-3 text-left font-bold text-neutral-800 dark:text-neutral-100">
                      Size
                    </th>
                    <th className="px-4 py-3 text-center font-bold text-neutral-800 dark:text-neutral-100">
                      Thumb
                    </th>
                    <th className="px-4 py-3 text-center font-bold text-neutral-800 dark:text-neutral-100">
                      Index
                    </th>
                    <th className="px-4 py-3 text-center font-bold text-neutral-800 dark:text-neutral-100">
                      Middle
                    </th>
                    <th className="px-4 py-3 text-center font-bold text-neutral-800 dark:text-neutral-100">
                      Ring
                    </th>
                    <th className="px-4 py-3 text-center font-bold text-neutral-800 dark:text-neutral-100">
                      Pinky
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sizeGuideData.sizes.map((row, index) => (
                    <tr
                      key={row.size}
                      className={`border-b border-neutral-200 dark:border-neutral-600 ${
                        index % 2 === 0
                          ? "bg-white dark:bg-neutral-800"
                          : "bg-neutral-50 dark:bg-neutral-700"
                      }`}
                    >
                      <td className="px-4 py-4 font-bold text-accent-500">
                        {row.size}
                      </td>
                      <td className="px-4 py-4 text-center text-neutral-700 dark:text-neutral-300">
                        {row.thumb}
                      </td>
                      <td className="px-4 py-4 text-center text-neutral-700 dark:text-neutral-300">
                        {row.index}
                      </td>
                      <td className="px-4 py-4 text-center text-neutral-700 dark:text-neutral-300">
                        {row.middle}
                      </td>
                      <td className="px-4 py-4 text-center text-neutral-700 dark:text-neutral-300">
                        {row.ring}
                      </td>
                      <td className="px-4 py-4 text-center text-neutral-700 dark:text-neutral-300">
                        {row.pinky}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Custom Sizing Info */}
            <div className="mt-6 bg-neutral-50 dark:bg-neutral-700 p-6 rounded-lg">
              <h3 className="font-serif font-bold text-neutral-800 dark:text-neutral-100 mb-3">
                How to Measure
              </h3>
              <ul className="space-y-3">
                {sizeGuideData.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 text-accent-500 font-bold">
                      {index + 1}.
                    </span>
                    <span className="text-neutral-700 dark:text-neutral-300">
                      {instruction}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 pt-16 border-t border-neutral-200 dark:border-neutral-600">
          <div className="text-center animate-fade-in">
            <div className="text-4xl mb-3">✓</div>
            <h3 className="font-serif font-bold text-neutral-800 dark:text-neutral-100 mb-2">
              Precision
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              Every set is measured twice to ensure your couture fits
              flawlessly.
            </p>
          </div>
          <div
            className="text-center animate-fade-in"
            style={{ animationDelay: "100ms" }}
          >
            <div className="text-4xl mb-3">✨</div>
            <h3 className="font-serif font-bold text-neutral-800 dark:text-neutral-100 mb-2">
              Quality
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              Using only professional-grade resin for a salon-quality finish and
              feel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
