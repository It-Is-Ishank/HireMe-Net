// Navbar.js
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../feature/login/loginSlice";
import LoggedInUser from "./LoggedInUser";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const user = useSelector((state) => state.user);

  const navItem = [
    { path: "/", title: "Start a search" },
    { path: "/my-job", title: "My Jobs" },
    { path: "/salary", title: "Estimated Salary" },
    { path: "/post-job", title: "Post A Job" },
  ];

  const handleSignOut = () => {
    console.log("Logging out...");
    dispatch(logout());
  }

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-6">
        <Link to="/" className="flex items-center gap-2 text-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="29" height="30" viewBox="0 0 29 30" fill="none">
            <circle cx="12.0149" cy="12.5149" r="12.0249" fill="#3575E2" fillOpacity="0.4" />
            <circle cx="16.9857" cy="17.4857" r="12.0249" fill="#357582" />
          </svg>
          <span className="font-bold text-xl">HireMe Net</span>
        </Link>

        {/* nav item for bigger screen*/}
        <ul className="hidden lg:flex gap-12">
          {navItem.map(({ path, title }) => (
            <li key={path} className="test-base text-primary">
              <NavLink to={path} className={({ isActive }) => (isActive ? "active" : "")}>
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Conditionally render user name or login/signup buttons */}
        <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
          {user.loggedIn ? (
            <>
              <LoggedInUser user={user} handleSignOut={handleSignOut} />
            </>
            
          ) : (
            <>
              <Link to="/login" className="py-2 px-5 border rounded">
                Log in
              </Link>
              <Link to="/sign-up" className="py-2 px-5 border rounded bg-blue text-white">
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* mobile menu */}
        <div className="lg:hidden block m-1  items-center">
          {/* User icon in mobile view */}
          {user.loggedIn && (
            <LoggedInUser user={user}  />
          )}

          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-primary" />
            ) : (
              <FaBarsStaggered className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </nav>

      {/* navitem for mobile */}
      <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
        <ul>
          {navItem.map(({ path, title }) => (
            <li key={path} className="test-base text-white py-1">
              <NavLink to={path} className={({ isActive }) => (isActive ? "active" : "")}>
                {title}
              </NavLink>
            </li>
          ))}
          {!user.loggedIn && (
      <>
        <li className="test-base text-white py-1">
          <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
            Login
          </NavLink>
        </li>
        <li className="test-base text-white py-1">
          <NavLink to="/sign-up" className={({ isActive }) => (isActive ? "active" : "")}>
            Signup
          </NavLink>
        </li>
      </>
    )}

          
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
