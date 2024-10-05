"use client"
import Image from "next/image";
import clearpay from "/public/product-payment/clearpay.png";
import klarna from "/public/product-payment/klarna.svg";
import laybuy from "/public/product-payment/LayBuy.png";
import paypal from '../../../../../public/PayPal.svg'
// import Text from "/components/ui/Text";
import { lexendDeca } from "../../../../ui/fonts";
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
    img: paypal,
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
    <section className="flex flex-wrap gap-4">
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
            <p className={`text-black font-medium ${lexendDeca.className}`}>
              {option.title}{currencySymbol}{convertedAmount} with 
            </p>
            <IoIosInformationCircleOutline />
          </div>
        );
      })}
    </section>
  );
}
