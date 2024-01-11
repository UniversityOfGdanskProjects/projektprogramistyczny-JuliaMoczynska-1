import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "./Context";
import { likeMovieAction } from "../Reducers/UserActions";

// check if movie is added to favorites
const IfMovieLiked = (movie) => {
  const { likedMovies } = useContext(UserContext)
  return likedMovies?.find((likedMovie) => likedMovie?._id === movie?._id);
};

// like movie functionalty
const LikeMovie = (movie, dispatch, userInfo) => {
  return !userInfo
    ? toast.error("Please Login to add to favorites")
    : 
      likeMovieAction(
        movie._id,
        dispatch,
        userInfo
      )

};

export { IfMovieLiked, LikeMovie };
