import axios from "axios";
import React, { useState } from "react";

const TaskCard = ({ id, title, description, isComplete, setRefresh }) => {
  const [error, setError] = useState(false);
  const handleCompleteCheckboxChange = async (id) => {
    const res = await axios.put(
      `http://localhost:4000/api/v1/tasks/update/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
    alert("Task updated successfully");
    setRefresh((prev) => !prev);
  };
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
      setRefresh((prev) => !prev);
      alert("Task deleted successfully");
    } else {
      setError(true);
    }
  };
  return (
    <div className="bg-violet-800 flex items-center justify-between text-white rounded-lg">
      <div className="content mx-4 py-4">
        <h2 className="text-2xl">{title}</h2>
        <p className="">{description}</p>
      </div>
      <div className="features flex items-center justify-center gap-4 mx-4">
        <div>
          <input
            type="checkbox"
            checked={isComplete}
            onChange={() => handleCompleteCheckboxChange(id)}
            className="mx-1"
          />
          Completed
        </div>
        <div>
          <button
            className="bg-red-900 py-2 px-2"
            onClick={() => handleDeleteButtonClick(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
