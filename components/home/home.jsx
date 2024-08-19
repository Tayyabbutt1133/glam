import Instagram from "../Feeds/Instagram";
import Trustpilot from "../Trustpilot";
import MaxFact from "./banner/MaxFact";
import Rimmel from "./banner/Rimmel";
import Hero from "./hero/hero";
import ProductList from "./home-products/TrendingProducts/ProductList";
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
      <Instagram/>
      <Trustpilot/>
    </>
  );
}
