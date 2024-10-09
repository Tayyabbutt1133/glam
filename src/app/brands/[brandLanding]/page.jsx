import { gql } from "@apollo/client";
import { query } from "../../../../lib/apollo-client";

import olaplexbrand from "/public/about_brands/olaplexslide.svg";
import SliderComponent from "/components/lifecycle/mutual-components/slider";
import NewIn from "/components/lifecycle/category/categoriescomponents/Newin";
import MakeupTips from "/components/lifecycle/mutual-components/makeup-tips";
import Container from "../../../../components/container";
import MenucategoryLandingPage from "../../../../components/lifecycle/category/MenucategoryLandingPage";
import Bestseller from "../../../../components/lifecycle/category/categoriescomponents/Bestseller";
import Aboutbrand from "../../../../components/lifecycle/brand/Aboutbrand";
import InFocus from "../../../../components/lifecycle/brand/Infocus";
import Faqsbrand from "../../../../components/lifecycle/brand/Faqsbrand";

const GET_BRANDS_CATEGORY = gql`
  query GetBrandCategories($brandSlug: String!) {
    brandCategories(brand: $brandSlug) {
      brandId
      brandName
      brandSlug
      categories {
        categoryId
        categoryName
        categorySlug
      }
    }
  }
`;

export default async function Page({ params }) {
  const { brandLanding } = params;

  const { data } = await query({
    query: GET_BRANDS_CATEGORY,
    variables: { brandSlug: brandLanding },
  });

  let bannerObject = [
    {
      title: "DISCOVER MAC STUDIO RADIANCE",
      description: "Discover MAC Beauty's latest Radiance Foundation Range. ",
      src: olaplexbrand,
    },
  ];

  return (
    <div>
      <div className="">
        <Container>
          <MenucategoryLandingPage brands={data?.brandCategories[0]} />
        </Container>
        <SliderComponent bannerObject={bannerObject} />
        <Bestseller />
        <Aboutbrand />
        <NewIn />
        <InFocus />
        <MakeupTips />
        <Faqsbrand />
      </div>
    </div>
  );
}
