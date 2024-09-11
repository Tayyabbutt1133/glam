'use client';

import Image from 'next/image';
import { useCartStore } from '../../../states/Cardstore';
import { useState } from 'react';
import { jost } from '../../../components/ui/fonts';
import Link from 'next/link';

export default function Checkout() {
  const { cartItems } = useCartStore(); // Get cart items from store
  const [promoCode, setPromoCode] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [phone, setPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);

  // Function to calculate subtotal, defaulting prices to 0 if undefined
  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      const itemPrice = parseFloat(item.price) || 0; // Safely handle price
      return acc + itemPrice * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = 0; // Assuming free shipping for now
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-14 py-8">
      <h1 className={`text-3xl font-medium mb-6 ${jost.className}`}>Checkout</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Checkout Form */}
        <div className="md:w-2/3 space-y-6">
          {/* Header with Payment Options */}
          <div className="flex justify-between mb-6">
            <button className="bg-yellow-400 px-4 py-2 rounded-md font-medium">
              Pay with PayPal
            </button>
            <button className="bg-pink-400 px-4 py-2 rounded-md font-medium">
              Klarna. Express Checkout
            </button>
          </div>

          <div className="space-y-4">
            <p className="text-center">OR</p>

            {/* Contact Section */}
            <div>
              <label className="block mb-2">Contact</label>
              <input
                type="email"
                className="w-full border rounded px-4 py-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="mt-2">
                <input
                  type="checkbox"
                  id="subscribe"
                  className="mr-2"
                />
                <label htmlFor="subscribe">Email me with news and offers</label>
              </div>
            </div>

            {/* Delivery Section */}
            <div>
              <label className="block mb-2">Delivery</label>
              <input
                type="text"
                className="w-full border rounded px-4 py-2 mb-2"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                className="w-full border rounded px-4 py-2 mb-2"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="text"
                className="w-full border rounded px-4 py-2 mb-2"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                type="text"
                className="w-full border rounded px-4 py-2 mb-2"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                type="text"
                className="w-full border rounded px-4 py-2 mb-2"
                placeholder="Postcode"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
              />
              <input
                type="text"
                className="w-full border rounded px-4 py-2 mb-2"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Shipping Method */}
            <div>
              <label className="block mb-2">Shipping Method</label>
              <p>Enter your shipping address to view available shipping methods.</p>
            </div>

            {/* Payment Section */}
            <div>
              <label className="block mb-2">Payment</label>
              <div className="space-y-4">
                <div className="flex items-center mb-2">
                  <input type="radio" className="mr-2" id="pay-card" checked />
                  <label htmlFor="pay-card">Pay by card</label>
                </div>
                <input
                  type="text"
                  className="w-full border rounded px-4 py-2"
                  placeholder="Card number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
                <input
                  type="text"
                  className="w-full border rounded px-4 py-2"
                  placeholder="Expiration date (MM/YY)"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                />
                <input
                  type="text"
                  className="w-full border rounded px-4 py-2"
                  placeholder="Security code"
                  value={securityCode}
                  onChange={(e) => setSecurityCode(e.target.value)}
                />
                <input
                  type="text"
                  className="w-full border rounded px-4 py-2"
                  placeholder="Name on card"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                />
                <div className="mt-2">
                  <input type="checkbox" id="same-address" className="mr-2" />
                  <label htmlFor="same-address">Use shipping address as billing address</label>
                </div>
              </div>
            </div>

            {/* Remember Me */}
            <div className="mt-4">
              <input
                type="checkbox"
                id="save-info"
                className="mr-2"
                checked={saveInfo}
                onChange={() => setSaveInfo(!saveInfo)}
              />
              <label htmlFor="save-info">Save my information for a faster checkout</label>
            </div>

            {/* Pay Now Button */}
            <button className="bg-black text-white w-full py-3 rounded-md">PAY NOW</button>

            {/* Terms */}
            <p className="text-sm text-gray-600 mt-4 text-center">
              By placing this order, you are confirming that you agree to our <a href="#" className="text-blue-500">Terms and Conditions</a> and <a href="#" className="text-blue-500">Privacy Policy</a>.
            </p>
          </div>
        </div>

        {/* Right: Order Summary and Bag Summary */}
        <div className="md:w-1/3 bg-[#f7f7f7] p-6 rounded-lg">
          <div className="bg-white p-6 rounded-lg">
            <h2 className={`text-xl font-normal mb-4 ${jost.className}`}>Order Summary</h2>

            {/* Subtotal */}
            <div className={`flex justify-between mb-2 ${jost.className}`}>
              <span>Subtotal ({cartItems.length} items):</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>

            {/* Shipping (Assuming it's free for now) */}
            <div className={`flex justify-between mb-2 ${jost.className}`}>
              <span>Shipping:</span>
              <span>Free</span>
            </div>

            {/* Total */}
            <div className={`flex justify-between font-semibold mb-4 ${jost.className}`}>
              <span>Total:</span>
              <span>£{total.toFixed(2)}</span>
            </div>

            {/* Promo Code */}
            <div className="mb-4">
              <label htmlFor="promo" className="block text-sm font-medium text-gray-700 mb-1">
                Promo Code
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="promo"
                  className="flex-grow border rounded-l-md px-3 py-2"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                />
                <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-r-md">
                  Apply
                </button>
              </div>
            </div>

            {/* Bag Summary */}
            {/* Bag Summary */}
<div>
  <h2 className={`text-lg font-normal mb-2 ${jost.className}`}>Bag Summary</h2>
  <ul className="space-y-4">
    {cartItems.map((item, index) => (
      <li key={index} className="flex justify-between items-center border-b py-2">
        <div className="flex items-center">
          {item.imageUrl && item.imageUrl[0] && item.imageUrl[0].src ? (
            <Image
              src={item.imageUrl[0].src}
              alt={item.name}
              width={50}
              height={50}
              className="mr-4"
            />
          ) : (
            <div className="mr-4 bg-gray-200 flex items-center justify-center" style={{ width: '50px', height: '50px' }}>
              {/* Placeholder for missing image */}
              <span>No Image</span>
            </div>
          )}
          <div>
            <p className={`font-medium ${jost.className}`}>{item.name}</p>
            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
          </div>
        </div>
        <div className={`font-medium ${jost.className}`}>£{item.price}</div>
      </li>
    ))}
  </ul>
</div>

          </div>
        </div>
      </div>
    </div>
  );
}
