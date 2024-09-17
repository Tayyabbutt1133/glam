"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ChevronRight, ChevronLeft, Home } from "lucide-react";
import { jost, lexendDeca } from "../../ui/fonts";
import { usePopupStore } from "../../../states/use-popup-store";
import ArrowDown from "public/icons/arrow-down";
import Text from "../../ui/Text";
import Container from "../../container";

export default function MobileSidebar({ isOpen, onClose }) {
  const [links, setLinks] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentSubCategory, setCurrentSubCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [hoveredLink, setHoveredLink] = useState({
    id: null,
    href: null,
    img: "",
  });

  const onOpen = usePopupStore((state) => state.onOpen);
  const selectedCountryFromStore = usePopupStore(
    (state) => state.selectedCountry
  );

  const [selectedCountry, setSelectedCountry] = useState(() => {
    if (typeof window !== "undefined") {
      if (
        selectedCountryFromStore &&
        selectedCountryFromStore.countryCode &&
        selectedCountryFromStore.countryCode.length === 2
      ) {
        return selectedCountryFromStore;
      }
      const savedCountry = localStorage.getItem("selectedCountry");
      const parsedCountry = savedCountry ? JSON.parse(savedCountry) : null;
      return parsedCountry &&
        parsedCountry.countryCode &&
        parsedCountry.countryCode.length === 2
        ? parsedCountry
        : { countryCode: "gb", code: "GBP", country: "United Kingdom" };
    } else {
      return { countryCode: "gb", code: "GBP", country: "United Kingdom" };
    }
  });
  const [flagUrl, setFlagUrl] = useState("");

  const fetchFlag = async (countryCode) => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/alpha/${countryCode}`
      );
      const data = await response.json();
      setFlagUrl(data[0].flags.svg);
    } catch (error) {
      console.error("Error fetching flag:", error);
    }
  };

  useEffect(() => {
    if (selectedCountry.countryCode) {
      fetchFlag(selectedCountry.countryCode);
    }
  }, [selectedCountry]);

  useEffect(() => {
    const unsubscribe = usePopupStore.subscribe((state) => {
      const updatedCountry = state.selectedCountry;
      if (
        updatedCountry &&
        updatedCountry.countryCode !== selectedCountry.countryCode
      ) {
        setSelectedCountry(updatedCountry);
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "selectedCountry",
            JSON.stringify(updatedCountry)
          );
        }
      }
    });

    return () => unsubscribe();
  }, [selectedCountry]);

  useEffect(() => {
    const fetchLinks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/test-6`,
          {
            method: "GET",
            cache: "no-store",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch navigation data");
        }
        const data = await res.json();
        setLinks(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load navigation. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLinks();
  }, []);

  const mainLinks = links?.filter((link) => link.parent === "0");

  const goBack = () => {
    if (currentSubCategory) {
      setCurrentSubCategory(null);
    } else if (currentCategory) {
      setCurrentCategory(null);
      setHoveredLink({ id: null, href: null, img: "" });
    } else {
      onClose();
    }
  };

  const getSubMenu = (parentId) => {
    return links.filter((link) => link.parent === parentId?.toString());
  };

  const renderMegaMenu = () => {
    if (hoveredLink.href === "/brands") {
      return null; // Handle brands separately if needed
    }

    const subCategories = getSubMenu(hoveredLink.id);

    return (
      <div className="flex flex-col w-full">
        {subCategories.map((subCategory) => (
          <div key={subCategory.id} className="mb-4">
            <Link href={subCategory.href} className="relative inline-block">
              <Text style="h4" className="uppercase mb-2 font-semibold">
                {subCategory.name}
              </Text>
              <div className="absolute bottom-0 z-50 left-0 w-full h-0.5 bg-gray-300 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></div>
            </Link>
            <ul className="flex flex-col gap-2">
              {getSubMenu(subCategory.id).map((item) => (
                <li key={item.id}>
                  <Link href={item.href} className="flex items-center">
                    {item.color && (
                      <div
                        style={{ backgroundColor: item.color }}
                        className="w-3 h-3 rounded-full mr-2"
                      ></div>
                    )}
                    <span
                      className={`${lexendDeca.className} text-[13px] opacity-70`}
                    >
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  const renderCategories = () => {
    if (isLoading) {
      return <div className="text-center py-4">Loading...</div>;
    }

    if (error) {
      return <div className="text-center py-4 text-red-500">{error}</div>;
    }

    if (currentCategory) {
      return (
        <>
          <div className="flex items-center mb-4">
            <button onClick={goBack} className="mr-2" aria-label="Go back">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-semibold">{currentCategory}</h2>
          </div>
          {renderMegaMenu()}
        </>
      );
    }
    //`Sibty-In future when brands will be sdded in the menu remove them from isSpecialCategory and handle there logic with other links e.g skincare, makeup etc

    return mainLinks?.map((category, index) => {
      const lowerCaseName = category.name.toLowerCase();
      const isSpecialCategory = ["brands", "new in", "sale"].includes(
        lowerCaseName
      );
      let categorySlug = lowerCaseName
      .replace(/&/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    
    // Special case for "skin care"
    if (categorySlug === "skin-care") {
      categorySlug = "skincare";
    }

    const href = isSpecialCategory
      ? `/${categorySlug}`
      : `/product-categories/${categorySlug}`;

      return (
        <div
          key={category.id}
          className="flex items-center justify-between w-full py-2 border-b"
        >
          <Link
            href={href}
            className={` ${index === 0 ? "text-sale" : ""}`}
            onClick={onClose}
          >
            {category.name}
          </Link>
          {!["brands", "new in", "sale"].includes(lowerCaseName) && (
            <button
              className="p-2 flex-grow"
              onClick={() => {
                setCurrentCategory(category.name);
                setHoveredLink({
                  id: category.id,
                  href: category.href,
                  img: category.menu_img,
                });
              }}
              aria-label={`Open ${category.name} submenu`}
            >
              <ChevronRight className="w-5 h-5 ml-auto" />
            </button>
          )}
        </div>
      );
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 bg-white z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } ${jost.className}`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <button onClick={onClose} className="p-2" aria-label="Close sidebar">
          <X className="w-6 h-6" />
        </button>
        <Link
          href="/"
          className="p-2"
          onClick={onClose}
          aria-label="Go to home"
        >
          <Home className="w-6 h-6" />
        </Link>
      </div>
      <div className="p-4 overflow-y-auto h-[calc(100vh-180px)]">
        {renderCategories()}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {flagUrl && (
              <div className="relative w-8 h-6 mr-2">
                <Image
                  src={flagUrl}
                  alt={`${selectedCountry.country} Flag`}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            )}
            <button
              className="flex items-center gap-2 font-normal text-base"
              onClick={onOpen}
            >
              <span className="lowercase">{selectedCountry.countryCode}</span>
              {" - "}
              {selectedCountry.code}
              <ArrowDown className="w-3 h-auto" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
