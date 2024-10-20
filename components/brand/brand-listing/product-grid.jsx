import {UpdatedProduct} from "../../product";

export default function ProductGrid({
  products
}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-[30px] mt-8">
      {products.map((product) => (
        <UpdatedProduct key={product.databaseId} product={product} />
        // <div
        //   key={product.databaseId}
        //   className="border rounded-lg relative bg-white"
        // >
        //   {product.onSale && (
        //     <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
        //       Sale
        //     </span>
        //   )}
        //   <div className="absolute top-2 right-2">
        //     <button
        //       className="focus:outline-none"
        //       onClick={() => handleFavoriteClick(product.databaseId)}
        //     >
        //       {favorites[product.databaseId] ? (
        //         <FaHeart className="text-red-500 w-6 h-6" />
        //       ) : (
        //         <CiHeart className="text-black w-6 h-6" />
        //       )}
        //     </button>
        //   </div>
        //   <Link href={`/product/${product.slug}`}>
        //     <Image
        //       src={product.image.sourceUrl}
        //       alt={product.image.altText || product.name}
        //       width={200}
        //       height={200}
        //       className="w-full h-64 object-contain mb-4"
        //     />
        //   </Link>
        //   <div className="p-4">
        //     <Link href={`/product/${product.slug}`}>
        //       <h1
        //         className={`text-sm 2xl:text-[20px] ${jost.className} uppercase cursor-pointer font-bold mb-2`}
        //       >
        //         {product.attributes.nodes.find((attr) => attr.name === "Brand")
        //           ?.options[0] || "Unknown Brand"}
        //       </h1>
        //     </Link>
        //     <h3
        //       className={`text-sm 2xl:text-[20px] ${lexendDeca.className} font-normal mb-2 h-[60px] overflow-hidden`}
        //     >
        //       {product.name}
        //     </h3>
        //     <div className="flex items-center mb-2">
        //       {[...Array(5)].map((_, index) => (
        //         <span key={index}>
        //           {index < Math.round(product.averageRating) ? (
        //             <FaStar className="text-[#7E7E7E] w-4 h-4" />
        //           ) : (
        //             <FaRegStar className="text-[#7E7E7E] w-4 h-4" />
        //           )}
        //         </span>
        //       ))}
        //       <span className="text-gray-600 text-sm ml-2">
        //         ({product.reviewCount})
        //       </span>
        //     </div>
        //     <p className={`font-bold text-lg mb-3 ${lexendDeca.className}`}>
        //       {product.onSale ? (
        //         <>
        //           <span className="line-through text-gray-600 mr-2">
        //             {currencySymbol}
        //             {(parseFloat(product.regularPrice) * rate).toFixed(2)}
        //           </span>
        //           {currencySymbol}
        //           {(parseFloat(product.salePrice) * rate).toFixed(2)}
        //         </>
        //       ) : (
        //         `${currencySymbol}${(parseFloat(product.price) * rate).toFixed(
        //           2
        //         )}`
        //       )}
        //     </p>
        //     <button
        //       className={`w-full bg-black text-white py-2 rounded-lg hover:bg-[#CF8562] transition ${jost.className}`}
        //       onClick={() => addToCart(product)}
        //     >
        //       ADD TO BAG
        //     </button>
        //   </div>
        // </div>
      ))}
    </div>
  );
}
