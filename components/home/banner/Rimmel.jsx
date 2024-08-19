import React from "react";
import Image from "next/image";
import rimmle_banner from "/public/home_banners/olaplex_two.svg";
import rimmle_logo from "/public/home_banners/Max-Factor-Logo-two.svg";
import MobRimmel from "/public/home_banners/mob-rimmel.svg";

import { jost } from "../../ui/fonts";
import Button from "../../ui/button";
import Text from "../../ui/Text";

export default function Rimmel() {
  return (
    <>
      {/* Mobile */}
      <div className="flex w-full lg:hidden">
        <div className="relative w-full h-[191px] max-h-[300px]">
          {/* Background Image */}
          <Image
            src={MobRimmel}
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            objectPosition="right" // Aligns the image to the right edge
            className="absolute inset-0"
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
          <Button className="mt-10 uppercase w-max mx-auto ${jost.className}">
            Shop Now
          </Button>
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
