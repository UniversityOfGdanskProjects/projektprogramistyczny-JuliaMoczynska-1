
const logoutService = () => {
    localStorage.removeItem("userInfo");
    return null;
  };

export { logoutService };