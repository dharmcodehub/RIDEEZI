import React from "react";
import CarImg from "../../assets/car.png";
import { ArrowLeftFromLine, ArrowRightFromLine, User, X } from "lucide-react";
const DriverGetForRide = ({ rideConfirmData, vehicleData }) => {
  console.log("ride confirm data : ", rideConfirmData);
  return (
    <>
      <h3 className="text-2xl font-bold">Driver Get for Ride</h3>
      <div className="flex justify-between items-center">
        <img className="w-24 mb-2" src={CarImg} alt="Car" />
        <div>
          <h4 className="font-semibold text-lg text-end">
            {rideConfirmData?.captain.fullname.firstname +
              " " +
              rideConfirmData?.captain.fullname.lastname}
          </h4>
          <p className="text-gray-600">{rideConfirmData?.captain.email}</p>
          <h4 className="text-sm text-end"><span className="font-semibold"> OTP : </span>{rideConfirmData?.otp}</h4>
        </div>
      </div>
      <h4 className="font-semibold text-lg ">Vehicle Details</h4>
      <div className="flex gap-4 justify-between text-center  w-full">
        <p className="text-gray-700">
          <span className="font-semibold text-sm w-1/2">Type: <br /></span> {rideConfirmData?.captain.vehicle?.type}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold text-sm w-1/2">Plate Number: <br /></span> {rideConfirmData?.captain.vehicle?.plate}
        </p>
        </div>
        <div className="flex  justify-between text-center mb-4">
        <p className="text-gray-700">
          <span className="font-semibold text-sm w-1/2">Color: <br /></span> {rideConfirmData?.captain.vehicle?.color}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold text-sm w-1/2">Model: <br /></span> {rideConfirmData?.captain.vehicle?.model}
        </p>
      </div>
      <div className="w-full border-t-2 border-gray-300 pt-1">
        <div className="flex items-center gap-2 mb-1">
          <ArrowLeftFromLine color="#28A745" size={15} />
          <div>
            <h2 className="text-sm">
              <span className="font-semibold text-sm text-lg">Block 32,</span>
              <br />
              {vehicleData.pickup}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <ArrowRightFromLine color="#28A745" size={45} />
          <div>
            <h2 className="text-sm">
              <span className="font-semibold text-sm text-lg">Sector 47A,</span>
              <br />
              {vehicleData.destination}
            </h2>
          </div>
        </div>
      </div>
      <div className="w-full border-t-2 border-gray-300 mt-4 pt-2 flex justify-between">
        <div className="flex flex-col items-center">
          <h4 className="font-semibold text-sm">Seat Capacity</h4>
          <h4 className="text-xs">4</h4>
        </div>
        <div className="flex flex-col items-center">
          <h4 className="font-semibold text-sm">Reach In</h4>
          <h4 className="text-xs">20 min</h4>
        </div>
        <div className="flex flex-col items-center">
          <h4 className="font-semibold text-sm">Price Cash</h4>
          <h4 className="text-xs">₹ {vehicleData.fare.car}</h4>
        </div>
      </div>
    </>
  );
};

export default DriverGetForRide;
