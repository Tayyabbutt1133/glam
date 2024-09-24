"use client";

import { usePopupStore } from "../states/use-popup-store";
import { useRef, useEffect, useState } from "react";
import name from "../src/app/currencies-with-flags.json";
import Image from "next/image";
import Text from "./ui/Text";
import { Plus_Jakarta_Sans } from "next/font/google";
import { jost, lexendDeca } from "./ui/fonts";
import uk_flag from '../public/Flag_uk.png'
import us_flag from '../public/usa-flag.png';

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

  const fetchFlag = async (country) => {
    if (country.country === "United Kingdom" && country.name === "Pound Sterling") {
      setFlagUrl(""); // We'll use the custom UK flag, so we don't need a URL
    } else if (country.country === "United States" && country.name === "United States Dollar") {
      setFlagUrl(""); // We'll use the custom US flag, so we don't need a URL
    } else {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${country.countryCode}`
        );
        const data = await response.json();
        setFlagUrl(data[0].flags.svg);
      } catch (error) {
        console.error("Error fetching flag:", error);
      }
    }
  };

  const handleCountryChange = (e) => {
    const selectedCountryCode = e.target.value;
    const country = name.find(
      (country) => country.code === selectedCountryCode
    );
    setSelectedCountry(country);
    setSelectedCurrency(country.code);
    fetchFlag(country);

    if (typeof window !== "undefined") {
      localStorage.setItem("selectedCountry", JSON.stringify(country));
      localStorage.setItem("selectedCurrency", country.code);
    }
  };

  useEffect(() => {
    fetchFlag(selectedCountry);
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

  const isUK = selectedCountry.country === "United Kingdom" && selectedCountry.name === "Pound Sterling";
  const isUS = selectedCountry.country === "United States" && selectedCountry.name === "United States Dollar";

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-[150]">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-lg py-6 px-8 relative max-w-[537px]"
          >
            {/* Country Flag Banner */}
            <div className="flex justify-center mb-4">
              {isUK ? (
                <Image
                  src={uk_flag}
                  alt="United Kingdom flag"
                  width={110}
                  height={100}
                  className="w-36 h-auto object-contain absolute -top-8"
                />
              ) : isUS ? (
                <Image
                  src={us_flag}
                  alt="United States flag"
                  width={110}
                  height={100}
                  className="w-36 h-auto object-contain absolute -top-8"
                />
              ) : flagUrl ? (
                <Image
                  src={flagUrl}
                  alt={`${selectedCountry.country} flag`}
                  width={110}
                  height={100}
                  className="w-36 h-auto object-contain absolute -top-8"
                />
              ) : null}
            </div>
            <div className="mt-[4rem] mb-2">
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
              <Text style={"sm"}>
                <select
                  className={`w-full p-2.5 border border-gray-300 rounded-md ${lexendDeca.className}`}
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
              <Text style={"sm"}>
                <select
                  className={`w-full p-2.5 border border-gray-300 rounded-md ${lexendDeca.className}`}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  value={selectedCurrency || ""}
                >
                  {name.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </Text>
            </div>

            <button
              className={`${lexendDeca.className} w-full mt-4 p-3 bg-button text-white font-bold rounded-[8px] transition-colors hover:bg-[#CF8562] ease-linear duration-100 hover:bg-hover`}
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