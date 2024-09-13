import React from "react";
import Image from "next/image";

import bourjois from "/public/frequently-bought/bourjois.png";
import laColors from "/public/frequently-bought/la-colors.png";
import benefits from "/public/frequently-bought/benefits.png";

const products = [
  {
    brand: "BOURJOIS",
    name: "Bourjois 2 in 1 Khol & Contour Eyeliner, Eye Pencil",
    image: bourjois,
    originalPrice: "£12.00",
    salePrice: "£8.40",
  },
  {
    brand: "LA COLORS",
    name: "5 Color Matte Eyeshadow",
    image: laColors,
    salePrice: "£2.99",
  },
  {
    brand: "BENEFIT",
    name: "benefit BADgal BANG 24hr Eye Pencil 0.25g - Pitch Black",
    image: benefits,
    originalPrice: "£22.50",
    salePrice: "£20.25",
  },
];

export default function FrequentlyBoughtTogether() {
  return (
    <div className="max-w-6xl mx-auto pt-8">
      <h2 className="text-3xl font-bold mb-6">Frequently Bought Together</h2>

      {/* container */}
      <div className="flex flex-row justify-between w-full gap-8">
        {products.map((product, index) => (
          <div key={index} className="relative flex w-full max-w-[222px]">
            <div key={index} className="flex flex-col w-full">
              <Image
                src={product.image}
                alt={product.name}
                className="w-full object-contain mb-4"
              />
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-lg mb-3">{product.brand}</h3>
                <p className="text-sm mb-1">{product.name}</p>
                <div className="mb-3">
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through mr-2">
                      {product.originalPrice}
                    </span>
                  )}
                  <span className="text-red-600 font-bold">
                    {product.salePrice}
                  </span>
                </div>
              </div>
              <button className="w-full bg-gray-900 hover:bg-hover ease duration-100 text-white py-2 mt-auto rounded-md">
                ADD TO BAG
              </button>
            </div>

            {/* Render "+" icon between products */}
            {index < products.length - 1 && (
              <div className="hidden absolute -right-[2rem] top-[100px] md:block text-4xl font-extralight text-gray-500">
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
