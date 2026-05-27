import mockInstagramImages from "../../../data/mockInstagramImages";

export default function InstagramGallery() {
  return (
    <section className="py-16 md:py-24 bg-beige-300 dark:bg-[#080E1A]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-slide-in">
          <p className="text-accent-500 text-sm font-serif tracking-widest uppercase mb-3">
            Follow the Atelier
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-100">
            @orleve.pressons
          </h2>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockInstagramImages.map((image, index) => (
            <a
              key={image.id}
              href="https://instagram.com/orleve.pressons"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer animate-fade-in hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  ❤️
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
