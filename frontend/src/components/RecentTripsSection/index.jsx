"use client";
import React from "react";
import TripCard from "../TripCard";

function RecentTripsSection() {
  const trips = [
    {
      id: 1,
      name: "Sarah M.",
      route: "Central Mall → Airport Terminal 3",
      amount: "$42.50",
      time: "2:30 PM",
    },
    {
      id: 2,
      name: "Michael R.",
      route: "Downtown Station → Highland Park",
      amount: "$28.75",
      time: "1:15 PM",
    },
  ];

  return (
    <section className="flex-1 p-6 bg-white rounded-2xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-neutral-800">Recent Trips</h2>
        <button className="text-sm text-green-600">View All</button>
      </div>
      <div className="flex flex-col gap-4">
        {trips.map((trip) => (
          <TripCard
            key={trip.id}
            name={trip.name}
            route={trip.route}
            amount={trip.amount}
            time={trip.time}
          />
        ))}
      </div>
    </section>
  );
}

export default RecentTripsSection;
