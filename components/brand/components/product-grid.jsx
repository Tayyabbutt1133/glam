import {Product} from "../../product";

export default function ProductGrid({
  products
}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-[30px] mt-8">
      {products.map((product) => (
        <Product key={product.databaseId} product={product} />
      ))}
    </div>
  );
}
