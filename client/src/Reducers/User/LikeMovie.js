import { useReducer } from "react";
import Axios from "../../Actions/Axios";

const initialState = {
  isLoading: false,
  isError: null,
  isSuccess: false
};

export const userLikeMovieReducer = (state, action) => {
    switch (action.type) {
      case "LIKE_MOVIE_REQUEST":
        return { ...state, isLoading: true };
      case "LIKE_MOVIE_SUCCESS":
        return { ...state, isLoading: false, isSuccess: true };
      case "LIKE_MOVIE_FAIL":
        return { ...state, isLoading: false, isError: action.payload };
      case "LIKE_MOVIE_RESET":
        return {};
      default:
        return state;
    }
};

const likeMovieService = async (movieId, token) => {
    const { data } = await Axios.post(`/users/favorites`, movieId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
};

export const useUserLikeMovieReducer = () => {
  return useReducer(userLikeMovieReducer, initialState);
};

export { likeMovieService };