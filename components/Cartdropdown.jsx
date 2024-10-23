"use client";

import { useCartStore } from "../states/Cardstore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { jost } from "./ui/fonts";
import { usePopupStore } from "../states/use-popup-store";

// Function to decode HTML entities
function decodeHTMLEntities(text) {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}

// Normalization function (same as in MyBag)
const normalizeCartItem = (item) => {
  const isGraphQLSchema = item.attributes?.nodes !== undefined;
  
  return {
    id: isGraphQLSchema ? item.databaseId : item.id,
    name: item.name,
    price: isGraphQLSchema 
      ? parseFloat(item.price.replace(/[^\d.-]/g, ""))
      : parseFloat(item.price),
    image: isGraphQLSchema 
      ? item.image?.sourceUrl 
      : item.images?.[0]?.src || item.image?.src,
    attributes: normalizeAttributes(item.attributes, isGraphQLSchema),
    quantity: item.quantity
  };
};

const normalizeAttributes = (attributes, isGraphQLSchema) => {
  if (!attributes) return [];
  
  if (isGraphQLSchema) {
    return (attributes.nodes || []).map(attr => ({
      name: attr.name,
      options: attr.options || []
    }));
  }
  
  return (attributes || []).map(attr => ({
    name: attr.name,
    options: attr.options || []
  }));
};

export default function Cartdropdown() {
  const { cartItems, removeFromCart } = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(true);
  const { rate, currencySymbol } = usePopupStore();
  const dropdownRef = useRef(null);

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      const normalizedItem = normalizeCartItem(item);
      return acc + normalizedItem.price * item.quantity;
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

  const getAttributeValue = (normalizedItem, attributeName) => {
    const attribute = normalizedItem.attributes.find(
      attr => attr.name === attributeName
    );
    return attribute?.options?.[0] || "N/A";
  };

  if (!isCartOpen) return null;

  const handleViewBag = () => {
    setIsCartOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 2xl:mt-6 mt-2 w-[90vw] sm:w-[450px] 2xl:w-[490px] bg-white shadow-lg rounded-md overflow-hidden z-[100] border border-gray-200 max-h-[80vh] flex flex-col"
    >
      <div className="p-4 border-b border-gray-200">
        <h2 className={`text-xl font-normal ${jost.className}`}>
          Your Bag ({cartItems.length})
        </h2>
      </div>
      <div className="flex-grow overflow-y-scroll">
        {cartItems.length > 0 ? (
          <ul >
            {cartItems.map((item) => {
              const normalizedItem = normalizeCartItem(item);
              return (
                <li key={normalizedItem.id} className="p-4 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className="w-28 flex flex-col items-center">
                        <Image
                          src={normalizedItem.image || "/placeholder.svg"}
                          alt={decodeHTMLEntities(normalizedItem.name)}
                          width={80}
                          height={80}
                          className="rounded-md object-cover"
                        />
                        <button
                          className={`text-sm font-medium text-[#8B929D] hover:text-black mt-2 ${jost.className}`}
                          onClick={() => removeFromCart(normalizedItem.id)}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="ml-4">
                        <Link onClick={handleViewBag} href={`/product/${normalizedItem.id}`}>
                          <h3 className={`font-semibold text-base ${jost.className} cursor-pointer`}>
                            {decodeHTMLEntities(normalizedItem.name)}
                          </h3>
                        </Link>
                        <p className={`text-sm text-black ${jost.className} mt-1`}>
                          Shade: {getAttributeValue(normalizedItem, "Shade")}
                        </p>
                        <p className={`text-sm text-black ${jost.className}`}>
                          Size: {getAttributeValue(normalizedItem, "Size")}
                        </p>
                        <p className={`text-sm text-black ${jost.className}`}>
                          Qty: {normalizedItem.quantity}
                        </p>
                      </div>
                    </div>
                    <p className={`font-medium text-lg mt-24 ${jost.className}`}>
                      {currencySymbol}
                      {(normalizedItem.price * rate * normalizedItem.quantity).toFixed(2)}
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
              {(calculateSubtotal() * rate).toFixed(2)}
            </p>
          </div>
          <Link href="/mybag" className="block">
            <button
              onClick={handleViewBag}
              className={`w-full bg-black text-white py-3 rounded-lg text-center text-base font-semibold hover:bg-[#CF8562] transition duration-200 ${jost.className}`}
            >
              VIEW BAG
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}