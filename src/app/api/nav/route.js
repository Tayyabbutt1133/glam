import axios from "axios";

export async function GET(request) {
  const res = await axios.get(`https://glam.clickable.site/wp-json/wp/v2/test-6`);
  const data = res.data;
  return Response.json(data);
}
