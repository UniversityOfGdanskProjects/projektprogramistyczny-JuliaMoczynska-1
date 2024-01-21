
const logoutService = (setUserInfo) => {
  setUserInfo(null)
  localStorage.removeItem("userInfo");
  return null;
};

export { logoutService };