import Instagram from "../Feeds/Instagram";
import MaxFact from "../MaxFact";
import Rimmel from "../Rimmel";
import Trustpilot from "../Trustpilot";
import Hero from "./hero/hero";
import ProductList from "./home-products/ProductList";
import HomeBrand from "./home-products/shop_by_brand/HomeBrand";
import HomeCategory from "./home-products/shop_by_category/HomeCategory";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductList />
      <MaxFact />
      <HomeBrand />
      <Rimmel />
      <HomeCategory />
      {/* <Instagram/> */}
      <Trustpilot/>
    </>
  );
}