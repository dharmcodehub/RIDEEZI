"use client";
import React, { useEffect, useState } from "react";
import DriverCard from "../DriverCard";
import TripRouteCard from "../TripRouteCard";
import TripSummaryCard from "../TripSummaryCard";
import PaymentMethodCard from "../PaymentMethodCard";
import MapView from "../MapView";
import PassengerProfile from "../PassengerProfile";
import CaptainPaymentCard from "../CaptainPaymentCard";
import FeedbackModal from "../FeedbackModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CaptainRideStartComp({ ride }) {
  // console.log("ride data in captain ride start comp : ", ride);
  // console.log("ride data passenger name : ", ride?.user?.fullname.firstname + " " + ride?.user?.fullname.lastname);
  const [passenger, setPassenger] = useState({
    name: "",
    email: "",
    rating: 4.5,
    image: "",
  });

  // console.log("passenger data in captain ride start comp : ", passenger);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const [trip, setTrip] = useState({
    pickup: " ",
    destination: " ",
    distance: " ",
    duration: {
      hours: 0,
      minutes: 0,
    },
    price: 0,
    discount: 0,
  });

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    setPassenger({
      name: ride?.user?.fullname.firstname + " " + ride?.user?.fullname.lastname,
      email: ride?.user?.email,
      rating: ride?.user?.rating || 4.5,
      // image: ride?.user?.image ,
    });
    setPaymentStatus(ride?.paymentStatus || "pending");
    setTrip({
      pickup: ride?.pickup,
      destination: ride?.destination,
      distance: (ride?.distance / 1000).toFixed(2),
      duration: {
        hours: Math.floor(ride?.duration / 3600),
        minutes: Math.floor((ride?.duration / 60) % 60),
      },
      price: ride?.fare || 0,
      discount: (ride?.fare * 2) / 100 || 0,
    });
  }, [ride]);

  const handleClick = async () => {
    // Handle ride completion logic here
    if(paymentStatus === "pending"){
      toast.error("Please complete the payment before ending the ride."); // Show error toast
      return;
    }
    console.log("token : ", localStorage.getItem("token"));
    console.log("Ride completed!");
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
      params: { rideId: ride._id },
      headers: {
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 200) {
      console.log("Response from server: ", response.data);
      toast.success("Ride completed successfully!"); // Show success toast
      setShowFeedbackModal(true); // Show feedback modal
    } else {
      toast.error("Failed to complete the ride. Please try again."); // Show error toast
    }
  };

  const handleFeedbackSubmit = (feedback) => {
    console.log("Feedback submitted: ", feedback);
    setShowFeedbackModal(false);
    navigate("/captain-home", { state: { ride: ride } }); // Pass ride data as state
  };

  return (
    <main className="flex font-[Inter] min-h-screen w-full bg-[#F8FAF8] z-100">
      <div className="flex w-full p-[24px] gap-[24px] max-lg:flex-col">
        <section className="w-[30%] max-lg:w-full flex flex-col gap-[16px] w-full">
          <PassengerProfile passenger={passenger} />
          <TripRouteCard trip={trip} />
          <TripSummaryCard trip={trip} />
          <CaptainPaymentCard 
            paymentStatus={paymentStatus} 
            setPaymentStatus={setPaymentStatus} 
            handleSubmit={handleClick} 
            rideId={ride?._id} 
          />
        </section>
        <section className="w-[70%] max-lg:w-full">
          <MapView
            pickupLoc={{
              ltd: ride?.pickupCoordinates?.latitude,
              lng: ride?.pickupCoordinates?.longitude,
            }}
            destinationLoc={{
              ltd: ride?.destinationCoordinates?.latitude,
              lng: ride?.destinationCoordinates?.longitude,
            }}
          />
        </section>
      </div>
      {showFeedbackModal && <FeedbackModal onSubmit={handleFeedbackSubmit} />}
    </main>
  );
}

export default CaptainRideStartComp;
