import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { CgUser } from "react-icons/cg";
import { UserContext } from "../../Context/Context.js"
import { useKeycloak } from "@react-keycloak/web";

function NavBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext)
  const hover = "hover:text-subMain transitions text-white";
  const Hover = ({ isActive }) => (isActive ? "text-subMain" : hover);
  const { keycloak } = useKeycloak();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/movies/${search}`);
      setSearch(search);
    } else {
      navigate(`/movies`);
    }
  };

  return (
    <>
      <div className="bg-main shadow-md sticky top-0 z-20">
        <div className="container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center">
          {/* Logo */}
          <div className="col-span-1 lg:block hidden">
            <Link to="/">
              <img
                src="/images/logo.svg"
                alt="logo"
                className="w-full h-12 object-contain"
              />
            </Link>
          </div>
          {/* search Form */}
          <div className="col-span-3">
            <form
              onSubmit={handleSearch}
              className="w-full text-sm bg-dryGray rounded flex-btn gap-4"
            >
              <button
                type="submit"
                className="bg-subMain w-12 flex-colo h-12 rounded text-white"
              >
                <FaSearch />
              </button>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Movie Name from here"
                className="font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black"
              />
            </form>
          </div>
          {/* menus */}
          <div className="col-span-3 font-medium text-sm hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center">
            <NavLink to="/movies" className={Hover}>
              All movies
            </NavLink>
            <NavLink
              to={
                userInfo && keycloak.authenticated && keycloak.hasRealmRole("admin")
                  ? "/dashboard"
                  : userInfo && keycloak.authenticated
                  ? "/dashboard"
                  : "/login"
              }
              className={Hover}
            >
              <CgUser className="w-8 h-8" />
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
