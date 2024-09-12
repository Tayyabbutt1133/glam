'use client'

import Image from 'next/image'
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react'
import creditCardType from 'credit-card-type';
import { useCartStore } from '../../../states/Cardstore'
import { jost, lexendDeca } from '../../../components/ui/fonts'
import Container from '../../../components/container'
import PayPal from '../../../public/PayPal.svg'
import Klarna from '../../../public/Klarna.svg'
import visa from "../../../public/card-logos/visa.svg"
import master from "../../../public/card-logos/master.svg"
import maestro from "../../../public/card-logos/maestro.svg"
import ae from "../../../public/card-logos/american-express.svg"
import paypal from "../../../public/card-logos/paypal.svg"
import klarna_wal from '../../../public/Klarnawallet.svg'
import klarna_pink from '../../../public/klarn_pink.svg';

const shippingOptions = [
  { id: 1, name: 'Standard Delivery', time: '(Arrives between 20 June - 31 June)', price: 4.50 },
  { id: 2, name: 'DPD Next Day Delivery', time: '(Arrives tomorrow, 21 June before 3:00pm)', price: 4.99 },
  { id: 3, name: 'Royal Mail Tracked - 24 hrs', time: '(Arrives tomorrow, 21 June before 5:00pm)', price: 4.99 },
  { id: 4, name: 'Royal Mail Tracked - 48 hrs', time: '(Arrives between 24 June - 25 June)', price: 4.99 },
  { id: 5, name: 'Royal Mail Special Delivery', time: '(Arrives tomorrow, 20 June before 11:00am)', price: 5.99 },
]

export default function Checkout() {
  const { cartItems } = useCartStore()
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postcode: '',
    phone: '',
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    nameOnCard: '',
    promoCode: '',
  })
  const [saveInfo, setSaveInfo] = useState(false)
  const [subscribeToNews, setSubscribeToNews] = useState(false)
  const [useSameAddress, setUseSameAddress] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [shippingMethod, setShippingMethod] = useState(null)
  const [showShippingDropdown, setShowShippingDropdown] = useState(false)
  const [filteredShippingOptions, setFilteredShippingOptions] = useState(shippingOptions)
  const [showPaymentOptions, setShowPaymentOptions] = useState(true)
  const shippingRef = useRef(null)
  const paymentRef = useRef(null)
  const [cardType, setCardType] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    if (name === 'cardNumber') {
      const detectedTypes = creditCardType(value)
      if (detectedTypes.length > 0) {
        setCardType(detectedTypes[0].type)
      } else {
        setCardType('')
      }
    }
  }

  const handleShippingSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase()
    const filtered = shippingOptions.filter(option => 
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
    return cartItems.reduce((acc, item) => acc + (parseFloat(item.price) || 0) * item.quantity, 0)
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

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const getCardLogo = () => {
    switch (cardType) {
      case 'visa':
        return visa
      case 'mastercard':
        return master
      case 'maestro':
        return maestro
      case 'american-express':
        return ae
      default:
        return null
    }
  }

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method)
    setShowPaymentOptions(false)
  }

  return (
    <Container>
      <div className='flex justify-between w-[65%] mt-16 items-center'>
        <h1 className={`text-3xl font-semibold mb-6 ${jost.className}`}>Checkout</h1>
        <div className='flex items-center gap-4'>
          <p className={`${jost.className}`}>Have an account ?</p>
          <Link href="./login">
            <button className={`border rounded-lg p-1 px-4 hover:bg-slate-200 ${jost.className}`}>Log in For Faster Checkout</button>
          </Link>
        </div>
      </div>
      <div className="container px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Checkout Form */}
          <div className="lg:w-2/3 space-y-6">
            {/* Header with Payment Options */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <button className={`bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded flex items-center justify-center ${jost.className}`}>
                Pay with <span className='ml-2'><Image src={PayPal} alt="PayPal" /></span>
              </button>
              <button className={`bg-[#FFB3C7] hover:bg-pink-500 text-black px-4 py-2 rounded flex items-center justify-center ${jost.className}`}>
                <span className='mr-2'><Image src={Klarna} alt="Klarna" /></span> Express Checkout
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-center my-4">
                <hr className="flex-grow border-t border-gray-300" />
                <span className={`px-3 text-gray-500 text-sm ${lexendDeca.className}`}>OR</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>

              {/* Contact Section */}
              <div>
                <h2 className={`text-xl font-semibold mb-2 ${jost.className}`}>Contact</h2>
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full border rounded px-3 py-2 ${lexendDeca.className}`}
                />
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="subscribe"
                    checked={subscribeToNews}
                    onChange={(e) => setSubscribeToNews(e.target.checked)}
                    className="mr-2"
                  />
                  <label className={`${lexendDeca.className}`} htmlFor="subscribe">
                    Email me with news and offers
                  </label>
                </div>
              </div>

              {/* Delivery Section */}
              <div className=''>
                <h2 className={`text-xl font-semibold mb-2 mt-20 ${jost.className}`}>Delivery</h2>
                <input
                  name="country"
                  placeholder="Country/Region*"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={`w-full border rounded px-3 py-2 mb-4 ${lexendDeca.className}`}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    name="firstName"
                    placeholder="First Name*"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full border ${lexendDeca.className} rounded px-3 py-2`}
                  />
                  <input
                    name="lastName"
                    placeholder="Last Name*"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full border rounded px-3 py-2 ${lexendDeca.className}`}
                  />
                </div>
                <input
                  name="address"
                  placeholder="Address*"
                  className={`w-full border rounded px-3 py-2 mt-4 ${lexendDeca.className}`}
                  value={formData.address}
                  onChange={handleInputChange}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <input
                    name="city"
                    placeholder="City*"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full border rounded px-3 py-2 ${lexendDeca.className}`}
                  />
                  <input
                    name="postcode"
                    placeholder="Postcode*"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    className={`w-full ${lexendDeca.className} border rounded px-3 py-2`}
                  />
                </div>
                <input
                  name="phone"
                  placeholder="Phone*"
                  className={`w-full border rounded px-3 py-2 ${lexendDeca.className} mt-4`}
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="textSubscribe"
                    checked={subscribeToNews}
                    onChange={(e) => setSubscribeToNews(e.target.checked)}
                    className="mr-2"
                  />
                  <label className={`${lexendDeca.className}`} htmlFor="textSubscribe">
                    Text me with news and offers
                  </label>
                </div>
              </div>

              {/* Shipping Method */}
              <div ref={shippingRef}>
                <h2 className={`text-xl font-semibold mb-2 mt-20 ${jost.className}`}>Shipping Method</h2>
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
                            <div className='flex items-center gap-2'>
                              <p className={`font-normal text-black ${lexendDeca.className}`}>{option.name}</p>
                              <p className={`text-sm text-gray-600 ${lexendDeca.className}`}>{option.time}</p>
                            </div>
                            <p className={`font-semibold ${lexendDeca.className}`}>£{option.price.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {shippingMethod && (
                  <div className={`mt-2 ${jost.className}`}>
                    <p>Selected: {shippingMethod.name} - £{shippingMethod.price.toFixed(2)}</p>
                  </div>
                )}
              </div>

              {/* Payment Section */}
              <div ref={paymentRef}>
                <div className={`flex justify-between items-center mb-4 mt-20`}>
                  <h2 className={`text-xl font-semibold ${jost.className}`}>Payment</h2>
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
                        checked={paymentMethod === 'card'}
                        onChange={() => handlePaymentMethodChange('card')}
                        className="form-radio"
                      />
                      <span className={`${jost.className}`}>Pay by card</span>
                      <div className="flex space-x-2 ml-auto">
                        <Image src={visa} alt="Visa" width={32} height={20} />
                        <Image src={master} alt="Mastercard" width={32} height={20} />
                        <Image src={maestro} alt="Maestro" width={32} height={20} />
                        <Image src={ae} alt="American Express" width={32} height={20} />
                      </div>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        checked={paymentMethod === 'paypal'}
                        onChange={() => handlePaymentMethodChange('paypal')}
                        className="form-radio"
                      />
                      <span className={`${jost.className}`}>PayPal</span>
                      <Image src={paypal} alt="PayPal" width={64} height={20} className="ml-auto" />
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        checked={paymentMethod === 'klarna'}
                        onChange={() => handlePaymentMethodChange('klarna')}
                        className="form-radio"
                      />
                      <span className={`${jost.className}`}>Klarna - Flexible payments</span>
                      <Image src={klarna_pink} alt="Klarna" width={64} height={20} className="ml-auto" />
                    </label>
                  </div>
                ) : (
                  <div className="border rounded-md p-4">
                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className={`font-medium ${jost.className}`}>Pay by card</span>
                          <div className="flex space-x-2">
                            <Image src={visa} alt="Visa" width={32} height={20} />
                            <Image src={master} alt="Mastercard" width={32} height={20} />
                            <Image src={maestro} alt="Maestro" width={32} height={20} />
                            <Image src={ae} alt="American Express" width={32} height={20} />
                          </div>
                        </div>
                        <div className="relative">
                          <input
                            type="text"
                            name="cardNumber"
                            placeholder="Card number*"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className={`w-full p-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${lexendDeca.className}`}
                          />
                          {cardType && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <Image src={getCardLogo()} alt={cardType} width={32} height={20} />
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-4">
                          <input
                            type="text"
                            name="expirationDate"
                            placeholder="Expiration date (MM/YY)*"
                            value={formData.expirationDate}
                            onChange={handleInputChange}
                            className={`w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${lexendDeca.className}`}
                          />
                          <input
                            type="text"
                            name="securityCode"
                            placeholder="Security code*"
                            value={formData.securityCode}
                            onChange={handleInputChange}
                            className={`w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${lexendDeca.className}`}
                          />
                        </div>
                        <input
                          type="text"
                          name="nameOnCard"
                          placeholder="Name on card*"
                          value={formData.nameOnCard}
                          onChange={handleInputChange}
                          className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${lexendDeca.className}`}
                        />
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={useSameAddress}
                            onChange={() => setUseSameAddress(!useSameAddress)}
                            className="form-checkbox"
                          />
                          <span className={`${lexendDeca.className}`}>Use shipping address as billing address</span>
                        </label>
                      </div>
                    )}
                    {paymentMethod === 'paypal' && (
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${jost.className}`}>PayPal</span>
                        <Image src={paypal} alt="PayPal" width={64} height={20} />
                      </div>
                    )}
                    {paymentMethod === 'klarna' && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className={`font-medium ${jost.className}`}>Klarna - Flexible payments</span>
                          <Image src={klarna_pink} alt="Klarna" width={64} height={20} />
                        </div>
                        <Image src={klarna_wal} alt="Klarna Wallet" width={200} height={200} className="mx-auto" />
                        <p className={`${lexendDeca.className} mt-4 text-sm text-center mx-auto w-[80%]`}>
                          After clicking "Pay now", you will be redirected to Klarna to set up your flexible payment plan.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Remember Me */}
              <h1 className={`${jost.className} text-xl font-semibold`}>Remember Me</h1>
              <div className="flex items-center border rounded-lg p-2">
             
                <input
                  type="checkbox"
                  id="save-info"
                  checked={saveInfo}
                  onChange={(e) => setSaveInfo(e.target.checked)}
                  className="mr-2"
                />
               
                <label htmlFor="save-info" className={` text-[#8B929D] ${lexendDeca.className}`}>
                  Save my information for a faster checkout
                </label>
              </div>

              {/* Pay Now Button */}
              <button className={`w-full bg-black text-white hover:bg-gray-800 py-3 rounded ${jost.className} uppercase`}>
                PAY NOW
              </button>

              {/* Terms */}
              <p className={`text-sm text-gray-600 mt-4 text-center ${lexendDeca.className}`}>
                By placing this order, you are confirming that you agree to our{' '}
                <a href="#" className="text-black underline">
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-black underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>

          {/* Right: Order Summary and Bag Summary */}
          <div className="lg:w-1/3 bg-gray-50  p-6 rounded-lg -mt-24">
            <div className=" ">
              <div className=' bg-white rounded-lg p-6 shadow-sm'>
              <h2 className={`text-xl font-semibold mb-4 ${jost.className}`}>Order Summary</h2>

              {/* Subtotal */}
              <div className={`flex justify-between mb-2 ${jost.className}`}>
                <span>Subtotal ({cartItems.length} items):</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>

              {/* Shipping */}
              <div className={`flex justify-between mb-2 ${jost.className}`}>
                <span>Shipping:</span>
                <span>{shipping ? `£${shipping.toFixed(2)}` : 'Free'}</span>
              </div>
              <hr />
              {/* Total */}
              <div className={`flex justify-between mt-4 font-semibold mb-4 ${jost.className}`}>
                <span> Estimated Total:</span>
                <span>£{total.toFixed(2)}</span>
              </div>
               
              {/* Promo Code */}
              {/* <div className="mb-4">
                <label htmlFor="promo" className={`block text-sm font-medium text-gray-700 mb-1 ${jost.className}`}>
                  Promo Code
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="promo"
                    name="promoCode"
                    className={`flex-grow border rounded-l px-3 py-2 ${lexendDeca.className}`}
                    value={formData.promoCode}
                    onChange={handleInputChange}
                    placeholder="Enter promo code"
                  />
                  <button className={`bg-gray-200 text-gray-600 hover:bg-gray-300 px-4 py-2 rounded-r ${jost.className}`}>
                    Apply
                  </button>
                </div>
              </div> */}
              </div>


              {/* Bag Summary */}
              <div className='bg-white rounded-lg p-6 shadow-sm mt-12'>
                <h2 className={`text-lg  font-semibold mb-2 ${jost.className}`}>Bag Summary</h2>
                <ul className="space-y-4">
                  {cartItems.map((item, index) => (
                    <li key={index} className="flex flex-col justify-between border-b py-2">
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
                            <span className="text-xs text-gray-500">No Image</span>
                          </div>
                        )}
                        <div>
                          <p className={`font-medium ${jost.className}`}>{item.name}</p>
                          <p className={`text-sm text-black ${jost.className} font-normal`}>
                            Shade: {item.attributes.find((attr) => attr.name === "Shade")?.options[0] || "N/A"}
                          </p>
                          <p className={`text-sm text-black ${jost.className} font-normal`}>
                            Size: {item.attributes.find((attr) => attr.name === "Size")?.options[0] || "N/A"}
                          </p>
                          <p className={`text-sm text-gray-500 ${lexendDeca.className}`}>Qty: {item.quantity}</p>
                          <div className={`font-medium ${jost.className}`}>£{parseFloat(item.price).toFixed(2)}</div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}