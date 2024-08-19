"use client";

import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import Link from 'next/link';

// Import your images
import brand1 from '../../../../public/brand_slider/brand_one.svg';
import brand3 from '../../../../public/brand_slider/brand_three.svg';
import brand4 from '../../../../public/brand_slider/brand_four.svg';
import brand5 from '../../../../public/brand_slider/brand_five.svg';
import brand2 from '../../../../public/brand_slider/Group.svg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function BrandSlide() {
  const settings = {
    dots: false, // Disables dots/pagination
    infinite: true, // Enables continuous loop mode
    speed: 500,
    slidesToShow: 5, // Shows 5 slides at a time
    slidesToScroll: 1, // Scrolls 1 slide at a time
    autoplay: true, // Autoplay feature
    autoplaySpeed: 3000, // Speed for autoplay
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // 3 slides for tablet screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // 2 slides for smaller screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1, // 1 slide for mobile screens
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="my-8">
      <Slider {...settings}>
        {/* Wrap each Image with Link to make it clickable */}
        <div className="px-4"> {/* Add horizontal padding between slides */}
          <Link href="/brand1-page"> {/* Update the href for routing */}
            <Image
              src={brand1}
              alt="Brand 1"
              className="h-12 w-auto hover:brightness-75 transition duration-300 cursor-pointer"
            />
          </Link>
        </div>
        <div className="px-4">
          <Link href="/brand2-page">
            <Image
              src={brand2}
              alt="Brand 2"
              className="h-12 w-auto hover:brightness-75 transition duration-300 cursor-pointer"
            />
          </Link>
        </div>
        <div className="px-4">
          <Link href="/brand3-page">
            <Image
              src={brand3}
              alt="Brand 3"
              className="h-12 w-auto hover:brightness-75 transition duration-300 cursor-pointer"
            />
          </Link>
        </div>
        <div className="px-4">
          <Link href="/brand4-page">
            <Image
              src={brand4}
              alt="Brand 4"
              className="h-12 w-auto hover:brightness-75 transition duration-300 cursor-pointer"
            />
          </Link>
        </div>
        <div className="px-4">
          <Link href="/brand5-page">
            <Image
              src={brand5}
              alt="Brand 5"
              className="h-12 w-auto hover:brightness-75 transition duration-300 cursor-pointer"
            />
          </Link>
        </div>
      </Slider>
    </div>
  );
}
