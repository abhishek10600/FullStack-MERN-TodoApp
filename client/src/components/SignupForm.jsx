import { useState } from "react";
import axios from "axios";
import FormData from "form-data";
import { useNavigate } from "react-router-dom";
const SignupForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState([]);
  const [error, setError] = useState(false);
  const handleSignupFormSubmit = async (ev) => {
    ev.preventDefault();
    if (password === confirmPassword) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("photo", image[0]);
      const res = await axios.post(
        "http://localhost:4000/api/v1/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success === true) {
        navigate("/login");
      }
    } else {
      setError(true);
    }
  };
  return (
    <form
      className="bg-violet-800 mt-[40px] flex flex-col items-center justify-center rounded-lg mx-[220px] py-[20px]"
      onSubmit={handleSignupFormSubmit}
    >
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="my-4 w-[1400px] py-4 px-2 bg-gray-200 border-4 border-black rounded-lg"
          placeholder="Enter your name"
        />
      </div>
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
          placeholder="Create a strong password"
        />
      </div>
      <div>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="my-4 w-[1400px] py-4 px-2 bg-gray-200 border-4 border-black rounded-lg"
          placeholder="Please confirm your password"
        />
      </div>
      <div>
        <div className="relative bg-gray-200 px-4 py-4 border-4 border-black mb-4 cursor-pointer">
          <input
            type="file"
            name="photo"
            onChange={(e) => setImage(e.target.files)}
            className="cursor-pointer absolute opacity-0"
          />
          Upload Profile Pic
        </div>
      </div>
      <div>
        <button
          className="border-4 border-black w-[1400px] py-4 text-white rounded-lg hover:bg-white hover:text-black"
          type="submit"
        >
          Signup
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
