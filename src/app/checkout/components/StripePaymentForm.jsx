'use client';

import { PaymentElement } from '@stripe/react-stripe-js';

export default function StripePaymentForm() {
  return (
    <div className="mb-6">
      <PaymentElement />
    </div>
  );
}
