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
import ProductList from "../../../components/home/home-products/TrendingProducts/ProductList";

export default function MyBag() {
  const { cartItems, removeFromCart, updateQuantity, saveForLater, editItem } =
    useCartStore();
  const [promoCode, setPromoCode] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [showScroll, setShowScroll] = useState(false);
  const cartRef = useRef(null);

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

  return (
    <Container>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4 w-[65%]">
          <p className={`text-sm text-black ${jost.className} font-medium`}>
            Log in or create an account now to get these exclusive benefits.
          </p>
          <div>
            <Link href="/signup">
              <button
                className={`mr-4 ${jost.className} text-sm text-gray-800 border border-gray-300 px-4 py-2 font-medium rounded-md`}
              >
                Register
              </button>
            </Link>
            <Link href="/login">
              <button
                className={`text-sm font-medium text-gray-800 border border-gray-300 px-4 py-2 rounded-md ${jost.className}`}
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
                  className="flex items-start md:items-center border-b border-gray-200 py-6"
                >
                  <Image
                    src={item.images[0].src}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="rounded-md object-cover"
                  />
                  <div className="ml-4 flex-grow">
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
                            <h2
                              className={`text-lg font-medium w-[80%] ${jost.className}`}
                            >
                              {item.name}
                            </h2>
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
                            £
                            {(parseFloat(item.price) * item.quantity).toFixed(
                              2
                            )}
                          </p>
                        </div>

                        <div className="mt-24 flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="inline-flex items-center border border-gray-300 rounded-lg overflow-hidden">
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

                          <div className=" space-x-4">
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

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">You May Also Like</h2>
              <ProductList limit={3} />
            </div>
          </div>

          <div className="md:w-1/3 -mt-32 bg-[#f7f7f7]">
            <div className="p-2 rounded-lg">
              <div className="bg-white p-4 rounded-lg mt-4">
                <h2 className={`text-xl font-normal mb-4 ${jost.className}`}>
                  Order Summary
                </h2>
                <div className={`flex justify-between mb-2 ${jost.className}`}>
                  <span>Subtotal ({cartItems.length}):</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                <div className={`flex justify-between mb-2 ${jost.className}`}>
                  <span>Estimated Shipping:</span>
                  <input
                    type="text"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Enter shipping address"
                    className=" border-gray-300 rounded-md px-2 py-1 text-gray-800"
                  />
                </div>
                <p className={`text-sm text-black mb-4 ${jost.className}`}>
                  (Spend <span className="font-semibold">£0.01 </span>more for{" "}
                  <span className="font-semibold">FREE DELIVERY</span>)
                </p>
                <hr className="h-1" />
                <div
                  className={`flex mt-4 justify-between font-semibold ${jost.className}`}
                >
                  <span>Estimated Total:</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
                <p className={`text-xs text-[#8B929D] mt-1 ${jost.className}`}>
                  Including £3.20 in taxes
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
                    className={`flex-grow border font-normal rounded-md px-3 py-2 mr-4 focus:outline-none focus:ring-2 focus:ring-blue-300 ${lexendDeca.className}`}
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
                <div className={`flex space-x-2 mt-8 mb-4 ${jost.className}`}>
                  <p>Pay by Card/Pay Later</p>
                  <Image src={visa} alt="Visa" width={40} height={25} />
                  <Image src={master} alt="Master" width={40} height={25} />
                  <Image src={maestro} alt="Maestro" width={40} height={25} />
                  <Image
                    src={ae}
                    alt="American Express"
                    width={40}
                    height={25}
                  />
                  <Image src={paypal} alt="PayPal" width={40} height={25} />
                </div>
                <Link href="./checkout">
                  <button
                    className={`bg-black ${jost.className}  text-white w-full py-3 rounded-md`}
                  >
                    Checkout Securely
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
