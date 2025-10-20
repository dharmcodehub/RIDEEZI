import react, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import RideBook from "../../../components/RideBook";
import AvailableRides from "../../../components/AvailableRides";
import RideMap from "../../../components/RideMap";
import axios from "axios";
import { SocketDataContext } from "../../../context/SocketContext";
import { UserDataContext } from "../../../context/UserContext";
import MapView from "../../../components/MapView";
import FeedbackModal from "../../../components/FeedbackModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Ride() {
  const [isShow, setIsShow] = useState(false);
  const [fare, setFare] = useState({});
  const { sendMessage, receiveMessage } = useContext(SocketDataContext);
  const { user } = useContext(UserDataContext);
  const [rideConfirmData, setRideConfirmData] = useState(null);
  const [bookRideInvisible, setBookRideInvisible] = useState(false);
  const { socket } = useContext(SocketDataContext);
  const [locationFromStorage, setLocationFromStorage] = useState({});
  const [pickupCoordinates, setPickupCoordinates] = useState({});
  const [destinationCoordinates, setDestinationCoordinates] = useState({});
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const navigate = useNavigate();
  const ShowRide = (value) => {
    setIsShow(value);
  };
  const location = useLocation();

  console.log("Ride Confirm Data : ", rideConfirmData);

  console.log("location from storage : ", locationFromStorage);
  console.log("pickup coordinates : ", pickupCoordinates);
  console.log("destination coordinates : ", destinationCoordinates);
  console.log("location from storage : ", locationFromStorage);

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


    // getAllCoordinates();

  }, []);

  useEffect(()=>{
    setAllCoordinates();
 },[])

 const setAllCoordinates = async() =>{
   setPickupCoordinates(await getCoordinates(localStorage.getItem("pickup")));
   setDestinationCoordinates(await getCoordinates(localStorage.getItem("destination")));
 }

 const getCoordinates = async (address) => {
   const key = import.meta.env.VITE_GOMAPS_API_KEY;
   console.log("address : ", address);
   const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${key}`;
   try {
     const response = await axios.get(url);
     console.log("response data from getCoordinates: ", response.data);
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



  useEffect(() => {
    sendMessage("join", { userType: "user", userId: user._id });
    console.log("user is : ", user);

    socket.on("ride-confirmed", (data) => {
      console.log("Ride confirmed: ", data);
      setRideConfirmData(data);
    });

    socket.on("ride-started", (data) => {
      console.log("Ride started: ", data);
      navigate("/riding", { state: { ride: data } }); // Pass ride data as state
    });
  }, [isShow, socket, user]);

  useEffect(() => {
    const rideComplete = location.state?.ride; // Retrieve ride data from state

    if (rideComplete) {
      console.log("ride complete data : ", rideComplete);
      location.state.ride = null; // Reset ride state to normal
      sessionStorage.setItem("rideCompleted", "true"); // Store ride completion in session storage
      toast.success("Ride Ended Congrats"); // Show toast notification
      setShowFeedbackModal(true); // Show feedback modal
      setPickupCoordinates(null); // Reset pickup coordinates
      setDestinationCoordinates(null); // Reset destination coordinates
    } else if (sessionStorage.getItem("rideCompleted") === "true") {
      sessionStorage.removeItem("rideCompleted"); // Clear the session storage flag
      setShowFeedbackModal(false); // Ensure modal does not show on refresh
    }
  }, []);

  const createRide = async (vehicleType) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };

  const handleFeedbackSubmit = (feedbackData) => {
    console.log("Feedback submitted: ", feedbackData);
    setShowFeedbackModal(false); // Close the modal after submission
  };

  return (
    <div className="container min-w-full min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto h-full min-h-screen px-4 py-8">
        <div className={`grid grid-cols-1 md:grid-cols-[3fr_3fr_4fr] sm:grid-cols-1 gap-8 h-full`}>
          <RideBook setIsShow={ShowRide} setFare={getFareFun} showFeedbackModal={showFeedbackModal} getCoordinates={getCoordinates} />
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

export default Ride;
