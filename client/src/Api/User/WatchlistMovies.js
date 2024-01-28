import { useReducer } from "react";
import Axios from "../Axios";

const initialState = {
  isLoading: false,
  isError: null,
  watchList: []
};

const userGetWatchlistReducer = (state, action) => {
    switch (action.type) {
      case "GET_WATCHLIST_REQUEST":
        return { ...state, isLoading: true };
      case "GET_WATCHLIST_SUCCESS":
        return { ...state, isLoading: false, watchList: action.payload };
      case "GET_WATCHLIST_FAIL":
        return { ...state, isLoading: false, isError: action.payload };
      case "GET_WATCHLIST_RESET":
        return {...state, isLoading: false, watchList: []};
      default:
        return state;
    }
  };

  const getWatchlistService = async (token) => {
    const { data } = await Axios.get("/users/watchlist", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };

export const useUserGetWatchlistReducer = () => {
  return useReducer(userGetWatchlistReducer, initialState);
};

export { getWatchlistService };