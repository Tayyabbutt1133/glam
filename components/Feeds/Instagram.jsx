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
import Text from "../ui/Text";

export default function Instagram() {
  return (
    <Container>
      <div className="flex flex-col w-full mt-10 overflow-hidden">
        <Text style={"h1"} className="mb-10">
          SHOP OUR IG
        </Text>
        <div className="angry-grid">
          {/* Grid of 4 pics */}
          <Image src={ig_one} alt="IG One" id="item-0" />
          <Image src={ig_three} alt="IG Three" id="item-1" />
          <Image src={ig_two} alt="IG Two" id="item-2" />
          <Image src={ig_four} alt="IG Four" id="item-3" />

          {/* Bigger grid */}
          <Image src={ig_five} alt="IG Five" id="item-4" />

          {/* Grid of 2 */}
          <Image src={ig_six} alt="IG Six" id="item-5" />
          <Image src={ig_seven} alt="IG Seven" id="item-6" />
        </div>
      </div>
    </Container>
  );
}
