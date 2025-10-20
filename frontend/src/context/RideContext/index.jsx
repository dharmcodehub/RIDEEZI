import React, { createContext, useState } from "react";

export const RideDataContext = createContext();
const RideContext = ({children}) => {
  const [ride, setRide] = useState({
    destination: "",
    fare: 0,
    pickup: "pune",
    status: "pending",
    user: {
      email: "test@test8.com",
      fullname: {
        firstname: "test_firstname",
        lastname: "test_lastname",
      },
    },
  });
  return (
    <RideDataContext.Provider
      value={{ride, setRide}}
    >
        {children}
    </RideDataContext.Provider>
  );
};

export default RideContext;
