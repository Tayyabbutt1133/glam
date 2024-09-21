"use client";

import React from 'react';
import Link from 'next/link';
import Container from '../../../container';
import cat_one from '../../../../public/home_categories_banner/makeup.png';
import cat_two from '../../../../public/home_categories_banner/lips.webp';
import cat_three from '../../../../public/home_categories_banner/hair.png';
import cat_four from '../../../../public/home_categories_banner/fragrance.webp';
import cat_five from '../../../../public/home_categories_banner/skincare.png'
import Image from 'next/image';
import { jost } from '../../../ui/fonts';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NextArrowIcon from "/public/hero-banners/next-arrow";
import PrevArrowIcon from "/public/hero-banners/prev-arrow";

// Arrow styles
const arrowStyles = {
  width: "30px",
  height: "30px",
  zIndex: 5,
  transition: "all 0.3s ease-in-out", // Smooth transition
};

// Next Arrow component
const NextArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={`absolute top-1/2 transform -translate-y-1/2 right-4 ${className}`}
      onClick={onClick}
      style={{
        ...style,
        ...arrowStyles,
        right: "-10px",
      }}
    >
      <NextArrowIcon />
    </div>
  );
};

// Previous Arrow component
const PrevArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={`absolute top-1/2 transform -translate-y-1/2 left-4 ${className}`}
      onClick={onClick}
      style={{
        ...style,
        ...arrowStyles,
        left: "-36px", // Adjust left position as needed
      }}
    >
      <PrevArrowIcon />
    </div>
  );
};

export default function HomeCategory() {
  const categories = [
    { name: "Makeup", image: cat_one, categoryLanding: "makeup", subcategories: "147" },
    { name: "Lips", image: cat_two, categoryLanding: "lips", subcategories: "33" },
    { name: "Hair", image: cat_three, categoryLanding: "hair", subcategories: "484" },
    { name: "Fragrance", image: cat_four, categoryLanding: "fragrance", subcategories: "485" },
    { name: "Skincare", image: cat_five, categoryLanding: "skincare", subcategories: "483" }
  ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <div className='hidden sm:block'><NextArrow /></div>,
    prevArrow: <div className='hidden sm:block'><PrevArrow /></div>,
    dots: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Container>
        <div className="py-16  relative md:mx-7 lg:mx-6 xl:mx-5">
          <h1 className={`text-2xl lg:text-[36px] font-semibold mb-8 text-left ${jost.className} uppercase`}>Shop by Category</h1>
          <Slider {...settings}>
            {categories.map((category, index) => (
              <div key={index} className="px-2 w-[45%] lg:w-44 xl:w-56 2xl:w-[100%]">
                <Link href={`/product-categories/${category.categoryLanding}`}>
                  <Image 
                    src={category.image} 
                    alt={category.name} 
                    className="rounded-lg object-cover cursor-pointer w-full" 
                  />
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </Container>
    </>
  );
}