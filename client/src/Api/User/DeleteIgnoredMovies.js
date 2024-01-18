import { useReducer } from "react";
import Axios from "../Axios";

const initialState = {
    isLoading: false,
    isError: null,
    isSuccess: false
};

export const userDeleteIgnoredMoviesReducer = (state, action) => {
    switch (action.type) {
      case "DELETE_IGNORED_MOVIES_REQUEST":
        return { ...state, isLoading: true };
      case "DELETE_IGNORED_MOVIES_SUCCESS":
        return { ...state, isLoading: false, isSuccess: true };
      case "DELETE_IGNORED_MOVIES_FAIL":
        return { ...state, isLoading: false, isError: action.payload };
      case "DELETE_IGNORED_MOVIES_RESET":
        return {...initialState};
      default:
        return state;
    }
};

const deleteIgnoredMoviesService = async (token) => {
    const { data } = await Axios.delete("/users/ignore", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
};

export const useUserDeleteIgnoredMoviesReducer = () => {
  return useReducer(userDeleteIgnoredMoviesReducer, initialState);
};

export { deleteIgnoredMoviesService };
