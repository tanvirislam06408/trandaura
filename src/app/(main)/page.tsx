import Brands from "@/components/home/Brands/Brands";
import Categories from "@/components/home/Categories/Categories";
import Faq from "@/components/home/FAQ/Faq";
import Featured from "@/components/home/Featured/Featured";
import Statistics from "@/components/home/Statistics/Statistics";
import Testimonials from "@/components/home/Tesimonials/Testimonials";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import CallToAction from "@/components/shared/CallToAction";
import HeroSlider from "@/components/shared/HeroSlider";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <AnimatedSection><Featured /></AnimatedSection>
      <AnimatedSection><Categories/></AnimatedSection>
      <AnimatedSection><Testimonials/></AnimatedSection>
      <AnimatedSection><Statistics/></AnimatedSection>
      
      <AnimatedSection><CallToAction/></AnimatedSection>
      <AnimatedSection><Faq /></AnimatedSection>
    </div>
  );
}
