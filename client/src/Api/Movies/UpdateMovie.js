import { useReducer } from "react";
import Axios from "../Axios";

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: null
};

export const updateMovieReducer = (state = {}, action) => {
    switch (action.type) {
      case "UPDATE_MOVIE_REQUEST":
        return { ...state, isLoading: true };
      case "UPDATE_MOVIE_SUCCESS":
        return { ...state, isLoading: false, isSuccess: true };
      case "UPDATE_MOVIE_FAIL":
        return { ...state, isLoading: false, isError: action.payload };
      case "UPDATE_MOVIE_RESET":
        return {...initialState};
      default:
        return state;
    }
  };

export const updateMovieService = async (token, id, movie) => {
    const { data } = await Axios.put(`/movies/${id}`, movie, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
};

export const useUpdateMovieReducer = () => {
    return useReducer(updateMovieReducer, initialState);
};