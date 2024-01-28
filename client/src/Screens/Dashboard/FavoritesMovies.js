import React, { useContext, useEffect } from "react";
import Table from "../../Components/Table";
import SideBar from "./SideBar";
import { deleteFavoriteMoviesAction, getFavoriteMoviesAction } from "../../Api/Actions/UserActions";
import toast from "react-hot-toast";
import Loader from "../../Components/Notfications/Loader";
import { Empty } from "../../Components/Notfications/Empty";
import { useUserFavoriteMoviesReducer } from "../../Api/User/FavoriteMovies";
import { UserContext } from "../../Context/Context";
import { useUserDeleteFavoriteMoviesReducer } from "../../Api/User/DeleteFavoriteMovies";
import { useDeleteMovieReducer } from "../../Api/Movies/DeleteMovie";
import { deleteMovieAction } from "../../Api/Actions/MoviesActions";
import { useNavigate } from "react-router-dom";

function FavoritesMovies() {
    const navigate = useNavigate();
    const { userInfo } = useContext(UserContext);
    //favorites state
    const [favoritesMovies, favoritesMoviesDispatch] = useUserFavoriteMoviesReducer();
    const { isLoading, isError, likedMovies } = favoritesMovies
    
    //delete favorites state
    const [deleteState, deleteDispatch] = useUserDeleteFavoriteMoviesReducer();
    const {isLoading: isLoading2, isError: isError2} =  deleteState


    const [, deleteOneMovieDispatch] = useDeleteMovieReducer();

    // delete favorites movies handler
    const deleteMoviesHandler = () => {
        window.confirm("Are you sure you want to delete all movies?") && deleteFavoriteMoviesAction(deleteDispatch,favoritesMoviesDispatch, userInfo);
    };

    // delete movie handler
    const deleteMovieHandler = (id) => {
        window.confirm("Are you sure you want to delete this movie from database?") && deleteMovieAction(id, deleteOneMovieDispatch, userInfo, navigate);
    };

    useEffect(() => {
        getFavoriteMoviesAction(favoritesMoviesDispatch, userInfo);
        if (isError ) {
            toast.error(isError);
            favoritesMoviesDispatch({ type: "GET_FAVORITE_MOVIES_RESET"  });
        }
        if ( isError2 ) {
            toast.error(isError2);
            deleteDispatch({type: "DELETE_FAVORITE_MOVIES_RESET"})
        }
    }, [favoritesMoviesDispatch, deleteDispatch, isError2, userInfo, isError]);

    return (
        <SideBar>
        <div className="flex flex-col gap-6">
            <div className="flex-btn gap-2">
            <h2 className="text-xl font-bold">Favorites Movies</h2>
            {likedMovies?.length > 0 && (
                <button
                disabled={isLoading2}
                onClick={deleteMoviesHandler}
                className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded"
                >
                {isLoading2 ? "Deleting..." : "Delete All"}
                </button>
            )}
            </div>
            {isLoading ? (
            <Loader />
            ) : likedMovies.length > 0 ? (
            <Table
                data={likedMovies}
                admin={userInfo?.isAdmin}
                onDeleteHandler={deleteMovieHandler}
            />
            ) : (
            <Empty message="You have no favorites movies" />
            )}
        </div>
        </SideBar>
    );
}

export default FavoritesMovies;
