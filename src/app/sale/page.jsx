"use client";

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Container from "../../../components/container";
import { FaStar, FaRegStar, FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoCloseCircleOutline, IoFilterOutline } from "react-icons/io5";
import Image from "next/image";
import { lexendDeca, jost } from "../../../components/ui/fonts";
import filter from "../../../public/filter.svg";
import { RxCross2 } from "react-icons/rx";
import { useCartStore } from "../../../states/Cardstore";
import { usePopupStore } from "../../../states/use-popup-store";
import Link from "next/link";
// Base URl + woCommerce Secure Key
const API_BASE_URL = "https://glam.clickable.site/wp-json/wc/v3";
const CONSUMER_KEY = "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d";
const CONSUMER_SECRET = "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc";
const PRODUCTS_PER_PAGE = 12;

export default function Component() {
  const {rate,currencySymbol} = usePopupStore();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({});
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [isBrandFilterOpen, setIsBrandFilterOpen] = useState(true);
  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(true);
  const [isPriceRangeFilterOpen, setIsPriceRangeFilterOpen] = useState(true);
  const [sortOption, setSortOption] = useState("popularity");

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);




  const addToCart = useCartStore((state) => state.addToCart);


  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    priceRange: [],
  });

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const params = {
        per_page: 100,
        page,
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET,
      };

      const productsResponse = await axios.get(`${API_BASE_URL}/products`, {
        params,
      });
      const fetchedProducts = productsResponse.data
        .map((product) => ({
          ...product,
          name: product.name.replace(/&amp;/g, "&"),
        }))
        .filter(
          (product) =>
            product.images.length > 0 &&
            product.attributes.some((attr) => attr.name === "Brand") &&
            product.name &&
            product.price
        );
      setProducts(fetchedProducts);
      setTotalPages(Math.ceil(fetchedProducts.length / PRODUCTS_PER_PAGE));
      setCurrentPage(page);

      updateFilters(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (fetchedProducts) => {
    const brandMap = new Map();
    fetchedProducts.forEach((product) => {
      const brandAttr = product.attributes.find(
        (attr) => attr.name === "Brand"
      );
      if (brandAttr) {
        const brandName = brandAttr.options[0].replace(/&amp;/g, "&");
        brandMap.set(brandName, (brandMap.get(brandName) || 0) + 1);
      }
    });
    setBrands(Array.from(brandMap, ([name, count]) => ({ name, count })));

    const categoryMap = new Map();
    fetchedProducts.forEach((product) => {
      product.categories.forEach((category) => {
        const categoryName = category.name.replace(/&amp;/g, "&");
        if (categoryMap.has(category.id)) {
          categoryMap.get(category.id).count++;
        } else {
          categoryMap.set(category.id, {
            ...category,
            name: categoryName,
            count: 1,
          });
        }
      });
    });
    setCategories(Array.from(categoryMap.values()));

    const prices = fetchedProducts.map((product) => parseFloat(product.price));
    const minPrice = Math.floor(Math.min(...prices));
    const maxPrice = Math.ceil(Math.max(...prices));
    const range = maxPrice - minPrice;
    const step = Math.ceil(range / 4);

    setPriceRanges([
      `${minPrice}-${minPrice + step}`,
      `${minPrice + step + 1}-${minPrice + 2 * step}`,
      `${minPrice + 2 * step + 1}-${minPrice + 3 * step}`,
      `${minPrice + 3 * step + 1}-${maxPrice}`,
    ]);
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      const index = updatedFilters[filterType].indexOf(value);
      if (index > -1) {
        updatedFilters[filterType] = updatedFilters[filterType].filter(
          (item) => item !== value
        );
      } else {
        updatedFilters[filterType] = [...updatedFilters[filterType], value];
      }
      return updatedFilters;
    });
    setCurrentPage(1);
  };

  const handleFavoriteClick = (productId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [productId]: !prevFavorites[productId],
    }));
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortProducts = (products) => {
    switch (sortOption) {
      case "popularity":
        return [...products].sort((a, b) => b.total_sales - a.total_sales);
      case "price-low-to-high":
        return [...products].sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
      case "price-high-to-low":
        return [...products].sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
      default:
        return products;
    }
  };

  // this is use when you have to show products even if there price is zero
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const brandMatch =
        filters.brands.length === 0 ||
        product.attributes.some(
          (attr) =>
            attr.name === "Brand" && filters.brands.includes(attr.options[0])
        );
      const categoryMatch =
        filters.categories.length === 0 ||
        product.categories.some((cat) =>
          filters.categories.includes(cat.id.toString())
        );
      const priceMatch =
        filters.priceRange.length === 0 ||
        filters.priceRange.some((range) => {
          const [min, max] = range.split("-").map(Number);
          const price = parseFloat(product.price);
          return price >= min && price <= max;
        });
      return brandMatch && categoryMatch && priceMatch;
    });
    return sortProducts(filtered);
  }, [products, filters, sortOption]);

  // this is use when you do not have to show products if there price is zero
  // const filteredAndSortedProducts = useMemo(() => {
  //   const filtered = products.filter(product => {
  //     const brandMatch = filters.brands.length === 0 ||
  //       product.attributes.some(attr =>
  //         attr.name === "Brand" && filters.brands.includes(attr.options[0])
  //       )
  //     const categoryMatch = filters.categories.length === 0 ||
  //       product.categories.some(cat => filters.categories.includes(cat.id.toString()))
  //     const priceMatch = filters.priceRange.length === 0 ||
  //       filters.priceRange.some(range => {
  //         const [min, max] = range.split('-').map(Number)
  //         const price = parseFloat(product.price)
  //         return price >= min && price <= max
  //       })

  //     // New condition: Exclude products with a price of 0
  //     const priceIsNotZero = parseFloat(product.price) !== 0

  //     return brandMatch && categoryMatch && priceMatch && priceIsNotZero
  //   })

  //   return sortProducts(filtered)
  // }, [products, filters, sortOption])

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredAndSortedProducts.slice(
      startIndex,
      startIndex + PRODUCTS_PER_PAGE
    );
  }, [filteredAndSortedProducts, currentPage]);

  const getFilteredCount = (filterType, value) => {
    return products.filter((product) => {
      const brandMatch =
        filters.brands.length === 0 ||
        product.attributes.some(
          (attr) =>
            attr.name === "Brand" &&
            (filters.brands.includes(attr.options[0]) ||
              attr.options[0] === value)
        );
      const categoryMatch =
        filters.categories.length === 0 ||
        product.categories.some(
          (cat) =>
            filters.categories.includes(cat.id.toString()) ||
            cat.id.toString() === value
        );
      const priceMatch =
        filters.priceRange.length === 0 ||
        filters.priceRange.some((range) => {
          const [min, max] = range.split("-").map(Number);
          const price = parseFloat(product.price);
          return (price >= min && price <= max) || range === value;
        });

      if (filterType === "brands") {
        return (
          categoryMatch &&
          priceMatch &&
          product.attributes.some(
            (attr) => attr.name === "Brand" && attr.options.includes(value)
          )
        );
      } else if (filterType === "categories") {
        return (
          brandMatch &&
          priceMatch &&
          product.categories.some((cat) => cat.id.toString() === value)
        );
      } else if (filterType === "priceRange") {
        const [min, max] = value.split("-").map(Number);
        const price = parseFloat(product.price);
        return brandMatch && categoryMatch && price >= min && price <= max;
      }
      return false;
    }).length;
  };

  const clearAllFilters = () => {
    setFilters({
      brands: [],
      categories: [],
      priceRange: [],
    });
    setCurrentPage(1);
  };

  const removeFilter = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].filter((item) => item !== value),
    }));
  };

  const renderPagination = () => (
    <div className="flex justify-end items-center">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 mx-1 bg-transparent border border-gray-300 rounded hover:bg-black hover:text-white transition ${
          currentPage === 1 ? "disabled:bg-transparent" : ""
        }`}
      >
        &lt;
      </button>
      {currentPage > 2 && (
        <button
          onClick={() => handlePageChange(1)}
          className="px-4 py-2 mx-1 bg-transparent border border-gray-300 rounded hover:bg-black hover:text-white transition"
        >
          1
        </button>
      )}
      {currentPage > 3 && <span className="px-4 py-2">...</span>}
      {currentPage > 1 && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 mx-1 bg-transparent border border-gray-300 rounded hover:bg-black hover:text-white transition"
        >
          {currentPage - 1}
        </button>
      )}
      <button
        onClick={() => handlePageChange(currentPage)}
        className="px-4 py-2 mx-1 bg-black text-white rounded"
      >
        {currentPage}
      </button>
      {currentPage < totalPages && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 mx-1 bg-transparent border border-gray-300 rounded hover:bg-black hover:text-white transition"
        >
          {currentPage + 1}
        </button>
      )}
      {currentPage < totalPages - 2 && <span className="px-4 py-2">...</span>}
      {currentPage < totalPages - 1 && (
        <button
          onClick={() => handlePageChange(totalPages)}
          className="px-4 py-2 mx-1 bg-transparent border border-gray-300 rounded hover:bg-black hover:text-white transition"
        >
          {totalPages}
        </button>
      )}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 mx-1 bg-transparent border border-gray-300 rounded hover:bg-black hover:text-white transition ${
          currentPage === totalPages ? "disabled:bg-transparent" : ""
        }`}
      >
        &gt;
      </button>
    </div>
  );


  return (
    <Container className="min-h-screen py-32">
      {/* <div className=""> */}
      <div className="flex justify-between items-center">
        <div className="flex items-center  lg:hidden mr-10">
          <button onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}>
            <span
              className={` flex items-center gap-2 text-md ${jost.className}`}
            >
              Filters <IoFilterOutline className="w-6 h-6" />
            </span>
          </button>
        </div>

        <div className=" flex flex-col md:flex-row items-center lg:ml-[20rem] mr-auto">
          <select
            value={sortOption}
            onChange={handleSortChange}
            className={`px-4 py-2 border border-gray-300 ${lexendDeca.className} rounded-md font-jost text-black`} // Apply font classes to the select itself
          >
            <option value="popularity" className="text-black">
              Sort by: Popularity
            </option>
            <option value="price-low-to-high" className="text-black">
              Price: Low to High
            </option>
            <option value="price-high-to-low" className="text-black">
              Price: High to Low
            </option>
          </select>
        </div>
        <span className="hidden lg:block">{renderPagination()}</span>
      </div>

    
      <div className="flex flex-col lg:flex-row gap-4 mb-32">
          {/* side filter */}
          <div
          className={`w-full  transition-all duration-300 ease-in-out ${
            isMobileFilterOpen
              ? "z-[90] lg:z-auto h-screen overflow-y-auto lg:overflow-y-auto  translate-x-[0] lg:translate-x-0"
              : " translate-x-[300%] lg:translate-x-0"
          }   lg:w-1/4 p-4   fixed lg:static md:block top-0 bg-white`}
        >
          <div className="flex justify-between items-center mb-4">
          <h3
              className={`text-lg font-normal flex w-full items-center gap-4 ${lexendDeca.className}`}
            >
              <Image
                src={filter}
                width={24}
                height={24}
                alt="Filter icon"
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              />
              <span className=" hidden lg:block">Filters</span>
              <p className=" lg:hidden mx-auto block text-center flex-grow">
                Filter By
              </p>
            </h3>
            {(filters.brands.length > 0 ||
              filters.categories.length > 0 ||
              filters.priceRange.length > 0) && (
                <button
                onClick={clearAllFilters}
                className={` hidden min-w-fit lg:block text-sm text-[#8B929D] pl-4 underline ${lexendDeca.className}`}
              >
                Clear All
              </button>
            )}
          </div>

          {(filters.brands.length > 0 ||
            filters.categories.length > 0 ||
            filters.priceRange.length > 0) && (
            <div className="mb-4">
              {filters.brands.map((brand) => (
                <span
                  key={brand}
                  className={`inline-flex items-center bg-[#F7EBE0] rounded-lg px-3 py-1 text-sm font-bold text-black mr-2 mb-2 ${lexendDeca.className}`}
                >
                  <span
                    className={`${lexendDeca.className} font-normal mr-1 text-black`}
                  >
                    Brand:{" "}
                  </span>{" "}
                  {brand}
                  <button
                    onClick={() => removeFilter("brands", brand)}
                    className="ml-2 text-red-600 hover:text-red-700"
                  >
                    <RxCross2 />
                  </button>
                </span>
              ))}







              {filters.categories.map((categoryId) => {
                const category = categories.find(
                  (c) => c.id.toString() === categoryId
                );
                return category ? (
                  <span
                    key={categoryId}
                    className={`inline-flex items-center bg-[#F7EBE0] rounded-lg px-3 py-1 text-sm font-bold text-black mr-2 mb-2 ${lexendDeca.className}`}
                  >
                     <span
                    className={`${lexendDeca.className} font-normal mr-1 text-black`}
                  >
                    Category:{" "}
                  </span>{" "}
                    {category.name}
                    <button
                    onClick={() => removeFilter("Category", categoryId)}
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
                  className={`inline-flex items-center bg-[#F7EBE0] rounded-lg px-3 py-1 text-sm font-bold text-black mr-2 mb-2 ${lexendDeca.className}`}
                >
                      <span
                    className={`${lexendDeca.className} font-normal mr-1 text-black`}
                  >
                    Price:{" "}
                  </span>{" "}
                  £{range}
                  <button
                    onClick={() => removeFilter("Price", range)}
                    className="ml-2 text-red-600 hover:text-red-700"
                  >
                    <RxCross2 />
                  </button>
                </span>
              ))}
            </div>
          )}

          <hr className="bg-[#8B929D73] h-[1px]" />
          <div className="mb-6 mt-4">
            <h4
              className={`font-bold text-lg mb-2 flex justify-between items-center cursor-pointer ${jost.className}`}
              onClick={() => setIsBrandFilterOpen(!isBrandFilterOpen)}
            >
              Brand
              {isBrandFilterOpen ? (
                <IoIosArrowUp className="text-gray-500" />
              ) : (
                <IoIosArrowDown className="text-gray-500" />
              )}
            </h4>
            {isBrandFilterOpen && (
              <div
                className={`pl-2 ${lexendDeca.className} font-normal max-h-60 overflow-y-auto`}
              >
                {brands
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((brand) => (
                    <label key={brand.name} className="block mb-2">
                      <input
                        type="checkbox"
                        name="brand"
                        value={brand.name}
                        checked={filters.brands.includes(brand.name)}
                        onChange={() =>
                          handleFilterChange("brands", brand.name)
                        }
                        className={`mr-2`}
                      />
                      {brand.name} ({brand.count})
                    </label>
                  ))}
              </div>
            )}
          </div>

          <div className="mb-6">
            <h4
              className={`font-bold ${jost.className} text-lg mb-2 flex justify-between items-center cursor-pointer`}
              onClick={() => setIsCategoryFilterOpen(!isCategoryFilterOpen)}
            >
              Category
              {isCategoryFilterOpen ? (
                <IoIosArrowUp className="text-gray-500" />
              ) : (
                <IoIosArrowDown className="text-gray-500" />
              )}
            </h4>
            {isCategoryFilterOpen && (
              <div
                className={`pl-2 ${lexendDeca.className} font-normal max-h-60 overflow-y-auto`}
              >
                {categories
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((category) => (
                    <label key={category.id} className="block mb-2">
                      <input
                        type="checkbox"
                        name="category"
                        value={category.id.toString()}
                        checked={filters.categories.includes(
                          category.id.toString()
                        )}
                        onChange={() =>
                          handleFilterChange(
                            "categories",
                            category.id.toString()
                          )
                        }
                        className="mr-2"
                      />
                      {category.name} ({category.count})
                    </label>
                  ))}
              </div>
            )}
          </div>

          <div className="mb-6">
            <h4
              className={`font-bold ${jost.className} text-lg mb-2 flex justify-between items-center cursor-pointer`}
              onClick={() => setIsPriceRangeFilterOpen(!isPriceRangeFilterOpen)}
            >
              Price Range
              {isPriceRangeFilterOpen ? (
                <IoIosArrowUp className="text-gray-500" />
              ) : (
                <IoIosArrowDown className="text-gray-500" />
              )}
            </h4>
            {isPriceRangeFilterOpen && (
              <div className={`pl-2 ${lexendDeca.className}`}>
                {priceRanges.map((range) => (
                  <label key={range} className="block mb-2">
                    <input
                      type="checkbox"
                      name="priceRange"
                      value={range}
                      checked={filters.priceRange.includes(range)}
                      onChange={() => handleFilterChange("priceRange", range)}
                      className="mr-2"
                    />
                    £{range.split("-")[0]} - £{range.split("-")[1]} (
                    {getFilteredCount("priceRange", range)})
                  </label>
                ))}
              </div>
            )}
          </div>
          <section className="flex  justify-around  mt-auto gap-4 lg:hidden">
            <button
              onClick={clearAllFilters}
              className={`  text-sm text-[#8B929D] pl-4 underline ${lexendDeca.className}`}
            >
              Clear All
            </button>

            <button
              disabled={
                filters.brands.length === 0 &&
                filters.categories.length === 0 &&
                filters.priceRange.length === 0
              }
              className=" basis-1/2 bg-black text-white w-full py-2 rounded-md"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            >
              Apply Filter
            </button>
          </section>
        </div>

        

        
        {/* product grid listing */}
        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {loading
              ? Array(PRODUCTS_PER_PAGE)
                  .fill("")
                  .map((_, index) => (
                    <div
                      key={index}
                      className="border p-4 rounded-lg shadow-lg relative bg-white animate-pulse"
                    >
                      <div className="w-full h-64 bg-gray-300 mb-4"></div>
                      <div className="h-6 bg-gray-300 mb-2"></div>
                      <div className="h-4 bg-gray-300 w-1/2"></div>
                    </div>
                  ))
              : paginatedProducts.map((product) => {
                  const brand =
                    product.attributes.find((attr) => attr.name === "Brand")
                      ?.options[0] || "Unknown Brand";
                  return (
                    <div
                      key={product.id}
                      className="border p-4 rounded-lg shadow-lg relative bg-white"
                    >
                      {product.sale_price && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          Sale
                        </span>
                      )}
                      <div className="absolute top-2 right-2">
                        <button
                          className="focus:outline-none"
                          onClick={() => handleFavoriteClick(product.id)}
                        >
                          {favorites[product.id] ? (
                            <FaHeart className="text-red-500 w-6 h-6" />
                          ) : (
                            <CiHeart className="text-black w-6 h-6" />
                          )}
                        </button>
                      </div>
                      <Link href={`/product/${product.id}`}>
                      <img
                        src={product.images[0]?.src}
                        alt={product.name}
                        className="w-full h-64 object-cover mb-4"
                      />
                    </Link>
                    <Link href={`/product/${product.id}`}>
                      <h1 className={`text-sm ${jost.className} cursor-pointer font-bold mb-2`}>
                        {brand}
                      </h1>
                    </Link>
                      <h3
                        className={`text-sm ${lexendDeca.className} font-normal mb-2 h-[60px] overflow-hidden`}
                      >
                        {product.name}
                      </h3>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, index) => (
                          <span key={index}>
                            {index < Math.round(product.average_rating) ? (
                              <FaStar className="text-[#7E7E7E] w-4 h-4" />
                            ) : (
                              <FaRegStar className="text-[#7E7E7E] w-4 h-4" />
                            )}
                          </span>
                        ))}
                        <span className="text-gray-600 text-sm ml-2">
                          ({product.rating_count})
                        </span>
                      </div>
                      <p
                        className={`font-bold text-lg mb-3 ${lexendDeca.className}`}
                      >
                        {product.sale_price ? (
                          <>
                            <span className="line-through text-gray-600 mr-2">
                              {currencySymbol}{(product.regular_price * rate).toFixed(2)}
                            </span>
                            {currencySymbol}{(product.sale_price * rate).toFixed(2)}
                          </>
                        ) : (
                          `${currencySymbol}${(product.price * rate).toFixed(2)}`
                        )}
                      </p>
                      <button
                        className={`w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition ${jost.className}`}
                    onClick={()=>addToCart(product)}  >
                        ADD TO BAG
                      </button>
                    </div>
                  );
                })}
          </div>

          {/* pagination rendering */}
          <div className="mt-8 flex justify-end">{renderPagination()}</div>
        </div>





      </div>
      {/* </div> */}
    </Container>
  );
}
