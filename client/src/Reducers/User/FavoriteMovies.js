import { useReducer } from "react";
import Axios from "../../Actions/Axios";

const initialState = {
  isLoading: false,
  isError: null,
  likedMovies: []
};

const userGetFavoriteMoviesReducer = (state, action) => {
    switch (action.type) {
      case "GET_FAVORITE_MOVIES_REQUEST":
        return { ...state, isLoading: true };
      case "GET_FAVORITE_MOVIES_SUCCESS":
        return { ...state, isLoading: false, likedMovies: action.payload };
      case "GET_FAVORITE_MOVIES_FAIL":
        return { ...state, isLoading: false, isError: action.payload };
      case "GET_FAVORITE_MOVIES_RESET":
        return {...state, isLoading: false, likedMovies: []};
      default:
        return state;
    }
  };

  const getFavoriteMoviesService = async (token) => {
    const { data } = await Axios.get("/users/favorites", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };

export const useUserFavoriteMoviesReducer = () => {
  return useReducer(userGetFavoriteMoviesReducer, initialState);
};

export { getFavoriteMoviesService };