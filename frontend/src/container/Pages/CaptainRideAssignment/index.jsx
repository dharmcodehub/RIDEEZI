"use client";
import React, { useContext, useEffect, useState } from "react";
import CaptainStatusBar from "../../../components/CaptainStatusBar";
import RideRequestCard from "../../../components/RideRequestCard";
import MapView from "../../../components/MapView";
import RideDetails from "../../../components/RideDetails";
import Ride from "../Ride";
import Footer from "../../../components/Footer"
import { RideDataContext } from "../../../context/RideContext";
import { CaptainDataContext } from "../../../context/CaptainContext";
import CaptainRideStartComp from "../../../components/CaptainRIdeStartComp";
import axios from "axios";
function CaptainRideAssignment() {
  const [rideStartCard, setRideStartCard] = useState(false)
  const {ride} = useContext(RideDataContext);
  const {captain} = useContext(CaptainDataContext);
  const [otp,setOtp] = useState("");
  const [rideData, setRideData] = useState({});
  const [pickupCoordinates, setPickupCoordinates] = useState({});
  const [destinationCoordinates, setDestinationCoordinates] = useState({});
  const getDistanceAndTime = () =>{

  }
  console.log("rides from ass : ",ride )
  console.log("rides data from ass : ",rideData )
  console.log("token from storage : ", localStorage.getItem("token"));
  console.log("pickup Coordintes", pickupCoordinates);
  console.log("destination Coordinates", destinationCoordinates);

  function setRideStartCardFun(data){
    setRideStartCard(data);
  }

  function setRideDataFun(data){
    setRideData(data);
  }
    
  useEffect(() => {
  }, [rideStartCard, rideData,ride])

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
  

  return (
    <main className="overflow-hidden  bg-white min-h-screen">
      <section className="w-full bg-gray-100 max-md:max-w-full ">
        <CaptainStatusBar captain={captain} />
        <div className="max-md:max-w-full w-full h-full">
          <div className="flex w-full max-md:flex-col ">
            <div className="w-[30%] max-md:ml-0 max-md:w-full p-5">
             {
              (!rideStartCard) ? (
                <RideRequestCard
                  captain={captain}
                  ride={ride}
                  setRideStartCard={setRideStartCardFun}
                  // handleSubmit={handleSubmit}
                  RideDetails={RideDetails}
                  setRideData={setRideDataFun}
                />
              ) : (
                <CaptainRideStartComp ride={rideData} />
              )
             }
            </div>
            <div className=" w-[70%] p-5 h-[90vh] z-0  max-md:ml-0 max-md:w-full">
              <MapView pickupLoc={pickupCoordinates} destinationLoc={destinationCoordinates} />
            </div>
          </div>
        </div>
      </section>
      {/* <Footer/> */}
    </main>
  );
}

export default CaptainRideAssignment;
