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
  const bannerObject = [
    {
      title: "NARS FREE GIFT COLLECTION",
      description: "Receive a free gift when you spend £30 on NARS.",
      src: Olaplex,
    },
  ];

  return (
    <>
      <MenucategoryLandingPage />

      <SliderComponent bannerObject={bannerObject} />
      <TrendingBrand />

      <Bestseller />

      <BrandInFocus />

      <Container>
        <Staffpicks />
      </Container>

      <MakeupPicks />
      <MakeupTips />
      <GetGlam />
    </>
  );
};

export default memo(Page);
