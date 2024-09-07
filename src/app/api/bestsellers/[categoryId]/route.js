import axios from "axios";

export async function GET(request, { params }) {
  const { categoryId } = params;
  
  if (!categoryId)
    return new Response("Category ID is required", {
      status: 400,
    });

  try {
    // Now you can use the categoryID to fetch data from the external API
    const res = await axios.get(`${process.env.WOOCOMMERCE_API_URL}/products`, {
      params: {
        consumer_key: process.env.CONSUMER_KEY_GLAM_BEAUTY,
        consumer_secret: process.env.CONSUMER_SECRET_GLAM_BEAUTY,
        category: categoryId,
        orderby: "popularity",
        per_page: 10,
      },
    });
    
    const data = res.data;
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching data:", error);

    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
