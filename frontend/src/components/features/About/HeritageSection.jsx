import Card from "../../common/Card";

export default function HeritageSection() {
  return (
    <section className="py-16 md:py-24 bg-beige-300 dark:bg-[#080E1A]">
      <div className="container mx-auto px-4">
        <div className="mb-8 animate-slide-in">
          <p className="text-accent-500 text-sm font-serif tracking-widest uppercase mb-4">
            Our Heritage
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-6">
            Digital Couture for the Modern Muse
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="space-y-6 animate-fade-in">
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-lg">
              Founded at the intersection of high fashion editorial and Gen Z
              digital couture, ORLEV reimagines the nail salon experience as an
              accessible luxury atelier.
            </p>

            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-lg">
              We believe that self-expression shouldn't be a three-hour
              appointment. Our press-ons are engineered with digital artists to
              create every set like a bespoke commission from a master
              technician.
            </p>

            <div className="bg-neutral-50 dark:bg-neutral-700 p-6 border-l-4 border-accent-500 italic">
              <p className="text-neutral-700 dark:text-neutral-300">
                "The future of beauty is fast, fluid and fiercely individual."
              </p>
              <p className="text-accent-500 font-serif font-bold mt-3">
                — Orlev Creative Studio
              </p>
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4 animate-fade-in">
            <div className="bg-gradient-to-br from-amber-200 to-amber-100 dark:from-amber-900 dark:to-amber-800 rounded-lg aspect-square flex items-center justify-center">
              <img src="/public/images/hero/5.jpg" alt="heritage"/>
            </div>
            <div className="bg-gradient-to-br from-rose-200 to-rose-100 dark:from-rose-900 dark:to-rose-800 rounded-lg aspect-square flex items-center justify-center">
              <img src="/public/images/hero/6.jpg" alt="heritage"/>
            </div>
            <div className="col-span-2 bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-700 dark:to-neutral-600 rounded-lg aspect-video flex items-center justify-center">
              <img src="/public/images/hero/7.jpg" alt="heritage"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
