import React from "react";
import Image from "next/image";
import ig_one from "../../public/home_banners/feeds/IG_animation_one.svg";
import ig_two from "../../public/home_banners/feeds/IG_animation_two.svg";
import ig_three from "../../public/home_banners/feeds/IG_animation_three.svg";
import ig_four from "../../public/home_banners/feeds/IG_animation_four.svg";
import ig_five from "../../public/home_banners/feeds/IG_animation_five.svg";
import ig_six from "../../public/home_banners/feeds/IG_animation_six.svg";
import ig_seven from "../../public/home_banners/feeds/IG_animation_seven.svg";
import Container from "../container";
// import Text from "../ui/Text";
import { jost } from "../ui/fonts";

export default function Instagram() {
  return (
    <div className="flex w-full mb-20 ">
      <Container>
        <div className="flex flex-col w-full mt-10 overflow-hidden">
          <h1
            className={`mb-10 text-2xl xl:text-3xl font-semibold ${jost.className}`}
          >
            SHOP OUR IG
          </h1>
          <div className="ig-container scrollbar-hide">
            <div className="angry-grid ">
              {/* Grid of 4 pics */}
              <div className="relative group" id="item-0">
                <p className="absolute top-5 px-4 z-40 text-sm flex items-center justify-center text-white opacity-0 lg:group-hover:opacity-100">Bank Holiday Essentials! Elemis Pro-collagen Rose Oil is just ... chefs kiss</p>
                <Image src={ig_one} alt="IG One" className="lg:group-hover:brightness-50" />
              </div>
              <div className="relative group" id="item-1">
                <p className="absolute top-5 px-4 z-40 text-sm flex items-center justify-center text-white opacity-0 lg:group-hover:opacity-100">Bank Holiday Essentials! Elemis Pro-collagen Rose Oil is just ... chefs kiss</p>
                <Image src={ig_three} alt="IG Three" className="lg:group-hover:brightness-50" />
              </div>
              <div className="relative group" id="item-2">
                <p className="absolute top-5 px-4 z-40 text-sm flex items-center justify-center text-white opacity-0 lg:group-hover:opacity-100">Bank Holiday Essentials! Elemis Pro-collagen Rose Oil is just ... chefs kiss</p>
                <Image src={ig_two} alt="IG Two" className="lg:group-hover:brightness-50" />
              </div>
              <div className="relative group" id="item-3">
                <p className="absolute top-5 px-4 z-40 text-sm flex items-center justify-center text-white opacity-0 lg:group-hover:opacity-100">Bank Holiday Essentials! Elemis Pro-collagen Rose Oil is just ... chefs kiss</p>
                <Image src={ig_four} alt="IG Four" className="lg:group-hover:brightness-50" />
              </div>

              {/* Bigger grid */}
              <div className="relative group h-full" id="item-4">
                <p className="absolute top-5 px-4 z-40 text-sm flex items-center justify-center text-white opacity-0 lg:group-hover:opacity-100 ">Bank Holiday Essentials! Elemis Pro-collagen Rose Oil is just ... chefs kiss</p>
                <Image src={ig_five} alt="IG Five" className="lg:group-hover:brightness-50 object-cover w-full h-full" />
              </div>

              {/* Grid of 2 */}
              <div className="relative group" id="item-5">
                <p className="absolute top-5 px-4 z-40 text-sm flex items-center justify-center text-white opacity-0 lg:group-hover:opacity-100">Bank Holiday Essentials! Elemis Pro-collagen Rose Oil is just ... chefs kiss</p>
                <Image src={ig_six} alt="IG Six" layout="fill" className="lg:group-hover:brightness-50" />
              </div>
              <div className="relative group" id="item-6">
                <p className="absolute top-5 px-4 z-40 text-sm flex items-center justify-center text-white opacity-0 lg:group-hover:opacity-100">Bank Holiday Essentials! Elemis Pro-collagen Rose Oil is just ... chefs kiss</p>
                <Image src={ig_seven} alt="IG Seven" className="lg:group-hover:brightness-50" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}