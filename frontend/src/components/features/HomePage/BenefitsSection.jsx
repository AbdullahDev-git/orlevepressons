import BenefitCard from "../../common/BenefitCard";
import mockBenefits from "../../../data/mockBenefits";

export default function BenefitsSection() {
  return (
    <section className="py-16 md:py-20 bg-beige-300 dark:bg-[#080E1A]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockBenefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <BenefitCard
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
