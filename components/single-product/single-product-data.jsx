import Image from "next/image";
import { AlertCircle } from "lucide-react";
import FrequentlyBoughtTogether from "./components/frequently-bought";
import ProductData from "./components/product-data/product-data";
import ProductSlider from "./components/product-slider";
import Staffpicks from "./components/Staffpicks";
import Accordion from "./components/product-data/components/accordion";
import Reviews from "./components/CustomReviewComponent";
import BreadCrumbs from "../BreadCrumb";
import Recientlyviewed from "./components/Recientlyviewed";

import demo1 from "/public/product-slider/demo1.png";
import demo2 from "/public/product-slider/demo2.png";

const demo = [
  { src: demo1, alt: "Image 1" },
  { src: demo2, alt: "Image 2" },
];

export default async function SingleProductData({ productId }) {
  console.log(productId);
  // Fetch a product using its id
  const productFromApi = await fetch(
    `https://glam.clickable.site/wp-json/wc/v3/products/${productId}`,
    {
      headers: {
        Authorization:
          "Basic " +
          btoa(
            process.env.CONSUMER_KEY_GLAM_BEAUTY +
              ":" +
              process.env.CONSUMER_SECRET_GLAM_BEAUTY
          ),
      },
    }
  );
  
  const product = await productFromApi.json();
  console.log({ productcat: product.categories });

  let categories = [];

  if (product?.categories?.length <= 3) {
    categories = product.categories || [];
  }
  const categoryLinks = categories?.map((category, index) => {
    const pathSegments = categories.slice(0, index + 1).map((cat) => cat.slug);
    return {
      name: category.name,
      route: `/product-categories/${pathSegments.join("/")}`,
    };
  });

  const breadcrumblinks = [
    { name: "Home", route: "/" },
    ...categoryLinks,
    { name: product.name, route: `/product/${product.id}` },
  ];

  if (product?.message == "Invalid ID." || product?.data?.status === 404) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="py-4 bg-gray-100">
          <div className="container mx-auto px-4">
            <BreadCrumbs links={breadcrumblinks} />
          </div>
        </div>
        <div className="flex-grow container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Product Not Found
            </h2>
            <p className="text-gray-600">
              Sorry, we could not find the product you are looking for.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="-mt-20">
        <div className="container mx-auto px-4">
          <BreadCrumbs links={breadcrumblinks} />
        </div>
      </div>
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="w-full justify-between gap-[3%] overflow-hidden">
          <section className="grid md:grid-cols-2 justify-between h-auto gap-5">
            <ProductSlider images={product.images} />
            <ProductData product={product} />
          </section>
          <section className="grid md:grid-cols-2 gap-5 mt-8">
            <div className="hidden md:grid grid-cols-2 gap-2">
              {demo.map((image, index) => (
                <Image
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className="object-contain w-full h-auto"
                />
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <Accordion product={product} />
              <div className="hidden lg:block mt-4">
                <FrequentlyBoughtTogether />
              </div>
            </div>
          </section>
          <div className="lg:hidden mt-8">
            <FrequentlyBoughtTogether />
          </div>
        </div>
        <div className="mt-12">
          <Staffpicks />
        </div>
        <div className="mt-12">
          <Reviews />
        </div>
        <div className="mt-12">
          <Recientlyviewed />
        </div>
      </div>
    </div>
  );
}