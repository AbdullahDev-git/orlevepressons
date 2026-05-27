export default function ValueCard({ icon, title, description }) {
  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-[20px] p-6 shadow-md text-center hover:shadow-lg transition-shadow duration-300">
      <div className="text-6xl mb-4 flex justify-center">{icon}</div>
      <h3 className="font-serif text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">{title}</h3>
      <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
