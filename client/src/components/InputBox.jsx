const InputBox = () => {
  return (
    <div className="px-[200px]">
      <h1 className="text-5xl pt-[50px] text-center">Create Your Task</h1>
      <form className="bg-violet-800 mt-[40px] flex flex-col items-center justify-center h-[400px] rounded-lg">
        <div>
          <input
            type="text"
            className="my-4 w-[1400px] py-4 px-2 bg-gray-200 border-4 border-black rounded-lg"
            placeholder="Enter title"
          />
        </div>
        <div>
          <textarea
            rows={5}
            className="my-4 w-[1400px] py-4 px-2 bg-gray-200 border-4 border-black rounded-lg"
            placeholder="Enter description"
          ></textarea>
        </div>
        <div>
          <button className="border-4 border-black w-[1400px] py-4 text-white rounded-lg hover:bg-white hover:text-black">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputBox;
