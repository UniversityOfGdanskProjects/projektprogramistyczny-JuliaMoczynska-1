import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../../Protection";
import { getFavoriteMoviesService } from "../User/FavoriteMovies";
import { likeMovieService } from "../User/LikeMovie";
import { changePasswordService } from "../User/ChangePassword";
import { logoutService } from "../User/Logout";
import { deleteFavoriteMoviesService } from "../User/DeleteFavoriteMovies";
import { getWatchlistService } from "../User/WatchlistMovies";
import { addToWatchlistService } from "../User/AddToWatchlist";
import { deleteWatchlistService } from "../User/DeleteWatchlist";
import { getIgnoredMoviesService } from "../User/IgnoredMovies";
import { ignoreMovieService } from "../User/IgnoreMovie";
import { deleteIgnoredMoviesService } from "../User/DeleteIgnoredMovies";
import { getAllUsersService } from "../Admin/AllUsers";
import { deleteUserService } from "../Admin/DeleteUser";
import { updateProfileService } from "../User/UpdateUser";

export const changePasswordAction = async (passwords, dispatch, keycloak) => {
  try {
    dispatch({ type: 'USER_CHANGE_PASSWORD_REQUEST' });
    const response = await changePasswordService(
      passwords,
      tokenProtection(keycloak)
    );
    dispatch({
      type: 'USER_CHANGE_PASSWORD_SUCCESS',
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, 'USER_CHANGE_PASSWORD_FAIL');
  }
};


export const updateProfileAction =  async (user, dispatch, getState, setUser, keycloak) => {
  try {
    dispatch({ type: "USER_UPDATE_PROFILE_REQUEST" });
    const response = await updateProfileService(
      user,
      tokenProtection(keycloak)
    );
    dispatch({
      type: "USER_UPDATE_PROFILE_SUCCESS",
      payload: response,
    });
    toast.success("Profile Updated");
    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: response,
    });
    setUser({...getState, fullName: user.fullName, image: user.image})
  } catch (error) {
    ErrorsAction(error, dispatch, "USER_UPDATE_PROFILE_FAIL");
  }
};

export const getFavoriteMoviesAction = async (dispatch, keycloak) => {
  try {
    dispatch({ type: "GET_FAVORITE_MOVIES_REQUEST" });
    const response = await getFavoriteMoviesService(tokenProtection(keycloak));
    dispatch({
      type: "GET_FAVORITE_MOVIES_SUCCESS",
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, "GET_FAVORITE_MOVIES_FAIL");
  }
};

export const likeMovieAction = async (movieId, likedispatch, favdispatch, keycloak) => {
  try {
    likedispatch({ type: "LIKE_MOVIE_REQUEST" });
    const response = await likeMovieService(
      movieId,
      tokenProtection(keycloak)
    );
    likedispatch({
      type: "LIKE_MOVIE_SUCCESS",
      payload: response,
    });
    toast.success("Added to your favorites");
    getFavoriteMoviesAction(favdispatch,keycloak);
  } catch (error) {
    ErrorsAction(error, likedispatch, "LIKE_MOVIE_FAIL");
  }
};

// delete all favorite movies action
export const deleteFavoriteMoviesAction =  async (dispatch, favdispatch, keycloak) => {
  try {
    dispatch({ type: "DELETE_FAVORITE_MOVIES_REQUEST" });
    await deleteFavoriteMoviesService(tokenProtection(keycloak));
    dispatch({
      type: "DELETE_FAVORITE_MOVIES_SUCCESS",
    });
    toast.success("Favorite Movies Deleted");
    getFavoriteMoviesAction(favdispatch, keycloak);
  } catch (error) {
    ErrorsAction(error, dispatch, "DELETE_FAVORITE_MOVIES_FAIL");
  }
};

export const getWachlistAction = async (dispatch, keycloak) => {
  try {
    dispatch({ type: "GET_WATCHLIST_REQUEST" });
    const response = await getWatchlistService(tokenProtection(keycloak));
    dispatch({
      type: "GET_WATCHLIST_SUCCESS",
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, "GET_WATCHLIST_FAIL");
  }
};

export const addToWatchlistAction = async (movieId, addedispatch, watchlistdispatch, keycloak) => {
  try {
    addedispatch({ type: "ADD_TO_WATCHLIST_REQUEST" });
    const response = await addToWatchlistService(
      movieId,
      tokenProtection(keycloak)
    );
    addedispatch({
      type: "ADD_TO_WATCHLIST_SUCCESS",
      payload: response,
    });
    toast.success("Added to your watchlist");
    getWachlistAction(watchlistdispatch, keycloak);
  } catch (error) {
    ErrorsAction(error, addedispatch, "ADD_TO_WATCHLIST_FAIL");
  }
};

export const deleteWatchlistAction =  async (dispatch, watchlistdispatch, keycloak) => {
  try {
    dispatch({ type: "DELETE_WATCHLIST_REQUEST" });
    await deleteWatchlistService(tokenProtection(keycloak));
    dispatch({
      type: "DELETE_WATCHLIST_SUCCESS",
    });
    toast.success("WatchList Deleted");
    getWachlistAction(watchlistdispatch, keycloak);
  } catch (error) {
    ErrorsAction(error, dispatch, "DELETE_WATCHLIST_FAIL");
  }
};

export const getIgnoredMoviesAction = async (dispatch, keycloak) => {
  try {
    dispatch({ type: "GET_IGNORED_MOVIES_REQUEST" });
    const response = await getIgnoredMoviesService(tokenProtection(keycloak));
    dispatch({
      type: "GET_IGNORED_MOVIES_SUCCESS",
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, "GET_IGNORED_MOVIES_FAIL");
  }
};

export const ignoreMovieAction = async (movieId, ignoredispatch, ignoreddispatch, keycloak) => {
  try {
    ignoredispatch({ type: "IGNORE_MOVIE_REQUEST" });
    const response = await ignoreMovieService(
      movieId,
      tokenProtection(keycloak)
    );
    ignoredispatch({
      type: "IGNORE_MOVIE_SUCCESS",
      payload: response,
    });
    toast.success("Added to your ignored movies!");
    getIgnoredMoviesAction(ignoreddispatch, keycloak);
  } catch (error) {
    ErrorsAction(error, ignoredispatch, "IGNORE_MOVIE_FAIL");
  }
};

export const deleteIgnoredMoviesAction = async (dispatch, ignoredDispatch, keycloak) => {
  try {
    dispatch({ type: "DELETE_IGNORED_MOVIES_REQUEST" });
    await deleteIgnoredMoviesService(tokenProtection(keycloak));
    dispatch({
      type: "DELETE_IGNORED_MOVIES_SUCCESS",
    });
    toast.success("Ignored Movies Deleted");
    getIgnoredMoviesAction(ignoredDispatch, keycloak);
  } catch (error) {
    ErrorsAction(error, dispatch, "DELETE_IGNORED_MOVIES_FAIL");
  }
};

export const getAllUsersAction = async (dispatch, keycloak) => {
  try {
    dispatch({ type: "GET_ALL_USERS_REQUEST" });
    const response = await getAllUsersService(
      tokenProtection(keycloak)
    );
    dispatch({
      type: "GET_ALL_USERS_SUCCESS",
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, "GET_ALL_USERS_FAIL");
  }
};

export const deleteUserAction = async (id, dispatch, keycloak) => {
  try {
    dispatch({ type: "DELETE_USER_REQUEST" });
    await deleteUserService(id, tokenProtection(keycloak));
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
  userFavoriteMoviesDispatch, 
  userDeleteFavoriteMoviesDispatch,
  userLikeMovieDispatch,
  userIgnoredMoviesDispatch, 
  userDeleteIgnoredMoviesDispatch,
  userIgnoreMovieDispatch,
  userWatchlistDispatch,
  userDeleteWatchlistDispatch,
  userAddToWatchlistDispatch,
  userUpdateProfileDispatch,
  userChangePasswordDispatch,
  adminGetAllUsersDispatch,
  adminDeleteUserDispatch,
  getMovieDetailsDispatch,
  createReviewDispatch,
  createMovieDispatch,
  updateMovieDispatch,
  keycloak
) => {
  logoutService(setUserInfo, keycloak);
  loginDispatch({ type: "USER_LOGOUT" });
  loginDispatch({ type: "USER_LOGIN_RESET" });
  registerDispatch({ type: "USER_REGISTER_RESET" });

  userFavoriteMoviesDispatch({ type: "GET_FAVORITE_MOVIES_RESET" });
  userDeleteFavoriteMoviesDispatch({ type: "DELETE_FAVORITE_MOVIES_RESET" });
  userLikeMovieDispatch({ type: "LIKE_MOVIE_RESET" });

  userIgnoredMoviesDispatch({ type: "DELETE_IGNORED_MOVIES_RESET" });
  userDeleteIgnoredMoviesDispatch({ type: "DELETE_IGNORED_MOVIES_RESET" });
  userIgnoreMovieDispatch({ type: "IGNORE_MOVIE_RESET" });

  userWatchlistDispatch({ type: "ADD_TO_WATCHLIST_RESET" });
  userDeleteWatchlistDispatch({ type: "DELETE_WATCHLIST_RESET" });
  userAddToWatchlistDispatch({ type: "IGNORE_MOVIE_RESET" });

  userUpdateProfileDispatch({ type: "USER_UPDATE_PROFILE_RESET" });
  userChangePasswordDispatch({ type: "USER_CHANGE_PASSWORD_RESET" });
  adminGetAllUsersDispatch({ type: "GET_ALL_USERS_RESET" });
  adminDeleteUserDispatch({ type: "DELETE_USER_RESET" });
  getMovieDetailsDispatch({ type: "MOVIE_DETAILS_RESET" });
  createReviewDispatch({ type: "CREATE_REVIEW_RESET" });
  createMovieDispatch({ type: "CREATE_MOVIE_RESET" });
  updateMovieDispatch({ type: "UPDATE_MOVIE_RESET" });

};