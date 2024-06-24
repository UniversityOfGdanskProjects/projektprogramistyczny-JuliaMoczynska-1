// import { logoutAction } from "./Actions/Actions";

export const ErrorsAction = (error, dispatch, action, keycloak) => {
  const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  if (message === "Not authorized, token failed") {
    keycloak.logout(); // Use keycloak.logout() to log out the user
  }
  return dispatch({ type: action, payload: message });
};

// // api token protection
// export const tokenProtection = (userInfo) => {
  
//   if (!keycloak.authenticated) {
//     return null;
//   } else {
//     return userInfo?.token;
//   }
// };

export const tokenProtection = (keycloak) => {
  if (!keycloak.authenticated) {
    return null;
  } else {
    return keycloak.token;
  }
};