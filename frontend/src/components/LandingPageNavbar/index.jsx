import React from 'react'

const LandingPageNavbar = () => {
  return (
    <>
       <header className="absolute top-0 ">
             <div className="container mx-auto px-4 py-4 flex justify-between items-center">
               <div className="flex items-center">
                 <div className="w-8 h-8 bg-green-500 rounded-full mr-2"></div>
                 <span className="text-xl font-bold text-green-500">ShareRide</span>
               </div>
             </div>
           </header> 
    </>
  )
}

export default LandingPageNavbar
