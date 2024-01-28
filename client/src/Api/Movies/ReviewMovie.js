import { useReducer } from "react";
import Axios from "../Axios";

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: null
};

export const createReviewReducer = (state, action) => {
    switch (action.type) {
      case "CREATE_REVIEW_REQUEST":
        return { ...state, isLoading: true };
      case "CREATE_REVIEW_SUCCESS":
        return { ...state, isLoading: false, isSuccess: true };
      case "CREATE_REVIEW_FAIL":
        return { ...state, isLoading: false, isError: action.payload };
      case "CREATE_REVIEW_RESET":
        return initialState;
      default:
        return state;
    }
  };

export const reviewMovieService = async (token, id, review) => {
    const { data } = await Axios.post(`/movies/${id}/reviews`, review, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
};

export const useCreateReviewReducer = () => {
    return useReducer(createReviewReducer, initialState);
};
