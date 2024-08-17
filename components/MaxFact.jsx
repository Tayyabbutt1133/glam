"use client";
import React from "react";
import Image from "next/image";
import max_cosmetics from "../public/home_banners/olaplex_one.svg";
import max_logo from "../public/home_banners/Max-Factor-Logo.svg";
import Link from "next/link";

export default function MaxFact() {
  return (
    <>
      <div name="parent" className=" flex">
        <div className="bg-gradient-to-b from-[rgba(177,98,120,0.20)] to-[rgba(255,0,0,0.20)] h-[450px] w-[70%]">
          <Image
            className=" mx-auto"
            width={700}
            height={600}
            src={max_cosmetics}
          />
        </div>
        <div className="bg-[#FFEEF0] w-[400px] p-8">
          <Image
            width={250}
            height={50}
            className="mx-auto"
            src={max_logo}
          />
          <div className="text-center space-y-2">
            <h1 className="uppercase font-medium text-3xl">Up To</h1>
            <h1 className="font-bold text-5xl">50%</h1>
            <h1 className="uppercase font-medium text-3xl">Off</h1>
          </div>

          <button className="uppercase bg-black text-white w-44 h-12 rounded-md mt-10 mx-auto block">
            Shop Now
          </button>
        </div>
      </div>
    </>
  );
}
