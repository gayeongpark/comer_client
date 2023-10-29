import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { BsHeartFill } from "react-icons/bs";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Products() {
  const [newProductData, setNewProductData] = useState([]);

  const authUser = useSelector((state) => state.authUser.value);

  const handleMove = (direction, idx) => {
    let newSlideNumber;
    const updateState = [...newProductData];

    if (direction === "l") {
      newSlideNumber =
        newProductData[idx].slideNumber === 0
          ? newProductData[idx].files.length - 1
          : newProductData[idx].slideNumber - 1;
    } else if (direction === "r") {
      newSlideNumber =
        newProductData[idx].slideNumber === newProductData[idx].files.length - 1
          ? 0
          : newProductData[idx].slideNumber + 1;
    }

    updateState[idx].slideNumber = newSlideNumber;
    setNewProductData(updateState);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/experiences");
        const products = response.data;
        setNewProductData(
          products.map((product) => ({
            ...product,
            slideNumber: 0,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleLikes = async (productId) => {
    try {
      await axios.put(`/users/likes/${productId}`);
      setNewProductData((prevData) =>
        prevData.map((product) =>
          product._id === productId
            ? { ...product, isLiked: !product.isLiked }
            : product
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-16 sm:text-4xl">
            New this week
          </h1>
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {newProductData?.map((product, idx) => {
              // console.log('Product:', product);
              return (
                <div key={product._id} href={product.href} className="group">
                  <div className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                    <div className="w-full h-full flex transition-transform ease-in-out duration-700">
                      <img
                        src={product.files[product.slideNumber]}
                        alt="experiencesImage"
                        className="absolute block w-full h-full"
                      />
                      <div className="hidden group-hover:flex group-hover:opacity-100 mx-1 absolute top-0 bottom-0 left-0 items-center">
                        <button
                          onClick={() => {
                            // console.log('idx button clicked');
                            handleMove("l", idx);
                          }}
                          className="z-10 p-1 bg-gray-100 text-xl text-red-700 font-bold cursor-pointer rounded-full hover:bg-white"
                        >
                          <AiOutlineLeft className="mx-auto" />
                        </button>
                      </div>
                      <div className="hidden group-hover:flex group-hover:opacity-100 mx-1 absolute top-0 bottom-0 right-0 items-center">
                        <button
                          onClick={() => {
                            //console.log('right button clicked');
                            handleMove("r", idx);
                          }}
                          className="z-10 p-1 bg-gray-100 text-xl text-red-700 font-bold cursor-pointer rounded-full hover:bg-white"
                        >
                          <AiOutlineRight className="mx-auto" />
                        </button>
                      </div>
                    </div>
                    <div className="flex absolute justify-end mt-3 mr-4">
                      <button
                        className="flex absolute justify-end mt-2 mr-5 text-3xl text-red-700"
                        onClick={() => handleLikes(product._id)}
                      >
                        {product.likes.includes(authUser.id) ? (
                          <BsHeartFill />
                        ) : (
                          <BsHeartFill className="text-white" />
                        )}
                      </button>
                    </div>
                  </div>
                  <Link to={`/product/${product._id}`}>
                    <div>
                      <h1 className="mt-2 text-xl text-gray-700">
                        {product.title}
                      </h1>
                      <div className="flex-line flex-baseline">
                        <p className="inline mt-1 text-lg font-medium text-gray-900">
                          From {product.currency}
                          {product.price}
                        </p>
                        <p>
                          {product.city}, {product.country}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
