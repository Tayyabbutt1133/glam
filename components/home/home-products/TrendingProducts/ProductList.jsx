"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { jost } from '../../../ui/fonts';
import Container from '../../../container';
import NextArrowIcon from '../../../../public/hero-banners/next-arrow';
import PrevArrowIcon from '../../../../public/hero-banners/prev-arrow';
import { useCartStore } from '../../../../states/Cardstore';
import Product from '../../../product';


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
          dots:false,
          slidesToScroll: 3,
          arrows: false,
          
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots:false,
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
      <div className="py-16 md:mb-20">
        <h1 className={`uppercase font-semibold mb-8 ${jost.className} 2xl:text-[36px] xs:text-2xl text-[20px]`}>TRENDING NOW</h1>
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
                <Product product={product} />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </Container>
  );
};

export default ProductList;