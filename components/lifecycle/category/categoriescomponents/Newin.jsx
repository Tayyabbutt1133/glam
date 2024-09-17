import Container from "../../../container";
import Text from "../../../ui/Text";
import Image from "next/image";
import { jost, lexendDeca } from "../../../ui/fonts";

import bourjois from "/public/lifecycle/makeup picks/bourjois.png";
import clinique from "/public/lifecycle/makeup picks/clinique.png";
import bobbi_brown from "/public/lifecycle/makeup picks/bobbi brown.png";
import mac from "/public/lifecycle/makeup picks/mac.png";
import Link from "next/link";
// import Button from "../../../../ui/button";

const NewPicks = [
  {
    title: "Bourjois",
    description: "Bourjois 123 Perfect Liquid Foundation 30ml",
    image: bourjois,
  },
  {
    title: "Clinique",
    description: "Clinique Chubby Stick Moisturising Lip Colour Balm 3g",
    image: clinique,
  },
  {
    title: "Bobbi Brown",
    description: "Bobbi Brown Vitamin Enriched Eye Base 15ml",
    image: bobbi_brown,
  },
  {
    title: "MAC",
    description: "MAC Prep + Prime Fix+ Finishing Mist Lavender 100ml",
    image: mac,
  },
];

const SingleNewPick = ({ data }) => {
  const { title, description, image } = data;
  return (
    <div className="flex flex-col items-start gap-5 h-full">
      <div className="w-full flex items-center justify-center">
        <Image
          src={image}
          alt={title}
          width={390}
          height={390}
          className="w-[390px]"
        />
      </div>

      <div className="flex-grow flex flex-col gap-3 items-start justify-start">
        <Text style="h3" className="font-semibold">
          {title}
        </Text>
        <Text style="sm" className="line-clamp-3">
          {description}
        </Text>
      </div>

      <div className="mt-auto">
        <button
          className={`text-base font-medium uppercase text-white px-[15px] py-[13px] bg-button hover:bg-hover rounded-lg ${jost.className} `}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};



export default function Newin() {
  return (
    <Container className="space-y-10 mb-5 mt-6">
      <h1 className={`font-semibold uppercase text-2xl ${jost.className}`}>
        New In
      </h1>
      {/* makeup items */}
      <div className="flex overflow-x-auto pb-4 space-x-4 lg:grid lg:grid-cols-4 lg:gap-8 lg:space-x-0 scrollbar-hide">
        {NewPicks.map((product) => (
          <div
            key={product.id}
            
            className="cursor-pointer bg-transparent overflow-hidden transition-shadow duration-300 flex-shrink-0 w-[calc(45%-8px)] sm:w-[calc(33.333%-16px)] lg:w-full "
          >
            {/* Product Image */}
            <div className="relative sm:w-full h-[150px] sm:h-[200px] 2xl:h-[390px] w-[150px]">
              <Image
                className="rounded-md 2xl:rounded-lg brightness-75 sm:brightness-100"
                src={product.image}
                alt={product.title}
                layout="fill"
                objectFit="cover"
              />
              <h3
                className={` sm:hidden text-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold text-gray-50 ${jost.className}`}
              >
                {product.title}
              </h3>
            </div>

            {/* Product Info */}
            <div className="px-4 py-6 text-left ">
            <Link href={`/product/${product.id}`}>
              <h3
                className={`hidden sm:block text-lg font-semibold text-gray-900 ${jost.className}`}
              >
                {product.title}
              </h3>
              </Link>
              <Link href={`/product/${product.id}`}>
              <p
                className={`text-black text-xs sm:text-sm my-2 min-h-[50px] sm:min-h-[60px]  ${lexendDeca.className}`}
              >
                {product.description}
              </p>
              </Link>
              <button
                className={`sm:mt-4 bg-black text-white text-xs sm:text-sm py-2 sm:px-6 px-2 rounded-md hover:bg-gray-800 transition duration-200 ${jost.className}`}
              >
                SHOP NOW
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="grid grid-cols-4 justify-between gap-6">
        {NewPicks.map((makeupPick, index) => (
          <SingleNewPick key={index} data={makeupPick} />
        ))}
      </div> */}
    </Container>
  );
}
