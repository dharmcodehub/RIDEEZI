import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import RideBook from "../../../components/RideBook";
import AvailableRides from "../../../components/AvailableRides";
import MapView from "../../../components/MapView";
import FeedbackModal from "../../../components/FeedbackModal";
import axios from "axios";
import { SocketDataContext } from "../../../context/SocketContext";
import { UserDataContext } from "../../../context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ShareRide() {
  const [isShow, setIsShow] = useState(false);
  const [fare, setFare] = useState({});
  const { sendMessage, receiveMessage } = useContext(SocketDataContext);
  const { user } = useContext(UserDataContext);
  const [rideConfirmData, setRideConfirmData] = useState(null);
  const [bookRideInvisible, setBookRideInvisible] = useState(false);
  const [locationFromStorage, setLocationFromStorage] = useState({});
  const [pickupCoordinates, setPickupCoordinates] = useState({});
  const [destinationCoordinates, setDestinationCoordinates] = useState({});
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const navigate = useNavigate();

  const ShowRide = (value) => {
    setIsShow(value);
  };

  const getFareFun = (data) => {
    setFare(data);
  };

  const setBookRideInvisibleFun = (value) => {
    setBookRideInvisible(value);
  };

  useEffect(() => {
    const storedPickup = localStorage.getItem("pickup");
    const storedDestination = localStorage.getItem("destination");

    const updatedLocation = {
      pickup: storedPickup,
      destination: storedDestination,
    };

    setLocationFromStorage(updatedLocation);
  }, []);

  useEffect(() => {
    setAllCoordinates();
  }, []);

  const setAllCoordinates = async () => {
    setPickupCoordinates(await getCoordinates(localStorage.getItem("pickup")));
    setDestinationCoordinates(await getCoordinates(localStorage.getItem("destination")));
  };

  const getCoordinates = async (address) => {
    const key = import.meta.env.VITE_GOMAPS_API_KEY;
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${key}`;
    try {
      const response = await axios.get(url);
      if (response.data.status === "OK") {
        const location = response.data.results[0].geometry.location;

        return {
          ltd: location.lat,
          lng: location.lng,
        };
      } else {
        throw new Error("Unable to fetch coordinates");
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    sendMessage("join", { userType: "user", userId: user._id });

    receiveMessage("ride-confirmed", (data) => {
      setRideConfirmData(data);
    });

    receiveMessage("ride-started", (data) => {
      navigate("/riding", { state: { ride: data } });
    });
  }, [isShow, user]);

  const createShareRide = async (vehicleType) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/share-rides/create`,
      {
        pickup: locationFromStorage.pickup,
        destination: locationFromStorage.destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("Shared Ride created: ", response.data);
  };

  const handleFeedbackSubmit = (feedbackData) => {
    setShowFeedbackModal(false);
  };

  return (
    <div className="container min-w-full min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto h-full min-h-screen px-4 py-8">
        <div className={`grid grid-cols-1 md:grid-cols-[3fr_3fr_4fr] sm:grid-cols-1 gap-8 h-full`}>
          <RideBook setIsShow={ShowRide} setFare={getFareFun} createRide={createShareRide} showFeedbackModal={showFeedbackModal} />
          <AvailableRides
            isShow={isShow}
            rideConfirmData={rideConfirmData}
            setBookRideInvisible={setBookRideInvisibleFun}
          />
          <MapView pickupLoc={pickupCoordinates} destinationLoc={destinationCoordinates} />
        </div>
      </div>
      {showFeedbackModal && (
        <FeedbackModal onSubmit={handleFeedbackSubmit} onClose={() => setShowFeedbackModal(false)} />
      )}
    </div>
  );
}

export default ShareRide;