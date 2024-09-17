"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrowIcon from "/public/hero-banners/next-arrow";
import PrevArrowIcon from "/public/hero-banners/prev-arrow";

const arrowStyles = {
  width: "20px",
  height: "20px",
  zIndex: 1,
  transition: "all 0.3s ease-in-out",
};

const NextArrow = ({ className, style, onClick }) => (
  <div
    className={`absolute top-1/2 transform -translate-y-1/2 right-7 lg:right-9 ${className}`}
    onClick={onClick}
    style={{
      ...style,
      ...arrowStyles,
      right: "30px",
    }}
  >
    <NextArrowIcon />
  </div>
);

const PrevArrow = ({ className, style, onClick }) => (
  <div
    className={`absolute top-1/2 transform -translate-y-1/2  ${className}`}
    onClick={onClick}
    style={{
      ...style,
      ...arrowStyles,
      left: "-4px",
    }}
  >
    <PrevArrowIcon />
  </div>
);

export default function ProductSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_, next) => setCurrentIndex(next),
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          autoplay: true,
          autoplaySpeed: 2000,
          infinite: true,
          dots: true,
        },
      },
    ],
   
  
  };

  const handleThumbnailClick = (index) => {
    // console.log('Thumbnail clicked:', index);
    if (sliderRef.current) {
      // console.log('Slider ref exists');
      sliderRef.current.slickGoTo(index);
    } else {
      console.log('Slider ref is null');
    }
  };

  const DesktopView = ({ images, currentIndex, handleThumbnailClick, sliderRef, settings }) => (
    <article className="flex flex-row items-center justify-center w-full h-full">
      <section className="flex flex-col h-full w-1/5 justify-start items-center space-y-2 pr-4">
        {images.map((image, index) => (
          <button
            key={index}
            className={`p-1 border rounded-md ${
              index === currentIndex ? "border-bg-03" : "border-transparent"
            }`}
            onClick={() => handleThumbnailClick(index)}
          >
            <div className="relative w-16 h-16">
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </button>
        ))}
      </section>
  
      <section className="w-4/5 h-[400px] lg:h-[500px] mb-auto">
        <div className="relative w-full h-full">
          <Slider ref={sliderRef} {...settings}>
            {images.map((image, index) => (
              <div key={index} className="w-full h-full flex items-center justify-center">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </article>
  );
  const MobileView = ({ images, currentIndex, handleThumbnailClick, sliderRef, settings }) => (
    <section className="w-full max-w-[calc(100vw_-_2rem)] ">
      <Slider ref={sliderRef} {...settings}>
        {images.map((image, index) => (
          <div key={index} className="w-full  aspect-square">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </Slider>
      {/* <div className="flex justify-center items-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`h-1 ${
                index === currentIndex ? "w-4 bg-black" : "w-1 bg-gray-300"
              } rounded-full transition-all duration-300 ease-in-out`}
            ></button>
          ))}
        </div> */}
    </section>
  );

  return (
    <main className="w-full mx-auto  md:px-8 py-8 mb-1 md:mb-0">
      <div className="md:hidden">
        <MobileView
          images={images}
          currentIndex={currentIndex}
          handleThumbnailClick={handleThumbnailClick}
          sliderRef={sliderRef}
          settings={settings}
        />
      </div>
      <div className="hidden md:block">
        <DesktopView
          images={images}
          currentIndex={currentIndex}
          handleThumbnailClick={handleThumbnailClick}
          sliderRef={sliderRef}
          settings={settings}
        />
      </div>
    </main>
  );
}
