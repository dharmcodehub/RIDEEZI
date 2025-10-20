import React from "react";

function HeroSection() {
  return (
    <section className="relative w-full h-[600px]">
      <img
        src="https://placehold.co/1920x600"
        alt="Hero background"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)]" />
      <div className="absolute inset-0 flex flex-col items-center justify-center max-w-[900px] mx-auto px-4">
        <h1 className="text-[56px] font-bold text-white text-center leading-[84px] max-sm:text-[40px] max-sm:leading-[60px]">
          Transforming the Way You Travel
        </h1>
        <p className="text-[20px] text-white text-center mt-6 max-w-[780px] leading-[30px] max-sm:text-[16px]">
          Experience seamless urban mobility with our innovative ride-hailing
          service. Connect with verified drivers, enjoy competitive prices, and
          reach your destination safely.
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
