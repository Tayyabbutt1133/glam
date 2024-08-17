"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeart, FaRegStar, FaStar } from 'react-icons/fa';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import Slider from 'react-slick';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './home-product.css'; // Custom CSS for styling
// import { useRouter } from 'next/router';
import { jost } from '../../ui/fonts';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const router = useRouter();  // Initialize Next.js router

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
    prevArrow: <IoIosArrowDropleft className="slick-prev" />,
    nextArrow: <IoIosArrowDropright className="slick-next" />,
    responsive: [
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
    router.push(`/products/${productId}`);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-16">
      <h2 className={`text-2xl font-semibold mx-4 my-8 ${jost.className}`}>TRENDING NOW</h2>
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
                  <button className="focus:outline-none">
                    <FaHeart className="text-gray-400 hover:text-black w-6 h-6" />
                  </button>
                </div>

                <img
                  className="w-full h-48 object-contain p-4"
                  src={product.images[0]?.src}
                  alt={product.images[0]?.alt || product.name}
                />

                <div className="px-4 pb-4 flex-grow">
                  <h2 className="text-gray-900 font-semibold text-md">{product.name}</h2>
                  <p className="text-gray-600 text-sm mb-1 line-clamp-2">{product.short_description}</p>

                  <div className="flex items-center mb-2">
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
                      <span className="line-through mr-2">RRP: £{product.regular_price}</span>
                    )}
                    {product.regular_price && product.price && (
                      <span className="text-green-500">
                        Save £{(product.regular_price - product.price).toFixed(2)}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-900 font-bold text-lg mb-3">£{parseFloat(product.price).toFixed(2)}</p>
                </div>

                <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-200 add-to-bag-btn">
                  ADD TO BAG
                </button>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ProductList;
