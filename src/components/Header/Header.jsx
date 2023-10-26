import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import { FaSearchLocation } from "react-icons/fa";
import { RiSubtractFill } from "react-icons/ri";
import { RiAddFill } from "react-icons/ri";
import { FaCalendarDay } from "react-icons/fa";
import { SlPeople } from "react-icons/sl";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css files
import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";

export default function Header() {
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adults: 0,
    children: 0,
  });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]:
          operation === "increase" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Enjoy foods and explore cultures
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              No longer grab a bite alone! Just make friends and explore new
              cultures having delicious foods you like.
            </p>
          </div>
          <div>
            <div className="mt-10">
              <div className="flex relative justify-between px-2 pl-7 py-1 items-center text-center w-4/5 h-auto shadow-md shadow-gray-400 bg-white border rounded-full sm:text-xs">
                <div className="flex text-lg items-center gap-0.3">
                  <FaSearchLocation className="text-gray-300" />
                  <input
                    type="text"
                    placeholder="Where are you now?"
                    className="border-none outline-none sm:placeholder-opacity-25 focus:border-none focus:outline-none focus:ring-0"
                  />
                </div>
                <div className="border-l border-gray-300"></div>
                <div className="flex text-lg items-center gap-1.5">
                  <FaCalendarDay className="text-gray-300" />
                  <span
                    onClick={() => setOpenDate(!openDate)}
                    className="text-gray-400 cursor-pointer"
                  >
                    {`${format(date[0].startDate, "MM/dd/yyyy")} to 
                    ${format(date[0].endDate, "MM/dd/yyyy")}`}
                  </span>
                  {openDate && (
                    <div className="z-40">
                      <DateRangePicker
                        rangeColors={["#b91c1c"]}
                        onChange={(item) => setDate([item.selection])}
                        minDate={new Date()}
                        ranges={date}
                        className="absolute top-16"
                      />
                    </div>
                  )}
                </div>

                <div className="border-l border-gray-300"></div>
                <div className="flex text-lg items-center gap-1.5">
                  <SlPeople className="text-gray-300" />
                  <span
                    onClick={() => setOpenOptions(!openOptions)}
                    className="text-gray-400 cursor-pointer"
                  >{`${options.adults} adult · ${options.children} children`}</span>
                  {openOptions && (
                    <div className="absolute top-16 bg-white border text-gray-400 rounded shadow-md">
                      <div className="flex w-30 justify-between m-8">
                        <span className="w-auto justify-between m-1">
                          Adult
                        </span>
                        <div className="flex items-center gap-7 text-xl text-gray-900 ml-5">
                          <button
                            onClick={() => handleOption("adults", "decrease")}
                            className="bg-red-700 p-1 flex-row-reverse rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
                            disabled={options.adults <= 1}
                          >
                            <RiSubtractFill className="text-white font-bold text-xl" />
                          </button>
                          <span>{options.adults}</span>
                          <button
                            onClick={() => handleOption("adults", "increase")}
                            className="bg-red-700 p-1 flex-row-reverse rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
                          >
                            <RiAddFill className="text-white font-bold text-xl" />
                          </button>
                        </div>
                      </div>
                      <div className="flex w-30 m-6 justify-between">
                        <span>Children</span>
                        <div className="flex items-center gap-7 text-xl text-gray-900 ml-5">
                          <button
                            onClick={() => handleOption("children", "decrease")}
                            className="bg-red-700 p-1 flex-row-reverse rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
                            disabled={options.children <= 0}
                          >
                            <RiSubtractFill className="text-white font-bold text-xl" />
                          </button>
                          <span>{options.children}</span>
                          <button
                            onClick={() => handleOption("children", "increase")}
                            className="bg-red-700 p-1 flex-row-reverse rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
                          >
                            <RiAddFill className="text-white font-bold text-xl" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <button className="flex bg-red-700 p-4 flex-row-reverse rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2">
                  <GoSearch className="text-white font-bold text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
