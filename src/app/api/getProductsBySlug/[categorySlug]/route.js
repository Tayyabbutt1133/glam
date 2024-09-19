import axios from "axios";

export async function GET(request, { params }) {
  try {
    const { categorySlug } = params;

    // Fetch category ID
    const res = await axios.get(`${process.env.WOOCOMMERCE_API_URL}/products/categories`, {
      params: {
        consumer_key: process.env.CONSUMER_KEY_GLAM_BEAUTY,
        consumer_secret: process.env.CONSUMER_SECRET_GLAM_BEAUTY,
        slug: categorySlug
      }
    });
    const categoryId = res.data[0].id
    
    

    // Fetch products
    const categoryUrl = `https://glam.clickable.site/wp-json/wc/v3/products?category=${categoryId}`;
    const basicAuth = {
      username: process.env.CONSUMER_KEY_GLAM_BEAUTY,
      password: process.env.CONSUMER_SECRET_GLAM_BEAUTY
    };

    const productsResponse = await axios.get(categoryUrl, {
      auth: basicAuth,
    });

    return new Response(JSON.stringify(productsResponse.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching products:', error);

    return new Response(error, {
      status: 500
    });
  }
}