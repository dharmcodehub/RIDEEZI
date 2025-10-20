"use client";
import React from "react";
import axios from "axios";
function GoOnlineCard({status , setStatus}) {

  

  const setOnOrOff = async () =>{
    if(status === "offline"){
      setStatus("online")
      
  }else{
    setStatus("offline")
  }
}
  return (
    <section className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm">
      <h2 className="mb-4 text-2xl font-semibold text-neutral-800">
        Ready to start driving?
      </h2>
      <button onClick={setOnOrOff} className="px-8 py-4 text-base font-medium text-white bg-green-600 rounded-xl shadow-sm">
        {status === "offline" ? "Go Online" : "Go Offline"}
      </button>
    </section>
  );
}

export default GoOnlineCard;
