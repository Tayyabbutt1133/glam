'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { FaStar, FaRegStar, FaHeart } from "react-icons/fa"
import { CiHeart } from "react-icons/ci"
import { MdKeyboardArrowDown } from "react-icons/md"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { RxCross2 } from "react-icons/rx"
import { lexendDeca, jost, plusJakartaSans } from "../components/ui/fonts"
import { useCartStore } from '../states/Cardstore'
import Container from './container'
import arrow_forward from "../public/Keyboard arrow right.svg"
import arrow_previous from "../public/Keyboard arrow left.svg"
import filter from "../public/filter.svg"

const axiosInstance = axios.create({
  baseURL: "https://glam.clickable.site/wp-json/wc/v3/",
  auth: {
    username: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
    password: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
  },
})

const PRODUCTS_PER_PAGE = 12

const SortDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const options = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
  ]

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className={`inline-flex justify-between items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm ${lexendDeca.className} text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500`}
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-[#8B929D] font-normal">
            Sort by:{' '}
            <span className="text-black font-normal">
              {options.find(option => option.value === value)?.label || 'Popularity'}
            </span>
          </span>
          <MdKeyboardArrowDown className="text-black text-xl ml-2" aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={`block w-full text-left px-4 py-2 text-sm ${jost.className} ${option.value === value ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} hover:bg-gray-100 hover:text-gray-900`}
                role="menuitem"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const FilterSection = ({ title, isOpen, toggleOpen, children }) => (
  <div className="mb-6">
    <h4
      className={`font-bold text-lg mb-2 flex justify-between items-center cursor-pointer ${jost.className}`}
      onClick={toggleOpen}
    >
      <span>{title}</span>
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
)

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
)

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [products, setProducts] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [favorites, setFavorites] = useState({})
  const [sortBy, setSortBy] = useState('popularity')
  const addToCart = useCartStore((state) => state.addToCart)

  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    priceRange: [],
  })
  const [availableBrands, setAvailableBrands] = useState([])
  const [availableCategories, setAvailableCategories] = useState([])
  const [availablePriceRanges, setAvailablePriceRanges] = useState([])
  const [openFilters, setOpenFilters] = useState({
    brands: true,
    categories: true,
    priceRange: true,
  })
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return

      setIsLoading(true)
      setError(null)

      try {
        const response = await axiosInstance.get("products", {
          params: {
            search: query,
            page: currentPage,
            per_page: PRODUCTS_PER_PAGE,
            orderby: sortBy === 'popularity' ? 'popularity' : 'price',
            order: sortBy === 'price_desc' ? 'desc' : 'asc',
            _fields: "id,name,price,sale_price,regular_price,images,short_description,average_rating,rating_count,total_sales,attributes,categories",
          },
        })
        
        const totalProducts = parseInt(response.headers['x-wp-total'] || '0')
        setTotalResults(totalProducts)
        setTotalPages(Math.ceil(totalProducts / PRODUCTS_PER_PAGE))
        setProducts(response.data)

        // Extract unique brands and categories from the fetched products
        const brands = new Set()
        const categoryCounts = {}
        const prices = []

        response.data.forEach(product => {
          const brand = product.attributes.find(attr => attr.name === "Brand")?.options[0]
          if (brand) brands.add(brand)
          product.categories.forEach(cat => {
            if (categoryCounts[cat.name]) {
              categoryCounts[cat.name]++
            } else {
              categoryCounts[cat.name] = 1
            }
          })
          prices.push(parseFloat(product.price))
        })

        setAvailableBrands(Array.from(brands).map(name => ({ id: name, name })))
        setAvailableCategories(Object.entries(categoryCounts).map(([name, count]) => ({ id: name, name, count })))

        // Calculate price ranges
        const minPrice = Math.floor(Math.min(...prices))
        const maxPrice = Math.ceil(Math.max(...prices))
        const range = maxPrice - minPrice
        const step = Math.ceil(range / 4)

        const priceRanges = [
          `${minPrice}-${minPrice + step}`,
          `${minPrice + step + 1}-${minPrice + 2 * step}`,
          `${minPrice + 2 * step + 1}-${minPrice + 3 * step}`,
          `${minPrice + 3 * step + 1}-${maxPrice}`,
        ]

        // Filter out price ranges with no products
        const availablePriceRanges = priceRanges.filter(range => {
          const [min, max] = range.split("-").map(Number)
          return prices.some(price => price >= min && price <= max)
        })

        setAvailablePriceRanges(availablePriceRanges)

      } catch (error) {
        console.error("Error fetching search results:", error)
        setError("Failed to fetch search results. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchSearchResults()
  }, [query, currentPage, sortBy])

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter(item => item !== value)
        : [...prevFilters[filterType], value]
    }))
    setCurrentPage(1)
  }

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const brandMatch = filters.brands.length === 0 || filters.brands.includes(product.attributes.find(attr => attr.name === "Brand")?.options[0])
      const categoryMatch = filters.categories.length === 0 || product.categories.some(cat => filters.categories.includes(cat.name))
      const priceMatch = filters.priceRange.length === 0 || filters.priceRange.some(range => {
        const [min, max] = range.split("-").map(Number)
        const price = parseFloat(product.price)
        return price >= min && price <= max
      })
      return brandMatch && categoryMatch && priceMatch
    })
  }, [products, filters])

  const handleFavoriteClick = (productId, e) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorites(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }))
  }

  const decodeHtmlEntities = (text) => {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = text
    return textArea.value
  }

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2)
  }

  const ProductSkeleton = () => (
    <div className="border p-4 rounded-lg relative bg-white animate-pulse">
      <div className="w-full h-64 bg-gray-300 mb-4"></div>
      <div className="h-6 bg-gray-300 mb-2"></div>
      <div className="h-4 bg-gray-300 w-1/2"></div>
    </div>
  )

  const renderPagination = () => {
    const pageNumbers = []
    const ellipsis = <span className="mx-1">...</span>

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      pageNumbers.push(1)
      if (currentPage > 3) pageNumbers.push(null) // ellipsis
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
        pageNumbers.push(i)
      }
      if (currentPage < totalPages - 2) pageNumbers.push(null) // ellipsis
      pageNumbers.push(totalPages)
    }

    return (
      <nav className="flex items-center" aria-label="Pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`w-8 h-8 flex items-center justify-center mx-1 rounded-md ${
            currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-black border border-gray-300 hover:bg-gray-100'
          } ${lexendDeca.className}`}
          aria-label="Previous page"
        >
          <Image src={arrow_previous} alt="Previous" width={24} height={24} />
        </button>

        {pageNumbers.map((page, index) => 
          page === null ? (
            <span key={`ellipsis-${index}`} className="mx-1">...</span>
          ) : (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 flex items-center justify-center mx-1 rounded-md ${
                currentPage === page
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-300 hover:bg-gray-100"
              } ${lexendDeca.className}`}
              aria-current={currentPage === page ?   "page" : undefined}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`w-8 h-8 flex items-center justify-center mx-1 rounded-md ${
            currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-black border border-gray-300 hover:bg-gray-100'
          } ${lexendDeca.className}`}
          aria-label="Next page"
        >
          <Image src={arrow_forward} alt="Next" width={24} height={24} />
        </button>
      </nav>
    )
  }

  const clearAllFilters = () => {
    setFilters({
      brands: [],
      categories: [],
      priceRange: [],
    })
    setCurrentPage(1)
  }

  const removeFilter = (filterType, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].filter(item => item !== value),
    }))
  }

  if (!query) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className={`text-2xl font-bold mb-4 ${lexendDeca.className}`}>
          No search query provided
        </h1>
        <p className={`${plusJakartaSans.className}`}>
          Please enter a search term to find products.
        </p>
      </div>
    )
  }

  return (
    <Container>
      <div className="py-16">
        <div className="flex flex-col mb-8">
          <h1 className={`text-3xl font-bold ${lexendDeca.className}`}>
            Search Results
          </h1>
          <p className={`text-lg mt-2 ${lexendDeca.className}`}>
            {totalResults} results found for &quot;{query}&quot;
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar for filters */}
          <div
            style={{
              boxShadow: isMobileFilterOpen
                ? "-115px 0 10px 0 rgba(255, 255, 255)"
                : "none",
            }}
            className={`w-full transition-all duration-300 ease-in-out ${
              isMobileFilterOpen
                ? "z-[90] lg:z-auto h-screen overflow-y-auto lg:overflow-y-auto translate-x-[0] lg:translate-x-0"
                : "translate-x-[300%] lg:translate-x-0"
            } lg:w-1/4 p-4 fixed lg:static md:block top-0 bg-white`}
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
                <span className="hidden lg:block">Filters</span>
                <p className="lg:hidden mx-auto block text-center flex-grow">
                  Filter By
                </p>
              </h3>
              {(filters.brands.length > 0 ||
                filters.categories.length > 0 ||
                filters.priceRange.length > 0) && (
                <button
                  onClick={clearAllFilters}
                  className={`hidden lg:block text-sm text-[#8B929D] pl-4 underline ${lexendDeca.className}`}
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Filter chips */}
            {(filters.brands.length > 0 ||
              filters.categories.length > 0 ||
              filters.priceRange.length > 0) && (
              <div className="mb-4">
                {filters.brands.map((brand) => (
                  <span
                    key={brand}
                    className={`inline-flex items-center bg-[#F7EBE0] rounded-lg px-3 py-1 text-sm font-bold text-black 2xl:text-[20px] mr-2 mb-2 ${lexendDeca.className}`}
                  >
                    <span
                      className={`${lexendDeca.className} 2xl:text-[24px] font-normal mr-1 text-black`}
                    >
                      Brand:{' '}
                    </span>{' '}
                    {brand}
                    <button
                      onClick={() => removeFilter("brands", brand)}
                      className="ml-2 text-red-600 hover:text-red-700"
                    >
                      <RxCross2 />
                    </button>
                  </span>
                ))}

                {filters.categories.map((category) => (
                  <span
                    key={category}
                    className={`inline-flex items-center bg-[#F7EBE0] rounded-lg px-3 py-1 text-sm font-bold text-black mr-2 mb-2 2xl:text-[20px] ${lexendDeca.className}`}
                  >
                    <span
                      className={`${lexendDeca.className} 2xl:text-[24px] font-normal mr-1 text-black`}
                    >
                      Category:{' '}
                    </span>{' '}
                    {category}
                    <button
                      onClick={() => removeFilter("categories", category)}
                      className="ml-2 text-red-600 hover:text-red-700"
                    >
                      <RxCross2 />
                    </button>
                  </span>
                ))}

                {filters.priceRange.map((range) => (
                  <span
                    key={range}
                    className={`inline-flex items-center bg-[#F7EBE0] rounded-lg px-3 py-1 text-sm font-bold text-black mr-2 mb-2 2xl:text-[20px] ${lexendDeca.className}`}
                  >
                    <span
                      className={`${lexendDeca.className} 2xl:text-[24px] font-normal mr-1 text-black`}
                    >
                      Price:{' '}
                    </span>{' '}
                    £{range}
                    <button
                      onClick={() => removeFilter("priceRange", range)}
                      className="ml-2 text-red-600 hover:text-red-700"
                    >
                      <RxCross2 />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <hr className="bg-[#8B929D73] h-[1px] mb-4" />

            <FilterSection
              title="Brand"
              isOpen={openFilters.brands}
              toggleOpen={() => setOpenFilters(prev => ({ ...prev, brands: !prev.brands }))}
            >
              {availableBrands.map(brand => (
                <CustomCheckbox
                  key={brand.id}
                  name="brand"
                  value={brand.name}
                  checked={filters.brands.includes(brand.name)}
                  onChange={() => handleFilterChange("brands", brand.name)}
                  label={brand.name}
                  count={filteredProducts.filter(product => 
                    product.attributes.find(attr => attr.name === "Brand")?.options[0] === brand.name
                  ).length}
                />
              ))}
            </FilterSection>

            <FilterSection
              title="Category"
              isOpen={openFilters.categories}
              toggleOpen={() => setOpenFilters(prev => ({ ...prev, categories: !prev.categories }))}
            >
              {availableCategories.map(category => (
                <CustomCheckbox
                  key={category.id}
                  name="category"
                  value={category.name}
                  checked={filters.categories.includes(category.name)}
                  onChange={() => handleFilterChange("categories", category.name)}
                  label={category.name}
                  count={category.count}
                />
              ))}
            </FilterSection>

            <FilterSection
              title="Price Range"
              isOpen={openFilters.priceRange}
              toggleOpen={() => setOpenFilters(prev => ({ ...prev, priceRange: !prev.priceRange }))}
            >
              {availablePriceRanges.map(range => (
                <CustomCheckbox
                  key={range}
                  name="priceRange"
                  value={range}
                  checked={filters.priceRange.includes(range)}
                  onChange={() => handleFilterChange("priceRange", range)}
                  label={`£${range}`}
                  count={filteredProducts.filter(product => {
                    const [min, max] = range.split("-").map(Number)
                    const price = parseFloat(product.price)
                    return price >= min && price <= max
                  }).length}
                />
              ))}
            </FilterSection>

            <section className="flex justify-around mt-auto gap-4 lg:hidden">
              <button
                onClick={clearAllFilters}
                className={`text-sm text-[#8B929D] pl-4 underline ${lexendDeca.className}`}
              >
                Clear All
              </button>

              <button
                disabled={
                  filters.brands.length === 0 &&
                  filters.categories.length === 0 &&
                  filters.priceRange.length === 0
                }
                className="basis-1/2 bg-black text-white w-full py-2 rounded-lg"
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              >
                Apply Filter
              </button>
            </section>
          </div>

          {/* Main content area */}
          <div className="md:w-3/4">
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center">
                <button
                  onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                  className="lg:hidden mr-4"
                >
                  <Image src={filter} width={24} height={24} alt="Filter icon" />
                </button>
                <SortDropdown
                  value={sortBy}
                  onChange={(value) => setSortBy(value)}
                />
              </div>
              <div className="hidden lg:block">{renderPagination()}</div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {Array(PRODUCTS_PER_PAGE).fill(null).map((_, index) => (
                  <ProductSkeleton key={index} />
                ))}
              </div>
            ) : error ? (
              <div className={`text-red-500 ${plusJakartaSans.className}`}>{error}</div>
            ) : filteredProducts.length === 0 ? (
              <div className={`text-center py-12 ${plusJakartaSans.className}`}>
                <p className="text-lg mb-4">
                  No products found for &quot;{query}&quot; with the selected filters.
                </p>
                <p className="text-gray-600">
                  Try adjusting your filters or search with different keywords.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                  {filteredProducts.map((product) => {
                    if (!product.name || !product.price) return null; // Skip products without name or price
                    const brand = product.attributes.find(
                      (attr) => attr.name === "Brand"
                    )?.options[0] || "Unknown Brand";
                    return (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        className="border p-4 rounded-lg relative bg-white group"
                      >
                        {product.sale_price && (
                          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                            SALE
                          </span>
                        )}
                        <div className="absolute top-2 right-2 z-10">
                          <button
                            className="focus:outline-none bg-white rounded-full p-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                            onClick={(e) => handleFavoriteClick(product.id, e)}
                            aria-label={favorites[product.id] ? "Remove from favorites" : "Add to favorites"}
                          >
                            {favorites[product.id] ? (
                              <FaHeart className="text-red-500 w-6 h-6" />
                            ) : (
                              <CiHeart className="text-black w-6 h-6" />
                            )}
                          </button>
                        </div>
                        <div className="w-full h-64 relative mb-4">
                          {product.images && product.images[0] && (
                            <Image
                              src={product.images[0].src || "/placeholder.svg"}
                              alt={decodeHtmlEntities(product.name)}
                              className="object-contain"
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                            />
                          )}
                        </div>
                        <h3 className={`text-sm font-bold mb-1 ${lexendDeca.className}`}>{brand}</h3>
                        <h2 className={`text-sm ${lexendDeca.className} font-normal mb-2 h-[40px] overflow-hidden`}>
                          {decodeHtmlEntities(product.name)}
                        </h2>
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
                          <span className="text-gray-600 text-xs ml-2">
                            ({product.rating_count || 0})
                          </span>
                        </div>
                        <div className={`font-bold text-lg mb-3 ${lexendDeca.className}`}>
                          {product.sale_price ? (
                            <>
                              <span className="line-through text-gray-600 mr-2">
                                £{formatPrice(product.regular_price)}
                              </span>
                              <span className="text-black">
                                £{formatPrice(product.sale_price)}
                              </span>
                            </>
                          ) : (
                            <span className="text-black">
                              £{formatPrice(product.price)}
                            </span>
                          )}
                        </div>
                        <button
                          className={`w-full bg-black text-white py-2 rounded-lg hover:bg-[#CF8562] transition ${jost.className}`}
                          onClick={(e) => {
                            e.preventDefault()
                            addToCart(product)
                          }}
                        >
                          ADD TO BAG
                        </button>
                      </Link>
                    )
                  })}
                </div>
                
                <div className="mt-8 flex justify-end">
                  {renderPagination()}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}