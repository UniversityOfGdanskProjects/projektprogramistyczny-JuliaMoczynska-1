import React, { createContext, useState } from "react";
import { useUserFavoriteMoviesReducer } from "../Reducers/User/FavoriteMovies";


export const UserContext = createContext();

function UserProvider({ children }) {

    const [favorietesState, setFavorietes ] = useState([]);

    const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
    
    // const initialState = {
    //     userInfo: userInfoFromStorage
    // }



    const [userInfo, setUserInfo] = useState(userInfoFromStorage || null)

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo, setFavorietes }}>
        {children}
        </UserContext.Provider>
    );
}

export { UserProvider }