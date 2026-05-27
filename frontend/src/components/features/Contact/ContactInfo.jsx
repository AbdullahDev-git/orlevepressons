export default function ContactInfo() {
  return (
    <div className="grid md:grid-cols-3 gap-8 py-12 animate-fade-in">
      {/* Email */}
      <div className="text-center">
        <div className="text-4xl mb-4">✉️</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Email
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          <a
            href="mailto:orlevepressons@outlook.com"
            className="hover:text-accent-500 dark:hover:text-accent-400 transition"
          >
            orlevepressons@outlook.com
          </a>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
          Typically responds within 24 hours
        </p>
      </div>

      {/* WhatsApp */}
      <div className="text-center">
        <div className="text-4xl mb-4">💬</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          WhatsApp
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          <a
            href="https://wa.me/923267172217"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-500 dark:hover:text-accent-400 transition"
          >
            +92 (326) 7172217
          </a>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
          Chat with our concierge
        </p>
      </div>

      {/* Instagram */}
      <div className="text-center">
        <div className="text-4xl mb-4">📸</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Instagram
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          <a
            href="https://instagram.com/orleve.pressons"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-500 dark:hover:text-accent-400 transition"
          >
            @orleve.pressons
          </a>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
          Follow for inspiration
        </p>
      </div>
    </div>
  );
}
