"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "../../../../components/container";
import Menucategory from "../../../../components/lifecycle/category/MenucategoryLandingPage";
import Bestseller from "../../../../components/lifecycle/category/categoriescomponents/Bestseller";
import bannerimg from "../../../../public/product_category_landing/olaplex 1.svg";
import Staffpicks from "../../../../components/lifecycle/category/categoriescomponents/Staffpicks";

import Olaplex from "/public/product_category_landing/olaplex 1.svg";
import SliderComponent from "../../../../components/lifecycle/mutual-components/slider";
import TrendingBrand from "../../../../components/lifecycle/category/categoriescomponents/trending-brand/trending-brand";
import BrandInFocus from "../../../../components/lifecycle/category/categoriescomponents/brand-in-focus";

import Loading from "./loading";
import MakeupPicks from "../../../../components/lifecycle/category/categoriescomponents/makeup-picks/makeup-picks";
import GetGlam from "../../../../components/lifecycle/category/categoriescomponents/get-glam/get-glam";
import MakeupTips from "../../../../components/lifecycle/mutual-components/makeup-tips";


export default function Page() {
  const [mainCategory, setMainCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [hotSellingProducts, setHotSellingProducts] = useState([]);
  const [staffPicks, setStaffPicks] = useState([]); // New state for Staff Picks
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        setLoading(true);
        const makeupID = 147;

        // Fetch main category
        const mainCategoryResponse = await axios.get(
          `https://glam.clickable.site/wp-json/wc/v3/products/categories/${makeupID}`,
          {
            params: {
              consumer_key: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
              consumer_secret: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
            },
          },
        );
        setMainCategory(mainCategoryResponse.data);

        // Fetch subcategories
        const subCategoryResponse = await axios.get(
          "https://glam.clickable.site/wp-json/wc/v3/products/categories/",
          {
            params: {
              consumer_key: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
              consumer_secret: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
              parent: makeupID,
            },
          },
        );
        setSubCategories(subCategoryResponse.data);

        // Fetch hot-selling products
        const hotSellingResponse = await axios.get(
          "https://glam.clickable.site/wp-json/wc/v3/products",
          {
            params: {
              consumer_key: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
              consumer_secret: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
              category: makeupID,
              orderby: "popularity", // Assuming 'popularity' or similar can be used to get hot-selling products
              per_page: 10, // Number of products to fetch
            },
          },
        );
        setHotSellingProducts(hotSellingResponse.data);

        // Fetch most expensive products for Staff Picks
        const staffPicksResponse = await axios.get(
          "https://glam.clickable.site/wp-json/wc/v3/products",
          {
            params: {
              consumer_key: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
              consumer_secret: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
              category: makeupID,
              orderby: "price", // Sorting by price to get the most expensive products
              order: "desc", // Descending order
              per_page: 10, // Number of products to fetch
            },
          },
        );
        setStaffPicks(staffPicksResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories and products:", error);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  let bannerObject = [
    {
      title: "NARS FREE GIFT COLLECTION",
      description: "Receive a free gift when you spend £30 on NARS.  ",
      src: Olaplex,
    },
  ];
  
  if (loading) {
    return <Loading />;
  }

  return (
    <> 
      {mainCategory &&
        subCategories.length > 0 &&
        hotSellingProducts.length > 0 && (
          <div>
            <Container>
              <Menucategory
                mainCategory={mainCategory}
                subCategories={subCategories}
              />
            </Container>
            <SliderComponent bannerObject={bannerObject} />
            <TrendingBrand />
            <Container>
              <Bestseller hotSellingProducts={hotSellingProducts} />
            </Container>
            <BrandInFocus />
            <Container>
              <Staffpicks staffPicks={staffPicks} />
            </Container>
            
            <MakeupPicks />
            <MakeupTips />
            <GetGlam />
          </div>
        )}
    </>
  );
}
