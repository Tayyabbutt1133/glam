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

const arrowStyles = {
  width: "40px",
  height: "40px",
  zIndex: 1,
  transition: "all 0.3s ease-in-out", // Smooth transition
};

const NextArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={`arrow ${className}`}
      onClick={onClick}
      style={{
        ...style,
        ...arrowStyles,
        right: "10px",  // Adjusted to match left arrow
        display: "block",
      }}
    >
      <NextArrowIcon />
    </div>
  );
};

const PrevArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={`arrow ${className}`}
      onClick={onClick}
      style={{
        ...style,
        ...arrowStyles,
        left: "",  // Adjusted to match right arrow
        display: "block",
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
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Container>
        <div className="py-16 relative">
          <h1 className={`text-2xl font-semibold mb-8 text-left ${jost.className}`}>Shop by Category</h1>
          <Slider {...settings}>
            <div className="px-2 lg:w-44 xl:w-56">
              <Image src={cat_one} alt="Makeup" className="rounded-lg object-cover cursor-pointer w-full" />
            </div>
            <div className="px-2 lg:w-44 xl:w-full">
              <Image src={cat_two} alt="Lips" className="rounded-lg object-cover cursor-pointer w-full" />
            </div>
            <div className="px-2 lg:w-44 xl:w-full">
              <Image src={cat_three} alt="Hair" className="rounded-lg object-cover cursor-pointer w-full" />
            </div>
            <div className="px-2 lg:w-44 xl:w-full">
              <Image src={cat_four} alt="Fragrance" className="rounded-lg object-cover cursor-pointer w-full" />
            </div>
          </Slider>
        </div>
      </Container>
    </>
  );
}
