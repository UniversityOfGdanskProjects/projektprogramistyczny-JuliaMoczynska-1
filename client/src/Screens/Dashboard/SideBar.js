import React, { useContext } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt, FaUsers } from "react-icons/fa";
import {
  RiMovie2Fill,
  RiLockPasswordLine,
  RiLogoutCircleLine,
} from "react-icons/ri";
// import { HiViewGridAdd } from "react-icons/hi";
// import { FiSettings } from "react-icons/fi";
import Layout from "../../Layout/Layout";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdAdd, MdFavorite } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { UserContext } from "../../Context/Context";
import { logoutAction } from "../../Api/Actions/UserActions";

// import { useLoginReducer } from "../../Api/User/Login";
// import { useUserFavoriteMoviesReducer } from "../../Api/User/FavoriteMovies";
// import { useUserUpdateProfileReducer } from "../../Api/User/UpdateUser";
// import { useUserDeleteProfileReducer } from "../../Api/User/DeleteProfile";
// import { useUserChangePasswordReducer } from "../../Api/User/ChangePassword";

function SideBar({ children }) {
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext)


//DOKOŃCZYC LOGOUT!!! ^^^
//   logout
  const logoutHandler = () => {
    logoutAction();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const SideLinks = userInfo?.isAdmin
    ? [
        {
            name: "Dashboard",
            link: "/dashboard",
            icon: BsFillGridFill,
        },
        {
            name: "Movies List",
            link: "/movieslist",
            icon: FaListAlt,
        },
        {
            name: "Add Movie",
            link: "/addmovie",
            icon: RiMovie2Fill,
        },
        {
            name: "Users",
            link: "/users",
            icon: FaUsers,
        },
        // {
        //     name: "Update Profile",
        //     link: "/profile",
        //     icon: FiSettings,
        // },
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
          icon: RiLockPasswordLine,
        },
      ]
    : userInfo
    ? [
        // {
        //     name: "Update Profile",
        //     link: "/profile",
        //     icon: FiSettings,
        // },
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
            icon: RiLockPasswordLine,
        },
      ]
    : [];

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
                        <button
                              onClick={logoutHandler}
                              className="flex items-center space-x-4 pt-4 text-white hover:text-subMain transition"
                        >
                            <RiLogoutCircleLine className="text-xl"/> <span>Log Out</span>
                        </button>
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



