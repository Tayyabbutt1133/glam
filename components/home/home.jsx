import React, { Suspense, lazy } from "react";

// Immediately visible components (non-lazy loaded)
import Hero from "./hero/hero";
import ProductList from "./home-products/TrendingProducts/ProductList";
import Sweetalert from '../../components/SweetAlert'

// Lazy-loaded components (below the fold)
const MaxFact = lazy(() => import("./banner/MaxFact"));
const HomeBrand = lazy(() => import("./home-products/shop_by_brand/HomeBrand"));
const Rimmel = lazy(() => import("./banner/Rimmel"));
const HomeCategory = lazy(() => import("./home-products/shop_by_category/HomeCategory"));
const Instagram = lazy(() => import("../Feeds/Instagram"));
const Trustpilot = lazy(() => import("../Trustpilot"));

export default function HomePage() {
  return (
    <>
      <Sweetalert/>
    <main className="overflow-hidden">
      {/* Immediately visible components */}
      <Hero />
      <ProductList />

      {/* Lazy-loaded components wrapped in Suspense */}
      <Suspense fallback={<div>Loading MaxFact...</div>}>
        <MaxFact />
      </Suspense>

      <Suspense fallback={<div>Loading HomeBrand...</div>}>
        <HomeBrand />
      </Suspense>

      <Suspense fallback={<div>Loading Rimmel...</div>}>
        <Rimmel />
      </Suspense>

      <Suspense fallback={<div>Loading HomeCategory...</div>}>
        <HomeCategory />
      </Suspense>

      <Suspense fallback={<div>Loading Instagram...</div>}>
        <Instagram />
      </Suspense>

      <Suspense fallback={<div>Loading Trustpilot...</div>}>
        <Trustpilot />
      </Suspense>
      </main>
      </>
  );
}
