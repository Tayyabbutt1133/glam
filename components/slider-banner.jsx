import Image from "next/image";
import Text from "./ui/Text";
import Button from "./ui/button";
import Link from "next/link";

export default function SliderBanner({ bannerObject, hero = false }) {
  const { title, description, src } = bannerObject;


  const olaplexbrand = "olaplex";

  return (
    <div className="w-full flex h-full max-h-[693px]">
      {/* Left side of slider */}
      <div className="w-[38%] flex flex-col bg-bg-01 justify-center items-center p-4 sm:p-6 lg:p-8">
        <div className={`flex flex-col w-full sm:w-[90%] lg:w-[80%] gap-3 sm:gap-4 lg:gap-6 ${hero ? "items-center text-center" : "items-start"}`}>
          <Text 
            style={"h1"} 
            className={`uppercase hero-title  text-lg sm:text-xl lg:text-3xl xl:text-4xl`}>
            {title}
          </Text>

          <Text style={"sm"} className="text-light capitalize text-xs sm:text-sm lg:text-base">
            {description}
          </Text>
          <Link  href={`/brands/${olaplexbrand}`}>
            <Button className="text-xs sm:text-sm lg:text-base px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2">Shop Now</Button>
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