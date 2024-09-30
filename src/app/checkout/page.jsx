'use client'

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import creditCardType from "credit-card-type"
import { useCartStore } from "../../../states/Cardstore"
import { jost, lexendDeca } from "../../../components/ui/fonts"
import Container from "../../../components/container"
import PayPal from "../../../public/card-logos/paypal.svg"
import Klarna from "../../../public/Klarna.svg"
import visa from "../../../public/card-logos/visa.svg"
import master from "../../../public/card-logos/master.svg"
import maestro from "../../../public/card-logos/maestro.svg"
import ae from "../../../public/card-logos/american-express.svg"
import paypal from "../../../public/card-logos/paypal.svg"
import klarna_wal from "../../../public/Klarnawallet.svg"
import klarna_pink from "../../../public/klarn_pink.svg"
import { usePopupStore } from "/states/use-popup-store"
import { useRouter } from "next/navigation"
import { toast } from 'react-toastify'
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"

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
]

const FloatingLabelInput = ({ label, name, value, onChange, type = "text", error }) => {
  return (
    <div className="relative mb-4">
      <input
        type={type}
        id={name}
        name={name}
        className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-[#8B929D] bg-transparent rounded-lg border-2 ${error ? 'border-red-500' : 'border-[#EFEFEF]'} appearance-none focus:outline-none focus:ring-0 focus:border-black peer ${lexendDeca.className}`}
        placeholder=" "
        value={value}
        onChange={onChange}
      />
      <label
        htmlFor={name}
        className={`absolute text-sm ${error ? 'text-red-500' : 'text-[#8B929D]'} duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 ${lexendDeca.className}`}
      >
        {label}
      </label>
      {error && (
        <div className="absolute flex items-center">
          <div className="text-red-500 text-xs bg-white px-1 -mb-2">{error}</div>
        </div>
      )}
    </div>
  )
}

function PaymentOption({ id, name, selected, onChange, children }) {
  return (
    <div className="flex items-center justify-between py-4">
      <label className="flex items-center space-x-3 cursor-pointer">
        <div className="relative">
          <input
            type="radio"
            id={id}
            checked={selected}
            onChange={onChange}
            className="sr-only"
          />
          <div className={`w-5 h-5 border-2 rounded-full ${selected ? 'border-black bg-black' : 'border-gray-300'}`}>
            {selected && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </div>
        </div>
        <span className={`${jost.className}`}>{name}</span>
      </label>
      {children}
    </div>
  )
}

export default function Checkout() {
  const [isMounted, setIsMounted] = useState(false)
  const { cartItems } = useCartStore()
  const { rate, currencySymbol } = usePopupStore()
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
    country: "",
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [saveInfo, setSaveInfo] = useState(false)
  const [cardNumber, setCardNumber] = useState("")
  const [subscribeToNews, setSubscribeToNews] = useState(false)
  const [useSameAddress, setUseSameAddress] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [shippingMethod, setShippingMethod] = useState(null)
  const [showShippingDropdown, setShowShippingDropdown] = useState(false)
  const [filteredShippingOptions, setFilteredShippingOptions] = useState(shippingOptions)
  const [showPaymentOptions, setShowPaymentOptions] = useState(false)
  const shippingRef = useRef(null)
  const paymentRef = useRef(null)
  const [cardType, setCardType] = useState("")
  const router = useRouter()
  const [paypalOption, setPaypalOption] = useState("")
  const [klarnaOption, setKlarnaOption] = useState("")
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')



  const paypalOptions = [
    "Pay in full",
    "Pay in 4",
    "Pay monthly",
  ]

  const klarnaOptions = [
    "Pay in 30 days",
    "Pay in 3 installments",
    "6-36 month financing",
  ]

  const validateField = (name, value) => {
    let error = ""
    switch (name) {
      case "email":
        if (!value) {
          error = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Enter a valid email address"
        }
        break
      case "firstName":
      case "lastName":
      case "address":
      case "city":
      case "postcode":
      case "phone":
      case "country":
        if (!value) {
          error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
        }
        break
      case "cardNumber":
        if (!value) {
          error = "Card number is required"
        } else {
          const cleanedValue = value.replace(/\s/g, "")
          if (!/^\d{15,16}$/.test(cleanedValue)) {
            error = "Enter a valid 15 or 16-digit card number"
          } else if (
            cleanedValue.length === 15 &&
            cardType !== "american-express"
          ) {
            error = "This card number is invalid for the detected card type"
          } else if (
            cleanedValue.length === 16 &&
            cardType === "american-express"
          ) {
            error = "American Express cards should have 15 digits"
          }
        }
        break
      case "expirationDate":
        if (!value) {
          error = "Expiration date is required"
        } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
          error = "Enter a valid expiration date (MM/YY)"
        }
        break
      case "securityCode":
        if (!value) {
          error = "Security code is required"
        } else if (!/^\d{3,4}$/.test(value)) {
          error = "Enter a valid 3 or 4-digit security code"
        }
        break
      case "nameOnCard":
        if (!value) {
          error = "Name on card is required"
        }
        break
    }
    return error
  }

  const handlePayNow = () => {
    const requiredFields = ['firstName', 'lastName', 'address', 'city', 'postcode', 'phone', 'email', 'country']
    const newErrors = {}
    requiredFields.forEach(field => {
      const error = validateField(field, formData[field])
      if (error) {
        newErrors[field] = error
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      toast.error(`Please fill in all required fields`)
      return
    }

    if (!shippingMethod) {
      toast.error('Please select a shipping method')
      return
    }

    if (!paymentMethod) {
      toast.error('Please select a payment method')
      return
    }

    if (paymentMethod === 'card') {
      const cardFields = ['cardNumber', 'expirationDate', 'securityCode', 'nameOnCard']
      cardFields.forEach(field => {
        const error = validateField(field, formData[field])
        if (error) {
          newErrors[field] = error
        }
      })

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        toast.error(`Please fill in all card details correctly`)
        return
      }
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty')
      return
    }

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
          country: formData.country,
        },
        paymentMethod: paymentMethod,
        cardType: cardType,
        cardLastFour: formData.cardNumber ? formData.cardNumber.slice(-4) : null,
        cartItems: cartItems,
        subtotal: subtotal,
        shipping: shipping,
        total: total,
        shippingMethod: shippingMethod.name,
      }

      useCartStore.getState().setOrderDetails(orderDetails)
      toast.success('Order placed successfully!')
      
      router.push('/confirmation-successful')
    } catch (error) {
      console.error('Error processing order:', error)
      toast.error('There was an error processing your order. Please try again.')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))

    if (name === "cardNumber") {
      handleCardNumberChange(e)
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const handleShippingSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase()
    const filtered = shippingOptions.filter(
      (option) =>
        option.name.toLowerCase().includes(searchTerm) ||
        option.time.toLowerCase().includes(searchTerm)
    )
    setFilteredShippingOptions(filtered)
  }

  const selectShippingMethod = (method) => {
    setShippingMethod(method)
    setShowShippingDropdown(false)
  }

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + (parseFloat(item.price) || 0) * item.quantity,
      0
    )
  }

  const subtotal = calculateSubtotal()
  const shipping = shippingMethod ? shippingMethod.price : 0
  const total = subtotal + shipping

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shippingRef.current && !shippingRef.current.contains(event.target)) {
        setShowShippingDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s/g, "")
    setCardNumber(value)
    setFormData((prev) => ({ ...prev, cardNumber: formatCardNumber(value) }))

    if (value) {
      const detectedTypes = creditCardType(value)
      if (detectedTypes.length > 0) {
        setCardType(detectedTypes[0].type)
      } else {
        setCardType("")
      }
    } else {
      setCardType("")
    }

    setErrors((prev) => ({
      ...prev,
      cardNumber: validateField("cardNumber", value),
    }))
  }

  const getCardLogo = () => {
    switch (cardType) {
      case "visa":
        return visa
      case "mastercard":
        return master
      case "maestro":
        return maestro
      case "american-express":
        return ae
      default:
        return null
    }
  }

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method)
    setShowPaymentOptions(false)
    if (method === 'paypal') {
      setPaypalOption(paypalOptions[0])
    } else if (method === 'klarna') {
      setKlarnaOption(klarnaOptions[0])
    }
  }

  const handlePhoneChange = (value) => {
    setFormData(prev => ({ ...prev, phone: value }))
    setErrors(prev => ({ ...prev, phone: validateField("phone", value) }))
  }

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
                className={`bg-yellow-400 w-[48%] hover:bg-yellow-500 text-black px-4 py-2 rounded flex items-center justify-center ${jost.className}`}
              >
                <span className=" hidden sm:inline">Pay with{" "}</span>
                <span className="sm:ml-2  ">
                  <Image className="w-16" src={PayPal} alt="PayPal"   />
                </span>
              </button>
              <button
                className={`bg-[#FFB3C7] hover:bg-pink-500 w-[48%] text-black px-4 py-2 rounded flex items-center justify-center ${jost.className}`}
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
                </aside>
                <FloatingLabelInput
                  label="Email*"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                  error={errors.email}
                />
                <div className="flex items-center my-3">
                  <input
                    type="checkbox"
                    id="subscribe"
                    checked={subscribeToNews}
                    onChange={(e) => setSubscribeToNews(e.target.checked)}
                    className="mr-2 h-4 w-4 rounded border-gray-300 text-black focus:ring-black accent-black"
                  />
                  <label
                    className={`${lexendDeca.className} font-medium`}
                    htmlFor="subscribe"
                  >
                    Email me with news and offers
                  </label>
                </div>
              </div>

              {/* Delivery Section */}
              <div className="">
                <h2 className={`text-xl font-semibold mb-2 mt-20 ${jost.className}`}>
                  Delivery
                </h2>
                <FloatingLabelInput
                  label="Country/Region*"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  error={errors.country}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 mt-7 mb-4 gap-4">
                  <FloatingLabelInput
                    label="First Name*"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={errors.firstName}
                  />
                  <FloatingLabelInput
                    label="Last Name*"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={errors.lastName}
                  />
                </div>
                <FloatingLabelInput
                  label="Address*"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  error={errors.address}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-7 mb-4">
                  <FloatingLabelInput
                    label="City*"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    error={errors.city}
                  />
                  <FloatingLabelInput
                    label="Postcode*"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    error={errors.postcode}
                  />
                </div>
                <div className="relative">
      <PhoneInput
        country={'gb'}
        value={phone}
        onChange={handlePhoneChange}
        inputProps={{
          name: 'phone',
          required: true,
          className: `block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border ${error ? 'border-red-500' : 'border-[#EFEFEF]'} appearance-none focus:outline-none focus:ring-0 focus:border-black peer pl-14 ${lexendDeca.className}`,
        }}
        containerClass="w-full"
        buttonClass="h-full !bg-[#F7F7F7A6] hover:!bg-[#F7F7F7A6] focus:!bg-[#F7F7F7A6] active:!bg-[#F7F7F7A6] border-none rounded-l-lg"
        dropdownClass="!bg-white"
      />
      {/* <label
        htmlFor="phone"
        className={`absolute text-sm ${error ? 'text-[#BF0000]' : 'text-gray-500'} duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#F7F7F7A6] px-2 peer-focus:px-2 peer-focus:text-black start-1 ${
          phone ? 'invisible' : 'visible'
        } ${lexendDeca.className}`}
      >
        Phone*
      </label> */}
      {error && (
        <div className="text-[#BF0000] text-xs mt-1">{error}</div>
      )}
      <style jsx global>{`
        .react-tel-input .flag-dropdown {
          border: none !important;
          background-color: #F7F7F7A6 !important;
        }
        .react-tel-input .selected-flag {
          background-color: #F7F7F7A6 !important;
          border-top-left-radius: 0.5rem;
          border-bottom-left-radius: 0.5rem;
        }
        .react-tel-input .selected-flag:hover,
        .react-tel-input .selected-flag:focus,
        .react-tel-input .selected-flag.open {
          background-color: #F7F7F7A6 !important;
        }
        .react-tel-input .form-control {
          width: 100% !important;
        }
      `}</style>
    </div>
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="textSubscribe"
                    checked={subscribeToNews}
                    onChange={(e) => setSubscribeToNews(e.target.checked)}
                    className="mr-2 h-4 w-4 rounded border-gray-300 text-black focus:ring-black accent-black"
                  />
                  <label
                    className={`${lexendDeca.className} font-medium`}
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
                  <button
                    onClick={() => setShowPaymentOptions(true)}
                    className={`text-[#8B929D] ${jost.className} underline`}
                  >
                    Change Payment
                  </button>
                </div>

                <div className="space-y-4 border rounded-md p-4">
                  {showPaymentOptions ? (
                    <>
                      <div className="border-b pb-4">
                        <PaymentOption
                          id="card"
                          name={<span className={`${lexendDeca.className}`} style={{ fontWeight: 400 }}>Pay by card</span>}
                          selected={paymentMethod === "card"}
                          onChange={() => handlePaymentMethodChange("card")}
                        >
                          <div className="flex space-x-2">
                            <Image src={visa} alt="Visa" width={32} height={20} />
                            <Image src={master} alt="Mastercard" width={32} height={20} />
                            <Image src={maestro} alt="Maestro" width={32} height={20} />
                            <Image src={ae} alt="American Express" width={32} height={20} />
                          </div>
                        </PaymentOption>
                      </div>

                      <div className="border-b pb-4">
                        <PaymentOption
                          id="paypal"
                          name={<span className={`${lexendDeca.className}`} style={{ fontWeight: 400 }}>PayPal</span>}
                          selected={paymentMethod === "paypal"}
                          onChange={() => handlePaymentMethodChange("paypal")}
                        >
                          <Image src={paypal} alt="PayPal" width={64} height={20} />
                        </PaymentOption>
                      </div>

                      <div>
                        <PaymentOption
                          id="klarna"
                          name={<span className={`${lexendDeca.className}`} style={{ fontWeight: 400 }}>Klarna - Flexible payments</span>}
                          selected={paymentMethod === "klarna"}
                          onChange={() => handlePaymentMethodChange("klarna")}
                        >
                          <Image src={klarna_pink} alt="Klarna" width={64} height={20} />
                        </PaymentOption>
                      </div>
                    </>
                  ) : (
                    <div>
                      {paymentMethod === "card" && (
                        <div className="border-b pb-4">
                          <PaymentOption
                            id="card"
                            name={<span className={`${lexendDeca.className}`} style={{ fontWeight: 400 }}>Pay by card</span>}
                            selected={true}
                            onChange={() => {}}
                          >
                            <div className="flex space-x-2">
                              <Image src={visa} alt="Visa" width={32} height={20} />
                              <Image src={master} alt="Mastercard" width={32} height={20} />
                              <Image src={maestro} alt="Maestro" width={32} height={20} />
                              <Image src={ae} alt="American Express" width={32} height={20} />
                            </div>
                          </PaymentOption>
                          <div className="mt-4 space-y-4">
                            <FloatingLabelInput
                              label="Card number*"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleCardNumberChange}
                              error={errors.cardNumber}
                            />
                            <div className="flex items-center gap-4">
                              <div className="relative w-1/2">
                                <FloatingLabelInput
                                  label="Expiration date (MM / YY)*"
                                  name="expirationDate"
                                  value={formData.expirationDate}
                                  onChange={handleInputChange}
                                  error={errors.expirationDate}
                                  className="pr-12"
                                />
                              </div>
                              <div className="relative w-1/2">
                                <FloatingLabelInput
                                  label="Security code*"
                                  name="securityCode"
                                  value={formData.securityCode}
                                  onChange={handleInputChange}
                                  error={errors.securityCode}
                                  className="pr-12"
                                />
                              </div>
                            </div>
                            <FloatingLabelInput
                              label="Name on card*"
                              name="nameOnCard"
                              value={formData.nameOnCard}
                              onChange={handleInputChange}
                              error={errors.nameOnCard}
                            />
                            <div className="flex items-center my-3">
                              <input
                                type="checkbox"
                                id="useSameAddress"
                                checked={useSameAddress}
                                onChange={(e) => setUseSameAddress(e.target.checked)}
                                className="mr-2 h-4 w-4 rounded border-gray-300 text-black focus:ring-black accent-black"
                              />
                              <label
                                className={`${lexendDeca.className} font-medium`}
                                htmlFor="useSameAddress"
                              >
                                Use shipping address as billing address
                              </label>
                            </div>
                          </div>
                        </div>
                      )}
                      {paymentMethod === "paypal" && (
                        <div className="border-b pb-4">
                          <PaymentOption
                            id="paypal"
                            name={<span className={`${lexendDeca.className}`} style={{ fontWeight: 400 }}>PayPal</span>}
                            selected={true}
                            onChange={() => {}}
                          >
                            <Image src={paypal} alt="PayPal" width={64} height={20} />
                          </PaymentOption>
                          <div className="mt-4">
                            <p className={`text-sm 2xl:text-[16px] w-[70%] text-center mx-auto text-black ${lexendDeca.className}`}>
                              After clicking &quot;Pay now&quot;, you will be redirected to PayPal to complete your purchase securely.
                            </p>
                          </div>
                        </div>
                      )}
                      {paymentMethod === "klarna" && (
                        <div>
                          <PaymentOption
                            id="klarna"
                            name={<span className={`${lexendDeca.className}`} style={{ fontWeight: 400 }}>Klarna - Flexible payments</span>}
                            selected={true}
                            onChange={() => {}}
                          >
                            <Image src={klarna_pink} alt="Klarna" width={64} height={20} />
                          </PaymentOption>
                          <div className="mt-4 space-y-4">
                            <div className="flex justify-center gap-6 items-center space-x-2">
                              <Image src={klarna_wal} alt="Klarna Wallet" width={130} height={130} />
                            </div>
                            <p className={`text-sm font-normal mx-auto text-center max-w-[70%] text-black ${lexendDeca.className}`}>
                              After clicking &quot;Pay now&quot;, you will be redirected to Klarna - Flexible payments to complete your purchase securely.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
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
                  className="mr-2 h-4 w-4 rounded border-gray-300 text-black focus:ring-black accent-black"
                />
                <label
                  htmlFor="save-info"
                  className={` text-[#8B929D] ${lexendDeca.className}`}
                >
                  Save my information for a faster checkout
                </label>
              </div>

              {/* Pay Now Button */}
              <button
                onClick={handlePayNow}
                className={`w-full rounded-lg bg-black text-white mt-4 hover:bg-[#CF8562] transition duration-300 py-3 md:rounded ${jost.className} uppercase`}
              >
                PAY NOW
              </button>
              <p className={`${lexendDeca.className} 2xl:text-[20px] font-normal  w-full`}>By placing this order, you are confirming that you agree to our <span className="underline">Terms and Conditions</span>  and  <span className="underline">Privacy Policy</span>.
          </p>

            </div>
          </div>
         
          {/* Right: Order Summary and Bag Summary */}
          <div className="lg:w-1/3 bg-gray-50 p-6 rounded-lg lg:-mt-24">
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
                    ${cartItems.length > 1 ? "max-h-[300px] overflow-y-auto pr-2" : ""}
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
                      className={`flex justify-between ${
                        cartItems.length > 1 ? "border-b py-2" : "py-2"
                      }`}
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
  )
}