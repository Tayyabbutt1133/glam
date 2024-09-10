'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useCartStore } from '../../../states/Cardstore'
import visa from "../../../public/card-logos/visa.svg"
import master from "../../../public/card-logos/master.svg"
import maestro from "../../../public/card-logos/maestro.svg"
import ae from "../../../public/card-logos/american-express.svg"
import paypal from "../../../public/card-logos/paypal.svg"
import { jost, lexendDeca } from '../../../components/ui/fonts'
import Link from 'next/link'

export default function MyBag() {
  const { cartItems, removeFromCart, updateQuantity, saveForLater, editItem } = useCartStore()
  const [promoCode, setPromoCode] = useState('')

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)
  }

  const subtotal = calculateSubtotal()
  const shipping = 0 // Free shipping
  const total = subtotal + shipping

  const recommendedProducts = [
    { id: 1, name: 'Bourjois 2 in 1 Khol & Contour Eyeliner, Eye Pencil', brand: 'BOURJOIS', price: '£8.40', oldPrice: '£12.00', image: '/placeholder.svg' },
    { id: 2, name: 'Foundation and Concealer', brand: 'CLINIQUE', price: '£2.99', image: '/placeholder.svg' },
    { id: 3, name: 'NARS Matte Kissproof Lipstick', brand: 'NARS', price: '£20.25', oldPrice: '£22.50', image: '/placeholder.svg' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4 w-[65%]">
              <p className={`text-sm text-black ${jost.className} font-medium`}>Log in or create an account now to get these exclusive benefits.</p>
              <div>
                  <Link href="/signup">
            <button className={`mr-4 ${jost.className} text-sm text-gray-800 border border-gray-300 px-4 py-2 font-medium rounded-md`}>Register</button>
                  </Link>
                  <Link href="/login">
            <button className={`text-sm font-medium text-gray-800 border border-gray-300 px-4 py-2 rounded-md ${jost.className}`}>Log In</button>
                      </Link>
        </div>
      </div>
         <hr className='h-2' />
      <div className="flex justify-between items-center mb-6 mt-4">
        <h1 className={`text-3xl font-medium ${jost.className}`}>Your Bag ({cartItems.length})</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-start md:items-center border-b border-gray-200 py-6">
              <Image 
                src={item.images[0].src} 
                alt={item.name} 
                width={200} 
                height={200} 
                className="rounded-md object-cover"
              />
              <div className="ml-4 flex-grow">
                {/* Product Name and Price */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className={`text-lg font-medium w-[80%] ${jost.className}`}>{item.name}</h2>
                    <p className={`text-sm text-black ${jost.className} font-normal`}>Shade: {item.attributes.find(attr => attr.name === 'Shade')?.options[0] || 'N/A'}</p>
                    <p className={`text-sm text-black ${jost.className} font-normal`}>Size: {item.attributes.find(attr => attr.name === 'Size')?.options[0] || 'N/A'}</p>
                  </div>
                  <p className={`font-semibold text-lg ${jost.className}`}>£{(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                </div>

                {/* Product Quantity Controls and Action Buttons */}
                <div className="mt-24 flex items-center justify-between">
                  {/* Add/Subtract Product Buttons */}
                  <div className="flex items-center space-x-2">
                    <button className="text-sm border border-gray-300 px-3 py-1 rounded-md" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</button>
                    <span className="text-sm mx-2">{item.quantity}</span>
                    <button className="text-sm border border-gray-300 px-3 py-1 rounded-md" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>

                  {/* Action Buttons */}
                  <div className="ml-auto space-x-4">
                    {/* Save For Later */}
                    <button className={`text-sm text-black ${jost.className} font-medium`} onClick={() => saveForLater(item.id)}>Save For Later</button>

                    {/* Edit */}
                    <button className={`text-sm text-black ${jost.className} font-medium`} onClick={() => editItem(item.id)}>Edit</button>

                    {/* Remove */}
                    <button className={`text-sm text-black ${jost.className} font-medium`} onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            </div>
          ))}


          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {recommendedProducts.map((product) => (
                <div key={product.id} className="border rounded-md p-4">
                  <Image src={product.image} alt={product.name} width={200} height={200} className="mx-auto mb-2 object-cover" />
                  <p className="font-semibold">{product.brand}</p>
                  <p className="text-sm">{product.name}</p>
                  <div className="flex justify-between items-center mt-2">
                    {product.oldPrice && <span className="text-xs line-through text-gray-500">{product.oldPrice}</span>}
                    <span className="text-sm font-semibold">{product.price}</span>
                  </div>
                  <button className="w-full bg-gray-800 text-white py-2 mt-2 rounded-md">ADD TO BAG</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:w-1/3 -mt-32 bg-[#f7f7f7]">
                  <div className=" p-2 rounded-lg">
                      <div className='bg-white p-4 rounded-lg mt-4'>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal ({cartItems.length}):</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Estimated Shipping:</span>
              <span className="text-blue-500 cursor-pointer">Enter shipping address</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">(Spend £0.01 more for FREE DELIVERY)</p>
            <div className="flex justify-between font-semibold">
              <span>Estimated Total:</span>
              <span>£{total.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Including £3.20 in taxes</p>
            </div>
                      


            <div className="mt-4 bg-white p-6 rounded-lg">
              <label htmlFor="promo" className="block text-sm font-medium text-gray-700 mb-1">Promo code</label>
              <div className="flex">
                <input
                  type="text"
                  id="promo"
                  className="flex-grow border rounded-l-md px-3 py-2"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter the code"
                />
                <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-r-md">Apply</button>
              </div>
            </div>

            <div className="mt-6 bg-white p-6 rounded-lg">
              <p className="mb-2">Payment Mode</p>
                          <div className="flex space-x-2 mb-4">
                              <p>Pay by Card/Pay Later</p>
                <Image src={visa} alt="Visa" width={40} height={25} />
                <Image src={master} alt="Master" width={40} height={25} />
                <Image src={maestro} alt="Maestro" width={40} height={25} />
                <Image src={ae} alt="American Express" width={40} height={25} />
                <Image src={paypal} alt="PayPal" width={40} height={25} />
              </div>
                          <button className={`bg-black ${jost.className} uppercase text-white w-full py-3 rounded-md`}>
               Checkout Securely
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
