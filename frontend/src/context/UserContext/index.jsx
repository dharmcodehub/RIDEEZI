import React, { createContext, useState } from 'react';

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    fullname: {
      firstname: '',
      lastname: '',
    },
    email: '',
  });

  const [vehicleData, setVehicleData] = useState({
    pickup: '',
    destination: '',
    fare: {},
  });

  return (
    <UserDataContext.Provider value={{ user, setUser, vehicleData, setVehicleData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
