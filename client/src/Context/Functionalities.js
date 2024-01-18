import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "./Context";
import { addToWatchlistAction, ignoreMovieAction, likeMovieAction } from "../Api/Actions/UserActions";
import { useUserFavoriteMoviesReducer } from "../Api/User/FavoriteMovies";
import { useUserGetWatchlistReducer } from "../Api/User/WatchlistMovies";
import { useUserIgnoredMoviesReducer } from "../Api/User/IgnoredMovies";

// check if movie is added to favorites
const IfMovieLiked = (movie) => {
  const  [likedMoviesState, likedMoviesDispatch] = useUserFavoriteMoviesReducer();
  const {isLoading,  isError, likedMovies} = likedMoviesState
  return likedMovies?.find((likedMovie) => likedMovie?._id === movie?._id);
};

const IfAddedToWatchlist = (movie) => {
  const  [addedMoviesState, addedMoviesDispatch] = useUserGetWatchlistReducer();
  const {isLoading,  isError, watchlist} = addedMoviesState 
  return watchlist?.find((addedMovie) => addedMovie?._id === movie?._id);
};

const IfMovieIgnored = (movie) => {
  const [ignoredMoviesState, ignoredMoviesDispatch] = useUserIgnoredMoviesReducer();
  const { isLoading, isError, ignoredMovies } = ignoredMoviesState;
  return ignoredMovies?.find((ignoredMovie) => ignoredMovie?._id === movie?._id);
};

// like movie functionalty
const LikeMovie = (movie, likedispatch, favdispatch, userInfo) => {
  return !userInfo
    ? toast.error("Please Login to add to favorites")
    : 
      likeMovieAction(
        {
          movieId: movie._id,
        },
        likedispatch,
        favdispatch,
        userInfo
      )

};

const AddToWatchList = (movie, addedToWatchlistDispatch, watchlistDispatch, userInfo) => {
  return !userInfo
    ? toast.error("Please Login to add to watchlist")
    : 
      addToWatchlistAction(
        {
          movieId: movie._id,
        },
        addedToWatchlistDispatch,
        watchlistDispatch,
        userInfo
      )

};

const IgnoreMovie = (movie, ignoreMoviesDispatch, ignoredDispatch, userInfo) => {
  return !userInfo
    ? toast.error("Please Login to ignore the movie")
    : ignoreMovieAction(
        {
          movieId: movie._id,
        },
        ignoreMoviesDispatch,
        ignoredDispatch,
        userInfo
      );
};


export { IfMovieLiked, LikeMovie, IfAddedToWatchlist, AddToWatchList, IgnoreMovie, IfMovieIgnored};
