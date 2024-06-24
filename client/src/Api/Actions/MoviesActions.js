import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../../Protection";
import { getMovieByIdService } from "../Movies/ByIdMovie";
import { getPopularMoviesService } from "../Movies/PopularMovies";
import { getRandomMoviesService } from "../Movies/RandomMovies";
import { reviewMovieService } from "../Movies/ReviewMovie";
import { deleteMovieService } from "../Movies/DeleteMovie";
import { deleteAllMoviesService } from "../Movies/DeleteAllMovies";
import { createMovieService } from "../Movies/CreateMovie";
import { updateMovieService } from "../Movies/UpdateMovie";


export const getPopularAction = async (dispatch) => {
  try {
    dispatch({ type: "POPULAR_MOVIES_REQUEST" });
    const response = await getPopularMoviesService();
    dispatch({
      type: "POPULAR_MOVIES_SUCCESS",
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, "POPULAR_MOVIES_FAIL");
  }
};

export const getRandomAction =  async (dispatch) => {
  try {
    dispatch({ type: "MOVIES_RANDOM_REQUEST" });
    const response = await getRandomMoviesService();
    dispatch({
      type: "MOVIES_RANDOM_SUCCESS",
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, "MOVIES_RANDOM_FAIL");
  }
}

export const getMovieByIdAction = async (id, dispatch) => {
  try {
    dispatch({ type: "MOVIE_DETAILS_REQUEST" });
    const response = await getMovieByIdService(id);
    dispatch({
      type: "MOVIE_DETAILS_SUCCESS",
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, "MOVIE_DETAILS_FAIL");
  }
};

export const reviewMovieAction = async ({ id, review }, dispatch, byIdMovieDispatch, keycloak) => {
    try {
      dispatch({ type: "CREATE_REVIEW_REQUEST" });
      const response = await reviewMovieService(
        tokenProtection(keycloak),
        id,
        review
      );
      dispatch({
        type: "CREATE_REVIEW_SUCCESS",
        payload: response,
      });
      toast.success("Review added successfully");
      dispatch({ type: "CREATE_REVIEW_RESET" });
      getMovieByIdAction(id, byIdMovieDispatch);
    } catch (error) {
      ErrorsAction(error, dispatch, "CREATE_REVIEW_FAIL");
    }
};

export const deleteMovieAction = async (id, dispatch, keycloak, navigate) => {
  try {
    dispatch({ type: "DELETE_MOVIE_REQUEST" });
    const response = await deleteMovieService(
      tokenProtection(keycloak),
      id
    );
    dispatch({
      type: "DELETE_MOVIE_SUCCESS",
      payload: response,
    });
    toast.success("Movie deleted successfully");
    navigate("/")
  } catch (error) {
    ErrorsAction(error, dispatch, "DELETE_MOVIE_FAIL");
  }
};

export const deleteAllMoviesAction =  async (dispatch, keycloak) => {
  try {
    dispatch({ type: "DELETE_ALL_MOVIES_REQUEST" });
    const response = await deleteAllMoviesService(
      tokenProtection(keycloak)
    );
    dispatch({
      type: "DELETE_ALL_MOVIES_SUCCESS",
      payload: response,
    });
    toast.success("All movies deleted successfully");
    window.location.reload();
  } catch (error) {
    ErrorsAction(error, dispatch, "DELETE_ALL_MOVIES_FAIL");
  }
};

export const createMovieAction = async (movie, dispatch, keycloak) => {
  try {
    dispatch({ type: "CREATE_MOVIE_REQUEST" });
    const response = await createMovieService(
      tokenProtection(keycloak),
      movie
    );
    dispatch({
      type: "CREATE_MOVIE_SUCCESS",
      payload: response,
    });
    toast.success("Movie created successfully");
  } catch (error) {
    ErrorsAction(error, dispatch, "CREATE_MOVIE_FAIL");
  }
};

export const updateMovieAction = async (id, movie, dispatch, moviebyiddispatch, keycloak) => {
  try {
    dispatch({ type: "UPDATE_MOVIE_REQUEST" });
    const response = await updateMovieService(
      tokenProtection(keycloak),
      id,
      movie
    );
    dispatch({
      type: "UPDATE_MOVIE_SUCCESS",
      payload: response,
    });
    toast.success("Movie updated successfully");
    getMovieByIdAction(id, moviebyiddispatch);
  } catch (error) {
    ErrorsAction(error, dispatch, "UPDATE_MOVIE_FAIL");
  }
};

