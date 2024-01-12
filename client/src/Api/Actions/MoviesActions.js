// moviesActions.js

// import { getAllMoviesService } from "./Movies/AllMovies";
import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../../Protection";
import { getMovieByIdService } from "../Movies/ByIdMovie";
import { getPopularMoviesService } from "../Movies/PopularMovies";
import { getRandomMoviesService } from "../Movies/RandomMovies";
import { reviewMovieService } from "../Movies/ReviewMovie";
import { deleteMovieService } from "../Movies/DeleteMovie";
import { deleteAllMoviesService } from "../Movies/DeleteAllMovies";


// export const getAllMoviesAction = async (
//     category,
//     time,
//     language,
//     rate,
//     year,
//     search,
//     pageNumber,
//     dispatch
//   ) => {
//     try {
//       dispatch({ type: "MOVIES_LIST_REQUEST" });
//       const response = await getAllMoviesService(
//         category,
//         time,
//         language,
//         rate,
//         year,
//         search,
//         pageNumber
//       );
//       dispatch({
//         type: "MOVIES_LIST_SUCCESS",
//         payload: response,
//       });
//     } catch (error) {
//       ErrorsAction(error, dispatch, "MOVIES_LIST_FAIL");
//     }
// };

// get popular movies action
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

// get random movies action
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

// get movie by id action
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

// review movie action
export const reviewMovieAction = async ({ id, review }, dispatch, byIdMovieDispatch, getState) => {
    try {
      dispatch({ type: "CREATE_REVIEW_REQUEST" });
      const response = await reviewMovieService(
        tokenProtection(getState),
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

// delete movie action
export const deleteMovieAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "DELETE_MOVIE_REQUEST" });
    const response = await deleteMovieService(
      tokenProtection(getState),
      id
    );
    dispatch({
      type: "DELETE_MOVIE_SUCCESS",
      payload: response,
    });
    toast.success("Movie deleted successfully");
    window.location.reload();
  } catch (error) {
    ErrorsAction(error, dispatch, "DELETE_MOVIE_FAIL");
  }
};

// delete all movies action
export const deleteAllMoviesAction =  async (dispatch, getState) => {
  try {
    dispatch({ type: "DELETE_ALL_MOVIES_REQUEST" });
    const response = await deleteAllMoviesService(
      tokenProtection(getState)
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

