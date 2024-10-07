"use client";

import React from "react";
import Image from "next/image";
import max_cosmetics from "/public/home_banners/olaplex_one.svg";
import max_factor_logo from "/public/home_banners/Max-Factor-Logo.svg";
import Link from "next/link";
import Text from "../../ui/Text";
import Button from "../../ui/button";
import { jost } from "../../ui/fonts";

function MaxFactorBanner() {
  const maxFactorBrandLanding = "max-factor";
  const maxFactorBrandListing = "74";

  return (
    <>
      {/* Mobile and Tablet */}
      <div className="relative w-full h-[230px] sm:h-[280px] mt-10 lg:hidden overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(177,98,120,0.20)] to-[rgba(255,0,0,0.20)]"></div>
        
        {/* Image container */}
        <div className="absolute bottom-0 left-0 w-2/3 sm:w-3/4 h-full">
          <Image
            src={max_cosmetics}
            alt="Max Factor Banner"
            layout="fill"
            objectFit="contain"
            objectPosition="bottom"
          />
        </div>

        {/* Text and button container */}
        <div className="absolute top-0 right-0 bottom-0 w-1/3 sm:w-1/4 bg-[#FFEEF0] flex flex-col justify-center items-center text-center space-y-1 p-2">
          <Image
            width={80}
            height={20}
            layout="fixed"
            src={max_factor_logo}
            alt="Max Factor Logo"
            className="mb-2"
          />
          <Text
            style={"h1"}
            className="uppercase font-bold text-sm sm:text-xl"
          >
            Up To
          </Text>
          <Text style={"h1"} className="text-2xl font-bold sm:text-4xl">
            50%
          </Text>
          <Text
            style={"h1"}
            className="uppercase font-bold text-sm sm:text-xl"
          >
            Off
          </Text>
          <Link href={`/brands/${maxFactorBrandLanding}`}>
            <Button className={`mt-2 p-1 text-xs sm:text-sm sm:p-2 z-10 ${jost.className} uppercase`}>
              Shop Now
            </Button>
          </Link>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex items-center justify-between bg-white mt-10">
        {/* Left Section with Banner */}
        <div className="flex-1 bg-gradient-to-b from-[rgba(177,98,120,0.20)] to-[rgba(255,0,0,0.20)]">
          <Image
            className="object-contain w-full lg:h-[450px] xl:h-[600px] 2xl:h-[693px]"
            width={1000}
            height={450}
            src={max_cosmetics}
            alt="Max Factor Banner"
          />
        </div>

        {/* Right Section */}
        <div className="bg-[#FFEEF0] lg:w-[30%] lg:h-[450px] xl:h-[600px] 2xl:h-[693px] p-8 flex flex-col justify-center items-center">
          <Image
            width={280}
            height={50}
            objectFit="contain"
            src={max_factor_logo}
            alt="Max Factor Logo"
            className="-mt-14"
          />
          <div className="text-center space-y-2">
            <Text
              style={"h1"}
              className="uppercase lg:font-bold lg:text-3xl 2xl:font-medium 2xl:text-5xl"
            >
              Up To
            </Text>
            <Text style={"h1"} className="lg:text-6xl 2xl:text-8xl">
              50%
            </Text>
            <Text
              style={"h1"}
              className="uppercase lg:font-bold lg:text-3xl 2xl:font-medium 2xl:text-5xl"
            >
              Off
            </Text>
          </div>
          <Link href={`/brands/${maxFactorBrandLanding}`}>
            <Button className={`mt-10 uppercase w-max mx-auto ${jost.className}`}>
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default MaxFactorBanner;