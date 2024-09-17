"use client";
import React from 'react';
import Container from '../../../container';
import cat_one from '../../../../public/home_categories_banner/category_one.svg';
import cat_two from '../../../../public/home_categories_banner/category_two.svg';
import cat_three from '../../../../public/home_categories_banner/category_three.svg';
import cat_four from '../../../../public/home_categories_banner/category_four.svg';
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
        <div className="py-16  relative">
          <h1 className={`text-2xl font-semibold mb-8 text-left ${jost.className} uppercase`}>Shop by Category</h1>
          <div className=' md:mx-3'>
            <Slider {...settings} >
              <div className="px-2  w-[45%] lg:w-44 xl:w-56 2xl:w-[100%]">
                <Image src={cat_one} alt="Makeup" className="rounded-lg object-cover cursor-pointer w-full" />
              </div>
              <div className="px-2  w-[45%] lg:w-44 xl:w-56 2xl:w-[100%]">
                <Image src={cat_two} alt="Lips" className="rounded-lg object-cover cursor-pointer w-full" />
              </div>
              <div className="px-2  w-[45%] lg:w-44 xl:w-56 2xl:w-[100%]">
                <Image src={cat_three} alt="Hair" className="rounded-lg object-cover cursor-pointer w-full" />
              </div>
              <div className="px-2  w-[45%] lg:w-44 xl:w-56 2xl:w-[100%]">
                <Image src={cat_four} alt="Fragrance" className="rounded-lg object-cover cursor-pointer w-full" />
              </div>
            </Slider>
          </div>
        </div>
      </Container>
    </>
  );
}
