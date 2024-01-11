import React, { useContext, useEffect, useState } from "react";
import Table from "../../Components/Table";
import SideBar from "./SideBar";
import { getFavoriteMoviesAction } from "../../Api/UserActions";
import toast from "react-hot-toast";
import Loader from "../../Components/Notfications/Loader";
import { Empty } from "../../Components/Notfications/Empty";
import { useUserFavoriteMoviesReducer } from "../../Api/User/FavoriteMovies";
import { UserContext } from "../../Context/Context";

function FavoritesMovies() {
  const { userInfo, setFavorietes } = useContext(UserContext);
    const [favoritesMovies, favoritesMoviesDispatch] = useUserFavoriteMoviesReducer();
    const { isLoading, isError, likedMovies } = favoritesMovies
    const [initialstate, setinitialstate] = useState(false)
    // delete
    // const {
    //     isLoading: deleteLoading,
    //     isError: deleteError,
    //     isSuccess,
    // } = useSelector((state) => state.userDeleteFavoriteMovies);

    // // delete movies handler
    // const deleteMoviesHandler = () => {
    //     window.confirm("Are you sure you want to delete all movies?") &&
    //     dispatch(deleteFavoriteMoviesAction());
    // };

    useEffect(() => {
        
        if(!initialstate){
            getFavoriteMoviesAction(favoritesMoviesDispatch, userInfo);
            setFavorietes(likedMovies)
            setinitialstate(true)
        }
        
        if (isError || "deleteError") {
            toast.error(isError || "deleteError");
            favoritesMoviesDispatch({
                type: isError
                ? "GET_FAVORITE_MOVIES_RESET"
                : "DELETE_FAVORITE_MOVIES_RESET",
            });
        }
    }, [favoritesMoviesDispatch, initialstate, setFavorietes, likedMovies, userInfo, isError]);

    return (
        <SideBar>
        <div className="flex flex-col gap-6">
            <div className="flex-btn gap-2">
            <h2 className="text-xl font-bold">Favorites Movies</h2>
            {/* {likedMovies?.length > 0 && (
                <button
                disabled={deleteLoading}
                onClick={deleteMoviesHandler}
                className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded"
                >
                {deleteLoading ? "Deleting..." : "Delete All"}
                </button>
            )} */}
            </div>
            {isLoading ? (
            <Loader />
            ) : likedMovies.length > 0 ? (
            <Table
                data={likedMovies}
                admin={false}
                // progress={progress}
            />
            ) : (
            <Empty message="You have no favorites movies" />
            )}
        </div>
        </SideBar>
    );
}

export default FavoritesMovies;
