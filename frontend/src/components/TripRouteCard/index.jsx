import React from "react";

function TripRouteCard({ trip }) {
  return (
    <article className="bg-white rounded-[12px] p-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
      <div className="flex flex-col gap-[16px]">
        <div className="flex items-center gap-[12px]">
          <div className="w-[24px] h-[24px] rounded-full bg-[#22C55E] flex items-center justify-center">
            <svg
              className="w-[14px] h-[14px] text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <p className="text-[15px] text-[#1A1A1A]">{trip.pickup}</p>
        </div>
        <div className="w-[2px] h-[24px] bg-[#E5E7EB] ml-[11px]" />
        <div className="flex items-center gap-[12px]">
          <div className="w-[24px] h-[24px] rounded-full bg-[#22C55E] flex items-center justify-center">
            <svg
              className="w-[14px] h-[14px] text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14"
              />
            </svg>
          </div>
          <p className="text-[15px] text-[#1A1A1A]">{trip.destination}</p>
        </div>
      </div>
    </article>
  );
}

export default TripRouteCard;
