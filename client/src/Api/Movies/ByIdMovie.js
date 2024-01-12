import { useReducer } from "react";
import Axios from "../Axios";

const initialState = { 
    isLoading: false,
    isError: false,
    movie: {} 
}

// GET MOVIE BY ID
export const movieDetailsReducer = (state, action) => {
    switch (action.type) {
      case "MOVIE_DETAILS_REQUEST":
        return { ...state, isLoading: true };
      case "MOVIE_DETAILS_SUCCESS":
        return { ...state, isLoading: false, movie: action.payload };
      case "MOVIE_DETAILS_FAIL":
        return { ...state, isLoading: false, isError: action.payload };
      case "MOVIE_DETAILS_RESET":
        return { ...state, movie: {} };
      default:
        return state;
    }
};

// get movie by id Function
export const getMovieByIdService = async (id) => {
    const { data } = await Axios.get(`/movies/${id}`);
    return data;
};

export const useGetMovieDetailsReducer = () => {
    return useReducer(movieDetailsReducer, initialState);
};
