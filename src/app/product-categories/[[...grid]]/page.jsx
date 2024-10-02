"use client"

import React, { useEffect, useState, useMemo } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { FaStar, FaRegStar, FaHeart } from "react-icons/fa"
import { CiHeart } from "react-icons/ci"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { IoFilterOutline } from "react-icons/io5"
import { RxCross2 } from "react-icons/rx"
import { MdKeyboardArrowDown } from 'react-icons/md'
import { lexendDeca, jost } from "/components/ui/fonts"
import Container from "/components/container"
import filter from "../../../../public/filter.svg"
import { usePopupStore } from "/states/use-popup-store"
import { useCartStore } from "/states/Cardstore"
import Breadcrumb from "../../../../components/BreadCrumb"
import arrow_forward from '../../../../public/Keyboard arrow right.svg'
import arrow_previous from '../../../../public/Keyboard arrow left.svg'


const API_BASE_URL = "https://glam.clickable.site/wp-json/wc/v3"
const CONSUMER_KEY = "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d"
const CONSUMER_SECRET = "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc"
const PRODUCTS_PER_PAGE = 12

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
)

const CustomDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = React.useRef(null)

  const handleToggle = () => setIsOpen(!isOpen)

  const handleOptionClick = (optionValue) => {
    onChange({ target: { value: optionValue } })
    setIsOpen(false)
  }

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const selectedOption = options.find(option => option.value === value)

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className={`inline-flex justify-between items-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm ${jost.className} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 `}
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
  )
}

export default function Component() {
  const { rate, currencySymbol } = usePopupStore()
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
  const [sortOption, setSortOption] = useState("popularity")
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const addToCart = useCartStore((state) => state.addToCart)

  const params = useParams()
  const subsubcategories = params.grid[2]
  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    priceRange: [],
  })

  const fetchProducts = async (page = 1) => {
    setLoading(true)
    try {
      const productsResponse = await axios.get(`/api/getProductsBySlug/${subsubcategories}`)
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
        )
      setProducts(fetchedProducts)
      setTotalPages(Math.ceil(fetchedProducts.length / PRODUCTS_PER_PAGE))
      setCurrentPage(page)

      updateFilters(fetchedProducts)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateFilters = (fetchedProducts) => {
    const brandMap = new Map()
    const categoryMap = new Map()
    const prices = []

    fetchedProducts.forEach((product) => {
      const brandAttr = product.attributes.find(
        (attr) => attr.name === "Brand"
      )
      if (brandAttr) {
        const brandName = brandAttr.options[0].replace(/&amp;/g, "&")
        if (!brandMap.has(brandName)) {
          brandMap.set(brandName, { count: 1, categories: new Set() })
        } else {
          brandMap.get(brandName).count++
        }
        product.categories.forEach((category) => {
          brandMap.get(brandName).categories.add(category.id)
        })
      }

      product.categories.forEach((category) => {
        const categoryName = category.name.replace(/&amp;/g, "&")
        if (!categoryMap.has(category.id)) {
          categoryMap.set(category.id, { ...category, name: categoryName, count: 1 })
        } else {
          categoryMap.get(category.id).count++
        }
      })

      const price = parseFloat(product.price)
      if (!isNaN(price)) {
        prices.push(price)
      }
    })

    setBrands(Array.from(brandMap, ([name, data]) => ({ name, count: data.count, categories: Array.from(data.categories) })))
    setCategories(Array.from(categoryMap.values()))

    const minPrice = Math.floor(Math.min(...prices))
    const maxPrice = Math.ceil(Math.max(...prices))
    const range = maxPrice - minPrice
    const step = Math.ceil(range / 4)

    setPriceRanges([
      `${minPrice}-${minPrice + step}`,
      `${minPrice + step + 1}-${minPrice + 2 * step}`,
      `${minPrice + 2 * step + 1}-${minPrice + 3 * step}`,
      `${minPrice + 3 * step + 1}-${maxPrice}`,
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
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters }
      const index = updatedFilters[filterType].indexOf(value)
      if (index > -1) {
        updatedFilters[filterType] = updatedFilters[filterType].filter(
          (item) => item !== value
        )
      } else {
        updatedFilters[filterType] = [...updatedFilters[filterType], value]
      }

      if (filterType === "brands") {
        updatedFilters.categories = []
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

  const handleSortChange = (event) => {
    setSortOption(event.target.value)
  }

  const sortProducts = (products) => {
    switch (sortOption) {
      case "popularity":
        return [...products].sort((a, b) => b.total_sales - a.total_sales)
      case "price-low-to-high":
        return [...products].sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        )
      case "price-high-to-low":
        return [...products].sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        )
      default:
        return products
    }
  }

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const brandMatch =
        filters.brands.length === 0 ||
        product.attributes.some(
          (attr) =>
            attr.name === "Brand" &&
            filters.brands.includes(attr.options[0])
        )
      const categoryMatch =
        filters.categories.length === 0 ||
        product.categories.some((cat) =>
          filters.categories.includes(cat.id.toString())
        )
      const priceMatch =
        filters.priceRange.length === 0 ||
        filters.priceRange.some((range) => {
          const [min, max] = range.split("-").map(Number)
          const price = parseFloat(product.price)
          return price >= min && price <= max
        })
      return brandMatch && categoryMatch && priceMatch
    })
    return sortProducts(filtered)
  }, [products, filters, sortOption])

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
    return filteredAndSortedProducts.slice(
      startIndex,
      startIndex + PRODUCTS_PER_PAGE
    )
  }, [filteredAndSortedProducts, currentPage])

  const getFilteredCount = (filterType, value) => {
    return filteredAndSortedProducts.filter((product) => {
      if (filterType === "brands") {
        const brandAttr = product.attributes.find(
          (attr) => attr.name === "Brand"
        )
        return brandAttr && brandAttr.options[0] === value
      } else if (filterType === "categories") {
        return product.categories.some((cat) => cat.id.toString() === value)
      } else if (filterType === "priceRange") {
        const [min, max] = value.split("-").map(Number)
        const price = parseFloat(product.price)
        return price >= min && price <= max
      }
      return false
    }).length
  }

  const getAvailableCategories = useMemo(() => {
    if (filters.brands.length === 0) {
      return categories
    }

    const availableCategories = new Set()
    filters.brands.forEach((brand) => {
      const brandData = brands.find((b) => b.name === brand)
      if (brandData) {
        brandData.categories.forEach((categoryId) => {
          availableCategories.add(categoryId.toString())
        })
      }
    })

    return categories.filter((category) =>
      availableCategories.has(category.id.toString())
    )
  }, [filters.brands, brands, categories])

  const clearAllFilters = () => {
    setFilters({
      brands: [],
      categories: [],
      priceRange: [],
    })
    setCurrentPage(1)
  }

  const removeFilter = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].filter((item) => item !== value),
    }))
  }

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
  const categorylanding = params.grid[0]
  const subcategories = params.grid[1]
  const breadcrumbLinks = [
    { name: "Home", route: "/" },
    { name: categorylanding, route: `/product-categories/${categorylanding}` },
    { name: subcategories, route: `/product-categories/${categorylanding}/${subcategories}` },
    { name: subsubcategories, route: `/product-categories/${categorylanding}/${subcategories}/${subsubcategories}` },
  ]

  return (
    <Container className="min-h-screen py-5">
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
      <div className="-mt-7 mb-16">
        <Breadcrumb className="" links={breadcrumbLinks} />
      </div>
      <div className="flex flex-col lg:flex-row gap-8 mb-32">
        <div
          style={{ boxShadow: isMobileFilterOpen ? "-115px 0 10px 0 rgba(255, 255, 255)" : "none" }}
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
                )
                return category ? (
                  <span
                    key={categoryId}
                    className={`inline-flex items-center bg-[#F7EBE0] rounded-lg px-3 py-1 text-sm font-bold text-black mr-2 mb-2 2xl:text-[20px] ${lexendDeca.className}`}
                  >
                    <span
                      className={`${lexendDeca.className} 2xl:text-[24px] font-normal mr-1 text-black`}
                    >
                      Category:{" "}
                    </span>{" "}
                    {category.name}
                    <button
                      onClick={() => removeFilter("categories", categoryId)}
                      className="ml-2 text-red-600 hover:text-red-700"
                    >
                      <RxCross2 />
                    </button>
                  </span>
                ) : null
              })}

              {filters.priceRange.map((range) => (
                <span
                  key={range}
                  className={`inline-flex items-center bg-[#F7EBE0] rounded-lg px-3 py-1 text-sm font-bold text-black mr-2 mb-2 2xl:text-[20px] ${lexendDeca.className}`}
                >
                  <span
                    className={`${lexendDeca.className} 2xl:text-[24px] font-normal mr-1 text-black`}
                  >
                    Price:{" "}
                  </span>{" "}
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
            isOpen={isBrandFilterOpen}
            toggleOpen={() => setIsBrandFilterOpen(!isBrandFilterOpen)}
          >
            {brands
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((brand) => (
                <CustomCheckbox
                  key={brand.name}
                  name="brand"
                  value={brand.name}
                  checked={filters.brands.includes(brand.name)}
                  onChange={() => handleFilterChange("brands", brand.name)}
                  label={brand.name}
                  count={brand.count}
                />
              ))}
          </FilterSection>

          <FilterSection
            title="Category"
            isOpen={isCategoryFilterOpen}
            toggleOpen={() => setIsCategoryFilterOpen(!isCategoryFilterOpen)}
          >
            {getAvailableCategories
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((category) => (
                <CustomCheckbox
                  key={category.id}
                  name="category"
                  value={category.id.toString()}
                  checked={filters.categories.includes(category.id.toString())}
                  onChange={() => handleFilterChange("categories", category.id.toString())}
                  label={category.name}
                  count={getFilteredCount("categories", category.id.toString())}
                />
              ))}
          </FilterSection>

          <FilterSection
            title="Price Range"
            isOpen={isPriceRangeFilterOpen}
            toggleOpen={() => setIsPriceRangeFilterOpen(!isPriceRangeFilterOpen)}
          >
            {priceRanges.map((range) => {
              const [min, max] = range.split("-").map(Number)
              const minConverted = Math.round(min * rate)
              const maxConverted = Math.round(max * rate)
              
              return (
                <CustomCheckbox
                  key={range}
                  name="priceRange"
                  value={range}
                  checked={filters.priceRange.includes(range)}
                  onChange={() => handleFilterChange("priceRange", range)}
                  label={`${currencySymbol}${minConverted} - ${currencySymbol}${maxConverted}`}
                  count={getFilteredCount("priceRange", range)}
                />
              )
            })}
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

        <div className="w-full lg:w-3/4">
          <div className="flex justify-between items-center mt-3">
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
                ]}
                value={sortOption}
                onChange={handleSortChange}
              />
            </div>
            <div className="hidden lg:block">
              {renderPagination()}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8 ">
            {loading
              ? Array(PRODUCTS_PER_PAGE)
                  .fill("")
                  .map((_, index) => (
                    <div
                      key={index}
                      className="border p-4 rounded-lg  relative bg-white animate-pulse"
                    >
                      <div className="w-full h-64 bg-gray-300 mb-4"></div>
                      <div className="h-6 bg-gray-300 mb-2"></div>
                      <div className="h-4 bg-gray-300 w-1/2"></div>
                    </div>
                  ))
              : paginatedProducts.map((product) => {
                  const brand =
                    product.attributes.find(
                      (attr) => attr.name === "Brand"
                    )?.options[0] || "Unknown Brand"
                  return (
                    <div
                      key={product.id}
                      className="border p-4 rounded-lg  relative bg-white"
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
                        <Image
                          src={product.images[0]?.src}
                          alt={product.name}
                          width={200}
                          height={200}
                          className="w-full h-64 object-contain mb-4"
                        />
                      </Link>
                      <Link href={`/product/${product.id}`}>
                        <h1
                          className={`text-sm 2xl:text-[20px] uppercase ${jost.className} cursor-pointer font-bold mb-2`}
                        >
                          {brand}
                        </h1>
                      </Link>
                      <h3
                        className={`text-sm 2xl:text-[19px] ${lexendDeca.className} font-normal mb-2 h-[60px] overflow-hidden`}
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
                              {currencySymbol}
                              {(product.regular_price * rate).toFixed(2)}
                            </span>
                            {currencySymbol}
                            {(product.sale_price * rate).toFixed(2)}
                          </>
                        ) : (
                          `${currencySymbol}${(product.price * rate).toFixed(2)}`
                        )}
                      </p>
                      <button
                        className={`w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition ${jost.className}`}
                        onClick={() => addToCart(product)}
                      >
                        ADD TO BAG
                      </button>
                    </div>
                  )
                })}
          </div>

          {paginatedProducts.length > 0 && (
            <div className="mt-8 flex justify-end">{renderPagination()}</div>
          )}
        </div>
      </div>
    </Container>
  )
}