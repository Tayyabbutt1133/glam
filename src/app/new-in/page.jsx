'use client'

import React, { useEffect, useState, useMemo } from "react"
import axios from "axios"
import Container from "../../../components/container"
import { FaStar, FaRegStar, FaHeart } from "react-icons/fa"
import { CiHeart } from "react-icons/ci"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import Image from "next/image"
import { lexendDeca, jost } from "../../../components/ui/fonts"

const API_BASE_URL = "https://glam.clickable.site/wp-json/wc/v3"
const CONSUMER_KEY = "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d"
const CONSUMER_SECRET = "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc"
const PRODUCTS_PER_PAGE = 12

export default function Component() {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState({})
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [priceRanges, setPriceRanges] = useState([])
  const [isBrandFilterOpen, setIsBrandFilterOpen] = useState(true)
  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(true)
  const [isPriceRangeFilterOpen, setIsPriceRangeFilterOpen] = useState(true)

  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    priceRange: []
  })

  const fetchProducts = async (page = 1) => {
    setLoading(true)
    try {
      const params = {
        per_page: 100,
        page,
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET,
      }

      const productsResponse = await axios.get(`${API_BASE_URL}/products`, { params })
      const fetchedProducts = productsResponse.data.map(product => ({
        ...product,
        name: product.name.replace(/&amp;/g, '&')
      }))
      setProducts(fetchedProducts)
      setTotalPages(Math.ceil(fetchedProducts.length / PRODUCTS_PER_PAGE))
      setCurrentPage(page)

      // Update brands, categories, and price ranges based on fetched products
      updateFilters(fetchedProducts)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateFilters = (fetchedProducts) => {
    // Update brands
    const uniqueBrands = [...new Set(fetchedProducts.flatMap(product => 
      product.attributes
        .filter(attr => attr.name === "Brand")
        .flatMap(attr => attr.options)
    ))]
    setBrands(uniqueBrands.map(brand => ({
      name: brand.replace(/&amp;/g, '&'),
      count: fetchedProducts.filter(product => 
        product.attributes.some(attr => 
          attr.name === "Brand" && attr.options.includes(brand)
        )
      ).length
    })))

    // Update categories
    const uniqueCategories = fetchedProducts.flatMap(product => product.categories)
      .filter((category, index, self) =>
        index === self.findIndex((t) => t.id === category.id)
      )
    setCategories(uniqueCategories.map(category => ({
      ...category,
      name: category.name.replace(/&amp;/g, '&'),
      count: fetchedProducts.filter(product => 
        product.categories.some(cat => cat.id === category.id)
      ).length
    })))

    // Update price ranges
    const prices = fetchedProducts.map(product => parseFloat(product.price))
    const minPrice = Math.floor(Math.min(...prices))
    const maxPrice = Math.ceil(Math.max(...prices))
    const range = maxPrice - minPrice
    const step = Math.ceil(range / 4)
    
    setPriceRanges([
      `${minPrice}-${minPrice + step}`,
      `${minPrice + step + 1}-${minPrice + 2 * step}`,
      `${minPrice + 2 * step + 1}-${minPrice + 3 * step}`,
      `${minPrice + 3 * step + 1}-${maxPrice}`
    ])
  }

  useEffect(() => {
    fetchProducts(1)
  }, [])

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters }
      const index = updatedFilters[filterType].indexOf(value)
      if (index > -1) {
        updatedFilters[filterType] = updatedFilters[filterType].filter(item => item !== value)
      } else {
        updatedFilters[filterType] = [...updatedFilters[filterType], value]
      }
      return updatedFilters
    })
    setCurrentPage(1)
  }

  const handleFavoriteClick = (productId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [productId]: !prevFavorites[productId],
    }))
  }

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const brandMatch = filters.brands.length === 0 || 
        product.attributes.some(attr => 
          attr.name === "Brand" && filters.brands.includes(attr.options[0])
        )
      const categoryMatch = filters.categories.length === 0 || 
        product.categories.some(cat => filters.categories.includes(cat.id.toString()))
      const priceMatch = filters.priceRange.length === 0 || 
        filters.priceRange.some(range => {
          const [min, max] = range.split('-').map(Number)
          const price = parseFloat(product.price)
          return price >= min && price <= max
        })
      return brandMatch && categoryMatch && priceMatch
    })
  }, [products, filters])

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE)
  }, [filteredProducts, currentPage])

  const getFilteredCount = (filterType, value) => {
    return filteredProducts.filter(product => {
      if (filterType === 'brands') {
        return product.attributes.some(attr => 
          attr.name === "Brand" && attr.options.includes(value)
        )
      } else if (filterType === 'categories') {
        return product.categories.some(cat => cat.id.toString() === value)
      } else if (filterType === 'priceRange') {
        const [min, max] = value.split('-').map(Number)
        const price = parseFloat(product.price)
        return price >= min && price <= max
      }
      return false
    }).length
  }

  return (
    <Container>
      <div className="flex flex-col lg:flex-row gap-4 mb-32 mt-32">
        <div className="w-full lg:w-1/4 p-4 sticky top-0 bg-white">
          <h3 className={`text-lg font-normal mb-4 flex items-center gap-4 ${lexendDeca.className}`}>
            <Image src="/filter.svg" width={24} height={24} alt="Filter icon" />
            Filters
          </h3>
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
              <div className={`pl-2 ${lexendDeca.className} font-normal`}>
                {brands
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((brand) => (
                    <label key={brand.name} className="block mb-2">
                      <input
                        type="checkbox"
                        name="brand"
                        value={brand.name}
                        checked={filters.brands.includes(brand.name)}
                        onChange={() => handleFilterChange('brands', brand.name)}
                        className={`mr-2`}
                      />
                      {brand.name} ({getFilteredCount('brands', brand.name)})
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
              <div className={`pl-2 ${lexendDeca.className} font-normal`}>
                {categories
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((category) => (
                    <label key={category.id} className="block mb-2">
                      <input
                        type="checkbox"
                        name="category"
                        value={category.id.toString()}
                        checked={filters.categories.includes(category.id.toString())}
                        onChange={() => handleFilterChange('categories', category.id.toString())}
                        className="mr-2"
                      />
                      {category.name} ({getFilteredCount('categories', category.id.toString())})
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
                      onChange={() => handleFilterChange('priceRange', range)}
                      className="mr-2"
                    />
                    £{range.split('-')[0]} - £{range.split('-')[1]} ({getFilteredCount('priceRange', range)})
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

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
                  const brand = product.attributes.find(
                    (attr) => attr.name === "Brand"
                  )?.options[0] || "Unknown Brand"
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
                      <img
                        src={product.images[0]?.src}
                        alt={product.name}
                        className="w-full h-64 object-cover mb-4"
                      />
                      <h1 className={`text-sm ${jost.className} font-bold mb-2`}>{brand}</h1>
                      <h3 className={`text-sm ${lexendDeca.className} font-normal mb-2 h-[60px] overflow-hidden`}>
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
                  )
                })}
          </div>

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
  )
}