"use client";

import React, { useState } from "react";

import MobileHeader from "./MobileHeader";

import MobileSidebar2 from "./MObileSidebar2";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { jost } from "../../ui/fonts";

export default function MainLayoutMobile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const coupon = "BB20";
  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };
  return (
    <main className="flex flex-col  z-50 lg:[display:_none]">
      <MobileHeader onOpenSidebar={openSidebar} />
      <Slider {...settings}>
        <div>
          <p
            className={`text-center w-full p-2 text-sm ${jost.className} font-normal flex items-center gap-1 justify-center  bg-[#F7EBE0]`}
          >
            <span className="font-semibold">Free </span> Shipping £10+{" "}
            <span className="bg-black h-3 w-[1px] mx-2"></span>
            <span className="font-semibold">Next Day </span> Delivery £40+
          </p>
        </div>
        <div>
          <p
            className={`text-center w-full p-2 text-sm ${jost.className}  font-normal flex items-center justify-center  bg-black text-white`}
          >
            <span className="font-semibold ">
              {" "}
              Use coupon {coupon} for extra 20% off{" "}
            </span>
          </p>
        </div>
        <div>
          <p
            className={`text-center w-full p-2 text-sm ${jost.className}  font-normal flex items-center justify-center  bg-[#F7EBE0]`}
          >
            <span className="font-semibold">
              First time user get 10% off on orders above £20{" "}
            </span>
          </p>
        </div>
      </Slider>
      <MobileSidebar2 isOpen={isSidebarOpen} onClose={closeSidebar} />
    </main>
  );
}
