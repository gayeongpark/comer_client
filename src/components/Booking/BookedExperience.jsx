import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BookedExperience() {
  const { userId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define a function to fetch the booking data
    const fetchBookings = async () => {
      try {
        // Make an HTTP request to your backend API to fetch bookings for the specified user
        const response = await axios.get(
          `/experiences/BookedExperience/${userId}`
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
  console.log(bookings);

  return (
    <div>
      <h1>BookedExperience</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <></>
        //     <div className="mx-auto mb-20 max-w-5xl px-4 sm:px-6 lg:px-8 overflow-hidden bg-white py-5 sm:rounded-lg">
        //     {userPosts.map((post) => (
        //       <div
        //         key={post._id}
        //         className="flex justify-between mx-auto max-w-2xl p-5 ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none"
        //       >
        //         <div className="flex text-2xl items-center justify-center">
        //           <h2>{post.title}</h2>
        //         </div>
        //         <div className="flex flex-col justify-between gap-4 items-center">
        //           <div>
        //             <Link to={"/myExperience/edit"} state={{ experience: post }}>
        //               <button className="flex rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
        //                 Edit
        //               </button>
        //             </Link>
        //           </div>
        //           <div>
        //             <button
        //               onClick={() => handleDelete(post._id)}
        //               disabled={loadingDelete} // disable button while loading
        //               className="flex rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        //             >
        //               {loadingDelete && deletingPostId === post._id ? (
        //                 <div className="flex rounded-md border border-transparent bg-red-700 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
        //                   <div role="status">
        //                     <svg
        //                       aria-hidden="true"
        //                       className="w-5 h-5 mr-2 text-white animate-spin dark:text-gray-600"
        //                       viewBox="0 0 24 24"
        //                     >
        //                       Processing
        //                     </svg>
        //                     <span className="sr-only">Loading...</span>
        //                   </div>
        //                 </div>
        //               ) : (
        //                 "Delete"
        //               )}
        //             </button>
        //           </div>
        //         </div>
        //       </div>
        //     ))}
        //   </div>
      )}
    </div>
  );
}
