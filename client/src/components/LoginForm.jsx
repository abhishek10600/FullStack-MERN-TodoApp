import { useState } from "react";
import FormData from "form-data";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLoginFormSubmit = async (ev) => {
    ev.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    const res = await axios.post(
      "http://localhost:4000/api/v1/users/login",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (res.data.success === true) {
      console.log(res.data);
      navigate("/");
    } else {
      console.log("Some error");
      setError("Invalid email or password");
    }
  };
  return (
    <form
      className="bg-violet-800 mt-[40px] flex flex-col items-center justify-center rounded-lg mx-[220px] py-[20px]"
      onSubmit={handleLoginFormSubmit}
    >
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="my-4 w-[1400px] py-4 px-2 bg-gray-200 border-4 border-black rounded-lg"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="my-4 w-[1400px] py-4 px-2 bg-gray-200 border-4 border-black rounded-lg"
          placeholder="Enter your password"
        />
      </div>
      <div>
        <button
          className="border-4 border-black w-[1400px] py-4 text-white rounded-lg hover:bg-white hover:text-black"
          type="submit"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
