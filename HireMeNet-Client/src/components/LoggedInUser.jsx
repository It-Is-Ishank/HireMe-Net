import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import UserDropdown from "./UserDropdown";

const LoggedInUser = ({ user, handleSignOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      <button className="text-primary focus:outline-none" onClick={handleMenuToggler}>
        <FaUserCircle className="text-xl mr-4 mt-2" />
      </button>
      {isMenuOpen && <UserDropdown handleSignOut={handleSignOut} />}
    </div>
  );
};

export default LoggedInUser;