"use client"

import { useState } from "react"
import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"

function HowToUse() {
  const [activeTab, setActiveTab] = useState("passengers")

  return (
   <>
   <Navbar/>
    <div className="min-h-screen bg-white py-12 font-sans">
    <div className="container mx-auto px-4 max-w-4xl">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-2">How to Use ShareRide</h1>
      <p className="text-center text-gray-600 mb-8">
        Your comprehensive guide to using ShareRide as a passenger or driver
      </p>

      <div className="flex justify-center gap-2 mb-12">
        <button
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === "passengers" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("passengers")}
        >
          For Passengers
        </button>
        <button
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === "drivers" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("drivers")}
        >
          For Drivers
        </button>
      </div>

      <div className="space-y-16">
        {/* Getting Started as a Passenger */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Getting Started as a Passenger</h2>
          <div className="grid grid-cols-3 gap-8">
            <div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-medium mb-4">
                1
              </div>
              <h3 className="font-medium text-gray-800 mb-3">Create Your Account</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 mt-0.5 bg-gray-100 rounded flex-shrink-0" />
                  <span>Sign up with your email and phone</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 mt-0.5 bg-gray-100 rounded flex-shrink-0" />
                  <span>Verify your email and phone number</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 mt-0.5 bg-gray-100 rounded flex-shrink-0" />
                  <span>Complete your profile with a photo</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 mt-0.5 bg-gray-100 rounded flex-shrink-0" />
                  <span>Add preferred payment method</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-medium mb-4">
                2
              </div>
              <h3 className="font-medium text-gray-800 mb-3">Find & Book Rides</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 mt-0.5 bg-gray-100 rounded flex-shrink-0" />
                  <span>Enter your pickup and destination</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 mt-0.5 bg-gray-100 rounded flex-shrink-0" />
                  <span>Choose date and time</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 mt-0.5 bg-gray-100 rounded flex-shrink-0" />
                  <span>Browse available shared rides</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 mt-0.5 bg-gray-100 rounded flex-shrink-0" />
                  <span>Select your preferred ride option</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-medium mb-4">
                3
              </div>
              <h3 className="font-medium text-gray-800 mb-3">During & After Ride</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 mt-0.5 bg-gray-100 rounded flex-shrink-0" />
                  <span>Track your ride in real-time</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 mt-0.5 bg-gray-100 rounded flex-shrink-0" />
                  <span>Share trip details with others</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 mt-0.5 bg-gray-100 rounded flex-shrink-0" />
                  <span>Rate your experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 mt-0.5 bg-gray-100 rounded flex-shrink-0" />
                  <span>Save favorite routes</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Getting Started as a Driver */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Getting Started as a Driver</h2>
          <div className="grid grid-cols-3 gap-8">
            <div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-medium mb-4">
                1
              </div>
              <h3 className="font-medium text-gray-800 mb-3">Register as Driver</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 mt-0.5 bg-gray-100 rounded flex-shrink-0" />
                  <span>Complete driver registration form</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 mt-0.5 bg-gray-100 rounded flex-shrink-0" />
                  <span>Submit required documents</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 mt-0.5 bg-gray-100 rounded flex-shrink-0" />
                  <span>Vehicle inspection verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 mt-0.5 bg-gray-100 rounded flex-shrink-0" />
                  <span>Complete safety training</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-medium mb-4">
                2
              </div>
              <h3 className="font-medium text-gray-800 mb-3">Offer Rides</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 mt-0.5 bg-gray-100 rounded flex-shrink-0" />
                  <span>Post your planned routes</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 mt-0.5 bg-gray-100 rounded flex-shrink-0" />
                  <span>Set available seats and price</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 mt-0.5 bg-gray-100 rounded flex-shrink-0" />
                  <span>Specify pickup/drop-off points</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 mt-0.5 bg-gray-100 rounded flex-shrink-0" />
                  <span>Set schedule preferences</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-medium mb-4">
                3
              </div>
              <h3 className="font-medium text-gray-800 mb-3">Manage Rides</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 mt-0.5 bg-gray-100 rounded flex-shrink-0" />
                  <span>Accept/decline ride requests</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 mt-0.5 bg-gray-100 rounded flex-shrink-0" />
                  <span>Communicate with passengers</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 mt-0.5 bg-gray-100 rounded flex-shrink-0" />
                  <span>Track earnings and payments</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 mt-0.5 bg-gray-100 rounded flex-shrink-0" />
                  <span>Manage trip ratings</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Safety & Guidelines */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Safety & Guidelines</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium text-gray-800 mb-4">For Passengers</h3>
              <div className="space-y-3">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Verify Your Ride</h4>
                  <p className="text-sm text-gray-600">
                    Always check license plate, driver photo, and car model before entering
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Share Trip Details</h4>
                  <p className="text-sm text-gray-600">
                    Use the in-app feature to share your journey with trusted contacts
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Emergency Support</h4>
                  <p className="text-sm text-gray-600">Access 24/7 emergency assistance through the help button</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-800 mb-4">For Drivers</h3>
              <div className="space-y-3">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Verify Passengers</h4>
                  <p className="text-sm text-gray-600">
                    Confirm passenger identity and booking details before starting
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Follow Route Guidelines</h4>
                  <p className="text-sm text-gray-600">Stick to the approved route and pickup/drop-off points</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Maintain Standards</h4>
                  <p className="text-sm text-gray-600">Follow vehicle maintenance and cleanliness guidelines</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">How do I cancel a booking?</h3>
              <p className="text-sm text-gray-600">
                You can cancel up to 2 hours before the scheduled time without any penalty. Later cancellations may
                incur a fee.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">How are payments handled?</h3>
              <p className="text-sm text-gray-600">
                All payments are processed securely through our platform. Drivers receive payments weekly.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">What if I'm running late?</h3>
              <p className="text-sm text-gray-600">
                Contact your driver/passenger through the app. A 5-minute waiting time is standard.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
  <Footer/>
   </>
  )
}

export default HowToUse

