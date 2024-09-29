import React, { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { lexendDeca, jost } from '/components/ui/fonts'

export default function FilterSidebar({ isMobileFilterOpen, filters, onFilterChange, onClearFilters, products }) {
  const [isBrandFilterOpen, setIsBrandFilterOpen] = useState(true)
  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(true)
  const [isPriceRangeFilterOpen, setIsPriceRangeFilterOpen] = useState(true)

  const brands = [...new Set(products.flatMap(product => 
    product.attributes.nodes
      .filter(attr => attr.name === 'Brand')
      .flatMap(attr => attr.options)
  ))]

  const categories = [...new Set(products.flatMap(product => 
    product.productCategories?.nodes.map(cat => ({ id: cat.id, name: cat.name }))
  ))]

  const priceRanges = ['0-50', '51-100', '101-200', '201+']

  return (
    <div className={`w-full lg:w-1/4 p-4 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
      <div className="mb-4 flex justify-between items-center">
        <h3 className={`text-lg font-bold ${jost.className}`}>Filters</h3>
        <button onClick={onClearFilters} className={`text-sm text-gray-500 ${lexendDeca.className}`}>
          Clear All
        </button>
      </div>

      <div className="mb-6">
        <h4
          className={`font-bold text-lg mb-2 flex justify-between items-center cursor-pointer ${jost.className}`}
          onClick={() => setIsBrandFilterOpen(!isBrandFilterOpen)}
        >
          Brand
          {isBrandFilterOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </h4>
        {isBrandFilterOpen && (
          <div className={`pl-2 ${lexendDeca.className}`}>
            {brands.map((brand) => (
              <label key={brand} className="block mb-2">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => onFilterChange('brands', brand)}
                  className="mr-2"
                />
                {brand}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="mb-6">
        <h4
          className={`font-bold text-lg mb-2 flex justify-between items-center cursor-pointer ${jost.className}`}
          onClick={() => setIsCategoryFilterOpen(!isCategoryFilterOpen)}
        >
          Category
          {isCategoryFilterOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </h4>
        {isCategoryFilterOpen && (
          <div className={`pl-2 ${lexendDeca.className}`}>
            {categories.map((category) => (
              <label key={category.id} className="block mb-2">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category.id)}
                  onChange={() => onFilterChange('categories', category.id)}
                  className="mr-2"
                />
                {category.name}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="mb-6">
        <h4
          className={`font-bold text-lg mb-2 flex justify-between items-center cursor-pointer ${jost.className}`}
          onClick={() => setIsPriceRangeFilterOpen(!isPriceRangeFilterOpen)}
        >
          Price Range
          {isPriceRangeFilterOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </h4>
        {isPriceRangeFilterOpen && (
          <div className={`pl-2 ${lexendDeca.className}`}>
            {priceRanges.map((range) => (
              <label key={range} className="block mb-2">
                <input
                  type="checkbox"
                  checked={filters.priceRange.includes(range)}
                  onChange={() => onFilterChange('priceRange', range)}
                  className="mr-2"
                />
                £{range}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}