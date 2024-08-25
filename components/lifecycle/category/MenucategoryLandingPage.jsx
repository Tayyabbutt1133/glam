"use client";
import React from 'react';

const MenucategoryLandingPage = ({ mainCategory, subCategories }) => {
  return (
    <div>
      {/* Display main category name */}
      <h1 className="text-2xl font-bold text-center mt-10">{mainCategory?.name}</h1>
      
      <div className="mt-10">
        {subCategories.length > 0 ? (
          <ul className="flex justify-center gap-16">
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
