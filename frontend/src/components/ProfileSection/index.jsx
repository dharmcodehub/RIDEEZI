"use client";
import React from "react";

function ProfileSection({captainName}) {
  return (
    <div className="flex gap-3 items-center">
      <img
        src="profile.png"
        alt="Profile"
        className="w-[40px] h-[40px] rounded-full border-[2px] border-[#28A745]"
      />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-neutral-800">
          {captainName}
        </span>
        <span className="text-xs text-gray-500">4.92 ★</span>
      </div>
    </div>
  );
}

export default ProfileSection;
