import { useState } from "react";
import Input from "../../common/Input";
import Button from "../../common/Button";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-20 md:py-24 bg-beige-300 dark:bg-[#080E1A]">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-accent-500 text-sm font-serif tracking-widest uppercase mb-3">
            ✨ Exclusive Access ✨
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-neutral-800 dark:text-white mb-4">
            Join the Inner Circle
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 text-lg mb-8">
            Get early access to new drops, member-only discounts, and nail inspo straight to your inbox. 💅
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {submitted && (
              <div className="bg-white dark:bg-[#1E293B] text-neutral-800 dark:text-white p-4 rounded-xl animate-fade-in shadow-md">
                🎉 Thanks for joining! Check your inbox for a special welcome gift.
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  error={error}
                  noMargin
                  className="w-full px-5 py-3 rounded-xl border border-neutral-300 dark:border-gray-700 bg-white dark:bg-[#1E293B] text-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="whitespace-nowrap sm:w-auto w-full bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-xl transition-all duration-300 font-semibold"
              >
                Subscribe → 
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}