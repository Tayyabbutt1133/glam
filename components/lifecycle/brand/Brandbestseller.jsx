"use client";

import React, { useState } from "react";
import { FaRegStar, FaStar, FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { jost, lexendDeca } from "../../../components/ui/fonts";
import NextArrowIcon from "../../../public/hero-banners/next-arrow";
import PrevArrowIcon from "../../../public/hero-banners/prev-arrow";

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

const Brandbestseller = ({ hotSellingProducts = [] }) => {
  const [favorites, setFavorites] = useState({});

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
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

  const handleProductClick = (productId) => {
    console.log(`Product clicked: ${productId}`);
  };

  const handleFavoriteClick = (productId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [productId]: !prevFavorites[productId],
    }));
  };

  const sanitizeText = (text) => {
    return text.replace(/&amp;/g, '&');
  };

  return (
    <div className="py-16">
      <h2 className={`text-2xl font-semibold mx-4 my-8 ${jost.className} uppercase`}>Bestsellers</h2>
      {!hotSellingProducts.length ? (
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
                    <Skeleton height={24} width="80%" className="mb-3" />
                    <Skeleton height={20} width="100%" className="mb-3" />
                    <Skeleton height={20} width="90%" className="mb-3" />
                    <Skeleton height={20} width="50%" className="mb-4" />
                    <Skeleton height={32} width="100%" />
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      ) : (
        <Slider {...settings}>
          {hotSellingProducts.map((product) => (
            <div key={product.id} className="px-2 mx-4 2xl:mx-0">
              <div
                className="bg-white border border-gray-300 rounded-lg overflow-hidden relative flex flex-col h-full min-h-[470px] w-[90%] cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                {product.on_sale && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    SALE
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <button className="focus:outline-none" onClick={() => handleFavoriteClick(product.id)}>
                    {favorites[product.id] ? (
                      <FaHeart className="text-red-500 w-6 h-6" />
                    ) : (
                      <CiHeart className="text-black w-6 h-6" />
                    )}
                  </button>
                </div>
                <img
                  className="w-full h-48 object-contain p-4"
                  src={product.images[0]?.src}
                  alt={sanitizeText(product.images[0]?.alt || product.name)}
                />
                <div className="px-4 pb-4 flex-grow flex flex-col">
                  <h2
                    className={`text-gray-900 font-bold text-sm ${lexendDeca.className} h-auto`}
                    style={{
                      whiteSpace: "normal",
                      overflow: "visible",
                      textOverflow: "clip",
                    }}
                  >
                    {sanitizeText(product.name)}
                  </h2>
                  <div className="flex items-center mb-3 mt-3">
                    {[...Array(5)].map((_, index) => (
                      <span key={index}>
                        {index < Math.round(product.average_rating) ? (
                          <FaStar className="text-[#7E7E7E] w-4 h-4" />
                        ) : (
                          <FaRegStar className="text-[#7E7E7E] w-4 h-4" />
                        )}
                      </span>
                    ))}
                    <span className="text-gray-600 text-sm ml-2">({product.rating_count})</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    {product.regular_price && (
                      <span className={`line-through mr-2 ${lexendDeca.className}`}>
                        RRP: £{product.regular_price}
                      </span>
                    )}
                    {product.regular_price && product.price && (
                      <span className={`text-black ${lexendDeca.className}`}>
                        Save £{(product.regular_price - product.price).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <p className={`text-gray-900 font-bold text-lg mb-3 ${lexendDeca.className}`}>
                    £{parseFloat(product.price).toFixed(2)}
                  </p>
                  <button
                    className={`w-[70%] md:w-[60%] lg:w-[85%] bg-black text-white py-2 mx-auto mt-auto rounded-md hover:bg-gray-800 font-normal transition duration-200 flex justify-center items-center text-center ${lexendDeca.className}`}
                  >
                    ADD TO BASKET
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Brandbestseller;
