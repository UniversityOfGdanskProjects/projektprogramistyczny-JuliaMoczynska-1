import { useReducer } from "react";
import Axios from "../../Actions/Axios";

export const initialStateMoviesList = {
    isLoading: false,
    isError: null,
    movies: [],
    pages: 0,
    page: 0,
    totalMovies: 0,
};

const moviesListReducer = (state, action) => {
    switch (action.type) {
      case "MOVIES_LIST_REQUEST":
        return { ...state, isLoading: true };
      case "MOVIES_LIST_SUCCESS":
        return {
          ...state,
          isLoading: false,
          movies: action.payload.movies,
          pages: action.payload.pages,
          page: action.payload.page,
          totalMovies: action.payload.totalMovies,
        };
      case "MOVIES_LIST_FAIL":
        return { ...state, isLoading: false, isError: action.payload };
      default:
        return state;
    }
};

export const getAllMoviesService = async (
    category,
    time,
    language,
    rate,
    year,
    search,
    pageNumber
  ) => {
    const { data } = await Axios.get(
      `/movies?category=${category}&time=${time}&language=${language}&rate=${rate}&year=${year}&search=${search}&pageNumber=${pageNumber}`
    );
    return data;
};

export const useMoviesListReducer = () => {
    return useReducer(moviesListReducer, initialStateMoviesList);
};