"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrowIcon from "/public/hero-banners/next-arrow";
import PrevArrowIcon from "/public/hero-banners/prev-arrow";
import "./product-slider.css";

const NextArrow = ({ className, style, onClick }) => (
  <div
    className={` productarrowStyles ${className}`}
    onClick={onClick}
    style={{
      ...style,
      
      right: "-%",
    }}
  >
    <NextArrowIcon />
  </div>
);

const PrevArrow = ({ className, style, onClick }) => (

  <div
    className={`  productarrowStyles ${className}`}
    onClick={onClick}
    style={{
      ...style,
     
      left: "-19%",
    }}
  >
    <PrevArrowIcon />
  </div>
);

export default function ProductSlider({ images }) {
  // console.log({images});
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    arrows: true,
    // initialSlide: 0,
    // swipeToSlide: true,
    dots: false,
    // afterChange: (current) => {
    //   setCurrentIndex(current);
    //   // setCurrentIndex(current);
    // },
    infinite: true,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 1,
    // afterChange: (current) =>{
    //   console.log({current});
    //   console.log(currentIndex)
    //   // setCurrentIndex(current);
    // },
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    
    responsive: [
    {
      breakpoint: 1024,
      settings: {
        arrows: false,}
        
    }
      ,  {
        breakpoint: 768,
        settings: {
          arrows: false,
          autoplay: true,
          autoplaySpeed: 2000,
          infinite: true,
          dots: true,
          afterChange: ()=>{},
        },
      },
    ],
   
  
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    // console.log('Thumbnail clicked:', index);
    if (sliderRef.current) {
      // console.log('Slider ref exists');
      sliderRef.current.slickGoTo(index);
    } else {
      console.log('Slider ref is null');
    }
  };
  const Thumbnail = (({ image, index, currentIndex, onClick }) => (
    <div
      className={`p-1 border rounded-md cursor-pointer ${
        index === currentIndex ? "border-bg-03" : "border-transparent"
      }`}
      onClick={() => onClick(index)}
    >
      <div className="relative w-16 h-16">
        <Image
          src={image.src}
          alt={image.alt}
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  ));

  const DesktopView = ({ images, currentIndex, handleThumbnailClick, sliderRef, settings }) => (
    <article className="flex flex-row items-start justify-center w-full h-full">
      {images?.length > 0 && (
        <section className="flex flex-col h-full w-[18%] justify-start items-center space-y-2 pr-4">
           {images?.map((image, index) => (
          <Thumbnail
            key={index}
            image={image}
            index={index}
            currentIndex={currentIndex}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
        </section>
      )}
  
      <section className={`${images?.length > 1 ? 'w-4/5' : 'w-full'} h-[400px] lg:h-[500px] mb-auto`}>
        <div className="relative w-[80%] lg:w-[75%] mx-auto h-full">
          {images?.length > 1 ? (
            <Slider ref={sliderRef} {...settings}>
              {images?.map((image, index) => (
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
  const MobileView = ({ images, settings }) => (
    <section className="w-full max-w-[calc(100vw_-_2rem)]">
      {images?.length > 1 ? (
        <Slider {...settings}>
          {images?.map((image, index) => (
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
          // currentIndex={currentIndex}
          // handleThumbnailClick={handleThumbnailClick}
          // sliderRef={sliderRef}
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
