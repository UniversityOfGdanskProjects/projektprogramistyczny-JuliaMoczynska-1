import React, { useContext, useEffect, useState } from "react";
import { Input, Message } from "../../../Components/UsedInputs";
import SideBar from "../SideBar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { movieValidation } from "../../../Components/Validation/MovieValidation";
import toast from "react-hot-toast";
import { useUpdateMovieReducer } from "../../../Api/Movies/UpdateMovie";
import { useGetMovieDetailsReducer } from "../../../Api/Movies/ByIdMovie";
import { useFormik } from "formik";
import { getMovieByIdAction, updateMovieAction } from "../../../Api/Actions/MoviesActions";
import { UserContext } from "../../../Context/Context";
import { useKeycloak } from "@react-keycloak/web";

function EditMovie() {
    const [cast, setCast] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const { userInfo } = useContext(UserContext)

    const [byIdState, byIdDispatch] = useGetMovieDetailsReducer();
    const { movie } = byIdState

    const { keycloak } = useKeycloak();

    const [updateMovieState, updateMovieDispatch] = useUpdateMovieReducer();
    const {
      isLoading: editLoading,
      isError: editError,
      isSuccess,
    } = updateMovieState

    const formik = useFormik({
      initialValues: {
          name: "",
          time: 0,
          language: "",
          year: 0,
          category: "",
          desc: "",
          image: "",
          titleImage: "",
          casts: "",
          video: ""
      },
      validationSchema: movieValidation,
      onSubmit: (values) => {
          updateMovieAction(movie?._id, {
            ...values,
            casts: cast
          }, updateMovieDispatch, byIdDispatch, userInfo, keycloak)
          formik.resetForm();
          setCast([]);
      },
  });

    useEffect(() => {
      if (movie?._id !== id) {
        getMovieByIdAction(id, byIdDispatch);
        navigate(`/edit/${id}`);
      } 
      if (movie?._id === id) {
        formik.setValues({
            name: movie.name || "",
            time: movie.time || "",
            language: movie?.language,
            year: movie.year || "",
            category: movie?.category,
            desc: movie?.desc,
            image: movie?.image,
            titleImage: movie?.titleImage,
            casts: movie?.cast,
            video: movie.video || ""
        });
    }
      // if its success then reset form and navigate to editMovie
      if (isSuccess) {
        updateMovieDispatch({ type: "UPDATE_MOVIE_RESET" });
        navigate(`/edit/${id}`);
      }
      // if error then show error
      if (editError) {
        toast.error("Something went wrong");
        updateMovieDispatch({ type: "UPDATE_MOVIE_RESET" });
      }
    }, [
      byIdDispatch,
      updateMovieDispatch,
      id,
      formik,
      movie,
      isSuccess,
      editError,
      navigate,
    ]);

  return (
    <SideBar>
        <div className="flex flex-col gap-6 ">
            <h2 className="text-xl font-bold">Edit "{movie?.name}"</h2>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <Input
                    label="Name"
                    placeholder="Enter movie name"
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    bg={true}
                />
                <div className="flex flex-col md:flex-row md:gap-4">
                    <Input
                        label="Category"
                        placeholder="Enter movie category"
                        type="text"
                        name="category"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.category}
                        bg={true}
                    />
                    <Input
                        label="Language"
                        placeholder="Enter movie language"
                        type="text"
                        name="language"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.language}
                        bg={true}
                    />
                </div>
                <div className="flex flex-col md:flex-row md:gap-4">
                    <Input
                        label="Year"
                        placeholder="Enter movie release year"
                        type="text"
                        name="year"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.year}
                        bg={true}
                    />
                    <Input
                        label="Time"
                        placeholder="Enter movie duration"
                        type="text"
                        name="time"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.time}
                        bg={true}
                    />
                </div>
                <div className="w-full grid md:grid-cols-2 gap-6">
                    {/* img without title */}
                    <Input
                        label="image"
                        placeholder="Enter link with image without title"
                        type="text"
                        name="image"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.image}
                        bg={true}
                    />
                    <Input
                        label="titleImage"
                        placeholder="Enter link with image with title"
                        type="text"
                        name="titleImage"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.titleImage}
                        bg={true}
                    />
                </div>

                {/* DESCRIPTION */}
                <div className="w-full">
                    <Message
                        name="desc"
                        label="Description"
                        placeholder="Make a description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.desc}
                    />
                </div>
                <div className="w-full">
                        <Input
                            label="Trailer"
                            placeholder="Enter link with trailer"
                            type="text"
                            name="video"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.video}
                            bg={true}
                        />
                    </div>
                <div className="w-full flex justify-between items-center pt-2">
                  <button type="submit" className="flex bg-subMain text-white py-2 px-4 rounded">
                    {editLoading ? "Updating..." : <>Update Movie</>}
                  </button>
                  <Link to="/" className="flex bg-subMain text-white py-2 px-4 rounded">
                    Anuluj
                  </Link>
                </div>

            </form>

            
        </div>
    </SideBar>
  );
    
}

export default EditMovie;
