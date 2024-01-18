import { useReducer } from "react";
import Axios from "../Axios";

const initialState = {
    isLoading: false,
    isError: null,
    isSuccess: false
};

export const userDeleteWatchlistReducer = (state, action) => {
    switch (action.type) {
      case "DELETE_WATCHLIST_REQUEST":
        return { ...state, isLoading: true };
      case "DELETE_WATCHLIST_SUCCESS":
        return { ...state, isLoading: false, isSuccess: true };
      case "DELETE_WATCHLIST_FAIL":
        return { ...state, isLoading: false, isError: action.payload };
      case "DELETE_WATCHLIST_RESET":
        return {...initialState};
      default:
        return state;
    }
};

const deleteWatchlistService = async (token) => {
    const { data } = await Axios.delete("/users/watchlist", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
};

export const useUserDeleteWatchlistReducer = () => {
  return useReducer(userDeleteWatchlistReducer, initialState);
};

export { deleteWatchlistService };