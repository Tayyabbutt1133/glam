"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import useMediaQuery from "../../../hooks/useMediaQuery";
import NextArrowIcon from "../../../public/hero-banners/next-arrow";
import PrevArrowIcon from "../../../public/hero-banners/prev-arrow";

import SliderBanner from "../../slider-banner";

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

export default function SliderComponent({bannerObject}) {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const settings = {
    autoplay: bannerObject.length > 1,
    dots: isMobile,
    dotsClass: "slick-dots slick-thumb",
    customPaging: function (i) {
      return <div className="dot"></div>;
    },
    infinite: bannerObject.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: !isMobile,
    swipe: isMobile,
    nextArrow: <NextArrow to="next" />,
    prevArrow: <PrevArrow to="prev" />,
  };

  return (
    <div className="hidden lg:block">
      <Slider {...settings}>
        {bannerObject.map((data, idx) => (
          <SliderBanner key={idx} bannerObject={data} />
        ))}
      </Slider>
    </div>
  );
}
