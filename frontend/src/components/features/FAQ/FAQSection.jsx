import { useState } from "react";
import AccordionItem from "./AccordionItem";
import mockFAQ from "../../../data/mockFAQ";
import Button from "../../common/Button";
import { useNavigate } from "react-router-dom";

export default function FAQSection() {
  const [openId, setOpenId] = useState(null);
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 bg-beige-300 dark:bg-[#080E1A]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-in">
          <p className="text-accent-500 text-sm font-serif tracking-widest uppercase mb-3">
            Information Atelier
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
            Frequently Asked
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Refining your digital manicure experience through curated care and
            detailed guidance.
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto mb-12">
          {mockFAQ.map((item) => (
            <AccordionItem
              key={item.id}
              question={item.question}
              answer={item.answer}
              isOpen={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-neutral-800 to-neutral-700 dark:from-neutral-900 dark:to-neutral-800 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image */}
            <div className="bg-gradient-to-br from-amber-200 to-amber-100 dark:from-amber-900 dark:to-amber-800 aspect-video lg:aspect-auto flex items-center justify-center">
              <img src="/public/images/hero/8.jpg" alt="FAQ" className="w-full h-full object-cover" />
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
                Still have questions?
              </h3>
              <p className="text-white/80 mb-8">
                Our concierge team is here to help with personalized guidance
                and support.
              </p>
              <div>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate("/contact")}
                  className="bg-white !text-[#1A1A1A] hover:bg-neutral-100 dark:bg-gray-900 dark:!text-white dark:hover:bg-gray-800"
                >
                  Message our Concierge
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
