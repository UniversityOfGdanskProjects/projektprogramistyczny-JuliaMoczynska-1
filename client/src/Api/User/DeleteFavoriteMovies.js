import { useReducer } from "react";
import Axios from "../Axios";

const initialState = {
    isLoading: false,
    isError: null,
    isSuccess: false
};

export const userDeleteFavoriteMoviesReducer = (state, action) => {
    switch (action.type) {
      case "DELETE_FAVORITE_MOVIES_REQUEST":
        return { ...state, isLoading: true };
      case "DELETE_FAVORITE_MOVIES_SUCCESS":
        return { ...state, isLoading: false, isSuccess: true };
      case "DELETE_FAVORITE_MOVIES_FAIL":
        return { ...state, isLoading: false, isError: action.payload };
      case "DELETE_FAVORITE_MOVIES_RESET":
        return {...initialState};
      default:
        return state;
    }
};

const deleteFavoriteMoviesService = async (token) => {
    const { data } = await Axios.delete("/users/favorites", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
};

export const useUserDeleteFavoriteMoviesReducer = () => {
  return useReducer(userDeleteFavoriteMoviesReducer, initialState);
};

export { deleteFavoriteMoviesService };