import React, { useEffect, useState } from "react";

function FareSummary({fare}) {
  const [fareData , setFareData] = useState({
    price : 0.00,
    discount : 0.0,
  });

  useEffect(()=>{
    setFareData({
      price : fare,
      discount : (fare * 0.02).toFixed(2),
    })
  },[fare])
  return (
    <>
      <div className="flex shrink-0 mt-4 max-w-full h-px bg-zinc-200 w-full justify-between " />
      <div className="flex gap-5 justify-between mt-2 w-full text-sm">
        <span className="text-gray-500">Price</span>
        <div className="flex  whitespace-nowrap text-neutral-800">
          <span>₹</span>
          <span>{fareData.price}</span>
        </div>
      </div>
      <div className="flex gap-5 justify-between mt-2 w-full text-sm">
        <span className="text-gray-500">Discount 2%</span>
        <div className="flex whitespace-nowrap text-neutral-800">
          <span>₹</span>
          <span>{fareData.discount}</span>
        </div>
      </div>
      <div className="flex shrink-0 mt-2 max-w-full h-px bg-zinc-200 w-full justify-between " />
      <div className="flex gap-5 justify-between mt-2.5 text-base font-medium text-neutral-800">
        <span>Final Price</span>
        <span>{(fareData.price - fareData.discount)}</span>
      </div>
    </>
  );
}

export default FareSummary;
