import React from "react";
import ErrorImg from "../../../assets/Error.png"
const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      {/* Navbar */}
      <div className="w-full bg-green-200 py-4 px-6 fixed top-0 left-0 flex justify-between items-center text-black text-lg">
        <a href="/" className="font-bold">ShareRide</a>
      </div>
      
      {/* Main Content */}
      <div className="max-w-lg mt-24">
        <div className="text-6xl text-orange-500">
            <img src={ErrorImg}/>
        </div>
        <h1 className="text-8xl text-green-600 font-bold">404</h1>
        <p className="text-2xl text-gray-700 my-4">
          Oops! Signal got crossed, and we can't find your page.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          Let's get you where you want to go. Please check your URL or select one of the destinations below.
        </p>
        <a
          href="/home"
          className="bg-green-600 text-white px-6 py-3 text-lg rounded-md transition hover:bg-green-700"
        >
          Go to Homepage
        </a>
      </div>
      
      {/* Footer */}
      <div className="w-full bg-green-200 py-3 text-center text-black fixed bottom-0 left-0">
        <a href="/home" className="mx-4 hover:underline">Home</a> |
        <a href="#" className="mx-4 hover:underline">Support</a> |
        <a href="/contact" className="mx-4 hover:underline">Contact</a>
      </div>
    </div>
  );
};

export default Error404;
