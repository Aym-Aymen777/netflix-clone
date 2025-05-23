import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CircleArrowOutDownRight, Menu } from "lucide-react";
import { useAuthStore } from "../store/Auth.js";
import { useContentTypeStore } from "../store/ContentType.js";
import { Search } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { setContentType } = useContentTypeStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    //setContentType()
  };
  const linkStyle =
    "hidden sm:block text-white text-l font-semibold ml-4 hover:text-red-500 cursor-pointer";
  return (
    <>
      {user === null ? (
        <div className="flex z-10 justify-between items-center p-4 bg-transparent text-white absolute w-full top-0 max-w-[1280px] mx-auto max-h-[64px]">
          <img
            src="/netflix-logo.png"
            alt="netflix logo"
            className="max-w-[100px] md:max-w-[130px]"
          />
          <div className="flex gap-4">
            <Link
              to="/login"
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-500 cursor-pointer">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-500 cursor-pointer">
              Sign Up
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex z-10 justify-between items-center p-4 bg-transparent text-white absolute w-full top-0 left-1/2 transform -translate-x-1/2 max-w-[1280px] mx-auto max-h-[64px]">
          <div className="flex items-center">
            <img
              src="/netflix-logo.png"
              alt="netflix logo"
              className="max-w-[100px] md:max-w-[130px]"
            />
            <Link to={"/"} className={linkStyle}>
              Home
            </Link>
            <Link
              to={"/tvshows"}
              className={linkStyle}
              onClick={() => setContentType("tvshows")}>
              Tv Shows
            </Link>
            <Link
              to={"/movies"}
              className={linkStyle}
              onClick={() => setContentType("movies")}>
              Movies
            </Link>
            <Link to={"/"} className={linkStyle}>
              Latest
            </Link>
            <Link to={"/history"} className={linkStyle}>
              Search History
            </Link>
          </div>
          <div className="flex gap-4 items-center">
            <Link
              to={"/search/movie"}
              className="hidden sm:block text-white text-l font-semibold hover:text-red-500 cursor-pointer">
              <Search />
            </Link>
            <img
              src="/avatar1.png"
              alt=""
              className="rounded-[30%] max-w-[2.25rem] max-h-[2.25rem] md:max-w-[60px]"
            />
            <Link
              to="/"
              className="flex items-center  px-4 py-2 cursor-pointer"
              onClick={logout}>
              <CircleArrowOutDownRight className="transf text-red-600 mr-2" />
            </Link>
            <div className="sm:hidden text-white text-l font-semibold  hover:text-red-500">
              <Menu
                className=" cursor-pointer size-9 "
                onClick={toggleMobileMenu}
              />
            </div>
          </div>
        </div>
      )}
      {isMobileMenuOpen && (
        <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800 text-white absolute top-16 left-0">
          <Link
            to={"/"}
            className="block hover:text-red-500"
            onClick={toggleMobileMenu}>
            Movies
          </Link>
          <Link
            to={"/"}
            className="block hover:text-red-500"
            onClick={toggleMobileMenu}>
            Tv Shows
          </Link>
          <Link
            to={"/"}
            className="block hover:text-red-500"
            onClick={toggleMobileMenu}>
            Latest
          </Link>
          <Link
            to={"/history"}
            className="block hover:text-red-500"
            onClick={toggleMobileMenu}>
            Search History
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
