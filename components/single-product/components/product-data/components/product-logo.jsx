'use client'

import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { lexendDeca } from "../../../../ui/fonts";

export default function ProductLogo({ brand }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <section className="flex sm:justify-between items-center mb-5">
      <div className="text-2xl font-bold w-[90%] sm:w-auto">
        <span className={`text-sm md:text-3xl 2xl:text-4xl font-normal ${lexendDeca.className} block`}>
          {brand || 'LONDON'}
        </span>
      </div>
      <button 
        className="p-2 shadow-sm rounded-full focus:outline-none"
        onClick={toggleFavorite}
      >
        <Heart
          size={24}
          className={`${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
        />
      </button>
    </section>
  );
}