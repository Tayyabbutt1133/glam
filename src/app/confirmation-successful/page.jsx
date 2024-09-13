'use client'

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useCartStore } from "../../../states/Cardstore"
import { jost, lexendDeca } from "../../../components/ui/fonts"
import Container from "../../../components/container"
import cart from '../../../public/CartSuccess.svg'
import visa from "../../../public/card-logos/visa.svg"
import master from "../../../public/card-logos/master.svg"
import maestro from "../../../public/card-logos/maestro.svg"
import ae from "../../../public/card-logos/american-express.svg"

export default function OrderConfirmation() {
  const { clearCart, getOrderDetails } = useCartStore()
  const [orderNumber, setOrderNumber] = useState("")
  const [orderDate, setOrderDate] = useState("")
  const [orderDetails, setOrderDetails] = useState(null)

  useEffect(() => {
    setOrderNumber(Math.floor(100000 + Math.random() * 900000).toString())
    setOrderDate(new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' }))
    const details = getOrderDetails()
    setOrderDetails(details)
    clearCart()
  }, [clearCart, getOrderDetails])

  if (!orderDetails) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  const getCardLogo = (cardType) => {
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

  return (
    <Container>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Image src={cart} alt="Order Success" width={140} height={140} />
          </div>
          <h1 className={`text-3xl font-semibold mb-2 ${jost.className}`}>Thank You, Order Submitted Successfully!</h1>
          <p className={`text-gray-600 ${lexendDeca.className}`}>
            Your order has been submitted. Track its status in the <Link href="/my-orders" className="text-blue-600 hover:underline">MY ORDERS</Link> section of your profile.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <div className="mb-6">
              <div className="justify-between flex items-center">
                <p className={`text-lg font-semibold ${jost.className}`}>Order: #{orderNumber}</p>
                <p className={`text-sm text-gray-600 ${lexendDeca.className}`}>Date: {orderDate}</p>
              </div>
            </div>
            <div className="flex items-center justify-between w-full max-w-3xl mx-auto my-8">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className={`font-semibold mb-2 ${jost.className}`}>Delivery Address</h3>
                <p className={`text-sm ${lexendDeca.className}`}>
                  {orderDetails.customerInfo.firstName} {orderDetails.customerInfo.lastName}<br />
                  {orderDetails.customerInfo.address}<br />
                  {orderDetails.customerInfo.city}, {orderDetails.customerInfo.postcode}<br />
                  {orderDetails.customerInfo.country}
                  {orderDetails.customerInfo.phone}
                </p>
              </div>
              <div>
                <h3 className={`font-semibold mb-2 ${jost.className}`}>Payment Method</h3>
                <div className={`text-sm ${lexendDeca.className} flex items-center`}>
                  {orderDetails.paymentMethod === 'card' && orderDetails.cardType && (
                    <>
                      <Image 
                        src={getCardLogo(orderDetails.cardType)} 
                        alt={orderDetails.cardType} 
                        width={32} 
                        height={20} 
                        className="mr-2"
                      />
                      <span>
                        {orderDetails.cardType.charAt(0).toUpperCase() + orderDetails.cardType.slice(1)} ending in {orderDetails.cardLastFour}
                      </span>
                    </>
                  )}
                  {orderDetails.paymentMethod !== 'card' && (
                    <span>{orderDetails.paymentMethod}</span>
                  )}
                </div>
              </div>
              <div>
                <h3 className={`font-semibold mb-2 ${jost.className}`}>Order Summary</h3>
                <p className={`text-sm ${lexendDeca.className}`}>
                  Items ({orderDetails.cartItems.length}): £{orderDetails.subtotal.toFixed(2)}<br />
                  Shipping: £{orderDetails.shipping.toFixed(2)}<br />
                  <span className="font-semibold">Total Order Value: £{orderDetails.total.toFixed(2)}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6 bg-white shadow-md rounded-lg">
          <h3 className={`font-semibold mb-4 ${jost.className}`}>Order Details</h3>
          {orderDetails.cartItems.map((item, index) => (
            <div key={index} className="flex items-center mb-4 last:mb-0">
              <Image
                src={item.images && item.images[0] && item.images[0].src ? item.images[0].src : "/placeholder.svg?height=80&width=80"}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-md object-cover mr-4"
              />
              <div>
                <h4 className={`font-medium ${jost.className}`}>{item.name}</h4>
                <p className={`text-sm text-gray-600 ${lexendDeca.className}`}>
                  Qty: {item.quantity} | £{parseFloat(item.price).toFixed(2)} each
                </p>
                <p className={`text-sm ${lexendDeca.className}`}>
                  Shade: {item.attributes && item.attributes.find(attr => attr.name === "Shade")?.options[0] || "N/A"}
                </p>
                <p className={`text-sm ${lexendDeca.className}`}>
                  Size: {item.attributes && item.attributes.find(attr => attr.name === "Size")?.options[0] || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className={`inline-block bg-black text-white px-6 py-3 rounded-md ${jost.className}`}>
            KEEP SHOPPING
          </Link>
        </div>
      </div>
    </Container>
  )
}