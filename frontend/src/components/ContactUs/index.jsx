import React from 'react'

const ContactUs = () => {
  return (
    <>
         <main className="container mx-auto px-4 py-8">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-center mb-8">Our Services</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="text-3xl mb-4">🚲</div>
                  <h3 className="font-semibold mb-2">Bike</h3>
                  <p className="text-gray-600">Quick and affordable rides for solo travelers</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="text-3xl mb-4">💚</div>
                  <h3 className="font-semibold mb-2">Auto</h3>
                  <p className="text-gray-600">Convenient three-wheeler rides</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="text-3xl mb-4">🚗</div>
                  <h3 className="font-semibold mb-2">Auto Share</h3>
                  <p className="text-gray-600">Share your auto ride, save more</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="text-3xl mb-4">🚕</div>
                  <h3 className="font-semibold mb-2">Cab Economy</h3>
                  <p className="text-gray-600">Affordable car rides for comfort</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="text-3xl mb-4">👥</div>
                  <h3 className="font-semibold mb-2">Cab Economy Share</h3>
                  <p className="text-gray-600">Share your ride, split the fare</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="text-3xl mb-4">👤</div>
                  <h3 className="font-semibold mb-2">Cab Premium</h3>
                  <p className="text-gray-600">Luxury rides for special occasions</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="text-3xl mb-4">🚘</div>
                  <h3 className="font-semibold mb-2">Cab Premium Share</h3>
                  <p className="text-gray-600">Share luxury rides at better rates</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="text-3xl mb-4">🛡️</div>
                  <h3 className="font-semibold mb-2">Outstation</h3>
                  <p className="text-gray-600">Long distance travel made comfortable</p>
                </div>
              </div>
            </section>
      
            {/* Add more sections as needed */}
          </main>
    </>
  )
}

export default ContactUs
