"use client";
import React from "react";
import { useParams } from "next/navigation";

const SubcategoryPage = () => {
  const { categorylanding, subcategories } = useParams();

  // Log the slug to the console
  console.log("Category Landing:", categorylanding);
  console.log("Subcategory Slug:", subcategories);

  return (
    <div className="my-14">
      <h1 className="text-2xl uppercase font-bold text-center mt-10">
        Subcategory Slug
      </h1>
      <div className="mt-10">
        {/* Display the slug on the page */}
        <p className="text-center">
          Category Landing: {categorylanding}
        </p>
        <p className="text-center">
          Subcategory Slug: {subcategories}
        </p>
      </div>
    </div>
  );
};

export default SubcategoryPage;
