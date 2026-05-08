import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { Menu, X } from "lucide-react";
import apiConnector from "../services/apiConnector";
import { categories } from "../services/apis.js";
import { IoIosArrowDown } from "react-icons/io";
import LoginDropDown from "./LoginDropDown.jsx";
import Avatar from "react-avatar";
import logo from "../assets/Skillforge.png";

function NavBar() {
  const location = useLocation();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [catalogLinks, setCatalogLinks] = useState([]);

  const fetchLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setCatalogLinks(result.data.data);
    } catch (error) {
      console.log("Error while fetching Categories: ", error);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const navLinks = [
    { title: "Home", link: "/" },
    { title: "Catalog" },
    { title: "About", link: "/about" },
    { title: "Contact", link: "/contact" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border-b border-gray-700 shadow-lg h-14">

      <div className="flex items-center justify-between px-4 lg:px-8 h-14">

        {/* LOGO SECTION */}
        <div className="flex items-center gap-3">

          <img
            src={logo}
            alt="SkillForge"
            className="h-11 w-auto object-contain hover:scale-105 transition-transform duration-200"
          />

          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-xs text-gray-400 tracking-widest">
              LMS PLATFORM
            </span>
            <div className="flex items-center gap-2">
              <div className="bg-orange-400 h-1 rounded-sm" style={{ width: '90px' }}></div>
              <div className="bg-orange-400 rounded-full" style={{ width: '3px', height: '3px' }}></div>
            </div>
          </div>

        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden p-2 hover:bg-gray-800 rounded-md transition-colors"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* NAV LINKS */}
        <nav
          className={
            isMenuOpen
              ? "flex absolute top-14 left-0 w-full bg-gray-900 flex-col items-center gap-6 py-6 lg:hidden"
              : "hidden lg:flex"
          }
        >
          <ul className="flex flex-col lg:flex-row items-center gap-6 text-white font-semibold">

            {navLinks.map((item, index) =>
              item.title === "Catalog" ? (
                <div key={index} className="relative group cursor-pointer">

                  <div className="flex items-center gap-1 hover:text-orange-400 transition-colors">
                    {item.title}
                    <IoIosArrowDown className="text-sm" />
                  </div>

                  <div className="w-36 bg-gray-800 border border-gray-700 rounded-lg absolute invisible group-hover:visible flex flex-col shadow-lg mt-2 left-1/2 -translate-x-1/2">

                    {catalogLinks?.map((element, index) => (
                      <Link
                        key={index}
                        to={`/catalog/${element?.name
                          ?.split(" ")
                          .join("-")
                          .toLowerCase()}`}
                        className="text-sm text-gray-300 hover:bg-blue-600 hover:text-white px-4 py-2 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {element.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={index} to={item.link} onClick={() => setIsMenuOpen(false)}>
                  <li
                    className={
                      location.pathname === item.link
                        ? "text-orange-400 border-b-2 border-orange-400 pb-1"
                        : "text-gray-300 hover:text-orange-400 transition-colors"
                    }
                  >
                    {item.title}
                  </li>
                </Link>
              )
            )}
          </ul>
        </nav>

        {/* RIGHT SIDE */}
        <div className={isMenuOpen ? "flex flex-col items-center gap-4 mt-6 lg:mt-0 lg:flex-row" : "hidden lg:flex items-center gap-4"}>

          {/* CART */}
          {user && user?.accountType !== "Instructor" && (
            <Link to={"/dashboard/cart"}>
              <div className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <CiShoppingCart className="w-6 h-6 text-white" />

                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>
          )}

          {/* AUTH */}
          {token === null && (
            <>
              <Link to={"/login"}>
                <button className="px-4 py-2 bg-gray-300 hover:bg-gray-500 border border-gray-700 rounded-lg text-sm">
                  Log In
                </button>
              </Link>

              <Link to={"/signup"}>
                <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-700 rounded-lg text-sm">
                  Sign Up
                </button>
              </Link>
            </>
          )}

          {/* INSTRUCTOR */}
          {token && user && user.accountType !== "Instructor" && (
            <Link to="/become-instructor">
              <button className="px-3 py-1 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-400">
                Become Instructor ➜
              </button>
            </Link>
          )}

          {/* PROFILE */}
          {token && user && (
            <div className="relative group cursor-pointer flex items-center gap-2">

              {user?.image ? (
                <img
                  src={user?.image}
                  className="w-9 h-9 rounded-full object-cover border border-gray-600"
                />
              ) : (
                <Avatar
                  name={`${user?.firstName || ""} ${user?.lastName || ""}`}
                  size="36"
                  round
                />
              )}

              <IoIosArrowDown className="text-sm" />

              <div className="absolute top-10 right-0 invisible group-hover:visible bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
                <LoginDropDown />
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default NavBar;