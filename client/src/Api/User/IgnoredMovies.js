import { useReducer } from "react";
import Axios from "../Axios";

const initialState = {
  isLoading: false,
  isError: null,
  ignoredMovies: []
};

const userGetIgnoredMoviesReducer = (state, action) => {
  switch (action.type) {
    case "GET_IGNORED_MOVIES_REQUEST":
      return { ...state, isLoading: true };
    case "GET_IGNORED_MOVIES_SUCCESS":
      return { ...state, isLoading: false, ignoredMovies: action.payload };
    case "GET_IGNORED_MOVIES_FAIL":
      return { ...state, isLoading: false, isError: action.payload };
    case "GET_IGNORED_MOVIES_RESET":
      return { ...state, isLoading: false, ignoredMovies: [] };
    default:
      return state;
  }
};

const getIgnoredMoviesService = async (token) => {
  const { data } = await Axios.get("/users/ignore", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useUserIgnoredMoviesReducer = () => {
  return useReducer(userGetIgnoredMoviesReducer, initialState);
};

export { getIgnoredMoviesService };
