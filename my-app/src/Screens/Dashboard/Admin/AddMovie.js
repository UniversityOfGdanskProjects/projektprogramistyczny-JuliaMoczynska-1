import React, { useState } from "react";
import SideBar from "../SideBar";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Message } from "../../../Components/UsedInputs";
import Uploder from "../../../Components/Uploder";

function AddMovie() {
    const [cast, setCast] = useState([]);

    const formik = useFormik({
        initialValues: {
            name: "",
            category: "",
            language: "",
            year: "",
            time: "",
            cast: cast
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Movie name is required"),
            category: Yup.string().required("Category is required"),
            language: Yup.string().required("Language is required"),
            year: Yup.string().required("Release year is required"),
            time: Yup.string().required("Duration is required"),
        }),
        onSubmit: (values) => {
            console.log("Adding movie:", { ...values, cast });
            formik.resetForm();
            setCast([]);
        },
    });

    const handleAddActor = () => {
        setCast([...cast, { firstName: "", lastName: "", photo: null }]);
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

    const handlePhotoChange = (index, e) => {
        const newCast = [...cast];
        const file = e.target.files[0];

        if (file) {
            newCast[index].photo = file;
            setCast(newCast);
        }
    };

    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">Add Movie</h2>
                <form onSubmit={formik.handleSubmit}>
                    <Input
                        label="Name"
                        type="text"
                        placeholder="Enter movie name"
                        bg={true}
                        {...formik.getFieldProps("name")}
                    />
                    <div className="flex flex-col md:flex-row md:gap-4">
                        <Input
                            label="Category"
                            type="text"
                            placeholder="Enter movie category"
                            bg={true}
                            {...formik.getFieldProps("category")}
                        />
                        <Input
                            label="Language"
                            type="text"
                            placeholder="Enter movie language"
                            bg={true}
                            {...formik.getFieldProps("language")}
                        />
                    </div>
                    <div className="flex flex-col md:flex-row md:gap-4">
                        <Input
                            label="Year"
                            type="text"
                            placeholder="Enter movie release year"
                            bg={true}
                            {...formik.getFieldProps("year")}
                        />
                        <Input
                            label="Time"
                            type="text"
                            placeholder="Enter movie duration"
                            bg={true}
                            {...formik.getFieldProps("time")}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="text-border font-semibold text-sm">
                            Image
                        </div>
                        <Uploder />
                    </div>
                    <Message label="Description" placeholder="Make a description"/>
                    <div className="flex flex-col mt-5 w-full">
                        <div className="mt-2">
                            {cast.map((actor, index) => (
                                <div key={index} className="flex flex-col md:flex-row md:gap-4 mb-2">
                                    <Input
                                        label={`Actor ${index + 1} First Name`}
                                        type="text"
                                        placeholder="Enter first name"
                                        bg={true}
                                        value={actor.firstName}
                                        onChange={(e) => handleActorChange(index, "firstName", e.target.value)}
                                    />
                                    <Input
                                        label={`Actor ${index + 1} Last Name`}
                                        type="text"
                                        placeholder="Enter last name"
                                        bg={true}
                                        value={actor.lastName}
                                        onChange={(e) => handleActorChange(index, "lastName", e.target.value)}
                                    />
                                    <Input
                                        label={`Actor ${index + 1} Photo`}
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handlePhotoChange(index, e)}
                                        
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
