import Link from "next/link";
import { useRef, useState } from "react";

import Container from "@/components/container";
import { brands } from "@/components/header/navigation-nav/data/brands";
import { groupBrandsByAlphabet } from "@/components/header/navigation-nav/methods/groupBrands";
import { lexendDeca } from "@/components/ui/fonts";
import Text from "@/components/ui/Text";

let alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
alphabet = ["0-9", ...alphabet];

export default function BrandMegaMenu ({ links }) {
  const [activeLetter, setActiveLetter] = useState(null);

  // Store refs for each brand category
  const categoryRefs = useRef({});

  let brandCategories = groupBrandsByAlphabet(brands, alphabet);

  const handleScrollToCategory = (letter) => {
    setActiveLetter(letter);
    // If the letter exists in categoryRefs, scroll to that section
    if (categoryRefs.current[letter]) {
      categoryRefs.current[letter].scrollIntoView({ 
        behavior: "smooth", 
        block: "nearest",  // Prevents the page from scrolling vertically
        inline: "start",   // Ensures horizontal scrolling if needed
      });
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-h-[460px]">
      {/* Alphabet filter */}
      <Container>
        <div className="flex space-x-3 my-4 justify-between">
          {alphabet.map((letter, index) => (
            <div
              key={index}
              className={`cursor-pointer text-lg uppercase whitespace-nowrap ${
                activeLetter === letter
                  ? "font-bold text-black"
                  : "text-gray-500"
              } hover:text-black transition-colors`}
              onClick={() => handleScrollToCategory(letter)}
            >
              {letter}
            </div>
          ))}
        </div>
      </Container>
      <hr />
      {/* Brands */}
      <div className="flex flex-row gap-28 justify-start overflow-x-auto w-4/5 py-5 mx-auto">
        {brandCategories?.map((category) => (
          <div
            key={category?.label}
            ref={(el) => (categoryRefs.current[category?.label] = el)} // Assign ref to each category
            className="min-w-fit"
          >
            <Text style={"h4"} className={`uppercase mb-5`}>
              {category.label}
            </Text>
            <ul className="flex flex-col flex-wrap text-sm h-[300px] gap-4">
              {category?.brands.map((brand, index) => (
                <Link
                  href={`/brands/${brand.slug}`}
                  key={index}
                  className={`${lexendDeca.className} mr-5`}
                >
                  {brand.name}
                </Link>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
