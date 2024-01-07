import React from "react";
import { NavLink } from "react-router-dom";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt, FaUsers } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { MdAdd, MdFavorite, MdMovieCreation } from "react-icons/md";
// import { MdCategory } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import Layout from "../../Layout/Layout";

function SideBar({children}) {
    const SideLinks = [
        {
            name: "Information",
            link: "/dashboard",
            icon: BsFillGridFill
        },
        {
            name: "Movie List",
            link: "/movielist",
            icon: FaListAlt
        },
        {
            name: "Add Movie",
            link: "/addmovie",
            icon: MdMovieCreation
        },
        // {
        //     name: "Categories",
        //     link: "/categories",
        //     icon: MdCategory
        // },
        {
            name: "Users",
            link: "/users",
            icon: FaUsers
        },
        {
            name: "Update Profile",
            link: "/profile",
            icon: FiSettings
        },
        {
            name: "Watchlist",
            link: "/watchlist",
            icon: MdAdd
        },
        {
            name: "Favorites Movies",
            link: "/favorites",
            icon: MdFavorite
        },
        {
            name: "Ignored Movies",
            link: "/ignore",
            icon: AiFillDelete
        },
        {
            name: "Change Password",
            link: "/password",
            icon: MdOutlinePassword
        }
    ];

    return (
        <Layout>
            <div className="min-h-screen container mx-auto px-2">
                <div className="xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6">
                    <div className="col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md xl:mb-0 mb-5">
                        <h2 className="text-dryGray text-2xl font-semibold mb-6">Options</h2>
                        <nav className="space-y-5">
                            {SideLinks.map((link, index) => (
                                <NavLink
                                    key={index}
                                    to={link.link}
                                    activeClassName="text-subMain"
                                    className="flex items-center space-x-4 text-white hover:text-subMain transition"
                                >
                                    <link.icon className="text-xl" />
                                    <span>{link.name}</span>
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                    <div
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="100"
                    className="col-span-6 rounded-md bg-dry border border-gray-800 p-6">
                        {children}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default SideBar;
