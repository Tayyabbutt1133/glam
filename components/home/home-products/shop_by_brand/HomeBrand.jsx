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
      <div className=" py-16 space-y-10">
        <BrandSlide />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-start cursor-pointer bg-transparent overflow-hidden transition-shadow duration-300 flex-shrink-0 w-[calc(50%-8px)] sm:w-[calc(33.333%-16px)] lg:w-full"
            >
              <div className="relative ">
                <Image
                  className="object-cover"
                  src={product.image}
                  alt={product.name}
                  objectFit="cover"
                />
              </div>
              <p
                className={`text-black mt-5 lg:text-[24px] font-semibold text-xs sm:text-sm mb-4 ${jost.className}`}
              >
                {product.name}
              </p>
              
              <p
              className={`text-black font-normal text-xs sm:text-sm xl::text-[20px] mb-4 leading-normal ${lexendDeca.className}`}
              >
                {product.description}
              </p>
              <button
                className={`mt-auto bg-black text-white text-xs sm:text-sm py-2 sm:px-6 px-2 rounded-lg hover:bg-hover transition duration-200 ${jost.className}`}
              >
                SHOP NOW
              </button>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default HomeBrand;