"use client"
import Image from "next/image";
import clearpay from "/public/product-payment/clearpay.png";
import klarna from "/public/product-payment/klarna.svg";
import laybuy from "/public/product-payment/LayBuy.png";
import Text from "/components/ui/Text";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { usePopupStore } from "/states/use-popup-store"
const paymentOptions = [
  {
    title: "3 interest-free payments of ",
    amount: 3.33,
    img: klarna,
    alt: "klarna",
  },
  {
    title: "4 installments of ",
    amount: 2.50,
    img: laybuy,
    alt: "laybuy",
  },
  {
    title: "4 installments of ",
    amount: 2.50,
    img: clearpay,
    alt: "clearpay",
  },
];

export default function PaymentOptions() {
  const { currencySymbol, rate } = usePopupStore();
  return (
    <section className="flex flex-row flex-wrap gap-3 mb-10">
      {paymentOptions.map((option, index) => {
        const convertedAmount = (option.amount * rate).toFixed(2);
        return (
          <div key={index} className="flex items-center gap-2">
            <Image
              src={option.img}
              alt={option.alt}
              width={100}
              height={100}
              style={{ height: "20px", width: "auto" }}
            />
            <Text style={"sm"} className="text-light">
              {option.title}{currencySymbol}{convertedAmount} with 
            </Text>
            <IoIosInformationCircleOutline />
          </div>
        );
      })}
    </section>
  );
}
