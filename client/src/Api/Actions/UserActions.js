import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../../Protection";
import { logoutService } from "../User/Logout";
import { getAllUsersService } from "../Admin/AllUsers";
import { deleteUserService } from "../Admin/DeleteUser";

export const getAllUsersAction = async (dispatch, getState, keycloak, token) => {
  if (tokenProtection(getState, keycloak)){
    try {
      dispatch({ type: "GET_ALL_USERS_REQUEST" });
      const response = await getAllUsersService(
        token
      );
      dispatch({
        type: "GET_ALL_USERS_SUCCESS",
        payload: response,
      });
    } catch (error) {
      ErrorsAction(error, dispatch, "GET_ALL_USERS_FAIL");
    }
  }
  
};

export const deleteUserAction = async (id, dispatch, getState, keycloak) => {
  try {
    dispatch({ type: "DELETE_USER_REQUEST" });
    await deleteUserService(id, tokenProtection(getState, keycloak));
    dispatch({
      type: "DELETE_USER_SUCCESS",
    });
    toast.success("User Deleted");
  } catch (error) {
    ErrorsAction(error, dispatch, "DELETE_USER_FAIL");
  }
};


export const logoutAction = (
  setUserInfo,
  loginDispatch,
  registerDispatch,
  adminGetAllUsersDispatch,
  adminDeleteUserDispatch,
  getMovieDetailsDispatch,
  createReviewDispatch,
  createMovieDispatch,
  updateMovieDispatch,
  keycloak
) => {
  logoutService(setUserInfo);
  loginDispatch({ type: "USER_LOGOUT" });
  loginDispatch({ type: "USER_LOGIN_RESET" });
  registerDispatch({ type: "USER_REGISTER_RESET" });

  adminGetAllUsersDispatch({ type: "GET_ALL_USERS_RESET" });
  adminDeleteUserDispatch({ type: "DELETE_USER_RESET" });
  getMovieDetailsDispatch({ type: "MOVIE_DETAILS_RESET" });
  createReviewDispatch({ type: "CREATE_REVIEW_RESET" });
  createMovieDispatch({ type: "CREATE_MOVIE_RESET" });
  updateMovieDispatch({ type: "UPDATE_MOVIE_RESET" });
  keycloak.logout();
};