"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "../../../components/container";

export default function Page() {
  const [products, setProducts] = useState([]); // State for All Products
  const [currentPage, setCurrentPage] = useState(1); // State for Pagination
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  const [brandFilter, setBrandFilter] = useState(""); // State for Brand Filter
  const [categoryFilter, setCategoryFilter] = useState(""); // State for Category Filter
  const [priceRangeFilter, setPriceRangeFilter] = useState(""); // State for Price Range Filter
  const [loading, setLoading] = useState(true); // State for Loading

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Set loading state to true before fetching
      try {
        const productsResponse = await axios.get(
          `https://glam.clickable.site/wp-json/wc/v3/products?consumer_key=ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d&consumer_secret=cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc`,
          {
            params: {
              per_page: 12, // Number of products to fetch per page
              page: currentPage, // Current page number
              brand: brandFilter, // Apply brand filter
              category: categoryFilter, // Apply category filter
              price: priceRangeFilter, // Apply price range filter
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
  }, [currentPage, brandFilter, categoryFilter, priceRangeFilter]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "brand") {
      setBrandFilter(value);
    } else if (name === "category") {
      setCategoryFilter(value);
    } else if (name === "priceRange") {
      setPriceRangeFilter(value);
    }
  };

  return (
    <Container>
      <div className="flex flex-col lg:flex-row gap-4 mb-32 mt-32">
        {/* Sidebar for Filters */}
        <div className="w-full lg:w-1/4 p-4 rounded">
          <h3 className="text-lg font-bold mb-4">Filters</h3>
          <div className="mb-4">
            <h4 className="font-semibold">Brand</h4>
            <select name="brand" onChange={handleFilterChange} className="w-full p-2 border rounded">
              <option value="">All</option>
              <option value="Brand1">Brand1</option>
              <option value="Brand2">Brand2</option>
              {/* Add more brand options here */}
            </select>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">Category</h4>
            <select name="category" onChange={handleFilterChange} className="w-full p-2 border rounded">
              <option value="">All</option>
              <option value="Category1">Category1</option>
              <option value="Category2">Category2</option>
              {/* Add more category options here */}
            </select>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">Price Range</h4>
            <select name="priceRange" onChange={handleFilterChange} className="w-full p-2 border rounded">
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
                      className="border p-4 rounded shadow relative animate-pulse"
                    >
                      <div className="w-full h-48 bg-gray-200 mb-4"></div>
                      <div className="h-6 bg-gray-200 mb-2"></div>
                      <div className="h-4 bg-gray-200 w-1/2"></div>
                    </div>
                  ))
              : products.map((product) => (
                  <div
                    key={product.id}
                    className="border p-4 rounded shadow relative"
                  >
                    <img
                      src={product.images[0]?.src}
                      alt={product.name}
                      className="w-full h-48 object-cover mb-4"
                    />
                    <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                    <p className="font-bold">{`£${product.price}`}</p>
                    <button className="mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-700 transition">
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
              className={`px-4 py-2 mx-1 bg-transparent border border-gray-300 rounded hover:bg-black hover:text-white transition disabled:bg-transparent`}
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
            <button className="px-4 py-2 mx-1 bg-black text-white rounded">{currentPage}</button>
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
              className="px-4 py-2 mx-1 bg-transparent border border-gray-300 rounded hover:bg-black hover:text-white transition disabled:bg-transparent"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
