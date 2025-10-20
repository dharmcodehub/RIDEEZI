import React from 'react'
import { Link } from "react-router-dom"
const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xl font-bold text-green-500">ShareRide</span>
            </div>
            <p className="text-gray-600 mb-4">
              Experience seamless ride-sharing with our trusted community of drivers and passengers.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white"
              >
                F
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white"
              >
                T
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white"
              >
                I
              </a>
            </div>
          </div>
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-green-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-600 hover:text-green-500">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-gray-600 hover:text-green-500">
                  Safety
                </Link>
              </li>
              <li>
                <Link to="/cities" className="text-gray-600 hover:text-green-500">
                  Cities
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-600 hover:text-green-500">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">For Drivers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/become-driver" className="text-gray-600 hover:text-green-500">
                  Become a Driver
                </Link>
              </li>
              <li>
                <Link to="/requirements" className="text-gray-600 hover:text-green-500">
                  Requirements
                </Link>
              </li>
              <li>
                <Link to="/earnings" className="text-gray-600 hover:text-green-500">
                  Earnings
                </Link>
              </li>
              <li>
                <Link to="/vehicle-solutions" className="text-gray-600 hover:text-green-500">
                  Vehicle Solutions
                </Link>
              </li>
              <li>
                <Link to="/driver-safety" className="text-gray-600 hover:text-green-500">
                  Driver Safety
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2 mb-4">
              <p className="flex items-center text-gray-600">
                <span className="mr-2">📍</span> 123 Main Street, City, Country
              </p>
              <p className="flex items-center text-gray-600">
                <span className="mr-2">📧</span> support@shareride.com
              </p>
              <p className="flex items-center text-gray-600">
                <span className="mr-2">📞</span> +1 234 567 8900
              </p>
            </div>
            <h4 className="text-md font-semibold mb-2">Newsletter</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="px-4 py-2 bg-green-500 text-white rounded-r-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">© 2024 ShareRide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer