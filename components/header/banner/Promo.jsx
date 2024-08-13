import React from "react";
import "./promo.css";
import Container from "../../container";

export default function Promo() {
  return (
    <>
      <div name="promo-parent" className="promo-parent bg-black">
        <Container>
          <div className="flex justify-between items-center px-28 h-12">
            <h1 className=" text-white text-[13px]">
              <span className=" font-bold">FREE UK </span>Delivery Over £10
            </h1>
            <div class="w-[1px] h-6 bg-[#F7F7F7A6]"></div>
            <h1 className=" text-white text-[13px]">
              {" "}
              <span className=" font-bold">UNBEATEN</span> on Price
            </h1>
            <div class="w-[1px] h-6 bg-[#F7F7F7A6]"></div>
            <h1 className=" text-white text-[13px]">
              <span className=" font-bold">KLARNA </span>available
            </h1>
            <div class="w-[1px] h-6 bg-[#F7F7F7A6]"></div>
            <h1 className=" text-white text-[13px]">
              {" "}
              <span className=" font-bold">SIGN UP </span>for Free Giveaways
            </h1>
          </div>
        </Container>
      </div>
    </>
  );
}
