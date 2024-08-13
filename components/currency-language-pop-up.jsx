"use client";
import { usePopupStore } from "../states/use-popup-store";
import { useRef, useEffect, useState } from "react";
import name from "../src/app/currencies-with-flags.json";
import Image from "next/image";
import Text from "./ui/Text";
import { Plus_Jakarta_Sans } from "next/font/google";
import { jost } from "./ui/fonts";



const plusJakartaSans = Plus_Jakarta_Sans({subsets: ['latin']});

export default function CurrencyLanguagePopUp() {
  const isOpen = usePopupStore((state) => state.isOpen);
  const closeModal = usePopupStore((state) => state.onClose);
  const setSelectedCountryInStore = usePopupStore(
    (state) => state.setSelectedCountry
  );

  const modalRef = useRef(null);

  const [selectedCountry, setSelectedCountry] = useState(name[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(
    name[0]?.code || "GBP"
  );
  const [flagUrl, setFlagUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCountry = localStorage.getItem("selectedCountry");
      const savedCurrency = localStorage.getItem("selectedCurrency");

      if (savedCountry) {
        setSelectedCountry(JSON.parse(savedCountry));
      }
      if (savedCurrency) {
        setSelectedCurrency(savedCurrency);
      }
    }
  }, []);

  const fetchFlag = async (countryCode) => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/alpha/${countryCode}`
      );
      const data = await response.json();
      setFlagUrl(data[0].flags.svg); // Use the SVG flag URL from the external API
    } catch (error) {
      console.error("Error fetching flag:", error);
    }
  };

  const handleCountryChange = (e) => {
    const selectedCountryCode = e.target.value;
    const country = name.find(
      (country) => country.code === selectedCountryCode
    );
    setSelectedCountry(country);
    setSelectedCurrency(country.code);
    fetchFlag(country.countryCode);

    if (typeof window !== "undefined") {
      localStorage.setItem("selectedCountry", JSON.stringify(country));
      localStorage.setItem("selectedCurrency", country.code);
    }
  };

  useEffect(() => {
    fetchFlag(selectedCountry.countryCode);
  }, [selectedCountry]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeModal]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-lg py-6 px-8 relative max-w-[537px]"
          >
            {/* Country Flag Banner */}
            <div className="flex justify-center mb-4">
              <Image
                src={flagUrl}
                alt={`${selectedCountry.country} flag`}
                width={100}
                height={100}
                className="w-36 h-auto object-contain absolute -top-8"
              />
            </div>
            <div className="mt-[3rem] mb-2">
              <Text style={"h3"} className={`text-center ${jost.className} text-2xl`}>
                CHOOSE YOUR SHIPPING COUNTRY/REGION
              </Text>
            </div>
            <div className="mb-4">
              <Text
                style={"h4"}
                className={"text-center font-normal text-primary"}
              >
                Prices are shown and charged in {selectedCurrency}
              </Text>
            </div>

            <div className="flex flex-col w-full space-y-3">
              <Text style={"xs"}>
                <select
                  className="w-full p-2.5 border border-gray-300 rounded-md"
                  onChange={handleCountryChange}
                  value={selectedCountry?.code || ""}
                >
                  {name.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.country}
                    </option>
                  ))}
                </select>
              </Text>
              <Text style={"xs"}>
                <select
                  className="w-full p-2.5 border border-gray-300 rounded-md"
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  value={selectedCurrency || ""}
                >
                  {name.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.code}
                    </option>
                  ))}
                </select>
              </Text>
            </div>

            <button
              className={`${plusJakartaSans.className} w-full mt-4 p-3 bg-button text-white font-bold rounded-[8px] transition-colors ease-linear duration-100 hover:bg-hover`}
              onClick={() => {
                setSelectedCountryInStore({
                  ...selectedCountry,
                  code: selectedCurrency,
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
