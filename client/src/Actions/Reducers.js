import { useReducer } from "react";
// import { CategoriesData } from "../Data/CategoriesData";

export const initialStateLogiAnsRegister = {
  isLoading: false,
  isError: null,
  userInfo: null,
  isSuccess: false,
};

export const initialStateMoviesList = {
  isLoading: false,
  isError: null,
  movies: undefined,
  pages: 0,
  page: 0,
  totalMovies: 0,
};

// export const initialStateCategories = {
//   isLoading: false,
//   isError: null,
//   categories: undefined
// };

// const loginReducer = (state, action) => {
//   switch (action.type) {
//     case "USER_LOGIN_REQUEST":
//       return { ...state, isLoading: true };
//     case "USER_LOGIN_SUCCESS":
//       return { ...state, isLoading: false, userInfo: action.payload, isSuccess: true };
//     case "USER_LOGIN_FAIL":
//       return { ...state, isLoading: false, isError: action.payload };
//     case "USER_LOGIN_RESET":
//       return initialStateLogiAnsRegister;
//     case "USER_LOGOUT":
//       return initialStateLogiAnsRegister;
//     default:
//       return state;
//   }
// };

// const registerReducer = (state, action) => {
//   switch (action.type) {
//     case "USER_REGISTER_REQUEST":
//       return { ...state, isLoading: true };
//     case "USER_REGISTER_SUCCESS":
//       return { ...state, isLoading: false, userInfo: action.payload, isSuccess: true };
//     case "USER_REGISTER_FAIL":
//       return { ...state, isLoading: false, isError: action.payload };
//     case "USER_REGISTER_RESET":
//       return initialStateLogiAnsRegister;
//     default:
//       return state;
//   }
// };

const moviesListReducer = (state, action) => {
  switch (action.type) {
    case "MOVIES_LIST_REQUEST":
      return { ...state, isLoading: true };
    case "MOVIES_LIST_SUCCESS":
      return {
        ...state,
        isLoading: false,
        movies: action.payload.movies,
        pages: action.payload.pages,
        page: action.payload.page,
        totalMovies: action.payload.totalMovies,
      };
    case "MOVIES_LIST_FAIL":
      return { ...state, isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// export const getAllCategoriesReducer = (state, action) => {
//   switch (action.type) {
//     case "GET_ALL_CATEGORIES_REQUEST":
//       return { ...state, isLoading: true };
//     case "GET_ALL_CATEGORIES_SUCCESS":
//       return { ...state, isLoading: false, categories: action.payload };
//     case "GET_ALL_CATEGORIES_FAIL":
//       return { ...state, isLoading: false, isError: action.payload };
//     default:
//       return state;
//   }
// };

// Hook for login reducer
// export const useLoginReducer = () => {
//   return useReducer(loginReducer, initialStateLogiAnsRegister);
// };

// Hook for register reducer
// export const useRegisterReducer = () => {
//   return useReducer(registerReducer, initialStateLogiAnsRegister);
// };

export const useMoviesListReducer = () => {
  return useReducer(moviesListReducer, initialStateMoviesList);
};

// export const useGetAllCategoriesReducer = () => {
//   return useReducer(getAllCategoriesReducer, initialStateCategories);
// };