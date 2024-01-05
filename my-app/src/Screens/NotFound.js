import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";

function NotFound() {
    return (
        <Layout>
            <div className="min-h-screen flex items-center justify-center bg-dry">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-subMain mb-4">404 - Not Found</h1>
                    <p className="text-lg text-text mb-6">
                        Oops! The page you are looking for might be in another galaxy.
                    </p>
                    <Link to="/" className=" hover:text-dry transitions font-medium inline-block px-6 py-3 rounded bg-subMain text-white">
                        Go back to Home
                    </Link>
                </div>
            </div>
        </Layout>
    );
}

export default NotFound;
