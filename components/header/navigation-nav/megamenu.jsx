import Image from "next/image";
import Link from "next/link";

import { lexendDeca } from "@/components/ui/fonts";
import Text from "@/components/ui/Text";
import BrandMegaMenu from "./brands-megamenu";
import img from "/public/nav-images/skincare-nav.png";




export default function MegaMenu({ links, hoveredLink }) {
  const getSubMenu = (parentId) => {
    return links.filter((link) => link.parent === parentId?.toString());
  };

  return (
    <nav
      className="relative w-full bg-white shadow-lg z-50 transition duration-300 ease-in-out"
      style={{ zIndex: "9" }}
    >
      {/* Horizontal line */}
      <div className=" w-full border border-b-02"></div>
      {hoveredLink.href === "/brands" ? (
        <BrandMegaMenu links={links} />
      ) : (
        <section className="flex flex-row w-full h-full max-h-[386px]">
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
        </section>
      )}
    </nav>
  );
}