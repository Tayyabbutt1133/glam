import Link from "next/link";
import { CiHeart } from "react-icons/ci";
import { FaRegStar, FaStar } from "react-icons/fa";
import { jost, lexendDeca } from "/components/ui/fonts";

export default function ProductGrid({
  products,
  addToCart,
  currencySymbol,
  rate,
}) {
  /* 
 
 {
    "__typename": "VariableProduct",
    "databaseId": 50159,
    "name": "benefit Hoola Bronzer 8g",
    "slug": "benefit-hoola-bronzer-8g",
    "image": {
        "__typename": "MediaItem",
        "sourceUrl": "https://glam.clickable.site/wp-content/uploads/2023/07/hoola-caramel-bronzer-8g.jpg",
        "altText": ""
    },
    "price": "£29.25 - £32.50",
    "regularPrice": "£29.25 - £32.50",
    "salePrice": null,
    "rrp": null,
    "outletPrice": null,
    "onSale": false,
    "averageRating": 0,
    "reviewCount": 0,
    "productCategories": {
        "__typename": "ProductToProductCategoryConnection",
        "nodes": [
            {
                "__typename": "ProductCategory",
                "databaseId": 148,
                "name": "Complexion"
            },
            {
                "__typename": "ProductCategory",
                "databaseId": 290,
                "name": "Face Powder"
            },
            {
                "__typename": "ProductCategory",
                "databaseId": 147,
                "name": "Makeup"
            }
        ]
    },
    "attributes": {
        "__typename": "ProductToProductAttributeConnection",
        "nodes": [
            {
                "__typename": "LocalProductAttribute",
                "name": "Shade",
                "options": [
                    "Caramel",
                    "Lite",
                    "Matte",
                    "Caramel",
                    "Lite",
                    "Matte"
                ]
            },
            {
                "__typename": "GlobalProductAttribute",
                "name": "pa_brand",
                "options": [
                    "benefit"
                ]
            }
        ]
    }
}
 
 */
  const getBrandName = (product) => {
    const brand = product.attributes.nodes.find(
      (attr) => attr.name === "pa_brand"
    );
    return brand.options[0];
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {products.map((product) => {
        const brand = getBrandName(product);
        return (
          <div
            key={product.databaseId}
            className="border p-4 rounded-lg shadow-lg relative bg-white"
          >
            {product.onSale && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                Sale
              </span>
            )}
            <div className="absolute top-2 right-2">
              <button className="focus:outline-none">
                <CiHeart className="text-black w-6 h-6" />
              </button>
            </div>
            <Link href={`/product/${product.databaseId}`}>
              <img
                src={product.image.sourceUrl}
                alt={product.image.altText || product.name}
                className="w-full h-64 object-contain mb-4"
              />
            </Link>
            <Link href={`/product/${product.databaseId}`}>
              <h1
                className={`text-sm ${jost.className} cursor-pointer font-bold mb-2`}
              >
                {brand}
              </h1>
            </Link>
            <h3
              className={`text-sm ${lexendDeca.className} font-normal mb-2 h-[60px] overflow-hidden`}
            >
              {product.name}
            </h3>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, index) => (
                <span key={index}>
                  {index < Math.round(product.averageRating) ? (
                    <FaStar className="text-[#7E7E7E] w-4 h-4" />
                  ) : (
                    <FaRegStar className="text-[#7E7E7E] w-4 h-4" />
                  )}
                </span>
              ))}
              <span className="text-gray-600 text-sm ml-2">
                ({product.reviewCount})
              </span>
            </div>
            <p className={`font-bold text-lg mb-3 ${lexendDeca.className}`}>
              {product.onSale ? (
                <>
                  <span className="line-through text-gray-600 mr-2">
                    {currencySymbol}
                    {(product.regularPrice * rate).toFixed(2)}
                  </span>
                  {currencySymbol}
                  {(product.salePrice * rate).toFixed(2)}
                </>
              ) : (
                `${currencySymbol}${(product.price * rate).toFixed(2)}`
              )}
            </p>
            <button
              className={`w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition ${jost.className}`}
              onClick={() => addToCart(product)}
            >
              ADD TO BAG
            </button>
          </div>
        );
      })}
    </div>
  );
}
