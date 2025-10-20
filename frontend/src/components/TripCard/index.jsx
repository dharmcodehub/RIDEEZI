"use client";
import React from "react";

function TripCard({ name, route, amount, time, status = "Completed" }) {
  return (
    <article className="flex justify-between items-center p-4 rounded-lg border border-gray-200">
      <div className="flex gap-4 items-center">
        <div className="flex justify-center items-center w-12 h-12 bg-green-100 rounded-lg">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[24px] h-[24px]"
          >
            <g clipPath="url(#clip0_2673_570)">
              <path
                d="M2 17L12 22L22 17M2 12L12 17L22 12M12 2L2 7L12 12L22 7L12 2Z"
                stroke="#28A745"
                strokeWidth="2"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_2673_570">
                <rect width="24" height="24" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <span className="text-base text-neutral-800">{name}</span>
            <span className="px-2 py-0.5 text-xs text-green-600 bg-green-100 rounded-full">
              {status}
            </span>
          </div>
          <span className="text-sm text-gray-500">{route}</span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-base font-medium text-neutral-800">{amount}</div>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
    </article>
  );
}

export default TripCard;
