import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/Context";
import { useUserLikeMovieReducer } from "../Api/User/LikeMovie";
import { FaHeart } from "react-icons/fa";
import { LikeMovie, AddToWatchList,  IfMovieLiked, IfAddedToWatchlist, IfMovieIgnored, IgnoreMovie } from "../Context/Functionalities";
import { useUserFavoriteMoviesReducer } from "../Api/User/FavoriteMovies";
import { MdAdd } from "react-icons/md";
import { useUserAddToWatchlistReducer } from "../Api/User/AddToWatchlist";
import { useUserGetWatchlistReducer } from "../Api/User/WatchlistMovies";
import { AiFillDelete } from "react-icons/ai";
import { useUserIgnoreMovieReducer } from "../Api/User/IgnoreMovie";
import { useUserIgnoredMoviesReducer } from "../Api/User/IgnoredMovies";

function Movie({ movie }) {

  const { userInfo } = useContext(UserContext)

  //like movie
  const [ likeMoviesState, likeMoviesDispatch ] = useUserLikeMovieReducer();
  const  [, favMoviesDispatch] = useUserFavoriteMoviesReducer();
  const { isLoading } = likeMoviesState

  //watchlist
  const [ addToWatchlistState, addToWatchlistDispatch ] = useUserAddToWatchlistReducer();
  const  [, watchlistDispatch] = useUserGetWatchlistReducer();
  const { isLoading: isLoading2} = addToWatchlistState

  // ignore movie
  const [addToIgnoredMoviesState, ignoreMoviesDispatch] = useUserIgnoreMovieReducer();
  const [, ignoredDispatch ] = useUserIgnoredMoviesReducer();
  const { isLoading: isLoading3 } = addToIgnoredMoviesState

  
  // if liked function
  const isLiked = IfMovieLiked(movie);

  // if added to watchlist function 
  const isAddedToWatchlist = IfAddedToWatchlist(movie);

  // if movie ignored function
  const isMovieIgnored = IfMovieIgnored(movie);

  return (
    <>
      <div className="border border-border p-1 hover:scale-95 transitions relative rounded overflow-hidden">
        <Link to={`/movie/${movie?._id}`} className="w-full">
          <img
            src={movie?.image ? movie?.image : "/images/movieIcon.png"}
            alt={movie?.name}
            className="w-full h-64 object-cover"
          />
        </Link>
        <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
          <h3 className="font-semibold truncate">{movie?.name}</h3>
          <button
            onClick={() => LikeMovie(movie, likeMoviesDispatch, favMoviesDispatch, userInfo)}
            disabled={isLiked || isLoading}
            className={`h-9 w-9 text-sm flex-colo transitions
            hover:bg-subMain  border-2 border-subMain rounded-md  text-white`}
          >
            <FaHeart />
          </button>
          <button
            onClick={() => IgnoreMovie(movie, ignoreMoviesDispatch, ignoredDispatch, userInfo)}
            disabled={isMovieIgnored || isLoading3}
            className={`h-9 w-9 text-sm flex-colo transitions
            hover:bg-subMain  border-2 border-subMain rounded-md  text-white`}
          >
            <AiFillDelete />
          </button>
          <button
            onClick={() => AddToWatchList(movie, addToWatchlistDispatch, watchlistDispatch, userInfo)}
            disabled={ isAddedToWatchlist || isLoading2}
            className={`h-9 w-9 text-sm flex-colo transitions
            hover:bg-subMain  border-2 border-subMain rounded-md  text-white`}
          >
            <MdAdd />
          </button>
        </div>
      </div>
    </>
  );
}

export default Movie;
