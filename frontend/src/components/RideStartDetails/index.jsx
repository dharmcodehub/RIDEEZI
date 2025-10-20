"use client";
import React, { useEffect, useState } from "react";
import DriverCard from "../DriverCard";
import TripRouteCard from "../TripRouteCard";
import TripSummaryCard from "../TripSummaryCard";
import PaymentMethodCard from "../PaymentMethodCard";
import MapView from "../MapView";
import SecondaryButton from "../SecondaryButton";
import axios from "axios"

function RideStartDetails({ ride }) {
  const [driver, setDriver] = useState({
    name: ride?.captain?.fullname.firstname + " " + ride?.captain?.fullname.lastname || "N/A",
    email: ride?.captain?.email || "N/A",
    rating: ride?.captain?.rating || "N/A",
    image: ride?.captain?.image || "https://placehold.co/100x100",
  });

  const [trip, setTrip] = useState({
    pickup: ride?.pickup || "N/A",
    destination: ride?.destination || "N/A",
    distance: (ride?.distance / 1000).toFixed(2) || "N/A",
    duration: {
      hours : Math.floor(ride?.duration / 3600) || "N/A",
      minutes : Math.floor((ride?.duration / 60) % 60) || "N/A",
    },
    price: ride?.fare || 0,
    discount: ride?.fare * 2 /100 || 0,
  });
  const [pickupCoordinates, setPickupCoordinates] = useState({});
  const [destinationCoordinates, setDestinationCoordinates] = useState({});

  useEffect(()=>{
    setAllCoordinates();
 },[])

 const setAllCoordinates = async() =>{
   setPickupCoordinates(await getCoordinates(ride.pickup));
   setDestinationCoordinates(await getCoordinates(ride.destination));
 }

 const getCoordinates = async (address) => {
   const key = import.meta.env.VITE_GOMAPS_API_KEY;
   // console.log("address : ", address);
   const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${key}`;
   try {
     const response = await axios.get(url);
     // console.log("response data from getCoordinates: ", response.data);
     if (response.data.status === "OK") {
       const location = response.data.results[0].geometry.location;

       return {
         ltd: location.lat,
         lng: location.lng,
       };
     } else {
       // console.error("Error fetching coordinates:", response.data.status);
       throw new Error("Unable to fetch coordinates");

     }
   } catch (error) {
     // console.error(error);
     throw error;
   }
 };

  const [selectedPayment, setSelectedPayment] = useState("card");
  const [paymentOptions, setPaymentOptions] = useState([
    "card",
    "cash",
    "wallet",
  ]);



  return (
    <main className="flex font-[Inter] min-h-screen w-screen bg-[#F8FAF8]">
      <div className="flex w-full p-[24px] gap-[24px] max-lg:flex-col">
        <section className="w-[30%] max-lg:w-full flex flex-col gap-[16px]">
          <DriverCard driver={driver} />
          <TripRouteCard trip={trip} />
          <TripSummaryCard trip={trip} />
          <PaymentMethodCard 
            rideId={ride._id}
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
            paymentOptions={paymentOptions}
          />
         
        </section>
        <div className="h-[90%] w-full">
        <MapView pickupLoc={pickupCoordinates} destinationLoc={destinationCoordinates}/>
        </div>
      </div>
    </main>
  );
}

export default RideStartDetails;
