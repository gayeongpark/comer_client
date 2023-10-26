import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../redux/authSlice";

export default function Delete() {
  const [message, setMessage] = useState("");
  const authUser = useSelector((state) => state.authUser.value);
  console.log(authUser);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`/users/delete/${authUser.id}`);
      setMessage(response.data);
      dispatch(setAuthUser(response));
      setTimeout(() => {
        window.location.href = "http://localhost:3000/signup";
      }, 3000); // Redirect after 3 seconds
    } catch (error) {
      setMessage(error.response.data);
    }
  };

  return (
    <div className="isolate bg-white py-24 px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Delete your account?
        </h1>
        <p className="mt-7 text-lx text-red leading-8 text-gray-600">
          {message && message}
        </p>
        <div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="mt-8 w-full justify-center text-white bg-red-700 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-semibold rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
          >
            Delete
          </button>

          <button
            type="button"
            className="mt-8 w-full justify-center text-gray-700 bg-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-semibold rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
