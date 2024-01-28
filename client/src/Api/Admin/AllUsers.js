import { useReducer } from "react";
import Axios from "../Axios";

const initialState = {
  isLoading: false,
  isError: null,
  users: []
};

export const adminGetAllUsersReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_USERS_REQUEST":
      return { ...state, isLoading: true };
    case "GET_ALL_USERS_SUCCESS":
      return { ...state, isLoading: false, users: action.payload };
    case "GET_ALL_USERS_FAIL":
      return { ...state, isLoading: false, isError: action.payload };
    case "GET_ALL_USERS_RESET":
      return {...initialState};
    default:
      return state;
  }
};

const getAllUsersService = async (token) => {
    const { data } = await Axios.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
};

export const useAdminGetAllUsersReducer = () => {
  return useReducer(adminGetAllUsersReducer, initialState);
};

export { getAllUsersService };