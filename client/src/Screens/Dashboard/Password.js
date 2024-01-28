import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { InlineError } from "../../Components/Notfications/Error";
import { Input } from "../../Components/UsedInputs";
import { PasswordValidation } from "../../Components/Validation/UserValidation";
import SideBar from "./SideBar";
import { useUserChangePasswordReducer } from "../../Api/User/ChangePassword";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/Context";
import { changePasswordAction } from "../../Api/Actions/UserActions";

function Password() {
  const [newPasswordState, changePasswordDispatch] = useUserChangePasswordReducer();

  const { isLoading, isError, isSuccess, message } = newPasswordState;
  const { userInfo } = useContext(UserContext)

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: PasswordValidation,
    onSubmit: (values) => {
      changePasswordAction(values, changePasswordDispatch, userInfo);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      changePasswordDispatch({ type: "USER_CHANGE_PASSWORD_RESET" });
    }
    if (isError) {
      toast.error(isError);
      changePasswordDispatch({ type: "USER_CHANGE_PASSWORD_RESET" });
    }
    if (message) {
      toast.success(message);
      formik.resetForm();
    }
  }, [isSuccess, isError, message, formik, changePasswordDispatch]);

  return (
    <SideBar>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Change Password</h2>
        <div className="w-full">
          <Input
            label="Previous Password"
            placeholder="********"
            type="password"
            bg={true}
            name="oldPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.oldPassword}
          />
          {formik.errors.oldPassword && formik.touched.oldPassword && (
            <InlineError text={formik.errors.oldPassword} />
          )}
        </div>
        <div className="w-full">
          <Input
            label="New Password"
            placeholder="********"
            type="password"
            name="newPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
            bg={true}
          />
          {formik.errors.newPassword && formik.touched.newPassword && (
            <InlineError text={formik.errors.newPassword} />
          )}
        </div>
        <div className="w-full">
          <Input
            label="Confirm Password"
            placeholder="********"
            type="password"
            bg={true}
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <InlineError text={formik.errors.confirmPassword} />
          )}
        </div>

        <div className="flex justify-end items-center my-4">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
          >
            {isLoading ? "Changing..." : "Change Password"}
          </button>
        </div>
      </form>
    </SideBar>
  );
}

export default Password;
