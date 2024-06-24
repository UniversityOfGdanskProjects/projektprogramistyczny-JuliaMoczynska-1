import { useEffect } from "react";
import { useUserIgnoredMoviesReducer } from "../../Api/User/IgnoredMovies";
import { useUserDeleteIgnoredMoviesReducer } from "../../Api/User/DeleteIgnoredMovies";
import { deleteIgnoredMoviesAction, getIgnoredMoviesAction } from "../../Api/Actions/UserActions";
import toast from "react-hot-toast";
import Loader from "../../Components/Notfications/Loader";
import { Empty } from "../../Components/Notfications/Empty";
import Table from "../../Components/Table";
import SideBar from "./SideBar";
import { deleteMovieAction } from "../../Api/Actions/MoviesActions";
import { useDeleteMovieReducer } from "../../Api/Movies/DeleteMovie";
import { useNavigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

function IgnoredMovies() { 
    const navigate = useNavigate();
    const { keycloak } = useKeycloak();

    const [ignoredMoviesState, ignoredMoviesDispatch] = useUserIgnoredMoviesReducer(); 
    const { isLoading, isError, ignoredMovies } = ignoredMoviesState
    
    const [deleteState, deleteDispatch] = useUserDeleteIgnoredMoviesReducer(); 
    const { isLoading: isLoading2, isError: isError2 } = deleteState

    const [, deleteOneMovieDispatch] = useDeleteMovieReducer();


    const deleteMoviesHandler = () => {
        window.confirm("Are you sure you want to delete all ignored movies?") && deleteIgnoredMoviesAction(deleteDispatch, ignoredMoviesDispatch, keycloak);
    };

    const deleteMovieHandler = (id) => {
        window.confirm("Are you sure you want to delete this movie from database?") && deleteMovieAction(id, deleteOneMovieDispatch, keycloak, navigate);
    };

    useEffect(() => {
        getIgnoredMoviesAction(ignoredMoviesDispatch, keycloak.token);
        if (isError) {
            toast.error(isError);
            ignoredMoviesDispatch({ type: "GET_IGNORED_MOVIES_RESET" });
        }
        if (isError2) {
            toast.error(isError2);
            deleteDispatch({ type: "DELETE_IGNORED_MOVIES_RESET" });
        }
    }, [ignoredMoviesDispatch, deleteDispatch, isError2, keycloak, isError]);

    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <div className="flex-btn gap-2">
                    <h2 className="text-xl font-bold">Ignored Movies</h2>
                    {ignoredMovies?.length > 0 && (
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
                ) : ignoredMovies.length > 0 ? (
                    <Table data={ignoredMovies} admin={keycloak.hasRealmRole("admin")} onDeleteHandler={deleteMovieHandler}
                    />
                ) : (
                    <Empty message="You have no ignored movies" />
                )}
            </div>
        </SideBar>
    );
}

export default IgnoredMovies;
