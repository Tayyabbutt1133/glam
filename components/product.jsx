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
    return (
      attributes.find((attr) => attr.name === "Brand")?.options[0] ||
      "Unknown Brand"
    );
  };

  const addToCart = useCartStore((state) => state.addToCart);

  const isOnSale = product.on_sale;
  const isOutlet = product.meta_data.find(
    (meta) => meta.key === "outlet_price",
  );
  const rrp =
    parseFloat(product.regular_price) || parseFloat(product.price) || 0;
  const salePrice = parseFloat(product.sale_price) || 0;
  const outletPrice = isOutlet ? parseFloat(isOutlet.value) || 0 : null;
  const currentPrice = outletPrice || salePrice || rrp;
  const discountAmount = Math.max(0, rrp - currentPrice);

  const formatPrice = (price) => {
    return isNaN(price) || price === 0
      ? "N/A"
      : `${currencySymbol}${(price * rate).toFixed(2)}`;
  };

  return (
    <div className="relative flex h-full border border-[#EFEFEF] rounded-lg duration-300">
      <Link href={`/product/${product.id}`} className="flex flex-col h-full w-full">
        <div className="flex flex-col h-full p-2">
          {/* Product tag */}
          {isOnSale && (
            <div className="grid place-items-center absolute top-2 left-2 bg-sale text-white text-xs font-bold h-16 w-16 rounded-full">
              <span className={`2xl:text-base font-normal ${lexendDeca.className}`}>
                SALE
              </span>
            </div>
          )}
          {isOutlet && (
            <div className="grid place-items-center absolute top-2 left-2 bg-black text-white text-xs font-bold h-16 w-16 rounded-full">
              <span className={`2xl:text-base font-normal ${lexendDeca.className}`}>
                OUTLET
              </span>
            </div>
          )}
          
          {/* Favourite button */}
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

          <div className="flex flex-col h-full">
            <Image
              width={250}
              height={250}
              className="object-contain w-full h-[250px] mb-4"
              src={product.images[0]?.src || "/placeholder.svg?height=250&width=250"}
              alt={sanitizeText(product.images[0]?.alt || product.name)}
            />

            <div className="flex flex-col flex-grow">
              <p className={`text-gray-900 uppercase font-bold text-sm 2xl:text-[20px] ${jost.className}`}>
                {getBrandName(product.attributes)}
              </p>
              <h2 className={`text-gray-900 mt-2 font-normal text-sm 2xl:text-[19px] ${lexendDeca.className} line-clamp-2 leading-normal 2xl:leading-relaxed flex-grow`}>
                {sanitizeText(product.name)}
              </h2>
              <div className="flex items-center mt-2 mb-2 2xl:mt-4">
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

            {discountAmount > 0 && (
              <div className="flex items-center flex-wrap text-[#8B929D] text-xs lg:text-sm xl:text-base 2xl:text-lg font-normal mb-1">
                <span className={`line-through mr-2 flex ${lexendDeca.className}`}>
                  <span className="hidden mr-1 sm:block">RRP: </span>
                  {formatPrice(rrp)}
                </span>
                <span className={`flex justify-center ${outletPrice ? "text-black" : salePrice ? "text-sale" : ""} items-center ${lexendDeca.className}`}>
                  Save {formatPrice(discountAmount)}
                </span>
              </div>
            )}
            <p className={`text-gray-900 font-bold text-lg mb-2 ${lexendDeca.className}`}>
              {formatPrice(currentPrice)}
            </p>
            <button
              className={`w-full ${product.stock_quantity === null ? "bg-gray-300 text-gray-400" : "bg-black text-white hover:bg-hover"} py-2 text-sm rounded-lg font-normal transition duration-200 ${lexendDeca.className}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product);
              }}
              disabled={product.stock_quantity === null}
            >
              {product.stock_quantity === null ? "OUT OF STOCK" : "ADD TO BAG"}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}