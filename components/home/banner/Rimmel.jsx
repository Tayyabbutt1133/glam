import React from "react";
import Image from "next/image";
import rimmle_banner from "/public/home_banners/olaplex_two.svg";
import rimmle_logo from "/public/home_banners/Max-Factor-Logo-two.svg";


import { jost } from "../../ui/fonts";
import Button from "../../ui/button";
import Text from "../../ui/Text";
import Link from "next/link";

export default function Rimmel() {

  const rimmelBrandLanding = "rimmel";
  const rimmelBrandListing = "79";




  return (
    <>
      {/* Mobile */}
      {/* Mobile and md */}
      <div className="grid grid-cols-6 w-full lg:hidden h-[200px] md:h-[300px]">
        <div className="bg-[#EEDDD5] col-span-2 md:col-span-1 w-full p-4 md:p-6 flex flex-col justify-center items-center">
          <Image
            width={120}
            height={30}
            layout="fixed"
            src={rimmle_logo}
            alt="Rimmel Logo"
            className="mb-1 md:mb-2"
          />
          <div className="text-center space-y-0 md:space-y-1">
            <Text
              style={"h4"}
              className="uppercase font-bold text-xs md:text-2xl"
            >
              Up To
            </Text>
            <Text style={"h2"} className="text-2xl md:text-5xl">
              50%
            </Text>
            <Text
              style={"h4"}
              className="uppercase font-bold text-xs md:text-2xl"
            >
              Off
            </Text>
          </div>
          <Button
            className={`mt-1 md:mt-3 px-2 md:px-4 text-xs md:text-sm py-1 md:py-2 uppercase w-max ${jost.className}`}
          >
            Shop Now
          </Button>
        </div>

        {/* Banner Image */}
        <div className="w-full h-[200px] col-span-4 md:col-span-5 md:h-[300px] relative">
          <Image
            layout="fill"
            objectFit="cover"
            src={rimmle_banner}
            alt="Rimmel Banner"
          />
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-between bg-white">
        {/* Left Section */}
        <div className="bg-[#EEDDD5] lg:w-[30%] lg:h-[450px] xl:h-[600px] 2xl:h-[693px] p-8 flex flex-col justify-center items-center">
          <Image
            width={280}
            height={50}
            objectFit="contain"
            src={rimmle_logo}
            alt="Rimmel Logo"
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
          <Link href={`/brands/${rimmelBrandLanding}`}>
          <Button className={`mt-10 uppercase w-max mx-auto ${jost.className}`}>
            Shop Now
          </Button>
          </Link>
        </div>

        {/* Right Section with Banner */}
        <div className="flex-1">
          <Image
            className="object-cover w-full lg:h-[450px] xl:h-[600px] 2xl:h-[693px]"
            width={1000}
            height={450}
            src={rimmle_banner}
            alt="Rimmel Banner"
          />
        </div>
      </div>
    </>
  );
}
