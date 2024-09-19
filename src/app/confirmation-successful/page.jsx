"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "../../../states/Cardstore";
import { jost, lexendDeca } from "../../../components/ui/fonts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "../../../components/container";
import cart from "../../../public/CartSuccess.svg";
import visa from "../../../public/card-logos/visa.svg";
import master from "../../../public/card-logos/master.svg";
import maestro from "../../../public/card-logos/maestro.svg";
import ae from "../../../public/card-logos/american-express.svg";
import paypal from "../../../public/PayPal.svg";
import kl from "../../../public/Klarna.svg";
import { ClipboardCheckIcon, ClipboardIcon } from "lucide-react";

import { usePopupStore } from "/states/use-popup-store";

const API_URL = "https://glam.clickable.site/wp-json/wc/v3/products";
const CK = "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d";
const CS = "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc";

export default function OrderConfirmation() {
  const { clearCart, getOrderDetails, addToCart } = useCartStore();
  const [orderNumber, setOrderNumber] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { rate,currencySymbol } = usePopupStore();

  useEffect(() => {
    setOrderNumber(Math.floor(100000 + Math.random() * 900000).toString());
    setOrderDate(
      new Date().toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    );
    const details = getOrderDetails();
    setOrderDetails(details);
    clearCart();

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${API_URL}?consumer_key=${CK}&consumer_secret=${CS}`
        );
        const data = await response.json();
        const filteredProducts = data.filter(
          (product) =>
            product.images[0]?.src &&
            product.price &&
            getBrand(product) !== "Unknown Brand" &&
            product.name
        );
        setProducts(filteredProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [clearCart, getOrderDetails]);

  const getPaymentMethodLogo = (paymentMethod, cardType) => {
    switch (paymentMethod) {
      case "card":
        switch (cardType) {
          case "visa":
            return visa;
          case "mastercard":
            return master;
          case "maestro":
            return maestro;
          case "american-express":
            return ae;
          default:
            return null;
        }
      case "paypal":
        return paypal;
      case "klarna":
        return kl;
      default:
        return null;
    }
  };

  const ProductSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="relative pb-[100%] bg-gray-300"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
        <div className="h-10 bg-gray-300 rounded"></div>
      </div>
    </div>
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const getBrand = (product) => {
    return (
      product.attributes.find((attr) => attr.name === "Brand")?.options[0] ||
      "Unknown Brand"
    );
  };
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(orderNumber).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  if (!orderDetails) {
    return null;
  }

  return (
    <Container>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Image src={cart} alt="Order Success" width={140} height={140} />
          </div>
          <h1 className={`text-3xl font-semibold mb-2 ${jost.className}`}>
            Thank You, Order Submitted Successfully!
          </h1>
          <p className={`text-gray-600 ${lexendDeca.className}`}>
            Your order has been submitted. Track its status in the{" "}
            <Link href="/my-orders" className="text-blue-600 hover:underline">
              MY ORDERS
            </Link>{" "}
            section of your profile.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className=" p-4 sm:p-6">
            <div className="mb-6">
              <div className="justify-between flex items-center">
                <div className="flex flex-col items-center">
                  <p className={`text-lg font-semibold ${jost.className} mr-2`}>
                    Order Number:
                  </p>
                  <button
                    onClick={copyToClipboard}
                    className="text-gray-900 flex items-center gap-2 bg-slate-50 p-2 transition-colors"
                    aria-label="Copy order number"
                  >
                    #{orderNumber}
                    {copied ? (
                      <ClipboardCheckIcon className="h-5 w-5 text-green-500" />
                    ) : (
                      <ClipboardIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className={`text-sm text-gray-600 ${lexendDeca.className}`}>
                  Date: {orderDate}
                </p>
              </div>
            </div>

            {/* <div className="flex items-center justify-between w-full max-w-3xl mx-auto my-8">
              <div className="relative flex items-center justify-between w-full">
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gray-300 -z-10"></div>
                
                <div className="flex flex-col items-center">
                  <div className={`w-32 h-8 bg-[#FDF3E7] rounded-full flex items-center justify-center ${jost.className}`}>
                    <span className="text-xs font-medium text-[#B86E14]">Ordered</span>
                  </div>
                </div>

                <div className="w-24 h-[1px] bg-gray-300"></div>

                <div className="flex flex-col items-center">
                  <div className={`w-32 h-8 bg-gray-100 rounded-full flex items-center justify-center ${jost.className}`}>
                    <span className="text-xs font-medium text-gray-500">Processing</span>
                  </div>
                </div>

                <div className="w-24 h-[1px] bg-gray-300"></div>

                <div className="flex flex-col items-center">
                  <div className={`w-32 h-8 bg-gray-100 rounded-full flex items-center justify-center ${jost.className}`}>
                    <span className="text-xs font-medium text-gray-500">Shipped</span>
                  </div>
                </div>

                <div className="w-24 h-[1px] bg-gray-300"></div>

                <div className="flex flex-col items-center">
                  <div className={`w-32 h-8 bg-gray-100 rounded-full flex items-center justify-center ${jost.className}`}>
                    <span className="text-xs font-medium text-gray-500">Delivered</span>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="flex items-center justify-between w-full max-w-3xl sm:mx-auto my-8">
              <div className="relative flex items-center justify-between w-full">
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gray-300 -z-10"></div>

                <div className="flex flex-col items-center">
                  <div
                    className={`w-14 sm:w-28 h-7 sm:h-8 bg-[#FDF3E7] rounded-full flex items-center justify-center ${jost.className}`}
                  >
                    <span className="text-[10px] sm:text-xs font-medium text-[#B86E14]">
                      Ordered
                    </span>
                  </div>
                </div>

                <div className="w-4 sm:w-8 h-[1px] bg-gray-300"></div>

                <div className="flex flex-col items-center">
                  <div
                    className={`w-14 sm:w-28 h-7 sm:h-8 bg-gray-100 rounded-full flex items-center justify-center ${jost.className}`}
                  >
                    <span className="text-[10px] sm:text-xs font-medium text-gray-500">
                      Processing
                    </span>
                  </div>
                </div>

                <div className="w-4 sm:w-8 h-[1px] bg-gray-300"></div>

                <div className="flex flex-col items-center">
                  <div
                    className={`w-14 sm:w-28 h-7 sm:h-8 bg-gray-100 rounded-full flex items-center justify-center ${jost.className}`}
                  >
                    <span className="text-[10px] sm:text-xs font-medium text-gray-500">
                      Shipped
                    </span>
                  </div>
                </div>

                <div className="w-4 sm:w-8 h-[1px] bg-gray-300"></div>

                <div className="flex flex-col items-center">
                  <div
                    className={`w-14 sm:w-28 h-7 sm:h-8 bg-gray-100 rounded-full flex items-center justify-center ${jost.className}`}
                  >
                    <span className="text-[10px] sm:text-xs font-medium text-gray-500">
                      Delivered
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className={`font-semibold mb-2 ${jost.className}`}>
                  Delivery Address
                </h3>
                <p className={`text-sm ${lexendDeca.className}`}>
                  {orderDetails.customerInfo.firstName}{" "}
                  {orderDetails.customerInfo.lastName}
                  <br />
                  {orderDetails.customerInfo.address}
                  <br />
                  {orderDetails.customerInfo.city},{" "}
                  {orderDetails.customerInfo.postcode}
                  <br />
                  {orderDetails.customerInfo.country}
                  {orderDetails.customerInfo.phone}
                </p>
              </div>
              <div>
                <h3 className={`font-semibold mb-2 ${jost.className}`}>
                  Payment Method
                </h3>
                <div
                  className={`text-sm ${lexendDeca.className} flex items-center`}
                >
                  {orderDetails.paymentMethod && (
                    <>
                      <Image
                        src={getPaymentMethodLogo(
                          orderDetails.paymentMethod,
                          orderDetails.cardType
                        )}
                        alt={orderDetails.paymentMethod}
                        width={50}
                        height={50}
                        className="mr-2"
                      />
                      <span>
                        {orderDetails.paymentMethod === "card"
                          ? `${
                              orderDetails.cardType.charAt(0).toUpperCase() +
                              orderDetails.cardType.slice(1)
                            } ending in ${orderDetails.cardLastFour}`
                          : orderDetails.paymentMethod.charAt(0).toUpperCase() +
                            orderDetails.paymentMethod.slice(1)}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div>
                <h3 className={`font-semibold mb-2 ${jost.className}`}>
                  Order Summary
                </h3>
                <p className={`text-sm ${lexendDeca.className}`}>
                  Items ({orderDetails.cartItems.length}): {currencySymbol}{(orderDetails.subtotal * rate).toFixed(2)}
                  <br />
                  Shipping: {currencySymbol}{(orderDetails.shipping * rate).toFixed(2)}
                  <br />
                  <span className="font-semibold">
                    Total Order Value: {currencySymbol}{(orderDetails.total * rate).toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6 bg-white shadow-md rounded-lg">
          <h3 className={`font-semibold mb-4 ${jost.className}`}>
            Order Details
          </h3>
          {orderDetails.cartItems.map((item, index) => (
            <div key={index} className="flex items-center mb-4 last:mb-0">
              <Image
                src={
                  item.images && item.images[0] && item.images[0].src
                    ? item.images[0].src
                    : "/placeholder.svg?height=80&width=80"
                }
                alt={item.name}
                width={80}
                height={80}
                className="rounded-md object-cover mr-4"
              />
              <div>
                <h4 className={`font-medium ${jost.className}`}>{item.name}</h4>
                <p className={`text-sm text-gray-600 ${lexendDeca.className}`}>
                  Qty: {item.quantity} | {currencySymbol}{parseFloat(item.price * rate).toFixed(2)}{" "}
                  each
                </p>
                <p className={`text-sm ${lexendDeca.className}`}>
                  Shade:{" "}
                  {(item.attributes &&
                    item.attributes.find((attr) => attr.name === "Shade")
                      ?.options[0]) ||
                    "N/A"}
                </p>
                <p className={`text-sm ${lexendDeca.className}`}>
                  Size:{" "}
                  {(item.attributes &&
                    item.attributes.find((attr) => attr.name === "Size")
                      ?.options[0]) ||
                    "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="container mx-auto px-4 py-8">
          <h2 className={`text-2xl font-bold mb-14 ${jost.className}`}>
            Customers Also Bought
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <ProductSkeleton key={index} />
                ))}
            </div>
          ) : (
            <Slider {...sliderSettings}>
              {products.map((product) => (
                <div key={product.id} className="px-2  mb-3">
                  <div className="bg-white rounded-lg shadow-md flex flex-col overflow-hidden  min-h-[385px] pb-4">
                    <div className="relative pb-[100%]">
                      <Image
                        src={product.images[0]?.src || "/placeholder.svg"}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="p-4  flex-grow justify-between flex flex-col">
                      <aside>
                        <h3
                          className={`  text-sm font-bold mb-1 ${jost.className}`}
                        >
                          {getBrand(product)}
                        </h3>
                        <p
                          className={`text-[10px] sm:text-sm mb-2  h-14 sm:h-12  overflow-hidden ${lexendDeca.className}`}
                        >
                          {product.name}
                        </p>
                      </aside>
                      <aside className="mt-auto">
                        <p
                          className={`text-lg  mt-auto font-bold mb-3 ${lexendDeca.className}`}
                        >
                          {currencySymbol}{parseFloat(product.price * rate).toFixed(2)}
                        </p>
                        <button
                          className={`w-full  text-xs sm:text-base bg-black text-white py-2 rounded-md hover:bg-gray-800 transition ${jost.className}`}
                          onClick={() => addToCart(product)}
                        >
                          ADD TO BAG
                        </button>
                      </aside>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className={`inline-block bg-black text-white px-6 py-3 rounded-md ${jost.className}`}
          >
            KEEP SHOPPING
          </Link>
        </div>
      </div>
    </Container>
  );
}
