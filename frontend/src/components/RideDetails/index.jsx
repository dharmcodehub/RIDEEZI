import React from "react";
import FareSummary from "../FareSummary";

function RideDetails({ride , captain}) {
  return (
    <section className="flex flex-col p-4 mt-6 w-full bg-gray-50 rounded-xl max-md:mr-0.5 max-md:max-w-full">
      <h3 className="self-start text-base font-semibold text-neutral-800">
        Ride Details
      </h3>
      <div className="flex justify-around items-center mt-5">
        <div className="flex flex-col items-center px-6 pt-3 pb-9 bg-white rounded-lg h-[122px] w-[122px] max-md:px-5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/46d113f96a5b4b3b8b0fa1d110ef3ac5/4e6eebcd43c195647de13bf59cfbb28fdd19f87fe05b784cc1b953fee3c958c7?placeholderIfAbsent=true"
            className="object-contain w-5 aspect-square"
            alt="Distance icon"
          />
          <span className="mt-2 text-xs text-gray-500">Distance</span>
          <span className="mt-1.5 text-base font-medium text-neutral-800">
            15.2 mi
          </span>
        </div>
        <div className="flex flex-col items-center px-6 pt-3 pb-9 bg-white rounded-lg h-[122px] w-[122px] max-md:px-5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/46d113f96a5b4b3b8b0fa1d110ef3ac5/8c2598c9b1ab2d98d7a6ddd37ba21436659211221db00b77f0a3a3d1c5cba5c1?placeholderIfAbsent=true"
            className="object-contain w-5 aspect-square"
            alt="Duration icon"
          />
          <span className="mt-2 text-xs text-gray-500">Duration</span>
          <span className="mt-1.5 text-base font-medium text-neutral-800">
            28 min
          </span>
        </div>
       
      </div>

      <FareSummary fare={ride?.fare}/>
    </section>
  );
}

export default RideDetails;
