"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaRegStar, FaStar, FaHeart } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import Slider from 'react-slick';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { jost, lexendDeca } from '../../ui/fonts';
import Container from '../../container';
import NextArrowIcon from '../../../public/hero-banners/next-arrow';
import PrevArrowIcon from '../../../public/hero-banners/prev-arrow';

// Arrow styles
const arrowStyles = {
  width: "40px",
  height: "40px",
  zIndex: 1,
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
        right: "10px", // Adjust right position as needed
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
        left: "", // Adjust left position as needed
      }}
    >
      <PrevArrowIcon />
    </div>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({}); // State to track favorited products

  useEffect(() => {
    axios
      .get('https://glam.clickable.site/wp-json/wc/v3/products/', {
        params: {
          consumer_key: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
          consumer_secret: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
          orderby: 'popularity',
          order: 'desc',
          per_page: 10,
        },
      })
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
        setLoading(false);
      });
  }, []);

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
    // router.push(`/products/${productId}`);
    console.log(`Product clicked: ${productId}`);
  };

  const handleFavoriteClick = (productId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [productId]: !prevFavorites[productId],
    }));
  };

  return (
    <Container>
      <div className="py-16">
        <h2 className={`text-2xl font-semibold mx-4 my-8 ${jost.className} uppercase`}>TRENDING NOW</h2>
        {loading ? (
          <Slider {...settings}>
            {Array(4) // Adjusting the number of skeletons to match slidesToShow
              .fill(0)
              .map((_, index) => (
                <div key={index} className="px-2">
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden relative flex flex-col h-full min-h-[420px] border border-gray-300">
                    {/* Skeleton Image Placeholder */}
                    <div className="w-full h-48">
                      <Skeleton height="100%" />
                    </div>
                    {/* Skeleton Text Placeholder */}
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
            {products.map((product) => (
              <div key={product.id} className="px-2">
                <div
                  className="bg-white shadow-lg rounded-lg overflow-hidden relative flex flex-col h-full min-h-[420px] border border-gray-300 cursor-pointer"
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
                        <FaHeart className="text-red-500 w-6 h-6" /> // Filled heart when favorited
                      ) : (
                        <CiHeart className="text-black w-6 h-6" /> // Unfilled heart
                      )}
                    </button>
                  </div>
                  <img
                    className="w-full h-48 object-contain p-4"
                    src={product.images[0]?.src}
                    alt={product.images[0]?.alt || product.name}
                  />
                  <div className="px-4 pb-4 flex-grow">
                    <h2 className={`text-gray-900 font-bold text-sm ${lexendDeca.className}`}>{product.name}</h2>
                    <div className="flex items-center mb-2 mt-4">
                      {[...Array(5)].map((_, index) => (
                        <span key={index}>
                          {index < Math.round(product.average_rating) ? (
                            <FaStar className="text-yellow-500 w-4 h-4" />
                          ) : (
                            <FaRegStar className="text-yellow-500 w-4 h-4" />
                          )}
                        </span>
                      ))}
                      <span className="text-gray-600 text-sm ml-2">({product.rating_count})</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mb-1">
                      {product.regular_price && (
                        <span className={`line-through mr-2 ${lexendDeca.className}`}>
                          RRP: £{product.regular_price}
                        </span>
                      )}
                      {product.regular_price && product.price && (
                        <span className={`text-green-500 ${lexendDeca.className}`}>
                          Save £{(product.regular_price - product.price).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <p className={`text-gray-900 font-bold text-lg mb-3 ${lexendDeca.className}`}>
                      £{parseFloat(product.price).toFixed(2)}
                    </p>
                  </div>
                  <button
                    className={`w-[70%] md:w-[60%] lg:w-[85%] bg-black text-white py-2 mb-4 mx-auto rounded-md hover:bg-gray-800 font-normal transition duration-200 flex justify-center ${jost.className} uppercase`}
                  >
                    ADD TO BAG
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </Container>
  );
};

export default ProductList;
