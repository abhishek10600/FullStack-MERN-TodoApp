import { useState } from "react";
import FormData from "form-data";
import axios from "axios";

const InputBox = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const handleSubmitButtonClick = async (ev) => {
    ev.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    const res = await axios.post(
      "http://localhost:4000/api/v1/tasks/createTask",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (res.data.success === true) {
      alert("Task created successfully");
    } else {
      setError("Some error");
    }
  };
  return (
    <div className="px-[200px]">
      <h1 className="text-5xl pt-[50px] text-center">Create Your Task</h1>
      <form
        className="bg-violet-800 mt-[40px] flex flex-col items-center justify-center h-[400px] rounded-lg"
        onSubmit={handleSubmitButtonClick}
      >
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="my-4 w-[1400px] py-4 px-2 bg-gray-200 border-4 border-black rounded-lg"
            placeholder="Enter title"
          />
        </div>
        <div>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="my-4 w-[1400px] py-4 px-2 bg-gray-200 border-4 border-black rounded-lg"
            placeholder="Enter description"
          ></textarea>
        </div>
        <div>
          <button
            className="border-4 border-black w-[1400px] py-4 text-white rounded-lg hover:bg-white hover:text-black"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputBox;
