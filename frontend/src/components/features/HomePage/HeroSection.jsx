import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-beige-300 to-beige-200 dark:from-[#080E1A] dark:to-[#0D1525] flex items-center">
      <div className="container mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="space-y-6 animate-slide-in">
          <div>
            <p className="text-accent-500 text-sm font-serif tracking-widest uppercase mb-2">
              Premium Digital Couture
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-100 leading-tight">
              Where are you going?
            </h1>
          </div>

          <p className="text-neutral-600 dark:text-neutral-300 text-lg max-w-xl leading-relaxed">
            Discover luxury press-on nails that elevate your every day. Crafted
            by digital artisans to inspire the modern muse.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/shop")}
              className="hover:shadow-lg transition-shadow"
            >
              SHOP NOW
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate("/size-guide")}
              className="hover:shadow-lg transition-shadow"
            >
              SIZE GUIDE
            </Button>
          </div>
        </div>

        {/* Right Side - Nail Image */}
        <div className="flex justify-center">
          <img
            src="/images/hero/narcissus.jpg"
            alt="Luxury Press-On Nails"
            className="w-full max-w-sm rounded-2xl shadow-xl object-cover aspect-square"
          />
        </div>
      </div>
    </section>
  );
}