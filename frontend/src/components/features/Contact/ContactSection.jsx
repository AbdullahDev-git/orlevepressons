import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

export default function ContactSection() {
  return (
    <div className="min-h-screen bg-beige-300 dark:bg-[#080E1A]">
      {/* Hero Section */}
      <div className="py-20 bg-beige-300 dark:bg-[#080E1A] border-b border-beige-400 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 text-center animate-slide-in">
          <p className="text-accent-500 dark:text-accent-400 font-semibold mb-2 text-sm tracking-wider">
            GET IN TOUCH
          </p>
          <h1 className="text-5xl md:text-6xl font-serif text-gray-900 dark:text-white mb-4">
            Message Our Atelier
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions about sizing, collections, or custom orders? Our
            creative team is here to help.
          </p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <ContactInfo />
      </div>

      {/* Main Contact Section */}
      <div className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <div>
          <h2 className="text-3xl font-serif text-gray-900 dark:text-white mb-8">
            Send us a Message
          </h2>
          <ContactForm />
        </div>

        {/* Right Column - Hours & Info */}
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-serif text-gray-900 dark:text-white mb-4">
              Connect With Us
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Whether you need sizing help, want to discuss a custom order, or
              just want to chat about nails—we're here for you.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <span className="text-2xl">🎯</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Quick Response
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Our team typically responds within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="text-2xl">🌍</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Global Shipping
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We ship across Pakistan with discreet packaging
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="text-2xl">💎</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Expert Guidance
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Personalized recommendations for your nail needs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-accent-500/10 to-accent-400/10 dark:from-accent-500/5 dark:to-accent-400/5 py-16 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-accent-500 dark:text-accent-400 font-semibold tracking-wider mb-2">
            ATELIER COMMUNITY
          </p>
          <h2 className="text-3xl font-serif text-gray-900 dark:text-white mb-4">
            Can't wait to respond? Join us on Instagram
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Follow @orleve.pressons for daily inspiration, customer looks, and
            exclusive peeks into our atelier.
          </p>
          <a
            href="https://instagram.com/orleve.pressons"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-accent-500 text-white rounded hover:bg-accent-600 transition hover:text-white"
          >
            Visit Our Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
