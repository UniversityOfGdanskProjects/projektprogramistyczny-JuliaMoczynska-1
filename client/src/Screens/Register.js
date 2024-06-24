import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../Components/UsedInputs";
import Layout from "../Layout/Layout";
import { FiLogIn } from "react-icons/fi";
import { InlineError } from "../Components/Notfications/Error";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { RegisterValidation } from "../Components/Validation/UserValidation";
import { useRegisterReducer, registerService } from "../Api/User/Register.js"; 
// import { useLoginReducer } from "../Api/User/Login.js"; 
// import { useKeycloak } from "@react-keycloak/web";

function Register() {
    const navigate = useNavigate();
    const [state, dispatch] = useRegisterReducer();
    
    // const [, dispatch2] = useLoginReducer();

    // const { keycloak,  } = useKeycloak();


    const formik = useFormik({
        initialValues: {
          fullName: "",
          email: "",
          password: "",
        },
        validationSchema: RegisterValidation,
        onSubmit: async (values) => {
          dispatch({ type: "USER_REGISTER_REQUEST" });
          try {
            const data = await registerService(values);
            dispatch({ type: "USER_REGISTER_SUCCESS", payload: data });
            // dispatch2({ type: "USER_LOGIN_SUCCESS", payload: data });
          } catch (error) {
            dispatch({ type: "USER_REGISTER_FAIL", payload: error });
          }
        },
    });

    const { isLoading, isError, userInfo, isSuccess } = state;

    useEffect(() => {
        if (userInfo?.isAdmin) {
          navigate("/dashboard");
        } else if (userInfo) {
          navigate("/");
        }
        if (isSuccess) {
          toast.success(`Welcome ${userInfo?.fullName}`);
          dispatch({ type: "USER_REGISTER_RESET" });
          navigate("/login");
        }
        if (isError) {
          toast.error(isError);
          dispatch({ type: "USER_REGISTER_RESET" });
        }
    }, [userInfo, isSuccess, isError, navigate, dispatch]);

  //   useEffect(() => {
  //     // Sprawdź, czy użytkownik jest zalogowany
  //     if (keycloak.authenticated) {
  //       // Pobierz role użytkownika
  //       const roles = keycloak.tokenParsed.realm_access.roles;
  //       // Sprawdź, czy użytkownik ma rolę admina
  //       const isAdmin = roles.includes('admin');
        
  //       if (isAdmin) {
  //         navigate("/dashboard");
  //       } else {
  //         navigate("/");
  //       }
  //     }
  //     if (isSuccess) {
  //       toast.success(`Welcome ${userInfo?.fullName}`);
  //       dispatch({ type: "USER_REGISTER_RESET" });
  //     }
  //     if (isError) {
  //       toast.error(isError);
  //       dispatch({ type: "USER_REGISTER_RESET" });
  //     }
  // }, [keycloak.authenticated, isSuccess, isError, userInfo, navigate, dispatch, keycloak.tokenParsed.realm_access.roles]);

  return (
    <Layout>
        <div className="container mx-auto px-2 my-24 flex-colo">
            <form
            onSubmit={formik.handleSubmit}
            className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry  rounded-lg border border-border"
            >
                <div className="w-full">
                    <Input
                    label="FullName"
                    placeholder="Netflixo React Tailwind"
                    type="text"
                    name="fullName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fullName}
                    bg={true}

                    />
                    {formik.touched.fullName && formik.errors.fullName ? (
                        <InlineError text={formik.errors.fullName} />
                    ) : null }
                </div>

                <div className="w-full">
                    <Input
                    label="Email"
                    placeholder="netflixo@gmail.com"
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
                    {isLoading ? "Loading..." : <><FiLogIn /> Sign Up</>}
                </button>
                <p className="text-center text-border">
                    Already have an account?{" "}
                    <Link to="/login" className="text-dryGray font-semibold ml-2">
                    Sign In
                    </Link>
                </p>
            </form>
        </div>
    </Layout>
  );
}

export default Register;