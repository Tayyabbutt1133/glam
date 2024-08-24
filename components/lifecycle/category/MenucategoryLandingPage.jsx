"use client";
import React from 'react';
// import Categoryslider from './categoriescomponents/Categoryslider'; // Ensure the correct path

const MenucategoryLandingPage = ({ mainCategory, subCategories, bannerData }) => {
  return (
    <div>
      <div>
        {subCategories.length > 0 ? (
          <ul className="flex justify-between">
            {subCategories.map((subCat) => (
              <li key={subCat.id}>{subCat.name}</li>
            ))}
          </ul>
        ) : (
          <p>No subcategories found.</p>
        )}
      </div>
      
    </div>
  );
};

export default MenucategoryLandingPage;
