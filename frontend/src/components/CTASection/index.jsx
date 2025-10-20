
import React from "react";

function CTASection() {
  return (
    <section className="flex flex-col items-center gap-4 py-20">
      <button className="px-8 py-4 bg-[#28A745] text-white font-bold text-[18px] rounded-[8px]">
        Download the App
      </button>
      <button className="px-8 py-4 bg-white text-[#28A745] font-bold text-[18px] rounded-[8px] border-[2px] border-[#28A745]">
        Become a Driver
      </button>
    </section>
  );
}

export default CTASection;
