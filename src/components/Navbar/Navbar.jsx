import React, { useContext, useEffect, useState } from "react";
import freshCartLogo from "../../assets/imgs/freshcart-logo.svg";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Cartcontext } from "../../context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token, logOut } = useContext(UserContext);
  const { numOfCartItems, getCartProducts } = useContext(Cartcontext);
  useEffect(() => {
    getCartProducts();
  }, []);

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="bg-slate-950 py-4 shadow-sm fixed top-0 left-0 w-full z-50">
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-primary-800 text-2xl font-bold">
            SwiftShop
          </a>

          {/* Hamburger Menu Button */}
          <button
            className="lg:hidden text-xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="fa-solid fa-bars text-primary-800"></i>
          </button>

          {/* Main Nav Links */}
          <ul
            className={`lg:flex gap-5 items-center absolute lg:relative top-16 left-0 bg-slate-950 text-primary-400 w-full lg:w-auto lg:top-auto p-5 lg:p-0 transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            }`}
          >
            {token
              ? [
                  "home",
                  "products",
                  "categories",
                  "brands",
                  "allorders",
                  "wishList",
                ].map((item) => (
                  <li key={item}>
                    <NavLink
                      to={item === "home" ? "/" : `/${item}`}
                      className={({ isActive }) =>
                        ` block p-1 relative before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:top-[101%] before:absolute before:transition-all before:duration-300 hover:before:w-full ${
                          isActive ? "before:w-full font-bold" : " mx-1"
                        }`
                      }
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </NavLink>
                  </li>
                ))
              : [
                  { name: "Sign Up", path: "/signup" },
                  { name: "Log In", path: "/login" },
                ].map((link) => (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `block p-2 relative before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:top-[101%] before:absolute before:transition-all before:duration-300 hover:before:w-full ${
                          isActive ? "before:w-full font-bold" : ""
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
          </ul>

          {/* Cart & Social Links */}
          <div className="flex items-center gap-5">
            {token && (
              <Link to="/cart" className="relative cursor-pointer">
                <i className="fa-solid fa-cart-shopping text-lg text-primary-800"></i>
                <div className="h-5 w-5 rounded-full bg-blue-800 absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 text-white flex justify-center items-center text-sm">
                  {numOfCartItems}
                </div>
              </Link>
            )}

            {/* Social Media Icons */}
            <ul className="hidden lg:flex gap-4 text-xl mx-8">
              {[
                "instagram",
                "facebook",
                "tiktok",
                "twitter",
                "linkedin",
                "youtube",
              ].map((platform) => (
                <li key={platform}>
                  <i
                    className={` text-primary-800 fa-brands fa-${platform}`}
                  ></i>
                </li>
              ))}
            </ul>
            {token ? (
             <Link to="/profile"> <i className="fa-solid fa-user text-primary-800 text-xl cursor-pointer ms-4"></i></Link>
            ) : (
              ""
            )}
            {/* Logout Button */}
            {token && (
              <button onClick={logOut} className="text-lg text-red-700 ms-4">
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            )}
          </div>
        </div>
      </nav>


      <div className="pt-20"></div>
    </>
  );
};

export default Navbar;
