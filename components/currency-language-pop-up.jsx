"use client";

import { usePopupStore } from "../states/use-popup-store";
import { useRef, useEffect, useState } from "react";
import name from "../src/app/currencies-with-flags.json";
import Image from "next/image";
import { jost, lexendDeca, plusJakartaSans } from "./ui/fonts";
import uk_flag from "../public/Flag_uk.png";
import us_flag from "../public/usa-flag.png";
import { MdKeyboardArrowDown } from "react-icons/md";
import Text from "./ui/Text";

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
    if (
      country.country === "United Kingdom" &&
      country.name === "Pound Sterling"
    ) {
      setFlagUrl("");
    } else if (
      country.country === "United States" &&
      country.name === "United States Dollar"
    ) {
      setFlagUrl("");
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

  const isUK =
    selectedCountry.country === "United Kingdom" &&
    selectedCountry.name === "Pound Sterling";
  const isUS =
    selectedCountry.country === "United States" &&
    selectedCountry.name === "United States Dollar";

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[150]">
          <div
            ref={modalRef}
            className="flex flex-col justify-between items-center bg-white rounded-lg shadow-lg p-8 relative 
            w-[90vw] max-w-[537px] h-[483px]"
          >
            <div className="flex justify-center mb-6">
              {isUK ? (
                <Image
                  src={uk_flag}
                  alt="United Kingdom flag"
                  width={110}
                  height={100}
                  className="w-44 2xl:w-48 h-auto object-contain absolute -top-14"
                />
              ) : isUS ? (
                <Image
                  src={us_flag}
                  alt="United States flag"
                  width={110}
                  height={100}
                  className="w-44 2xl:w-48 h-auto object-contain absolute -top-14"
                />
              ) : flagUrl ? (
                <Image
                  src={flagUrl}
                  alt={`${selectedCountry.country} flag`}
                  width={110}
                  height={100}
                  className="w-44 2xl:w-48 h-auto object-contain absolute -top-14"
                />
              ) : null}
            </div>
            <section>
              <Text style={"h3"} className={`text-center mb-4`}>
                CHOOSE YOUR SHIPPING COUNTRY/REGION
              </Text>
              <p
                className={`text-center ${lexendDeca.className} text-xl font-light`}
              >
                Prices are shown and charged in {selectedCurrency}
              </p>
            </section>

            <section className="w-[90%]">
              <div className="space-y-4">
                <div className="relative">
                  <select
                    className={`w-full py-4 px-6 border border-gray-300 rounded-md ${lexendDeca.className} appearance-none`}
                    onChange={handleCountryChange}
                    value={selectedCountry?.code || ""}
                  >
                    {name.map((country) => (
                      <option key={country.code} value={country.code}>
                        <Text style={"sm"}>{country.country}</Text>
                      </option>
                    ))}
                  </select>
                  <MdKeyboardArrowDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black pointer-events-none"
                    size={20}
                  />
                </div>
                <div className="relative">
                  <select
                    className={`w-full py-4 px-6 border border-gray-300 rounded-md ${lexendDeca.className} appearance-none`}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                    value={selectedCurrency || ""}
                  >
                    {name.map((country) => (
                      <option key={country.code} value={country.code}>
                        <Text style={"sm"}>{country.name}</Text>
                      </option>
                    ))}
                  </select>
                  <MdKeyboardArrowDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black pointer-events-none"
                    size={20}
                  />
                </div>
              </div>

              <button
                className={`${plusJakartaSans.className} w-full mt-8 py-4 bg-black text-white tracking-wider font-bold uppercase rounded-md transition-colors hover:bg-hover ease-linear duration-100`}
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
            </section>
          </div>
        </div>
      )}
    </>
  );
}
