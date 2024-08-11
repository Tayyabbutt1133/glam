"use client";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";

export default function SearchBarWithDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchBarRef = useRef(null);

  const handleChange = (e) => {
    if (e.target.value.length > 0) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  };

  const handleClickOutside = (e) => {
    if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchBarRef} className="flex justify-center relative w-[768px]">
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
      <div className={`absolute top-12 left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 ${isDropdownOpen ? "flex" : "hidden"}`}>
        {/* Popular Searches */}
        <div className="w-1/3 p-4 border-r border-gray-200">
          <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">
            Popular Searches
          </h3>
          <ul className="space-y-1 pl-2 text-sm text-gray-700">
            <li>Setting Spray</li>
            <li>Olaplex</li>
            <li>Makeup Brush</li>
            <li>Mist</li>
            <li>Body Polish</li>
          </ul>
        </div>

        {/* Trending Products */}
        <div className="w-2/3 p-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">
            Trending Products
          </h3>
          <ul className="space-y-4 text-xs text-gray-700">
            <li className="flex items-center">
              <div className="w-10 h-10 mr-4 bg-gray-100 rounded-md flex-shrink-0">
                {/* Image placeholder */}
              </div>
              <div>
                <p className="font-semibold">
                  Broad Spectrum Chelating Treatment Shampoo Women 370
                </p>
                <div className="flex flex-row gap-3">
                  <p className="line-through text-gray-400">£33.00</p>
                  <p className="text-red-600">£26.40</p>
                </div>
              </div>
            </li>

            <li className="flex items-center">
              <div className="w-10 h-10 mr-4 bg-gray-100 rounded-md flex-shrink-0">
                {/* Image placeholder */}
              </div>
              <div>
                <p className="font-semibold">
                  {"L'Oréal Paris Air Volume Mega Mascara"}
                </p>
                <div className="flex flex-row gap-3">
                  <p className="line-through text-gray-400">£11.99</p>
                  <p className="text-red-600">£8.99</p>
                </div>
              </div>
            </li>

            <li className="flex items-center">
              <div className="w-10 h-10 mr-4 bg-gray-100 rounded-md flex-shrink-0">
                {/* Image placeholder */}
              </div>
              <div>
                <p className="font-semibold">Lip Oil Serum</p>
                <div className="flex flex-row gap-3">
                  <p className="line-through text-gray-400">£30.00</p>
                  <p className="text-red-600">£25.99</p>
                </div>
              </div>
            </li>

            <li className="flex items-center">
              <div className="w-10 h-10 mr-4 bg-gray-100 rounded-md flex-shrink-0">
                {/* Image placeholder */}
              </div>
              <div>
                <p className="font-semibold">
                  {"L'Oréal Paris Air Volume Mega Mascara"}
                </p>
                <p className="text-gray-700">£29.40</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
