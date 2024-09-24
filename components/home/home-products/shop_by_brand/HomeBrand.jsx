"use client";

import React from "react";
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

const HomeBrand = () => {
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

  return (
    <Container>
      <div className="px-4 py-16 space-y-10">
        <Text style="h1" className="uppercase">
          SHOP BY BRAND
        </Text>
        <BrandSlide />
        <div className="flex overflow-x-auto pb-4 space-x-4 lg:grid lg:grid-cols-4 lg:gap-8 lg:space-x-0 scrollbar-hide">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/brands/${product.brandLanding}`}
              className="cursor-pointer bg-transparent overflow-hidden transition-shadow duration-300 flex-shrink-0 w-[calc(50%-8px)] sm:w-[calc(33.333%-16px)] lg:w-full"
            >
              <div className="relative w-[150px] h-[150px] sm:h-60 sm:w-60 lg:h-[255px] lg:w-[255px] 2xl:w-[350px] 2xl:h-[350px]   rounded-md 2xl:rounded-lg overflow-hidden ">
                <Image
                  className=" object-cover brightness-75 sm:brightness-100"
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                />
                <h3
                  className={`sm:hidden text-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold text-gray-50 ${jost.className}`}
                >
                  {product.name}
                </h3>
              </div>

              <div className="py-6 text-left">
                <h3
                  className={`hidden sm:block text-lg font-semibold text-gray-900 ${jost.className}`}
                >
                  {product.name}
                </h3>
                <p
                  className={`text-black font-normal text-xs sm:text-sm 2xl:text-lg my-2 ${lexendDeca.className}`}
                >
                  {product.description}
                </p>
                <button
                  className={`sm:mt-4 bg-black text-white text-xs sm:text-sm py-2 sm:px-6 px-2 rounded-lg hover:bg-[#CF8562] transition duration-200 ${jost.className}`}
                >
                  SHOP NOW
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default HomeBrand;