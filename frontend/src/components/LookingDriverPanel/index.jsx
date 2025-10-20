import { ArrowLeftFromLine, ArrowRightFromLine, X } from "lucide-react";
import React from "react";
import PrimaryButton from "../PrimaryButton";
import CarImg from "../../assets/car.png";
import autoImg from "../../assets/auto.png";
const LookingDriverPanel = ({ isLookingDriver, vehicleData , setIsLookingDriver , isBookRide, setIsBookRide}) => {
  return (
    <>
      <div
        className={`absolute bottom-0 left-0 w-full bg-white rounded-lg shadow-md p-4   transition-all duration-1000 overflow-hidden  ${
          (isLookingDriver && !isBookRide)
            ? "h-full visible opacity-1"
            : `h-0 invisible opacity-0`
        }`}
      >
        <h3 className="text-xl font-semibold">Looking for Driver</h3>
        <div className="flex w-full justify-center items-center flex-col">
          <img className="w-32" src={CarImg}></img>
        </div>
        <div className="flex flex-col justify-start w-full border-t-4 border-grey-900">
          <div className="flex gap-2 p-3 ">
            <span>
              <ArrowLeftFromLine color="#28A745" />
            </span>
            <div>
              <h2 className="text-sm">
                <span className="font-semibold text-lg">Block 32,</span>
                <br />
                {vehicleData.pickup}
              </h2>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start w-full border-t-4 border-grey-900">
          <div className="flex gap-2 p-3 ">
            <span>
              <ArrowRightFromLine color="#28A745" />
            </span>
            <div>
              <h2 className="text-sm">
                <span className="font-semibold text-lg">Sector 47A,</span><br />
                {vehicleData.destination}
              </h2>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center w-full border-t-4 border-grey-900">
          <div className="flex justify-center items-center flex-col">
            <h4>Seat Capacity</h4>
            <h4>4</h4>
          </div>
          <div className="flex justify-center items-center flex-col">
            <h4>Reach In</h4>
            <h4>20 min</h4>
          </div>
          <div className="flex justify-center items-center flex-col">
            <h4>Price Cash</h4>
            <h4>₹ {vehicleData.fare.car}</h4>
          </div>
        </div>
        <div className="w-full mt-5">
          <div className="w-full  py-5 ">
            <button className="bg-red-500 text-white p-2 rounded w-full" onClick={()=>{setIsLookingDriver(false) ; setIsBookRide(true)}}>
              Cancel Ride
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LookingDriverPanel;
