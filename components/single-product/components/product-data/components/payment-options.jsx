import Image from "next/image";
import clearpay from "/public/product-payment/clearpay.png";
import klarna from "/public/product-payment/klarna.svg";
import laybuy from "/public/product-payment/laybuy.png";
import Text from "@/components/ui/Text";
import { IoIosInformationCircleOutline } from "react-icons/io";
const paymentOptions = [
  {
    title: "3 interest-free payments of £3.33 with ",
    img: klarna,
    alt: "klarna",
  },
  {
    title: "4 installments of £2.50 with ",
    img: laybuy,
    alt: "laybuy",
  },
  {
    title: "4 installments of £2.50 with ",
    img: clearpay,
    alt: "clearpay",
  },
];


export default function PaymentOptions() {
  return (
    <section className="flex flex-row flex-wrap gap-3 mb-10">
      {paymentOptions.map((option, index) => (
        <div key={index} className="flex items-center gap-2">
          <Image
            src={option.img}
            alt={option.alt}
            width={100}
            height={100}
            style={{ height: "20px", width: "auto" }}
          />
          <Text style={"sm"} className="text-light">
            {option.title}
          </Text>
          <IoIosInformationCircleOutline />
        </div>
      ))}
    </section>
  );
}
