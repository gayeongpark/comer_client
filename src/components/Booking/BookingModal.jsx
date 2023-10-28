import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function BookingModal({
  open,
  experienceId,
  dateMaxGuestPairId,
  onClose,
}) {
  const [experienceData, setExperienceData] = useState("");
  const authUser = useSelector((state) => state.authUser.value);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (open) {
          // Make an HTTP request to your back-end route using async/await
          const response = await axios.get(`/experiences/${experienceId}`);
          // Handle the response and set the data as needed
          setExperienceData(response.data);
        }
      } catch (error) {
        // Handle errors, e.g., show an error message
        console.error("Failed to fetch data from the back-end:", error);
      }
    };
    fetchData();
  }, [open, experienceId]);

  //   console.log(experienceData);
  //   console.log(dateMaxGuestPairId);

  if (!open) return null;

  const handleBookingPayment = async () => {
    try {
      // Fetch the client secret from your server
      await axios.post(
        `/experiences/booking/create-payment-intent`,
        {
          experienceId,
          dateMaxGuestPairId,
          userEmail: authUser.email,
          userId: authUser.id,
        },
        {
          headers: { "content-Type": "application/json" },
        }
      );
      navigate(`/BookedExperience/${authUser.id}`);

    } catch (error) {
      console.error("Failed to make a payment:", error);
      // Handle the error, e.g., display an error message to the user.
    }
  };

  return open ? (
    <div className="fixed bg-slate-200 inset-0 flex items-center justify-center">
      <div className="modalContainer">
        {experienceData ? (
          <>
            <img
              src={`http://localhost:8000/${experienceData.experience.files[0]}`}
              alt="coverImage"
              className="w-96 h-96 object-cover rounded-tl-md rounded-bl-md"
            />
            <div className="modalRight w-96">
              <p onClick={onClose} className="closeBtn absolute top-4 right-4">
                X
              </p>
              <div className="content text-center mt-10 p-6">
                <p className="font-semibold text-lg">
                  Do you want to book this experience?
                </p>
                <h1 className="text-3xl font-bold mb-2">
                  {experienceData.experience.title}
                </h1>

                {experienceData?.availability[0]?.dateMaxGuestPairs
                  .filter(
                    (dateMaxGuestPair) =>
                      dateMaxGuestPair._id === dateMaxGuestPairId
                  )
                  .map((filteredDateMaxGuestPair) => (
                    <div key={filteredDateMaxGuestPair._id}>
                      <div className="text-base font-bold mb-1">
                        Date: {filteredDateMaxGuestPair.date.split("T")[0]}
                      </div>
                      <div className="text-base font-bold mb-1">
                        Time: {filteredDateMaxGuestPair.startTime} -{" "}
                        {filteredDateMaxGuestPair.endTime}
                      </div>
                      <div className="text-base font-bold mb-1">
                        Price: {filteredDateMaxGuestPair.currency}
                        {filteredDateMaxGuestPair.price}
                      </div>
                      <div className="text-base font-bold">
                        Available Spots: {filteredDateMaxGuestPair.maxGuest}
                      </div>
                    </div>
                  ))}
              </div>

              <div className="flex justify-between p-6">
                <button
                  className="w-1/2 p-4 rounded-md font-bold bg-red-700 text-white mr-2"
                  onClick={handleBookingPayment}
                >
                  Book Now
                </button>
                <button
                  onClick={onClose}
                  className="w-1/2 p-4 border-2 rounded-md border-red-700 font-bold ml-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  ) : null;
}
