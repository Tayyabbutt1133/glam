"use client";

import React, { useState, useEffect, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

import logo_one from "../../../public/product_category_landing/rounded_cat/one.svg";
import logo_two from "../../../public/product_category_landing/rounded_cat/two.svg";
import logo_three from "../../../public/product_category_landing/rounded_cat/three.svg";
import logo_four from "../../../public/product_category_landing/rounded_cat/four.svg";
import logo_five from "../../../public/product_category_landing/rounded_cat/five.svg";
import logo_six from "../../../public/product_category_landing/rounded_cat/six.svg";
import logo_seven from "../../../public/product_category_landing/rounded_cat/seven.svg";

import { jost } from "/components/ui/fonts";
import { useCategoryIdState } from "/states/use-category-id";
import Container from "/components/container";

const logos = [logo_one, logo_two, logo_three, logo_four, logo_five, logo_six, logo_seven];

const sanitizeText = (text) => {
  return text?.replace(/&amp;/g, "&");
};

const CategoryItem = ({ href, logo, name }) => (
  <li className="flex flex-col items-center text-center max-w-[90px]">
    <Link href={href} passHref className="flex flex-col items-center">
      <div className="flex justify-center items-center w-[88px] h-[88px] rounded-full overflow-hidden border-4 border-transparent hover:border-blue-500 transition-all duration-300 ease-in-out">
        <Image
          src={logo}
          alt={sanitizeText(name)}
          className="object-cover w-full h-full cursor-pointer"
        />
      </div>
      <p className={`mt-2 text-sm text-center w-[88px] font-semibold ${jost.className}`}>
        {sanitizeText(name)}
      </p>
    </Link>
  </li>
);

const SkeletonItem = () => (
  <li className="flex flex-col items-center text-center">
    <div className="flex justify-center items-center w-24 h-24 rounded-full overflow-hidden border-4 border-transparent">
      <Skeleton circle={true} width={96} height={96} />
    </div>
    <p className={`mt-2 text-sm font-semibold ${jost.className}`}>
      <Skeleton width={80} height={15} />
    </p>
  </li>
);

const CategoryList = ({ items, getHref }) => (
  <ul className="flex justify-center gap-8 overflow-x-scroll md:overflow-x-auto pl-[500px] md:pl-0">
    {items.length > 0 ? (
      items.map((item, index) => (
        <CategoryItem
          key={item.id || item.category_id}
          href={getHref(item)}
          logo={logos[index % logos.length]}
          name={item.name || item.category_name}
        />
      ))
    ) : (
      Array(7).fill(null).map((_, index) => <SkeletonItem key={index} />)
    )}
  </ul>
);

const BrandsMenuCategoryList = ({ brands }) => {
  const { brandLanding } = useParams();
  const [brandsData, setBrandsData] = useState(null);

  useEffect(() => {
    if (brands && brands.length > 0) {
      const [brand] = brands.filter((brand) => brand.brand_slug === brandLanding);
      setBrandsData(brand);
    }
  }, [brands, brandLanding]);

  if (!brandsData) {
    return <SkeletonList />;
  }

  return (
    <>
      <h1 className={`text-2xl ${jost.className} uppercase font-bold text-center mt-10`}>
        {sanitizeText(brandsData.brand_name)}
      </h1>
      <div className="mt-10">
        {brandsData.categories?.length === 0 ? (
          <p className={`${jost.className} text-center`}>No categories available under this brand</p>
        ) : (
          <CategoryList
            items={brandsData.categories}
            getHref={(category) => `/brands/${brandLanding}/${category.category_slug}`}
          />
        )}
      </div>
    </>
  );
};

const MenuCategoryList = () => {
  const { categorylanding } = useParams();
  const [mainCategory, setMainCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const setCategoryId = useCategoryIdState((state) => state.setCategoryId);

  useEffect(() => {
    const fetchData = async () => {
      if (!categorylanding) return;

      try {
        setMainCategory(null);
        setSubCategories([]);
        setCategoryId(null);

        const cateId = await axios.get(`/api/${categorylanding}`);
        setCategoryId(cateId.data);

        if (cateId.data) {
          const mainCateData = await axios.get(`/api/categoryData/${cateId.data}`);
          setMainCategory(mainCateData.data.mainCategory);
          setSubCategories(mainCateData.data.subCategories);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [categorylanding, setCategoryId]);

  return (
    <>
      <h1 className={`text-2xl ${jost.className} uppercase font-bold text-center mt-10`}>
        {mainCategory ? sanitizeText(mainCategory.name) : <Skeleton width={200} height={30} />}
      </h1>
      <div className="mt-10">
        <CategoryList
          items={subCategories}
          getHref={(subCat) => `/product-categories/${categorylanding}/${subCat.slug}`}
        />
      </div>
    </>
  );
};

const SkeletonList = () => (
  <>
    <h1 className={`text-2xl ${jost.className} uppercase font-bold text-center mt-10`}>
      <Skeleton width={200} height={30} />
    </h1>
    <div className="mt-10">
      <ul className="flex justify-center gap-8 overflow-x-scroll md:overflow-x-auto pl-[500px] md:pl-0">
        {Array(7).fill(null).map((_, index) => <SkeletonItem key={index} />)}
      </ul>
    </div>
  </>
);

const MenucategoryLandingPage = ({ brands }) => {
  return (
    <Container className="my-14">
      {brands ? <BrandsMenuCategoryList brands={brands} /> : <MenuCategoryList />}
    </Container>
  );
};

export default memo(MenucategoryLandingPage);