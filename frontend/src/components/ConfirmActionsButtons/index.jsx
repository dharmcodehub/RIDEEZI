"use client";
import React from "react";
import { Link } from "react-router-dom";

function ActionButtons() {
    const currentPath = window.location.pathname;
  const handleDecline = () => {
    // Handle decline action
    console.log("Ride declined");
  };

  console.log(currentPath)

  const handleAccept = (e) => {
    // Handle accept action
    e.preventDefault();
    console.log("Ride accepted");
  };

  return (
    <div className="flex gap-4 mt-6 text-sm font-medium text-center w-full justify-center items-center max-md:max-w-full">
      <button 
        onClick={handleDecline}
        className="px-16 py-3.5 text-red-500 whitespace-nowrap bg-gray-50 rounded-lg max-md:px-5"
      >
        Cancel
      </button>
     <button type="submit"
        // onClick={handleAccept}
        className="px-16 py-3.5 text-white bg-green-600 rounded-lg shadow-[0px_2px_4px_rgba(40,167,69,0.2)] max-md:px-5"
      >
        Confirm
      </button>
    </div>
  );
}

export default ActionButtons;
