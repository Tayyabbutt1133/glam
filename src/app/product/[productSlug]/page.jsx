import Container from "@/components/container";
import SingleProductData from "@/components/single-product/single-product-data";

export default function Page({ params }) {
  const { productSlug } = params;
  return (
    <Container className="my-20">
      <SingleProductData productId={productSlug} />
    </Container>
  );
}
