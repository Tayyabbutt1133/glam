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
import NextArrowIcon from '../../../public/hero-banners/next-arrow';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { usePopupStore } from "/states/use-popup-store";
import Text from "../../../components/ui/Text";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

const arrowStyles = {
  width: "40px",
  height: "40px",
  zIndex: 1,
  transition: "all 0.3s ease-in-out",
};

const NextArrow = ({ className, style, onClick }) => (
  <div
    className={`absolute top-1/2 transform -translate-y-1/2 right-4  ${className}`}
    onClick={onClick}
    style={{ ...style, ...arrowStyles, right: "-38px" }}
  >
    <NextArrowIcon />
  </div>
);

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
  const [favorites, setFavorites] = useState({});
  const cartRef = useRef(null);

  const { rate, currencySymbol } = usePopupStore();
  console.log({ currencySymbol, rate });

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

  const handleFavoriteClick = (productId, e) => {
    e.preventDefault(); // Prevent navigation when clicking the heart icon
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [productId]: !prevFavorites[productId],
    }));
  };

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
    arrows: true,
    nextArrow: <NextArrow />,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          dots: true,
          slidesToScroll: 3,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 2,
          slidesToScroll: 2,
          rows: 2,
          slidesPerRow: 1,
        },
      },
    ],
  };
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <main className="mx-6">
      <div className="lg:w-[98%] xl:w-[98%] mx-auto px-4 mt-8">
        <div className="flex flex-col md:flex-row items-center md:justify-between md:pr-2 w-full md:w-[69%]">
          <p className={`text-sm md:text-[15px] 2xl:text-[20px] md:w-full text-black ${jost.className} sm:font-medium`}>
            Log in or create an account now to get these exclusive benefits.
          </p>
          <div className="flex mt-3 md:mt-0 items-center justify-between w-[80%] sm:w-8/12 md:w-[59%] lg:w-[40%] mr-10 md:justify-end flex-row gap-4 md:gap-1 lg:gap-4">
            <Link href="/signup">
              <button
                className={`${jost.className} lg:text-base hover:bg-gray-100 text-gray-800 sm:border border-gray-300 px-4 py-[5px] font-medium rounded-lg`}
              >
                Register
              </button>
            </Link>
            <Link href="/login">
              <button
                className={`lg:text-base font-medium hover:bg-gray-100 text-gray-800 sm:border border-gray-300 px-4 py-[5px] rounded-lg ${jost.className}`}
              >
                Log in
              </button>
            </Link>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6 mt-8">
          <h1 className={`text-3xl font-medium ${jost.className}`}>
            Your Bag ({cartItems.length})
          </h1>
        </div>
        <hr className="h-2 w-[65%]" />

        <div className="flex flex-col md:flex-row md:items-stretch gap-8">
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
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex flex-row gap-4 items-start md:items-center py-6 ${
                    cartItems.length > 1 && index !== cartItems.length - 1 ? "border-b border-gray-200" : ""
                  }`}
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

                  <div className="ml-4 md:flex-grow">
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
                              className={`text-sm 2xl:text-[20px] leading-normal text-black ${jost.className} font-normal mt-[15px]`}
                            >
                              Shade:{" "}
                              {item.attributes.find(
                                (attr) => attr.name === "Shade"
                              )?.options[0] || "N/A"}
                            </p>
                            <p
                              className={`text-sm 2xl:text-[20px] text-black ${jost.className} font-normal mt-[10px]`}
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
                        <div className="mt-6 sm:mt-24 flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="inline-flex items-center justify-between w-[102px] h-[35px] border rounded-lg overflow-hidden sm:max-w-[102px] max-w-[80px] sm:h-[35px]">
                              <button
                                className="text-sm w-1/3 h-full text-b-03 hover:bg-gray-100 focus:outline-none"
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    Math.max(1, item.quantity - 1)
                                  )
                                }
                              >
                                -
                              </button>
                              <Text
                                style="large"
                                className="font-normal w-1/3 text-center"
                              >
                                {item.quantity}
                              </Text>
                              <button
                                className="text-sm h-full w-1/3 text-b-03 hover:bg-gray-100 focus:outline-none"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="space-x-8">
                            <button
                              className={`font-medium 2xl:text-[20px] text-black ${jost.className}`}
                              onClick={() => handleSaveForLater(item.id)}
                            >
                              Save For Later
                            </button>
                            <button
                              className={`font-medium 2xl:text-[20px] text-black ${jost.className}`}
                              onClick={() => handleEdit(item)}
                            >
                              Edit
                            </button>
                            <button
                              className={`font-medium 2xl:text-[20px] text-black ${jost.className}`}
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
            <div className="container mx-auto px-4 py-8 mb-24 md:mb-0 hidden md:block">
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
                      <div className="bg-white flex flex-col pb-4 border border-gray-100 rounded-lg min-h-[330px] overflow-hidden relative">
                        <div className="absolute top-2 right-2 z-10">
                          <button
                            className="focus:outline-none"
                            onClick={(e) => handleFavoriteClick(product.id, e)}
                          >
                            {favorites[product.id] ? (
                              <FaHeart className="text-red-500 w-6 h-6" />
                            ) : (
                              <CiHeart className="text-black w-6 h-6" />
                            )}
                          </button>
                        </div>

                        <Link href={`/product/${product.id}`}>
                          <div>
                            <div className="relative pb-[100%]">
                              <Image
                                src={product.images[0]?.src || '/placeholder.svg'}
                                alt={product.name}
                                layout="fill"
                                objectFit="cover"
                              />
                            </div>

                            <div className="px-2 mt-6">
                              <h3 className={`text-sm font-bold mb-1 ${jost.className}`}>
                                {getBrand(product)}
                              </h3>
                              <p
                                className={`text-sm mb-2 h-10 overflow-hidden ${lexendDeca.className}`}
                              >
                                {product.name}
                              </p>
                            </div>

                            <div className="flex flex-col justify-end px-2 pb-2 mt-auto">
                              <p
                                className={`text-[15px] sm:text-base font-bold mb-3 ${lexendDeca.className}`}
                              >
                                {currencySymbol}
                                {parseFloat(product.price * rate).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </Link>

                        <div className="px-2 pb-2">
                          <button
                            className={`w-full bg-black text-xs rounded-lg sm:text-sm md:text-base text-white py-2 px-1 hover:bg-[#CF8562] transition ${jost.className}`}
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

          {/* order summary */}
          <div className="md:w-1/3 md:-mt-44 bg-[#F7F7F7A6] md:flex-grow rounded-xl md:rounded-none border-red-700">
            <div className="p-2 rounded-lg bg-[#F7F7F7A6]">
              <div className="bg-white p-4 rounded-lg mt-4">
                <h2 className={`text-xl 2xl:text-[22px] font-medium mb-4 ${jost.className}`}>
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
                  className={`flex items-center flex-wrap justify-between mb-2 ${jost.className}`}
                >
                  <span>Estimated Shipping:</span>
                  <input
                    type="text"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Enter shipping address"
                    className="border-gray-300 w-[100%] xl:w-[65%] rounded-md px-2 py-1 -mr-2 text-gray-800 text-right"
                  />
                </div>
                <p className={`text-sm 2xl:text-[18px] text-black font-normal mb-4 ${jost.className}`}>
                  (Spend{" "}
                  <span className={`font-medium 2xl:text-[18px] ${jost.className}`}>
                    {currencySymbol}
                    {(0.01 * rate).toFixed(2)}{" "}
                  </span>
                  more for <span className="font-medium 2xl:text-[2xl]">FREE DELIVERY</span>)
                </p>
                <hr className="h-1" />
                <div
                  className={`flex mt-4 justify-between font-semibold ${jost.className}`}
                >
                  <span className={`${jost.className} text-xl 2xl:text-[22px] font-medium`}>Estimated Total:</span>
                  <span>
                    {currencySymbol}
                    {parseFloat(total * rate).toFixed(2)}
                  </span>
                </div>
                <p className={`text-sm 2xl:text-[16px] text-[#8B929D] mt-1 ${jost.className}`}>
                  Including {currencySymbol}
                  {(3.2 * rate).toFixed(2)} in taxes
                </p>
              </div>

              <div className="mt-4 bg-white p-6 rounded-lg">
                <label
                  htmlFor="promo"
                  className={`block text-xl 2xl:text-[22px] ${jost.className} font-medium text-black mb-1`}
                >
                  Promo code
                </label>
                <div className="flex items-center mt-5">
                  <input
                    type="text"
                    className={`sm:flex-grow border w-[85%] text-sm font-normal rounded-md px-3 py-2 mr-4 focus:outline-none focus:ring-2 focus:ring-blue-300 ${lexendDeca.className}`}
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter the code"
                  />
                  <button
                    className={`bg-white border text-black px-4 py-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 ${jost.className}`}
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div className="mt-6 bg-white p-6 rounded-lg">
                <p className={`mb-2 text-lg ${jost.className} font-medium`}>
                  Payment Mode
                </p>
                <div
                  className={`flex items-center flex-wrap justify-between space-x-2 mt-8 mb-4 ${jost.className}`}
                >
                  <p>Pay by Card/Pay Later</p>
                  <section className="gap-4 items-center flex">
                    <div className="hover:scale-110 transition-transform duration-300 cursor-pointer flex items-center justify-center">
                      <Image
                        src={visa}
                        alt="Visa"
                        width={40}
                        height={25}
                      />
                    </div>
                    <div className="p-2 hover:scale-110 transition-transform duration-300 cursor-pointer flex items-center justify-center">
                      <Image
                        src={master}
                        alt="Master"
                        width={40}
                        height={25}
                      />
                    </div>
                    <div className="p-2 hover:scale-110 transition-transform duration-300 cursor-pointer flex items-center justify-center">
                      <Image
                        src={maestro}
                        alt="Maestro"
                        width={40}
                        height={25}
                      />
                    </div>
                    <div className="p-2 hover:scale-110 transition-transform duration-300 cursor-pointer flex items-center justify-center">
                      <Image
                        src={ae}
                        alt="American Express"
                        width={40}
                        height={25}
                      />
                    </div>
                    <div className="p-2 hover:scale-110 transition-transform duration-300 cursor-pointer flex items-center justify-center">
                      <Image
                        src={paypal}
                        alt="PayPal"
                        width={40}
                        height={25}
                      />
                    </div>
                  </section>
                </div>
                <Link href="./checkout">
                  <button
                    className={`bg-black ${jost.className} text-white w-full py-3 rounded-lg hover:bg-[#CF8562]`}
                  >
                    Checkout Securely
                  </button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-8 mb-24 md:mb-0 md:hidden block">
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
                      <div className="absolute top-2 right-2 z-10">
                        <button
                          className="focus:outline-none"
                          onClick={(e) => handleFavoriteClick(product.id, e)}
                        >
                          {favorites[product.id] ? (
                            <FaHeart className="text-red-500 w-6 h-6" />
                          ) : (
                            <CiHeart className="text-black w-6 h-6" />
                          )}
                        </button>
                      </div>
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
                      <div className="flex flex-col justify-end px-2 pb-2 mt-auto">
                        <p
                          className={`text-[15px] sm:text-base mt-auto font-bold mb-3 ${lexendDeca.className}`}
                        >
                          {currencySymbol}
                          {parseFloat(product.price * rate).toFixed(2)}
                        </p>

                        <button
                          className={`w-full bg-black text-xs rounded-lg sm:text-sm md:text-base text-white py-2 px-1 hover:bg-[#CF8562] transition ${jost.className}`}
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
      </div>
    </main>
  );
}