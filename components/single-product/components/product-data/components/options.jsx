"use client";

import { useState } from "react";
import { usePopupStore } from "/states/use-popup-store";
import { lexendDeca } from "../../../../ui/fonts";

export default function PurchaseOptions({ options }) {
  const { rate, currencySymbol } = usePopupStore();
  const [selectedOption, setSelectedOption] = useState(options[0]?.id);

  return (
    <section className="mb-7">
      <h2 className="text-2xl font-bold mb-4">Purchase options</h2>
      <div className="rounded-lg overflow-hidden border border-gray-300">
        {options?.map((option) => (
          <div key={option.id} className="border-b border-gray-300 last:border-b-0">
            <label
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => setSelectedOption(option.id)}
            >
              <div className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                    selectedOption === option.id ? "border-black" : "border-gray-300"
                  }`}
                >
                  {selectedOption === option.id && (
                    <div className="w-3 h-3 rounded-full bg-black"></div>
                  )}
                </div>
                <span className={`text-lg  ${lexendDeca.className} ${selectedOption === option.id ? "font-medium" : ""}`}>
                  {option.label}
                </span>
              </div>
              <span className={`text-lg ${lexendDeca.className} ${selectedOption === option.id ? "font-medium" : ""}`}>
                {currencySymbol}{(option.price * rate).toFixed(2)}
              </span>
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}