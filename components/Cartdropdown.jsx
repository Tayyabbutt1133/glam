"use client";

import { useCartStore } from "../states/Cardstore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { jost } from "./ui/fonts";

import { usePopupStore } from "../states/use-popup-store";

export default function Cartdropdown() {
  const { cartItems, removeFromCart, updateQuantity} = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(true)
  const { rate, currencySymbol } = usePopupStore();
  
  const dropdownRef = useRef(null);

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      const price = parseFloat(item.price);
      return acc + (isNaN(price) ? 0 : price) * item.quantity;
    }, 0);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsCartOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getItemSize = (item) => {
    const sizeAttribute = item.attributes.find(
      (attr) => attr.name === "Size" || attr.slug === "Size"
    );
    return sizeAttribute && sizeAttribute.options.length > 0
      ? sizeAttribute.options[0]
      : "N/A";
  };

  if (!isCartOpen) return null;

  const handleViewBag = () => {
    setIsCartOpen(false);
    
  };
  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 mt-2 w-[90vw] sm:w-[450px] bg-white shadow-lg rounded-md overflow-hidden z-[100] border border-gray-200 max-h-[80vh] flex flex-col"
    >
      <div className="p-4 border-b border-gray-200">
        <h2 className={`text-xl font-normal ${jost.className}`}>
          Your Bag ({cartItems.length})
        </h2>
      </div>
      <div className="flex-grow overflow-y-auto">
        {cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item) => {
              // console.log(item)
              const image = item.images ? item.images[0].src : item.image.src;
              return (
                <li key={item.id} className="p-4 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className="w-28 flex flex-col items-center">
                        <Image
                          src={image} //changes here
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-md object-cover"
                        />
                        <button
                          className={`text-sm font-medium text-[#8B929D] hover:text-black mt-2 ${jost.className}`}
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="ml-4">
                        <Link href={`/product/${item.id}`}>
                          <h3
                            className={`font-semibold text-base ${jost.className} cursor-pointer`}
                          >
                            {item.name}
                          </h3>
                        </Link>
                        <p
                          className={`text-sm text-black ${jost.className} mt-1`}
                        >
                          Shade:{" "}
                          {item?.attributes.find((attr) => attr.name === "Shade")
                            ?.options[0] || "N/A"}
                        </p>
                        <p className={`text-sm text-black ${jost.className}`}>
                          Size: {getItemSize(item)}
                        </p>
                        <div className="flex items-center mt-2">
                          <button
                            className="text-sm bg-gray-200 px-2 py-1 rounded"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                          >
                            -
                          </button>
                          <span className="text-sm mx-2">{item.quantity}</span>
                          <button
                            className="text-sm bg-gray-200 px-2 py-1 rounded"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <p
                      className={`font-medium text-lg mt-24 ${jost.className}`}
                    >
                      {currencySymbol}
                      {(parseFloat(item.price * rate) * item.quantity).toFixed(
                        2
                      )}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-center text-gray-500 p-4">Your bag is empty.</p>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex justify-between text-lg font-semibold mb-4">
            <p className={`${jost.className} font-semibold`}>
              Estimated Subtotal ({cartItems.length}):
            </p>
            <p className={`${jost.className} font-medium`}>
              {currencySymbol}
              {parseFloat(calculateSubtotal() * rate).toFixed(2)}
            </p>
          </div>
          <Link href="/mybag" className="block">
            <button
              onClick={handleViewBag}
              className={`w-full bg-black text-white py-3 rounded-md text-center text-base font-semibold hover:bg-[#CF8562] transition duration-200 ${jost.className}`}
            >
              VIEW BAG
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
