"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "../../../container";
import brand_one from "../../../../public/home_banners/brand_one.svg";
import brand_two from "../../../../public/home_banners/brand_two.svg";
import brand_three from "../../../../public/home_banners/brand_three.svg";
import brand_four from "../../../../public/home_banners/brand_four.svg";
import { jost, lexendDeca } from "../../../ui/fonts";
import BrandSlide from "./BrandSlide";
import Text from "../../../ui/Text";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeBrand = () => {
  const [isSlider, setIsSlider] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsSlider(window.innerWidth < 1024); // Use 768px as the breakpoint for md
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const products = [
    {
      id: 1009,
      name: "CLINIQUE",
      description: "Discover Clinique's Anti-Wrinkle sunscreen",
      image: brand_one,
      brandLanding: "clinique",
      brandListing: "1009",
    },
    {
      id: 1341,
      name: "ESTEE LAUDER",
      description: "Discover Estee Lauder's luxurious skincare",
      image: brand_two,
      brandLanding: "estee-lauder",
      brandListing: "1341",
    },
    {
      id: 991,
      name: "SCHWARZKOPF",
      description: "Explore Schwarzkopf's professional hair care",
      image: brand_three,
      brandLanding: "schwarzkopf",
      brandListing: "991",
    },
    {
      id: 1011,
      name: "JIMMY CHOO",
      description: "Experience Jimmy Choo's iconic fragrances",
      image: brand_four,
      brandLanding: "jimmy-choo",
      brandListing: "1011",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const renderProductCard = (product) => (
    <div
      key={product.id}
      className="flex flex-col items-start cursor-pointer bg-transparent overflow-hidden transition-shadow duration-300 flex-shrink-0 w-full p-4"
    >
      <h1 className={`${jost.className} mb-8 sm:hidden text-[20px] font-medium`}>Summer Essentials</h1>
      <div className="w-full h-auto relative aspect-[4/3] lg:aspect-square lg:max-w-[390px] lg:max-h-[390px]">
        <Image
          className="rounded-lg object-cover"
          src={product.image}
          alt={product.name}
          layout="fill"
        />
      </div>
      <p
        className={`text-black mt-5 md:text-[24px] font-semibold text-xs sm:text-sm mb-4 ${jost.className}`}
      >
        {product.name}
      </p>
      <p
        className={`text-black font-normal text-[14px] sm:text-sm mb-4 ${lexendDeca.className}`}
      >
        {product.description}
      </p>
      <button
        className={`mt-auto bg-black text-white text-xs sm:text-sm py-2 px-4 sm:px-6 rounded-lg hover:bg-hover transition duration-200 ${jost.className} w-[116px] h-[36px] sm:w-auto sm:h-auto`}
      >
        SHOP NOW
      </button>
    </div>
  );

  return (
    <Container>
      <div className="py-16 space-y-10">
        <BrandSlide />
        {isSlider ? (
          <Slider {...settings}>
            {products.map(renderProductCard)}
          </Slider>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(renderProductCard)}
          </div>
        )}
      </div>
    </Container>
  );
};

export default HomeBrand;