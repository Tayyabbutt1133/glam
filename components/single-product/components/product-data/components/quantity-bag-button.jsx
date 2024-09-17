"use client";
import { useState } from "react";
import { useCartStore } from '../../../../../states/Cardstore';

export default function QuantityBag({product}) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();
  // Handle decrease button click
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Handle increase button click
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Handle Add to Bag button click
  const handleAddToBag = () => {
    alert(`Added ${quantity} items to the bag!`);
    // Add further logic like dispatching an action or API call here
   
    addToCart(product, quantity);
  };

  return (
    <section className="flex items-center space-x-4 h-12 mb-4">
      {/* Quantity Selector */}
      <div className="flex h-full w-full justify-center max-w-32 items-center border border-gray-300 rounded-md">
        <button onClick={decreaseQuantity} className="px-3 py-1 text-xl">
          -
        </button>
        <div className="w-10 text-center py-1 text-xl">{quantity}</div>
        <button onClick={increaseQuantity} className="px-3 py-1 text-xl">
          +
        </button>
      </div>

      {/* Add to Bag Button */}
      <button
        onClick={handleAddToBag}
        className="bg-black text-white py-2 px-6 w-full h-full rounded-md uppercase text-sm tracking-wide hover:bg-hover"
      >
        Add to Bag
      </button>
    </section>
  );
}
