import { useContext } from "react";
import InputBox from "../components/InputBox";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <div>
      {isLoggedIn && <InputBox />}
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
