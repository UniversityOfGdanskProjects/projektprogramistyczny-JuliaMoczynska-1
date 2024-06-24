import toast from "react-hot-toast";

import { addToWatchlistAction, ignoreMovieAction, likeMovieAction } from "../Api/Actions/UserActions";
import { useUserFavoriteMoviesReducer } from "../Api/User/FavoriteMovies";
import { useUserGetWatchlistReducer } from "../Api/User/WatchlistMovies";
import { useUserIgnoredMoviesReducer } from "../Api/User/IgnoredMovies";

const IfMovieLiked = (movie) => {
  const  [likedMoviesState, ] = useUserFavoriteMoviesReducer();
  const { likedMovies } = likedMoviesState
  return likedMovies?.find((likedMovie) => likedMovie?._id === movie?._id);
};

const IfAddedToWatchlist = (movie) => {
  const  [addedMoviesState, ] = useUserGetWatchlistReducer();
  const { watchList: watchlist} = addedMoviesState 
  return watchlist?.find((addedMovie) => addedMovie?._id === movie?._id);
};

const IfMovieIgnored = (movie) => {
  const [ignoredMoviesState, ] = useUserIgnoredMoviesReducer();
  const { ignoredMovies } = ignoredMoviesState;
  return ignoredMovies?.find((ignoredMovie) => ignoredMovie?._id === movie?._id);
};

const LikeMovie = (movie, likedispatch, favdispatch, keycloak) => {
  return !keycloak.authenticated
    ? toast.error("Please Login to add to favorites")
    : 
      likeMovieAction(
        {
          movieId: movie._id,
        },
        likedispatch,
        favdispatch,
        keycloak.token
      )

};

const AddToWatchList = (movie, addedToWatchlistDispatch, watchlistDispatch, keycloak) => {
  return !keycloak.authenticated
    ? toast.error("Please Login to add to watchlist")
    : 
      addToWatchlistAction(
        {
          movieId: movie._id,
        },
        addedToWatchlistDispatch,
        watchlistDispatch,
        keycloak.token
      )

};

const IgnoreMovie = (movie, ignoreMoviesDispatch, ignoredDispatch, keycloak) => {
  return !keycloak.authenticated
    ? toast.error("Please Login to ignore the movie")
    : ignoreMovieAction(
        {
          movieId: movie._id,
        },
        ignoreMoviesDispatch,
        ignoredDispatch,
        keycloak.token
      );
};


export { IfMovieLiked, LikeMovie, IfAddedToWatchlist, AddToWatchList, IgnoreMovie, IfMovieIgnored};
