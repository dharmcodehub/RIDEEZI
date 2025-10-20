import React from "react";
import IconSVG from "../IconSVG";

function FeatureCard({ icon, title, description }) {
  return (
    <article className="flex flex-col items-center bg-white rounded-[12px] p-8 shadow-[0px_4px_6px_rgba(0,0,0,0.1)] w-[368px]">
      <div className="w-[80px] h-[80px] rounded-full bg-[#28A745] flex items-center justify-center">
        <IconSVG name={icon} className="w-10 h-10" />
      </div>
      <h3 className="mt-6 text-[24px] font-bold text-[#212529] text-center">
        {title}
    </h3>
      <p className="mt-4 text-[16px] text-[#212529] text-center">
        {description}
      </p>
    </article>
  );
}

export default FeatureCard;
