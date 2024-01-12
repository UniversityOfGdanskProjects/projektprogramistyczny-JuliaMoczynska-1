// import { useFormik } from "formik";
// import { useContext, useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import { Imagepreview } from "../../Components/Imagepreview";
// import { InlineError } from "../../Components/Notfications/Error";
// import Uploder from "../../Components/Uploder";
// import { Input } from "../../Components/UsedInputs";
// import { ProfileValidation } from "../../Components/Validation/UserValidation";
// import SideBar from "./SideBar";
// import { UserContext } from "../../Context/Context";
// import { useUserUpdateProfileReducer } from "../../Api/User/UpdateUser";
// import { useUserDeleteProfileReducer } from "../../Api/User/DeleteProfile";
// import { deleteProfileAction, updateProfileAction } from "../../Api/Actions/UserActions";

// function Profile() {
//   const { userInfo } = useContext(UserContext);
//   const [imageUrl, setImageUrl] = useState(userInfo ? userInfo.image : "");
//   const [updateState, updateDispatch] = useUserUpdateProfileReducer();
//   const { isLoading, isError, newUserInfo, isSuccess } = updateState;
//   const [deleteState, deleteDispatch] = useUserDeleteProfileReducer();
//   const { isLoading: deleteLoading, isError: deleteError } = deleteState;

//   // useFormik hook
//   const formik = useFormik({
//     initialValues: {
//       fullName: userInfo ? userInfo.fullName : "",
//       email: userInfo ? userInfo.email : "",
//     },
//     validationSchema: ProfileValidation,
//     onSubmit: (values) => {
//       updateProfileAction({ ...values, image: imageUrl }, updateDispatch, userInfo);
//     },
//   });

//   // delete profile
//   const deleteProfile = () => {
//     window.confirm("Are you sure you want to delete your profile?") &&
//       deleteProfileAction(deleteDispatch, userInfo);
//   };

//   // useEffect
//   useEffect(() => {
//     if (userInfo) {
//       formik.setValues({
//         fullName: userInfo.fullName,
//         email: userInfo.email,
//       });
//     }
//     if (isSuccess) {
//       updateDispatch({ type: "USER_UPDATE_PROFILE_RESET" });
//     }
//     if (isError || deleteError) {
//       toast.error(isError || deleteError);
//       updateDispatch({ type: "USER_UPDATE_PROFILE_RESET" });
//       deleteDispatch({ type: "USER_DELETE_PROFILE_RESET" });
//     }
//   }, [userInfo, formik, isSuccess, isError, updateDispatch, deleteError, deleteDispatch]);

//   return (
//     <SideBar>
//       <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
//         <h2 className="text-xl font-bold">Profile</h2>
//         <div className="w-full grid lg:grid-cols-12 gap-6">
//           <div className="col-span-10">
//             <Uploder setImageUrl={setImageUrl} />
//           </div>
//           {/* image preview */}
//           <div className="col-span-2">
//             <Imagepreview
//               image={imageUrl}
//               name={userInfo ? userInfo.fullName : "Netflixo React Tailwind"}
//             />
//           </div>
//         </div>

//         <div className="w-full">
//           <Input
//             label="FullName"
//             placeholder="Netflixo React Tailwind"
//             type="text"
//             name="fullName"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.fullName}
//             bg={true}
//           />
//           {formik.errors.fullName && formik.touched.fullName && (
//             <InlineError text={formik.errors.fullName} />
//           )}
//         </div>
//         <div className="w-full">
//           <Input
//             label="Email"
//             placeholder="netflixo@gmail.com"
//             type="email"
//             name="email"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.email}
//           />
//           {formik.errors.email && formik.touched.email && (
//             <InlineError text={formik.errors.email} />
//           )}
//         </div>
//         <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
//           <button
//             onClick={deleteProfile}
//             disabled={deleteLoading || isLoading}
//             className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
//           >
//             {deleteLoading ? "Deleting..." : "Delete Account"}
//           </button>
//           <button
//             disabled={deleteLoading || isLoading}
//             type="submit"
//             className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
//           >
//             {isLoading ? "Updating..." : "Update Profile"}
//           </button>
//         </div>
//       </form>
//     </SideBar>
//   );
// }

// export default Profile;
