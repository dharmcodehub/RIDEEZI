import React from "react";

function TripSummaryCard({ trip }) {
  const finalPrice = trip.price - trip.discount;

  return (
    <article className="bg-white rounded-[12px] p-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        <div className="flex justify-around items-center mt-5">
        <div className="flex flex-col items-center px-6 pt-3 pb-9 bg-white rounded-lg h-[122px] w-[152px] max-md:px-5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/46d113f96a5b4b3b8b0fa1d110ef3ac5/4e6eebcd43c195647de13bf59cfbb28fdd19f87fe05b784cc1b953fee3c958c7?placeholderIfAbsent=true"
            className="object-contain w-5 aspect-square"
            alt="Distance icon"
          />
          <span className="mt-2 text-xs text-gray-500">Distance</span>
          <span className="mt-1.5 text-base font-medium text-neutral-800">
           {trip.distance} km
          </span>
        </div>
        <div className="flex flex-col items-center px-6 pt-3 pb-9 bg-white rounded-lg h-[122px] w-[152px] max-md:px-5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/46d113f96a5b4b3b8b0fa1d110ef3ac5/8c2598c9b1ab2d98d7a6ddd37ba21436659211221db00b77f0a3a3d1c5cba5c1?placeholderIfAbsent=true"
            className="object-contain w-5 aspect-square"
            alt="Duration icon"
          />
          <span className="mt-2 text-xs text-gray-500">Duration</span>
          <span className="mt-1.5 text-base font-medium text-neutral-800">
            {(trip.duration.hours == "0") ? "" : trip.duration.hours + "hr"} {trip.duration.minutes} min
          </span>
        </div>
       
      </div>
      <div className="flex flex-col gap-[16px]">
      
        <hr className="h-[1px] bg-[#E5E7EB] border-0" />
      <div className="flex justify-between">
          <span className="text-[14px] text-[#666]">Total Price</span>
          <span className="text-[14px] font-medium text-[#1A1A1A]">
            ₹ {trip.price.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-[#22C55E]">
          <span className="text-[14px]">Discount</span>
          <span className="text-[14px] font-medium">
            ₹ {trip.discount.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between mt-[8px]">
          <span className="text-[16px] font-semibold text-[#1A1A1A]">
            Final Price
          </span>
          <span className="text-[16px] font-semibold text-[#1A1A1A]">
            ₹ {finalPrice.toFixed(2)}
          </span>
        </div>
      </div>

    </article>
  );
}

export default TripSummaryCard;
