import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/Context";
import { useUserLikeMovieReducer } from "../Api/User/LikeMovie";
import { FaHeart } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
import { LikeMovie, IfMovieLiked } from "../Context/Functionalities";
import { useUserFavoriteMoviesReducer } from "../Api/User/FavoriteMovies";

function Movie({ movie }) {
  const [ likedMoviesState, likedMoviesDispatch ] = useUserLikeMovieReducer();
  const  [favMoviesState, favMoviesDispatch] = useUserFavoriteMoviesReducer();

  const { isLoading,  isError, isSuccess } = likedMoviesState
  const { userInfo } = useContext(UserContext)

  // if liked function
  const isLiked = IfMovieLiked(movie);
  return (
    <>
      <div className="border border-border p-1 hover:scale-95 transitions relative rounded overflow-hidden">
        <Link to={`/movie/${movie?._id}`} className="w-full">
          <img
            src={movie?.image ? movie?.image : "/images/user.png"}
            alt={movie?.name}
            className="w-full h-64 object-cover"
          />
        </Link>
        <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
          <h3 className="font-semibold truncate">{movie?.name}</h3>
          <button
            onClick={() => LikeMovie(movie, likedMoviesDispatch, favMoviesDispatch, userInfo)}
            disabled={isLiked || isLoading}
            className={`h-9 w-9 text-sm flex-colo transitions
            hover:bg-subMain border-2 border-subMain rounded-md  text-white`}
          >
            <FaHeart />
          </button>
        </div>
      </div>
    </>
  );
}

export default Movie;
