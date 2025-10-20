import React, {useContext, useEffect, useState} from 'react'
import { UserDataContext } from '../../context/UserContext'
import { redirect, useNavigate } from 'react-router-dom'
import axios from 'axios';
const UserProtectWrapper = ({children}) => {
    const {user,setUser} = useContext(UserDataContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem("token");

    console.log("token : ",token);

    console.log(!token)
   useEffect(() => {
    if(!token){
        navigate("/login");
    }
    getUser();
   }, [token])

  const getUser = () =>{
    console.log("token is : ", token);
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
      headers : {
        Authorization : `bearer ${token}`
      }
      
     }).then(response =>{
      if(response.status == 200){
        const data = response.data;
        console.log("response 1 :",data);
        setUser(data);
        setIsLoading(false);
      }
  
     }).catch(err=>{
      console.log(err);
      localStorage.removeItem("token");
      navigate("/login");
     })
  
  }
   if(isLoading){
    return <h1>User is Loading...</h1>
   }
   
  return (
    <>
      {children}
    </>
  )
}

export default UserProtectWrapper
