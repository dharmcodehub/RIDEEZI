import React from "react";

function CaptainStatusBar({captain}) {
  return (
    <header className="flex flex-wrap gap-5 justify-between py-4 pr-6 pl-20 w-full bg-green-100 shadow-[0px_2px_4px_rgba(0,0,0,0.08)] max-md:px-5 max-md:max-w-full">
      <div className="px-8 py-2 my-auto text-sm font-medium text-green-600 whitespace-nowrap rounded-lg bg-green-600 bg-opacity-10 max-md:pl-5">
        Online
      </div>
      <div className="flex gap-6 items-center">
        <div className="flex gap-4 self-stretch px-4 py-2 my-auto text-sm font-medium text-green-600 rounded-lg bg-green-600 bg-opacity-10">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/46d113f96a5b4b3b8b0fa1d110ef3ac5/811b204162fa4945cb3dd13befae2d2240c2282bac214440d98caacc36246ca2?placeholderIfAbsent=true"
            className="object-contain shrink-0 self-start w-5 aspect-square"
            alt="Earnings icon"
          />
          <span className="basis-auto">Today: $145.75</span>
        </div>
        <div className="flex shrink-0 self-stretch my-auto w-px h-8 bg-zinc-200" />
        <div className="flex gap-3 self-stretch">
          <div className="flex shrink-0 w-10 h-10 border-2 border-green-600 border-solid rounded-[26843500px]" />
          <div className="flex flex-col self-start">
            <h2 className="text-sm font-medium text-neutral-800">
              {captain?.fullname.firstname} + " " + {captain?.fullname.lastname}
            </h2>
            <p className="self-start text-xs text-gray-500">4.92 ★</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default CaptainStatusBar;
