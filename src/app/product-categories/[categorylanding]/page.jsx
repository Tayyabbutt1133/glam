"use client";

import React, { useEffect, useState, memo } from "react";
import axios from "axios";
import Container from "../../../../components/container";
import Bestseller from "../../../../components/lifecycle/category/categoriescomponents/Bestseller";
import Olaplex from "/public/product_category_landing/olaplex 1.svg";
import SliderComponent from "../../../../components/lifecycle/mutual-components/slider";
import TrendingBrand from "../../../../components/lifecycle/category/categoriescomponents/trending-brand/trending-brand";
import BrandInFocus from "../../../../components/lifecycle/category/categoriescomponents/brand-in-focus";
import MakeupPicks from "../../../../components/lifecycle/category/categoriescomponents/makeup-picks/makeup-picks";
import GetGlam from "../../../../components/lifecycle/category/categoriescomponents/get-glam/get-glam";
import MakeupTips from "../../../../components/lifecycle/mutual-components/makeup-tips";
import Staffpicks from "../../../../components/lifecycle/category/categoriescomponents/Staffpicks";
import MenucategoryLandingPage from "../../../../components/lifecycle/category/MenucategoryLandingPage";

const Page = () => {
  const [data, setData] = useState({
    mainCategory: null,
    subCategories: [],
    hotSellingProducts: [],
    staffPicks: [],
    loading: false,
  });

  // useEffect(() => {
  //   if(!categoryID) return;

  //   const fetchData = async () => {
  //     setData(prevState => ({ ...prevState, loading: true }));
  //     try {

  //       const [mainCategoryResponse, subCategoryResponse, hotSellingResponse, staffPicksResponse] = await Promise.all([
  //         axios.get(`https://glam.clickable.site/wp-json/wc/v3/products/categories/${categoryID}`, {
  //           params: {
  //             consumer_key: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
  //             consumer_secret: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
  //           },
  //         }),
  //         axios.get("https://glam.clickable.site/wp-json/wc/v3/products/categories/", {
  //           params: {
  //             consumer_key: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
  //             consumer_secret: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
  //             parent: categoryID,
  //           },
  //         }),
  //         axios.get("https://glam.clickable.site/wp-json/wc/v3/products", {
  //           params: {
  //             consumer_key: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
  //             consumer_secret: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
  //             category: categoryID,
  //             orderby: "popularity",
  //             per_page: 10,
  //           },
  //         }),
  //         axios.get("https://glam.clickable.site/wp-json/wc/v3/products", {
  //           params: {
  //             consumer_key: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
  //             consumer_secret: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
  //             category: categoryID,
  //             orderby: "price",
  //             order: "desc",
  //             per_page: 10,
  //           },
  //         }),
  //       ]);

  //       setData({
  //         mainCategory: mainCategoryResponse.data,
  //         subCategories: subCategoryResponse.data,
  //         hotSellingProducts: hotSellingResponse.data,
  //         staffPicks: staffPicksResponse.data,
  //         loading: false,
  //       });
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setData(prevState => ({ ...prevState, loading: false }));
  //     }
  //   };

  //   fetchData();
  // }, [categoryID]);

  const {
    mainCategory,
    subCategories,
    hotSellingProducts,
    staffPicks,
    loading,
  } = data;

  const bannerObject = [
    {
      title: "NARS FREE GIFT COLLECTION",
      description: "Receive a free gift when you spend £30 on NARS.",
      src: Olaplex,
    },
  ];

  return (
    <>
      <div>
        <Container>
          <MenucategoryLandingPage />
        </Container>
      </div>

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
};

export default memo(Page);
