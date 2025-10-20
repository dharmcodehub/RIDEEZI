import React from "react";

function SlideIndicators({ currentSlide, totalSlides }) {
  return (
    <div
      className="flex gap-3 mt-8"
      role="tablist"
      aria-label="Slide indicators"
    >
      {Array.from({ length: totalSlides }).map((_, index) => (
        <div
          key={index}
          role="tab"
          aria-selected={currentSlide === index}
          aria-label={`Slide ${index + 1}`}
          className="w-2 h-2 rounded-full"
          style={{
            background: currentSlide === index ? "#28A745" : "#21252933",
          }}
        />
      ))}
    </div>
  );
}

export default SlideIndicators;
