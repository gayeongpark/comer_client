import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function BookedExperience() {
  const { userId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use useNavigate here
  const authUser = useSelector((state) => state.authUser.value);

  useEffect(() => {
    // Define a function to fetch the booking data
    const fetchBookings = async () => {
      try {
        // Make an HTTP request to your backend API to fetch bookings for the specified user
        const response = await axios.get(
          `/experiences/bookedExperience/${userId}`
        );
        // Set the bookings in the state
        setBookings(response.data.bookings);
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };
    // Call the function to fetch bookings when the component mounts
    fetchBookings();
  }, [userId]);
  // console.log(bookings);

  const cancelBooking = async (bookingId) => {
    console.log(bookingId);
    // Display a confirmation dialog to ensure the user wants to cancel the booking
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (confirmCancel) {
      try {
        // Make an HTTP request to your backend to cancel the booking
        await axios.delete(`/experiences/cancel-booking/${bookingId}`);
        // Remove the canceled booking from the state or reload the bookings
        // You may need to update the bookings state accordingly
        navigate("/"); // Redirect to the home page to make user explore more posts.
      } catch (error) {
        console.error("Failed to cancel the booking:", error);
        // Handle the error, e.g., display an error message to the user
      }
    }
  };
  return (
    <main>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 overflow-hidden bg-white py-5 sm:rounded-lg">
          {bookings.map((bookingGroup, groupIndex) => (
            <article key={groupIndex}>
              {bookingGroup.booking
                .filter((booking) => booking.userEmail === authUser.email)
                .map((booking, index) => (
                  <div
                    key={index}
                    className="flex justify-between mx-auto max-w-2xl p-5 ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none"
                  >
                    <p className="flex text-xl items-center justify-center">
                      {booking.date.split("T")[0]}
                    </p>
                    <p className="flex text-lg items-center justify-center">
                      {booking.startTime} - {booking.endTime}
                    </p>
                    {/* <Link to={`/product/${post._id}`}> */}
                    <Link to={`/product/${booking.experienceId}`}>
                      <p className="flex text-2xl items-center justify-center">
                        {booking.experienceTitle}
                      </p>
                    </Link>
                    <div>
                      <button
                        className="flex rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        onClick={() => cancelBooking(booking._id)}
                      >
                        Cancel booking
                      </button>
                    </div>
                  </div>
                ))}
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
