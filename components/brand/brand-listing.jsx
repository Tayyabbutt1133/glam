'use client'

import React, { useState, useMemo } from 'react'
import { useParams } from "next/navigation"
import Image from "next/image"
import Breadcrumb from "/components/BreadCrumb"
import Container from "/components/container"
import { useCartStore } from "/states/Cardstore"
import { usePopupStore } from "/states/use-popup-store"
import filter from "/public/filter.svg"
import CustomDropdown from './brand-listing/custom-dropdown'
import ProductGrid from './brand-listing/product-grid'
import Pagination from './brand-listing/pagination'
import FilterSidebar from './brand-listing/filter-sidebar'

const PRODUCTS_PER_PAGE = 12

export default function BrandListing({productsData, filterData}) {
  const { brandLanding, brandListing } = useParams()
  const { rate, currencySymbol } = usePopupStore()
  const addToCart = useCartStore((state) => state.addToCart)
  
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [],
  })
  const [sortOption, setSortOption] = useState("popularity")
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [favorites, setFavorites] = useState({})

  const products = useMemo(() => productsData?.products?.nodes || [], [productsData])

  // Helper function to check if a product belongs to a category
  const productBelongsToCategory = (product, categoryId) => {
    return product.productCategories.nodes.some(cat => 
      // Convert both to strings for comparison since categoryId might come as string
      cat.databaseId.toString() === categoryId.toString()
    );
  }

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products]

    // Apply category filters
    if (filters.categories && filters.categories.length > 0) {
      result = result.filter(product => 
        // Product should match ANY of the selected categories
        filters.categories.some(categoryId => 
          productBelongsToCategory(product, categoryId)
        )
      )
    }

    // Apply price range filters
    if (filters.priceRange && filters.priceRange.length > 0) {
      result = result.filter(product => {
        const price = parseFloat(product.price)
        return filters.priceRange.some(range => {
          const [min, max] = range.split("-").map(Number)
          return price >= min && (max ? price <= max : true)
        })
      })
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low-to-high":
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
        break
      case "price-high-to-low":
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
        break
      case "newest":
        // If you have a date field, use it here
        result.sort((a, b) => new Date(b.date) - new Date(a.date))
        break
      default: // 'popularity'
        result.sort((a, b) => b.reviewCount - a.reviewCount)
    }

    return result
  }, [products, filters, sortOption])

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
    return filteredAndSortedProducts.slice(
      startIndex,
      startIndex + PRODUCTS_PER_PAGE
    )
  }, [filteredAndSortedProducts, currentPage])

  const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => {
      const currentValues = prevFilters[filterType] || []
      let newValues

      if (currentValues.includes(value)) {
        // Remove value if it's already selected
        newValues = currentValues.filter(v => v !== value)
      } else {
        // Add value if it's not selected
        newValues = [...currentValues, value]
      }

      return {
        ...prevFilters,
        [filterType]: newValues
      }
    })
    
    // Reset to first page when filters change
    setCurrentPage(1)
  }

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      priceRange: [],
    })
    setCurrentPage(1)
  }

  const handleFavoriteClick = (productId) => {
    setFavorites(prevFavorites => ({
      ...prevFavorites,
      [productId]: !prevFavorites[productId],
    }))
  }

  const breadLinks = [
    { name: "Home", route: "/" },
    { name: brandLanding, route: `/brands/${brandLanding}` },
    { name: brandListing, route: `/brands/${brandLanding}/${brandListing}` },
  ]

  return (
    <>
      <Container>
        <Breadcrumb links={breadLinks} />
      </Container>
      <Container className="min-h-screen py-24">
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
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar
            isMobileFilterOpen={isMobileFilterOpen}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearAllFilters}
            products={products}
            currencySymbol={currencySymbol}
            rate={rate}
            filterData={filterData}
          />
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)} 
                  className="lg:hidden"
                >
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
                    { value: 'newest', label: 'Newest' },
                  ]}
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                />
                <span className="text-sm text-gray-500">
                  {filteredAndSortedProducts.length} Products found
                </span>
              </div>
              <div className="hidden lg:block">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
            
            {filteredAndSortedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or search criteria</p>
                <button 
                  onClick={clearAllFilters}
                  className="text-primary hover:text-primary-dark underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <ProductGrid
                products={paginatedProducts}
                addToCart={addToCart}
                currencySymbol={currencySymbol}
                rate={rate}
                favorites={favorites}
                handleFavoriteClick={handleFavoriteClick}
              />
            )}

            {filteredAndSortedProducts.length > 0 && (
              <div className="mt-8 flex justify-center lg:justify-end">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  )
}