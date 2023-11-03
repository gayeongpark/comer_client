import React, { useState } from "react";
import AuthNav from "./AuthNav";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import jwtInterceptor from "../../interceptors/axios";

export default function Reset() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { token } = useParams();
  const [password1Visible, setPassword1Visible] = useState(false);
  const [password2Visible, setPassword2Visible] = useState(false);

  const togglePassword1 = () => {
    setPassword1Visible(!password1Visible);
  };
  const togglePassword2 = () => {
    setPassword2Visible(!password2Visible);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = {
      token,
      password,
      password2,
    };
    try {
      await jwtInterceptor.post("/auth/resetPassword", response, {
        headers: { "content-Type": "application/json" },
        withCredentials: true,
      });
      setSuccessMessage(
        "The password has been successfully reset. Please hold on..."
      );
      setError("");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(error.response.data);
      setSuccessMessage("");
    }
  };
  return (
    <div>
      <div>
        <AuthNav />
        <div className="isolate bg-white py-24 px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Reset password
            </h1>
          </div>

          <form
            className="mx-auto mt-5 max-w-xl sm:mt-5"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
              <div className="sm:col-span-2" id="email">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="relative mt-2.5">
                  <input
                    type={password1Visible === false ? "password" : "text"}
                    name="password"
                    id="password"
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-700"
                    required
                  />
                  <div className="text-2xl absolute top-2 right-5 text-gray-300">
                    {password1Visible === false ? (
                      <BiHide onClick={togglePassword1} />
                    ) : (
                      <BiShow
                        className="text-gray-900"
                        onClick={togglePassword1}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2" id="email">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Password Confirmation
                </label>
                <div className="relative mt-2.5">
                  <input
                    type={password2Visible === false ? "password" : "text"}
                    name="password2"
                    id="password2"
                    autoComplete="off"
                    onChange={(e) => setPassword2(e.target.value)}
                    className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-700"
                    required
                  />
                  <div className="text-2xl absolute top-2 right-5 text-gray-300">
                    {password2Visible === false ? (
                      <BiHide onClick={togglePassword2} />
                    ) : (
                      <BiShow
                        className="text-gray-900"
                        onClick={togglePassword2}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-red-600 mt-2">{error && error}</div>
            <div className="text-red-600 mt-2">
              {successMessage && successMessage}
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-red-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
