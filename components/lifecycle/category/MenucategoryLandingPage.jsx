"use client";
import React from 'react';
import Image from 'next/image';
import logo_one from '../../../public/product_category_landing/rounded_cat/one.svg';
import logo_two from '../../../public/product_category_landing/rounded_cat/two.svg';
import logo_three from '../../../public/product_category_landing/rounded_cat/three.svg';
import logo_four from '../../../public/product_category_landing/rounded_cat/four.svg';
import logo_five from '../../../public/product_category_landing/rounded_cat/five.svg';
import logo_six from '../../../public/product_category_landing/rounded_cat/six.svg';
import logo_seven from '../../../public/product_category_landing/rounded_cat/seven.svg';

const MenucategoryLandingPage = ({ mainCategory, subCategories }) => {

  const sanitizeText = (text) => {
    // Replace &amp; with &
    return text.replace(/&amp;/g, '&');
  };

  // Mapping the images to the respective subcategories
  const logos = [
    logo_one,
    logo_two,
    logo_three,
    logo_four,
    logo_five,
    logo_six,
    logo_seven
  ];

  return (
    <div className='my-14'>
      {/* Display main category name */}
      <h1 className="text-2xl font-bold text-center mt-10">
        {sanitizeText(mainCategory?.name)}
      </h1>

      <div className="mt-10">
        {subCategories.length > 0 ? (
          <ul className="flex justify-center gap-8">
            {subCategories.map((subCat, index) => (
              <li key={subCat.id} className="flex flex-col items-center text-center">
                <div className="flex justify-center items-center w-24 h-24 rounded-full overflow-hidden border-4 border-transparent hover:border-blue-500 transition-all duration-300 ease-in-out">
                  <Image 
                    src={logos[index]} 
                    alt={sanitizeText(subCat.name)} 
                    className="object-cover w-full h-full cursor-pointer"
                  />
                </div>
                <p className="mt-2 text-sm font-medium">{sanitizeText(subCat.name)}</p>
              </li>
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
