"use client";
import React, { useEffect } from 'react';
import Container from './../../container';
import { jost } from '../../../components/ui/fonts';

export default function Trustpilot({ product = {} }) {
  useEffect(() => {
    // Load PowerReviews script
    const script = document.createElement('script');
    script.src = "https://ui.powerreviews.com/stable/4.1/ui.js";
    script.async = true;
    document.body.appendChild(script);

    // Initialize PowerReviews after the script is loaded
    script.onload = () => {
      window.pwr = window.pwr || function () {
        (pwr.q = pwr.q || []).push(arguments);
      };
      pwr("render", {
        api_key: '3d60a9ae-3216-465f-9a23-474b68fbc558',
        locale: 'en_GB',
        merchant_group_id: '138739523',
        merchant_id: '160440525',
        page_id: product.id || 'default-product-id',
        review_wrapper_url: product.reviewWrapperUrl || 'default-review-url',
        product: {
          name: product.name || 'Default Product Name',
          url: product.url || 'default-product-url',
          image_url: product.imageUrl || 'default-image-url',
          description: product.description || 'Default Product Description',
          category_name: product.categoryName || [],
          brand_name: product.brandName || 'Default Brand',
          price: product.price || '0.00',
          in_stock: product.inStock ? 1 : 0,
          variants: product.variants || {},
        },
        subject: {
          '@context': window.location.origin,
          '@type': 'Product',
          name: product.name || 'Default Product Name',
          url: product.url || 'default-product-url',
          image: product.imageUrl || 'default-image-url',
          description: product.description || 'Default Product Description',
          sku: product.sku || 'default-sku',
          brand: product.brandName || 'Default Brand',
        },
        components: {
          ReviewSnippet: 'pr-reviewsnippet',
          ReviewDisplay: 'pr-reviewdisplay',
        }
      });

      // Attach an event listener to "Write the First Review" text
      const intervalId = setInterval(() => {
        const reviewText = document.querySelector('.pr-write-review-link'); // Assuming this is the class used for the text
        if (reviewText) {
          reviewText.style.cursor = 'pointer'; // Make it look like a clickable element
          reviewText.addEventListener('click', handleAddReview);
          clearInterval(intervalId); // Stop the interval once the element is found
        }
      }, 100); // Keep checking every 100ms until the element is found
    };

    // Cleanup: remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, [product]);

  // Function to handle adding the review
  const handleAddReview = () => {
    console.log('Redirect to review submission page');
    // Add your logic to navigate to the review submission form or trigger a review submission modal
  };

  return (
    <Container className='py-6'>
      <div  id="pr-reviewdisplay"></div>
    </Container>
  );
}

// Fetch product data (example)
export async function getStaticProps() {
  const product = {
    id: 'your-product-id',
    reviewWrapperUrl: 'your-review-wrapper-url',
    name: 'Product Name',
    url: 'your-product-url',
    imageUrl: 'your-product-image-url',
    description: 'Product Description',
    categoryName: ['Category1', 'Category2'],
    brandName: 'Brand Name',
    price: '99.99',
    inStock: true,
    variants: {},
    sku: 'your-sku',
  };

  return {
    props: {
      product,
    },
  };
}
