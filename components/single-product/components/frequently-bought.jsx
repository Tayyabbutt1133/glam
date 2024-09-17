"use client"
import React from "react";
import Image from "next/image";

import bourjois from "/public/frequently-bought/bourjois.png";
import laColors from "/public/frequently-bought/la-colors.png";
import benefits from "/public/frequently-bought/benefits.png";
import ButtonAddToCart from "./product-data/ButtonAddtoCart";
import Link from "next/link";
import { usePopupStore } from "states/use-popup-store";

const products = [
  {
    id: 74150,
    brand: "BOURJOIS",
    name: "Bourjois 2 in 1 Khol & Contour Eyeliner, Eye Pencil",
    image: bourjois,
    images: [
      { src: bourjois.src, alt: "Bourjois 2 in 1 Khol & Contour Eyeliner" }
    ],
    originalPrice: "12.00",
    salePrice: "8.40",
    regular_price: "12.00",
    price: "8.40",
    attributes: [
      { name: "Shade", options: ["Black"] },
      { name: "Size", options: ["0.25g"] },
    ],
  },
  {
    id: 74150,
    brand: "LA COLORS",
    name: "5 Color Matte Eyeshadow",
    image: laColors,
    images: [
      { src: laColors.src, alt: "LA COLORS 5 Color Matte Eyeshadow" }
    ],
    salePrice: "2.99",
    regular_price: "2.99",
    price: "2.99",
    attributes: [
      { name: "Shade", options: ["Black"] },
      { name: "Size", options: ["0.25g"] },
    ],
  },
  {
    id: 74150,
    brand: "BENEFIT",
    name: "benefit BADgal BANG 24hr Eye Pencil 0.25g - Pitch Black",
    image: benefits,
    images: [
      { src: benefits.src, alt: "BENEFIT BADgal BANG 24hr Eye Pencil" }
    ],
    originalPrice: "22.50",
    salePrice: "20.25",
    regular_price: "22.50",
    price: "20.25",
    attributes: [
      { name: "Shade", options: ["Black"] },
      { name: "Size", options: ["0.25g"] },
    ],
  },
];
export default function FrequentlyBoughtTogether() {
  const { rate,currencySymbol } = usePopupStore();

  return (
    <div className="max-w-6xl mx-auto pt-8">
      <h2 className="text-2xl font-bold mb-4">Frequently Bought Together</h2>

      {/* container */}
      <div className=" flex  overflow-x-auto relative justify-between w-full gap-8 pb-6">
        {products.map((product, index) => (
          <div key={index} className=" relative flex flex-shrink-0 w-[190px] sm:w-[220px]  lg:w-[120px] xl:w-[170px] ">
            <div key={index} className="flex flex-col w-full">
             <Link href={`/product/${product.id}`}>
                <Image
                  
                  src={product.image}
                  alt={product.name}
                  className="w-full object-contain mb-4 h-[140px] lg:h-[150px] xl:h-[180px]"
                />
             </Link>
              <div className="flex flex-col gap-2 ">
               <Link href={`/product/${product.id}`}> <h3 className="font-bold cursor-pointer text-lg mb-3 lg:text-sm">{product.brand}</h3></Link>
                <p className="text-sm lg:text-xs flex-grow lg:line-clamp-2">{product.name}</p>
                <div className="mb-3 ">
                  {product.originalPrice && (
                    <span className="text-gray-500  lg:text-xs line-through mr-2">
                      {currencySymbol}{(product.originalPrice * rate).toFixed(2)}
                    </span>
                  )}
                  <span className="text-red-600 lg:text-xs font-bold">
                    {currencySymbol}{(product.salePrice * rate).toFixed(2)}
                  </span>
                </div>
              </div>
              {/* <button className="w-full bg-gray-900 hover:bg-hover ease duration-100 text-white py-2 mt-auto rounded-md">
                ADD TO BAG
              </button> */}
              <ButtonAddToCart product={product} />
              
            </div>

            {/* Render "+" icon between products */}
            {index < products.length - 1 && (
              <div className="flex items-center justify-end sm:justify-center w-8 text-4xl font-extralight text-gray-500  sm:flex">
                +
              </div>
            )}
          </div>
        ))}
      </div>
      {/* container */}
    </div>
  );
}
