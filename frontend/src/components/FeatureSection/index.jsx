import React from "react";
import FeatureCard from "../FeatureCard";

function FeatureSection() {
  const features = [
    {
      icon: "check-circle",
      title: "Request a Ride",
      description:
        "Open the app and enter your destination. Our smart system will find the nearest available driver.",
    },
    {
      icon: "arrow-right",
      title: "Get Matched",
      description:
        "We'll connect you with a professional driver nearby who will pick you up in minutes.",
    },
    {
      icon: "check",
      title: "Arrive Safely",
      description:
        "Track your ride in real-time and arrive at your destination safely and comfortably.",
    },
  ];

  return (
    <section className="flex flex-wrap justify-center gap-8 px-4 mb-20">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </section>
  );
}

export default FeatureSection;
