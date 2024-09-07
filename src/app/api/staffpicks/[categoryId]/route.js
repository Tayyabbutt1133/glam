import axios from "axios";

export async function GET(request, { params }) {
  const { categoryId } = params;

  if (!categoryId)
    return new Response("Category ID is required", {
      status: 400,
    });

  try {
    // Now you can use the categoryID to fetch data from the external API
    const res = await axios.get(
      `https://glam.clickable.site/wp-json/wc/v3/products`,
      {
        params: {
          consumer_key: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
          consumer_secret: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
          category: categoryId,
          orderby: "price",
          order: "desc",
          per_page: 10,
        },
      },
    );
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
