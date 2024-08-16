"use client";
import Image from "next/image";
// import Slider from "react-slick";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import mob_image_path from "../../../public/hero-banners/mob-banner.png"
import next_icon from "../../../public/hero-banners/next-arrows.svg"

import useMediaQuery from "../../../hooks/useMediaQuery";

const img = [
  { src: "/public/hero-banners/Section1.png" },
  { src: "/public/hero-banners/Banner2.png" },
];

const mobImages = [
  { src: mob_image_path },
  { src: mob_image_path },
  { src: mob_image_path },
];

const NextArrow = ({ className, style, onClick }) => (
  <div className={`arrow ${className}`} onClick={onClick}>
    {/* <Image
      src={next_icon}
      width={50}
      height={50}
      alt="Next"
      style={{ display: "block"}}
    /> */}
    <div style={{display: "block", }}>

    Next
    </div>
  </div>
);

const PrevArrow = ({ className, style, onClick }) => (
  <div className={className} onClick={onClick} >
    {/* <Image
      src="/public/hero-banners/prev-arrows.svg"
      width={50}
      height={50}
      alt="Previous"
    /> */}
    Previous
  </div>
);

const Banner = ({ src }) => {
  return (
    <div className="flex flex-row max-w-screen-lg">
      <Image src={src} width={500} height={500} alt="banner" />
    </div>
  );
};

export default function Hero() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const settings = {
    autoplay: true,
    dots: isMobile,
    dotsClass: `slick-dots slick-thumb`, // Apply custom dots styling
    customPaging: function (i) {
      return <div className="dot"></div>;
    },
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: !isMobile, // Show arrows only on non-mobile devices
    swipe: isMobile, // Enable swipe on mobile devices
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <>
      {/* For mobile  */}
      <div className="mb-10 xl:hidden">
 
        <Slider {...settings}>
          {mobImages.map((img, idx) => (
                <Banner key={idx} src={img.src} />
            ))}
        </Slider>

      </div>

      {/* For large screens */}
      <div className="hidden xl:block">
        <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        </Slider>
      </div>
    </>
  );
}
