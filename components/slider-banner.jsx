import Image from "next/image";
import Text from "./ui/Text";
import Button from "./ui/button";
import Link from "next/link";
import { jost } from "./ui/fonts";

export default function SliderBanner({ bannerObject, hero = false }) {
  const { title, description, src } = bannerObject;


  const olaplexbrand = "olaplex";

  return (
    <div className="w-full flex h-full max-h-[693px]">
      {/* Left side of slider */}
      <div className="w-[38%] flex flex-col bg-bg-01 justify-center items-center p-4 sm:p-6 lg:p-8">
        <div className={`flex flex-col w-full sm:w-[90%] lg:w-[80%] gap-3 sm:gap-4 lg:gap-6 ${hero ? "items-center text-center" : "items-start"}`}>
          <h1 
           
            className={`${jost.className} 2xl:text-[36px] xs:text-2xl text-[16px] font-medium`}>
            {title}
          </h1>

          <Text style={"sm"} className="text-light capitalize text-xs sm:text-sm lg:text-base">
            {description}
          </Text>
          <Link className="mt-6" href={`/brands/${olaplexbrand}`}>
            <Button className="">Shop Now</Button>
          </Link>
        </div>
      </div>

      {/* Right side of slider */}
      <div className="w-[62%] sm:w-[65%]">
        <Image
          src={src}
          width={1000}
          height={693}
          alt="Olaplex"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
}