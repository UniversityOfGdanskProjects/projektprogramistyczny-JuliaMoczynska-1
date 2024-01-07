import React from "react";
import { UsersData } from "../../../Data/UsersData";
import SideBar from "../SideBar";
import Table2 from "../../../Components/Table2";

function Users() {
    const isAdmin = true; // Set to true to simulate admin access

    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">Users</h2>
                <Table2 data={UsersData} admin={isAdmin} />
            </div>
        </SideBar>
    );
}

export default Users