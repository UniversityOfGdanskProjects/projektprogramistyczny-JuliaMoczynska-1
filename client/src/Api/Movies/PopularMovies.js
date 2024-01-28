import { useReducer } from "react";
import Axios from "../Axios";

const initialState = {
    isLoading: false,
    isError: null,
    movies: []
};

export const popularMoviesReducer = (state, action) => {
    switch (action.type) {
      case "POPULAR_MOVIES_REQUEST":
        return { ...state, isLoading: true };
      case "POPULAR_MOVIES_SUCCESS":
        return { ...state, isLoading: false, movies: action.payload };
      case "POPULAR_MOVIES_FAIL":
        return { ...state, isLoading: false, isError: action.payload };
      default:
        return state;
    }
  };

export const getPopularMoviesService = async () => {
    const { data } = await Axios.get(`/movies/rated/top`);
    return data;
};

export const useGetPopularMovies = () => {
    return useReducer(popularMoviesReducer, initialState);
};
