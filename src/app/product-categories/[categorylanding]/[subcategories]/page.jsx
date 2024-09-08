"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { jost } from "../../../ui/fonts";

const SubcategoryPage = () => {
  const { subcategories } = useParams();
  const [subcategoryData, setSubcategoryData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchSubcategoryData = async () => {
      try {
        const response = await axios.get(`/api/subcategory/${subcategories}`, {
          signal,
        });
        setSubcategoryData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error("Error fetching subcategory data:", error);
        }
      }
    };

    fetchSubcategoryData();

    return () => {
      controller.abort();
    };
  }, [subcategories]);

  if (!subcategoryData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-14">
      <h1
        className={`text-2xl ${jost.className} uppercase font-bold text-center mt-10`}
      >
        {subcategoryData.name}
      </h1>
      <div className="mt-10">
        <p className="text-center">
          {subcategoryData.description}
        </p>
        {/* You can add more subcategory-specific content here */}
      </div>
    </div>
  );
};

export default SubcategoryPage;
