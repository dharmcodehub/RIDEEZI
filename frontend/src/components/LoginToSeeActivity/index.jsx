import React from 'react'

const LoginToSeeActivity = () => {
  return (
    <>
       <div className="w-full max-w-[1400px] mx-auto bg-white shadow-lg rounded-xl p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
      
      {/* Left Section */}
      <div className="flex-1 w-full">
        <h2 className="text-2xl font-bold">Log in to see your recent activity</h2>
        <p className="text-gray-600 mt-1 text-base">
          View past trips, tailored suggestions, support resources, and more.
        </p>

        {/* Feature Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center text-center">
            <span className="text-green-600 text-2xl">⏳</span>
            <p className="font-semibold text-sm mt-2">Access History</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center text-center">
            <span className="text-green-600 text-2xl">⚙️</span>
            <p className="font-semibold text-sm mt-2">Get Personalized</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center text-center">
            <span className="text-green-600 text-2xl">🏷</span>
            <p className="font-semibold text-sm mt-2">Discover Offers</p>
          </div>
        </div>

        {/* Login Button & Sign-Up (Same Line) */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
          <button className="bg-green-500 text-white py-3 px-6 rounded-lg text-base hover:bg-green-600 transition">
            Log in to your account
          </button>
          <p className="text-gray-600 text-sm">
            Don't have an account? <a href="#" className="text-green-600 font-semibold">Sign up</a>
          </p>
        </div>
      </div>

      {/* Right Section (Image Placeholder) */}
      <div className="w-[300px] h-[260px] bg-gray-300 rounded-lg hidden lg:block"></div>
      
    </div>
    </>
  )
}

export default LoginToSeeActivity
