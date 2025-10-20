"use client";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CaptainStatusBar from "../../../components/CaptainStatusBar";
import RideRequestCard from "../../../components/RideRequestCard";
import MapView from "../../../components/MapView";
import RideDetails from "../../../components/RideDetails";
import Ride from "../Ride";
import Footer from "../../../components/Footer";
import { RideDataContext } from "../../../context/RideContext";
import { CaptainDataContext } from "../../../context/CaptainContext";
import Navbar from "../../../components/Navbar";
import RideStartDetails from "../../../components/RideStartDetails";
import {SocketDataContext} from "../../../context/SocketContext";

function Riding() {
  const location = useLocation();
  const ride = location.state?.ride; // Retrieve ride data from state
  const { captain } = useContext(CaptainDataContext);
  const getDistanceAndTime = () => {};
  const {socket} = useContext(SocketDataContext);
  const navigate = useNavigate();
  const [isShared, setIsShared] = useState(false);

  useEffect(() => {
    const storedIsShared = localStorage.getItem("isShared") === "true";
    setIsShared(storedIsShared);
  }, []);

 useEffect(() => {
  socket.on("ride-ended", (data) => {
    console.log("Ride ended: ", data);
    navigate("/ride", { state: { ride: data } }); // Pass ride data as state
  }); 
 }, [socket])
 

  console.log("rides from ass : ", ride);

  return (
    <main className="overflow-hidden  bg-white min-h-screen">
      <Navbar />
      <RideStartDetails ride={ride} isShared={isShared} /> {/* Pass ride data to RideStartDetails */}
    </main>
  );
}

export default Riding;
