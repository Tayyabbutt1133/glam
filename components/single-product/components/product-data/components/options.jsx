"use client";
import { useState } from "react";

const options = [
  {
    id: "one-time",
    label: "One-time purchase",
    price: "£9.99",
  },
  {
    id: "subscribe",
    label: "Subscribe & Save 10%",
    price: "£8.00",
  },
];

export default function PurchaseOptions() {
  const [selectedOption, setSelectedOption] = useState("one-time");

  return (
    <section className="mb-7">
      <h2 className="text-2xl font-bold mb-4">Purchase options</h2>
      <div className="rounded-lg overflow-hidden border border-gray-300">
        {options.map((option, index) => (
          <label
            key={option.id}
            className={`flex items-center justify-between p-4 py-6 cursor-pointer hover:bg-gray-50 ${index !== options.length - 1 ? "border-b border-gray-300" : ""}`}
            onClick={() => setSelectedOption(option.id)}
          >
            <div className="flex items-center">
              <div
                className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${selectedOption === option.id ? "border-black" : "border-gray-300"}`}
              >
                {selectedOption === option.id && (
                  <div className="w-3 h-3 rounded-full bg-black"></div>
                )}
              </div>
              <span className="font-medium">{option.label}</span>
            </div>
            <span className="font-medium">{option.price}</span>
          </label>
        ))}
      </div>
    </section>
  );
}
