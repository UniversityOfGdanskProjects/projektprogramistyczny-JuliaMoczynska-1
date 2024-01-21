import { useReducer } from "react";
import Axios from "../Axios";

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: null
};

export const createMovieReducer = (state, action) => {
    switch (action.type) {
      case "CREATE_MOVIE_REQUEST":
        return { ...state, isLoading: true };
      case "CREATE_MOVIE_SUCCESS":
        return { ...state, isLoading: false, isSuccess: true };
      case "CREATE_MOVIE_FAIL":
        return { ...state, isLoading: false, isError: action.payload };
      case "CREATE_MOVIE_RESET":
        return {...initialState};
      default:
        return state;
    }
};

export const createMovieService = async (token, movie) => {
    const { data } = await Axios.post(`/movies`, movie, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };

export const useCreateMovieReducer = () => {
    return useReducer(createMovieReducer, initialState);
};