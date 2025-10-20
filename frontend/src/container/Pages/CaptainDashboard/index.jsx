"use client";
import React, { useContext, useEffect, useState } from "react";
import CaptainHeader from "../../../components/CaptainHeader"
import GoOnlineCard from "../../../components/GoOnlineCard"
import RecentTripsSection from "../../../components/RecentTripsSection"
import WeeklySummarySection from "../../../components/WeeklySummarySection";
import { CaptainDataContext } from "../../../context/CaptainContext";
import RideRequestCard from "../../../components/RideRequestCard";
import { Car, X } from "lucide-react";
import { SocketDataContext } from "../../../context/SocketContext";
import { RideDataContext } from "../../../context/RideContext";
import { useLocation } from "react-router-dom";

function CaptainDashboard() {
  const {captain} = useContext(CaptainDataContext);
  const [captainData, setCaptainData] = useState({})
  const [openRequestPanel, setOpenRequestPanel] = useState(false)
  const {socket , sendMessage, receiveMessage} = useContext(SocketDataContext);
  const location = useLocation();
  const [status,setStatus] = useState("offline");
  const rideEnd = location.state?.ride; // Retrieve ride data from state
  // const [ride, setRide] = useState(null);

  const {ride , setRide} = useContext(RideDataContext);
  useEffect(() => {
      setCaptainData(captain);
      sendMessage("join", {userType : "captain" , userId : captain._id})
    console.log("captain is : ",captain);

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          sendMessage("update-location-captain", {
            userId: captain._id,
            location: { 
              ltd : latitude,
              lng  : longitude,
            },
          });
        });
      }
    };
    updateLocation();

    // const intervalId = setInterval(updateLocation, 10000);

    // return () => clearInterval(intervalId);
  }, [captainData])
  
  useEffect(() => {
    receiveMessage("new-ride", (data) => {
      console.log("New ride request received: ", data);
      // Handle the new ride request here
      setRide(data);
      setOpenRequestPanel(true); // Open the request panel when a new ride request is received
    });
  }, [socket]);

  useEffect(()=>{
    if(rideEnd){
      console.log("ride ended Successfully : ", rideEnd);
      alert("Ride Ended Congrats");
    }
  },[rideEnd])
  
   return (
    <main className="flex flex-col bg-gray-50 min-h-screen relative">
      <CaptainHeader status={status}  captainName={captainData?.fullname?.firstname}/>
      <section className="flex flex-col gap-6 px-6 py-8 relative">
          <div onClick={()=>{setOpenRequestPanel(true)}}
          className="absolute left-0 cursor-pointer size-10 flex justify-center items-center rounded-r-lg bg-gray-300">
          <Car color="#28A745" />
          </div>
          {
            (openRequestPanel) ? 
            <div className={`w-[30%] absolute left-[-10px] top-8 bg-white p-4 border-2 rounded-xl border-gray-700 transition-all duration-1000 ${(openRequestPanel) ? "h-full" : "h-0"}`}>
            <div className={
              `absolute right-3 cursor-pointer top-3 size-6 flex justify-center items-center rounded-full `
            } onClick={()=>{setOpenRequestPanel(false)}}>
            <X color="#28A745" />
            </div>
            <RideRequestCard captain={captainData}  ride={ride}/>
          </div> : ""
          }
        <GoOnlineCard status={status} setStatus={setStatus}  />
        <div className="flex gap-6 max-md:flex-col">
          <RecentTripsSection />
          <WeeklySummarySection />
        </div>
      </section>
    </main>
  );
}

export default CaptainDashboard;
