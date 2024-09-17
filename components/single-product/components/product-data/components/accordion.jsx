"use client";
import { jost } from "@/components/ui/fonts";
import React, { useState, useRef, useEffect } from "react";
import { IoChevronDownOutline } from "react-icons/io5";



export default function Accordion({product}) {
  const accordionData = [
    { title: "Description", content: product.description,isHtml:true },
    { title: "Benefits", content: "List of product benefits." },
    { title: "How To Use", content: "Instructions on how to use the product." },
    {
      title: "Delivery & Returns",
      content: "Information about delivery and return policies.",
    },
  ];
  const [openSection, setOpenSection] = useState(null);
  const contentRefs = useRef(accordionData.map(() => React.createRef()));

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  useEffect(() => {
    contentRefs.current.forEach((ref, index) => {
      if (ref.current) {
        ref.current.style.maxHeight =
          openSection === index ? `${ref.current.scrollHeight}px` : "0px";
      }
    });
  }, [openSection]);



  return (
    <div>
      {accordionData.map((section, index) => (
        <div key={index} className="border-b border-gray-200">
          <button
            className="flex justify-between items-center w-full py-4 px-2 text-left"
            onClick={() => toggleSection(index)}
            aria-expanded={openSection === index}
            aria-controls={`content-${index}`}
          >
            <span className="text-lg font-medium">{section.title}</span>
            <IoChevronDownOutline
              className={`w-5 h-5 transition-transform duration-200 text-secondary ${
                openSection === index ? "transform rotate-180" : ""
              }`}
            />
          </button>
          <div
            id={`content-${index}`}
            ref={contentRefs.current[index]}
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{ maxHeight: "0px" }}
          >
            <div className="px-2 pb-4">
              {section.isHtml ? (
                <div dangerouslySetInnerHTML={{ __html: section.content }} className={`${jost.className} text-sm`} />
              ) : (
                <p>{section.content}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
