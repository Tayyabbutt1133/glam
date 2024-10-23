// app/api/create-order/route.js
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Helper function to validate required order data
const validateOrderData = (orderData) => {
  const requiredFields = ['customer_data', 'line_items'];
  const requiredCustomerFields = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'address',
    'city',
    'postcode',
    'country'
  ];

  if (!orderData) {
    throw new Error('Order data is required');
  }

  for (const field of requiredFields) {
    if (!orderData[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  for (const field of requiredCustomerFields) {
    if (!orderData.customer_data[field]) {
      throw new Error(`Missing required customer field: ${field}`);
    }
  }

  if (!Array.isArray(orderData.line_items) || orderData.line_items.length === 0) {
    throw new Error('Order must contain at least one item');
  }
};

// Helper function to calculate order totals
const calculateOrderTotals = (lineItems) => {
  let subtotal = 0;
  const shippingCost = 4.99; // Default shipping cost
  const taxRate = 0.20; // 20% tax rate

  // Calculate subtotal
  subtotal = lineItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  const tax = subtotal * taxRate;
  const total = subtotal + tax + shippingCost;

  return {
    subtotal: subtotal.toFixed(2),
    shipping: shippingCost.toFixed(2),
    tax: tax.toFixed(2),
    total: total.toFixed(2)
  };
};

export async function POST(request) {
  try {
    const headersList = headers();
    const { paymentIntentId, orderData } = await request.json();

    // Validate the request
    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'Payment Intent ID is required' },
        { status: 400 }
      );
    }

    // Validate order data
    try {
      validateOrderData(orderData);
    } catch (validationError) {
      return NextResponse.json(
        { error: validationError.message },
        { status: 400 }
      );
    }

    // Calculate order totals
    const totals = calculateOrderTotals(orderData.line_items);

    // Prepare the WooCommerce order data
    const wooCommerceOrderData = {
      payment_method: 'stripe',
      payment_method_title: 'Credit Card (Stripe)',
      set_paid: true,
      status: 'processing',
      currency: 'USD',
      prices_include_tax: false,
      billing: {
        first_name: orderData.customer_data.firstName,
        last_name: orderData.customer_data.lastName,
        address_1: orderData.customer_data.address,
        address_2: orderData.customer_data.address2 || '',
        city: orderData.customer_data.city,
        state: orderData.customer_data.region || '',
        postcode: orderData.customer_data.postcode,
        country: orderData.customer_data.country,
        email: orderData.customer_data.email,
        phone: orderData.customer_data.phone
      },
      shipping: {
        first_name: orderData.customer_data.firstName,
        last_name: orderData.customer_data.lastName,
        address_1: orderData.customer_data.address,
        address_2: orderData.customer_data.address2 || '',
        city: orderData.customer_data.city,
        state: orderData.customer_data.region || '',
        postcode: orderData.customer_data.postcode,
        country: orderData.customer_data.country
      },
      line_items: orderData.line_items.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        variation_id: item.variation_id || 0
      })),
      shipping_lines: [
        {
          method_title: 'Standard Shipping',
          method_id: 'flat_rate',
          total: totals.shipping
        }
      ],
      meta_data: [
        {
          key: 'stripe_payment_intent_id',
          value: paymentIntentId
        },
        {
          key: 'order_source',
          value: 'website'
        },
        {
          key: '_stripe_customer_ip',
          value: headersList.get('x-forwarded-for') || 'unknown'
        }
      ]
    };

    // Basic auth token for WooCommerce API
    const authToken = Buffer.from(
      `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
    ).toString('base64');

    // Create order in WooCommerce
    const response = await fetch(`${process.env.WORDPRESS_URL}/wp-json/wc/v3/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${authToken}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify(wooCommerceOrderData)
    });

    // Handle WooCommerce API response
    if (!response.ok) {
      const errorData = await response.json();
      console.error('WooCommerce API Error:', errorData);
      throw new Error(errorData.message || 'Failed to create WooCommerce order');
    }

    const order = await response.json();

    // Send confirmation email (you'll need to implement this based on your email service)
    try {
      await sendOrderConfirmationEmail({
        orderNumber: order.id,
        customerEmail: orderData.customer_data.email,
        orderDetails: {
          ...totals,
          items: orderData.line_items,
          shippingAddress: wooCommerceOrderData.shipping
        }
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the order creation if email fails
    }

    // Return successful response
    return NextResponse.json({
      success: true,
      orderId: order.id,
      status: order.status,
      orderKey: order.order_key,
      currency: order.currency,
      total: order.total,
      createdDate: order.date_created
    });

  } catch (error) {
    console.error('Order creation error:', error);
    
    // Handle specific error types
    if (error.response) {
      return NextResponse.json(
        { error: 'WooCommerce API error', details: error.message },
        { status: error.response.status }
      );
    }

    // Generic error response
    return NextResponse.json(
      { 
        error: 'Failed to create order',
        message: error.message,
        timestamp: new Date().toISOString() 
      },
      { status: 500 }
    );
  }
}

// Helper function for sending order confirmation emails
// Implement this based on your email service (SendGrid, Amazon SES, etc.)
async function sendOrderConfirmationEmail({ orderNumber, customerEmail, orderDetails }) {
  // This is a placeholder - implement your email sending logic here
  console.log('Sending order confirmation email:', {
    orderNumber,
    customerEmail,
    orderDetails
  });
}

// Export config for API route
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};