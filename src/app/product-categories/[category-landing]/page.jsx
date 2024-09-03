"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Container from "../../../../components/container";
import Menucategory from "../../../../components/lifecycle/category/MenucategoryLandingPage";
import Bestseller from "../../../../components/lifecycle/category/categoriescomponents/Bestseller";
import Staffpicks from "../../../../components/lifecycle/category/categoriescomponents/Staffpicks";
import bannerimg from "../../../../public/product_category_landing/olaplex 1.svg";



export default function Page({ selectedCategory }) {
  const [subCategories, setSubCategories] = useState([]);
  const [hotSellingProducts, setHotSellingProducts] = useState([]);
  const [staffPicks, setStaffPicks] = useState([]);

  useEffect(() => {
    if (!selectedCategory) return;

    const fetchCategoriesAndProducts = async () => {
      try {
        // Fetch subcategories
        const subCategoryResponse = await axios.get(
          "https://glam.clickable.site/wp-json/wc/v3/products/categories/",
          {
            params: {
              consumer_key: process.env.NEXT_PUBLIC_CONSUMER_KEY,
              consumer_secret: process.env.NEXT_PUBLIC_CONSUMER_SECRET,
              parent: selectedCategory.id,
            },
          }
        );
        setSubCategories(subCategoryResponse.data);

        // Fetch hot-selling products
        const hotSellingResponse = await axios.get(
          "https://glam.clickable.site/wp-json/wc/v3/products",
          {
            params: {
              consumer_key: process.env.NEXT_PUBLIC_CONSUMER_KEY,
              consumer_secret: process.env.NEXT_PUBLIC_CONSUMER_SECRET,
              category: selectedCategory.id,
              orderby: "popularity",
              per_page: 10,
            },
          }
        );
        setHotSellingProducts(hotSellingResponse.data);

        // Fetch most expensive products for Staff Picks
        const staffPicksResponse = await axios.get(
          "https://glam.clickable.site/wp-json/wc/v3/products",
          {
            params: {
              consumer_key: process.env.NEXT_PUBLIC_CONSUMER_KEY,
              consumer_secret: process.env.NEXT_PUBLIC_CONSUMER_SECRET,
              category: selectedCategory.id,
              orderby: "price",
              order: "desc",
              per_page: 10,
            },
          }
        );
        setStaffPicks(staffPicksResponse.data);
      } catch (error) {
        console.error("Error fetching categories and products:", error);
      }
    };

    fetchCategoriesAndProducts();
  }, [selectedCategory]);

  const bannerData = {
    title: selectedCategory?.name || "Default Title",
    description:
      "Receive a free gift when you spend £30 on " +
      (selectedCategory?.name || "products"),
    buttonText: "Shop Now",
    image: bannerimg.src,
  };

  return (
    <Container>
      {selectedCategory && (
        <div>
          <Menucategory
            mainCategory={selectedCategory}
            subCategories={subCategories}
          />
          <Bestseller hotSellingProducts={hotSellingProducts} />
          <Staffpicks staffPicks={staffPicks} />
        </div>
      )}
    </Container>
  );
}
