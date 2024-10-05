"use client";

import React, { useState, useEffect, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import logo_one from "../../../public/product_category_landing/rounded_cat/one.svg";
import logo_two from "../../../public/product_category_landing/rounded_cat/two.svg";
import logo_three from "../../../public/product_category_landing/rounded_cat/three.svg";
import logo_four from "../../../public/product_category_landing/rounded_cat/four.svg";
import logo_five from "../../../public/product_category_landing/rounded_cat/five.svg";
import logo_six from "../../../public/product_category_landing/rounded_cat/six.svg";
import logo_seven from "../../../public/product_category_landing/rounded_cat/seven.svg";
import Breadcrumb from "../../BreadCrumb";
import { jost } from "/components/ui/fonts";
import { useCategoryIdState } from "/states/use-category-id";
import Container from "/components/container";

const logos = [logo_one, logo_two, logo_three, logo_four, logo_five, logo_six, logo_seven];

const sanitizeText = (text) => {
  return text?.replace(/&amp;/g, "&");
};

const CategoryItem = ({ href, logo, name }) => (
  <li className="flex-shrink-0 flex flex-col items-center text-center w-[110px] md:w-[150px] 2xl:w-[200px]">
    <Link href={href} passHref className="flex flex-col items-center">
      <div className="flex justify-center items-center w-[110px] h-[110px] md:w-[150px] md:h-[150px] 2xl:w-[200px] 2xl:h-[200px] rounded-full overflow-hidden border-transparent hover:scale-105 transition-transform duration-300 p-2">
        <Image
          src={logo}
          alt={sanitizeText(name)}
          className="w-full h-full object-contain cursor-pointer"
          width={200}
          height={200}
        />
      </div>
      <p className={`mt-2 text-sm 2xl:text-[20px] text-center w-full font-medium ${jost.className}`}>
        {sanitizeText(name)}
      </p>
    </Link>
  </li>
);

const SkeletonItem = () => (
  <li className="flex-shrink-0 flex flex-col items-center text-center w-[110px] md:w-[150px] 2xl:w-[200px]">
    <div className="w-[110px] h-[110px] md:w-[150px] md:h-[150px] 2xl:w-[200px] 2xl:h-[200px] rounded-full overflow-hidden">
      <Skeleton circle={true} width="100%" height="100%" />
    </div>
    <div className="mt-2 w-full">
      <Skeleton width="80%" height={15} />
    </div>
  </li>
);

const CategoryList = ({ items, getHref }) => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="sm:hidden">
        <Slider {...sliderSettings}>
          {items.length > 0
            ? items.map((item, index) => (
                <div key={item.id || item.category_id} className="px-2">
                  <CategoryItem
                    href={getHref(item)}
                    logo={logos[index % logos.length]}
                    name={item.name || item.category_name}
                  />
                </div>
              ))
            : Array(7)
                .fill(null)
                .map((_, index) => (
                  <div key={index} className="px-2">
                    <SkeletonItem />
                  </div>
                ))}
        </Slider>
      </div>
      <div className="hidden sm:block overflow-x-auto pb-4 scrollbar-hide">
        <ul className="flex gap-8 md:gap-12 2xl:gap-16 w-max mx-auto px-4">
          {items.length > 0
            ? items.map((item, index) => (
                <CategoryItem
                  key={item.id || item.category_id}
                  href={getHref(item)}
                  logo={logos[index % logos.length]}
                  name={item.name || item.category_name}
                />
              ))
            : Array(7)
                .fill(null)
                .map((_, index) => <SkeletonItem key={index} />)}
        </ul>
      </div>
    </>
  );
};

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
        shop all {sanitizeText(brandsData.brand_name)}
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!categorylanding) return;

      try {
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categorylanding, setCategoryId]);

  const breadcrumbLinks = [
    { name: "Home", route: "/" },
    { name: categorylanding, route: `/product-categories/${categorylanding}` },
  ];

  return (
    <>
      <div className="-mt-12">
        <Breadcrumb links={breadcrumbLinks} />
      </div>
      <h1 className={`text-2xl 2xl:text-[36px] ${jost.className} uppercase font-semibold text-center mt-10`}>
        {isLoading ? (
          <Skeleton width={200} height={30}>
            <span className="opacity-0">Shop all</span>
          </Skeleton>
        ) : (
          <>{sanitizeText(mainCategory?.name || '')}</>
        )}
      </h1>
      <div className="mt-10 flex justify-center">
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
      <Skeleton width={200} height={30}>
        <span className="opacity-0">Shop all</span>
      </Skeleton>
    </h1>
    <div className="mt-10">
      <div className="overflow-x-auto pb-4 scrollbar-hide">
        <ul className="flex gap-8 md:gap-12 2xl:gap-16 w-max mx-auto px-4">
          {Array(7).fill(null).map((_, index) => <SkeletonItem key={index} />)}
        </ul>
      </div>
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