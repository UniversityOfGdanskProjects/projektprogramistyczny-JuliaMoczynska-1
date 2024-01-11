import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";
import { getFavoriteMoviesService } from "./User/FavoriteMovies";
import { likeMovieService } from "./User/LikeMovie";
// import { useUserFavoriteMoviesReducer } from "./User/FavoriteMovies";

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