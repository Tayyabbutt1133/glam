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
  const { rate, currencySymbol } = usePopupStore();

  const handleProductClick = (productId) => {
    console.log(`Product clicked: ${productId}`);
  };

  const handleFavoriteClick = (productId, event) => {
    event.preventDefault();
    event.stopPropagation();
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [productId]: !prevFavorites[productId],
    }));
  };

  const sanitizeText = (text) => {
    return text
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  };

  const getBrandName = (attributes) => {
    const brandAttr = attributes.find((attr) => attr.name === "Brand");
    return brandAttr
      ? brandAttr.options[0] || "Unknown Brand"
      : "Unknown Brand";
  };

  const addToCart = useCartStore((state) => state.addToCart);

  const discountAmount = product.regular_price && product.price
    ? Number(product.regular_price) - Number(product.price)
    : 0;

  return (
    <div className="w-[95%] h-[500px] border border-gray-100 rounded-lg overflow-hidden  transition-shadow duration-300">
      <Link href={`/product/${product.id}`}>
        <div
          className="bg-white flex flex-col h-full cursor-pointer"
          onClick={() => handleProductClick(product.id)}
        >
          <div className="relative h-[250px]">
            {product.on_sale && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                SALE
              </div>
            )}
            <div className="absolute top-2 right-2">
              <button
                className="focus:outline-none"
                onClick={(e) => handleFavoriteClick(product.id, e)}
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
              className="object-contain w-full h-full p-4"
              src={product.images[0]?.src}
              alt={sanitizeText(product.images[0]?.alt || product.name)}
            />
          </div>
          <div className="p-4 flex flex-col justify-between flex-grow">
            <div>
              <p className={`text-gray-900 font-bold text-sm mb-1 ${jost.className}`}>
                {getBrandName(product.attributes)}
              </p>
              <h2 className={`text-gray-900 font-normal text-sm ${lexendDeca.className} line-clamp-2 mb-2`}>
                {sanitizeText(product.name)}
              </h2>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, index) => (
                  <span key={index}>
                    {index < Math.round(product.average_rating) ? (
                      <FaStar className="text-[#7E7E7E] w-4 h-4" />
                    ) : (
                      <FaRegStar className="text-[#7E7E7E] w-4 h-4" />
                    )}
                  </span>
                ))}
                <span className="text-[#8B929D] text-xs ml-2">
                  ({product.rating_count})
                </span>
              </div>
            </div>
            <div>
              {discountAmount > 0 && (
                <div className="flex items-center flex-wrap text-[#8B929D] text-xs mb-1">
                  <span className={`line-through mr-2 flex ${lexendDeca.className}`}>
                    <span className="hidden sm:block">RRP: </span>
                    {currencySymbol}{Number(product.regular_price * rate).toFixed(2)}
                  </span>
                  <span className={`flex justify-center text-red-700 items-center ${lexendDeca.className}`}>
                    Save {currencySymbol}{(discountAmount * rate).toFixed(2)}
                  </span>
                </div>
              )}
              <p className={`text-gray-900 font-bold text-lg mb-2 ${lexendDeca.className}`}>
                {currencySymbol}{Number(product.price * rate).toFixed(2)}
              </p>
              <button
                className={`w-full bg-black text-white py-2 text-sm rounded-lg hover:bg-[#CF8562] font-normal transition duration-200 ${lexendDeca.className}`}
                onClick={(e) => {
                  e.preventDefault();
                e.stopPropagation();
                  addToCart(product);
                }}
              >
                ADD TO BAG
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}