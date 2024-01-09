import React, { createContext, useState } from "react";


const UserContext = createContext();

function UserProvider({ children }) {

    const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
    
    const initialState = {
        userInfo: userInfoFromStorage
    }

    const [userInfo, setUserInfo] = useState(initialState)

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
        {children}
        </UserContext.Provider>
    );
}

export { UserProvider }