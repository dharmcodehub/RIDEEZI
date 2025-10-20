"use client";
import React, { useState } from "react";
import IconSVG from "../IconSVG";

function TestimonialSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular User",
      image: "https://placehold.co/100x100",
      quote:
        "The most reliable ride service I've ever used. Always on time and professional drivers.",
    },
    {
      name: "Michael Chen",
      role: "Business Traveler",
      image: "https://placehold.co/100x100",
      quote:
        "Exceptional service that has transformed my daily commute. The drivers are courteous and the rides are always comfortable.",
    },
    {
      name: "Emily Rodriguez",
      role: "Weekend User",
      image: "https://placehold.co/100x100",
      quote:
        "I feel safe and secure every time I use this service. The app is intuitive and the drivers are true professionals.",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((currentTestimonial + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (currentTestimonial - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section className="flex flex-col items-center px-4 py-20">
      <h2 className="text-[40px] font-bold text-[#212529] text-center max-sm:text-[32px]">
        What Our Users Say
      </h2>
      <div className="relative mt-12 max-w-[1200px] w-full">
        <button
          onClick={prevTestimonial}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[48px] h-[48px] rounded-full bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.1)] flex items-center justify-center"
          aria-label="Previous testimonial"
        >
          <IconSVG name="chevron-left" className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center px-16">
          <img
            src={testimonials[currentTestimonial].image}
            className="w-[100px] h-[100px] rounded-full object-cover"
            alt={testimonials[currentTestimonial].name}
          />
          <p className="mt-8 text-[20px] text-[#212529] text-center max-w-[735px]">
            {testimonials[currentTestimonial].quote}
          </p>
          <h3 className="mt-6 text-[18px] font-bold text-[#212529]">
            {testimonials[currentTestimonial].name}
          </h3>
          <p className="mt-1 text-[16px] text-[#212529]">
            {testimonials[currentTestimonial].role}
          </p>
        </div>
        <button
          onClick={nextTestimonial}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[48px] h-[48px] rounded-full bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.1)] flex items-center justify-center"
          aria-label="Next testimonial"
        >
          <IconSVG name="chevron-right" className="w-6 h-6" />
        </button>
      </div>
      <div className="flex gap-6 mt-12">
        {testimonials.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentTestimonial === index ? "bg-[#28A745]" : "bg-[#D1D5DB]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default TestimonialSection;
