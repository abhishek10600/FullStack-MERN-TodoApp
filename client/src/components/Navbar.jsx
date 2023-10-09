const Navbar = () => {
  return (
    <div className="bg-violet-800 h-20 flex justify-between items-center px-[200px] text-white">
      <div className="left">
        <div className="logo">
          <h1 className="text-2xl">ToDo-App</h1>
        </div>
      </div>
      <div className="right">
        <div className="nav-items flex gap-[40px]">
          <li className="list-none text-xl">Abhishek Sharma</li>
          <button className="text-xl">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
