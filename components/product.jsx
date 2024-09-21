"use client";

import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaRegStar, FaStar } from "react-icons/fa";
import { jost, lexendDeca } from "./ui/fonts";
import Image from "next/image";
import { useCartStore } from "../states/Cardstore";
import { usePopupStore } from "../states/use-popup-store";
import Link from "next/link";



export default function Product({ product }) {
  const [favorites, setFavorites] = useState({});
  const { rate,currencySymbol } = usePopupStore();
// console.log(product)

  const handleProductClick = (productId) => {
    console.log(`Product clicked: ${productId}`);
  };

  const handleFavoriteClick = (productId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [productId]: !prevFavorites[productId],
    }));
  };

  const sanitizeText = (text) => {
    return text.replace(/&amp;/g, "&");
  };

  const getBrandName = (attributes) => {
    const brandAttr = attributes.find((attr) => attr.name === "Brand");
    return brandAttr
      ? brandAttr.options[0] || "Unknown Brand"
      : "Unknown Brand";
  };

  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div key={product.id} className=" mx-0 2xl:mx-0 mb-2">
      <div
        className="bg-white border border-gray-300 rounded-lg overflow-hidden relative flex flex-col h-full min-h-[392px] sm:min-h-[350px] md:min-h-[400px] w-[90%] cursor-pointer"
        onClick={() => handleProductClick(product.id)}
      >
        {product.on_sale && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            SALE
          </div>
        )}
        <div className="absolute top-2 right-2">
          <button
            className="focus:outline-none"
            onClick={() => handleFavoriteClick(product.id)}
          >
            {favorites[product.id] ? (
              <FaHeart className="text-red-500 w-6 h-6" />
            ) : (
              <CiHeart className="text-black w-6 h-6" />
            )}
          </button>
        </div>
        <Image
          width={250}
          height={250}
          className="object-contain p-4"
          src={product.images[0]?.src}
          alt={sanitizeText(product.images[0]?.alt || product.name)}
        />
        <div className="px-4 pb-4 flex-grow flex flex-col sm:min-h-[240px]">
          <p
            className={`text-gray-900 font-bold text-[16px] hidden sm:block mb-2 ${jost.className}`}
          >
            {getBrandName(product.attributes)}
          </p>
          <Link href={`/product/${product.id}`}>
            <h2
              className={`text-gray-900 font-normal text-sm ${lexendDeca.className} line-clamp-2 cursor-pointer`}
            >
              {sanitizeText(product.name)}
            </h2>
          </Link>
          <div className="flex items-center mb-3 mt-3">
            {[...Array(5)].map((_, index) => (
              <span key={index}>
                {index < Math.round(product.average_rating) ? (
                  <FaStar className="text-[#7E7E7E] w-4 h-4" />
                ) : (
                  <FaRegStar className="text-[#7E7E7E] w-4 h-4" />
                )}
              </span>
            ))}
            <span className="text-gray-600 text-sm ml-2">
              ({product.rating_count})
            </span>
          </div>
          <div className=" mt-auto flex items-center flex-col sm:flex-row text-gray-600 text-sm ">
            {product.regular_price && (
              <span className={`line-through mr-2 text-xs flex ${lexendDeca.className}`}>
                <span className=" hidden sm:block text-xs">RRP: </span>
                {currencySymbol}{Number(product.regular_price * rate).toFixed(2)}
              </span>
            )}
            {product.regular_price && product.price && (
              <span
                className={` flex  justify-center text-red-700 text-xs items-center  ${lexendDeca.className}`}
              >
                Save {currencySymbol}{Number((product.regular_price - product.price) * rate).toFixed(2)}
              </span>
            )}
          </div>
          <p
            className={`text-gray-900 font-bold mt-auto text-lg mb-3 ${lexendDeca.className}`}
          >
            {currencySymbol}{Number(product.price * rate).toFixed(2)}
          </p>
          <button
            className={`w-full bg-black text-white py-2 text-xs md:text-base mx-auto rounded-lg hover:[#CF8562] font-normal transition duration-200 flex justify-center items-center text-center ${lexendDeca.className}`}
            onClick={() => addToCart(product)}
          >
            ADD TO BAG
          </button>
        </div>
      </div>
    </div>
  );
}
