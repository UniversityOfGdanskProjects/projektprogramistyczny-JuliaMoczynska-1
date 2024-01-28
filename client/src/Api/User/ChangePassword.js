import { useReducer } from "react";
import Axios from "../Axios";

const initialState = {
  isLoading: false,
  isError: null,
  isSuccess: false,
  message: null,
};

export const userChangePasswordReducer = (state = {}, action) => {
    switch (action.type) {
      case 'USER_CHANGE_PASSWORD_REQUEST':
        return { ...state, isLoading: true };
      case "USER_CHANGE_PASSWORD_SUCCESS":
        return {
            ...state, 
            isLoading: false,
            isSuccess: true,
            message: action.payload.message,
        };
      case "USER_CHANGE_PASSWORD_FAIL":
        return { ...state, isLoading: false, isError: action.payload };
      case "USER_CHANGE_PASSWORD_RESET":
        return initialState;
      default:
        return state;
    }
  };

const changePasswordService = async (passwords, token) => {
    const { data } = await Axios.put("/users/password", passwords, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };

export const useUserChangePasswordReducer = () => {
  return useReducer(userChangePasswordReducer, initialState);
};

export { changePasswordService };