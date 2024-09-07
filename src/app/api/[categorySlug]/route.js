import axios from "axios";

export async function GET(request, { params }) {
  try {
    const { categorySlug } = params;

    const res = await axios.get(`${process.env.WOOCOMMERCE_API_URL}/products/categories`, {
      params: {
        consumer_key: process.env.CONSUMER_KEY_GLAM_BEAUTY,
        consumer_secret: process.env.CONSUMER_SECRET_GLAM_BEAUTY,
        slug: categorySlug
      }
    });
    
   
    return new Response(JSON.stringify(res.data[0].id), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching category:', error);

    return new Response('Internal Server Error', {
      status: 500
    });
  }
}
