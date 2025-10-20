import React from 'react'
import Login from './container/Pages/Login'
import Router from './container/Router/'
import { BrowserRouter } from 'react-router-dom'
import Home from './container/Pages/Home'
import UserContext from './context/UserContext'
import CaptainContext from './context/CaptainContext'
import SocketContext from './context/SocketContext'
import RideContext from './context/RideContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <SocketContext>
        <RideContext>
          <CaptainContext>
            <UserContext>
              <BrowserRouter>
                <Router/>
              </BrowserRouter>
            </UserContext>
          </CaptainContext>
        </RideContext>
      </SocketContext>
    </>
  )
}

export default App
