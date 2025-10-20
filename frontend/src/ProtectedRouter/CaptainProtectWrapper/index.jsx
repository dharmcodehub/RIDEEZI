import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../../context/CaptainContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainProtectWrapper = ({children}) => {
    const {captain,setCaptain} = useContext(CaptainDataContext);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    
    useEffect(()=>{
        if(!token){
            navigate("/captain-login");
        }
        checkCaptain();
    },[token])

    const checkCaptain = () =>{
        try{
            axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
                headers :{
                    Authorization : `bearer ${token}`,
                }
            }).then(response=>{
              if( response.status == 200){
                const data = response.data;
                setCaptain(data.captain);
                setIsLoading(false);
              }
                
            }).catch(err =>{
                localStorage.removeItem("token");
                navigate("/captain-login");
                console.log(err);
    
                
            })
        }catch(error){
            console.log(error)
        }
    }

   

    if(isLoading){
        return 
        <h1>Captain is Loading</h1>
    }
  return (
    <>
      {children}
    </>
  )
}

export default CaptainProtectWrapper
