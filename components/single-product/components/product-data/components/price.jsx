"use client"
import { lexendDeca } from "/components/ui/fonts";
import Text from "/components/ui/Text";
import { usePopupStore } from "/states/use-popup-store";



export default function Price({price, regularPrice, salePrice,isOnsale}) {
  //`Get the rates from the popup store
  const { rate,currencySymbol,loading,error,selectedCountry } = usePopupStore();
  console.log(rate,currencySymbol,loading,error,selectedCountry)
  const displayPrice = isOnsale ? salePrice : price;
  const savings = isOnsale ? regularPrice - salePrice : 0;



  return (
    <section className="flex flex-col gap-2 mb-5">
      <div className={`flex items-center gap-4`}>
      <Text style={"large"} className="text-2xl text-sale">
      {currencySymbol}{(displayPrice * rate).toFixed(2)}
        </Text>
        <p className={`${lexendDeca.className} font-normal underline`}>Free delivery on orders over £10</p>
        </div>
      <div className="flex items-center space-x-4">
        <Text style={"sm"} className="text-light line-through text-xl">
          {currencySymbol}{(regularPrice * rate).toFixed(2) || (price * rate).toFixed(2)}
        </Text>
        <span
          className={`${lexendDeca.className} text-black font-medium text-base rounded-lg bg-bg-01 px-2 py-1`}
        >
          SAVE {currencySymbol}{(savings * rate).toFixed(2)}
        </span>
      </div>
    </section>
  );
}
