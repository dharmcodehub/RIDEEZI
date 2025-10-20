"use client";
import React from "react";
import StatCard from "../StatCard";

function WeeklySummarySection() {
  return (
    <section className="p-6 bg-white rounded-2xl shadow-sm w-[392px] max-md:w-full">
      <h2 className="mb-6 text-xl font-medium text-neutral-800">
        Weekly Summary
      </h2>
      <div className="flex justify-between items-center p-4 mb-4 bg-gray-50 rounded-lg">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Total Earnings</span>
          <span className="text-xl font-semibold text-neutral-800">
            $842.50
          </span>
        </div>
        <div className="flex justify-center items-center w-12 h-12 bg-green-100 rounded-lg">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[24px] h-[24px]"
          >
            <path
              d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
              stroke="#28A745"
              strokeWidth="2"
            ></path>
          </svg>
        </div>
      </div>
      <div className="p-4 mb-4 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">Rating</span>
          <div className="flex gap-1 items-center">
            <span className="text-base font-semibold text-neutral-800">
              4.92
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[16px] h-[16px]"
            >
              <path
                d="M8.00016 1.3335L10.0602 5.50683L14.6668 6.18016L11.3335 9.42683L12.1202 14.0135L8.00016 11.8468L3.88016 14.0135L4.66683 9.42683L1.3335 6.18016L5.94016 5.50683L8.00016 1.3335Z"
                fill="#FFC107"
              ></path>
            </svg>
          </div>
        </div>
        <div className="w-full h-1 bg-gray-200 rounded-full">
          <div
            className="h-full bg-green-600 rounded-full w-[98%]"
            aria-label="Rating progress"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <StatCard label="Acceptance" value="98%" />
        <StatCard label="Completion" value="100%" />
      </div>
    </section>
  );
}

export default WeeklySummarySection;
