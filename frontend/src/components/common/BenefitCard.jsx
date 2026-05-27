import Card from "./Card";

export default function BenefitCard({ icon, title, description }) {
  return (
    <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="font-serif text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
        {title}
      </h3>
      <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
        {description}
      </p>
    </Card>
  );
}
