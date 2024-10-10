'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { FaStar, FaRegStar, FaHeart } from "react-icons/fa"
import { CiHeart } from "react-icons/ci"
import { MdKeyboardArrowDown } from "react-icons/md"
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
            _fields: "id,name,price,sale_price,regular_price,images,short_description,average_rating,rating_count,total_sales,attributes",
          },
        })
        
        const totalProducts = parseInt(response.headers['x-wp-total'] || '0')
        setTotalResults(totalProducts)
        setTotalPages(Math.ceil(totalProducts / PRODUCTS_PER_PAGE))
        setProducts(response.data)
      } catch (error) {
        console.error("Error fetching search results:", error)
        setError("Failed to fetch search results. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchSearchResults()
  }, [query, currentPage, sortBy])

  const handleFavoriteClick = (productId, e) => {
    e.preventDefault()
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
      <div className="flex justify-end items-center mt-8">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`mx-1 flex items-center justify-center w-8 h-8 ${
            currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-black hover:bg-gray-100'
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {pageNumbers.map((page, index) => 
          page === null ? (
            <span key={`ellipsis-${index}`} className="mx-1">...</span>
          ) : (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`mx-1 flex items-center justify-center w-8 h-8 ${
                currentPage === page
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`mx-1 flex items-center justify-center w-8 h-8 ${
            currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-black hover:bg-gray-100'
          }`}
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
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

        <div className="flex justify-start mb-4">
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
        ) : products.length === 0 ? (
          <div className={`text-center py-12 ${plusJakartaSans.className}`}>
            <p className="text-lg mb-4">
              No products found for &quot;{query}&quot;.
            </p>
            <p className="text-gray-600">
              Try searching with different keywords or check the spelling.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 ml-36">
              {products.map((product) => {
                const brand = product.attributes.find(
                  (attr) => attr.name === "Brand"
                )?.options[0] || "Unknown Brand";
                return (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="border p-4 rounded-lg relative bg-white"
                  >
                    {product.sale_price && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Sale
                      </span>
                    )}
                    <div className="absolute top-2 right-2">
                      <button
                        className="focus:outline-none"
                        onClick={(e) => handleFavoriteClick(product.id, e)}
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
            
            {totalPages > 1 && renderPagination()}
          </>
        )}
      </div>
    </Container>
  )
}