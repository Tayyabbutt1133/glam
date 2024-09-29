import React from 'react'
import { lexendDeca } from '/components/ui/fonts'

export default function SortDropdown({ sortOption, onSortChange }) {
  return (
    <select
      value={sortOption}
      onChange={(e) => onSortChange(e.target.value)}
      className={`px-4 py-2 border border-gray-300 ${lexendDeca.className} rounded-md text-black`}
    >
      <option value="popularity">Sort by: Popularity</option>
      <option value="price-low-to-high">Price: Low to High</option>
      <option value="price-high-to-low">Price: High to Low</option>
      <option value="newest">Newest Arrivals</option>
    </select>
  )
}