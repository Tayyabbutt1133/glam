"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "../../../components/container";
import { FaStar, FaRegStar, FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import filter from '../../../public/filter.svg'
import Image from "next/image";
import { jost, lexendDeca } from "../../../components/ui/fonts";



const API_BASE_URL = "https://glam.clickable.site/wp-json/wc/v3";
const CONSUMER_KEY = "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d";
const CONSUMER_SECRET = "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [brandFilter, setBrandFilter] = useState("");
  const [priceRangeFilter, setPriceRangeFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({});
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [isBrandFilterOpen, setIsBrandFilterOpen] = useState(true);
  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [isPriceRangeFilterOpen, setIsPriceRangeFilterOpen] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/products/attributes/1/terms`,
          {
            params: {
              consumer_key: CONSUMER_KEY,
              consumer_secret: CONSUMER_SECRET,
            },
          }
        );
        setBrands(response.data.map(brand => ({
          ...brand,
          name: brand.name.replace(/&amp;/g, '&')
        })));
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/products/categories`,
          {
            params: {
              consumer_key: CONSUMER_KEY,
              consumer_secret: CONSUMER_SECRET,
            },
          }
        );
        setCategories(response.data.map(category => ({
          ...category,
          name: category.name.replace(/&amp;/g, '&')
        })));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsResponse = await axios.get(
          `${API_BASE_URL}/products`,
          {
            params: {
              per_page: 12,
              page: 1,
              consumer_key: CONSUMER_KEY,
              consumer_secret: CONSUMER_SECRET,
            },
          }
        );
        const fetchedProducts = productsResponse.data;
        const prices = fetchedProducts.map(product => parseFloat(product.price));
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        setPriceRanges([
          `${Math.round(minPrice)}-${Math.round(minPrice + (maxPrice - minPrice) / 4)}`,
          `${Math.round(minPrice + (maxPrice - minPrice) / 4)}-${Math.round(minPrice + (maxPrice - minPrice) / 2)}`,
          `${Math.round(minPrice + (maxPrice - minPrice) / 2)}-${Math.round(minPrice + 3 * (maxPrice - minPrice) / 4)}`,
          `${Math.round(minPrice + 3 * (maxPrice - minPrice) / 4)}-${Math.round(maxPrice)}`,
        ]);

        setProducts(fetchedProducts);
        setTotalPages(parseInt(productsResponse.headers["x-wp-totalpages"]));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsResponse = await axios.get(
          `${API_BASE_URL}/products`,
          {
            params: {
              per_page: 12,
              page: currentPage,
              category: "457",
              brand: brandFilter,
              price: priceRangeFilter,
              consumer_key: CONSUMER_KEY,
              consumer_secret: CONSUMER_SECRET,
            },
          }
        );
        setProducts(productsResponse.data);
        setTotalPages(parseInt(productsResponse.headers["x-wp-totalpages"]));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, brandFilter, priceRangeFilter]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
  
    if (name === "brand") {
      setBrandFilter(value);
    } else if (name === "priceRange") {
      setPriceRangeFilter(value);
    } else if (name === "category") {
      setCategoryFilter((prev) =>
        checked ? [...prev, value] : prev.filter((cat) => cat !== value)
      );
    }
  };
  
  const handleFavoriteClick = (productId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [productId]: !prevFavorites[productId],
    }));
  };

  return (
    <Container>
      <div className="flex flex-col lg:flex-row gap-4 mb-32 mt-32">
        {/* Sidebar for Filters */}
        <div className="w-full lg:w-1/4 p-4 sticky top-0 bg-white">
          <h3 className={`text-lg font-normal mb-4 flex items-center gap-4 ${lexendDeca.className}`}>
            <Image src={filter}/>
            Filters
          </h3>
           <hr className="bg-[#8B929D73] h-[1px]" />
          {/* Brand Filter */}
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
              <div className={`pl-2 ${lexendDeca.className} font-normal`}>
                {brands
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((brand) => (
                    <label key={brand.id} className="block mb-2">
                      <input
                        type="checkbox"
                        name="brand"
                        value={brand.slug}
                        onChange={handleFilterChange}
                        className={`mr-2`}
                      />
                      {brand.name} ({brand.count})
                    </label>
                  ))}
              </div>
            )}
          </div>

          {/* Category Filter */}
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
              <div className={`pl-2 ${lexendDeca.className} font-normal`}>
                {categories
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((category) => (
                    <label key={category.id} className="block mb-2">
                      <input
                        type="checkbox"
                        name="category"
                        value={category.id}
                        onChange={handleFilterChange}
                        className="mr-2"
                      />
                      {category.name} ({category.count})
                    </label>
                  ))}
              </div>
            )}
          </div>

          {/* Price Range Filter */}
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
                <label className="block mb-2">
                  <input
                    type="checkbox"
                    name="priceRange"
                    value="0-15"
                    onChange={handleFilterChange}
                    className="mr-2"
                  />
                  £0 - £15 (7)
                </label>
                <label className="block mb-2">
                  <input
                    type="checkbox"
                    name="priceRange"
                    value="15-30"
                    onChange={handleFilterChange}
                    className="mr-2"
                  />
                  £15 - £30 (12)
                </label>
                <label className="block mb-2">
                  <input
                    type="checkbox"
                    name="priceRange"
                    value="30-50"
                    onChange={handleFilterChange}
                    className="mr-2"
                  />
                  £30 - £50 (3)
                </label>
                <label className="block mb-2">
                  <input
                    type="checkbox"
                    name="priceRange"
                    value="50-80"
                    onChange={handleFilterChange}
                    className="mr-2"
                  />
                  £50 - £80 (9)
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {loading
              ? Array(12)
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
              : products.map((product) => (
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
                    <img
                      src={product.images[0]?.src}
                      alt={product.name}
                      className="w-full h-64 object-cover mb-4"
                    />
                    <h3 className={`text-sm ${lexendDeca.className} font-normal mb-2 h-[60px] text-wrap text-ellipsis whitespace-nowrap`}>
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
                      <span className="text-gray-600 text-sm ml-2">({product.rating_count})</span>
                    </div>
                  <p className={`font-bold text-lg mb-3 ${lexendDeca.className}`}>
                      {product.sale_price ? (
                        <>
                          <span className="line-through text-gray-600 mr-2">
                            £{product.regular_price}
                          </span>
                          £{product.sale_price}
                        </>
                      ) : (
                        `£${product.price}`
                      )}
                    </p>
                  <button className={`w-[70%] md:w-[60%] lg:w-[100%] bg-black text-white py-2 mx-auto mt-auto rounded-md hover:bg-gray-800 transition ${jost.className}`}>
                      ADD TO BAG
                    </button>
                  </div>
                ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-end items-center mt-8">
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
        </div>
      </div>
    </Container>
  );
}
