"use client";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import mob_image_path from "/public/hero-banners/mob-banner.png";
import NextArrowIcon from "/public/hero-banners/next-arrow";
import PrevArrowIcon from "/public/hero-banners/prev-arrow";
import Banner1 from "/public/hero-banners/Section1.png";
import Banner2 from "/public/hero-banners/Banner2.png";

import mob_image_path from "/public/hero-banners/mob-banner.png";
import NextArrowIcon from "/public/hero-banners/next-arrow";
import PrevArrowIcon from "/public/hero-banners/prev-arrow";
import Banner1 from "/public/hero-banners/Section1.png";
import Banner2 from "/public/hero-banners/Banner2.png";

import useMediaQuery from "../../../hooks/useMediaQuery";

const images = [
  { src: Banner1 },
  { src: Banner1 },
  { src: Banner2 },
  { src: Banner2 },
const images = [
  { src: Banner1 },
  { src: Banner1 },
  { src: Banner2 },
  { src: Banner2 },
];

const mobImages = [
  { src: mob_image_path },
  { src: mob_image_path },
  { src: mob_image_path },
];

const NextArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={`arrow ${className}`}
      onClick={onClick}
      style={{ ...style, right: "80px" }}
    >
      <NextArrowIcon />
    </div>
  );
};

const PrevArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={`arrow ${className}`}
      onClick={onClick}
      style={{ ...style, left: "20px", zIndex: 1 }}
    >
      <PrevArrowIcon />
    </div>
  );
};

const Banner = ({ src }) => {
  return (
    <div className="flex max-w-screen-[1920px]">
      <Image
        src={src}
        style={{ width: "100%", height: "auto", objectFit: "contain" }}
        alt="banner"
      />
    <div className="flex max-w-screen-[1920px]">
      <Image
        src={src}
        style={{ width: "100%", height: "auto", objectFit: "contain" }}
        alt="banner"
      />
    </div>
  );
};

export default function Hero() {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const settings = {
    autoplay: true,
    dots: isMobile,
    dotsClass: slick-dots slick-thumb, // Apply custom dots styling
    customPaging: function (i) {
      return <div className="dot"></div>;
    },
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: !isMobile, // Show arrows only on non-mobile devices
    swipe: isMobile, // Enable swipe on mobile devices
    nextArrow: <NextArrow to="next" />,
    prevArrow: <PrevArrow to="prev" />,
    nextArrow: <NextArrow to="next" />,
    prevArrow: <PrevArrow to="prev" />,
  };

  return (
    <>
      {/* For mobile  */}
      <div className="mb-10 lg:hidden">
      <div className="mb-10 lg:hidden">
        <Slider {...settings}>
          {mobImages.map((img, idx) => (
            <Banner key={idx} src={img.src} />
          ))}
            <Banner key={idx} src={img.src} />
          ))}
        </Slider>
      </div>

      {/* For large screens */}
      <div className="hidden lg:block">
      <div className="hidden lg:block">
        <Slider {...settings}>
          {images.map((img, idx) => (
            <Banner key={idx} src={img.src} />
          ))}
          {images.map((img, idx) => (
            <Banner key={idx} src={img.src} />
          ))}
        </Slider>
      </div>
    </>
  );
}
