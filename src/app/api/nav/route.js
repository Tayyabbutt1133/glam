import axios from "axios";

export async function GET(request) {
  const res = await fetch(`https://glam.clickable.site/wp-json/wp/v2/test-6`, {
    method: "GET",
    next: { revalidate: 60 },
  });
  const data = res.data;
  return Response.json(data);
}
