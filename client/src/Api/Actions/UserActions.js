import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../../Protection";
import { getFavoriteMoviesService } from "../User/FavoriteMovies";
import { likeMovieService } from "../User/LikeMovie";
import { changePasswordService } from "../User/ChangePassword";
// import { updateProfileService } from "../User/UpdateUser";
import { deleteProfileService } from "../User/DeleteProfile";
import { logoutService } from "../User/Logout";
import { deleteFavoriteMoviesService } from "../User/DeleteFavoriteMovies";
import { getWatchlistService } from "../User/WatchlistMovies";
import { addToWatchlistService } from "../User/AddToWatchlist";
import { deleteWatchlistService } from "../User/DeleteWatchlist";
import { getIgnoredMoviesService } from "../User/IgnoredMovies";
import { ignoreMovieService } from "../User/IgnoreMovie";
import { deleteIgnoredMoviesService } from "../User/DeleteIgnoredMovies";

// change password action
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

// // update profile action
// export const updateProfileAction =  async (user, dispatch, getState) => {
//   try {
//     dispatch({ type: "USER_UPDATE_PROFILE_REQUEST" });
//     const response = await updateProfileService(
//       user,
//       tokenProtection(getState)
//     );
//     dispatch({
//       type: "USER_UPDATE_PROFILE_SUCCESS",
//       payload: response,
//     });
//     toast.success("Profile Updated");
//     dispatch({
//       type: "USER_LOGIN_SUCCESS",
//       payload: response,
//     });
//   } catch (error) {
//     ErrorsAction(error, dispatch, "USER_UPDATE_PROFILE_FAIL");
//   }
// };

// delete profile action
export const deleteProfileAction =  async (dispatch, getState) => {
  try {
    dispatch({ type: "USER_DELETE_PROFILE_REQUEST" });
    await deleteProfileService(tokenProtection(getState));
    dispatch({ type: "USER_DELETE_PROFILE_SUCCESS" });
    toast.success("Profile Deleted");
    // logoutAction();
  } catch (error) {
    ErrorsAction(error, dispatch, "USER_DELETE_PROFILE_FAIL");
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

// delete watchlist action
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


// logout action
export const logoutAction = (dispatch) => {
  logoutService();
  dispatch({ type: "USER_LOGOUT" });
  dispatch({ type: "USER_LOGIN_RESET" });
  dispatch({ type: "USER_REGISTER_RESET" });
  dispatch({ type: "DELETE_FAVORITE_MOVIES_RESET" });
  dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
  dispatch({ type: "USER_DELETE_PROFILE_RESET" });
  dispatch({ type: "USER_CHANGE_PASSWORD_RESET" });
  dispatch({ type: "GET_FAVORITE_MOVIES_RESET" });
  dispatch({ type: "GET_ALL_USERS_RESET" });
  dispatch({ type: "DELETE_USER_RESET" });
  dispatch({ type: "LIKE_MOVIE_RESET" });
  dispatch({ type: "MOVIE_DETAILS_RESET" });
  dispatch({ type: "CREATE_REVIEW_RESET" });
  dispatch({ type: "CREATE_MOVIE_RESET" });
  dispatch({ type: "RESET_CAST" });
  dispatch({ type: "UPDATE_MOVIE_RESET" });

};