import ValueCard from "../../common/ValueCard";
import mockValues from "../../../data/mockValues";

export default function ValuesSection() {
  return (
    <section className="py-16 md:py-24 bg-beige-200 dark:bg-[#080E1A]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-slide-in">
          <p className="text-accent-500 text-sm font-serif tracking-widest uppercase mb-3">
            Quality Without Compromise
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-100">
            Values at our Core
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockValues.map((value, index) => (
            <div
              key={value.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ValueCard
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
