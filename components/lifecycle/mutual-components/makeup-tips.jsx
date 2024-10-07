"use client"

import React from "react";
import Image from "next/image";
import Container from "../../container";
import Text from "../../ui/Text";
import { jost } from "../../ui/fonts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import tip1 from "/public/lifecycle/makeup tips/tip1.png";
import tip2 from "/public/lifecycle/makeup tips/tip2.png";
import tip3 from "/public/lifecycle/makeup tips/tip3.png";
import tip4 from "/public/lifecycle/makeup tips/tip4.png";
import tip5 from "/public/lifecycle/makeup tips/tip5.png";

const tips = [
  {
    title: "Learn the minimalist eye make up look",
    image: tip1,
  },
  {
    title: "How to do no makeup look at home?",
    image: tip2,
  },
  {
    title: "Learn how to clean your makeup brushes",
    image: tip3,
  },
  {
    title: "Buy foundation according to your complexion",
    image: tip4,
  },
  {
    title: "Great eyebrows? 3 step method to do it",
    image: tip5,
  },
];

const Tips = ({ data }) => {
  return (
    <div className="relative hover:scale-110 transition-transform duration-300 cursor-pointer">
      <div className="relative w-full h-full">
        <Image
          src={data.image}
          alt={data.title}
          layout="responsive"
          width={300}
          height={400}
          className="object-cover rounded-lg xs:w-[152px] xs:h-[200px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
      </div>

      <Text style={"sm"} className="absolute bottom-4 px-3 text-white">
        {data.title}
      </Text>
    </div>
  );
};

export default function MakeupTips() {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <Container className="my-3 lg:my-9">
      <h1 className={`uppercase mb-3 ${jost.className} font-semibold  2xl:text-[36px] xs:text-2xl text-[20px]`}>
        makeup tips for you
      </h1>
      <div className="lg:hidden">
        <Slider {...sliderSettings}>
          {tips.map((tip, index) => (
            <div key={index} className="pr-4">
              <Tips data={tip} />
            </div>
          ))}
        </Slider>
      </div>
      <div className="hidden lg:block">
        <div className="grid grid-cols-5 gap-4 2xl:gap-8 mt-8">
          {tips.map((tip, index) => (
            <Tips key={index} data={tip} />
          ))}
        </div>
      </div>
    </Container>
  );
}