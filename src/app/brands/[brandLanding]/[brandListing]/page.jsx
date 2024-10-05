"use client";

import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import Image from "next/image";
import React from 'react'
import Link from "next/link";
import { FaStar, FaRegStar, FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { MdKeyboardArrowDown } from 'react-icons/md';
import { lexendDeca, jost } from "../../../../../components/ui/fonts";
import Breadcrumb from "/components/BreadCrumb";
import Container from "/components/container";
import { useCartStore } from "/states/Cardstore";
import { usePopupStore } from "/states/use-popup-store";
import filter from "../../../../../public/filter.svg";
import arrow_previous from '../../../../../public/Keyboard arrow left.svg';
import arrow_forward from '../../../../../public/Keyboard arrow right.svg';

const PRODUCTS_PER_PAGE = 12;

const GET_PRODUCTS = gql`
  query getProducts($attribute_term: String!, $category: String!) {
    products(
      where: {
        attribute: "pa_brand"
        attributeTerm: $attribute_term
        category: $category
      }
    ) {
      nodes {
        databaseId
        name
        slug
        image {
          sourceUrl
          altText
        }
        ... on SimpleProduct {
          price(format: RAW)
          regularPrice(format: RAW)
          salePrice(format: RAW)
          rrp
          outletPrice
          onSale
          averageRating
          reviewCount
          productCategories {
            nodes {
              databaseId
              name
            }
          }
          attributes {
            nodes {
              name
              options
            }
          }
        }
        ... on VariableProduct {
          price(format: RAW)
          regularPrice(format: RAW)
          salePrice(format: RAW)
          rrp
          outletPrice
          onSale
          averageRating
          reviewCount
          productCategories {
            nodes {
              databaseId
              name
            }
          }
          attributes {
            nodes {
              name
              options
            }
          }
        }
      }
    }
  }
`;

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
      <div className={`pl-2 ${lexendDeca.className} font-normal max-h-60 overflow-y-auto custom-scrollbar`}>
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
      <div className={`w-5 h-5 border rounded-md transition-colors ${
        checked ? 'border-primary bg-primary' : 'border-gray-300'
      }`}>
        {checked && (
          <svg className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    </div>
    <span className="text-sm 2xl:text-lg">
      {label} <span className="text-gray-500">({count})</span>
    </span>
  </label>
);

const CustomDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleOptionClick = (optionValue) => {
    onChange({ target: { value: optionValue } });
    setIsOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className={`inline-flex justify-between items-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm ${jost.className} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100`}
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={handleToggle}
        >
          <span className={`text-[#8B929D] font-normal ${lexendDeca.className}`}>
            Sort by: <span className={`text-black ${lexendDeca.className} font-normal`}>{selectedOption?.label}</span>
          </span>
          <MdKeyboardArrowDown className="text-black text-xl ml-2" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option) => (
              <button
                key={option.value}
                className={`${option.value === value ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm ${jost.className} w-full text-left hover:bg-gray-100 hover:text-gray-900`}
                role="menuitem"
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function ProductListing() {
  const { brandLanding, brandListing } = useParams();
  const { rate, currencySymbol } = usePopupStore();
  const addToCart = useCartStore((state) => state.addToCart);

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    priceRange: [],
  });
  const [sortOption, setSortOption] = useState("popularity");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [favorites, setFavorites] = useState({});

  const { data, error } = useQuery(GET_PRODUCTS, {
    variables: { attribute_term: brandLanding, category: brandListing },
  });

  const products = useMemo(() => data?.products?.nodes || [], [data]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Apply filters
    if (filters.brands.length > 0) {
      result = result.filter((product) =>
        product.attributes.nodes.some(
          (attr) =>
            attr.name === "Brand" && filters.brands.includes(attr.options[0])
        )
      );
    }
    if (filters.categories.length > 0) {
      result = result.filter((product) =>
        product.productCategories.nodes.some((cat) =>
          filters.categories.includes(cat.databaseId.toString())
        )
      );
    }
    if (filters.priceRange.length > 0) {
      result = result.filter((product) => {
        const price = parseFloat(product.price);
        return filters.priceRange.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return price >= min && price <= max;
        });
      });
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low-to-high":
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-high-to-low":
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "newest":
        // Assuming there's a 'date' field. If not, you'll need to adjust this.
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      default: // 'popularity'
        // Assuming there's a 'popularity' or 'sales' field. If not, you'll need to adjust this.
        result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [products, filters, sortOption]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredAndSortedProducts.slice(
      startIndex,
      startIndex + PRODUCTS_PER_PAGE
    );
  }, [filteredAndSortedProducts, currentPage]);

  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / PRODUCTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter((item) => item !== value)
        : [...prevFilters[filterType], value],
    }));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({
      brands: [],
      categories: [],
      priceRange: [],
    });
    setCurrentPage(1);
  };

  const handleFavoriteClick = (productId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [productId]: !prevFavorites[productId],
    }));
  };

  const breadLinks = [
    { name: "Home", route: "/" },
    { name: brandLanding, route: `/brands/${brandLanding}` },
    { name: brandListing, route: `/brands/${brandLanding}/${brandListing}` },
  ];

  if (error) return <div>Error: {error.message}</div>;

  const renderPagination = () => (
    <div className="flex justify-end items-center">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`mx-1 flex items-center justify-center rounded-[4px] border transition duration-300 ease-in-out ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed text-gray-400 bg-transparent border-[#EFEFEF]"
            : "bg-white text-black border-[#EFEFEF] hover:bg-gray-200 hover:text-white"
        }`}
        style={{ width: 'var(--Spacing-5, 40px)', height: 'var(--Spacing-5, 40px)' }}
        aria-label="Previous page"
      >
        <Image src={arrow_previous} width={24} height={24} alt="Previous" />
      </button>

      {currentPage > 2 && (
        <button
          onClick={() => handlePageChange(1)}
          className="mx-1 flex items-center justify-center rounded-[4px] border border-[#EFEFEF] bg-white hover:bg-gray-200 hover:text-white transition duration-300 ease-in-out"
          style={{ width: 'var(--Spacing-5, 40px)', height: 'var(--Spacing-5, 40px)' }}
        >
          1
        </button>
      )}

      {currentPage > 3 && <span className="px-2">...</span>}

      {currentPage > 1 && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="mx-1 flex items-center justify-center rounded-[4px] border border-[#EFEFEF] bg-white hover:bg-gray-200 hover:text-white transition duration-300 ease-in-out"
          style={{ width: 'var(--Spacing-5, 40px)', height: 'var(--Spacing-5, 40px)' }}
        >
          {currentPage - 1}
        </button>
      )}

      <button
        onClick={() => handlePageChange(currentPage)}
        className="mx-1 flex items-center justify-center rounded-[4px] border border-[#EFEFEF] bg-black text-white"
        style={{ width: 'var(--Spacing-5, 40px)', height: 'var(--Spacing-5, 40px)' }}
        aria-current="page"
      >
        {currentPage}
      </button>

      {currentPage < totalPages && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="mx-1 flex items-center justify-center rounded-[4px] border border-[#EFEFEF] bg-white hover:bg-gray-200 hover:text-white transition duration-300 ease-in-out"
          style={{ width: 'var(--Spacing-5, 40px)', height: 'var(--Spacing-5, 40px)' }}
        >
          {currentPage + 1}
        </button>
      )}

      {currentPage < totalPages - 2 && <span className="px-2">...</span>}

      {currentPage < totalPages - 1 && (
        <button
          onClick={() => handlePageChange(totalPages)}
          className="mx-1 flex items-center justify-center rounded-[4px] border border-[#EFEFEF] bg-white hover:bg-gray-200 hover:text-white transition duration-300 ease-in-out"
          style={{ width: 'var(--Spacing-5, 40px)', height: 'var(--Spacing-5, 40px)' }}
        >
          {totalPages}
        </button>
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`mx-1 flex items-center justify-center rounded-[4px] border transition duration-300 ease-in-out ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed text-gray-400 bg-transparent border-[#EFEFEF]"
            : "bg-white text-black border-[#EFEFEF] hover:bg-gray-200 hover:text-white"
        }`}
        style={{ width: 'var(--Spacing-5, 40px)', height: 'var(--Spacing-5, 40px)' }}
        aria-label="Next page"
      >
        <Image src={arrow_forward} width={24} height={24} alt="Next" />
      </button>
    </div>
  )

  return (
    <>
    <Container>
        <Breadcrumb links={breadLinks} />
    </Container>
    <Container className="min-h-screen py-24">
    <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #EFEFEF;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #EFEFEF;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #EFEFEF;
        }
      `}</style>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar for filters */}
        <div className={`lg:w-1/4 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="sticky top-24">
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-normal flex items-center gap-4 ${lexendDeca.className}`}>
                <Image
                  src={filter}
                  width={24}
                  height={24}
                  alt="Filter icon"
                  className=""
                  onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                />
                <span>Filters</span>
              </h3>
              {(filters.brands.length > 0 || filters.categories.length > 0 || filters.priceRange.length > 0) && (
                <button
                  onClick={clearAllFilters}
                  className={`text-sm text-[#8B929D] underline ${lexendDeca.className}`}
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Filter chips */}
            {(filters.brands.length > 0 || filters.categories.length > 0 || filters.priceRange.length > 0) && (
              <div className="mb-4 flex flex-wrap gap-2">
                {filters.brands.map((brand) => (
                  <span
                    key={brand}
                    className={`inline-flex items-center bg-[#F7EBE0] rounded-lg px-3 py-1 text-sm font-bold text-black ${lexendDeca.className}`}
                  >
                    <span className={`${lexendDeca.className} font-normal mr-1 text-black`}>
                      Brand:{" "}
                    </span>{" "}
                    {brand}
                    <button
                      onClick={() => handleFilterChange("brands", brand)}
                      className="ml-2 text-red-600 hover:text-red-700"
                    >
                      <RxCross2 />
                    </button>
                  </span>
                ))}

                {filters.categories.map((categoryId) => {
                  const category = products[0]?.productCategories.nodes.find(
                    (c) => c.databaseId.toString() === categoryId
                  );
                  return category ? (
                    <span
                      key={categoryId}
                      className={`inline-flex items-center bg-[#F7EBE0] rounded-lg px-3 py-1 text-sm font-bold text-black ${lexendDeca.className}`}
                    >
                      <span className={`${lexendDeca.className} font-normal mr-1 text-black`}>
                        Category:{" "}
                      </span>{" "}
                      {category.name}
                      <button
                        onClick={() => handleFilterChange("categories", categoryId)}
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
                    <span className={`${lexendDeca.className} font-normal mr-1 text-black`}>
                      Price:{" "}
                    </span>{" "}
                    £{range}
                    <button
                      onClick={() => handleFilterChange("priceRange", range)}
                      className="ml-2 text-red-600 hover:text-red-700"
                    >
                      <RxCross2 />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <hr className="bg-[#8B929D73] h-[1px] mb-4" />

            {/* Brand filter */}
            {/* <FilterSection 
              title="Brand" 
              isOpen={true} 
              toggleOpen={() => {}}
            >
              {Array.from(new Set(products.flatMap(product => 
                product.attributes.nodes
                  .filter(attr => attr.name === "Brand")
                  .flatMap(attr => attr.options)
              ))).map((brand) => (
                <CustomCheckbox
                  key={brand}
                  name="brand"
                  value={brand}
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleFilterChange("brands", brand)}
                  label={brand}
                  count={products.filter(product => 
                    product.attributes.nodes.some(attr => 
                      attr.name === "Brand" && attr.options.includes(brand)
                    )
                  ).length}
                />
              ))}
            </FilterSection> */}

            {/* Category filter */}
            <FilterSection 
              title="Category" 
              isOpen={true} 
              toggleOpen={() => {}}
            >
              {Array.from(new Set(products.flatMap(product => 
                product.productCategories.nodes
              ))).map((category) => (
                <CustomCheckbox
                  key={category.databaseId}
                  name="category"
                  value={category.databaseId.toString()}
                  checked={filters.categories.includes(category.databaseId.toString())}
                  onChange={() => handleFilterChange("categories", category.databaseId.toString())}
                  label={category.name}
                  count={products.filter(product => 
                    product.productCategories.nodes.some(cat => 
                      cat.databaseId === category.databaseId
                    )
                  ).length}
                />
              ))}
            </FilterSection>

            {/* Price range filter */}
            <FilterSection 
              title="Price Range" 
              isOpen={true} 
              toggleOpen={() => {}}
            >
              {["0-50", "51-100", "101-200", "201-500", "501+"].map((range) => {
                const [min, max] = range.split("-").map(Number);
                const maxConverted = max ? Math.round(max * rate) : Infinity;
                const minConverted = Math.round(min * rate);
                
                return (
                  <CustomCheckbox
                    key={range}
                    name="priceRange"
                    value={range}
                    checked={filters.priceRange.includes(range)}
                    onChange={() => handleFilterChange("priceRange", range)}
                    label={`${currencySymbol}${minConverted} - ${max ? `${currencySymbol}${maxConverted}` : '+'}`}
                    count={products.filter(product => {
                      const price = parseFloat(product.price);
                      return price >= min && (max ? price <= max : true);
                    }).length}
                  />
                );
              })}
            </FilterSection>
          </div>
        </div>

        {/* Main content area */}
        <div className="lg:w-3/4">
          {/* Sort and pagination controls */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <button onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)} className="lg:hidden mr-4">
                <Image
                  src={filter}
                  width={24}
                  height={24}
                  alt="Filter icon"
                />
              </button>
              <CustomDropdown
                options={[
                  { value: 'popularity', label: 'Popularity' },
                  { value: 'price-low-to-high', label: 'Price: Low to High' },
                  { value: 'price-high-to-low', label: 'Price: High to Low' },
                  { value: 'newest', label: 'Newest' },
                ]}
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              />
            </div>
            <div className="hidden lg:block">
              {renderPagination()}
            </div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-[30px] mt-8">
            {paginatedProducts.map((product) => (
              <div
                key={product.databaseId}
                className="border rounded-lg relative bg-white"
              >
                {product.onSale && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Sale
                  </span>
                )}
                <div className="absolute top-2 right-2">
                  <button
                    className="focus:outline-none"
                    onClick={() => handleFavoriteClick(product.databaseId)}
                  >
                    {favorites[product.databaseId] ? (
                      <FaHeart className="text-red-500 w-6 h-6" />
                    ) : (
                      <CiHeart className="text-black w-6 h-6" />
                    )}
                  </button>
                </div>
                <Link href={`/product/${product.slug}`}>
                  <Image
                    src={product.image.sourceUrl}
                    alt={product.image.altText || product.name}
                    width={200}
                    height={200}
                    className="w-full h-64 object-contain mb-4"
                  />
                </Link>
                <div className="p-4">
                  {/* <Link href={`/product/${product.slug}`}>
                    <h1
                      className={`text-sm 2xl:text-[20px] ${jost.className} uppercase cursor-pointer font-bold mb-2`}
                    >
                      {product.attributes.nodes.find(attr => attr.name === "Brand")?.options[0] || "Unknown Brand"}
                    </h1>
                  </Link> */}
                  <h3
                    className={`text-sm 2xl:text-[20px] ${lexendDeca.className} font-normal mb-2 h-[60px] overflow-hidden`}
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, index) => (
                      <span key={index}>
                        {index < Math.round(product.averageRating) ? (
                          <FaStar className="text-[#7E7E7E] w-4 h-4" />
                        ) : (
                          <FaRegStar className="text-[#7E7E7E] w-4 h-4" />
                        )}
                      </span>
                    ))}
                    <span className="text-gray-600 text-sm ml-2">
                      ({product.reviewCount})
                    </span>
                  </div>
                  <p
                    className={`font-bold text-lg mb-3 ${lexendDeca.className}`}
                  >
                    {product.onSale ? (
                      <>
                        <span className="line-through text-gray-600 mr-2">
                          {currencySymbol}
                          {(parseFloat(product.regularPrice) * rate).toFixed(2)}
                        </span>
                        {currencySymbol}
                        {(parseFloat(product.salePrice) * rate).toFixed(2)}
                      </>
                    ) : (
                      `${currencySymbol}${(parseFloat(product.price) * rate).toFixed(2)}`
                    )}
                  </p>
                  <button
                    className={`w-full bg-black text-white py-2 rounded-lg hover:bg-[#CF8562] transition ${jost.className}`}
                    onClick={() => addToCart(product)}
                  >
                    ADD TO BAG
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Bottom pagination for mobile */}
          <div className="mt-8 flex justify-end">
            {renderPagination()}
          </div>
        </div>
      </div>
      </Container>
      </>
  );
}