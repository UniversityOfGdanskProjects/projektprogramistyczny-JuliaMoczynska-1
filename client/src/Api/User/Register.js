import { useReducer } from "react";
import Axios from "../Axios";

const initialState = {
  isLoading: false,
  isError: null,
  userInfo: null,
  isSuccess: false,
};

const registerReducer = (state, action) => {
    switch (action.type) {
      case "USER_REGISTER_REQUEST":
        return { isLoading: true };
      case 'USER_REGISTER_SUCCESS':
        return { isLoading: false, userInfo: action.payload, isSuccess: true };
      case "USER_REGISTER_FAIL":
        return { isLoading: false, isError: action.payload };
      case "USER_REGISTER_RESET":
        return {};
      default:
        return state;
    }
};


const registerService = async (user) => {
  try {
    const { res } = await Axios.post("/users", user);
    return res.data.exists;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const useRegisterReducer = () => {
  return useReducer(registerReducer, initialState);
};

export { registerService };