import { useCallback, useContext, useEffect, useState } from "react";
import InputBox from "../components/InputBox";
import { UserContext } from "../context/UserContext";
import TaskCard from "../components/TaskCard";
import axios from "axios";

const Home = () => {
  const [refresh, setRefresh] = useState(false);
  const { isLoggedIn } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(false);
  const getTasks = useCallback(async () => {
    const res = await axios.get("http://localhost:4000/api/v1/tasks/all", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    if (res.data.success === true) {
      setTasks(res.data.tasks);
    } else {
      setError(true);
    }
  }, []);
  useEffect(() => {
    getTasks();
  }, [refresh]);
  return (
    <div>
      {isLoggedIn && (
        <div>
          <InputBox refresh={refresh} setRefresh={setRefresh} />
          <hr className="mt-[50px]" />
          <div>
            <h1 className="text-center text-5xl mt-[50px]">Your Tasks</h1>
            <div className="flex justify-center items-center py-6">
              <div className="grid grid-cols-2 gap-10">
                {tasks.length > 0 &&
                  tasks?.map((task) => (
                    <TaskCard
                      key={task._id}
                      id={task._id}
                      title={task.title}
                      description={task.description}
                      isComplete={task.isComplete}
                      setRefresh={setRefresh}
                    />
                  ))}
              </div>
              {tasks.length === 0 && (
                <div className="mr-[100px] flex flex-col justify-center items-center">
                  <h3 className="text-red-500 text-3xl">No tasks found!</h3>
                  <p className="text-xl">Create a task.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {!isLoggedIn && (
        <div className="my-[100px]">
          <h3 className="text-center text-4xl">
            Please login to create your task
          </h3>
          <p className="text-center my-4">Please login to view your tasks</p>
          <hr />
        </div>
      )}
    </div>
  );
};

export default Home;
