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
           <div className=" px-4 bottom-[5%] sm:bottom-[9%]  w-full sm:w-[90%]  items-start   left-1/2  transform  -translate-x-1/2 -translate-y-[15%] min-w-[82%] absolute  flex flex-col ">
            <div className="text-start text-white">
              <h1 className=" sm:text-2xl md:text-3xl  font-bold">
                ESTEE LAUDER
              </h1>
              <p className="mt-2 sm:text-lg ">
                Lorem ipsum dolor sit amet consectetur. Commodo ipsum viverra
                eget urna nunc duis....
                <span className="text-[#d8a071]"> Read More</span>
              </p>
            </div>

            <div
              className={`grid grid-cols-2 gap-2 mt-3 ${jost.className} font-medium lg:text-base 2xl:text-xl`}
            >
              <Link href={`/product-categories/${cats[0].skin.name}`}>
              <button className="bg-white  w-32 sm:w-36 md:w-40 sm:text-base  text-sm text-black py-2 px-2 xl:px-6 2xl:px-8 rounded">
                SHOP SKINCARE
              </button>
              </Link>
              <Link href={`/new-in`}>

              <button className="bg-white  w-32 sm:w-36 md:w-40 sm:text-base  text-sm text-black py-2 px-2 xl:px-6 2xl:px-8 rounded">
                SHOP NEW IN
                </button>
                </Link>
                <Link href={`/product-categories/${cats[0].make.name}`}>


              <button className="bg-white  w-32  sm:w-36 md:w-40 sm:text-base text-sm text-black py-2 px-2 xl:px-6 2xl:px-8 rounded">
                SHOP MAKEUP
                </button>
              </Link>
              <Link href={`/brands/${cats[0].brand.name}`}>

              <button className="bg-white  w-32  sm:w-36 md:w-40 sm:text-base text-sm text-black py-2 px-2 xl:px-6 2xl:px-8 rounded">
                SHOP BRAND
                </button>
        </Link>
            </div>
          </div>
        </div>
      </section>

















      <div className="hidden lg:flex w-full relative ">
        <div className="w-1/2 relative">
          {/* Content */}
          {/* <section className=" relative  absolute  "> */}
            <div className=" left-1/2 top-1/2 2xl:top-[55%] transform  -translate-x-1/2 -translate-y-[15%] 2xl:-translate-y-[0%] xl:-translate-y-[5%] min-w-[82%] absolute  flex flex-col  items-start ">
              <div className="text-start text-white">
                <h1 className="lg:text-xl xl:text-2xl 2xl:text-3xl font-bold">
                  ESTEE LAUDER
                </h1>
                <p className="mt-2 lg:text-sm xl:text-base 2xl:text-xl">
                  Lorem ipsum dolor sit amet consectetur. Commodo ipsum viverra
                  eget urna nunc duis. Hendrerit arcu mi nulla suspendisse ssed
                  pulvinar fames amet...
                  <span className="text-[#d8a071]"> Read More</span>
                </p>
              </div>
  
              <div
                className={`grid grid-cols-2 gap-4 mt-3 ${jost.className} font-medium lg:text-base 2xl:text-xl`}
              >
                <Link href={`/product-categories/${cats[0].skin.name}`}>
                <button className="bg-white 2xl:w-56 w-36 text-sm xl:text-base  xl:w-44 hover:bg-[#CF8562] hover:text-white text-black py-2 lg:px-4 xl:px-6 2xl:px-8 rounded">
                  SHOP SKINCARE
                  </button>
                </Link>
                <Link href={`/new-in`}>
                <button className="bg-white 2xl:w-56 w-36 text-sm xl:text-base  xl:w-44 hover:bg-[#CF8562] hover:text-white text-black py-2 lg:px-4 xl:px-6 2xl:px-8 rounded">
                  SHOP NEW IN
                  </button>
                </Link>
                <Link href={`/product-categories/${cats[0].make.name}`}>
                <button className="bg-white 2xl:w-56 w-36 text-sm xl:text-base  xl:w-44 hover:bg-[#CF8562] hover:text-white text-black py-2 lg:px-4 xl:px-6 2xl:px-8 rounded">
                  SHOP MAKEUP
                  </button>
                  </Link>
                <Link href={`/brands/${cats[0].brand.name}`}>
                <button className="bg-white 2xl:w-56 w-36 text-sm xl:text-base xl:w-44 hover:bg-[#CF8562] hover:text-white text-black py-2 lg:px-4 xl:px-6 2xl:px-8 rounded">
                  SHOP BRAND
                  </button>
                  </Link>
              </div>
            </div>
  
          {/* </section> */}
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
