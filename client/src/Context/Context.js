import React, { createContext, useEffect, useState } from "react";
import io from 'socket.io-client';


export const UserContext = createContext();

function UserProvider({ children }) {
    const socket = io('http://localhost:3001');

    const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

    useEffect(() => {
        return () => {
          socket.disconnect();
        };
      }, [socket]);

    const [userInfo, setUserInfo] = useState(userInfoFromStorage || null)

    return (
        <UserContext.Provider value={{socket, userInfo, setUserInfo }}>
        {children}
        </UserContext.Provider>
    );
}

export { UserProvider }