import { useReducer } from "react";
import Axios from "../Axios";

const initialState = {
  isLoading: false,
  isError: null,
  isSuccess: false
};

export const userAddToWatchlistReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_WATCHLIST_REQUEST":
        return { ...state, isLoading: true };
      case "ADD_TO_WATCHLIST_SUCCESS":
        return { ...state, isLoading: false, isSuccess: true };
      case "ADD_TO_WATCHLIST_FAIL":
        return { ...state, isLoading: false, isError: action.payload };
      case "ADD_TO_WATCHLIST_RESET":
        return {...initialState};
      default:
        return state;
    }
};

const addToWatchlistService = async (movieId, token) => {
    const { data } = await Axios.post(`/users/watchlist`, movieId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
};

export const useUserAddToWatchlistReducer = () => {
  return useReducer(userAddToWatchlistReducer, initialState);
};

export { addToWatchlistService };