import Image from "next/image";
import Text from "./ui/Text";
import Button from "./ui/button";

export default function SliderBanner({ bannerObject, hero = false }) {
  const { title, description, src } = bannerObject;

  return (
    <div className="w-full flex h-full lg:max-h-[693px]">
      {/* Left side of slider */}
      <div className="w-[35%] flex flex-col bg-bg-01 justify-center items-center">
        <div className={`flex flex-col w-[60%] gap-10 ${hero ? "items-center text-center" : "items-start" }`}>
          <Text 
            style={"h1"} 
            className={`uppercase hero-title`}>
            {title}
          </Text>

          <Text style={"sm"} className="text-light capitalize">
            {description}
          </Text>
          <Button>Shop Now</Button>
        </div>
      </div>

      {/* Right side of slider */}
      <div className="w-[65%]">
        <Image
          src={src}
          width={1000}
          height={693}
          alt="Olaplex"
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
}
