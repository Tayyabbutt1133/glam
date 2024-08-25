"use client";
import React from 'react';
import Container from '../../container';
// import Categoryslider from './categoriescomponents/Categoryslider'; // Ensure the correct path

const MenucategoryLandingPage = ({ mainCategory, subCategories, bannerData }) => {
  return (
    <Container>
      <div className='p-28'>
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
      
    </Container>
  );
};

export default MenucategoryLandingPage;
