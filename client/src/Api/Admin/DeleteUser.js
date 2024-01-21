import { useReducer } from "react";
import Axios from "../Axios";

const initialState = {
  isLoading: false,
  isError: null,
  isSuccess: false
};

export const adminDeleteUserReducer = (state, action) => {
    switch (action.type) {
      case "DELETE_USER_REQUEST":
        return { ...state, isLoading: true };
      case 'DELETE_USER_SUCCESS':
        return { ...state, isLoading: false, isSuccess: true };
      case "DELETE_USER_FAIL":
        return { ...state, isLoading: false, isError: action.payload };
      case "DELETE_USER_RESET":
        return {...initialState};
      default:
        return state;
    }
};

const deleteUserService = async (id, token) => {
    const { data } = await Axios.delete(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
};

export const useAdminDeleteUserReducer = () => {
  return useReducer(adminDeleteUserReducer, initialState);
};

export { deleteUserService };