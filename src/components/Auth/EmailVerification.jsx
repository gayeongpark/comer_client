import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function EmailVerification() {
  const { token } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEmailVerifiedData = async () => {
      try {
        const emailVerifiedData = await axios.get(`/auth/verifyEmail/${token}`);
        const verifiedUserData = emailVerifiedData.data;
        dispatch(verifiedUserData);
      } catch (error) {}
    };
    fetchEmailVerifiedData();
  }, [token, dispatch]);

  return (
    <div className="isolate bg-white py-24 px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Email verified
        </h1>
        <p className="mt-7 text-lg leading-8 text-gray-600">
          You email is verified! Explore our experiences and diverse cultures
          making friends.
        </p>
        <div>
          <Link to="/login">
            <button
              type="button"
              className="mt-8 w-full justify-center text-white bg-red-700 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-semibold rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
            >
              Go to Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
