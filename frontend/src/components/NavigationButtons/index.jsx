"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function NavigationButtons({ currentSlide, totalSlides, onPrev, onNext }) {
  const [isBackHovered, setIsBackHovered] = useState(false);
  const [isNextHovered, setIsNextHovered] = useState(false);
  const [isStartHovered, setIsStartHovered] = useState(false);

  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === totalSlides - 1;

  return (
    <nav className="flex justify-between items-center px-6 w-full max-w-[800px]">
      {!isFirstSlide ? (
        <button
          className="text-base font-medium transition-all duration-200 ease-in-out"
          onMouseEnter={() => setIsBackHovered(true)}
          onMouseLeave={() => setIsBackHovered(false)}
          onClick={onPrev}
          style={{
            opacity: isBackHovered ? "1" : "0.5",
            color: "#212529",
          }}
          aria-label="Go to previous slide"
        >
          Back
        </button>
      ) : (
        <div className="w-14" aria-hidden="true" />
      )}

      {!isLastSlide ? (
        <button
          className="p-4 text-white bg-green-600 rounded-full transition-transform duration-200 ease-in-out"
          onMouseEnter={() => setIsNextHovered(true)}
          onMouseLeave={() => setIsNextHovered(false)}
          onClick={onNext}
          style={{
            transform: isNextHovered ? "scale(1.05)" : "scale(1)",
          }}
          aria-label="Go to next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      ) : (
        <Link to="/home"
          className="px-12 py-4 text-lg font-semibold text-white bg-green-600 rounded-lg transition-transform duration-200 ease-in-out"
          onMouseEnter={() => setIsStartHovered(true)}
          onMouseLeave={() => setIsStartHovered(false)}
          style={{
            transform: isStartHovered ? "scale(1.05)" : "scale(1)",
          }}
          aria-label="Complete onboarding and get started"
        >
          Get Started
        </Link>
      )}
    </nav>
  );
}

export default NavigationButtons;
