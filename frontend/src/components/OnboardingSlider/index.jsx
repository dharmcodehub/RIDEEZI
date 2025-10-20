"use client";
import React, { useState } from "react";
import Slide from "../Slide";
import SlideIndicators from "../SlideIndicators";
import NavigationButtons from "../NavigationButtons";
import SliderFooter from "../SliderFooter";
// import img1 from "../../assets/booking.svg";
import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png";
import img3 from "../../assets/img3.png";
import Navbar from "../Navbar";
import LandingPageNavbar from "../LandingPageNavbar";

function OnboardingSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides] = useState([
    {
      title: "Ride Anywhere, Anytime!",
      subtitle: "Book your ride with just a few taps",
      imageAlt: "Booking illustration",
      imageSrc: `${img1}`,
    },
    {
      title: "Safe & Reliable Rides",
      subtitle: "Travel with verified drivers",
      imageAlt: "Safe ride illustration",
      imageSrc: `${img2}`,
    },
    {
      title: "Affordable & Convenient",
      subtitle: "Multiple options for every budget",
      imageAlt: "Multiple rides illustration",
      imageSrc: `${img3}`,
    },
  ]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <>
      <div className='w-screen flex relative mb-14 bg-gray-50'>
      <LandingPageNavbar/>
      </div>
      <main className="flex overflow-hidden flex-col justify-between items-center w-screen h-screen bg-gray-50 text-neutral-800">
      <section className="relative px-6 py-12 max-w-[1200px] size-full h-[90vh]">
        <div className="flex flex-col gap-8 justify-center items-center h-full">
          <div className="flex overflow-hidden relative w-full max-w-[100%]">
            <div
              className="flex w-full transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
                {/* <img src={img1} alt="askjflsdjf" /> */}
              {slides.map((slide, index) => (
                <Slide
                  key={index}
                  title={slide.title}
                  subtitle={slide.subtitle}
                  imageAlt={slide.imageAlt}
                  imageSrc={slide.imageSrc}
                />
              ))}
            </div>
          </div>

          <NavigationButtons
            currentSlide={currentSlide}
            totalSlides={slides.length}
            onPrev={prevSlide}
            onNext={nextSlide}
          />

          <SlideIndicators
            currentSlide={currentSlide}
            totalSlides={slides.length}
          />
        </div>
      </section>

      <SliderFooter />

      <div>
        <div
          dangerouslySetInnerHTML={{
              __html:
              '<link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet">',
            }}
        />
      </div>
    </main>
            </>
  );
}

export default OnboardingSlider;
