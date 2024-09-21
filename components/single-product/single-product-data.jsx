import Image from "next/image";

import FrequentlyBoughtTogether from "./components/frequently-bought";
import ProductData from "./components/product-data/product-data";
import ProductSlider from "./components/product-slider";

import demo1 from "/public/product-slider/demo1.png";
import demo2 from "/public/product-slider/demo2.png";
import Staffpicks from "./components/Staffpicks";
import Accordion from "./components/product-data/components/accordion";
import { AlertCircle } from "lucide-react";
import Reviews from "./components/CustomReviewComponent";
// import { product } from "../../demoproduct";
// import Review from "./components/Review";

const demo = [
  { src: demo1, alt: "Image 1" },
  { src: demo2, alt: "Image 2" },
];
export default async function SingleProductData({ productId }) {
  console.log(productId);
  // `Fetch a product using its id
  const productFromApi = await fetch(
    `https://glam.clickable.site/wp-json/wc/v3/products/${productId}`,
    {
      headers: {
        Authorization:
          "Basic " +
          btoa(process.env.CONSUMER_KEY_GLAM_BEAUTY + ":" + process.env.CONSUMER_SECRET_GLAM_BEAUTY),
      },
    }
  );
  // console.log(productFromApi);
  const product = await productFromApi.json();
  console.log({product});
  // "message": "Invalid ID.",
  //   "data": {
  //       "status": 404
  //   }
  if (product?.message == "Invalid ID." || product?.data?.status === 404 ) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Product Not Found</h2>
        <p className="text-gray-600">Sorry, we could not find the product you are looking for.</p>
        
      </div>
    );
  }

  else return (
    <>
      <div className="w-full  justify-between gap-[3%] overflow-hidden">
        <section className="grid md:grid-cols-2  justify-between   h-auto gap-5">
          <ProductSlider images={product.images} />
          <ProductData product={product} />
        </section>
        <section className=" grid md:grid-cols-2  gap-5">
          <div className="  hidden md:grid grid-cols-2 gap-2">
            {demo.map((image, index) => (
              <Image
                key={index}
                src={image.src}
                alt={image.alt}
                className="object-contain  " //for two images 50%
              />
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <Accordion product={product} />

            <div className=" hidden lg:block">
              <FrequentlyBoughtTogether />
            </div>
          </div>
        </section>
        <div className="lg:hidden">
          <FrequentlyBoughtTogether />
        </div>
        <section>
          {/* <CustomerReviews reviews={reviews} totalReviews={52} averageRating={4.2} /> */}
        </section>
      </div>
      <Staffpicks />
      {/* <Review
        reviewsFromProduct={product.reviews || []}
        totalReviews={product.review_count}
        averageRating={product.average_rating}
      /> */}
      <Reviews />
    </>
  );
}
