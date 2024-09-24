"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { jost, lexendDeca } from "../../../components/ui/fonts";

const StickyProductBar = ({ product, addToCart }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);

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

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 flex items-center justify-between z-50">
      <div className="flex items-center">
        <Image
          src={product.images[0].src}
          alt={product.name}
          width={50}
          height={50}
          className="object-cover mr-4"
        />
        <div>
          <h3 className={`text-sm font-semibold ${jost.className}`}>{product.name}</h3>
          <p className={`text-lg font-bold ${lexendDeca.className}`}>${product.price}</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="mr-4">
          <button 
            className="px-2 py-1 border rounded-l"
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
          >
            -
          </button>
          <input 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-12 text-center border-t border-b"
          />
          <button 
            className="px-2 py-1 border rounded-r"
            onClick={() => setQuantity(q => q + 1)}
          >
            +
          </button>
        </div>
        <button
          className={`bg-black text-white px-4 py-2 rounded ${jost.className}`}
          onClick={() => addToCart(product, quantity)}
        >
          ADD TO BAG
        </button>
        <button className="ml-2 p-2 border rounded">
          <Heart size={20} />
        </button>
      </div>
    </div>
  );
};

export default StickyProductBar;