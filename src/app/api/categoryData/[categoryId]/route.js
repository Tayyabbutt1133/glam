import axios from "axios";

export async function GET(request, {params}) {
  
  const { categoryId } = params;

  try {
    // Now you can use the categoryID to fetch data from the external API
    const mainCategoryData = await axios.get(
      `https://glam.clickable.site/wp-json/wc/v3/products/categories/${categoryId}`,
      {
        params: {
          consumer_key: process.env.CONSUMER_KEY_GLAM_BEAUTY,
          consumer_secret: process.env.CONSUMER_SECRET_GLAM_BEAUTY,
        },
      },
    );
    
    const subCategoryData = await axios.get(
      `${process.env.WOOCOMMERCE_API_URL}/products/categories/`,
      {
        params: {
          consumer_key: process.env.CONSUMER_KEY_GLAM_BEAUTY,
          consumer_secret: process.env.CONSUMER_SECRET_GLAM_BEAUTY,
          parent: categoryId,
        },
      },
    );
    const res = {
      mainCategory: mainCategoryData.data,
      subCategories: subCategoryData.data,
    }
    return new Response(JSON.stringify(res), {
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
