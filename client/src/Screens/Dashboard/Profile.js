import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import { InlineError } from "../../Components/Notfications/Error";
import { Input } from "../../Components/UsedInputs";
import { ProfileValidation } from "../../Components/Validation/UserValidation";
import SideBar from "./SideBar";
import { UserContext } from "../../Context/Context";
import { useUserUpdateProfileReducer } from "../../Api/User/UpdateUser";
import { updateProfileAction } from "../../Api/Actions/UserActions";
import { useNavigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

function Profile() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [updateState, updateDispatch] = useUserUpdateProfileReducer();
  const { isLoading, isError, isSuccess } = updateState;
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();

  const formik = useFormik({
    initialValues: {
      fullName: userInfo ? userInfo.fullName : "",
      email: userInfo ? userInfo.email : "",
      image: userInfo ? userInfo.image : "",
    },
    validationSchema: ProfileValidation,
    onSubmit: (values) => {
      updateProfileAction({ ...values }, updateDispatch, userInfo, setUserInfo, keycloak.token);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      updateDispatch({ type: "USER_UPDATE_PROFILE_RESET" });
        formik.setValues({
            fullName: userInfo.fullName,
            email: userInfo.email,
            image: userInfo.image,
        });
    }
    if (isError ) {
      toast.error(isError);
      updateDispatch({ type: "USER_UPDATE_PROFILE_RESET" });
    }
  }, [userInfo, formik, isSuccess, isError, navigate, updateDispatch]);

  return (
    <SideBar>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Profile</h2>
        <img
            src={userInfo?.image ? userInfo.image : "/images/user.png"}
            alt={userInfo?.userName}
            className="w-full rounded-lg object-cover border-2 border-red-500"
            style={{ maxHeight: "200px", maxWidth: "200px" }}  // Dodałem styl, aby ograniczyć rozmiar
        />
        <Input
            label="image"
            placeholder="Enter link with your image"
            type="text"
            name="image"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.image}
            bg={true}
        />
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
          {formik.errors.fullName && formik.touched.fullName && (
            <InlineError text={formik.errors.fullName} />
          )}
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
          />
          {formik.errors.email && formik.touched.email && (
            <InlineError text={formik.errors.email} />
          )}
        </div>
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          
          <button
            disabled={ isLoading}
            type="submit"
            className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </SideBar>
  );
}

export default Profile;
