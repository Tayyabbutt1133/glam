"use client";

import React from "react";
import Image from "next/image";
import max_cosmetics from "/public/home_banners/olaplex_one.svg";
import Link from "next/link";
import Text from "../../ui/Text";
import Button from "../../ui/button";
import { jost } from "../../ui/fonts";

function MaxFactorBanner() {
  return (
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
          objectPosition="left bottom"
        />
      </div>

      {/* Text and button container */}
      <div className="absolute top-1/2 right-4 sm:right-8 transform -translate-y-1/2 text-center space-y-1 z-10">
        <Text
          style={"h1"}
          className="uppercase font-bold text-xl sm:text-2xl"
        >
          Up To
        </Text>
        <Text style={"h1"} className="text-4xl font-bold sm:text-6xl">
          50%
        </Text>
        <Text
          style={"h1"}
          className="uppercase font-bold text-xl sm:text-2xl"
        >
          Off
        </Text>
        <Link href={`/brands/max-factor/74`}>
          <Button className={`mt-4 p-1 text-sm sm:p-2 z-10 ${jost.className} sm:text-lg`}>
            Shop Now
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default MaxFactorBanner;