import React from "react";

function LocationDetails({pickup,destination}) {
  return (
    <section className="flex gap-3 self-start mt-6">
      <div className="flex flex-col self-start mt-1 text-xs text-white whitespace-nowrap">
        <div className="px-2 w-6 h-6 bg-green-600 rounded-[26843500px] flex items-center justify-center">
          P
        </div>
        <div className="flex shrink-0 self-center mt-8 w-px h-6 bg-zinc-200 max-md:mt-10" />
        <div className="px-2 mt-7 w-6 h-6 bg-red-500 rounded-[26843500px] flex items-center justify-center">
          D
        </div>
      </div>
      <div className="flex flex-col grow shrink-0 items-start text-sm text-gray-500 basis-0 w-fit">
        <h4 className="font-medium text-neutral-800">Pickup Location</h4>
        <p className="mt-1">{pickup}</p>
        <div className="flex gap-2 px-3 py-2 mt-2 bg-gray-50 rounded-lg">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/46d113f96a5b4b3b8b0fa1d110ef3ac5/30b5c01c48dda2727df2f2352d9a522be39ff2ca3b75ae78d4397f16a19691f0?placeholderIfAbsent=true"
            className="object-contain shrink-0 my-auto w-4 aspect-square"
            alt="Clock"
          />
          <span className="basis-auto">Arriving in 5 mins</span>
        </div>
        <h4 className="mt-6 font-medium text-neutral-800 max-md:mt-10">
          Dropoff Location
        </h4>
        <p className="self-stretch mt-1">
          {destination}
        </p>
      </div>
    </section>
  );
}

export default LocationDetails;
