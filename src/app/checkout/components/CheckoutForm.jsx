'use client';

import { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useCartStore } from '@/states/CartStore';
import StripePaymentForm from './StripePaymentForm';
import OrderSummary from './OrderSummary';
import { validateField } from '../../lib/utils';

export default function CheckoutForm() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postcode: '',
    phone: '',
    country: '',
    region: '',
  });
  const [errors, setErrors] = useState({});
  
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { cartItems, clearCart } = useCartStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }

    setIsProcessing(true);

    try {
      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
          currency: 'usd',
        }),
      });

      const { clientSecret } = await response.json();

      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
          payment_method_data: {
            billing_details: {
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              phone: formData.phone,
              address: {
                line1: formData.address,
                city: formData.city,
                postal_code: formData.postcode,
                country: formData.country,
              },
            },
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      // Create WooCommerce order
      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentIntentId: paymentIntent.id,
          orderData: {
            customer_data: formData,
            line_items: cartItems.map(item => ({
              product_id: item.id,
              quantity: item.quantity,
              variation_id: item.variation_id,
            })),
          },
        }),
      });

      const { orderId } = await orderResponse.json();

      // Clear cart and redirect
      clearCart();
      router.push(`/checkout/success?order_id=${orderId}`);
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error('Payment failed:', error);
      toast.error(error.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-2/3">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Shipping Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
            </div>
            {/* Add other shipping fields */}
          </div>

          {/* Payment Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
            <StripePaymentForm />
          </div>

          <button
            type="submit"
            disabled={isProcessing || !stripe || !elements}
            className="w-full bg-black text-white py-3 rounded-lg mt-6 hover:bg-opacity-90 disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      </div>
      <div className="lg:w-1/3">
        <OrderSummary />
      </div>
    </div>
  );
}