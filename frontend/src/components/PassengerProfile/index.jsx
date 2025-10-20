import React from "react";

function PassengerProfile({ passenger }) {
  return (
    <article className="bg-white rounded-[12px] p-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-[16px]">
        <img
          className="w-[64px] h-[64px] rounded-full"
          src={passenger.image}
          alt={`${passenger.name} profile`}
        />
        <div>
          <h2 className="text-[18px] font-semibold text-[#1A1A1A]">
            {passenger.name}
          </h2>
          <p className="text-[14px] text-[#666]">{passenger.email}</p>
          <div className="flex items-center gap-[4px] mt-[4px]">
            <svg
              className="w-[16px] h-[16px] text-[#FFB800]"
              fill="currentColor"p
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-[14px] font-medium text-[#1A1A1A]">
              {passenger.rating}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default PassengerProfile;
