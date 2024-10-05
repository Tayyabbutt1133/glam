"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ChevronRight, ChevronLeft, Home } from "lucide-react";
import { jost, lexendDeca } from "../../ui/fonts";
import { usePopupStore } from "../../../states/use-popup-store";
import ArrowDown from "/public/icons/arrow-down";
import Text from "../../ui/Text";
import Container from "../../container";
import { brands } from "../navigation-nav/data/brands";
import { MdHome } from "react-icons/md";

export default function MobileSidebar({ isOpen, onClose }) {
  const [links, setLinks] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentSubCategory, setCurrentSubCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [expandedSubCategory, setExpandedSubCategory] = useState(null);
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
    if (expandedSubCategory) {
      setExpandedSubCategory(null);
    } else if (currentSubCategory) {
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

  const categorizeBrands = (brands) => {
    const categories = {
      "0 - 9": [],
      "A - D": [],
      "E - H": [],
      "I - L": [],
      "M - P": [],
      "Q - T": [],
      "U - Z": [],
    };

    brands.forEach((brand) => {
      const firstChar = brand.name[0].toUpperCase();
      if (/[0-9]/.test(firstChar)) {
        categories["0 - 9"].push(brand);
      } else if (/[A-D]/.test(firstChar)) {
        categories["A - D"].push(brand);
      } else if (/[E-H]/.test(firstChar)) {
        categories["E - H"].push(brand);
      } else if (/[I-L]/.test(firstChar)) {
        categories["I - L"].push(brand);
      } else if (/[M-P]/.test(firstChar)) {
        categories["M - P"].push(brand);
      } else if (/[Q-T]/.test(firstChar)) {
        categories["Q - T"].push(brand);
      } else if (/[U-Z]/.test(firstChar)) {
        categories["U - Z"].push(brand);
      }
    });
    return categories;
  };

  const handleLinkClick = () => {
    onClose();
  };

  const renderMegaMenu = () => {
    if (hoveredLink.href === "/brands") {
      const categorizedBrands = categorizeBrands(brands);
      return (
        <>
          {Object.keys(categorizedBrands).map(
            (category) =>
              categorizedBrands[category].length > 0 && (
                <div key={category}>
                  <h2 className="text-xl font-semibold text-center bg-slate-100">
                    {category}
                  </h2>
                  {categorizedBrands[category].map((brand) => (
                    <Link key={brand.slug} href={`/brands/${brand.slug}`} onClick={handleLinkClick}>
                      <p className="text-lg my-1 font-light">{brand.name}</p>
                    </Link>
                  ))}
                </div>
              )
          )}
        </>
      );
    }

    const subCategories = getSubMenu(hoveredLink.id);

    if (expandedSubCategory) {
      const expandedSubMenu = getSubMenu(expandedSubCategory.id);
      return (
        <div className="flex flex-col w-full">
          {expandedSubMenu.map((item) => (
            <div key={item.id} className="mb-4">
              <Link href={item.href} className="flex items-center" onClick={handleLinkClick}>
                {item.color && (
                  <div
                    style={{ backgroundColor: item.color }}
                    className="w-3 h-3 rounded-full mr-2"
                  ></div>
                )}
                <span
                  className={`${lexendDeca.className} opacity-70`}
                >
                  {item.name}
                </span>
              </Link>
            </div>
          ))}
        </div>
      );
    }
    return (
      <div className="flex flex-col w-full">
        {subCategories.map((subCategory) => (
          <div key={subCategory.id} className="mb-4">
            <div className="flex justify-between items-center">
              <Link
                href={
                  subCategory.href ==
                  "/product-categories/skin-care/Moisturizers"
                    ? "/product-categories/skin-care/Moisturisers"
                    : subCategory.href
                }
                className="relative inline-block"
                onClick={handleLinkClick}
              >
                <Text style="h4" className="uppercase mb-2 ">
                  {subCategory.name}
                </Text>
                <div className="absolute bottom-0 z-50 left-0 w-full h-0.5 bg-gray-300 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></div>
              </Link>
              <button
                onClick={() =>
                  setExpandedSubCategory({
                    id: subCategory.id,
                    name: subCategory.name,
                  })
                }
                aria-label={`Toggle ${subCategory.name} submenu`}
              >
                <ChevronRight className="w-5 h-5 ml-auto" />
              </button>
            </div>
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
          <h2 className="text-xl font-semibold mb-8 flex ">
            {expandedSubCategory ? expandedSubCategory.name : currentCategory}
          </h2>
          {renderMegaMenu()}
        </>
      );
    }

    return mainLinks?.map((category, index) => {
      const lowerCaseName = category.name.toLowerCase();
      const isSpecialCategory = ["new in", "sale"].includes(lowerCaseName);
      let categorySlug = lowerCaseName
        .replace(/&/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

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
            onClick={handleLinkClick}
          >
            {category.name}
          </Link>
          {!["new in", "sale"].includes(lowerCaseName) && (
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
    <>
      {isOpen && <div className="fixed inset-0 bg-black opacity-40 z-40"></div>}
      <div
        className={`fixed inset-0 bg-white z-50  overflow-y-auto w-[87%] pl-1 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${jost.className}`}
      >
        <div className="flex flex-row-reverse items-center justify-between p-4 border-b">
          <button onClick={onClose} className="py-2" aria-label="Close sidebar">
            <X className=" size-8" />
          </button>
          {currentCategory != null || currentSubCategory != null ? (
            <button onClick={goBack} className="mr-2 flex gap-2  items-center" aria-label="Go back">
              <ChevronLeft className="w-6 h-6" /><span>Back</span>
            </button>
          ) : (
            <Link
              href="/"
              className="py-2"
              onClick={handleLinkClick}
              aria-label="Go to home"
            >
              <MdHome className=" size-8" />
            </Link>
          )}
        </div>
        <div className="p-4 overflow-y-auto ">{renderCategories()}</div>
        {currentCategory == null && currentSubCategory == null && (
          <div className="p-4 bg-[#f7ebe0] flex items-center justify-between px-3">
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
                <p className="flex items-center gap-2 font-normal text-base">
                  <span className="lowercase">
                    {selectedCountry.countryCode}
                  </span>
                  {" - "}
                  {selectedCountry.code}
                </p>
              </div>
            </div>
            <button className=" p-1 underline underline-offset-3" onClick={onOpen}>
              Change
            </button>
          </div>
        )}
      </div>
    </>
  );
}