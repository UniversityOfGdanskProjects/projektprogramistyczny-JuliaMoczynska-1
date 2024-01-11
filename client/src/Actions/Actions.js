// import { getAllMoviesService, loginService, registerService } from "./Services.js"; 
import { getAllMoviesService, registerService } from "./Services.js"; 

import { ErrorsAction, tokenProtection } from "../Protection";
import { useLoginReducer } from "./Reducers.js"; 

// // login action
// export const loginAction = (datas) => async (dispatch) => {
//     dispatch({ type: "USER_LOGIN_REQUEST" });
//       try {
//         const data = await loginService(datas);
//         console.log("Uzytkownik zalogowany")
//         dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
//       } catch (error) {
//         console.log("Odrzucenie logowania")
//         ErrorsAction(error, dispatch, "USER_LOGIN_FAIL");
//       }
// }

// register action
// export const registerAction = (datas) => async (dispatch) => {
//     // eslint-disable-next-line no-unused-vars
//     // const [state2, dispatch2] = useLoginReducer();

//     dispatch({ type: "USER_REGISTER_REQUEST" });
//     try {
//         const data = await registerService(datas);
//         dispatch({ type: "USER_REGISTER_SUCCESS", payload: data });
//         // dispatch2({ type: "USER_LOGIN_SUCCESS", payload: data });
//     } catch (error) {
//         ErrorsAction(error, dispatch, "USER_REGISTER_FAIL");
//     }
// };

export const getAllMoviesAction =
    ({
    category = "",
    time = "",
    language = "",
    rate = "",
    year = "",
    search = "",
    pageNumber = "",
    }) =>
    async (dispatch) => {
    try {
        dispatch({ type: "MOVIES_LIST_REQUEST" });
        const safeCategory = category ? category.title : "";
        const response = await getAllMoviesService(
        category,
        time,
        language,
        rate,
        year,
        search,
        pageNumber
        );
        console.log("Movies response:", response);
        dispatch({
        type: "MOVIES_LIST_SUCCESS",
        payload: response,
        });
    } catch (error) {
        ErrorsAction(error, dispatch, "MOVIES_LIST_FAIL");
    }
};

// // Get all Categories action
// export const getAllCategoriesAction = () => async (dispatch) => {
//     try {
//       dispatch({ type: "GET_ALL_CATEGORIES_REQUEST" });
//       const data = await getCategoriesService();
//       dispatch({
//         type: "GET_ALL_CATEGORIES_SUCCESS",
//         payload: data,
//       });
//     } catch (error) {
//       ErrorsAction(error, dispatch, "GET_ALL_CATEGORIES_FAIL");
//     }
//   };