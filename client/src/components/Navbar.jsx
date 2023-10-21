import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const { isLoggedIn } = useContext(UserContext);
  const handleLogoutButtonClick = async () => {
    const res = await axios.get("http://localhost:4000/api/v1/users/logout", {
      headers: {
        "Content-Type": "applicationj/json",
      },
      withCredentials: true,
    });
  };

  return (
    <div className="bg-violet-800 h-20 flex justify-between items-center px-[200px] text-white">
      <div className="left">
        <div className="logo">
          <Link className="text-2xl" to="/">
            ToDo-App
          </Link>
        </div>
      </div>
      <div className="right">
        {isLoggedIn && (
          <div className="nav-items flex gap-[40px]">
            <button
              className="list-none text-xl"
              onClick={handleLogoutButtonClick}
            >
              Logout
            </button>
            <Link className="list-none text-xl" to="/signup">
              User Profile
            </Link>
          </div>
        )}
        {!isLoggedIn && (
          <div className="nav-items flex gap-[40px]">
            <Link className="list-none text-xl" to="/login">
              Login
            </Link>
            <Link className="list-none text-xl" to="/signup">
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
