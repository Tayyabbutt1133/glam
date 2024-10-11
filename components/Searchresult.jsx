'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { FaStar, FaRegStar, FaHeart } from "react-icons/fa"
import { CiHeart } from "react-icons/ci"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { lexendDeca, jost, plusJakartaSans } from "../components/ui/fonts"
import { useCartStore } from '../states/Cardstore'
import Container from './container'

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

const FilterSection = ({ title, children, isOpen, toggleOpen }) => (
  <div className="mb-4">
    <button
      className={`w-full flex justify-between items-center py-2 px-4 ${lexendDeca.className} text-base`}
      onClick={toggleOpen}
    >
      <span className="font-semibold">{title}</span>
      {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
    </button>
    {isOpen && (
      <div className="mt-2 pl-4 max-h-60 overflow-y-auto">
        {children}
      </div>
    )}
  </div>
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
        const categories = new Set()
        const prices = []

        response.data.forEach(product => {
          const brand = product.attributes.find(attr => attr.name === "Brand")?.options[0]
          if (brand) brands.add(brand)
          product.categories.forEach(cat => categories.add(cat))
          prices.push(parseFloat(product.price))
        })

        setAvailableBrands(Array.from(brands).map(name => ({ id: name, name })))
        setAvailableCategories(Array.from(categories))

        // Calculate price ranges
        const minPrice = Math.floor(Math.min(...prices))
        const maxPrice = Math.ceil(Math.max(...prices))
        const range = maxPrice - minPrice
        const step = Math.ceil(range / 4)

        setAvailablePriceRanges([
          `${minPrice}-${minPrice + step}`,
          `${minPrice + step + 1}-${minPrice + 2 * step}`,
          `${minPrice + 2 * step + 1}-${minPrice + 3 * step}`,
          `${minPrice + 3 * step + 1}-${maxPrice}`,
        ])

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
      const categoryMatch = filters.categories.length === 0 || product.categories.some(cat => filters.categories.includes(cat.id.toString()))
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
      <nav className="flex justify-center items-center mt-8" aria-label="Pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-1 rounded-md ${
            currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-100'
          } ${lexendDeca.className}`}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5 inline-block" />
          <span className="sr-only">Previous</span>
        </button>

        {pageNumbers.map((page, index) => 
          page === null ? (
            <span key={`ellipsis-${index}`} className="mx-1">...</span>
          ) : (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 mx-1 rounded-md ${
                currentPage === page
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              } ${lexendDeca.className}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-1 rounded-md ${
            currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-100'
          } ${lexendDeca.className}`}
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5 inline-block" />
          <span className="sr-only">Next</span>
        </button>
      </nav>
    )
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
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${lexendDeca.className}`}>
            Search Results: &quot;{query}&quot;
          </h1>
          {isLoading ? (
            <p className={`text-gray-600 ${plusJakartaSans.className}`}>Loading...</p>
          ) : error ? (
            <p className={`text-red-500 ${plusJakartaSans.className}`}>{error}</p>
          ) : (
            <p className={`text-gray-600 ${plusJakartaSans.className}`}>
              {totalResults} result{totalResults !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar for filters */}
          <div className="md:w-1/4">
            <FilterSection
              title="Brand"
              isOpen={openFilters.brands}
              toggleOpen={() => setOpenFilters(prev => ({ ...prev, brands: !prev.brands }))}
            >
              {availableBrands.map(brand => (
                <div key={brand.id} className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                
                    id={`brand-${brand.id}`}
                    checked={filters.brands.includes(brand.name)}
                    onChange={() => handleFilterChange("brands", brand.name)}
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <label htmlFor={`brand-${brand.id}`} 
                    className={`${lexendDeca.className} text-sm`}
                  >
                    {brand.name}
                  </label>
                </div>
              ))}
            </FilterSection>

            <FilterSection
              title="Category"
              isOpen={openFilters.categories}
              toggleOpen={() => setOpenFilters(prev => ({ ...prev, categories: !prev.categories }))}
            >
              {availableCategories.map(category => (
                <div key={category.id} className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    id={`category-${category.id}`}
                    checked={filters.categories.includes(category.id.toString())}
                    onChange={() => handleFilterChange("categories", category.id.toString())}
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <label htmlFor={`category-${category.id}`}
                    className={`${lexendDeca.className} text-sm`}
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </FilterSection>

            <FilterSection
              title="Price Range"
              isOpen={openFilters.priceRange}
              toggleOpen={() => setOpenFilters(prev => ({ ...prev, priceRange: !prev.priceRange }))}
            >
              {availablePriceRanges.map(range => (
                <div key={range} className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    id={`price-${range}`}
                    checked={filters.priceRange.includes(range)}
                    onChange={() => handleFilterChange("priceRange", range)}
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <label htmlFor={`price-${range}`}
                    className={`${lexendDeca.className} text-sm`}
                  >
                    £{range}
                  </label>
                </div>
              ))}
            </FilterSection>
          </div>

          {/* Main content area */}
          <div className="md:w-3/4">
            <div className="flex justify-between items-center mb-4">
              <SortDropdown
                value={sortBy}
                onChange={(value) => setSortBy(value)}
              />
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
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
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE).map((product) => {
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
                            Sale
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
                          <Image
                            src={product.images[0]?.src || "/placeholder.svg"}
                            alt={decodeHtmlEntities(product.name)}
                            className="object-contain"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                          />
                        </div>
                        <h3 className={`text-sm  2xl:text-[22px] font-bold mb-1 ${lexendDeca.className}`}>{brand}</h3>
                        <h2 className={`text-sm 2xl:text-[20px] ${lexendDeca.className} font-normal mb-2 h-[60px] overflow-hidden`}>
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
                          <span className="text-gray-600 text-sm ml-2">
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
                          className={`w-full bg-black text-white py-2 rounded-lg hover:bg-[#CF8562] duration-300 transition ${jost.className}`}
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
                
                {renderPagination()}
              </>
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}