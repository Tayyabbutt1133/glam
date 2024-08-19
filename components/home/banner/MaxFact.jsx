"use client";
import React from "react";
import Image from "next/image";
import max_cosmetics from "/public/home_banners/olaplex_one.svg";
import max_logo from "/public/home_banners/Max-Factor-Logo.svg";
import MobMax from "/public/home_banners/mob-maxfact.svg";
import MaxFactOverlay from "/public/home_banners/olaplex1.png";
import Link from "next/link";
import Text from "../../ui/Text";
import Button from "../../ui/button";




function MaxFactorBanner() {
  return (
    <div className="relative w-full h-[191px] lg:hidden">
      {/* Background Image */}
      <Image
        src={MobMax}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        objectPosition="right" // Aligns the image to the right edge
        className="absolute inset-0"
      />

      {/* Overlay Image */}
      <div className="relative flex items-end justify-start h-full">
        <Image
          src={MaxFactOverlay}
          alt="Max Factor Banner"
          objectFit="contain"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
}



export default function MaxFact() {
  return (
    <>
      {/* Mobile */}
      <div className="flex w-full lg:hidden">
        <MaxFactorBanner />
      </div>

      <div className="hidden lg:flex flex-row w-full justify-center">
        <div className="flex items-end justify-center bg-gradient-to-b from-[rgba(177,98,120,0.20)] to-[rgba(255,0,0,0.20)] xl:h-[600px] 2xl:h-[693px] w-full">
          <Image src={max_cosmetics} alt="max cosmetics" objectFit="contain" />
        </div>

        {/* Right section */}
        <div className="flex flex-col justify-center items-center bg-[#FFEEF0] w-[35%] xl:h-[600px] 2xl:h-[693px] p-8">
          <Image
            width={358}
            height={50}
            alt="max logo"
            src={max_logo}
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

          <Button className="mt-10">Shop Now</Button>
        </div>
      </div>
    </>
  );
}
