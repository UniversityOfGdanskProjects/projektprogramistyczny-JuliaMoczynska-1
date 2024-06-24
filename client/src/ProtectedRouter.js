// import React, { useContext } from "react";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { UserContext } from "./Context/Context";
import { useKeycloak } from '@react-keycloak/web';

function ProtectedRouter() {
  // const { userInfo } = useContext(UserContext);
  // return userInfo?.token ? <Outlet /> : <Navigate to="/login" />;

  const { keycloak } = useKeycloak();
  const isLoggedIn = keycloak.authenticated;

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}


function AdminProtectedRouter() {
  // const { userInfo } = useContext(UserContext);

  // return userInfo?.token ? (
  //   userInfo?.isAdmin ? (
  //     <Outlet />
  //   ) : (
  //     <Navigate to="/*" />
  //   )
  // ) : (
  //   <Navigate to="/login" />
  // );

  const { keycloak } = useKeycloak();
  const isLoggedIn = keycloak.authenticated;
  // const isAdmin = keycloak.tokenParsed?.realm_access?.roles?.includes('admin'); // Sprawdź rolę admina
  const isAdmin = keycloak.hasRealmRole("admin")


  return isLoggedIn ? (isAdmin ? <Outlet /> : <Navigate to="/*" />) : <Navigate to="/login" />;
}

export { ProtectedRouter, AdminProtectedRouter };
