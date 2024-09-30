"use client";

import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import FilterSidebar from "../../../../../components/brand/brand-listing/filter-sidebar";
import Pagination from "../../../../../components/brand/brand-listing/pagination";
import ProductGrid from "../../../../../components/brand/brand-listing/product-grid";
import SortDropdown from "../../../../../components/brand/brand-listing/sort-dropdown";
import Breadcrumb from "/components/BreadCrumb";
import Container from "/components/container";
import { useCartStore } from "/states/Cardstore";
import { usePopupStore } from "/states/use-popup-store";

// ... rest of the code remains the same as in the previous response

const PRODUCTS_PER_PAGE = 12;

const GET_PRODUCTS = gql`
  query getProducts($attribute_term: String!, $category: String!) {
    products(
      where: {
        attribute: "pa_brand"
        attributeTerm: $attribute_term
        category: $category
      }
    ) {
      nodes {
        databaseId
        name
        slug
        image {
          sourceUrl
          altText
        }
        ... on SimpleProduct {
          price(format: RAW)
          regularPrice(format: RAW)
          salePrice(format: RAW)
          rrp
          outletPrice
          onSale
          averageRating
          reviewCount
          productCategories {
            nodes {
              databaseId
              name
            }
          }
          attributes {
            nodes {
              name
              options
            }
          }
        }
        ... on VariableProduct {
          price(format: RAW)
          regularPrice(format: RAW)
          salePrice(format: RAW)
          rrp
          outletPrice
          onSale
          averageRating
          reviewCount
          productCategories {
            nodes {
              databaseId
              name
            }
          }
          attributes {
            nodes {
              name
              options
            }
          }
        }
      } #nodes
    } #getProducts
  } #query
`;

export default function ProductListing() {
  const { brandLanding, brandListing } = useParams();
  const { rate, currencySymbol } = usePopupStore();
  const addToCart = useCartStore((state) => state.addToCart);

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    priceRange: [],
  });
  const [sortOption, setSortOption] = useState("popularity");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { attribute_term: brandLanding, category: brandListing },
  });

  const products = useMemo(() => data?.products?.nodes || [], [data]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Apply filters
    if (filters.brands.length > 0) {
      result = result.filter((product) =>
        product.attributes.nodes.some(
          (attr) =>
            attr.name === "Brand" && filters.brands.includes(attr.options[0])
        )
      );
    }
    if (filters.categories.length > 0) {
      result = result.filter((product) =>
        product.productCategories.nodes.some((cat) =>
          filters.categories.includes(cat.id)
        )
      );
    }
    if (filters.priceRange.length > 0) {
      result = result.filter((product) => {
        const price = parseFloat(product.price);
        return filters.priceRange.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return price >= min && price <= max;
        });
      });
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low-to-high":
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-high-to-low":
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "newest":
        // Assuming there's a 'date' field. If not, you'll need to adjust this.
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      default: // 'popularity'
        // Assuming there's a 'popularity' or 'sales' field. If not, you'll need to adjust this.
        result.sort((a, b) => b.popularity - a.popularity);
    }

    return result;
  }, [products, filters, sortOption]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredAndSortedProducts.slice(
      startIndex,
      startIndex + PRODUCTS_PER_PAGE
    );
  }, [filteredAndSortedProducts, currentPage]);

  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / PRODUCTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter((item) => item !== value)
        : [...prevFilters[filterType], value],
    }));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({
      brands: [],
      categories: [],
      priceRange: [],
    });
    setCurrentPage(1);
  };

  const breadLinks = [
    { name: "Home", url: "/" },
    { name: brandLanding, url: `/brands/${brandLanding}` },
    { name: brandListing, url: `/brands/${brandLanding}/${brandListing}` },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container className="min-h-screen py-10">
      <Breadcrumb links={breadLinks} />
      <div className="flex justify-between items-center">
        <button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="lg:hidden px-4 py-2 bg-gray-200 rounded"
        >
          {isMobileFilterOpen ? "Close Filters" : "Open Filters"}
        </button>
        <SortDropdown sortOption={sortOption} onSortChange={setSortOption} />
        <div className="hidden lg:block">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mb-32">
        <FilterSidebar
          isMobileFilterOpen={isMobileFilterOpen}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearAllFilters}
          products={products}
        />

        <div className="w-full lg:w-3/4">
          <ProductGrid
            products={paginatedProducts}
            addToCart={addToCart}
            currencySymbol={currencySymbol}
            rate={rate}
          />
          <div className="mt-8 flex justify-end">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
