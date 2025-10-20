import React from 'react'

const RideMap = () => {
  return (
    <>
     <div className="col-span-1">
            <div className="bg-gray-200 rounded-lg h-full relative">
              {/* Map placeholder */}
              
              <div className="absolute top-4 right-4 space-y-2">
                <button className="w-8 h-8 bg-white rounded-md shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-100">
                  ⛶
                </button>
                <button className="w-8 h-8 bg-white rounded-md shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-100">
                  +
                </button>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-white rounded-md shadow-md p-4 flex items-center space-x-4">
                <div className="text-2xl text-green-500">⚡</div>
                <div className="flex-grow">
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Estimated Time</span>
                    <span>Distance</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>18 minutes to destination</span>
                    <span>4.5 miles</span>
                  </div>
                </div>
              </div>
            </div>
          </div> 
    </>
  )
}

export default RideMap
