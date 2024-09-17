"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { lexendDeca } from "../../ui/fonts";

import Container from "../../container";
import Text from "../../ui/Text";
import img from "/public/nav-images/skincare-nav.png";

// let alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
// alphabet = ["0-9", ...alphabet];

// const BrandMegaMenu = ({ links }) => {
//   const [activeLetter, setActiveLetter] = useState(null);
//   const scrollRef = useRef(null);

//   // Function to scroll to the clicked letter
//   const handleLetterClick = (letter) => {
//     setActiveLetter(letter);

//     // Find the letter's button and scroll to it
//     const letterElement = document.getElementById(`letter-${letter}`);
//     if (letterElement && scrollRef.current) {
//       const scrollOffset =
//         letterElement.offsetLeft - scrollRef.current.offsetLeft;
//       scrollRef.current.scrollTo({ left: scrollOffset, behavior: "smooth" });
//     }
//   };

//   // Group brands by their first letter
//   const groupBrandsByLetter = () => {
//     const groupedBrands = {};
//     alphabet.forEach((letter) => {
//       groupedBrands[letter] = links.filter((link) => {
//         const firstChar = link.name.charAt(0).toUpperCase();
//         if (letter === "0-9") {
//           return /\d/.test(firstChar); // Numbers case
//         } else {
//           return firstChar === letter;
//         }
//       });
//     });
//     return groupedBrands;
//   };

//   const groupedBrands = groupBrandsByLetter();

//   return (
//     <div className="flex flex-col h-full w-full">
//       {/* Alphabet filter */}
//       <Container>
//         <div
//           className="flex space-x-3 my-4 justify-between"
//           ref={scrollRef}
//         >
//           {alphabet.map((letter, index) => (
//             <div
//               id={`letter-${letter}`}
//               key={index}
//               className={`cursor-pointer text-lg uppercase whitespace-nowrap ${
//                 activeLetter === letter
//                   ? "font-bold text-black border-b-2 border-black"
//                   : "text-gray-500"
//               } hover:text-black transition-colors`}
//               onClick={() => handleLetterClick(letter)}
//             >
//               {letter}
//             </div>
//           ))}
//         </div>
//       </Container>

//       {/* Brand list */}
//       <div className="border-t-2 border-gray-200 pt-4">
//         <ul className="flex flex-wrap space-x-8 text-lg">
//           {/* Active letter's brand list first */}
//           {activeLetter && groupedBrands[activeLetter].length > 0 && (
//             <div className="mb-8">
//               <h2 className="font-bold text-2xl mb-4">{activeLetter}</h2>
//               <ul className="flex flex-wrap space-x-8">
//                 {groupedBrands[activeLetter].map((link, index) => (
//                   <Link key={index} href={link.href}>
//                     <li className="w-1/4 mb-3">
//                       <a className="hover:underline">{link.name}</a>
//                     </li>
//                   </Link>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Display all other letter groups below */}
//           {alphabet.map((letter) =>
//             letter !== activeLetter && groupedBrands[letter].length > 0 ? (
//               <div key={letter} className="mb-8">
//                 <h2 className="font-bold text-2xl mb-4">{letter}</h2>
//                 <ul className="flex flex-wrap space-x-8">
//                   {groupedBrands[letter].map((link, index) => (
//                     <Link key={index} href={link.href}>
//                       <li className="w-1/4 mb-3">
//                         <a className="hover:underline">{link.name}</a>
//                       </li>
//                     </Link>
//                   ))}
//                 </ul>
//               </div>git remote add origin git@github.com:sibtycodes/testingglamstudio.git
//             ) : null
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

export default function MegaMenu({ links, hoveredLink }) {
  const getSubMenu = (parentId) => {
    return links.filter((link) => link.parent === parentId?.toString());
  };

  console.log("hoveredLink", hoveredLink);

  // let brandLinks;
  // if (hoveredLink.href === "/brands") {
  //   brandLinks = getSubMenu(hoveredLink.id);
  // }

  return (
    <nav className="relative w-full bg-white shadow-lg z-50 transition duration-300 ease-in-out"
      style={{zIndex: '9'}}
    >
      {/* Horizontal line */}
      <div className=" w-full border border-b-02"></div>
      <section className="flex flex-row w-full h-full max-h-[386px]">
        {hoveredLink.href === "/brands" ? (
          null
        ) : (
          <>
            {/* Submenu container */}
            <div className="w-[70%] flex justify-center py-5 px-[2%]">
              <div className="flex flex-row w-full justify-start gap-4 md:gap-6 lg:gap-8 overflow-x-auto overflow-y-hidden">
                {getSubMenu(hoveredLink.id).length > 0 &&
                  getSubMenu(hoveredLink.id).map((link, index) => (
                    <div key={index} className="min-w-fit mr-0">
                      {/* Submenu title */}
                      <Link href={link.href}>
                        <Text style={"h4"} className={`uppercase mb-5`}>
                          {link.name}
                        </Text>
                      </Link>
                      {/* Submenu items */}
                      <ul className="flex flex-wrap flex-col text-sm h-[300px] gap-4">
                        {getSubMenu(hoveredLink.id).length > 0 &&
                          getSubMenu(link.id).map((subLink, index) => (
                            <Link key={index} href={subLink.href}>
                              <li
                                className={`flex flex-row items-center cursor-pointer ${lexendDeca.className} mr-5`}
                              >
                                {subLink.color ? (
                                  <div
                                    style={{
                                      backgroundColor: subLink.color,
                                    }}
                                    className={`w-4 h-4 rounded-full mr-2`}
                                  ></div>
                                ) : null}
                                {subLink.name}
                              </li>
                            </Link>
                          ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>{" "}
            {/* Submenu container */}
            {/* Image */}
            <div className="grid w-[30%] h-auto justify-end">
              <Image
                src={hoveredLink.img || img}
                alt="nav image"
                width={400}
                height={400}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                objectFit="contain"
              />
            </div>
          </>
        )}
      </section>
    </nav>
  );
}
