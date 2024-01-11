import Axios from "./Axios";

// // Login service
// export const loginService = async (user) => {
//   try {
//     const { data } = await Axios.post("/users/login", user);
//     if (data) {
//       localStorage.setItem("userInfo", JSON.stringify(data));
//     }
//     return data;
//   } catch (error) {
//     throw error.response.data.message;
//   }
// };

// Register service
// export const registerService = async (user) => {
//   try {
//     const { data } = await Axios.post("/users", user);
//     if (data) {
//       localStorage.setItem("userInfo", JSON.stringify(data));
//     }
//     return data;
//   } catch (error) {
//     throw error.response.data.message;
//   }
// };

export const getAllMoviesService = async (
  category,
  time,
  language,
  rate,
  year,
  search,
  pageNumber
) => {
  const { data } = await Axios.get(
    `/movies?category=${category}&time=${time}&language=${language}&rate=${rate}&year=${year}&search=${search}&pageNumber=${pageNumber}`
  );
  return data;
};

// export const getCategoriesService = async () => {
//   const { data } = await Axios.get("/categories");
//   return data;
// };