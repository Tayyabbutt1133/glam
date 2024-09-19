"use client";
import { useState } from "react";
import { FiChevronDown, FiEdit2, FiX, FiTruck } from 'react-icons/fi';
import { usePopupStore } from "/states/use-popup-store";

const subscriptionDetails = [
  { icon: <FiEdit2 size={16} />, text: "Edit or cancel anytime" },
  { icon: <FiX size={16} />, text: "No commitment" },
  { icon: <FiTruck size={16} />, text: "Skip your next delivery" },
];


export default function PurchaseOptions({options}) {
  const { rate,currencySymbol } = usePopupStore();
  const [selectedOption, setSelectedOption] = useState("subscribe");

  return (
    <section className="mb-7">
      <h2 className="text-xl font-bold mb-4">Purchase options</h2>
      <div className="rounded-lg overflow-hidden border border-gray-300 ">
        {options?.map((option) => (
          <div key={option.id} className="border-b border-gray-300 last:border-b-0">
            <label
              className="flex items-center   sm:justify-between p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => setSelectedOption(option.id)}
            >
              <div className="flex items-center w-[70%] sm:w-full">
                <div
                  className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    selectedOption === option.id ? "border-black" : "border-gray-300"
                  }`}
                >
                  {selectedOption === option.id && (
                    <div className="w-3 h-3 rounded-full bg-black"></div>
                  )}
                </div>
                <span className={` text-sm sm:text-base ${selectedOption === option.id ? "font-medium" : "text-gray-500"}`}>
                  {option.label}
                </span>
              </div>
              <span className={`${selectedOption === option.id ? "font-medium" : "text-gray-500"}`}>
              {currencySymbol}{(option.price * rate).toFixed(2)}
              </span>
            </label>
            {selectedOption === "subscribe" && option.id === "subscribe" && (
              <div className="px-4 pb-4">
                <h3 className="font-medium mb-2 text-sm">How do subscriptions work?</h3>
                <ul className="space-y-2 mb-4">
                  {subscriptionDetails.map((detail, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-2 text-xs sm:text-sm">{detail.icon}</span>
                      <span className="text-xs sm:text-sm">{detail.text}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center">
                  <span className="mr-2 text-sm">Deliver</span>
                  <div className="relative inline-block w-40">
                    <select className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                      <option>Every Month</option>
                      <option>Every 2 Months</option>
                      <option>Every 3 Months</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <FiChevronDown size={16} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}