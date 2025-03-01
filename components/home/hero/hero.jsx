"use client";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderBanner from "../../slider-banner";
import banner_img from "../../../public/olaplex_new.png"

import mob_image_path from "/public/hero-banners/mob-banner.png";
import NextArrowIcon from "/public/hero-banners/next-arrow";
import PrevArrowIcon from "/public/hero-banners/prev-arrow";
// import Banner1 from "/public/hero-banners/Section1.png";
// import Banner2 from "/public/hero-banners/Banner2.png";

import useMediaQuery from "../../../hooks/useMediaQuery";



const bannerData = [
  {
    title: "Enjoy 33% off the entire OLAPLEX range!",
    description: "Free UK delivery on all orders over £10",
    src: banner_img,
  },
  {
    title: "Enjoy 33% off the entire OLAPLEX range!",
    description: "Free UK delivery on all orders over £10",
    src: banner_img,
  }
]


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
      style={{ ...style, right: "80px", display: "block" }}
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
      style={{ ...style, left: "20px", zIndex: 1, display: "block" }}
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
    </div>
  );
};

export default function Hero() {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const settings = {
    arrows: false,
    autoplay: true,
    dots: isMobile,
    dotsClass: "slick-dots slick-thumb", // Apply custom dots styling
    customPaging: function (i) {
      return <div className="dot"></div>;
    },
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
   
    swipe: isMobile, // Enable swipe on mobile devices
    nextArrow: <NextArrow to="next" />,
    prevArrow: <PrevArrow to="prev" />,
  };

  return (
    <>
      {/* For mobile  */}
      <div className="mb-10 lg:hidden">
        <Slider {...settings}>
          {mobImages.map((img, idx) => (
            <Banner key={idx} src={img.src} />
          ))}
        </Slider>
      </div>

      {/* For large screens */}
      <div className="hidden lg:block">
        <Slider {...settings} className="flex items-center">
          {bannerData.map((data, idx) => (
            <SliderBanner key={idx} bannerObject={data} hero={true} />
          ))}
        </Slider>
      </div>
    </>
  );
}