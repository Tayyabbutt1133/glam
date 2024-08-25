"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '../../../../components/container';
import Menucategory from '../../../../components/lifecycle/category/MenucategoryLandingPage';
import Bestseller from '../../../../components/lifecycle/category/categoriescomponents/Bestseller';
import bannerimg from '../../../../public/product_category_landing/olaplex 1.svg';
import Staffpicks from '../../../../components/lifecycle/category/categoriescomponents/Staffpicks';

export default function Page() {
  const [mainCategory, setMainCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [hotSellingProducts, setHotSellingProducts] = useState([]);
  const [staffPicks, setStaffPicks] = useState([]); // New state for Staff Picks

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        const skincareCategoryId = 483;

        // Fetch main category
        const mainCategoryResponse = await axios.get(
          `https://glam.clickable.site/wp-json/wc/v3/products/categories/${skincareCategoryId}`, 
          {
            params: {
              consumer_key: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
              consumer_secret: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
            },
          }
        );
        setMainCategory(mainCategoryResponse.data);

        // Fetch subcategories
        const subCategoryResponse = await axios.get(
          'https://glam.clickable.site/wp-json/wc/v3/products/categories/',
          {
            params: {
              consumer_key: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
              consumer_secret: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
              parent: skincareCategoryId,
            },
          }
        );
        setSubCategories(subCategoryResponse.data);

        // Fetch hot-selling products
        const hotSellingResponse = await axios.get(
          'https://glam.clickable.site/wp-json/wc/v3/products',
          {
            params: {
              consumer_key: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
              consumer_secret: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
              category: skincareCategoryId,
              orderby: 'popularity',  // Assuming 'popularity' or similar can be used to get hot-selling products
              per_page: 10, // Number of products to fetch
            },
          }
        );
        setHotSellingProducts(hotSellingResponse.data);

        // Fetch most expensive products for Staff Picks
        const staffPicksResponse = await axios.get(
          'https://glam.clickable.site/wp-json/wc/v3/products',
          {
            params: {
              consumer_key: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
              consumer_secret: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
              category: skincareCategoryId,
              orderby: 'price',  // Sorting by price to get the most expensive products
              order: 'desc',  // Descending order
              per_page: 10, // Number of products to fetch
            },
          }
        );
        setStaffPicks(staffPicksResponse.data);
      } catch (error) {
        console.error('Error fetching categories and products:', error);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  const bannerData = {
    title: mainCategory?.name || "Default Title",
    description: "Receive a free gift when you spend £30 on " + (mainCategory?.name || "products"),
    buttonText: "Shop Now",
    image: bannerimg.src,
  };

  return (
    <Container>
      {mainCategory && subCategories.length > 0 && hotSellingProducts.length > 0 && (
        <div className="">
          <Menucategory mainCategory={mainCategory} subCategories={subCategories} />
          <Bestseller hotSellingProducts={hotSellingProducts} />
          <Staffpicks staffPicks={staffPicks} />
        </div>
      )}
    </Container>
  );
}
