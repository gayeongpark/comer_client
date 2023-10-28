import React, { useRef, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthNav from "./AuthNav";
import { Link } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [password1Visible, setPassword1Visible] = useState(false);
  const [password2Visible, setPassword2Visible] = useState(false);

  const togglePassword1 = () => {
    setPassword1Visible(!password1Visible);
  };
  const togglePassword2 = () => {
    setPassword2Visible(!password2Visible);
  };
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(watch("email"));
  const passwordValidate = useRef();
  passwordValidate.current = watch("password");
  const onSubmit = async (data) => {
    const user = {
      email: data.email,
      password: data.password,
      password2: data.password2,
    };
    // console.log(user);
    try {
      await axios.post("/auth/signup", user, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setSuccessMessage(
        "please check out yor email inbox to verify your email!"
      );
      navigate("/login");
    } catch (error) {
      setError(error.response.data);
    }
  };
  // console.log(error)
  return (
    <div>
      <AuthNav />
      <div className="isolate bg-white py-24 px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Create an Account
          </h1>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Explore thousands of experiences and make friends as a member.
          </p>
        </div>
        <form
          className="mx-auto mt-5 max-w-xl sm:mt-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
            <div className="sm:col-span-2" id="email">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2.5">
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  })}
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-700"
                />
                {errors.email && <div>* Email is required</div>}
              </div>
            </div>
            <div className="sm:col-span-2" id="password">
              <label className="block text-sm font-semibold leading-6 text-gray-900">
                Password
              </label>
              <div className="relative mt-2.5">
                <input
                  {...register("password", {
                    required: true,
                    minLength: 6,
                  })}
                  type={password1Visible === false ? "password" : "text"}
                  name="password"
                  id="password"
                  autoComplete="false"
                  className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-700"
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
                {errors.password && errors.password.type === "required" && (
                  <div>* Password is required</div>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <div>* Password should contain at least 6 characters</div>
                )}
              </div>
            </div>
            <div className="sm:col-span-2" id="password2">
              <label className="block text-sm font-semibold leading-6 text-gray-900">
                Password confirmation
              </label>
              <div className="relative mt-2.5">
                <input
                  {...register("password2", {
                    required: true,
                    validate: (value) => value === passwordValidate.current,
                  })}
                  type={password2Visible === false ? "password" : "text"}
                  name="password2"
                  id="password2"
                  autoComplete="false"
                  className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-700"
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
                {errors.password2 && errors.password2.type === "required" && (
                  <div>* Confirmed password is required</div>
                )}
                {errors.password2 && errors.password2.type === "validate" && (
                  <div>
                    * Password does not match with password confirmation
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-red-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
            >
              Continue
            </button>
            <div className="text-red-600 mt-2">{error && error}</div>
            <div className="text-red-600 mt-2">
              {successMessage && successMessage}
            </div>
            <div className="mx-auto max-w-2xl text-center">
              <p className="mt-8 text-md leading-8 text-gray-600">
                Alreay have an account?{" "}
                <Link to="/login">
                  <button>Log in</button>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
