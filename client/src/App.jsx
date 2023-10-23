import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "./context/UserContext";

function App() {
  const { setUser, setIsLoggedIn } = useContext(UserContext);
  const getUser = async () => {
    const res = await axios.get(
      "http://localhost:4000/api/v1/users/getProfile",
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (res.data.success === true) {
      setUser(res.data.user);
      setIsLoggedIn(true);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
