"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "../../../components/container";
import { FaStar, FaRegStar, FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

export default function Page() {
  const [products, setProducts] = useState([]); // State for All Products
  const [currentPage, setCurrentPage] = useState(1); // State for Pagination
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  const [brandFilter, setBrandFilter] = useState(""); // State for Brand Filter
  const [priceRangeFilter, setPriceRangeFilter] = useState(""); // State for Price Range Filter
  const [loading, setLoading] = useState(true); // State for Loading
  const [favorites, setFavorites] = useState({}); // State to track favorited products

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Set loading state to true before fetching
      try {
        const productsResponse = await axios.get(
          `https://glam.clickable.site/wp-json/wc/v3/products`,
          {
            params: {
              per_page: 12, // Number of products to fetch per page
              page: currentPage, // Current page number
              category: "457", // Specifically fetch products under category 457
              brand: brandFilter, // Apply brand filter
              price: priceRangeFilter, // Apply price range filter
              consumer_key: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
              consumer_secret: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc"
            },
          }
        );
        setProducts(productsResponse.data);
        setTotalPages(parseInt(productsResponse.headers["x-wp-totalpages"]));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading state to false after fetching
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
    const { name, value } = e.target;
    if (name === "brand") {
      setBrandFilter(value);
    } else if (name === "priceRange") {
      setPriceRangeFilter(value);
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
        <div className="w-full lg:w-1/4 p-4 rounded bg-gray-100 shadow-md">
          <h3 className="text-lg font-bold mb-4">Filters</h3>
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Brand</h4>
            <select
              name="brand"
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            >
              <option value="">All</option>
              <option value="Brand1">Brand1</option>
              <option value="Brand2">Brand2</option>
              {/* Add more brand options here */}
            </select>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Price Range</h4>
            <select
              name="priceRange"
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            >
              <option value="">All</option>
              <option value="0-20">£0 - £20</option>
              <option value="20-50">£20 - £50</option>
              {/* Add more price range options here */}
            </select>
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
                      <div className="w-full h-48 bg-gray-300 mb-4"></div>
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
                      className="w-full h-48 object-cover mb-4"
                    />
                    <h3 className="text-lg font-bold mb-2 h-[40px] overflow-hidden text-ellipsis whitespace-nowrap">
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
                    <p className="font-bold text-lg mb-3">
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
                    <button className="w-[70%] md:w-[60%] lg:w-[85%] bg-black text-white py-2 mx-auto mt-auto rounded-md hover:bg-gray-800 transition">
                      ADD TO BAG
                    </button>
                  </div>
                ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-8">
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
