import Image from "next/image";

export default function Brand({ img, logo }) {
  return (
    <>
      <div className="flex flex-col w-full max-w-[390px] min-w-[155px] h-auto gap-5">
        {/* Image */}
        <Image src={img} alt={img} style={{width: "100%"}}/>
        {/* Logo */}
        <div className="flex justify-start items-start w-[80%] max-w-[193px] min-w-[104px]">
          <Image src={logo} alt={logo} className="flex items-start max-h-[30px] object-contain"/>
        </div>
      </div>
    </>
  );
}
