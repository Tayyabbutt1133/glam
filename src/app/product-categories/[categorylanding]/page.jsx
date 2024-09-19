import React, { memo, Suspense, lazy } from "react";

// Import immediately visible components (above the fold)
import MenucategoryLandingPage from "../../../../components/lifecycle/category/MenucategoryLandingPage";
import SliderComponent from "../../../../components/lifecycle/mutual-components/slider";
import Olaplex from "/public/product_category_landing/olaplex 1.svg";

// Lazy-load components that are below the fold
const TrendingBrand = lazy(() =>
  import("../../../../components/lifecycle/category/categoriescomponents/trending-brand/trending-brand")
);
const Bestseller = lazy(() =>
  import("../../../../components/lifecycle/category/categoriescomponents/Bestseller")
);
const BrandInFocus = lazy(() =>
  import("../../../../components/lifecycle/category/categoriescomponents/brand-in-focus")
);
const MakeupPicks = lazy(() =>
  import("../../../../components/lifecycle/category/categoriescomponents/makeup-picks/makeup-picks")
);
const GetGlam = lazy(() =>
  import("../../../../components/lifecycle/category/categoriescomponents/get-glam/get-glam")
);
const MakeupTips = lazy(() =>
  import("../../../../components/lifecycle/mutual-components/makeup-tips")
);
const Staffpicks = lazy(() =>
  import("../../../../components/lifecycle/category/categoriescomponents/Staffpicks")
);

const Page = () => {
  const bannerObject = [
    {
      title: "NARS FREE GIFT COLLECTION",
      description: "Receive a free gift when you spend £30 on NARS.",
      src: Olaplex,
    },
    {
      title: "NARS FREE GIFT COLLECTION",
      description: "Receive a free gift when you spend £30 on NARS.",
      src: Olaplex,
    },
  ];

  return (
    <main className=" overflow-hidden">
      {/* Non-lazy-loaded components (immediately visible to the user) */}
      <MenucategoryLandingPage />
      <SliderComponent bannerObject={bannerObject} />

      {/* Use Suspense with fallback for lazy-loaded components */}
      <Suspense fallback={<div>Loading Trending Brand...</div>}>
        <TrendingBrand />
      </Suspense>

      <Suspense fallback={<div>Loading Bestseller...</div>}>
        <Bestseller />
      </Suspense>

      <Suspense fallback={<div>Loading Brand In Focus...</div>}>
        <BrandInFocus />
      </Suspense>

      <Suspense fallback={<div>Loading Staff Picks...</div>}>
        <Staffpicks />
      </Suspense>

      <Suspense fallback={<div>Loading Makeup Picks...</div>}>
        <MakeupPicks />
      </Suspense>

      <Suspense fallback={<div>Loading Makeup Tips...</div>}>
        <MakeupTips />
      </Suspense>

      <Suspense fallback={<div>Loading Get Glam...</div>}>
        <GetGlam />
      </Suspense>
    </main>
  );
};

export default memo(Page);