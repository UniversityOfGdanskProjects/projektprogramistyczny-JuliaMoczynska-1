import React, { useEffect, useCallback, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../Components/UsedInputs";
import Layout from "../Layout/Layout";
import { FiLogIn } from "react-icons/fi";
import { LoginValidation } from "../Components/Validation/UserValidation";
import { InlineError } from "../Components/Notfications/Error";
import { useFormik } from "formik";
import { loginService, useLoginReducer } from "../Api/User/Login";
import toast from "react-hot-toast";
import { UserContext } from "../Context/Context";

import { useKeycloak } from "@react-keycloak/web";


function Login() {
  const navigate = useNavigate();
  const [state, dispatch] = useLoginReducer();
  const { setUserInfo } = useContext(UserContext)
  const { keycloak } = useKeycloak();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginValidation,
    onSubmit: async (values) => {
      dispatch({ type: "USER_LOGIN_REQUEST" });
      try {
        const data = await loginService(values);
        console.log("Uzytkownik zalogowany")
        setUserInfo(data)
        keycloak.login()
        dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
        navigate("/");
      } catch (error) {
        console.log("Odrzucenie logowania")
        dispatch({ type: "USER_LOGIN_FAIL", payload: error });
      }
    },
  });

  const { isLoading, isError, userInfo, isSuccess } = state;

  const handleLoginError = useCallback(() => {
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_LOGIN_RESET" });
    }
  }, [isError, dispatch]);

  useEffect(() => {
    if (userInfo?.isAdmin && keycloak.authenticated && keycloak.hasRealmRole("admin")) {
      navigate("/dashboard");
    } else if (userInfo && keycloak.authenticated) {
      navigate("/");
    }
    if (isSuccess) {
      toast.success(`Welcome back ${userInfo?.fullName}`);
    }
    handleLoginError();

  }, [userInfo, keycloak, isSuccess, navigate, handleLoginError]);

  return (
    <Layout>
      <div className="container mx-auto px-2 my-24 flex-colo">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry  rounded-lg border border-border"
        >
          <div className="w-full">
            <Input
              label="Email"
              placeholder="email"
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              bg={true}
            />
            {formik.touched.email && formik.errors.email ? (
                <InlineError text={formik.errors.email} />
            ) : null }
          </div>

          <div className="w-full">
            <Input
              label="Password"
              placeholder="*******"
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              bg={true}
            />
            {formik.touched.password && formik.errors.password ? (
                <InlineError text={formik.errors.password} />
            ) : null }
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full"
          >
            {isLoading ? "Loading..." : <><FiLogIn /> Sign In</>}
          </button>
          <p className="text-center text-border">
            Don't have an account?{" "}
            <Link to="/register" className="text-dryGray font-semibold ml-2">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}

export default Login;