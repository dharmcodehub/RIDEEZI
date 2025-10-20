import { Link } from 'lucide-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Logout =  async() => {
    const navigate = useNavigate();
  
        const token = localStorage.getItem("token");
        const logoutUser = async () => {
          const token = localStorage.getItem("token");
    
          if (!token) {
            console.warn("No token found, redirecting to login...");
            navigate("/login"); // Redirect if no token exists
            return;
          }
    
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_BASE_URL}/users/logout`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
    
            if (response.status === 200) {
              console.log("Logout successful:", response);
              localStorage.removeItem("token");
              navigate("/login");
            }
          } catch (error) {
            console.error("Logout failed:", error);
            
            // Handle unauthorized error (401)
            if (error.response && error.response.status === 401) {
              console.warn("Token expired or invalid, logging out...");
              localStorage.removeItem("token"); // Remove invalid token
              navigate("/login");
            }
          }
        };
       useEffect(()=>{
        
      
          logoutUser();
       },[])
       
       
  return (
    <>
     <h1>logoutUser</h1>
    </>
  )
}

export default Logout
