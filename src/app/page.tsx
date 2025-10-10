import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { NewsletterSection } from "@/components/NewsletterSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <div id="newsletter">
        <NewsletterSection />
      </div>
    </>
  );
}
