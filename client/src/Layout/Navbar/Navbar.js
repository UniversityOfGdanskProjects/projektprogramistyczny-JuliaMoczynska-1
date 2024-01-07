import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { MdFavorite, MdAdd } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { AiFillDelete } from "react-icons/ai";


function Navbar() {
    const hover = "hover:text-subMain transitions text-white"
    const Hover = ({isActive}) => (isActive ? 'text-subMain' : hover)
    return(
        <>
            <div className="bg-main shadow-md sticky top-0 z-20">
                <div className="container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center">
                    {/* Logo */}
                    <div className="col-span-1 lg:block hidden">
                        <Link to="/">
                            <img src="/images/logo.svg" alt="logo" className="w-full h-12 object-contain"/>

                        </Link>
                    </div>
                    {/*Search Form */}
                    <div className="col-span-3">
                        <form className="w-full text-sm bg-dryGray rounded flex-btn gap-4">
                            <button type="submit" className="bg-subMain w-12 flex-colo h-12 rounded text-white">
                                <FiSearch />
                            </button>
                            <input type="text" placeholder="Search movie" className="font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black"/>
                        </form>
                    </div>
                    {/* menus */}
                    <div className="col-span-3 font-medium text-sm hidden x1:gap-14 2x1:gap-20 justify-between lg:flex x1:justify-end items-center">
                        
                        <NavLink to="/movies" className={Hover}>Movies</NavLink>
                        <NavLink to="/watchlist" className={Hover}>
                            <MdAdd className="w-6 h-6" />
                        </NavLink>
                        <NavLink to="/favorites" className={Hover}>
                            <MdFavorite className="w-6 h-6" />
                        </NavLink>
                        <NavLink to="/ignore" className={Hover}>
                            <AiFillDelete className="w-6 h-6" />
                        </NavLink>
                        <NavLink to="/login" className={Hover}>
                            <FaCircleUser className="w-8 h-8" />
                        </NavLink>
                    </div>
                    
                </div>
            </div>
        </>
        
    )
}

export default Navbar