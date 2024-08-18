"use client";
import React from "react";
import Image from "next/image";
import max_cosmetics from "/public/home_banners/olaplex_one.svg";
import max_logo from "/public/home_banners/Max-Factor-Logo.svg";
import Link from "next/link";
import Text from "../../ui/Text";
import Button from "../../ui/button";

export default function MaxFact() {
  return (
    <>
      <div className="flex flex-row w-full justify-center">
        <div className="flex items-end justify-center bg-gradient-to-b from-[rgba(177,98,120,0.20)] to-[rgba(255,0,0,0.20)] h-[693px] w-full">
          <Image
            width={1000}
            height={671}
            src={max_cosmetics}
            alt="max cosmetics"
            objectFit="contain"
          />
        </div>

        <div className="flex flex-col justify-center items-center bg-[#FFEEF0] max-w-[655px] w-full h-[693px] p-8">
          <Image
            width={358}
            height={50}
            alt="max logo"
            src={max_logo}
            className="-mt-20"
          />
          <div className="text-center space-y-2">
            <Text style={"h1"} className="uppercase font-medium text-5xl">Up To</Text>
            <Text style={"h1"} className="text-8xl">50%</Text>
            <Text style={"h1"} className="uppercase font-medium text-5xl">Off</Text>
          </div>

          <Button 
            className="mt-10"
          >
            Shop Now
          </Button>
        </div>
      </div>
    </>
  );
}
