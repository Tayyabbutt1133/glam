import Image from "next/image";
import Text from "./ui/Text";
import Button from "./ui/button";

export default function SliderBanner({ bannerObject }) {
  const { title, description, src } = bannerObject;

  return (
    <div className="lg:max-h-[693px] w-full flex h-full">
      {/* Left side of slider */}
      <div className="w-[35%] p-24 flex flex-col gap-10 justify-center items-start bg-bg-01">
        <Text style={"h1"}>{title}</Text>
        <Text style={"sm"} className="text-light">
          {description}
        </Text>
        <Button>Shop Now</Button>
      </div>

      {/* Right side of slider */}
      <div className="w-[65%]">
        <Image src={src} width={1000} height={693} alt="Olaplex" style={{width: "100%"}}/>
      </div>
    </div>
  );
}
