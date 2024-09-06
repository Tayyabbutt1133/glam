"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import Text from "../../ui/Text";
import { jost, lexendDeca } from "../../ui/fonts";
import img from "/public/nav-images/skincare-nav.png";

export default function MegaMenu({ links, hoveredLink }) {

  const getSubMenu = (parentId) => {
    return links.filter((link) => link.parent === parentId?.toString());
  };
  
  console.log(links)
  
  if(hoveredLink.href === "/brands"){
    // console.log("brands")
  }

  return (
    <nav className="relative w-full bg-white shadow-lg z-50 transition duration-300 ease-in-out">
      {/* Horizontal line */}
      <div className="h-px bg-gray-300"></div>
      <section className="flex flex-row w-full max-h-[386px]">
        {/* Submenu container */}
        <div className="w-[80%] mx-6 border-purple-700 flex justify-center py-5">
          <div className="flex flex-row w-[100%]  justify-between gap-4 md:gap-6 lg:gap-8">
            {getSubMenu(hoveredLink.id).length > 0 &&
              getSubMenu(hoveredLink.id).map((link, index) => (
                <div key={index}>
                  {/* Submenu title */}
                  <Link href={link.href}>
                    <Text
                      style={"h4"}
                      className={`uppercase mb-5 flex`}
                    >
                      {link.name}
                    </Text>
                  </Link>
                  {/* Submenu items */}
                  <ul className="flex flex-wrap flex-col text-sm h-[300px] gap-4">
                    {getSubMenu(hoveredLink.id).length > 0 &&
                      getSubMenu(link.id).map((subLink, index) => (
                        <Link key={index} href={subLink.href}>
                          <li
                            className={`flex flex-row items-center cursor-pointer ${lexendDeca.className}`}
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
        {/* <div className="grid w-[30%] h-auto justify-end">
          <Image
            src={img}
            alt="nav image"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            objectFit="contain"
          />
        </div> */}
      </section>
    </nav>
  );
}
