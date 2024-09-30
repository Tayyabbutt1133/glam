"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import Container from "/components/container";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NextArrowIcon from "/public/hero-banners/next-arrow";
import PrevArrowIcon from "/public/hero-banners/prev-arrow";
import Product from "/components/product";
import Text from "../../ui/Text"

const arrowStyles = {
  width: "40px",
  height: "40px",
  zIndex: 1,
  transition: "all 0.3s ease-in-out",
};
// Next Arrow component
const NextArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={`absolute top-1/2 transform -translate-y-1/2 right-4 2xl:mr-8 ${className}`}
      onClick={onClick}
      style={{
        ...style,
        ...arrowStyles,
        right: "-5vw",
      }}
    >
      <NextArrowIcon />
    </div>
  );
};

const PrevArrow = ({ className, style, onClick }) => (
  <div
    className={`absolute top-1/2 transform -translate-y-1/2 left-4 ${className}`}
    onClick={onClick}
    style={{
      ...style,
      ...arrowStyles,
      left: "-5vw",
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

const InFocus = () => {

  const [favorites, setFavorites] = useState({});
  const [staffPicks, setStaffPicks] = useState([]);
  const [loading, setLoading] = useState(true);
  const categoryId = 147;

  useEffect(() => {
    const fetchStaffPicks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/staffpicks/${categoryId}`);
        setStaffPicks(response.data);
      } catch (error) {
        console.error("Error fetching staff picks:", error);
      } finally {
        setLoading(false);
      }
    };
    if (categoryId) fetchStaffPicks();
  }, [categoryId]);

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

  if (!categoryId) return;

  return (
    <Container className="mb-16">
      <Text style={"h1"}
        className={`uppercase mb-10`}
      >
        In focus
      </Text>
      <main className="w-[92%] mx-auto">

      
      {loading ? (
        <Slider {...settings}>
        {Array(4).fill(0).map((_, index) => (
          <div key={index} className="px-2">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden relative flex flex-col h-full min-h-[350px] border border-gray-300">
              <div className="aspect-w-1 aspect-h-1 w-full h-48">
                <Skeleton height="100%" />
              </div>
              <div className="p-4 flex-grow">
                <Skeleton height={20} width="80%" className="mb-2" />
                <Skeleton height={16} width="60%" className="mb-4" />
                <Skeleton height={24} width="40%" className="mb-2" />
                <Skeleton height={32} width="100%" />
              </div>
            </div>
          </div>
        ))}
      </Slider>
      ) : (
        <Slider {...settings}>
          {staffPicks?.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </Slider>
      )}
      </main>
    </Container>
  );
};

export default InFocus;
