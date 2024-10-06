"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Heart, ShoppingBag } from 'lucide-react';
import { jost, lexendDeca } from "../../../components/ui/fonts";

const StickyProductBar = ({ product, quantity, setQuantity, handleAddToBag }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible || !product) return null;

  const productImage = product.images && product.images.length > 0 ? product.images[0].src : "/placeholder.svg";

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Here you can add logic to save the favorite status to a backend or local storage
  };

  const formattedPrice = product.price ? `$${parseFloat(product.price).toFixed(2)}` : '';

  return (
    <div className="fixed bottom-0 hidden  left-0 right-0 bg-gradient-to-r from-white via-gray-100 to-white shadow-lg p-4 md:flex items-center justify-between z-50 h-28 transition-all duration-300 ease-in-out">
      <div className="flex items-center flex-1">
        <div className="relative w-20 h-20 mr-4 overflow-hidden rounded-lg shadow-md">
          <Image
            src={productImage}
            alt={product.name || "Product Image"}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div>
          <h3 className={`text-sm font-semibold ${jost.className} text-gray-800 line-clamp-2`}>{product.name || "Product Name"}</h3>
          <p className={`text-xs ${lexendDeca.className} text-gray-600`}>
            Price: <span className="font-semibold">{formattedPrice}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="inline-flex items-center justify-between border w-[140px] h-[45px] rounded-lg overflow-hidden">
          <button
            className="text-lg w-1/3 h-full text-gray-600 hover:bg-gray-100 focus:outline-none"
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
          >
            -
          </button>
          <span className={`text-lg w-1/3 text-center ${lexendDeca.className}`}>
            {quantity}
          </span>
          <button
            className="text-lg h-full w-1/3 text-gray-600 hover:bg-gray-100 focus:outline-none"
            onClick={() => setQuantity(q => q + 1)}
          >
            +
          </button>
        </div>
        <button
          className={`w-full bg-black justify-center items-center text-white py-3 px-8 gap-2 flex text-sm rounded-lg hover:bg-[#CF8562] font-normal transition duration-200 ${lexendDeca.className}`}
          onClick={handleAddToBag}
        >
          <ShoppingBag size={18} />
          <span>ADD TO BAG</span>
        </button>
        <button 
          className={`p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors ${isFavorite ? 'text-red-500' : 'text-gray-600'}`}
          onClick={toggleFavorite}
        >
          <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  );
};

export default StickyProductBar;