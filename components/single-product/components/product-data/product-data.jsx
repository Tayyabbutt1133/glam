import PurchaseOptions from "./components/options";
import ProductLogo from "./components/product-logo";
import ProductTitle from "./components/product-title";
import Rating from "./components/rating";
import PaymentOptions from "./components/payment-options";
import Price from "./components/price";
import QuantityBag from "./components/quantity-bag-button";
import Accordion from "./components/accordion";

export default function ProductData() {
  return (
    <div className="flex flex-col">
      <ProductLogo />
      <ProductTitle />
      <Rating />
      <Price />
      <PaymentOptions />
      <PurchaseOptions />
      <QuantityBag />
      <Accordion />
    </div>
  );
}
