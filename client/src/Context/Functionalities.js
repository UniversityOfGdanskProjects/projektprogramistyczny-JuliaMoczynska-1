import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "./Context";
import { likeMovieAction } from "../Api/UserActions";
import { useUserFavoriteMoviesReducer } from "../Api/User/FavoriteMovies";

// check if movie is added to favorites
const IfMovieLiked = (movie) => {
  const  [likedMoviesState, likedMoviesDispatch] = useUserFavoriteMoviesReducer();
  const {isLoading,  isError, likedMovies} = likedMoviesState
  return likedMovies?.find((likedMovie) => likedMovie?._id === movie?._id);
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

export { IfMovieLiked, LikeMovie };
