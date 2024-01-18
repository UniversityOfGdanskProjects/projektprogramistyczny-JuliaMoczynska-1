import React, { createContext, useState } from "react";
import { useUserFavoriteMoviesReducer } from "../Api/User/FavoriteMovies";


export const UserContext = createContext();

function UserProvider({ children }) {

    const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;


    const [userInfo, setUserInfo] = useState(userInfoFromStorage || null)

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
        {children}
        </UserContext.Provider>
    );
}

export { UserProvider }