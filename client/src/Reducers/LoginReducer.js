import { useReducer } from "react";
import Axios from "./Axios";

const initialState = {
  isLoading: false,
  isError: null,
  userInfo: null,
  isSuccess: false,
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { ...state, isLoading: true };
    case "USER_LOGIN_SUCCESS":
      return { ...state, isLoading: false, userInfo: action.payload, isSuccess: true };
    case "USER_LOGIN_FAIL":
      return { ...state, isLoading: false, isError: action.payload };
    case "USER_LOGIN_RESET":
      return initialState;
    case "USER_LOGOUT":
      return initialState;
    default:
      return state;
  }
};

const loginService = async (user) => {
  try {
    const { data } = await Axios.post("/users/login", user);
    if (data) {
      localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const useLoginReducer = () => {
  return useReducer(loginReducer, initialState);
};

export { loginService };
