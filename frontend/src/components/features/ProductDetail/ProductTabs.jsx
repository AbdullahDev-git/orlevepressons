import { useState } from 'react';

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    {
      id: 'description',
      label: 'Description',
      content: product.description,
    },
    {
      id: 'materials',
      label: 'Materials & Care',
      content: `Our press-on nails are crafted from premium materials with salon-quality finishes. Each set includes: nail file, buffer, alcohol pads, and nail glue. To maintain longevity, avoid excessive water exposure and store in a cool, dry place.`,
    },
    {
      id: 'shipping',
      label: 'Shipping & Returns',
      content: `We ship Countrywide within 2-3 business days. Orders typically arrive within 5-10 business days. If you're not satisfied, simply contact our support team for assistance.`,
    },

  ];

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-8 animate-fade-in">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-4 border-b border-gray-200 dark:border-gray-700 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 font-medium border-b-2 transition ${
              activeTab === tab.id
                ? 'border-accent-500 text-accent-500 dark:text-accent-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}

