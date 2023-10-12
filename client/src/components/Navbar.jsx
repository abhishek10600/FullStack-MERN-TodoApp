import { Link } from "react-router-dom";

const Navbar = () => {
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
        <div className="nav-items flex gap-[40px]">
          <Link className="list-none text-xl" to="/login">
            Login
          </Link>
          <Link className="list-none text-xl" to="/signup">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
