// moviesActions.js

// import { getAllMoviesService } from "./Movies/AllMovies";
import { ErrorsAction } from "../Protection";
import { getMovieByIdService } from "./Movies/ByIdMovie";
import { getPopularMoviesService } from "./Movies/PopularMovies";
import { getRandomMoviesService } from "./Movies/RandomMovies";

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