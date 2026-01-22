import React from "react";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import RoomCategories from "@/components/home/RoomCategories";
import FeaturedDesigns from "@/components/home/FeaturedDesigns";
import MaterialPreview from "@/components/home/MaterialPreview";
import AITeaser from "@/components/home/AITeaser";
import WaitlistCTA from "@/components/home/WaitlistCTA";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HowItWorks/>
      <RoomCategories/>
      <FeaturedDesigns/>
      <MaterialPreview/>
      <AITeaser/>
      <WaitlistCTA/>
    </main>
  );
}
