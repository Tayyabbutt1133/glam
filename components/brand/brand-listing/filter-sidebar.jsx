"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { lexendDeca, jost } from "/components/ui/fonts";
import filter from "/public/filter.svg";

const FilterSection = ({ title, isOpen, toggleOpen, children }) => (
  <div className="mb-6">
    <h4
      className={`font-bold text-lg mb-2 flex justify-between items-center cursor-pointer ${jost.className}`}
      onClick={toggleOpen}
    >
      <span className="ml-2">{title}</span>
      {isOpen ? (
        <IoIosArrowUp className="text-gray-500" />
      ) : (
        <IoIosArrowDown className="text-gray-500" />
      )}
    </h4>
    {isOpen && (
      <div
        className={`pl-2 ${lexendDeca.className} font-normal max-h-60 overflow-y-auto custom-scrollbar`}
      >
        {children}
      </div>
    )}
  </div>
);

const CustomCheckbox = ({ name, value, checked, onChange, label, count }) => (
  <label className="flex items-center mb-2 cursor-pointer">
    <div className="relative mr-2">
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div
        className={`w-5 h-5 border rounded-md transition-colors ${
          checked ? "border-primary bg-primary" : "border-gray-300"
        }`}
      >
        {checked && (
          <svg
            className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
    </div>
    <span className="text-sm 2xl:text-lg">
      {label} <span className="text-gray-500">({count})</span>
    </span>
  </label>
);

export default function FilterSidebar({
  isMobileFilterOpen,
  filters,
  onFilterChange,
  onClearFilters,
  products,
  currencySymbol,
  rate,
  filterData
}) {
  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(true);
  const [isPriceRangeFilterOpen, setIsPriceRangeFilterOpen] = useState(true);

  const priceRanges = ["0-50", "51-100", "101-200", "201-500", "501+"];

  // // Group categories by parent
  // const categoryGroups = filterData?.reduce((acc, category) => {
  //   const parentSlug = category.categorySlug.split('-').slice(-1)[0];
  //   if (!acc[parentSlug]) {
  //     acc[parentSlug] = [];
  //   }
  //   acc[parentSlug].push(category);
  //   return acc;
  // }, {}) || {};

  return (
    <div
      className={`lg:w-1/4 ${isMobileFilterOpen ? "block" : "hidden lg:block"}`}
    >
      <div className="sticky top-60">
        <div className="flex justify-between items-center mb-4">
          <h3
            className={`text-lg font-normal flex items-center gap-4 ${lexendDeca.className}`}
          >
            <Image
              src={filter}
              width={24}
              height={24}
              alt="Filter icon"
              className=""
            />
            <span>Filters</span>
          </h3>
          {(filters.categories.length > 0 || filters.priceRange.length > 0) && (
            <button
              onClick={onClearFilters}
              className={`text-sm text-[#8B929D] underline min-w-fit ${lexendDeca.className}`}
            >
              Clear All
            </button>
          )}
        </div>

        {/* Filter chips */}
        {(filters.categories.length > 0 || filters.priceRange.length > 0) && (
          <div className="mb-4 flex flex-wrap gap-2">
            {filters.categories.map((categoryId) => {
              const category = filterData?.find(
                (c) => c.categoryId === categoryId
              );
              return category ? (
                <span
                  key={categoryId}
                  className={`inline-flex items-center bg-[#F7EBE0] rounded-lg px-3 py-1 text-sm font-bold text-black ${lexendDeca.className}`}
                >
                  <span
                    className={`${lexendDeca.className} font-normal mr-1 text-black`}
                  >
                    Category:{" "}
                  </span>{" "}
                  {category.categoryName}
                  <button
                    onClick={() => onFilterChange("categories", categoryId)}
                    className="ml-2 text-red-600 hover:text-red-700"
                  >
                    <RxCross2 />
                  </button>
                </span>
              ) : null;
            })}

            {filters.priceRange.map((range) => (
              <span
                key={range}
                className={`inline-flex items-center bg-[#F7EBE0] rounded-lg px-3 py-1 text-sm font-bold text-black ${lexendDeca.className}`}
              >
                <span
                  className={`${lexendDeca.className} font-normal mr-1 text-black`}
                >
                  Price:{" "}
                </span>{" "}
                £{range}
                <button
                  onClick={() => onFilterChange("priceRange", range)}
                  className="ml-2 text-red-600 hover:text-red-700"
                >
                  <RxCross2 />
                </button>
              </span>
            ))}
          </div>
        )}

        <hr className="bg-[#8B929D73] h-[1px] mb-4" />

        {/* Category filter - now using filterData */}
        <FilterSection
          title="Category"
          isOpen={isCategoryFilterOpen}
          toggleOpen={() => setIsCategoryFilterOpen(!isCategoryFilterOpen)}
        >
          {filterData?.map((category) => (
            <CustomCheckbox
              key={category.categoryId}
              name="category"
              value={category.categoryId}
              checked={filters.categories.includes(category.categoryId)}
              onChange={() => onFilterChange("categories", category.categoryId)}
              label={category.categoryName}
              count={category.count}
            />
          ))}
        </FilterSection>

        {/* Price range filter */}
        <FilterSection
          title="Price Range"
          isOpen={isPriceRangeFilterOpen}
          toggleOpen={() => setIsPriceRangeFilterOpen(!isPriceRangeFilterOpen)}
        >
          {priceRanges.map((range) => {
            const [min, max] = range.split("-").map(Number);
            const maxConverted = max ? Math.round(max * rate) : Infinity;
            const minConverted = Math.round(min * rate);

            return (
              <CustomCheckbox
                key={range}
                name="priceRange"
                value={range}
                checked={filters.priceRange.includes(range)}
                onChange={() => onFilterChange("priceRange", range)}
                label={`${currencySymbol}${minConverted} - ${
                  max ? `${currencySymbol}${maxConverted}` : "+"
                }`}
                count={
                  products.filter((product) => {
                    const price = parseFloat(product.price);
                    return price >= min && (max ? price <= max : true);
                  }).length
                }
              />
            );
          })}
        </FilterSection>
      </div>
    </div>
  );
}