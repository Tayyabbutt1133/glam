import axios from "axios";

export async function GET(request) {
  const res = await axios.get(`${process.env.WORDPRESS_API_URL}/test-6`);
  const data = res.data;
  return Response.json(data);
}
