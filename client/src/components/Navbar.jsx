import { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const handleLogoutButtonClick = async () => {
    const res = await axios.get("http://localhost:4000/api/v1/users/logout", {
      headers: {
        "Content-Type": "applicationj/json",
      },
      withCredentials: true,
    });
    if (res.data.success === true) {
      setUser({});
      setIsLoggedIn(false);
    }
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
            <div className=" w-[60px] h-[60px] bg-red-900 rounded-full overflow-hidden">
              <img src={user.photo.secure_url} />
            </div>
            {/* <span className="list-none text-xl">User Profile</span> */}
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
