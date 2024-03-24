import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { FaSearchLocation } from "react-icons/fa";
// import { AddressAutofill } from "@mapbox/search-js-react";

// import { FaCalendarDay } from "react-icons/fa";
// import "react-date-range/dist/styles.css"; // main style file
// import "react-date-range/dist/theme/default.css"; // theme css files
// import { DateRangePicker } from "react-date-range";
// import { format } from "date-fns";

export default function Header() {
  // const [openDate, setOpenDate] = useState(false); // State to manage date picker visibility
  // const [openOptions, setOpenOptions] = useState(false); // State to manage options dropdown visibility
  const [cityName, setCityName] = useState("");
  const navigate = useNavigate();
  // const [options, setOptions] = useState({
  //   adults: 1,
  //   children: 0,
  // });
  // State to manage the number of adults and children
  // const [date, setDate] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     key: "selection",
  //   },
  // ]); // State to manage selected date range
  // The object represents the initial date range selection with two properties

  // // Define a function to handle changes in the number of adults or children
  // const handleOption = (name, operation) => {
  //   // name is to specify where I am handling adult or children options
  //   // operation is to indicate where I want to decrease or increase for the specified option
  //   setOptions((prev) => {
  //     // setOptions is used to update the options state variable. It takes the previous state (prev) as argument and returns a new state based on the operation.
  //     return {
  //       ...prev,
  //       // It is to create a shallow copy of the previous state object.
  //       // it's important to create a new object that includes the properties of the previous state.
  //       [name]:
  //         operation === "increase" ? options[name] + 1 : options[name] - 1,
  //       // If the operation is "increase," it increments the count for the specified name (adults or children) by 1.
  //     };
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Check if cityName needs transformation
    const needsTransformation =
      cityName !==
      cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();

    // Apply transformation if needed
    const transformedCityName = needsTransformation
      ? cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase()
      : cityName;
    // console.log("Submitting form with data:", {
    //   cityName: transformedCityName,
    //   // dates: date[0],
    //   // options,
    // }); // Log the captured data
    navigate(
      "/searchExperience/" + transformedCityName
      // {
      //   startDate: format(date[0].startDate, "yyyy-MM-dd"),
      //   endDate: format(date[0].endDate, "yyyy-MM-dd"),
      // }
    ); // Programmatically navigate with state
  };

  return (
    <header className="relative bg-white">
      <section className="pt-20 pb-50 sm:pt-24 sm:pb-30 lg:pt-40 lg:pb-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="font text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Enjoy foods and explore cultures
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              No longer grab a bite alone! Just make friends and explore new
              cultures having delicious foods you like.
            </p>
          </div>
          <div>
            <div className="mt-10">
              <form
                className="flex w-full mx-auto px-4 py-2 bg-white border rounded-full shadow-md text-gray-700"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-grow items-center">
                  <label htmlFor="locationInput" className="text-gray-300">
                    <FaSearchLocation className="font-bold text-xl" />
                  </label>
                  {/* <AddressAutofill
                    accessToken={process.env.REACT_APP_MAPBOXAPIKEY}
                  > */}
                  <input
                    type="text"
                    name="city"
                    // autocomplete="address-level2"
                    placeholder="Please input city name"
                    className="flex-1 ml-3 text-lg py-2 text-gray-700 placeholder-gray-500 border-none outline-none focus:ring-0 rounded"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                  />
                  {/* </AddressAutofill> */}
                </div>
                {/* <div className="border-l border-gray-300"></div>
                <section className="flex text-lg items-center gap-1.5">
                  <label htmlFor="dateInput" className="text-gray-300">
                    <FaCalendarDay />
                  </label>
                  <span
                    onClick={() => setOpenDate(!openDate)}
                    className="text-gray-400 cursor-pointer"
                  > */}
                {/* {`${format(date[0].startDate, "yyyy-MM-dd")} to 
  ${format(date[0].endDate, "yyyy-MM-dd")}`} */}
                {/* The format function is used to format the date objects into a readable string representation. */}
                {/* </span> */}
                {/* {openDate && (
                    <div className="z-40">
                      <DateRangePicker
                        rangeColors={["#b91c1c"]}
                        onChange={(item) => setDate([item.selection])}
                        // This line is using the state updater function setDate to update the date state.
                        // It sets the date state to an array containing the selected date range (item.selection).
                        // This will cause a re-render of this component with the new selected date range.
                        minDate={new Date()}
                        // This property sets a minimum date for the date picker.
                        // Users won't be able to select dates earlier than the current date.
                        ranges={date}
                        // The ranges property receives the current date state.
                        // This determines the initially selected date range in the picker.
                        className="absolute top-16"
                      />
                    </div>
                  )} */}
                {/* </section> */}
                <button
                  type="submit"
                  className="ml-3 p-4 bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
                >
                  <GoSearch className="text-white font-bold text-xl" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}
