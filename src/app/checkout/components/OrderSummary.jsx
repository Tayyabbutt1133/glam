
// app/checkout/components/OrderSummary.jsx
'use client';

import { useCartStore } from '@/states/CartStore';
import { formatPrice } from '../../lib/utils';
import Image from 'next/image';

export default function OrderSummary() {
  const { cartItems } = useCartStore();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 4.99; // Example shipping cost
  const total = subtotal + shipping;

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-4 mb-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            {item.images?.[0]?.src && (
              <Image
                src={item.images[0].src}
                alt={item.name}
                width={50}
                height={50}
                className="rounded"
              />
            )}
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}