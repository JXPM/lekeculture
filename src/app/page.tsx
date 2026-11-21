import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { FeaturedStories, GalleryStrip, JoinBand } from "@/components/HomeSections";
import { NewsletterSection } from "@/components/NewsletterSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <FeaturedStories />
      <GalleryStrip />
      <JoinBand />
      <NewsletterSection />
    </>
  );
}
