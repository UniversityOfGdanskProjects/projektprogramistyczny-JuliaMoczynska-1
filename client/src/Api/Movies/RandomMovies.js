import { useReducer } from "react";
import Axios from "../Axios";

export const initialStateRandomMovies = {
    isLoading: false,
    isError: null,
    movies: []
};

export const moviesRandomReducer = (state = { movies: [] }, action) => {
    switch (action.type) {
      case "MOVIES_RANDOM_REQUEST":
        return { ...state, isLoading: true };
      case "MOVIES_RANDOM_SUCCESS":
        return { ...state, isLoading: false, movies: action.payload };
      case "MOVIES_RANDOM_FAIL":
        return { ...state, isLoading: false, isError: action.payload };
      default:
        return state;
    }
  };

export const getRandomMoviesService = async () => {
    const { data } = await Axios.get(`/movies/random/all`);
    return data;
};

export const useGetRandomMovies = () => {
    return useReducer(moviesRandomReducer, initialStateRandomMovies);
};
