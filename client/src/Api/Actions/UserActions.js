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

export const changePasswordAction = async (passwords, dispatch, getState) => {
  try {
    dispatch({ type: 'USER_CHANGE_PASSWORD_REQUEST' });
    const response = await changePasswordService(
      passwords,
      tokenProtection(getState)
    );
    dispatch({
      type: 'USER_CHANGE_PASSWORD_SUCCESS',
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, 'USER_CHANGE_PASSWORD_FAIL');
  }
};


export const updateProfileAction =  async (user, dispatch, getState, setUser) => {
  try {
    dispatch({ type: "USER_UPDATE_PROFILE_REQUEST" });
    const response = await updateProfileService(
      user,
      tokenProtection(getState)
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

export const getFavoriteMoviesAction = async (dispatch, getState) => {
  try {
    dispatch({ type: "GET_FAVORITE_MOVIES_REQUEST" });
    const response = await getFavoriteMoviesService(tokenProtection(getState));
    dispatch({
      type: "GET_FAVORITE_MOVIES_SUCCESS",
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, "GET_FAVORITE_MOVIES_FAIL");
  }
};

export const likeMovieAction = async (movieId, likedispatch, favdispatch, getState) => {
  try {
    likedispatch({ type: "LIKE_MOVIE_REQUEST" });
    const response = await likeMovieService(
      movieId,
      tokenProtection(getState)
    );
    likedispatch({
      type: "LIKE_MOVIE_SUCCESS",
      payload: response,
    });
    toast.success("Added to your favorites");
    getFavoriteMoviesAction(favdispatch,getState);
  } catch (error) {
    ErrorsAction(error, likedispatch, "LIKE_MOVIE_FAIL");
  }
};

// delete all favorite movies action
export const deleteFavoriteMoviesAction =  async (dispatch, favdispatch, getState) => {
  try {
    dispatch({ type: "DELETE_FAVORITE_MOVIES_REQUEST" });
    await deleteFavoriteMoviesService(tokenProtection(getState));
    dispatch({
      type: "DELETE_FAVORITE_MOVIES_SUCCESS",
    });
    toast.success("Favorite Movies Deleted");
    getFavoriteMoviesAction(favdispatch, getState);
  } catch (error) {
    ErrorsAction(error, dispatch, "DELETE_FAVORITE_MOVIES_FAIL");
  }
};

export const getWachlistAction = async (dispatch, getState) => {
  try {
    dispatch({ type: "GET_WATCHLIST_REQUEST" });
    const response = await getWatchlistService(tokenProtection(getState));
    dispatch({
      type: "GET_WATCHLIST_SUCCESS",
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, "GET_WATCHLIST_FAIL");
  }
};

export const addToWatchlistAction = async (movieId, addedispatch, watchlistdispatch, getState) => {
  try {
    addedispatch({ type: "ADD_TO_WATCHLIST_REQUEST" });
    const response = await addToWatchlistService(
      movieId,
      tokenProtection(getState)
    );
    addedispatch({
      type: "ADD_TO_WATCHLIST_SUCCESS",
      payload: response,
    });
    toast.success("Added to your watchlist");
    getWachlistAction(watchlistdispatch, getState);
  } catch (error) {
    ErrorsAction(error, addedispatch, "ADD_TO_WATCHLIST_FAIL");
  }
};

export const deleteWatchlistAction =  async (dispatch, watchlistdispatch, getState) => {
  try {
    dispatch({ type: "DELETE_WATCHLIST_REQUEST" });
    await deleteWatchlistService(tokenProtection(getState));
    dispatch({
      type: "DELETE_WATCHLIST_SUCCESS",
    });
    toast.success("WatchList Deleted");
    getWachlistAction(watchlistdispatch, getState);
  } catch (error) {
    ErrorsAction(error, dispatch, "DELETE_WATCHLIST_FAIL");
  }
};

export const getIgnoredMoviesAction = async (dispatch, getState) => {
  try {
    dispatch({ type: "GET_IGNORED_MOVIES_REQUEST" });
    const response = await getIgnoredMoviesService(tokenProtection(getState));
    dispatch({
      type: "GET_IGNORED_MOVIES_SUCCESS",
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, "GET_IGNORED_MOVIES_FAIL");
  }
};

export const ignoreMovieAction = async (movieId, ignoredispatch, ignoreddispatch, getState) => {
  try {
    ignoredispatch({ type: "IGNORE_MOVIE_REQUEST" });
    const response = await ignoreMovieService(
      movieId,
      tokenProtection(getState)
    );
    ignoredispatch({
      type: "IGNORE_MOVIE_SUCCESS",
      payload: response,
    });
    toast.success("Added to your ignored movies!");
    getIgnoredMoviesAction(ignoreddispatch, getState);
  } catch (error) {
    ErrorsAction(error, ignoredispatch, "IGNORE_MOVIE_FAIL");
  }
};

export const deleteIgnoredMoviesAction = async (dispatch, ignoredDispatch, getState) => {
  try {
    dispatch({ type: "DELETE_IGNORED_MOVIES_REQUEST" });
    await deleteIgnoredMoviesService(tokenProtection(getState));
    dispatch({
      type: "DELETE_IGNORED_MOVIES_SUCCESS",
    });
    toast.success("Ignored Movies Deleted");
    getIgnoredMoviesAction(ignoredDispatch, getState);
  } catch (error) {
    ErrorsAction(error, dispatch, "DELETE_IGNORED_MOVIES_FAIL");
  }
};

export const getAllUsersAction = async (dispatch, getState) => {
  try {
    dispatch({ type: "GET_ALL_USERS_REQUEST" });
    const response = await getAllUsersService(
      tokenProtection(getState)
    );
    dispatch({
      type: "GET_ALL_USERS_SUCCESS",
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, "GET_ALL_USERS_FAIL");
  }
};

export const deleteUserAction = async (id, dispatch, getState) => {
  try {
    dispatch({ type: "DELETE_USER_REQUEST" });
    await deleteUserService(id, tokenProtection(getState));
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
  updateMovieDispatch
) => {
  logoutService(setUserInfo);
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