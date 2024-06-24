import React, { useContext } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import {
  RiMovie2Fill,
  RiLockPasswordLine,
  RiLogoutCircleLine,
  RiFileSettingsFill,
} from "react-icons/ri";
import Layout from "../../Layout/Layout";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdFavorite, MdPlaylistAdd } from "react-icons/md";
import { UserContext } from "../../Context/Context";
import { logoutAction } from "../../Api/Actions/UserActions";

import { useLoginReducer } from "../../Api/User/Login";
import { useUserFavoriteMoviesReducer } from "../../Api/User/FavoriteMovies";
import { useUserLikeMovieReducer } from "../../Api/User/LikeMovie";
import { useUserIgnoredMoviesReducer } from "../../Api/User/IgnoredMovies";
import { useUserIgnoreMovieReducer } from "../../Api/User/IgnoreMovie";
import { useUserGetWatchlistReducer } from "../../Api/User/WatchlistMovies";
import { useUserAddToWatchlistReducer } from "../../Api/User/AddToWatchlist";
import { useUserUpdateProfileReducer } from "../../Api/User/UpdateUser";
import { useUserChangePasswordReducer } from "../../Api/User/ChangePassword";
import { useAdminGetAllUsersReducer } from "../../Api/Admin/AllUsers";
import { useAdminDeleteUserReducer } from "../../Api/Admin/DeleteUser";
import { useGetMovieDetailsReducer } from "../../Api/Movies/ByIdMovie";
import { useCreateReviewReducer } from "../../Api/Movies/ReviewMovie";
import { useCreateMovieReducer } from "../../Api/Movies/CreateMovie";
import { useUpdateMovieReducer } from "../../Api/Movies/UpdateMovie";
import { useRegisterReducer } from "../../Api/User/Register";
import { useUserDeleteFavoriteMoviesReducer } from "../../Api/User/DeleteFavoriteMovies";
import { useUserDeleteIgnoredMoviesReducer } from "../../Api/User/DeleteIgnoredMovies";
import { useUserDeleteWatchlistReducer } from "../../Api/User/DeleteWatchlist";
import { BiSolidDislike } from "react-icons/bi";
import { useKeycloak } from "@react-keycloak/web";

function SideBar({ children }) {
    const navigate = useNavigate();
    const { userInfo, setUserInfo } = useContext(UserContext)
    const { keycloak,  } = useKeycloak();

    const [, loginDispatch] = useLoginReducer();
    const [,registerDispatch] = useRegisterReducer();
    const [, userFavoriteMoviesDispatch] = useUserFavoriteMoviesReducer();
    const [, userDeleteFavoriteMoviesDispatch] = useUserDeleteFavoriteMoviesReducer();
    const [, userLikeMovieDispatch] = useUserLikeMovieReducer();
    const [, userIgnoredMoviesDispatch] = useUserIgnoredMoviesReducer();
    const [, userDeleteIgnoredMoviesDispatch] = useUserDeleteIgnoredMoviesReducer(); 
    const [, userIgnoreMovieDispatch] = useUserIgnoreMovieReducer();
    const [, userWatchlistDispatch] = useUserGetWatchlistReducer();
    const [, userDeleteWatchlistDispatch] = useUserDeleteWatchlistReducer();
    const [, userAddToWatchlistDispatch] = useUserAddToWatchlistReducer();
    const [, userUpdateProfileDispatch] = useUserUpdateProfileReducer();
    const [, userChangePasswordDispatch] = useUserChangePasswordReducer();
    const [, adminGetAllUsersDispatch] = useAdminGetAllUsersReducer();
    const [, adminDeleteUserDispatch] = useAdminDeleteUserReducer();
    const [, getMovieDetailsDispatch] = useGetMovieDetailsReducer();
    const [, createReviewDispatch] = useCreateReviewReducer();
    const [, createMovieDispatch] = useCreateMovieReducer();
    const [, updateMovieDispatch] = useUpdateMovieReducer();

    const logoutHandler = () => {
        logoutAction(
            setUserInfo,
            loginDispatch,
            registerDispatch,

            userFavoriteMoviesDispatch, 
            userDeleteFavoriteMoviesDispatch,
            userLikeMovieDispatch,

            userIgnoredMoviesDispatch, 
            userDeleteIgnoredMoviesDispatch,
            userIgnoreMovieDispatch,

            userWatchlistDispatch,
            userDeleteWatchlistDispatch,
            userAddToWatchlistDispatch,

            userUpdateProfileDispatch,
            userChangePasswordDispatch,
            adminGetAllUsersDispatch,
            adminDeleteUserDispatch,
            getMovieDetailsDispatch,
            createReviewDispatch,
            createMovieDispatch,
            updateMovieDispatch,
            keycloak
          );
        toast.success("Logged out successfully");
        navigate("/login");
    };

    const SideLinks = keycloak.hasRealmRole("admin")
        ? [
            {
                name: "Dashboard",
                link: "/dashboard",
                icon: BsFillGridFill,
            },
            {
                name: "Profile",
                link: "/profile",
                icon: RiFileSettingsFill,
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
            {
                name: "Watchlist",
                link: "/watchlist",
                icon: MdPlaylistAdd,
            },
            {
                name: "Favorites Movies",
                link: "/favorites",
                icon: MdFavorite
            },
            {
                name: "Ignored Movies",
                link: "/ignore",
                icon: BiSolidDislike,
            },
            {
            name: "Change Password",
            link: "/password",
            icon: RiLockPasswordLine,
            },
        ]
        : keycloak.authenticated
        ? [
            {
                name: "Profile",
                link: "/profile",
                icon: RiFileSettingsFill,
            },
            {
                name: "Watchlist",
                link: "/watchlist",
                icon: MdPlaylistAdd,
            },
            {
                name: "Favorites Movies",
                link: "/favorites",
                icon: MdFavorite
            },
            {
                name: "Ignored Movies",
                link: "/ignore",
                icon: BiSolidDislike,
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

                            {keycloak.authenticated ? (
                                <button
                                    onClick={logoutHandler}
                                    className="flex items-center space-x-4 pt-4 text-white hover:text-subMain transition"
                                >
                                    <RiLogoutCircleLine className="text-xl" />
                                    <span>Log Out</span>
                                </button>
                            ) : (
                                <p className="text-center text-border"> You have no options, please log in first{" "}</p>
                            )}
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



