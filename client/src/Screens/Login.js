import React, { useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../Components/UsedInputs";
import Layout from "../Layout/Layout";
import { FiLogIn } from "react-icons/fi";
import { LoginValidation } from "../Components/Validation/UserValidation";
import { InlineError } from "../Components/Notfications/Error";
import { useFormik } from "formik";
import { useLoginReducer, loginService } from "../Reducers/LoginReducer.js"; 
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [state, dispatch] = useLoginReducer();

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
        dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
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
    if (userInfo?.isAdmin) {
      navigate("/dashboard");
    } else if (userInfo) {
      navigate("/profile");
    }
    if (isSuccess) {
      toast.success(`Welcome back ${userInfo?.fullName}`);
    }
    handleLoginError();

  }, [userInfo, isSuccess, navigate, handleLoginError]);

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
              placeholder="netflixo@gmail.com"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              bg={true}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
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
