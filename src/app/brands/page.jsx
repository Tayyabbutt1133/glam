"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '../../../components/container';
import Menucategory from '../../../components/lifecycle/category/MenucategoryLandingPage';
import Bestseller from '../../../components/lifecycle/brand/Brandbestseller';
// import bannerimg from '../../../../public/product_category_landing/olaplex 1.svg';
import Staffpicks from '../../../components/lifecycle/brand/Brandfocus';
import Aboutbrand from '../../../components/lifecycle/brand/Aboutbrand';
import Faqsbrand from '../../../components/lifecycle/brand/Faqsbrand';
import olaplexbrand from '../../../public/about_brands/olaplexslide.svg'
import SliderComponent from '../../../components/lifecycle/mutual-components/slider';
import Newin from '../../../components/lifecycle/category/categoriescomponents/Newin';

export default function Page() {
  const [mainCategory, setMainCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [hotSellingProducts, setHotSellingProducts] = useState([]);
  const [staffPicks, setStaffPicks] = useState([]); // New state for Staff Picks

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        const makeupID = 147;

        // Fetch main category
        const mainCategoryResponse = await axios.get(
          `https://glam.clickable.site/wp-json/wc/v3/products/attributes/1`, 
          {
            params: {
              consumer_key: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
              consumer_secret: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
            },
          }
        );
        setMainCategory(mainCategoryResponse.data);

        // Fetch subcategories
        const subCategoryResponse = await axios.get(
          ' https://glam.clickable.site/wp-json/wc/v3/products/attributes/1/terms?per_page=100&page=1',
          {
            params: {
              consumer_key: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
                  consumer_secret: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
                  per_page: 5, // Limit to 5 subcategories
                  page: 1,
            },
          }
        );
        setSubCategories(subCategoryResponse.data);

        // Fetch hot-selling products
        const hotSellingResponse = await axios.get(
          'https://glam.clickable.site/wp-json/wc/v3/products',
          {
            params: {
              consumer_key: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
              consumer_secret: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
              orderby: 'popularity',  // Assuming 'popularity' or similar can be used to get hot-selling products
              per_page: 10, // Number of products to fetch
            },
          }
        );
        setHotSellingProducts(hotSellingResponse.data);

        // Fetch most expensive products for Staff Picks
        const staffPicksResponse = await axios.get(
          'https://glam.clickable.site/wp-json/wc/v3/products',
          {
            params: {
              consumer_key: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
              consumer_secret: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
              category: makeupID,
              orderby: 'price',  // Sorting by price to get the most expensive products
              order: 'desc',  // Descending order
              per_page: 10, // Number of products to fetch
            },
          }
        );
        setStaffPicks(staffPicksResponse.data);
      } catch (error) {
        console.error('Error fetching categories and products:', error);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  let bannerObject = [
    {
      title: "DISCOVER MAC STUDIO RADIANCE",
      description: "Discover MAC Beauty’s latest Radiance Foundation Range. ",
      src: olaplexbrand,
    },
  ];


  return (
  <div>
      {mainCategory && subCategories.length > 0 && hotSellingProducts.length > 0 && (
        <div className="">
          <Container>
            <Menucategory mainCategory={mainCategory} subCategories={subCategories} />
            </Container>
          <SliderComponent bannerObject={bannerObject} />
          <Container>
            <Bestseller hotSellingProducts={hotSellingProducts} />
            <Aboutbrand />
            </Container>
          <Newin />
          <Container>
          <Staffpicks staffPicks={staffPicks} />
            <Faqsbrand />
            </Container>
        </div>
      )}
      </div>
  );
}
