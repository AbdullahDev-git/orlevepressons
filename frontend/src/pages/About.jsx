import HeritageSection from "../components/features/About/HeritageSection";
import ValuesSection from "../components/features/About/ValuesSection";
import TestimonialSection from "../components/features/About/TestimonialSection";

export default function About() {
  return (
    <div className="bg-beige-300 dark:bg-[#080E1A]">
      <HeritageSection />
      <ValuesSection />
      <TestimonialSection />
    </div>
  );
}
