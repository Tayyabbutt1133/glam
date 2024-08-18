import React from "react";
import Image from "next/image";
import rimmle_banner from "../public/home_banners/olaplex_two.svg";
import rimmle_logo from "../public/home_banners/Max-Factor-Logo-two.svg";
import { jost } from "./ui/fonts";


export default function Rimmel() {
  return (
    <>
      <div name="parent" className="flex items-center justify-between bg-white">
        {/* Left Section */}
        <div className="bg-[#EEDDD5] w-[400px] h-[450px] p-8 flex flex-col justify-center">
          <Image
            width={200}
            height={50}
            className="mx-auto mb-4"
            src={rimmle_logo}
            alt="Rimmel Logo"
          />
            <div className={`text-center space-y-2`}>
            <h1 className={`uppercase font-semibold text-3xl ${jost.className}`}>Up To</h1>
            <h1 className={`font-bold text-6xl ${jost.className}`}>50%</h1>
            <h1 className="uppercase font-semibold text-3xl">Off</h1>
          </div>
          <button className={`uppercase bg-black text-white w-full md:w-44 h-12 rounded-md mt-8 mx-auto block ${jost.className}`}>
            Shop Now
          </button>
        </div>

        {/* Right Section with Banner */}
        <div className="flex-1">
          <Image
            className="object-cover w-full h-[450px]"
            width={1000} // Adjusted width to fill the space
            height={450} // Ensured it matches the height of the left section
            src={rimmle_banner}
            alt="Rimmel Banner"
          />
        </div>
      </div>
    </>
  );
}
