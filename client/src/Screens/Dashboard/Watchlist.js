import React, { useContext, useEffect } from "react";
import Table from "../../Components/Table";
import SideBar from "./SideBar";
import { deleteWatchlistAction, getWachlistAction } from "../../Api/Actions/UserActions";
import toast from "react-hot-toast";
import Loader from "../../Components/Notfications/Loader";
import { Empty } from "../../Components/Notfications/Empty";
import { UserContext } from "../../Context/Context";
import { useUserDeleteWatchlistReducer } from "../../Api/User/DeleteWatchlist";
import { useUserGetWatchlistReducer } from "../../Api/User/WatchlistMovies";
import { useDeleteMovieReducer } from "../../Api/Movies/DeleteMovie";
import { deleteMovieAction } from "../../Api/Actions/MoviesActions";
import { useNavigate } from "react-router-dom";

function WatchList() {
    const navigate = useNavigate();
    const { userInfo } = useContext(UserContext);
    //watchlist state
    const [watchListState, watchListDispatch] = useUserGetWatchlistReducer();
    const { isLoading, isError, watchList } = watchListState
    
    //delete watchlist state
    const [deleteState, deleteDispatch] = useUserDeleteWatchlistReducer();
    const {isLoading: isLoading2, isError: isError2} =  deleteState

    const [, deleteOneMovieDispatch] = useDeleteMovieReducer();


    // delete watchlist movies handler
    const deleteMoviesHandler = () => {
        window.confirm("Are you sure you want to delete all movies from watchlist?") && deleteWatchlistAction(deleteDispatch, watchListDispatch, userInfo);
    };


    // delete movie handler
    const deleteMovieHandler = (id) => {
        window.confirm("Are you sure you want to delete this movie from database?") && deleteMovieAction(id, deleteOneMovieDispatch, userInfo, navigate);
    };

    useEffect(() => {
        getWachlistAction(watchListDispatch, userInfo);
        if (isError ) {
            toast.error(isError);
            watchListDispatch({ type: "GET_WATCHLIST_RESET"  });
        }
        if ( isError2 ) {
            toast.error(isError2);
            deleteDispatch({type: "DELETE_WATCHLIST_RESET"})
        }
    }, [watchListDispatch, deleteDispatch, isError2, userInfo, isError]);

    return (
        <SideBar>
        <div className="flex flex-col gap-6">
            <div className="flex-btn gap-2">
            <h2 className="text-xl font-bold">WatchList</h2>
            {watchList?.length > 0 && (
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
            ) : watchList.length > 0 ? (
            <Table
                data={watchList}
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

export default WatchList;
