import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateMovieReducer } from "../../../Api/Movies/CreateMovie";
import { useFormik } from "formik";
import { movieValidation } from "../../../Components/Validation/MovieValidation";
import { createMovieAction } from "../../../Api/Actions/MoviesActions";
import toast from "react-hot-toast";
import SideBar from "../SideBar";
import { Input, Message } from "../../../Components/UsedInputs";
import { InlineError } from "../../../Components/Notfications/Error";
import { useKeycloak } from "@react-keycloak/web";


function AddMovie() {
    const [cast, setCast] = useState([]);
    const navigate = useNavigate();

    const [ createMovieState, createMovieDispatch ] = useCreateMovieReducer();
    const { isError, isSuccess } = createMovieState


    const { keycloak } = useKeycloak();

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
            video: ""
        },
        validationSchema: movieValidation,
        onSubmit: (values) => {
            createMovieAction({
                ...values,
                casts: cast
              }, createMovieDispatch, keycloak)
            formik.resetForm();
            setCast([]);
        },
    });


    const handleAddActor = () => {
        setCast([...cast, { firstName: "", lastName: "", photo: "" }]);
    };

    const handleRemoveActor = (index) => {
        const newCast = [...cast];
        newCast.splice(index, 1);
        setCast(newCast);
    };

    const handleActorChange = (index, field, value) => {
        const newCast = [...cast];
        newCast[index][field] = value;
        setCast(newCast);
    };

    useEffect(() => {
        // if its success then reset form and navigate to addMovie
        if (isSuccess) {
            createMovieDispatch({ type: "CREATE_MOVIE_RESET" });
            navigate("/addMovie");
        }
        // if error then show error
        if (isError) {
          toast.error("Something went wrong");
          createMovieDispatch({ type: "CREATE_MOVIE_RESET" });
        }
      }, [ isSuccess, isError, createMovieDispatch, navigate]);

    return (
        <SideBar>
            <div className="flex flex-col gap-6 ">
                <h2 className="text-xl font-bold">Add Movie</h2>
                <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                    <div className="w-full">
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
                        {formik.touched.name && formik.errors.name ? (
                            <InlineError text={formik.errors.name} />
                        ) : null }
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:gap-4">
                        <div className="w-full">
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
                            {formik.touched.category && formik.errors.category ? (
                                <InlineError text={formik.errors.category} />
                            ) : null }
                        </div>
                        <div className="w-full">
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
                            {formik.touched.language && formik.errors.language ? (
                                <InlineError text={formik.errors.language} />
                            ) : null }
                        </div>
                        
                    </div>
                    <div className="flex flex-col md:flex-row md:gap-4">
                        <div className="w-full">
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
                            {formik.touched.year && formik.errors.year ? (
                                <InlineError text={formik.errors.year} />
                            ) : null }
                        </div>
                        <div className="w-full">
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
                            {formik.touched.time && formik.errors.time ? (
                                <InlineError text={formik.errors.time} />
                            ) : null }
                        </div>
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
                        {formik.touched.desc && formik.errors.desc ? (
                            <InlineError text={formik.errors.desc} />
                        ) : null }
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
                    <div className="flex flex-col mt-5 w-full">
                        <div className="mt-2">
                            {cast.map((actor, index) => (
                                <div key={index} className="flex flex-col md:flex-row md:gap-4 mb-2">
                                    <Input
                                        label={`Actor ${index + 1} First Name`}
                                        placeholder="Enter first name"
                                        type="text"
                                        name="firstName"
                                        bg={true}
                                        onChange={(e) => handleActorChange(index, "firstName", e.target.value)}
                                        onBlur={formik.handleBlur}
                                        value={actor.firstName}                                    />
                                    <Input
                                        label={`Actor ${index + 1} Last Name`}
                                        placeholder="Enter last name"
                                        type="text"
                                        name="lastName"
                                        bg={true}
                                        onChange={(e) => handleActorChange(index, "lastName", e.target.value)}
                                        onBlur={formik.handleBlur}
                                        value={actor.lastName}
                                    />
                                    <Input
                                        label={`Actor ${index + 1} image`}
                                        placeholder="Enter a link image"
                                        type="text"
                                        name="image"
                                        bg={true}
                                        onChange={(e) => handleActorChange(index, "photo", e.target.value)}
                                        onBlur={formik.handleBlur}
                                        value={actor.photo || ''}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveActor(index)}
                                        className="bg-red-500 text-white py-2 px-4 rounded"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddActor}
                                className="bg-border text-white py-2 px-4 my-2 rounded"
                            >
                                Add Actor
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="bg-subMain text-white py-2 px-4 mt-5 rounded">
                        Publish Movie
                    </button>
                </form>
            </div>
        </SideBar>
    );
}

export default AddMovie;
