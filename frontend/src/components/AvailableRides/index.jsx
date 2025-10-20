import React, { useEffect, useState } from 'react'
import CarImg from "../../assets/car.png";
import autoImg from "../../assets/auto.png"
import { ArrowLeftFromLine, ArrowRightFromLine, User, X } from 'lucide-react';
import PrimaryButton from '../PrimaryButton';
import { useContext } from 'react';
import { UserDataContext } from '../../context/UserContext';
import axios from 'axios';
import BookRidePanel from '../BookRidePanel';
import LookingDriverPanel from '../LookingDriverPanel';
import DriverGetForRide from '../DriverGetForRide';

const AvailableRides = ({ isShow, rideConfirmData, setBookRideInvisible, isShared, sharedRideId }) => {
  const [isBookRide, setIsBookRide] = useState(false);
  const { vehicleData, setVehicleData } = useContext(UserDataContext);
  const [isLookingDriver, setIsLookingDriver] = useState(false);
  const [isRideConfirm, setIsRideConfirm] = useState(false);

  useEffect(() => {
    rideConfirmDataFun();
  }, [isShow, vehicleData, isLookingDriver, rideConfirmData]);

  const createRide = async (vehicleType) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
        pickup: vehicleData.pickup,
        destination: vehicleData.destination,
        vehicleType,
      }, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 201) {
        const data = response.data;
        console.log("create ride data ", data);
      }
    } catch (err) {
      console.log("error in the create ride  : ", err);
    }
  };

  const createShareRide = async (vehicleType) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/share-rides/create`, {
        pickup: vehicleData.pickup,
        destination: vehicleData.destination,
        vehicleType,
      }, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 201) {
        const data = response.data;
        console.log("create shared ride data ", data);
      }
    } catch (err) {
      console.log("error in the create shared ride  : ", err);
    }
  };

  const rideConfirmDataFun = () => {
    if (rideConfirmData) {
      setBookRideInvisible(true);
      setIsRideConfirm(true);
      console.log("I am here mannnn....");
    }
  };

  return (
    <>
      <div className="col-span-1 relative h-full">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 h-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Available Rides</h3>
            <span className="text-sm text-gray-500">Updated just now</span>
          </div>
          {isShow && (
            <>
              <div className="border cursor-pointer hover:border-gray-900 rounded-md p-2 flex justify-between items-center my-2">
                <div className="flex items-center gap-3" onClick={() => { setIsBookRide(true); }}>
                  <div className="w-16">
                    <img src={CarImg} alt="" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-md">Premium Sedan</h4>
                    <p className="text-sm text-gray-600">BMW 5 Series</p>
                    <div className="flex space-x-4 text-sm text-gray-500 mt-1">
                      <span>18 min</span>
                      <span>4 seats</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <h4 className="font-semibold text-green-500"> ₹ {vehicleData.fare.car}</h4>
                </div>
              </div>
              <div className="border cursor-pointer hover:border-gray-900 rounded-md p-2 flex justify-between items-center my-2">
                <div className="flex items-center gap-3">
                  <div className="w-16">
                    <img src={autoImg} alt="" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-md">Premium Sedan</h4>
                    <p className="text-sm text-gray-600">Bajaj Auto</p>
                    <div className="flex space-x-4 text-sm text-gray-500 mt-1">
                      <span>10 min</span>
                      <span>3 seats</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <h4 className="font-semibold text-green-500"> ₹ {vehicleData.fare.auto}</h4>
                </div>
              </div>
            </>
          )}
        </div>
        {isRideConfirm ? (
          <div className={`absolute bottom-0 left-0 w-full bg-white rounded-lg shadow-md p-4 transition-all duration-1000 overflow-hidden ${isRideConfirm ? "h-full visible opacity-1" : `h-0 invisible opacity-0`}`}>
            <DriverGetForRide vehicleData={vehicleData} rideConfirmData={rideConfirmData} />
          </div>
        ) : (!isLookingDriver ? (
          <BookRidePanel
            isBookRide={isBookRide}
            vehicleData={vehicleData}
            setIsLookingDriver={(data) => { setIsLookingDriver(true); }}
            createRide={isShared ? createShareRide : createRide}
            isLookingDriver={isLookingDriver}
            setIsBookRide={setIsBookRide}
            isShared={isShared}
            sharedRideId={sharedRideId}
          />
        ) : (
          <LookingDriverPanel
            isLookingDriver={isLookingDriver}
            vehicleData={vehicleData}
            setIsLookingDriver={setIsLookingDriver}
            isBookRide={isBookRide}
            setIsBookRide={setIsBookRide}
          />
        ))}
      </div>
    </>
  );
};

export default AvailableRides;
