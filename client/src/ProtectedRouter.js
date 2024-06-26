import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "./Context/Context";


function ProtectedRouter() {
  const { userInfo } = useContext(UserContext);
  return userInfo?.token ? <Outlet /> : <Navigate to="/login" />;
}


function AdminProtectedRouter() {
  const { userInfo } = useContext(UserContext);

  return userInfo?.token ? (
    userInfo?.isAdmin ? (
      <Outlet />
    ) : (
      <Navigate to="/*" />
    )
  ) : (
    <Navigate to="/login" />
  );
}

export { ProtectedRouter, AdminProtectedRouter };
