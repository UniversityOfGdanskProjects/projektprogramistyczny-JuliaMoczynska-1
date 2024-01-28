import React, { useContext, useEffect } from "react";
import SideBar from "../SideBar";
import { UserContext } from "../../../Context/Context";
import { useAdminGetAllUsersReducer } from "../../../Api/Admin/AllUsers";
import { useAdminDeleteUserReducer } from "../../../Api/Admin/DeleteUser";
import { deleteUserAction, getAllUsersAction } from "../../../Api/Actions/UserActions";
import Loader from "../../../Components/Notfications/Loader";
import Table2 from "../../../Components/Table2";
import { Empty } from "../../../Components/Notfications/Empty";

function Users() {

    const { userInfo } = useContext(UserContext)

    const [ allUsersState, allUsersDispatch ] = useAdminGetAllUsersReducer();
    const { isLoading, isError, users } = allUsersState

    const [ deleteUserState, deleteUserDispatch ] = useAdminDeleteUserReducer();
    const { isError: deleteError, isSuccess } = deleteUserState

    const deleteMoviesHandler = (id) => {
        window.confirm("Are you sure you want to delete this user?") && deleteUserAction(id, deleteUserDispatch, userInfo);
    };

    useEffect(() => {
        getAllUsersAction(allUsersDispatch, userInfo);
        if (isError){
            allUsersDispatch({ type: "GET_ALL_USERS_RESET"});
        }
        if (deleteError) {
            deleteUserDispatch({ type: "DELETE_USER_RESET"});
        }
    }, [allUsersDispatch, deleteUserDispatch, userInfo, isError, deleteError, isSuccess]);

    return (
        <SideBar>
        <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold">Users</h2>
            {isLoading ? (
            <Loader />
            ) : users?.length > 0 ? (
            <Table2
                data={users}
                users={true}
                onDeleteFunction={deleteMoviesHandler}
            />
            ) : (
            <Empty message="You dont have any user" />
            )}
        </div>
        </SideBar>
    );
}

export default Users;
