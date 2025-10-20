import React, { useContext, useEffect } from 'react'
import {Link} from 'react-router-dom';
import { UserDataContext } from '../../context/UserContext';
import Logout from '../Logout';
const Navbar = () => {
  const {user} = useContext(UserDataContext);
  const token = localStorage.getItem("token");
    console.log(user);
    
  return (
    <>
    <header className="bg-white  border-gray-300 border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full mr-2"></div>
            <span className="text-xl font-bold text-green-500">ShareRide</span>
          </div>
          <nav className="flex items-center space-x-6">
            <Link to="/about" className="text-gray-600 hover:text-green-500">
              About
            </Link>
            <Link to="/how-to-use" className="text-gray-600 hover:text-green-500">
              How to Use
            </Link>
            <Link to="/help" className="text-gray-600 hover:text-green-500">
              Help
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-green-500">
              Contact
            </Link>
            {(!token) ? (<><Link to="/login" className="px-4 py-2 border border-green-500 text-green-500 rounded-md hover:bg-green-50">
              Login
            </Link>
            <Link to="/signup" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              Sign Up
            </Link> </>) : <><h2 className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-2xl'>{user?.fullname.firstname}</h2>  <Link to={'/logout'} className="px-4 py-2 border border-green-500 text-green-500 rounded-md hover:bg-green-50">
              logout
    </Link> </>}
          </nav>
        </div>
      </header>
    </>
  )
}

export default Navbar
