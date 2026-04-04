import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { Menu, X } from "lucide-react";
import apiConnector from "../services/apiConnector";
import { categories } from "../services/apis.js";
import { IoIosArrowDown } from "react-icons/io";
import LoginDropDown from "./LoginDropDown.jsx";
import logo from '../assets/logo.png'
import Avatar from 'react-avatar';

function NavBar() {

  const location = useLocation();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  console.log(totalItems)
  // console.log(total)
  // console.log(cart)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // console.log("cart ", totalIems);
  // console.log(user);
  const [catalogLinks, setCatalogLinks] = useState([]);
  const fetchLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log(result);
      setCatalogLinks(result.data.data);
      //   console.log(res);
    } catch (error) {
      console.log("Error while fetching Categories: ", error);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const navLinks = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Catalog",
      // link:"/"
    },
    {
      title: "About",
      link: "/about",
    },
    {
      title: "Contact",
      link: "/contact",
    },
  ];
  console.log(catalogLinks)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border-b border-gray-700 shadow-lg" style={{height: '56px'}}>
      <div className="flex flex-col lg:flex-row items-center justify-between px-4 lg:px-8 py-1 lg:py-1 min-h-[56px]">
        {/* Logo Section */}
        <div className="flex justify-between items-center w-full lg:w-auto">
          <div className="flex flex-col">
            <p className="font-lobster text-2xl font-bold text-orange-400">SkillForge</p>
            <div className="flex items-center gap-2">
              <div className="bg-orange-400 h-1 rounded-sm" style={{width: '100px'}}></div>
              <div className="bg-orange-400 rounded-full" style={{width: '3px', height: '3px'}}></div>
            </div>
          </div>
          {/* Hamburger Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-gray-800 rounded-md transition-colors"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav
          className={isMenuOpen ? "flex lg:flex absolute lg:relative top-full lg:top-auto left-0 w-full lg:w-auto bg-gray-900 lg:bg-transparent py-4 lg:py-0 z-50 flex-col lg:flex-row items-center lg:items-center justify-center gap-4 lg:gap-8 lg:flex-1 lg:mx-8" : "hidden lg:flex absolute lg:relative top-full lg:top-auto left-0 w-full lg:w-auto bg-gray-900 lg:bg-transparent py-4 lg:py-0 z-50 flex-col lg:flex-row items-center lg:items-center justify-center gap-4 lg:gap-8 lg:flex-1 lg:mx-8"}
        >
          <ul className="flex flex-col lg:flex-row w-full lg:w-auto justify-center gap-4 lg:gap-8 items-center text-white font-semibold">
            {navLinks.map((item, index) =>
              item.title === "Catalog" ? (
                <div key={index} className="relative group cursor-pointer">
                  <div className="flex items-center gap-1 hover:text-orange-400 transition-colors py-2">
                    {item.title}
                    <IoIosArrowDown className="pt-1 text-sm" />
                  </div>
                  <div className="w-36 bg-gray-800 border border-gray-700 rounded-lg absolute invisible group-hover:visible group-hover:opacity-100 flex flex-col shadow-lg" style={{top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '8px', zIndex: 1000}}>
                    <div className="w-6 h-6 bg-gray-800 absolute rotate-45 border-l border-t border-gray-700" style={{top: '-3px', left: '50%', transform: 'translateX(-50%)', zIndex: -1}}></div>
                    {catalogLinks?.length ? (
                      catalogLinks.map((element, index) => {
                        return (
                          <Link
                            key={index}
                            to={`/catalog/${element?.name?.split(" ").join("-").toLowerCase()}`}
                            className="text-sm text-gray-300 hover:bg-blue-600 hover:text-white px-4 py-3 rounded-lg transition-colors first:rounded-t-lg last:rounded-b-lg"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {element.name}
                          </Link>
                        );
                      })
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              ) : (
                <Link
                  key={index}
                  to={item.link}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <li
                    className={location.pathname === item.link ? "cursor-pointer py-2 transition-all duration-200 text-orange-400 border-b-2 border-orange-400" : "cursor-pointer py-2 transition-all duration-200 text-gray-300 hover:text-orange-400"}
                  >
                    {item.title}
                  </li>
                </Link>
              )
            )}
          </ul>
        </nav>
        {/* Auth Buttons and Cart */}
        <div className={isMenuOpen ? "flex lg:flex flex-row items-center justify-center lg:justify-end gap-3 lg:gap-4 w-full lg:w-auto mt-4 lg:mt-0 pb-4 lg:pb-0" : "hidden lg:flex flex-row items-center justify-center lg:justify-end gap-3 lg:gap-4 w-full lg:w-auto mt-4 lg:mt-0 pb-4 lg:pb-0"}>
          {user && user?.accountType !== "Instructor" && (
            <Link to={"/dashboard/cart"} onClick={() => setIsMenuOpen(false)}>
              <div className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <CiShoppingCart className="w-6 h-6 text-white" />
                {totalItems > 0 && (
                  <span className="absolute bg-orange-400 text-white text-xs rounded-full flex items-center justify-center font-semibold" style={{top: '-4px', right: '-4px', width: '20px', height: '20px'}}>
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>
          )}

          {token === null && (
            <>
              <Link to={"/login"} onClick={() => setIsMenuOpen(false)}>
                <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-lg transition-all duration-200 font-semibold text-sm">
                  Log In
                </button>
              </Link>
              <Link to={"/signup"} onClick={() => setIsMenuOpen(false)}>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-200 font-semibold text-sm">
                  Sign Up
                </button>
              </Link>
            </>
          )}
          {token && user && user.accountType !== "Instructor" && (
            <Link to="/become-instructor" onClick={() => setIsMenuOpen(false)}>
              <button className="px-3 py-1 text-sm lg:text-base bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-200">
                Become an Instructor ➜
              </button>
            </Link>
          )}
          {token && user && (
            <div className="relative group cursor-pointer">
              <div className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-lg transition-colors">
                {user?.image ? (
                  <img
                    className="rounded-full object-cover border border-gray-600" style={{width: '36px', height: '36px'}}
                    src={user?.image}
                    alt={`profile ${user?.firstName}`}
                  />
                ) : (
                  <Avatar
                    color={Avatar.getRandomColor('sitebase', ['green', 'orange', 'red'])}
                    name={`${user?.firstName || ""} ${user?.lastName || ""}`}
                    size="36"
                    round={true}
                  />
                )}
                <IoIosArrowDown className="pt-1 text-sm" />
              </div>
              <div className="w-36 rounded-lg invisible group-hover:visible group-hover:opacity-100 flex flex-col items-center gap-2 py-2 bg-gray-800 border border-gray-700 shadow-lg" style={{position: 'absolute', top: '100%', right: 0, marginTop: '8px', zIndex: 50}}>
                <div onClick={() => setIsMenuOpen(false)}>
                  <LoginDropDown />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;