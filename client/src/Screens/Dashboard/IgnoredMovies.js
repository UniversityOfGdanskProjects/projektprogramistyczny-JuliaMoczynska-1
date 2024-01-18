import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/Context";
import { useUserIgnoredMoviesReducer } from "../../Api/User/IgnoredMovies";
import { useUserDeleteIgnoredMoviesReducer } from "../../Api/User/DeleteIgnoredMovies";
import { deleteIgnoredMoviesAction, getIgnoredMoviesAction } from "../../Api/Actions/UserActions";
import toast from "react-hot-toast";
import Loader from "../../Components/Notfications/Loader";
import { Empty } from "../../Components/Notfications/Empty";
import Table from "../../Components/Table";
import SideBar from "./SideBar";

function IgnoredMovies() { 
    const { userInfo } = useContext(UserContext);
    // Ignored movies state
    const [ignoredMoviesState, ignoredMoviesDispatch] = useUserIgnoredMoviesReducer(); 
    const { isLoading, isError, ignoredMovies } = ignoredMoviesState
    
    // Delete ignored movies state
    const [deleteState, deleteDispatch] = useUserDeleteIgnoredMoviesReducer(); 
    const { isLoading2, isError2, isSuccess2 } = deleteState

    // Delete ignored movies handler
    const deleteMoviesHandler = () => {
        window.confirm("Are you sure you want to delete all ignored movies?") && deleteIgnoredMoviesAction(deleteDispatch, ignoredMoviesDispatch, userInfo);
    };

    useEffect(() => {
        getIgnoredMoviesAction(ignoredMoviesDispatch, userInfo);
        if (isError) {
            toast.error(isError);
            ignoredMoviesDispatch({ type: "GET_IGNORED_MOVIES_RESET" });
        }
        if (isError2) {
            toast.error(isError2);
            deleteDispatch({ type: "DELETE_IGNORED_MOVIES_RESET" });
        }
    }, [ignoredMoviesDispatch, deleteDispatch, isError2, userInfo, isError]);

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
                    <Table data={ignoredMovies} admin={userInfo?.isAdmin} />
                ) : (
                    <Empty message="You have no ignored movies" />
                )}
            </div>
        </SideBar>
    );
}

export default IgnoredMovies;
