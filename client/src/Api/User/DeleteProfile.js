import { useReducer } from "react";
import Axios from "../Axios";

const initialState = {
  isLoading: false,
  isError: null,
  isSuccess: false
};

export const userDeleteProfileReducer = (state, action) => {
    switch (action.type) {
      case "USER_DELETE_PROFILE_REQUEST":
        return { ...state, isLoading: true };
      case "USER_DELETE_PROFILE_SUCCESS":
        return { ...state, isLoading: false, isSuccess: true };
      case "USER_DELETE_PROFILE_FAIL":
        return { ...state, isLoading: false, isError: action.payload };
      case "USER_DELETE_PROFILE_RESET":
        return {initialState};
      default:
        return state;
    }
};

const deleteProfileService = async (token) => {
    const { data } = await Axios.delete("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      localStorage.removeItem("userInfo");
    }
    return data;
};

export const useUserDeleteProfileReducer = () => {
  return useReducer(userDeleteProfileReducer, initialState);
};

export { deleteProfileService };