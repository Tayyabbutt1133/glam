// app/api/create-order/route.js
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Modern Next.js App Router configurations
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Validation helper function
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

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(orderData.customer_data.email)) {
    throw new Error('Invalid email format');
  }

  // Validate phone number (basic validation)
  const phoneRegex = /^\+?[\d\s-]{8,}$/;
  if (!phoneRegex.test(orderData.customer_data.phone)) {
    throw new Error('Invalid phone number format');
  }
};

// Calculate order totals helper function
const calculateOrderTotals = (lineItems) => {
  let subtotal = 0;
  const shippingCost = 4.99; // Default shipping cost
  const taxRate = 0.20; // 20% tax rate

  // Calculate subtotal
  subtotal = lineItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 0;
    return total + (itemPrice * quantity);
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

// Email helper function (implement based on your email provider)
async function sendOrderConfirmationEmail({ orderNumber, customerEmail, orderDetails }) {
  try {
    // Implement your email sending logic here
    // Example using a logging statement for now
    console.log('Sending order confirmation email:', {
      orderNumber,
      customerEmail,
      orderDetails,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Email sending failed:', error);
    // Don't throw error to prevent order creation failure
  }
}

// Main API route handler
export async function POST(request) {
  try {
    // Check request size
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 1024 * 1024) {
      return NextResponse.json(
        { error: 'Request entity too large' },
        { status: 413 }
      );
    }

    // Get headers for IP tracking
    const headersList = headers();
    const clientIp = headersList.get('x-forwarded-for') || 
                    headersList.get('x-real-ip') || 
                    'unknown';

    // Parse request body
    const { paymentIntentId, orderData } = await request.json();

    // Validate paymentIntentId
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

    // Prepare WooCommerce order data
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
          method_title: orderData.shipping_method?.name || 'Standard Shipping',
          method_id: 'flat_rate',
          total: orderData.shipping_method?.price.toString() || totals.shipping
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
          value: clientIp
        },
        {
          key: 'order_total_calculated',
          value: totals.total
        }
      ]
    };

    // Create auth token for WooCommerce
    if (!process.env.WC_CONSUMER_KEY || !process.env.WC_CONSUMER_SECRET) {
      throw new Error('WooCommerce credentials are not configured');
    }

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

    if (!response.ok) {
      const errorData = await response.json();
      console.error('WooCommerce API Error:', errorData);
      throw new Error(errorData.message || 'Failed to create WooCommerce order');
    }

    const order = await response.json();

    // Send confirmation email
    await sendOrderConfirmationEmail({
      orderNumber: order.id,
      customerEmail: orderData.customer_data.email,
      orderDetails: {
        ...totals,
        items: orderData.line_items,
        shippingAddress: wooCommerceOrderData.shipping
      }
    });

    // Return successful response
    return NextResponse.json({
      success: true,
      orderId: order.id,
      status: order.status,
      orderKey: order.order_key,
      currency: order.currency,
      total: order.total,
      createdDate: order.date_created,
      customerEmail: orderData.customer_data.email
    });

  } catch (error) {
    console.error('Order creation error:', error);
    
    // Handle specific error types
    if (error.response) {
      return NextResponse.json(
        { 
          error: 'WooCommerce API error', 
          details: error.message,
          timestamp: new Date().toISOString()
        },
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