 "use client"


import React from 'react';
// import { useState } from 'react';
import { useState } from 'react';
import FiSearch from 'react-icons/fi';

export default function SearchBarWithDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChange = (e) => {
    if (e.target.value.length > 0) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className="flex justify-center relative w-[768px]">
      {/* Search Bar */}
      <section className="flex flex-row w-full max-w-[612px] h-10 border border-solid
        border-gray-200 rounded-md px-1 focus-within:border-gray-700 transition-colors ease-in-out duration-100">
        <div className="grid place-items-center h-full w-12">
          <FiSearch />
        </div>
        <input
          className="h-full w-full outline-none text-sm text-gray-700 pr-2"
          type="text"
          id="search"
          placeholder="Search products.."
          onChange={handleChange}
        />
      </section>

      {/* Dropdown Panel */}
      <div className={`absolute top-12 left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg ${isDropdownOpen ? "flex" : "hidden"}`}>
        {/* Placeholder for dropdown content */}
      </div>
    </div>
  );
}
