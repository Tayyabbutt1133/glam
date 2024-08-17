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

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    prevArrow: <IoIosArrowDropleft className="slick-prev"  />,
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

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mx-4 my-6">TRENDING NOW</h2>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"> {/* Reduced gap */}
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="max-w-xs mx-auto">
                <Skeleton height={200} />
                <Skeleton count={3} />
                <Skeleton width={100} />
              </div>
            ))}
        </div>
      ) : (
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id} className="px-2"> {/* Reduced padding */}
              <div className="bg-white shadow-lg rounded-lg overflow-hidden relative flex flex-col h-full min-h-[420px] border border-gray-300"> {/* Added border */}
                {/* Sale Badge */}
                {product.on_sale && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    SALE
                  </div>
                )}

                {/* Heart Icon in the Top-Right Corner */}
                <div className="absolute top-2 right-2">
                  <button className="focus:outline-none">
                    <FaHeart className="text-gray-400 hover:text-black w-6 h-6" />
                  </button>
                </div>

                {/* Product Image */}
                <img
                  className="w-full h-48 object-contain p-4"
                  src={product.images[0]?.src}
                  alt={product.images[0]?.alt || product.name}
                />

                <div className="px-4 pb-4 flex-grow">
                  {/* Product Name */}
                  <h2 className="text-gray-900 font-semibold text-md">{product.name}</h2>

                  {/* Product Short Description */}
                  <p className="text-gray-600 text-sm mb-1 line-clamp-2">{product.short_description}</p>

                  {/* Star Ratings */}
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

                  {/* Price and Discount */}
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

                  {/* Final Price */}
                  <p className="text-gray-900 font-bold text-lg mb-3">£{parseFloat(product.price).toFixed(2)}</p>
                </div>

                {/* Add to Bag Button */}
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
