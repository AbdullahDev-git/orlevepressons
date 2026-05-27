import HeroSection from '../components/features/HomePage/HeroSection';
import BenefitsSection from '../components/features/HomePage/BenefitsSection';
import CuratedDropSection from '../components/features/HomePage/CuratedDropSection';
import InstagramGallery from '../components/features/HomePage/InstagramGallery';
import NewsletterSection from '../components/features/HomePage/NewsletterSection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <BenefitsSection />
      <CuratedDropSection />
      <InstagramGallery />
      <NewsletterSection />
    </div>
  );
}
