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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/brands/${product.brandLanding}`}
              className="cursor-pointer bg-transparent overflow-hidden transition-shadow duration-300 flex flex-col"
            >
              <div className="relative w-full aspect-square">
                <Image
                  className="object-cover"
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              <div className="py-4 text-left flex-grow flex flex-col justify-between">
                <div>
                  <h3
                    className={`text-lg font-semibold text-gray-900 ${jost.className}`}
                  >
                    {product.name}
                  </h3>
                  <p
                    className={`text-black font-normal text-sm my-2 ${lexendDeca.className}`}
                  >
                    {product.description}
                  </p>
                </div>
                <button
                  className={`w-[50%] mt-2 bg-black text-white text-[14px] py-2 px-6 rounded-lg hover:bg-[#CF8562] transition duration-200 ${jost.className}`}
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