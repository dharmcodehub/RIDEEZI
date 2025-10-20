import React, { createContext, useState } from 'react'

export const CaptainDataContext = createContext();
const CaptainContext = ({children}) => {
    const [captain,setCaptain] = useState({
        fullname : {
            firstname : "" , 
            lastname : "",
           },
            email : "" , 
            password : "" ,
            vehicle : {
              color : "",
              capacity : 0,
              model : "",
              plate : "",
              type : "",
            }
    });
  return (
    <>
    <CaptainDataContext.Provider value={{captain,setCaptain}}>
    {children}
    </CaptainDataContext.Provider>
      
    </>
  )
}

export default CaptainContext
