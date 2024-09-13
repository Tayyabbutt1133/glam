import Image from "next/image";

import FrequentlyBoughtTogether from "./components/frequently-bought";
import ProductData from "./components/product-data/product-data";
import ProductSlider from "./components/product-slider";

import demo1 from "/public/product-slider/demo1.png";
import demo2 from "/public/product-slider/demo2.png";
import Staffpicks from "./components/staffpicks";

const demo = [
  { src: demo1, alt: "Image 1" },
  { src: demo2, alt: "Image 2" },
];

export default function SingleProductData() {
  return (
    <>
      <div className="w-full flex flex-row justify-between gap-[3%]">
        <section className="flex flex-col justify-between lg:w-[50%] h-auto gap-5">
          <ProductSlider />
          <div className="flex flex-row justify-center gap-2">
            {demo.map((image, index) => (
              <Image
                key={index}
                src={image.src}
                alt={image.alt}
                className="object-contain w-full max-w-[390px] max-h-[766px]"
              />
            ))}
          </div>
        </section>
        <section className="lg:w-[50%]">
          <ProductData />
          <FrequentlyBoughtTogether />
        </section>
      </div>
      <Staffpicks />
    </>
  );
}
