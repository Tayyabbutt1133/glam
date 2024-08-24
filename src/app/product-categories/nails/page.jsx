"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '../../../../components/container';
import Menucategory from '../../../../components/lifecycle/category/MenucategoryLandingPage';

export default function Page() {
  const [mainCategory, setMainCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const skincareCategoryId = 457;

        const mainCategoryResponse = await axios.get(`https://glam.clickable.site/wp-json/wc/v3/products/categories/${skincareCategoryId}`, {
          params: {
            consumer_key: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
            consumer_secret: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
          },
        });

        const mainCategoryData = mainCategoryResponse.data;
        mainCategoryData.name = mainCategoryData.name.replace(/&amp;/g, '&');

        setMainCategory(mainCategoryData);

        const subCategoryResponse = await axios.get('https://glam.clickable.site/wp-json/wc/v3/products/categories/', {
          params: {
            consumer_key: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
            consumer_secret: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
            parent: skincareCategoryId,
          },
        });

        const subCategoryData = subCategoryResponse.data.map(subCat => {
          return {
            ...subCat,
            name: subCat.name.replace(/&amp;/g, '&'),
          };
        });

        setSubCategories(subCategoryData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
    <div className="p-28">
      <Menucategory mainCategory={mainCategory} subCategories={subCategories} />
    </div>
  </Container>
  );
}
