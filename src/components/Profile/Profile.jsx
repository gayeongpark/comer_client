import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import jwtInterceptor from "../../interceptors/axios";
import { setAuthUser } from "../../redux/authSlice";
import { Link, useParams } from "react-router-dom";
import ProfileSK from "./ProfileSK";
import "react-phone-input-2/lib/style.css";

export default function Profile() {
  const [openInputImage, setOpenInputImage] = useState(false);
  const [openInputName, setOpenInputName] = useState(false);
  const [openInputPhone, setOpenInputPhone] = useState(false);
  const [openInputAddress, setOpenInputAddress] = useState(false);
  const [openInputIntro, setOpenInputIntro] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [userProfile, setUserProfile] = useState("");

  const [formData, setFormData] = useState({
    firstName: userProfile?.firstName,
    lastName: userProfile?.lastName,
    phoneNumber: userProfile?.phoneNumber,
    country: userProfile?.country,
    city: userProfile?.city,
    province: userProfile?.province,
    zip: userProfile?.zip,
    street: userProfile?.street,
    profilePicture: userProfile?.profilePicture,
    description: userProfile?.description,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    setFormData((prevFormData) => ({
      ...prevFormData,
      profilePicture: file,
    }));
  };

  const authUser = useSelector((state) => state.authUser.value);

  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await jwtInterceptor.get(`/users/${id}`, {
          withCredentials: true,
        });
        setUserProfile(userData.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(true);
      }
    };
    fetchUserData();
  }, [id, authUser]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const update = await jwtInterceptor.put(`/users/update/${id}`, formData, {
        headers: {
          "content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      const updatedUserData = update.data;
      // console.log(updatedUserData);
      // console.log(userProfile.profilePicture);
      // console.log('Updated image path:', updatedUserData.profilePicture);
      dispatch(setAuthUser(updatedUserData));
      setFormData((prevFormData) => ({
        ...prevFormData,
        formData,
      }));
    } catch (error) {
      console.error("Error updating user:", error);
      dispatch(setAuthUser(false));
    }
  };

  return (
    <>
      {isLoading ? (
        <ProfileSK />
      ) : (
        <div className="mx-auto mb-20 max-w-7xl px-4 sm:px-6 lg:px-8 overflow-hidden bg-white py-5 sm:rounded-lg">
          <div className="px-4 py-6">
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              <Link to="/">Home</Link> &#60; Personal info
            </p>
            <h3 className="mt-10 mb-5 text-3xl font-semibold leading-6 text-gray-900">
              Personal info
            </h3>
          </div>

          <div className="w-2/3">
            <dl>
              <div className="border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Profile image
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <span className="inline-block justify-center h-36 w-36 mb-2 overflow-hidden rounded-full">
                    <img
                      alt="Update profileImage"
                      className="flex h-full w-full text-gray-300"
                      src={
                        userProfile.profilePicture
                          ? `http://localhost:8000/${userProfile.profilePicture}`
                          : "https://www.donut.app/assets/donut.png"
                      }
                    ></img>
                  </span>
                </dd>
                <dd className="mt-1 text-gray-900 sm:col-span-2 sm:mt-0">
                  <label htmlFor="profilePicture">
                    <span
                      className="font-medium text-red-600 cursor-pointer"
                      onClick={() => setOpenInputImage(!openInputImage)}
                    >
                      Upload image
                    </span>
                    <input
                      id="profilePicture"
                      type="file"
                      name="profilePicture"
                      accept="/image/*"
                      onChange={handleProfileImageChange}
                      className="sr-only"
                    />
                  </label>
                </dd>
                {/* <div className='font-medium text-red-600 cursor-pointer'>Edit</div> */}

                {openInputImage && (
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <div className="flex items-center space-x-4 mt-3">
                      <button
                        onClick={handleUpdateUser}
                        type="submit"
                        className="flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setOpenInputImage(false)}
                        className="inline-flex items-center px-6 py-2 text-md font-medium text-gray-900 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="font-xs text-red-600 mt-2">
                      please press save button
                    </div>
                  </dd>
                )}
              </div>
              <div className="border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Short introduction
                </dt>
                {userProfile && (
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {userProfile.description}
                  </dd>
                )}

                <div
                  onClick={() => setOpenInputIntro(!openInputIntro)}
                  className="font-medium text-red-600 cursor-pointer"
                >
                  Edit
                </div>
                {openInputIntro && (
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Short introduction
                    </label>
                    <textarea
                      type="text"
                      name="description"
                      id="description"
                      autoComplete="off"
                      value={formData.description}
                      onChange={handleChange}
                      className="mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                )}
                {openInputIntro && (
                  <div className="flex items-center space-x-4 mt-4">
                    <button
                      type="submit"
                      onClick={handleUpdateUser}
                      className="flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpenInputIntro(false)}
                      className="inline-flex items-center px-6 py-2 text-md font-medium text-gray-900 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              <div className="px-4 py-10 border-b sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Legal name
                </dt>
                {userProfile && (
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {userProfile.firstName} {userProfile.lastName}
                  </dd>
                )}

                <div
                  onClick={() => setOpenInputName(!openInputName)}
                  className="font-medium text-red-600 cursor-pointer"
                >
                  Edit
                </div>
                {openInputName && (
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      autoComplete="off"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                )}
                {openInputName && (
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Last name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      autoComplete="off"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                )}
                {openInputName && (
                  <div className="flex items-center space-x-4 mt-4">
                    <button
                      type="submit"
                      onClick={handleUpdateUser}
                      className="flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpenInputName(false)}
                      className="inline-flex items-center px-6 py-2 text-md font-medium text-gray-900 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                {userProfile && (
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {userProfile.email}
                  </dd>
                )}
              </div>
              <div className="border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Phone Number
                </dt>
                {userProfile && (
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {userProfile.phoneNumber}
                  </dd>
                )}
                <div
                  onClick={() => setOpenInputPhone(!openInputPhone)}
                  className="font-medium text-red-600 cursor-pointer"
                >
                  Edit
                </div>
                {openInputPhone && (
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone Number
                    </label>
                    <input
                      type="number"
                      name="phoneNumber"
                      id="phoneNumber"
                      autoComplete="off"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                )}
                {openInputPhone && (
                  <div className="flex items-center space-x-4 mt-4">
                    <button
                      type="submit"
                      onClick={handleUpdateUser}
                      className="flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpenInputPhone(false)}
                      className="inline-flex items-center px-6 py-2 text-md font-medium text-gray-900 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              <div className="border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                {userProfile.country ? (
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {userProfile.zip}, {userProfile.street},{" "}
                    {userProfile.province}, {userProfile.city},{" "}
                    {userProfile.country}
                  </dd>
                ) : (
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"></dd>
                )}

                <div
                  onClick={() => setOpenInputAddress(!openInputAddress)}
                  className="font-medium text-red-600 cursor-pointer"
                >
                  Edit
                </div>
                {openInputAddress && (
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      autoComplete="off"
                      value={formData.country}
                      onChange={handleChange}
                      className="mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                    ></input>
                  </div>
                )}
                {openInputAddress && (
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="province"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <input
                      type="text"
                      name="province"
                      id="province"
                      autoComplete="off"
                      value={formData.province}
                      onChange={handleChange}
                      className="mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                )}
                {openInputAddress && (
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="off"
                      value={formData.city}
                      onChange={handleChange}
                      className="mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                )}
                {openInputAddress && (
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="zip"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <input
                      type="number"
                      name="zip"
                      id="zip"
                      autoComplete="off"
                      value={formData.zip}
                      onChange={handleChange}
                      className="mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                )}
                {openInputAddress && (
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="street"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <input
                      type="text"
                      name="street"
                      id="street"
                      autoComplete="off"
                      value={formData.street}
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                )}
                {openInputAddress && (
                  <div className="flex items-center space-x-4 mt-4">
                    <button
                      type="submit"
                      onClick={handleUpdateUser}
                      className="flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpenInputAddress(false)}
                      className="inline-flex items-center px-6 py-2 text-md font-medium text-gray-900 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              <Link to={`/yourProfile/${authUser?.id}/delete`}>
                <div className="flex px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 cursor-pointer">
                  Do you want to delete your account?
                </div>
              </Link>
            </dl>
          </div>
        </div>
      )}
    </>
  );
}
