"use client";
import React from "react";
import HeroSection from "../HeroSection";
import MissionSection from "../MissionSection";
import FeatureSection from "../FeatureSection";
import TestimonialSection from "../TestomonialSection";
import CTASection from "../CTASection";

function RideServiceLanding() {
  return (
    <main className="flex flex-col items-center w-screen min-h-screen font-[Inter] bg-[#F8F9FA]">
      <HeroSection />
      <MissionSection />
      <FeatureSection />
      <TestimonialSection />
      <CTASection />
    </main>
  );
}

export default RideServiceLanding;
