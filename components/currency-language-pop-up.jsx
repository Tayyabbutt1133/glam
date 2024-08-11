"use client";
import { usePopupStore } from "../states/use-popup-store";
import Image from "next/image";
import { useRef, useEffect } from "react";
import uklogo from '../public/UK Flag.png';

export default function CurrencyLanguagePopUp() {
  const isOpen = usePopupStore((state) => state.isOpen);
  const closeModal = usePopupStore((state) => state.onClose);
  const modalRef = useRef(null);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-lg py-6 px-8 relative max-w-sm w-full"
          >

            {/* Flag Image */}
            <div className="absolute -top-10 left-[50%] -translate-x-[50%] mb-4">
              <Image
                src={uklogo}
                alt="UK Flag"
                width={1000} // Specify the width
                height={100} // Specify the height
                className="w-36 h-auto rounded shadow-lg"
              />
            </div>

            {/* Content */}
            <h2 className="text-xl font-bold text-center mt-12 mb-2">
              CHOOSE YOUR SHIPPING COUNTRY/REGION
            </h2>
            <p className="text-center text-gray-600 mb-4">
              Prices are shown and charged in GBP
            </p>

            {/* Dropdowns */}
            <div className="flex flex-col w-full space-y-3">
              <select className="w-full p-2.5 border border-gray-300 rounded-md">
                <option value="UK">United Kingdom</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="JP">Japan</option>
                <option value="CN">China</option>
                <option value="IN">India</option>
                {/* Add more options as needed */}
              </select>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option value="GBP">British Pound (GBP)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="CAD">Canadian Dollar (CAD)</option>
                <option value="AUD">Australian Dollar (AUD)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="JPY">Japanese Yen (JPY)</option>
                <option value="CNY">Chinese Yuan (CNY)</option>
                <option value="INR">Indian Rupee (INR)</option>
                {/* Add more options as needed */}
              </select>
            </div>

            {/* Continue Button */}
            <button
              className="w-full mt-4 p-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800"
              onClick={closeModal}
            >
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
      )}
    </>
  );
}
