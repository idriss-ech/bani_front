import AboutSection from "@/components/AboutSection";
import CategoriesSection from "@/components/CategoriesSection";
import HeroSlider from "@/components/HeroSlider";
import PopularProducts from "@/components/PopularProducts";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <CategoriesSection />
      <PopularProducts />
      <ServicesSection />
      <AboutSection />
      <StatsSection />
      <Testimonials />
    </main>
  );
}
