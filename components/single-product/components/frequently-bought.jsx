"use client"

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePopupStore } from "/states/use-popup-store";
import ButtonAddToCart from "./product-data/ButtonAddtoCart";
import { PlusIcon } from "lucide-react";
import { jost, lexendDeca } from "../../ui/fonts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const API_BASE_URL = "https://glam.clickable.site/wp-json/wc/v3"
const CONSUMER_KEY = "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d"
const CONSUMER_SECRET = "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc"

export default function FrequentlyBoughtTogether() {
  const { rate, currencySymbol } = usePopupStore();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&per_page=3`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const fetchedProducts = await response.json();
        
        // Process brand information
        const brandMap = new Map();
        fetchedProducts.forEach((product) => {
          const brandAttr = product.attributes.find(
            (attr) => attr.name === "Brand"
          );
          if (brandAttr) {
            const brandName = brandAttr.options[0].replace(/&amp;/g, "&");
            if (!brandMap.has(brandName)) {
              brandMap.set(brandName, { count: 1, categories: new Set() });
            } else {
              brandMap.get(brandName).count++;
            }
            product.categories.forEach((category) => {
              brandMap.get(brandName).categories.add(category.id);
            });
          }
          // Add brand information to the product object
          product.brand = brandAttr ? brandAttr.options[0].replace(/&amp;/g, "&") : 'Unknown Brand';
        });

        setProducts(fetchedProducts);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">Error: {error}</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const ProductCard = ({ product, index }) => (
    <div className="w-full flex flex-col h-[400px] lg:h-[350px] 2xl:h-[400px] justify-between mb-8 sm:mb-0 px-4">
      <div>
        <Link href={`/product/${product.id}`} className="block aspect-square mb-4">
          <Image
            src={product.images[0]?.src || '/placeholder.png'}
            alt={product.name}
            className="w-full h-full border p-2 rounded-lg border-[#EFEFEF] object-contain"
            width={200}
            height={200}
          />
        </Link>
        <div className="flex flex-col gap-2">
          <Link href={`/product/${product.id}`}>
            <h3 className={`font-semibold text-[16px] 2xl:text-lg mb-1 hover:underline ${jost.className}`}>{product.brand}</h3>
          </Link>
          <p className={`text-sm font-normal line-clamp-2 mb-2 ${lexendDeca.className}`}>{product.name}</p>
        </div>
      </div>
      <div className="mt-auto">
        <div className="mb-2">
          <span className={`text-black ${lexendDeca.className} font-normal`}>
            {currencySymbol}{(parseFloat(product.price) * rate).toFixed(2)}
          </span>
        </div>
        <ButtonAddToCart product={product} className="w-full" />
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl">
      <h2 className={`sm:text-2xl text-[20px] font-medium mb-6 ${jost.className}`}>Frequently Bought Together</h2>

      {isMobile ? (
        <div className="px-4">
          <Slider {...settings}>
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </Slider>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-stretch justify-between gap-6">
          {products.map((product, index) => (
            <React.Fragment key={product.id}>
              <div className="w-full sm:w-1/3">
                <ProductCard product={product} index={index} />
              </div>
              {index < products.length - 1 && (
                <div className="hidden sm:flex items-center justify-center w-8 h-8 self-center">
                  <PlusIcon className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}