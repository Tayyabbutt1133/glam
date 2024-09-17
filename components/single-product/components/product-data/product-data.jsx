import PurchaseOptions from "./components/options";
import ProductLogo from "./components/product-logo";
import ProductTitle from "./components/product-title";
import Rating from "./components/rating";
import PaymentOptions from "./components/payment-options";
import Price from "./components/price";
import QuantityBag from "./components/quantity-bag-button";
import SkinToneSelector from "../ProductShadesColor";


export default function ProductData({product}) {
  const purchaseOptions = [
    {
      id: "subscribe",
      label: "Subscribe & Save 10%",
      price: (product.price - (product.price * 0.1)).toFixed(2),
    },
    {
      id: "one-time",
      label: "One-time purchase",
      price: product.price,
    },
  ];

  const productAttributes = product?.attributes;
  const brand = productAttributes?.find(attribute => attribute.name.toLowerCase() === 'brand'); //set brand name 
  const brandName = brand?.options[0];
 
  console.log(brandName);

  return (
    <div className="flex flex-col mt-4">
      <ProductLogo brand={brandName} />
      <ProductTitle title={product.name} />
      <Rating ratingCount={product.rating_count} averageRating={product.average_rating} />
      <Price price={product.price} regularPrice={product.regular_price} salePrice={product.sale_price} isOnsale={product.on_sale} />
      <PaymentOptions  />
      <SkinToneSelector  product={product} />
      <PurchaseOptions options={purchaseOptions} />
      <QuantityBag product={product} />
    </div>
  );
}
