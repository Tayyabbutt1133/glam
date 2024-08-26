"use client";
import React from 'react';

const MenucategoryLandingPage = ({ mainCategory, subCategories }) => {
  
  const sanitizeText = (text) => {
    // Replace &amp; with &
    return text.replace(/&amp;/g, '&');
  };

  return (
    <div>
      {/* Display main category name */}
      <h1 className="text-2xl font-bold text-center mt-10">
        {sanitizeText(mainCategory?.name)}
      </h1>
      
      <div className="mt-10">
        {subCategories.length > 0 ? (
          <ul className="flex justify-center gap-16">
            {subCategories.map((subCat) => (
              <li key={subCat.id}>{sanitizeText(subCat.name)}</li>
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
