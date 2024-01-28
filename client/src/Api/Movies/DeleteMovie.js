import { useReducer } from "react";
import Axios from "../Axios";

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: null
};

export const deleteMovieReducer = (state, action) => {
    switch (action.type) {
      case "DELETE_MOVIE_REQUEST":
        return { ...state, isLoading: true };
      case "DELETE_MOVIE_SUCCESS":
        return { ...state, isLoading: false, isSuccess: true };
      case "DELETE_MOVIE_FAIL":
        return { ...state, isLoading: false, isError: action.payload };
      default:
        return state;
    }
  };

export const deleteMovieService = async (token, id) => {
    const { data } = await Axios.delete(`/movies/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
};

export const useDeleteMovieReducer = () => {
    return useReducer(deleteMovieReducer, initialState);
};