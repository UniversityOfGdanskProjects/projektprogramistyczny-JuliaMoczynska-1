// import { logoutAction } from "./Actions/Actions";

export const ErrorsAction = (error, dispatch, action) => {
  const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  return dispatch({ type: action, payload: message });
};

// api token protection
export const tokenProtection = (userInfo, keycloak) => {
  if (!userInfo?.token && !keycloak.authenticated) {
    return null;
  } else {
    return userInfo?.token;
  }
};