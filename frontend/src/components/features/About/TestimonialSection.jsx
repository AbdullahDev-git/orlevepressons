import Card from "../../common/Card";

export default function TestimonialSection() {
  return (
    <section className="py-16 md:py-24 bg-beige-300 dark:bg-[#080E1A]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center animate-slide-in">
          {/* Profile Circle */}
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-accent-200 to-accent-100 dark:from-accent-900 dark:to-accent-800 rounded-full flex items-center justify-center">
              <span className="text-6xl md:text-7xl">👩‍🎨</span>
            </div>
          </div>

          {/* Quote */}
          <blockquote className="mb-6">
            <p className="font-serif text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 italic mb-4 leading-relaxed">
              "We didn't just want to create another beauty product. We wanted
              to create a ritual that empowers you to change your aesthetic as
              often as you change your mood."
            </p>
          </blockquote>

          {/* Attribution */}
          <div className="text-center">
            <p className="text-neutral-600 dark:text-neutral-400 font-serif">
              Founder @ Orleve Pressons
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
