import { useReducer } from "react";
import Axios from "../Axios";

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: null
};

export const deleteAllMoviesReducer = (state, action) => {
    switch (action.type) {
      case "DELETE_ALL_MOVIES_REQUEST":
        return { ...state, isLoading: true };
      case "DELETE_ALL_MOVIES_SUCCESS":
        return { ...state, isLoading: false, isSuccess: true };
      case "DELETE_ALL_MOVIES_FAIL":
        return { ...state, isLoading: false, isError: action.payload };
      default:
        return state;
    }
};

export const deleteAllMoviesService = async (token) => {
    const { data } = await Axios.delete(`/movies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
};

export const useDeleteAllMoviesReducer = () => {
    return useReducer(deleteAllMoviesReducer, initialState);
};