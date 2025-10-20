"use client";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDataContext from "../../context/CaptainContext";
function ActionButtons({setConfirmButtonPanel , ride ,captain}) {
    // const [confirmButtonPanel, setConfirmButtonPanel] = useState(false)
    //  const {captain} = useContext(CaptainDataContext);
   const [captainData, setCaptainData] = useState({})

    const currentPath = window.location.pathname;
    console.log("ride from action buttons : ",ride);
    console.log("captain from action buttons : ",captain);
    console.log("captaindata from action buttons : ",captainData);
    useEffect(()=>{
      if (captain) {
        setCaptainData(captain);
      }

      
    },[ride,captain])
  const handleDecline = () => {
    // Handle decline action
    console.log("Ride declined");
  }; 

  console.log(currentPath)

  const handleAccept =async () => {
    if (captain) {
      setConfirmButtonPanel(true);
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
        rideId: ride?._id,
        captain: captain,
      },
      {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`
        }
      });
      if (response.status === 200) {
        console.log("Ride accepted");
      }
    } else {
      console.log("Captain is undefined");
    }
  };
  return (
    <div className="flex gap-4 mt-6 text-sm font-medium text-center w-full justify-center items-center max-md:max-w-full">
      <button
        onClick={handleDecline}
        className="px-16 py-3.5 text-red-500 whitespace-nowrap bg-gray-50 rounded-lg max-md:px-5"
      >
        Decline
      </button >
      {
        (currentPath == "/captain-assignment") ? <button
        onClick={handleAccept}
        className="px-16 py-3.5 text-white bg-green-600 rounded-lg shadow-[0px_2px_4px_rgba(40,167,69,0.2)] max-md:px-5"
      >
        Accept Ride
      </button>
     :  <Link
     to="/captain-assignment"
     className="px-16 py-3.5  text-white bg-green-600 rounded-lg  shadow-[0px_2px_4px_rgba(40,167,69,0.2)] max-md:px-5"
   >
     View Details
   </Link>
      }
    </div>
  );
}

export default ActionButtons;
