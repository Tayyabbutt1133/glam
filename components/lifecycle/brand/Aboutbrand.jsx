import React from "react";
import brand_img from "../../../public/about_brands/brandabout.svg";
import Image from "next/image";
import { jost, lexendDeca } from "../../ui/fonts";
import Container from "../../container";

export default function Aboutbrand() {
  return (
    <Container>
      <main className="">
        <h1
          className={`text-[20px] xs:text-2xl mt-8 font-semibold uppercase 2xl:text-[36px] ${jost.className}`}
        >
          About Cosmetics
        </h1>
        <div className="flex flex-col md:flex-row gap-8 mt-6">
          <div className="w-full md:w-1/2">
            <Image
              src={brand_img}
              alt="Brand Image"
              layout="responsive"
              className="rounded-md"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-6 leading-relaxed">
            <p className={`${lexendDeca.className} text-sm`}>
              Achieve your perfect makeup look every time with the incredible
              range of products at GLAMBEAUTY. Featuring all your favourite
              iconic designer brands, you&apos;ll find high-quality{" "}
              <strong>eye makeup</strong>, lip makeup, complexion makeup, and
              the best accessories to suit every personality, look, and
              occasion. Whether you’re gearing up for a date night, bridal
              makeup for the big day, or simply your everyday essentials,
              explore our collection to find your go-to items.
              <br />
              <br />
              Discover <strong>foundations</strong> that work with your skin to
              tackle dryness, redness, and acne, along with{" "}
              <strong>concealers</strong> that match every skin type. Choose{" "}
              <strong>mascaras</strong> that lengthen, thicken, define, or
              enhance the health of your lashes. Opt for{" "}
              <strong>eyeshadows</strong> to add precision or create a
              smouldering smoky eye. Pick up lipsticks, liners, glosses, or
              stains to craft a natural look or achieve high drama – with such
              quality lip products, you&apos;ll enjoy a look that lasts all day.
              <br />
              <br />
              Our online shop offers all the shades, textures, and finishes to
              suit any skin tone and type. Dive in today to discover the best UK
              makeup brands alongside the most iconic lines from the
              world&apos;s top beauty names. Shop the range of cosmetics and
              makeup at GLAMBEAUTY today.
              <br />
              <br />
              Dive in today to discover the best UK makeup brands alongside the
              most iconic lines from the world&apos;s top beauty names. Shop the
              range of cosmetics and makeup at GLAMBEAUTY today.
            </p>
            <div>
            <button className={`w-36 ${jost.className} h-10 bg-black text-white rounded-lg uppercase hover:bg-[#CF8562]`}><a href="#">Shop now</a></button>
            </div>
          </div>
        </div>
      </main>
    </Container>
  );
}
