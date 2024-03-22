import React from "react";
import { Link } from "react-router-dom";
import { BsHeartFill } from "react-icons/bs";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

// Skeleton component for the Products
export default function ProductsSK() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-16 sm:text-4xl">New this week</h1>
        {/* Placeholder for dynamically generated product list */}
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          <div className="group">
            <div className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
              {/* Placeholder for product image */}
              <span className="animate-pulse bg-gray-400 block h-full"></span>
              {/* Placeholder buttons for image navigation */}
              <div className="absolute inset-0 flex justify-between items-center px-3 py-2">
                <button className="opacity-0 group-hover:opacity-100">
                  <AiOutlineLeft className="text-xl text-red-700" />
                </button>
                <button className="opacity-0 group-hover:opacity-100">
                  <AiOutlineRight className="text-xl text-red-700" />
                </button>
              </div>
              {/* Placeholder for like button */}
              <div className="absolute right-0 top-0 p-2">
                <BsHeartFill className="text-3xl text-red-700 animate-pulse" />
              </div>
            </div>
            <Link to="#">
              {/* Placeholder for product details */}
              <div className="animate-pulse bg-gray-400 rounded h-6 w-3/4 mt-2"></div>
              <div className="animate-pulse bg-gray-400 rounded h-6 w-1/2 mt-2"></div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}


