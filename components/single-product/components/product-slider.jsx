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
      left: "-10px",
    }}
  >
    <PrevArrowIcon />
  </div>
);

export default function ProductSlider({ images }) {
  console.log({images});
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    arrows: true,
    initialSlide: 0,
    swipeToSlide: true,
    dots: false,
    infinite: true,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 1,
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
      {images.length > 0 && (
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
      )}
  
      <section className={`${images.length > 1 ? 'w-4/5' : 'w-full'} h-[400px] lg:h-[500px] mb-auto`}>
        <div className="relative w-full h-full">
          {images.length > 1 ? (
            <Slider ref={sliderRef} {...settings}>
              {images.map((image, index) => (
                <div key={index} className="w-full h-full flex items-center justify-center">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={images[0].src}
                alt={images[0].alt}
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>
      </section>
    </article>
  );
  const MobileView = ({ images, currentIndex, handleThumbnailClick, sliderRef, settings }) => (
    <section className="w-full max-w-[calc(100vw_-_2rem)]">
      {images.length > 1 ? (
        <Slider ref={sliderRef} {...settings}>
          {images.map((image, index) => (
            <div key={index} className="w-full aspect-square">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="w-full aspect-square">
          <img
            src={images[0].src}
            alt={images[0].alt}
            className="w-full h-full object-contain"
          />
        </div>
      )}
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
