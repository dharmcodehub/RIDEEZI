import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Signup from "../Pages/Signup"
import CaptainLogin from "../Pages/CaptainLogin"
import CaptainSignup from "../Pages/CaptainSignup"
import Ride from '../Pages/Ride'
import UserProtectWrapper from '../../ProtectedRouter/UserProtectWrapper'
import Logout from '../../components/Logout'
import CaptainDashboard from "../Pages/CaptainDashboard";
import CaptainProtectWrapper from '../../ProtectedRouter/CaptainProtectWrapper'
import CaptainRideAssignment from '../Pages/CaptainRideAssignment'
import OnboardingSlider from '../../components/OnboardingSlider'
import ContactUs from '../../components/ContactUs'
import HowToUse from '../Pages/HowToUse'
import AboutUs from '../Pages/AboutUs'
import Riding from '../Pages/Riding'
import Error404 from '../Pages/Error404'
import LandingPage from '../Pages/LandingPage'
import ShareRide from '../Pages/ShareRide'
const Router = () => {
  return (
    <>
     <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/contact' element={<ContactUs/>}/>
        <Route path='/how-to-use' element={<HowToUse></HowToUse>}/>
        <Route path='/about' element={<AboutUs></AboutUs>}/>
        <Route path='/riding' element={<Riding/>}/>
        <Route path="/share-ride" element={<UserProtectWrapper><ShareRide/></UserProtectWrapper>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/captain-login' element={<CaptainLogin/>}/>
        <Route path='/captain-signup' element={<CaptainSignup/>}/>
        <Route path='/ride' element={<UserProtectWrapper><Ride/></UserProtectWrapper>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path="/captain-home" element={<CaptainProtectWrapper>
        <CaptainDashboard/>
        </CaptainProtectWrapper>} />
        <Route path="/captain-assignment" element={<CaptainRideAssignment/>}/>
        <Route path='*' element={<Error404/>}/>
    </Routes> 
    </>
  )
}

export default Router
