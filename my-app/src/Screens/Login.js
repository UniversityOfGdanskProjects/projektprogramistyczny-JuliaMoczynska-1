import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { Input } from "../Components/UsedInputs";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // Tutaj możesz umieścić kod obsługujący logowanie
        console.log("Email:", email);
        console.log("Password:", password);
    };
    return(
        <Layout>
          <div className="container mx-auto px-2 my-24 flex-colo">
            <div className="w-full 2xl:w-2/5 flex-colo p-14 md:w-3/5 bg-dry rounded-lg border border-border">
            <form>
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
                <Link to="/dashboard">
                    <button
                        type="button"
                        onClick={handleLogin}
                        className="flex-rows gap-4 mb-4 bg-subMain text-white py-2 px-4 rounded"
                    >
                        <FiLogIn/> Login
                    </button>
                </Link>
                <p className="text-center text-border">
                    Don't have an account?{" "} 
                    <Link to="/register" className="text-dryGray font-semibold ml-2">
                        Sing Up
                    </Link>
                </p>
                
            </form>
            </div>
          </div>
        </Layout>
    )
}

export default Login