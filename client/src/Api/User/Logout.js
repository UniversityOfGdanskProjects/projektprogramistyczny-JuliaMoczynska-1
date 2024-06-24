
const logoutService = (setUserInfo, keycloak) => {
  setUserInfo(null)
  localStorage.removeItem("userInfo");
  keycloak.logout()
  return null;
};

export { logoutService };