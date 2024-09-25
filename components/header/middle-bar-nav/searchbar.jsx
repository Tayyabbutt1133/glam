'use client'

import { useState, useEffect, useRef, useCallback } from "react"
import SearchIcon from "../../../public/icons/search"
import axios from "axios"
import { lexendDeca, jost } from "../../ui/fonts"
import debounce from "lodash.debounce"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

const axiosInstance = axios.create({
  baseURL: "https://glam.clickable.site/wp-json/wc/v3/",
  auth: {
    username: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
    password: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
  },
})

export default function FastSearchBarWithDropdown({ formobile = false }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [products, setProducts] = useState([])
  const [popularSearches, setPopularSearches] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const searchBarRef = useRef(null)
  const cancelTokenSource = useRef(null)

  const router = useRouter()

  const handleSearch = useCallback(
    debounce(async (searchQuery) => {
      if (cancelTokenSource.current) {
        cancelTokenSource.current.cancel("Operation canceled due to new request.")
      }

      cancelTokenSource.current = axios.CancelToken.source()

      if (searchQuery.length > 0) {
        setIsLoading(true)
        setHasSearched(false)
        setIsDropdownOpen(true)

        try {
          const productResponse = await axiosInstance.get("products", {
            params: {
              search: searchQuery,
              per_page: 5,
              _fields: "id,name,price,sale_price,regular_price,images",
            },
            cancelToken: cancelTokenSource.current.token,
          })
          setProducts(productResponse.data)
          setHasSearched(true)
        } catch (error) {
          if (!axios.isCancel(error)) {
            console.error("Error fetching products:", error)
          }
        }

        setIsLoading(false)
      } else {
        setIsDropdownOpen(false)
        setProducts([])
      }
    }, 150),
    []
  )

  const handleChange = (e) => {
    const searchQuery = e.target.value
    setQuery(searchQuery)
    handleSearch(searchQuery)
  }

  const fetchPopularSearches = async () => {
    try {
      const response = await axiosInstance.get("products/attributes/1/terms", {
        params: {
          per_page: 6,
          _fields: "id,name",
        },
      })
      setPopularSearches(response.data)
    } catch (error) {
      console.error("Error fetching popular searches:", error)
    }
  }

  const handleClickOutside = useCallback((e) => {
    if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
      setIsDropdownOpen(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    fetchPopularSearches()
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [handleClickOutside])

  const SkeletonLoader = () => (
    <div className="animate-pulse flex p-1 items-center">
      <div className="w-10 h-10 mr-4 ml-4 bg-gray-200 rounded-md flex-shrink-0"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  )

  return (
    <div ref={searchBarRef} className={`flex justify-center relative ${formobile ? 'w-full' : 'w-[768px]'}`}>
      <section
        className={`flex flex-row ${formobile ? 'w-full' : 'w-[80%] max-w-[696px]'} h-10 border border-solid
        border-b-03 rounded-[8px] px-1 focus-within:border-gray-700 transition-colors ease-in-out duration-100`}
      >
        <div className="grid place-items-center h-full w-12">
          <SearchIcon className="h-auto w-5" />
        </div>
        <input
          className="h-full w-full outline-none text-sm text-secondary pr-2"
          type="text"
          id="search"
          placeholder="Search products, trends"
          value={query}
          onChange={handleChange}
          aria-label="Search products and trends"
        />
      </section>

      <div
        className={`absolute top-12 left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 ${
          isDropdownOpen ? "flex" : "hidden"
        }`}
      >
        <div className="w-1/2 p-4 border-r border-gray-200 bg-[#F7F7F7]">
          <h3 className={`text-xs font-normal text-[#8B929D] ${jost.className} uppercase mb-2`}>
            Popular Searches
          </h3>
          <ul className="space-y-4 text-xs">
            {popularSearches.map((term) => (
              <li key={term.id}>
                <Link 
                  href={`/brands/${encodeURIComponent(term.name.toLowerCase())}`}
                  className={`block cursor-pointer transition duration-300 hover:bg-[#CF8562] hover:text-white p-1 ${lexendDeca.className} font-medium`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  {term.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-2/3 p-4">
          <h3 className={`text-xs text-[#8B929D] ${jost.className} font-normal uppercase mb-2`}>
            Trending Products
          </h3>
          <ul className="space-y-4 text-xs">
            {isLoading ? (
              Array(5).fill(0).map((_, index) => (
                <li key={index}>
                  <SkeletonLoader />
                </li>
              ))
            ) : products.length > 0 ? (
              products.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/product/${product.id}`}
                    className="flex p-1 items-center cursor-pointer transition duration-300 hover:bg-[#CF8562] hover:text-white group"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <div className="w-10 h-10 mr-4 ml-4 bg-gray-100 flex-shrink-0">
                      <Image
                        src={product.images[0]?.src || "/placeholder.svg?height=40&width=40"}
                        alt={product.name}
                        className="object-cover w-full h-full rounded-md"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="">
                      <p className={`font-medium text-wrap ${lexendDeca.className}`}>
                        {product.name}
                      </p>
                      <div className="flex flex-row gap-3">
                        {product.sale_price ? (
                          <>
                            <p className="line-through text-gray-400 group-hover:text-white">£{product.regular_price}</p>
                            <p className="text-red-600 group-hover:text-white">£{product.sale_price}</p>
                          </>
                        ) : (
                          <p className="text-black group-hover:text-white">£{product.price}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              ))
            ) : hasSearched ? (
              <li>No products found.</li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  )
}