"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import creditCardType from "credit-card-type";
import { useCartStore } from "../../../states/Cardstore";
import { jost, lexendDeca } from "../../../components/ui/fonts";
import Container from "../../../components/container";
import PayPal from "../../../public/card-logos/paypal.svg";
import Klarna from "../../../public/Klarna.svg";
import visa from "../../../public/card-logos/visa.svg";
import master from "../../../public/card-logos/master.svg";
import maestro from "../../../public/card-logos/maestro.svg";
import ae from "../../../public/card-logos/american-express.svg";
import paypal from "../../../public/card-logos/paypal.svg";
import klarna_wal from "../../../public/Klarnawallet.svg";
import klarna_pink from "../../../public/klarn_pink.svg";

import { usePopupStore } from "/states/use-popup-store";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

const shippingOptions = [
  {
    id: 1,
    name: "Standard Delivery",
    time: "(Arrives between 20 June - 31 June)",
    price: 4.5,
  },
  {
    id: 2,
    name: "DPD Next Day Delivery",
    time: "(Arrives tomorrow, 21 June before 3:00pm)",
    price: 4.99,
  },
  {
    id: 3,
    name: "Royal Mail Tracked - 24 hrs",
    time: "(Arrives tomorrow, 21 June before 5:00pm)",
    price: 4.99,
  },
  {
    id: 4,
    name: "Royal Mail Tracked - 48 hrs",
    time: "(Arrives between 24 June - 25 June)",
    price: 4.99,
  },
  {
    id: 5,
    name: "Royal Mail Special Delivery",
    time: "(Arrives tomorrow, 20 June before 11:00am)",
    price: 5.99,
  },
];

export default function Checkout() {
  const [isMounted, setIsMounted] = useState(false);
  const { cartItems } = useCartStore();
  const { rate,currencySymbol } = usePopupStore();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postcode: "",
    phone: "",
    cardNumber: "",
    expirationDate: "",
    securityCode: "",
    nameOnCard: "",
    promoCode: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [saveInfo, setSaveInfo] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [subscribeToNews, setSubscribeToNews] = useState(false);
  const [useSameAddress, setUseSameAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [shippingMethod, setShippingMethod] = useState(null);
  const [showShippingDropdown, setShowShippingDropdown] = useState(false);
  const [filteredShippingOptions, setFilteredShippingOptions] =
    useState(shippingOptions);
  const [showPaymentOptions, setShowPaymentOptions] = useState(true);
  const shippingRef = useRef(null);
  const paymentRef = useRef(null);
  const [cardType, setCardType] = useState("");
  const router = useRouter();
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Enter a valid email address";
        }
        break;
      case "firstName":
      case "lastName":
      case "address":
      case "city":
      case "postcode":
      case "phone":
        if (!value) {
          error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        }
        break;
      case "cardNumber":
        if (!value) {
          error = "Card number is required";
        } else {
          const cleanedValue = value.replace(/\s/g, "");
          if (!/^\d{15,16}$/.test(cleanedValue)) {
            error = "Enter a valid 15 or 16-digit card number";
          } else if (
            cleanedValue.length === 15 &&
            cardType !== "american-express"
          ) {
            error = "This card number is invalid for the detected card type";
          } else if (
            cleanedValue.length === 16 &&
            cardType === "american-express"
          ) {
            error = "American Express cards should have 15 digits";
          }
        }
        break;
      case "expirationDate":
        if (!value) {
          error = "Expiration date is required";
        } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
          error = "Enter a valid expiration date (MM/YY)";
        }
        break;
      case "securityCode":
        if (!value) {
          error = "Security code is required";
        } else if (!/^\d{3,4}$/.test(value)) {
          error = "Enter a valid 3 or 4-digit security code";
        }
        break;
      case "nameOnCard":
        if (!value) {
          error = "Name on card is required";
        }
        break;
    }
    return error;
  };

  const handlePayNow = () => {

  // Check if all required fields are filled
  const requiredFields = ['firstName', 'lastName', 'address', 'city', 'postcode', 'phone', 'email'];
  const missingFields = requiredFields.filter(field => !formData[field]);

  if (missingFields.length > 0) {
    toast.error(`Please fill in all required fields`);
    return;
  }

  // Check if shipping method is selected
  if (!shippingMethod) {
    toast.error('Please select a shipping method');
    return;
  }

  // Check if payment method is selected
  if (!paymentMethod) {
    toast.error('Please select a payment method');
    return;
  }

  // Check payment method specific details
  if (paymentMethod === 'card') {
    const cardFields = ['cardNumber', 'expirationDate', 'securityCode', 'nameOnCard'];
    const missingCardFields = cardFields.filter(field => !formData[field]);

    if (missingCardFields.length > 0) {
      toast.error(`Please fill in all card details: ${missingCardFields.join(', ')}`);
      return;
    }

    // Additional card validation could be added here
  }

  // Check if cart is not empty
  if (cartItems.length === 0) {
    toast.error('Your cart is empty');
    return;
  }

  // If all checks pass, proceed with order creation
  try {
    const orderDetails = {
      customerInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        postcode: formData.postcode,
        phone: formData.phone,
        email: formData.email,
      },
      paymentMethod: paymentMethod,
      cardType: cardType,
      cardLastFour: formData.cardNumber ? formData.cardNumber.slice(-4) : null,
      cartItems: cartItems,
      subtotal: subtotal,
      shipping: shipping,
      total: total,
      shippingMethod: shippingMethod.name,
    };

    useCartStore.getState().setOrderDetails(orderDetails);
    toast.success('Order placed successfully!');
    
    router.push('/confirmation-successful');
  } catch (error) {
    console.error('Error processing order:', error);
    toast.error('There was an error processing your order. Please try again.');
  }
}

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));

    if (name === "cardNumber") {
      handleCardNumberChange(e);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleShippingSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = shippingOptions.filter(
      (option) =>
        option.name.toLowerCase().includes(searchTerm) ||
        option.time.toLowerCase().includes(searchTerm)
    );
    setFilteredShippingOptions(filtered);
  };

  const selectShippingMethod = (method) => {
    setShippingMethod(method);
    setShowShippingDropdown(false);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + (parseFloat(item.price) || 0) * item.quantity,
      0
    );
  };

  const subtotal = calculateSubtotal();
  const shipping = shippingMethod ? shippingMethod.price : 0;
  const total = subtotal + shipping;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shippingRef.current && !shippingRef.current.contains(event.target)) {
        setShowShippingDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    setCardNumber(value);
    setFormData((prev) => ({ ...prev, cardNumber: formatCardNumber(value) }));

    if (value) {
      const detectedTypes = creditCardType(value);
      if (detectedTypes.length > 0) {
        setCardType(detectedTypes[0].type);
      } else {
        setCardType("");
      }
    } else {
      setCardType("");
    }

    setErrors((prev) => ({
      ...prev,
      cardNumber: validateField("cardNumber", value),
    }));
  };
  const getCardLogo = () => {
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
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setShowPaymentOptions(false);
  };

  const renderInput = (name, placeholder, type = "text") => (
    <div className="relative">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className={`w-full border rounded px-3 py-2 ${lexendDeca.className} ${
          touched[name] && errors[name] ? "border-red-500" : ""
        } ${name === "cardNumber" ? "pr-10" : ""}`}
        maxLength={
          name === "cardNumber"
            ? cardType === "american-express"
              ? 17
              : 19
            : undefined
        }
      />
      {name === "cardNumber" && cardType && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <Image src={getCardLogo()} alt={cardType} width={32} height={20} />
        </div>
      )}
      {touched[name] && errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
      )}
    </div>
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <Container>
      <div className="flex justify-between w-[65%] mt-16 items-center">
        <h1 className={`text-3xl font-semibold mb-6 ${jost.className}`}>
          Checkout
        </h1>
        <div className="md:flex items-center gap-4 hidden">
          <p className={`${jost.className}`}>Have an account ?</p>
          <Link href="/login">
            <button
              className={`border rounded-lg p-1 px-4 hover:bg-slate-200 ${jost.className}`}
            >
              Log in For Faster Checkout
            </button>
          </Link>
        </div>
      </div>
      <div className="container px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Checkout Form */}
          <div className="lg:w-2/3 space-y-6">
            {/* Header with Payment Options */}
            <div className="flex flex-row justify-evenly sm:justify-between gap-4 mb-6">
              <button
                className={`bg-yellow-400  hover:bg-yellow-500 w-full  text-black sm:px-4 sm:py-2 rounded flex items-center justify-center ${jost.className}`}
              >
                <span className=" hidden sm:inline">Pay with{" "}</span>
                <span className="sm:ml-2  ">
                  <Image src={PayPal} alt="PayPal"   />
                </span>
              </button>
              <button
                className={`bg-[#FFB3C7] hover:bg-pink-500 w-full  text-black px-4 py-2 rounded flex items-center justify-center ${jost.className}`}
              >
                <span className="sm:mr-2">
                  <Image src={Klarna} alt="Klarna" />
                </span>{" "}
                <span  className=" hidden sm:inline">Express Checkout</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-center my-4">
                <hr className="flex-grow border-t border-gray-300" />
                <span
                  className={`px-3 text-gray-500 text-sm ${lexendDeca.className}`}
                >
                  OR
                </span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>

              {/* Contact Section */}
              <div>
                <aside className=" flex justify-between items-center">
                  <h2
                    className={`text-xl font-semibold mb-2 ${jost.className}`}
                  >
                    Contact
                  </h2>
                  <div className="flex items-center gap-1">
                    
                    <Link href="/login">
                      <button
                        className={` ${jost.className}`}
                      >
                        Log in
                      </button>
                    </Link>
                    /
                    <Link href="/signup">
                      <button
                        className={` ${jost.className}`}
                      >
                        Register
                      </button>
                    </Link>
                  </div>
                </aside>
                {renderInput("email", "Email*", "email")}
                <div className="flex items-center my-3">
                  <input
                    type="checkbox"
                    id="subscribe"
                    checked={subscribeToNews}
                    onChange={(e) => setSubscribeToNews(e.target.checked)}
                    className="mr-2  size-4"
                  />
                  <label
                    className={`${lexendDeca.className}`}
                    htmlFor="subscribe"
                  >
                    Email me with news and offers
                  </label>
                </div>
              </div>

              {/* Delivery Section */}
              <div className="">
                <h2
                  className={`text-xl font-semibold mb-2 mt-20 ${jost.className}`}
                >
                  Delivery
                </h2>
                {renderInput("country", "Country/Region*")}
                <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 mb-4 gap-4">
                  {renderInput("firstName", "First Name*")}
                  {renderInput("lastName", "Last Name*")}
                </div>
                {renderInput("address", "Address*")}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 mb-4">
                  {renderInput("city", "City*")}
                  {renderInput("postcode", "Postcode*")}
                </div>
                {renderInput("phone", "Phone*")}
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="textSubscribe"
                    checked={subscribeToNews}
                    onChange={(e) => setSubscribeToNews(e.target.checked)}
                    className="mr-2"
                  />
                  <label
                    className={`${lexendDeca.className}`}
                    htmlFor="textSubscribe"
                  >
                    Text me with news and offers
                  </label>
                </div>
              </div>

              {/* Shipping Method */}
              <div ref={shippingRef}>
                <h2
                  className={`text-xl font-semibold mb-2 mt-20 ${jost.className}`}
                >
                  Shipping Method
                </h2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your shipping address to view available shipping methods"
                    className={`w-full border rounded bg-stone-100 px-3 py-2 ${lexendDeca.className}`}
                    onClick={() => setShowShippingDropdown(true)}
                    onChange={handleShippingSearch}
                  />
                  {showShippingDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
                      {filteredShippingOptions.map((option) => (
                        <div
                          key={option.id}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => selectShippingMethod(option)}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <p
                                className={`font-normal text-black ${lexendDeca.className}`}
                              >
                                {option.name}
                              </p>
                              <p
                                className={`text-sm text-gray-600 ${lexendDeca.className}`}
                              >
                                {option.time}
                              </p>
                            </div>
                            <p
                              className={`font-semibold ${lexendDeca.className}`}
                            >
                              {currencySymbol}{parseFloat(option.price * rate).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {shippingMethod && (
                  <div className={`mt-2 ${jost.className}`}>
                    <p>
                      Selected: {shippingMethod.name} - {currencySymbol}{parseFloat(shippingMethod.price * rate).toFixed(2)}
                    </p>
                  </div>
                )}
              </div>

              {/* Payment Section */}
              <div ref={paymentRef}>
                <div className={`flex justify-between items-center mb-4 mt-20`}>
                  <h2 className={`text-xl font-semibold ${jost.className}`}>
                    Payment
                  </h2>
                  {!showPaymentOptions && (
                    <button
                      onClick={() => setShowPaymentOptions(true)}
                      className={`text-[#8B929D] ${jost.className} underline`}
                    >
                      Change Payment
                    </button>
                  )}
                </div>

                {showPaymentOptions ? (
                  <div className="space-y-4 border rounded-md p-4">
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        checked={paymentMethod === "card"}
                        onChange={() => handlePaymentMethodChange("card")}
                        className="form-radio"
                      />
                      <span className={`${jost.className}`}>Pay by card</span>
                      <div className="flex space-x-2 ml-auto">
                        <Image src={visa} alt="Visa" width={32} height={20} />
                        <Image
                          src={master}
                          alt="Mastercard"
                          width={32}
                          height={20}
                        />
                        <Image
                          src={maestro}
                          alt="Maestro"
                          width={32}
                          height={20}
                        />
                        <Image
                          src={ae}
                          alt="American Express"
                          width={32}
                          height={20}
                        />
                      </div>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        checked={paymentMethod === "paypal"}
                        onChange={() => handlePaymentMethodChange("paypal")}
                        className="form-radio"
                      />
                      <span className={`${jost.className}`}>PayPal</span>
                      <Image
                        src={paypal}
                        alt="PayPal"
                        width={64}
                        height={20}
                        className="ml-auto"
                      />
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        checked={paymentMethod === "klarna"}
                        onChange={() => handlePaymentMethodChange("klarna")}
                        className="form-radio"
                      />
                      <span className={`${jost.className}`}>
                        Klarna - Flexible payments
                      </span>
                      <Image
                        src={klarna_pink}
                        alt="Klarna"
                        width={64}
                        height={20}
                        className="ml-auto"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="border rounded-md p-4">
                    {paymentMethod === "card" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className={`font-medium ${jost.className}`}>
                            Pay by card
                          </span>
                          <div className="flex space-x-2">
                            <Image
                              src={visa}
                              alt="Visa"
                              width={32}
                              height={20}
                            />
                            <Image
                              src={master}
                              alt="Mastercard"
                              width={32}
                              height={20}
                            />
                            <Image
                              src={maestro}
                              alt="Maestro"
                              width={32}
                              height={20}
                            />
                            <Image
                              src={ae}
                              alt="American Express"
                              width={32}
                              height={20}
                            />
                          </div>
                        </div>
                        {renderInput("cardNumber", "Card number*")}
                        <div className="flex space-x-4">
                          {renderInput(
                            "expirationDate",
                            "Expiration date (MM/YY)*"
                          )}
                          {renderInput("securityCode", "Security code*")}
                        </div>
                        {renderInput("nameOnCard", "Name on card*")}
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={useSameAddress}
                            onChange={() => setUseSameAddress(!useSameAddress)}
                            className="form-checkbox"
                          />
                          <span className={`${lexendDeca.className}`}>
                            Use shipping address as billing address
                          </span>
                        </label>
                      </div>
                    )}
                    {paymentMethod === "paypal" && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className={`font-medium ${jost.className}`}>
                            Paypal
                          </span>
                          <Image
                            src={PayPal}
                            alt="PayPal"
                            width={64}
                            height={20}
                          />
                        </div>
                        <p
                          className={`${lexendDeca.className} mt-4 text-sm text-center mx-auto w-[80%] `}
                        >
                          After clicking &quot;Pay now&quot;, you will be
                          redirected to PayPal to complete your payment.
                        </p>
                      </div>
                    )}
                    {paymentMethod === "klarna" && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className={`font-medium ${jost.className}`}>
                            Klarna - Flexible payments
                          </span>
                          <Image
                            src={klarna_pink}
                            alt="Klarna"
                            width={64}
                            height={20}
                          />
                        </div>
                        <Image
                          src={klarna_wal}
                          alt="Klarna Wallet"
                          width={200}
                          height={200}
                          className="mx-auto"
                        />
                        <p
                          className={`${lexendDeca.className} mt-4 text-sm text-center mx-auto w-[80%]`}
                        >
                          After clicking &quot;Pay now&quot;, you will be
                          redirected to Klarna to set up your flexible payment
                          plan.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Remember Me */}
              <h1 className={`${jost.className} text-xl font-semibold`}>
                Remember Me
              </h1>
              <div className="flex items-center border rounded-lg p-2">
                <input
                  type="checkbox"
                  id="save-info"
                  checked={saveInfo}
                  onChange={(e) => setSaveInfo(e.target.checked)}
                  className="mr-2"
                />
                <label
                  htmlFor="save-info"
                  className={` text-[#8B929D] ${lexendDeca.className}`}
                >
                  Save my information for a faster checkout
                </label>
              </div>

              {/* Pay Now Button */}
              {/* <Link href="./confirmation-successful"> */}
                <button
                  onClick={handlePayNow}
                  className={`w-full rounded-xl bg-black text-white mt-4 hover:bg-gray-800 py-3 md:rounded ${jost.className} uppercase`}
                >
                  PAY NOW
                </button>
              {/* </Link> */}
              {/* Terms */}
              <p
                className={`text-sm text-gray-600 mt-4 text-center ${lexendDeca.className}`}
              >
                By placing this order, you are confirming that you agree to our{" "}
                <a href="#" className="text-black underline">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-black underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>

          {/* Right: Order Summary and Bag Summary */}
          <div className="lg:w-1/3 bg-gray-50  p-6 rounded-lg lg:-mt-24">
            <div className=" ">
              <div className=" bg-white rounded-lg p-6 shadow-sm">
                <h2 className={`text-xl font-semibold mb-4 ${jost.className}`}>
                  Order Summary
                </h2>

                {/* Subtotal */}
                <div className={`flex justify-between mb-2 ${jost.className}`}>
                  <span>Subtotal ({cartItems.length} items):</span>
                  <span>{currencySymbol}{parseFloat(subtotal * rate).toFixed(2)}</span>
                </div>

                {/* Shipping */}
                <div className={`flex justify-between mb-2 ${jost.className}`}>
                  <span>Shipping:</span>
                  <span>{shipping ? `${currencySymbol}${shipping.toFixed(2)}` : "Free"}</span>
                </div>
                <hr />
                {/* Total */}
                <div
                  className={`flex justify-between mt-4 font-semibold mb-4 ${jost.className}`}
                >
                  <span> Estimated Total:</span>
                  <span>{currencySymbol}{parseFloat(total * rate).toFixed(2)}</span>
                </div>
              </div>

              {/* Bag Summary */}
              <div className="bg-white rounded-lg p-6 shadow-sm mt-12">
                <h2 className={`text-lg font-semibold mb-2 ${jost.className}`}>
                  Bag Summary
                </h2>
                <div
                  className={`
                    ${
                      cartItems.length > 1
                        ? "max-h-[300px] overflow-y-auto pr-2"
                        : ""
                    }
                    space-y-4
                  `}
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#888 #f1f1f1",
                  }}
                >
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between border-b py-2"
                    >
                      <div className="flex">
                        {item.images && item.images[0] && item.images[0].src ? (
                          <Image
                            src={item.images[0].src}
                            alt={item.name}
                            width={50}
                            height={50}
                            className="mr-4 object-cover rounded"
                          />
                        ) : (
                          <div className="mr-4 bg-gray-200 w-[50px] h-[50px] flex items-center justify-center rounded">
                            <span className="text-xs text-gray-500">
                              No Image
                            </span>
                          </div>
                        )}
                        <div>
                          <p className={`font-medium ${jost.className}`}>
                            {item.name}
                          </p>
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
                          <p
                            className={`text-sm text-gray-500 ${lexendDeca.className}`}
                          >
                            Qty: {item.quantity}
                          </p>
                          <div className={`font-medium ${jost.className}`}>
                            {currencySymbol}{parseFloat(item.price * rate).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
