import { ArrowLeftFromLine, ArrowRightFromLine, X } from 'lucide-react'
import React from 'react'
import PrimaryButton from '../PrimaryButton'
import CarImg from "../../assets/car.png";
import autoImg from "../../assets/auto.png"
const BookRidePanel = ({isBookRide,vehicleData , setIsLookingDriver , createRide , isLookingDriver , setIsBookRide}) => {
  return (
    <>
      <div className={`absolute bottom-0 left-0 w-full bg-white rounded-lg shadow-md p-4   transition-all duration-1000 overflow-hidden  ${(isBookRide && !isLookingDriver) ? "h-full visible opacity-1"  : `h-0 invisible opacity-0`}`}>
                <span className={`absolute top-6 right-6 cursor-pointer ${(!isBookRide) ? "invisible" : "visible"}`} onClick={()=>setIsBookRide(false)}><X color="#28A745" /></span>
                <h3 className='text-xl font-semibold'>Confirm Ride</h3>
                {/* <span className="text-sm text-gray-500">Confirm Your Ride</span> */}
                <div className='flex w-full justify-center items-center flex-col'>
                  <img className='w-32' src={CarImg}>
                  </img>
                </div>
                <div className='flex flex-col justify-start w-full border-t-4 border-grey-900'>
                <div className='flex gap-2 p-3 '>
                    <span><ArrowLeftFromLine color="#28A745" /></span>
                    <div>
                    <h2 className='text-sm'><span className='font-semibold text-lg'>Block 32,</span><br />{vehicleData.pickup}</h2>
                    </div>
                </div>
                </div>
                <div className='flex flex-col justify-start w-full border-t-4 border-grey-900'>
                <div className='flex gap-2 p-3 '>
                    <span><ArrowRightFromLine color="#28A745" /></span>
                    <div>
                    <h2 className='text-sm'><span className='font-semibold text-lg'>Sector 47A,</span><br />{vehicleData.destination}</h2>
                    </div>
                </div>
                </div>
                <div className='flex flex-row justify-between items-center w-full border-t-4 border-grey-900'>
                   <div className='flex justify-center items-center flex-col'>
                    <h4>Seat Capacity</h4>
                    <h4>4</h4>
                   </div>
                   <div className='flex justify-center items-center flex-col'>
                    <h4>Reach In</h4>
                    <h4>20 min</h4>
                   </div>
                   <div className='flex justify-center items-center flex-col'>
                    <h4>Max Price Cash</h4>
                    <h4>₹ {vehicleData.fare.car}</h4>
                </div>
                </div>
                <div className='w-full mt-5' onClick={()=>{createRide('car') ; setIsLookingDriver(true) ; setIsBookRide(false)}}>
                <PrimaryButton content={'Book Ride'}/>
                </div>

            </div>
    </>
  )
}

export default BookRidePanel
