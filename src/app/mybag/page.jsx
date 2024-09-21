"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useCartStore } from "../../../states/Cardstore";
import visa from "../../../public/card-logos/visa.svg";
import master from "../../../public/card-logos/master.svg";
import maestro from "../../../public/card-logos/maestro.svg";
import ae from "../../../public/card-logos/american-express.svg";
import paypal from "../../../public/card-logos/paypal.svg";
import { jost, lexendDeca } from "../../../components/ui/fonts";
import Link from "next/link";
import Container from "../../../components/container";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { usePopupStore } from "/states/use-popup-store";

const API_URL = "https://glam.clickable.site/wp-json/wc/v3/products";
const CK = "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d";
const CS = "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc";

export default function MyBag() {
  const { cartItems, removeFromCart, updateQuantity, saveForLater, editItem } =
    useCartStore();
  const [promoCode, setPromoCode] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [showScroll, setShowScroll] = useState(false);
  const cartRef = useRef(null);

  const { rate, currencySymbol } = usePopupStore();
  console.log({currencySymbol,rate});

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + parseFloat(item.price) * item.quantity,
      0
    );
  };

  const subtotal = calculateSubtotal();
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleSaveEdit = (item) => {
    editItem(item);
    setEditingItem(null);
  };

  const handleSaveForLater = (itemId) => {
    saveForLater(itemId);
  };

  useEffect(() => {
    const checkScrollHeight = () => {
      const cartElement = cartRef.current;
      if (cartElement) {
        setShowScroll(cartElement.scrollHeight > cartElement.clientHeight);
      }
    };

    checkScrollHeight();
    window.addEventListener("resize", checkScrollHeight);
    return () => window.removeEventListener("resize", checkScrollHeight);
  }, [cartItems]);

  useEffect(() => {
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
  }, []);

  const getBrand = (product) => {
    return (
      product.attributes.find((attr) => attr.name === "Brand")?.options[0] ||
      "Unknown Brand"
    );
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
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
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

  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Container>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center  mb-4 w-full md:w-[68%]">
          <div>
          <p className={`text-sm text-black ${jost.className} font-medium`}>
            Log in or create an account now to get these exclusive benefits.
            </p>
            </div>
          <div className="flex mt-3 justify-start  flex-row gap-4 md:gap-2 ">
            <Link href="/signup">
              <button
                className={`mr-4 ${jost.className} text-sm text-gray-800 border border-gray-300 hover:bg-gray-100 px-4 py-2 font-medium rounded-md`}
              >
                Register
              </button>
            </Link>
            <Link href="/login">
              <button
                className={`text-sm font-medium hover:bg-gray-100 text-gray-800 border border-gray-300 px-4 py-2 rounded-md ${jost.className}`}
              >
                Log In
              </button>
            </Link>
          </div>
        </div>
        <hr className="h-2" />
        <div className="flex justify-between items-center mb-6 mt-4">
          <h1 className={`text-3xl font-medium ${jost.className}`}>
            Your Bag ({cartItems.length})
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <div
              ref={cartRef}
              className={`max-h-[600px] overflow-y-auto ${
                showScroll ? "pr-4" : ""
              }`}
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#888 #f1f1f1",
              }}
            >
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-row gap-4  items-start md:items-center border-b border-gray-200 py-6"
                >
                  <div className="w-[120px] md:w-48 md:flex-shrink-0">
                    <Image
                      src={item.images[0].src}
                      alt={item.name}
                      width={200}
                      height={200}
                      className="rounded-md object-cover w-full h-auto"
                      sizes="(max-width: 768px) 100%, 200px"
                    />
                  </div>
                  <div className="ml-4">
                    {editingItem?.id === item.id ? (
                      <div>
                        <input
                          type="text"
                          value={editingItem.name}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              name: e.target.value,
                            })
                          }
                          className="border rounded px-2 py-1 mb-2 w-full"
                        />
                        <button
                          onClick={() => handleSaveEdit(editingItem)}
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <Link href={`/product/${item.id}`}>
                              <h2
                                className={`text-lg cursor-pointer font-medium w-[80%] ${jost.className}`}
                              >
                                {item.name}
                              </h2>
                            </Link>
                            <p
                              className={`text-sm text-black ${jost.className} font-normal`}
                            >
                              Shade:{" "}
                              {item.attributes.find(
                                (attr) => attr.name === "Shade"
                              )?.options[0] || "N/A"}
                            </p>
                            <p
                              className={`text-sm text-black ${jost.className} font-normal`}
                            >
                              Size:{" "}
                              {item.attributes.find(
                                (attr) => attr.name === "Size"
                              )?.options[0] || "N/A"}
                            </p>
                          </div>
                          <p
                            className={`font-semibold text-lg ${jost.className}`}
                          >
                            {currencySymbol}
                            {parseFloat(
                              item.price * rate * item.quantity
                            ).toFixed(2)}
                          </p>
                        </div>
                        <div className="block w-fit ml-auto items-center border border-gray-300 rounded-lg overflow-hidden">
                          {/* <button
                            className="text-sm px-3 py-1 text-gray-600 hover:bg-gray-100 focus:outline-none"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                          >
                            -
                          </button> */}
                          {/* <span className="text-sm px-3 py-1 border-l border-r border-gray-300">
                            {item.quantity}
                          </span> */}
                          {/* <button
                            className="text-sm px-3 py-1 text-gray-600 hover:bg-gray-100 focus:outline-none"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button> */}
                        </div>
                        <div className=" mt-6 sm:mt-24 flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="hidden sm:inline-flex items-center border border-gray-300 rounded-lg overflow-hidden">
                              <button
                                className="text-sm px-3 py-1 text-gray-600 hover:bg-gray-100 focus:outline-none"
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    Math.max(1, item.quantity - 1)
                                  )
                                }
                              >
                                -
                              </button>
                              <span className="text-sm px-3 py-1 border-l border-r border-gray-300">
                                {item.quantity}
                              </span>
                              <button
                                className="text-sm px-3 py-1 text-gray-600 hover:bg-gray-100 focus:outline-none"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="space-x-4">
                            <button
                              className={`text-sm text-black ${jost.className} font-medium`}
                              onClick={() => handleSaveForLater(item.id)}
                            >
                              Save For Later
                            </button>
                            <button
                              className={`text-sm text-black ${jost.className} font-medium`}
                              onClick={() => handleEdit(item)}
                            >
                              Edit
                            </button>
                            <button
                              className={`text-sm text-black ${jost.className} font-medium`}
                              onClick={() => removeFromCart(item.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* You May Also Like section */}
            <div className="container mx-auto px-4 py-8 mb-24 md:mb-4 hidden md:block">
              <h2 className={`text-2xl font-bold mb-14 ${jost.className}`}>
                You May Also Like
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
                    <div key={product.id} className="px-2">
                      <button className="ml-auto pt-1 pr-1 block   rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>
                      <div className="bg-white rounded-lg  shadow-md overflow-hidden">
                        
                        <div className="relative pb-[100%]">
                          <Link href={`/product/${product.id}`}>
                            <Image
                              src={product.images[0]?.src || "/placeholder.svg"}
                              alt={product.name}
                              layout="fill"
                              objectFit="cover"
                            />
                          </Link>
                        </div>
                        <div className="p-4">
                          <h3
                            className={`text-sm font-bold mb-1 ${jost.className}`}
                          >
                            {getBrand(product)}
                          </h3>
                          <Link href={`/product/${product.id}`}>
                            <p
                              className={`text-sm mb-2 h-10 overflow-hidden ${lexendDeca.className}`}
                            >
                              {product.name}
                            </p>
                          </Link>
                          <p
                            className={`text-lg mt-auto font-bold  ${lexendDeca.className}`}
                          >
                            {currencySymbol}
                            {parseFloat(product.price * rate).toFixed(2)}
                          </p>

                          <button
                            className={`w-full bg-black text-white text-xs sm:text-sm md:text-base py-2 rounded-md hover:bg-gray-800 transition `}
                            onClick={() => addToCart(product)}
                          >
                            ADD TO BAG
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </div>

          <div className="md:w-1/3 md:-mt-32  md:h-fit rounded-xl md:rounded-none">
            <div className="p-2 rounded-lg bg-[#F7F7F7A6]">
              <div className="bg-white p-4 rounded-lg mt-4">
                <h2 className={`text-xl font-normal mb-4 ${jost.className}`}>
                  Order Summary
                </h2>
                <div className={`flex justify-between mb-2 ${jost.className}`}>
                  <span>Subtotal ({cartItems.length}):</span>
                  <span>
                    {currencySymbol}
                    {parseFloat(subtotal * rate).toFixed(2)}
                  </span>
                </div>
                <div
                  className={`flex md:flex-col justify-between mb-2 ${jost.className}`}
                >
                  <span>Estimated Shipping:</span>
                  <input
                    type="text"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Enter shipping address"
                    className="border-gray-300 rounded-md px-2 py-1 text-gray-800"
                  />
                </div>
                <p className={`text-sm text-black mb-4 ${jost.className}`}>
                  (Spend{" "}
                  <span className="font-semibold">
                    {currencySymbol}
                    {(0.01 * rate).toFixed(2)}{" "}
                  </span>
                  more for <span className="font-semibold">FREE DELIVERY</span>)
                </p>
                <hr className="h-1" />
                <div
                  className={`flex mt-4 justify-between font-semibold ${jost.className}`}
                >
                  <span>Estimated Total:</span>
                  <span>
                    {currencySymbol}
                    {parseFloat(total * rate).toFixed(2)}
                  </span>
                </div>
                <p className={`text-xs text-[#8B929D] mt-1 ${jost.className}`}>
                  Including {currencySymbol}
                  {(3.2 * rate).toFixed(2)} in taxes
                </p>
              </div>

              <div className="mt-4 bg-white p-6 rounded-lg">
                <label
                  htmlFor="promo"
                  className={`block text-lg ${jost.className} font-medium text-black mb-1`}
                >
                  Promo code
                </label>
                <div className="flex items-center mt-8">
                  <input
                    type="text"
                    className={`sm:flex-grow border w-[85%] text-sm font-normal rounded-md px-3 py-2 mr-4 focus:outline-none focus:ring-2 focus:ring-blue-300 ${lexendDeca.className}`}
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter the code"
                  />
                  <button
                    className={`bg-white border text-black px-4 py-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 ${jost.className}`}
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div className="mt-6 bg-white p-6 rounded-lg">
                <p className={`mb-2 text-lg ${jost.className} font-medium`}>
                  Payment Mode
                </p>
                <div className={`flex flex-col space-x-2 mt-8 mb-4 ${jost.className}`}>
                  <p>Pay by Card/Pay Later</p>
                  <section className="gap-4 flex mt-2">
  <Image
    className="hover:scale-110 transition-transform duration-300 cursor-pointer"
    src={visa}
    alt="Visa"
    width={40}
    height={25}
  />
  <Image
    className="hover:scale-110 transition-transform duration-300 cursor-pointer"
    src={master}
    alt="Master"
    width={40}
    height={25}
  />
  <Image
    className="hover:scale-110 transition-transform duration-300 cursor-pointer"
    src={maestro}
    alt="Maestro"
    width={40}
    height={25}
  />
  <Image
    className="hover:scale-110 transition-transform duration-300 cursor-pointer"
    src={ae}
    alt="American Express"
    width={40}
    height={25}
  />
  <Image
    className="hover:scale-110 transition-transform duration-300 cursor-pointer"
    src={paypal}
    alt="PayPal"
    width={40}
    height={25}
  />
</section>

                </div>
                <Link href="./checkout">
                  <button
                    className={`bg-black ${jost.className} text-white w-full py-3 rounded-md hover:bg-[#CF8562]`}
                  >
                    Checkout Securely
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 py-8 mb-24 md:mb-4 md:hidden block">
            <h2 className={`text-2xl font-bold mb-14 ${jost.className}`}>
              You May Also Like
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
                  <div key={product.id} className="px-2">
                    <div className="bg-white flex flex-col rounded-lg shadow-md min-h-[330px] overflow-hidden">
                      <button className="ml-auto pt-1 pr-1   rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                      <div className="relative pb-[100%]">
                        <Image
                          src={product.images[0]?.src || "/placeholder.svg"}
                          alt={product.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="px-2 mt-auto">
                        <h3
                          className={`text-sm font-bold mb-1 ${jost.className}`}
                        >
                          {getBrand(product)}
                        </h3>
                        <p
                          className={`text-sm mb-2 h-10 overflow-hidden ${lexendDeca.className}`}
                        >
                          {product.name}
                        </p>
                      </div>
                      <div className="flex flex-col justify-end px-2 pb-2  mt-auto">
                        <p
                          className={`text-[15px] sm:text-base  mt-auto  font-bold mb-3 ${lexendDeca.className}`}
                        >
                          {currencySymbol}
                          {parseFloat(product.price * rate).toFixed(2)}
                        </p>
                      </div>
                      <button
                          className={`w-full bg-black text-xs sm:text-sm md:text-base text-white py-2 px-1 rounded-md hover:bg-[#CF8562] transition ${jost.className}`}
                          onClick={() => addToCart(product)}
                        >
                          ADD TO BAG
                        </button>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
