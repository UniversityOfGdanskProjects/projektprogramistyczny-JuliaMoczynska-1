import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { Input } from "../Components/UsedInputs";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        // Tutaj możesz umieścić kod obsługujący rejestrację
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <Layout>
            <div className="container mx-auto px-2 my-24 flex-colo">
                <div className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry rounded-lg border border-border">
                    <form>
                        <Input
                            label="FullName"
                            type="text"
                            placeholder="Enter your name"
                            bg={true}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            bg={true}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            bg={true}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={handleRegister}
                            className="flex-rows gap-4 mb-4 bg-subMain text-white py-2 px-4 rounded"
                        >
                            <FiLogIn /> Register
                        </button>
                        <p className="text-center text-border">
                            Already have an account?{" "}
                            <Link to="/login" className="text-dryGray font-semibold ml-2">
                                Log In
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default Register;
