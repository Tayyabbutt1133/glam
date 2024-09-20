import Image from "next/image";
import { jost } from "../../../ui/fonts";
import Text from "../../../ui/Text";

import leftImage from "/public/lifecycle/brand in focus/left.png";
import rightImage from "/public/lifecycle/brand in focus/right.png";
import Container from "../../../container";
import Link from "next/link";

export default function BrandInFocus() {

  const cats = [{
    skin: {
      name: "skincare"
    },
    make: {
      name: "makeup"
    },
    brand: {
      name: "4711"
    }
  }];

  return (
    <div className="flex flex-col gap-5 mb-10">
      <Container>
        <Text style={"h1"}>Brand In Focus</Text>
      </Container>

      <section className="lg:hidden">
        <div className="w-full relative">
          {/* Image2 */}
          <Image
            src={rightImage}
            alt="right image"
            className="  brightness-75 w-full object-contain"
            width={1000}
            height={1000}
          />
           <div className=" px-4 absolute bottom-[2%] flex flex-col w-full  items-start ">
            <div className="text-start text-white">
              <h1 className="lg:text-xl xl:text-2xl 2xl:text-3xl font-bold">
                ESTEE LAUDER
              </h1>
              <p className="mt-2 lg:text-sm xl:text-base 2xl:text-xl">
                Lorem ipsum dolor sit amet consectetur. Commodo ipsum viverra
                eget urna nunc duis....
                <span className="text-[#d8a071]"> Read More</span>
              </p>
            </div>

            <div
              className={`grid grid-cols-2 gap-4 mt-8 ${jost.className} font-medium lg:text-base 2xl:text-xl`}
            >
              <button className="bg-white text-black py-2 px-2 xl:px-6 2xl:px-8 rounded">
                SHOP SKINCARE
              </button>

              <button className="bg-white text-black py-2 px-2 xl:px-6 2xl:px-8 rounded">
                SHOP NEW IN
                </button>
              <button className="bg-white text-black py-2 px-2 xl:px-6 2xl:px-8 rounded">
                SHOP MAKEUP
                </button>
              <button className="bg-white text-black py-2 px-2 xl:px-6 2xl:px-8 rounded">
                SHOP BRAND
                </button>
            </div>
          </div>
        </div>
      </section>

















      <div className="hidden lg:flex w-full relative ">
        <div className="w-1/2 relative">
          {/* Content */}
          <div className="ml-20 absolute bottom-[10%] flex flex-col max-w-[70%] items-start ">
            <div className="text-start text-white">
              <h1 className="lg:text-xl xl:text-2xl 2xl:text-3xl font-bold">
                ESTEE LAUDER
              </h1>
              <p className="mt-2 lg:text-sm xl:text-base 2xl:text-xl">
                Lorem ipsum dolor sit amet consectetur. Commodo ipsum viverra
                eget urna nunc duis. Hendrerit arcu mi nulla suspendisse ssed
                pulvinar fames amet. Nisl eleifend solis sed id pellentesque
                vitae facilisis arcu...
                <span className="text-[#d8a071]"> Read More</span>
              </p>
            </div>

            <div
              className={`grid grid-cols-2 gap-4 mt-8 ${jost.className} font-medium lg:text-base 2xl:text-xl`}
            >
              <Link href={`/product-categories/${cats[0].skin.name}`}>
              <button className="bg-white text-black py-2 lg:px-4 xl:px-6 2xl:px-8 rounded">
                SHOP SKINCARE
                </button>
              </Link>
              <Link href={`/new-in`}>
              <button className="bg-white text-black py-2 lg:px-4 xl:px-6 2xl:px-8 rounded">
                SHOP NEW IN
                </button>
              </Link>
              <Link href={`/product-categories/${cats[0].make.name}`}>
              <button className="bg-white text-black py-2 lg:px-4 xl:px-6 2xl:px-8 rounded">
                SHOP MAKEUP
                </button>
                </Link>
              <Link href={`/brands/${cats[0].brand.name}`}>
              <button className="bg-white text-black py-2 lg:px-4 xl:px-6 2xl:px-8 rounded">
                SHOP BRAND
                </button>
                </Link>
            </div>
          </div>

          {/* Image1 with Overlay */}
          <div className="relative w-full h-full -z-30">
            <Image
              src={leftImage}
              alt="left image"
              className="w-full object-contain"
              width={1000}
              height={1000}
            />
            <div className="absolute inset-0 bg-black opacity-30"></div>
          </div>
        </div>
        <div className="w-1/2">
          {/* Image2 */}
          <Image
            src={rightImage}
            alt="right image"
            className="w-full object-contain"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </div>
  );
}
