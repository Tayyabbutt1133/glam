import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Categoryslider = ({ bannerData }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };



  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="slider-item">
          <div className="slider-content">
            <div className="text-section">
              <h2>{title}</h2>
              <p>{description}</p>
              <button className="shop-now-btn">{buttonText}</button>
            </div>
            <div className="image-section">
              {image && <img src={image} alt={title} />}
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Categoryslider;
