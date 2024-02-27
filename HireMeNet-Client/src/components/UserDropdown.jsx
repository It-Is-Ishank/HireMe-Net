// UserDropdown.js
import React from "react";
import { Link } from "react-router-dom";

const UserDropdown = ({ handleSignOut }) => (
  <div className="absolute  right-0 bg-white border rounded-md shadow-md  md:mt-0">
    <ul className="w-40 px-4 py-3">
      <li>
        <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
          Profile
        </Link>
      </li>
      <li>
        <button onClick={handleSignOut} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
          Sign Out
        </button>
      </li>
    </ul>
  </div>
);

export default UserDropdown;
