import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";
import { getFavoriteMoviesService } from "./User/FavoriteMovies";
import { likeMovieService } from "./User/LikeMovie";


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

export const likeMovieAction = async (movieId, dispatch, getState) => {
    try {
      dispatch({ type: "LIKE_MOVIE_REQUEST" });
      const response = await likeMovieService(
        movieId,
        tokenProtection(getState)
      );
      dispatch({
        type: "LIKE_MOVIE_SUCCESS",
        payload: response,
      });
      toast.success("Added to your favorites");
      getFavoriteMoviesAction();
    } catch (error) {
      ErrorsAction(error, dispatch, "LIKE_MOVIE_FAIL");
    }
};