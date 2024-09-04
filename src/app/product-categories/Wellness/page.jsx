"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '../../../../components/container';


export default function Page() {
  const [mainCategory, setMainCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Define the category ID for skincare
        const skincareCategoryId = 147;
        
        // Fetch the main category (skincare) directly using its ID
        const mainCategoryResponse = await axios.get(`https://glam.clickable.site/wp-json/wc/v3/products/categories/${skincareCategoryId}`, {
          params: {
            consumer_key: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
            consumer_secret: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
          },
        });

        setMainCategory(mainCategoryResponse.data);

        // Fetch subcategories based on the main category ID
        const subCategoryResponse = await axios.get('https://glam.clickable.site/wp-json/wc/v3/products/categories/', {
          params: {
            consumer_key: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
            consumer_secret: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
            parent: skincareCategoryId,
          },
        });

        setSubCategories(subCategoryResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // if (loading) return <div>Loading...</div>;

  return (
    <Container>
    <div className=' p-28'>
      {/* <h1>{mainCategory?.name || 'Category not found'}</h1> */}
      <div>
        {subCategories.length > 0 ? (
          <ul className=' flex justify-between'>
            {subCategories.map((subCat) => (
              <li key={subCat.id}>{subCat.name}</li>
            ))}
          </ul>
        ) : (
          <p>No subcategories found.</p>
        )}
      </div>
      </div>
      </Container>
  );
}
