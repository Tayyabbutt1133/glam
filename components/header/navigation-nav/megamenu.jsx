"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import Text from "../../ui/Text";
import { jost, lexendDeca } from "../../ui/fonts";
import img from "/public/nav-images/skincare-nav.png";

export default function MegaMenu({ links, hoveredLink }) {
  // const submenu = links.filter(link => link.parent === hoveredLink.toString())
  // console.log(submenu)

  const getSubMenu = (parentId) => {
    return links.filter((link) => link.parent === parentId?.toString());
  };
  
  // if(hoveredLink === 74038){
  //  console.log()
  // }

  return (
    <nav className="relative w-full bg-white shadow-lg z-50 transition duration-300 ease-in-out">
      {/* Horizontal line */}
      <div className="h-px bg-gray-300"></div>
      <section className="flex flex-row w-full max-h-[386px]">
        {/* Submenu container */}
        <div className="w-[70%] flex justify-center py-5">
          <div className="flex flex-row w-[90%] justify-between gap-4 md:gap-6 lg:gap-8">
            {getSubMenu(hoveredLink).length > 0 &&
              getSubMenu(hoveredLink).map((link, index) => (
                <div key={index}>
                  {/* Submenu title */}
                  <Link href={link.href}>
                    <Text
                      style={"h4"}
                      className={`uppercase mb-5`}
                    >
                      {link.name}
                    </Text>
                  </Link>
                  {/* Submenu items */}
                  <ul className="flex flex-wrap flex-col text-sm h-[300px] gap-4">
                    {getSubMenu(hoveredLink).length > 0 &&
                      getSubMenu(link.id).map((subLink, index) => (
                        <Link key={index} href={subLink.href}>
                          <li
                            className={`flex flex-row items-center cursor-pointer ${lexendDeca.className} mr-10`}
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
            src={img}
            alt="nav image"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            objectFit="contain"
          />
        </div>
      </section>
    </nav>
  );
}
