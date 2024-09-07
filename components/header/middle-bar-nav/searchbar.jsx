"use client";
import { useState, useEffect, useRef } from "react";
import SearchIcon from "../../../public/icons/search";
import axios from "axios";
import { lexendDeca, jost } from "../../ui/fonts";
import debounce from "lodash.debounce";

export default function SearchBarWithDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [popularSearches, setPopularSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [hasSearched, setHasSearched] = useState(false); // Track if a search is completed
  const searchBarRef = useRef(null);
  const cancelTokenSource = useRef(null);

  const axiosInstance = axios.create({
    baseURL: "https://glam.clickable.site/wp-json/wc/v3/",
    auth: {
      username: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
      password: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
    },
  });

  const handleSearch = debounce(async (searchQuery) => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel("Operation canceled due to new request.");
    }

    cancelTokenSource.current = axios.CancelToken.source();

    if (searchQuery.length > 0) {
      setIsLoading(true); // Start loading
      setHasSearched(false); // Reset the search state
      setIsDropdownOpen(true);

      try {
        const productResponse = await axiosInstance.get("products", {
          params: {
            search: searchQuery,
            per_page: 5,
          },
          cancelToken: cancelTokenSource.current.token,
        });
        setProducts(productResponse.data);
        setHasSearched(true); // Mark that the search is completed
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Previous request canceled:", error.message);
        } else {
          console.error("Error fetching products:", error);
        }
      }

      setIsLoading(false); // Stop loading after fetching
    } else {
      setIsDropdownOpen(false);
      setProducts([]);
    }
  }, 200);

  const handleChange = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    handleSearch(searchQuery); // Call debounced search
  };

  const fetchPopularSearches = async () => {
    try {
      const response = await axiosInstance.get("products/attributes/1/terms");
      setPopularSearches(response.data);
    } catch (error) {
      console.error("Error fetching popular searches:", error);
    }
  };

  const handleClickOutside = (e) => {
    if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    fetchPopularSearches();
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchBarRef} className="flex justify-center relative w-[768px]">
      {/* Search Bar */}
      <section
        className="flex flex-row w-[80%] max-w-[696px] h-10 border border-solid
        border-b-03 rounded-[8px] px-1 focus-within:border-gray-700 transition-colors ease-in-out duration-100"
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
        />
      </section>

      {/* Dropdown Panel */}
      <div
        className={`absolute top-12 left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 ${
          isDropdownOpen ? "flex" : "hidden"
        }`}
      >
        {/* Popular Searches */}
        <div className="w-1/3 p-4 border-r border-gray-200">
          <h3 className={`text-xs font-normal  text-[#8B929D] ${jost.className} uppercase mb-2`}>
            Popular Searches
          </h3>
          <ul className="space-y-4 text-xs">
            {popularSearches.slice(0, 6).map((term) => (
              <li key={term.id} className={`cursor-pointer hover:bg-slate-100 ${lexendDeca.className} font-medium`}>
                {term.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Trending Products */}
        <div className="w-2/3 p-4">
          <h3 className="text-xs text-[#8B929D] ${jost.className} font-normal uppercase mb-2">
            Trending Products
          </h3>
          <ul className="space-y-4 text-xs text-gray-700 ">
            {isLoading ? (
              <li>Searching...</li> // Show 'Searching...' while data is being fetched
            ) : products.length > 0 ? (
              products.map((product) => (
                <li key={product.id} className="flex items-center cursor-pointer hover:bg-slate-100">
                  <div className="w-10  h-10 mr-4 bg-gray-100 rounded-md flex-shrink-0">
                    <img
                      src={product.images[0]?.src || "/placeholder.png"}
                      alt={product.name}
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>
                  <div>
                    <p className={`font-medium text-wrap ${lexendDeca.className}`}>
                      {product.name}
                    </p>
                    <div className="flex flex-row gap-3">
                      {product.sale_price ? (
                        <>
                          <p className="line-through text-gray-400">£{product.regular_price}</p>
                          <p className="text-red-600">£{product.sale_price}</p>
                        </>
                      ) : (
                        <p className="text-black">£{product.price}</p>
                      )}
                    </div>
                  </div>
                </li>
              ))
            ) : hasSearched ? (
              <li>No products found.</li> // Show 'No products found' only after search completion
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
}
