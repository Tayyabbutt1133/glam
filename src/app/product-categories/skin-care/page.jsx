"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "../../../../components/container";
import Menucategory from "../../../../components/lifecycle/category/MenucategoryLandingPage";
import Bestseller from "../../../../components/lifecycle/category/categoriescomponents/Bestseller";
import bannerimg from "../../../../public/product_category_landing/olaplex 1.svg";
import Staffpicks from "../../../../components/lifecycle/category/categoriescomponents/Staffpicks";
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
  const [staffPicks, setStaffPicks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        setLoading(true);
        const fragranceId = 483; // Replace with the correct category ID for Fragrance

        const [mainCategoryResponse, subCategoryResponse, hotSellingResponse, staffPicksResponse] = await Promise.all([
          axios.get(`https://glam.clickable.site/wp-json/wc/v3/products/categories/${fragranceId}`, {
            params: {
              consumer_key: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
              consumer_secret: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
            },
          }),
          axios.get("https://glam.clickable.site/wp-json/wc/v3/products/categories/", {
            params: {
              consumer_key: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
              consumer_secret: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
              parent: fragranceId,
            },
          }),
          axios.get("https://glam.clickable.site/wp-json/wc/v3/products", {
            params: {
              consumer_key: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
              consumer_secret: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
              category: fragranceId,
              orderby: "popularity",
              per_page: 10,
            },
          }),
          axios.get("https://glam.clickable.site/wp-json/wc/v3/products", {
            params: {
              consumer_key: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
              consumer_secret: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
              category: fragranceId,
              orderby: "price",
              order: "desc",
              per_page: 10,
            },
          }),
        ]);

        setMainCategory(mainCategoryResponse.data);
        setSubCategories(subCategoryResponse.data);
        setHotSellingProducts(hotSellingResponse.data);
        setStaffPicks(staffPicksResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories and products:", error);
        setLoading(false);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  const bannerObject = [
    {
      title: "NARS FREE GIFT COLLECTION",
      description: "Receive a free gift when you spend £30 on NARS.",
      src: bannerimg,
    },
  ];

  return (
    <>
      {loading && <Loading />}

      {mainCategory && subCategories.length > 0 && hotSellingProducts.length > 0 && (
        <div>
          <Container>
            <Menucategory mainCategory={mainCategory} subCategories={subCategories} />
          </Container>
        </div>
      )}

      <SliderComponent bannerObject={bannerObject} />
      <TrendingBrand />

      {hotSellingProducts.length > 0 && (
        <Container>
          <Bestseller hotSellingProducts={hotSellingProducts} />
        </Container>
      )}

      <BrandInFocus />

      {staffPicks.length > 0 && (
        <Container>
          <Staffpicks staffPicks={staffPicks} />
        </Container>
      )}

      <MakeupPicks />
      <MakeupTips />
      <GetGlam />
    </>
  );
}
