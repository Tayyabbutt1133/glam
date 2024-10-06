import Link from "next/link";
import { useRef, useState } from "react";

import Container from "../../container";
import { brands } from "./data/brands";
import { groupBrandsByAlphabet } from "./methods/groupBrands";
import { lexendDeca } from "../../ui/fonts"; 
import Text from "../../ui/Text";

let alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
alphabet = ["0-9", ...alphabet];

export default function BrandMegaMenu({ closeMegaMenu }) {
  const [activeLetter, setActiveLetter] = useState(null);
  const categoryRefs = useRef({});

  let brandCategories = groupBrandsByAlphabet(brands, alphabet);

  const handleScrollToCategory = (letter) => {
    setActiveLetter(letter);
    if (categoryRefs.current[letter]) {
      categoryRefs.current[letter].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  const handleLinkClick = () => {
    closeMegaMenu();
  };

  return (
    <div className="flex flex-col h-full w-full max-h-[460px] border">
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
      <div className="flex flex-row gap-28 justify-start  overflow-x-auto w-4/5 py-5 mx-auto">
        {brandCategories?.map((category) => (
          <div
            key={category?.label}
            ref={(el) => (categoryRefs.current[category?.label] = el)}
            className="min-w-fit"
          >
            <Text style="h4" className="uppercase mb-5">
              {category.label}
            </Text>
            <ul className="flex flex-col flex-wrap text-sm lg:h-[250px] xl:h-[300] gap-4">
              {category?.brands.map((brand, index) => (
                <Link
                  href={`/brands/${brand.slug}`}
                  key={index}
                  className={`${lexendDeca.className} mr-5`}
                  onClick={handleLinkClick}
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
}