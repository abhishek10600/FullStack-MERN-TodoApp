const SignupForm = () => {
  return (
    <form className="bg-violet-800 mt-[40px] flex flex-col items-center justify-center rounded-lg mx-[220px] py-[20px]">
      <div>
        <input
          type="text"
          className="my-4 w-[1400px] py-4 px-2 bg-gray-200 border-4 border-black rounded-lg"
          placeholder="Enter your name"
        />
      </div>
      <div>
        <input
          type="email"
          className="my-4 w-[1400px] py-4 px-2 bg-gray-200 border-4 border-black rounded-lg"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <input
          type="password"
          className="my-4 w-[1400px] py-4 px-2 bg-gray-200 border-4 border-black rounded-lg"
          placeholder="Create a strong password"
        />
      </div>
      <div>
        <input
          type="password"
          className="my-4 w-[1400px] py-4 px-2 bg-gray-200 border-4 border-black rounded-lg"
          placeholder="Please confirm your password"
        />
      </div>
      <div>
        <button className="border-4 border-black w-[1400px] py-4 text-white rounded-lg hover:bg-white hover:text-black">
          Signup
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
