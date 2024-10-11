import BrandListing from "/components/brand/brand-listing";
import { gql } from "@apollo/client";
import { query } from "../../../../../lib/apollo-client";

const GET_PRODUCTS = gql`
  query getProducts($attribute_term: String!) {
    products(
      where: {
        attribute: "pa_brand"
        attributeTerm: $attribute_term
      }
      first: 100
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
              slug
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
              slug
            }
          }
          attributes {
            nodes {
              name
              options
            }
          }
        }
      }
    }
  }
`;

const GET_BRAND_CATEGORY_DATA = gql`
  query GET_BRAND_DATA($brand: String!) {
    brandCategories(brand: $brand) {
      categories {
        categoryId
        categoryName
        categorySlug
      }
    }
    products(where: { attributeTerm: $brand, attribute: "pa_brand" } first: 100) {
      nodes {
        ... on SimpleProduct {
          productCategories {
            nodes {
              databaseId
            }
          }
        }
        ... on VariableProduct {
          productCategories {
            nodes {
              databaseId
            }
          }
        }
      }
    }
  }
`;

export default async function Page({ params }) {
  const { brandLanding, brandListing } = params;

  const { data, error } = await query({
    query: GET_PRODUCTS,
    variables: { attribute_term: brandLanding},
  });
  
  const {data: {brandCategories, products}, error: brandError} = await query({
    query: GET_BRAND_CATEGORY_DATA,
    variables: { brand: brandLanding },
  });
  
  
  if (error || brandError) return console.log(error || brandError);
  
  
  return (
    <>
      <BrandListing productsData={data} filterData={setCategoryCounts(brandCategories, products)} />
    </>
  );
}

function setCategoryCounts(brandCategories, productsData){
  const categories = brandCategories[0]?.categories || [];
  const products = productsData?.nodes || [];

  // Create a map to store category counts
  const categoryCounts = new Map(
    categories.map((category) => [category.categoryId, 0]),
  );

  
  // Count products for each category
  products.forEach((product) => {
    product?.productCategories?.nodes?.forEach((category) => {
      if (category?.databaseId) {
        const id = category.databaseId.toString();
        categoryCounts.set(id, (categoryCounts.get(id) || 0) + 1);
      }
    });
  });

  // Combine category info with counts
  const categoriesWithCounts = categories.map((category) => ({
    ...category,
    count: categoryCounts.get(category.categoryId) || 0,
  }));
  return categoriesWithCounts;
}