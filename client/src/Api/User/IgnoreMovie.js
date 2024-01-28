import { useReducer } from "react";
import Axios from "../Axios";

const initialState = {
  isLoading: false,
  isError: null,
  isSuccess: false
};

export const userIgnoreMovieReducer = (state, action) => {
    switch (action.type) {
      case "IGNORE_MOVIE_REQUEST":
        return { ...state, isLoading: true };
      case "IGNORE_MOVIE_SUCCESS":
        return { ...state, isLoading: false, isSuccess: true };
      case "IGNORE_MOVIE_FAIL":
        return { ...state, isLoading: false, isError: action.payload };
      case "IGNORE_MOVIE_RESET":
        return {...initialState};
      default:
        return state;
    }
};

const ignoreMovieService = async (movieId, token) => {
    const { data } = await Axios.post(`/users/ignore`, movieId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
};

export const useUserIgnoreMovieReducer = () => {
  return useReducer(userIgnoreMovieReducer, initialState);
};

export { ignoreMovieService };
