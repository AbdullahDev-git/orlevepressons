export default function AtelierHours() {
  const hours = [
    { day: "Monday", hours: "10:00 AM - 6:00 PM" },
    { day: "Tuesday", hours: "10:00 AM - 6:00 PM" },
    { day: "Wednesday", hours: "10:00 AM - 6:00 PM" },
    { day: "Thursday", hours: "10:00 AM - 6:00 PM" },
    { day: "Friday", hours: "10:00 AM - 8:00 PM" },
    { day: "Saturday", hours: "11:00 AM - 7:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ];

  const today = new Date().getDay();
  const isOpen = today !== 0; // Sunday is 0

  return (
    <div className="py-12 bg-beige-200 dark:bg-[#1E293B]/50 rounded-lg p-8 animate-fade-in">
      <div className="max-w-md mx-auto">
        <h3 className="text-2xl font-serif text-gray-900 dark:text-white mb-2">
          Atelier Hours
        </h3>
        <div className="flex items-center gap-2 mb-6">
          <span
            className={`inline-block w-3 h-3 rounded-full ${isOpen ? "bg-green-500" : "bg-red-500"}`}
          ></span>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isOpen ? "Currently Open" : "Currently Closed"}
          </p>
        </div>

        <div className="space-y-3">
          {hours.map((item, index) => (
            <div
              key={index}
              className={`flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700 last:border-0 ${
                today === (index === 6 ? 0 : index + 1)
                  ? "text-accent-500"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <span className="font-medium">{item.day}</span>
              <span className="text-sm">{item.hours}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            💡 <strong>Pro Tip:</strong> Book a virtual consultation with our
            concierge for personalized sizing recommendations!
          </p>
        </div>
      </div>
    </div>
  );
}
