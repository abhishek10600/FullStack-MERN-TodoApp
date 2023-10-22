import axios from "axios";
import React, { useState } from "react";

const TaskCard = ({ _id, title, description, isComplete }) => {
  const [error, setError] = useState(false);
  const handleDeleteButtonClick = async (id) => {
    const res = await axios.delete(
      `http://localhost:4000/api/v1/tasks/delete/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (res.data.success === true) {
      alert("Task deleted successfully");
    } else {
      setError(true);
    }
  };
  return (
    <div className="bg-violet-800 flex items-center justify-between text-white">
      <div className="content mx-4 py-4">
        <h2 className="text-2xl">{title}</h2>
        <p className="">{description}</p>
      </div>
      <div className="features flex items-center justify-center gap-4 mx-4">
        <div>
          <label htmlFor="complete">Completed</label>
          <input type="checkbox" id="complete" />
        </div>
        <div>
          <button
            className="bg-red-900 py-2 px-2"
            onClick={() => handleDeleteButtonClick(_id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
