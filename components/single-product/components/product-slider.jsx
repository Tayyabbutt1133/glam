/**
 * v0 by Vercel.
 * @see https://v0.dev/t/P4qhGqxlUjv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState } from "react";
import Image from "next/image";
import NextArrowIcon from "public/hero-banners/next-arrow";
import PrevArrowIcon from "public/hero-banners/prev-arrow";

import img1 from "/public/product-slider/img1.png";

const images = [
  { src: img1, alt: "Image 1" },
  { src: img1, alt: "Image 2" },
  { src: img1, alt: "Image 3" },
  { src: img1, alt: "Image 4" },
  { src: img1, alt: "Image 5" },
];
export default function ProductSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };
  return (
    <main className="flex items-center justify-center w-full h-[45dvh] max-h-[670px]">
      <content className="flex items-center justify-center w-full h-full">
        <section className="flex flex-col h-full w-1/5 justify-start items-center space-y-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`p-1 border rounded-md ${index === currentIndex ? "border-bg-03" : "border-transparent"}`}
              onClick={() => setCurrentIndex(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                className="object-cover w-16 h-16"
              />
            </button>
          ))}
        </section>
        <section className="relative flex items-center justify-center w-4/5 h-[500px]">
          <button onClick={handlePrevClick} className="absolute left-0">
            <PrevArrowIcon />
          </button>
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="object-contain h-full"
          />
          <button onClick={handleNextClick} className="absolute right-0">
            <NextArrowIcon />
          </button>
        </section>
      </content>
    </main>
  );
}
