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
import { jost, lexendDeca } from '../../../ui/fonts';
import Container from '../../../container';
import NextArrowIcon from '../../../../public/hero-banners/next-arrow';
import PrevArrowIcon from '../../../../public/hero-banners/prev-arrow';
import { useCartStore } from '../../../../states/Cardstore';
import { useRouter } from 'next/navigation';

import { usePopupStore } from '../../../../states/use-popup-store';


const arrowStyles = {
  width: "40px",
  height: "40px",
  zIndex: 1,
  transition: "all 0.3s ease-in-out",
};

const NextArrow = ({ className, style, onClick }) => (
  <div
    className={`absolute top-1/2 transform -translate-y-1/2 right-4  ${className}`}
    onClick={onClick}
    style={{ ...style, ...arrowStyles, right: "-60px" }}
  >
    <NextArrowIcon />
  </div>
);

const PrevArrow = ({ className, style, onClick }) => (
  <div
    className={`absolute top-1/2 transform -translate-y-1/2 left-4 ${className}`}
    onClick={onClick}
    style={{ ...style, ...arrowStyles, left: "-70px" }}
  >
    <PrevArrowIcon />
  </div>
);

const ProductCard = ({ product, isFavorite, onFavoriteClick, onAddToCart }) => {
  const {  rate, currencySymbol } = usePopupStore();
  const brand = product.attributes.find((attr) => attr.name === "Brand")?.options[0] || "Unknown Brand";
  const productName = product.name.replace(/&amp;/g, "&");
// console.log(product[0])
  const router = useRouter();
  const handleProductClick = () => {
    
    router.push(`/product/${product.id}`);
  };



  
  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden relative flex flex-col h-full min-h-[430px] w-full cursor-pointer">
      {product.on_sale && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          SALE
        </div>
      )}
      <div className="absolute top-2 right-2">
        <button className="focus:outline-none" onClick={() => onFavoriteClick(product.id)}>
          {isFavorite ? (
            <FaHeart className="text-red-500 w-6 h-6" />
          ) : (
            <CiHeart className="text-black w-6 h-6" />
          )}
        </button>
      </div>
      <img
        onClick={handleProductClick}
        className="w-full h-48 object-contain p-4"
        src={product.images[0]?.src}
        alt={product.images[0]?.alt || productName}
      />
      <div className="px-4 pb-4 flex-grow flex flex-col">
        <h2 className={`text-gray-900 hidden sm:block font-bold text-[16px] ${jost.className} h-[40px] overflow-hidden`}>
          {brand}
        </h2>
        <h3 
        onClick={handleProductClick}
        className={`text-gray-900 font-normal text-wrap text-sm ${lexendDeca.className} text-sm sm:textbase h-[80px] overflow-hidden`}>
          {productName}
        </h3>
        <div className="flex items-center mb-2 mt-1 h-[20px]">
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
        <div className="flex items-center text-gray-600 text-sm mb-1 h-[20px]">
          {product.regular_price && (
            <span className={`line-through mr-2 ${lexendDeca.className}`}>
              {currencySymbol}{parseFloat(product.regular_price * rate).toFixed(2)}
            </span>
          )}
          {product.regular_price && product.price && (
            <span className={`text-red-600 text-xs flex ${lexendDeca.className}`}>
              Save {currencySymbol}{((parseFloat(product.regular_price) - parseFloat(product.price)) * rate).toFixed(2)}
            </span>
          )}
        </div>
        <p className={`text-black font-bold text-lg mt-3 ${lexendDeca.className}`}>
          {currencySymbol}{parseFloat(product.price * rate).toFixed(2)}
        </p>
        <button
          className={`w-full hover:bg-[#CF8562] mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800 font-normal transition duration-200 ${jost.className} uppercase`}
          onClick={() => onAddToCart(product)}
        >
          ADD TO BAG
        </button>
      </div>
    </div>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({});
  const addToCart = useCartStore((state) => state.addToCart);

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
        console.log(response.data[0])
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
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          dots:true,
          slidesToScroll: 3,
          arrows: false,
          
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots:true,
          slidesToShow: 2,
          slidesToScroll: 2,
          rows: 2,
          slidesPerRow: 1,
        },
      },
    ],
  };

  const handleFavoriteClick = (productId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [productId]: !prevFavorites[productId],
    }));
  };

  return (
    <Container>
      <div className="py-16 md:mb-20 lg:mx-10">
        <h2 className={`text-2xl lg:text-[36px] font-semibold mx-4 my-8 ${jost.className} uppercase`}>TRENDING NOW</h2>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array(4).fill(0).map((_, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden relative flex flex-col h-full min-h-[420px] border border-gray-300">
                <div className="w-full h-48">
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
            ))}
          </div>
        ) : (
          <Slider {...settings}>
            {products.map((product) => (
              <div key={product.id} className="px-2 mb-4">
                <ProductCard
                  product={product}
                  isFavorite={favorites[product.id]}
                  onFavoriteClick={handleFavoriteClick}
                  onAddToCart={addToCart}
                />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </Container>
  );
};

export default ProductList;