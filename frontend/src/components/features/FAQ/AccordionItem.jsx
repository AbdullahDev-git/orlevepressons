export default function AccordionItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="overflow-hidden mb-4 rounded-2xl bg-[#F9F6F0] dark:bg-[#2A2A2A] border border-neutral-200 dark:border-neutral-700">
      <button
        onClick={onToggle}
        className="w-full p-5 flex justify-between items-start text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200"
      >
        <span className="font-serif text-lg font-bold text-neutral-800 dark:text-neutral-100 max-w-2xl">
          {question}
        </span>
        <span
          className={`text-2xl text-accent-500 ml-4 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 border-t border-neutral-200 dark:border-neutral-700 animate-slide-in">
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed pt-4">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}
