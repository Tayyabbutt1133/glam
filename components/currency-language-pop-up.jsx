"use client";
import { usePopupStore } from "../states/use-popup-store";
import { useRef, useEffect, useState } from "react";
import name from '../src/app/currencies-with-flags.json';

export default function CurrencyLanguagePopUp() {
  const isOpen = usePopupStore((state) => state.isOpen);
  const closeModal = usePopupStore((state) => state.onClose);
  const setSelectedCountryInStore = usePopupStore((state) => state.setSelectedCountry);
  
  const modalRef = useRef(null);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  const [selectedCountry, setSelectedCountry] = useState(() => {
    // Retrieve the selected country from local storage or default to the first country
    const savedCountry = localStorage.getItem('selectedCountry');
    return savedCountry ? JSON.parse(savedCountry) : name[0];
  });

  const [selectedCurrency, setSelectedCurrency] = useState(() => {
    // Retrieve the selected currency from local storage or default to the first country's code
    const savedCurrency = localStorage.getItem('selectedCurrency');
    return savedCurrency || name[0]?.code || 'GBP';
  });

  const [flagUrl, setFlagUrl] = useState('');

  const fetchFlag = async (countryCode) => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
      const data = await response.json();
      setFlagUrl(data[0].flags.svg); // Use the SVG flag URL from the external API
    } catch (error) {
      console.error("Error fetching flag:", error);
    }
  };

  const handleCountryChange = (e) => {
    const selectedCountryCode = e.target.value;
    const country = name.find((country) => country.code === selectedCountryCode);
    setSelectedCountry(country);
    setSelectedCurrency(country.code);
    fetchFlag(country.countryCode);

    // Save the selected country and currency to local storage
    localStorage.setItem('selectedCountry', JSON.stringify(country));
    localStorage.setItem('selectedCurrency', country.code);
  };

  useEffect(() => {
    fetchFlag(selectedCountry.countryCode);
  }, [selectedCountry]);

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
            {/* Country Flag Banner */}
            <div className="flex justify-center mb-4">
              <img
                src={flagUrl}
                alt={`${selectedCountry.country} flag`}
                className="w-36 h-auto object-contain absolute -top-8"
              />
            </div>
            <h2 className="text-xl font-bold text-center mt-[3rem] mb-2">
              CHOOSE YOUR SHIPPING COUNTRY/REGION
            </h2>
            <p className="text-center text-gray-600 mb-4">
              Prices are shown and charged in {selectedCurrency}
            </p>

            <div className="flex flex-col w-full space-y-3">
              <select
                className="w-full p-2.5 border border-gray-300 rounded-md"
                onChange={handleCountryChange}
                value={selectedCountry?.code || ''}
              >
                {name.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.country}
                  </option>
                ))}
              </select>

              <select
                className="w-full p-2.5 border border-gray-300 rounded-md"
                onChange={(e) => setSelectedCurrency(e.target.value)}
                value={selectedCurrency || ''}
              >
                {name.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.code}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="w-full mt-4 p-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800"
              onClick={() => {
                setSelectedCountryInStore({
                  ...selectedCountry,
                  code: selectedCurrency
                });
                closeModal();
              }}
            >
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
      )}
    </>
  );
}
