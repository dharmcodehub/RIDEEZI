import React from "react";

function PassengerInfo({user}) {
  return (
    <section className="flex flex-col items-start py-2 px-8 mt-6 w-full bg-gray-50 rounded-xl max-md:px-5 max-md:mr-0.5 max-md:max-w-full">
      <div className="flex gap-1.5">
        <h3 className="grow text-lg font-semibold text-neutral-800">
          {user?.fullname?.firstname + " " + user?.fullname?.lastname}
        </h3>
        <div className="flex gap-1 self-start px-2 py-0.5 text-sm text-green-600 whitespace-nowrap bg-green-100 rounded-[26843500px]">
          <span>4.9</span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/46d113f96a5b4b3b8b0fa1d110ef3ac5/8e7c7b6f48b6ae74869184aa8e55bd72b6ac53af4848bde0a1028dcd06d8c628?placeholderIfAbsent=true"
            className="object-contain shrink-0 my-auto w-3 aspect-square"
            alt="Star"
          />
        </div>
      </div>
      <div className="flex  gap-4 mt-1 text-sm text-gray-500">
        <span>42 rides</span>   
        <span>•</span>
        <span className="basis-auto">{user?.email}</span>
      </div>
    </section>
  );
}

export default PassengerInfo;
