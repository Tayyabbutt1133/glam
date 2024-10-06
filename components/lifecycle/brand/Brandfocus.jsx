"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { jost } from "../../../components/ui/fonts";
import NextArrowIcon from "../../../public/hero-banners/next-arrow";
import PrevArrowIcon from "../../../public/hero-banners/prev-arrow";
import Product from "/components/product";

const arrowStyles = {
  width: "40px",
  height: "40px",
  zIndex: 1,
  transition: "all 0.3s ease-in-out",
};

const NextArrow = ({ className, style, onClick }) => (
  <div
    className={`absolute top-1/2 transform -translate-y-1/2 right-4 2xl:mr-8 ${className}`}
    onClick={onClick}
    style={{
      ...style,
      ...arrowStyles,
      right: "-34px",
    }}
  >
    <NextArrowIcon />
  </div>
);

const PrevArrow = ({ className, style, onClick }) => (
  <div
    className={`absolute top-1/2 transform -translate-y-1/2 left-4 ${className}`}
    onClick={onClick}
    style={{
      ...style,
      ...arrowStyles,
      left: "-50px",
    }}
  >
    <PrevArrowIcon />
  </div>
);

// Utility function to decode HTML entities
const decodeHtmlEntities = (text) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
};

const Brandfocus = ({ staffPicks = [] }) => {
  const [favorites, setFavorites] = useState({});

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          arrows: true,
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
          dots: true,
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
          dots: true,
          rows: 2,
          
          
        },
      },
    ],
  };

  const handleProductClick = (productId) => {
    console.log(`Product clicked: ${productId}`);
  };

  const handleFavoriteClick = (productId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [productId]: !prevFavorites[productId],
    }));
  };

  return (
    <div className="py-4 pb-10 lg:py-7 lg:pb-14">
      <h2 className={`text-2xl font-semibold mx-4 my-8 ${jost.className} uppercase`}>IN FOCUS</h2>
      {!staffPicks.length ? (
        <Slider {...settings}>
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="px-2">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden relative flex flex-col h-full min-h-[420px] border border-gray-300">
                  <div className="w-[90%] 2xl:w-[100%] h-48">
                    <Skeleton height="100%" />
                  </div>
                  <div className="px-4 pb-4 flex-grow">
                    <Skeleton height={24} width="80%" className="mb-2" />
                    <Skeleton height={20} width="100%" className="mb-2" />
                    <Skeleton height={20} width="90%" className="mb-2" />
                    <Skeleton height={20} width="50%" className="mb-4" />
                    <Skeleton height={32} width="100%" />
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      ) : (
        <Slider {...settings}>
          {staffPicks.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Brandfocus;
