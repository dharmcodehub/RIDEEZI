import React, { useState, useEffect, useCallback, useContext } from 'react'
import SecondaryButton from '../SecondaryButton'
import PrimaryButton from '../PrimaryButton'
import { MapPinCheckInside } from 'lucide-react'
import axios from 'axios'
import debounce from 'lodash.debounce'
import { UserDataContext } from '../../context/UserContext'


const RideBook = (props) => {
  const { getCoordinates, showFeedbackModal, setIsShow } = props;
  const [pickup, setPickup] = useState('')
  const [dropout, setDropout] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [activeInput, setActiveInput] = useState(null)
  const [error, setError] = useState('');
  // const [fare,setFare] = useState({});

  console.log("suggestions : ",suggestions);
  const {setVehicleData} = useContext(UserDataContext);
  
  

  const setLocalStorageData = () =>{
    let pickupLoc = localStorage.getItem("pickup");
    let dropLoc = localStorage.getItem("destination");
    console.log("pickupLoc from ridebook: ",pickupLoc);
    console.log("dropLoc from ridebook: ",dropLoc);
    if(pickupLoc && dropLoc){
      setPickup(pickupLoc);
      setDropout(dropLoc);
    }else{
      setPickup("");
      setDropout("");
    }
  }
  useEffect(()=>{setLocalStorageData()},[])
  const fetchSuggestions = async (input) => {
    try {
      const token = localStorage.getItem('token') // Assuming the token is stored in localStorage
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions?input=${encodeURIComponent(input)}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log("response data : ",response);
      setSuggestions(response.data)
    } catch (error) {
      console.error("Error fetching suggestions:", error)
      setSuggestions([])
    }
  }

  const debouncedFetchSuggestions = useCallback(debounce((input) => {
    fetchSuggestions(input)
  }
  
  , 300), [])

  useEffect(() => {
    if (pickup.length >= 3) {
      debouncedFetchSuggestions(pickup)
    } 
  }, [pickup, debouncedFetchSuggestions])

  useEffect(() => {
    if (dropout.length >= 3) {
      debouncedFetchSuggestions(dropout)
    }
  }, [dropout, debouncedFetchSuggestions])

  const handleSuggestionClick = (suggestion) => {
    if (activeInput === 'pickup') {
      setPickup(suggestion.description)
    } else if (activeInput === 'dropout') {
      setDropout(suggestion.description)
    }
    setIsOpen(false)
   
  }
  const setIsShowFun = async () => {
    console.log("pickup and dropout ", pickup, dropout);
    if (pickup && dropout) {
        try {
            // Fetch coordinates for pickup and dropout
            const pickupCoordinates = await getCoordinates(pickup);
            const dropoutCoordinates = await getCoordinates(dropout);

            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
                params: {
                    pickup: JSON.stringify(pickup),
                    destination: JSON.stringify(dropout),
                },
                headers: {
                    Authorization: `bearer ${localStorage.getItem("token")}`,
                },
            });

            console.log(response.data);
            let fare = response.data;
            console.log("p & d & f : ", pickup, dropout, fare);
            setVehicleData({
                pickup: pickup,
                destination: dropout,
                fare: fare,
            });
        } catch (error) {
            console.error("Error fetching fare:", error);
            setError("Failed to fetch fare. Please try again.");
        }
        setIsShow(true);
    } else {
        setError("Please Fill the Field");
    }
};

  useEffect(()=>{
    if(showFeedbackModal) 
     {
      setPickup("")
      setDropout("")
     }
      
  },[])

  return (
    <div>
      <div className="col-span-1 ">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Book a Ride</h2>


          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">📍</span>
                <input
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  onClick={() => {
                    setIsOpen(true)
                    setActiveInput('pickup')
                  }}
                  type="text"
                  placeholder="Enter pickup location"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">📍</span>
                <input
                  type="text"
                  value={dropout}
                  onChange={(e) => setDropout(e.target.value)}
                  onClick={() => {
                    setIsOpen(true)
                    setActiveInput('dropout')
                  }}
                  placeholder="Enter destination"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>
          <div className="py-3 relative">
            {isOpen && suggestions.length > 0 && (
              <div className='absolute w-full bg-white top-0 z-10'>
                {suggestions?.map((elem, idx) => (
                  <div
                    key={idx}
                    className="flex justify-start items-center gap-5 mb-2 border border-1 p-2 hover:border-black rounded-lg cursor-pointer"
                    onClick={() => handleSuggestionClick(elem)}
                  >
                    <div className='rounded-full flex justify-center items-center'>
                      <MapPinCheckInside color="#28A745" />
                    </div>
                    <div className='text-sm font-semibold'>
                      <h4>{elem.description}</h4>
                    </div>
                  </div>
                ))}
              </div>
            )}
           <div onClick={()=>{setIsShowFun()}}>
           <PrimaryButton content={'Search Ride'} />
           </div>
            <SecondaryButton content={'Schedule for Later'} />
          </div>

          <div className={`bg-green-50 rounded-md p-4 flex items-start space-x-4 ${isOpen ? "invisible" : "visible"}`}>
            <div className="text-2xl">⚡</div>
            <div>
              <h3 className="font-semibold text-gray-800">Quick Booking</h3>
              <p className="text-sm text-gray-600">Save your favorite locations for faster booking next time!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RideBook