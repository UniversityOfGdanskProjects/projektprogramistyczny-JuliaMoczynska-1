import { useReducer } from "react";
import Axios from "../Axios";

const initialState = {
  isLoading: false,
  isError: null,
  userInfo: null,
  isSuccess: false,
};

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
      case "USER_UPDATE_PROFILE_REQUEST":
        return { ...state, isLoading: true };
      case "USER_UPDATE_PROFILE_SUCCESS":
        return { ...state, isLoading: false, userInfo: action.payload, isSuccess: true };
      case "USER_UPDATE_PROFILE_FAIL":
        return { ...state, isLoading: false, isError: action.payload };
      case "USER_UPDATE_PROFILE_RESET":
        return {};
      default:
        return state;
    }
  };

const updateProfileService = async (user, token) => {
    const { data } = await Axios.put("/users", user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
};

export const useUserUpdateProfileReducer = () => {
  return useReducer(userUpdateProfileReducer, initialState);
};

export { updateProfileService };