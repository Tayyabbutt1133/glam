"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Jost } from "next/font/google";
import Container from "../../container";
import MegaMenu from "./megamenu";
import searchIcon from '../../../public/icons/search'
import { CartIcon } from "../../../public/icons/cart";
import { user } from "../../../public/icons/user";

const jost = Jost({ subsets: ["latin"] });

export default function Navigation() {
  const [hoveredLink, setHoveredLink] = useState({
    id: null,
    href: null,
    img: "",
  });
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/test-6`,
          {
            method: "GET",
            cache: "no-store",
          },
        );
        const data = await res.json();
        // Transform all hrefs to lowercase when setting the links
        const transformedData = data.map((link) => ({
          ...link,
          href: link.href?.toLowerCase() || "",
        }));
        setLinks(transformedData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLinks();
  }, []);

  const mainLinks = links?.filter((link) => link.parent === "0");

  const shouldShowMegaMenu = links?.find((link) => {
    return (
      link.id === hoveredLink.id &&
      link.href !== "/sale" &&
      link.href !== "/new-in"
    );
  });

  const handleMouseLeave = () => {
    setHoveredLink({ id: null, href: null, img: "" });
  };

  const closeMegaMenu = () => {
    setHoveredLink({ id: null, href: null, img: "" });
  };

  return (
    <div className="relative" onMouseLeave={handleMouseLeave}>
      <div
        className={`${jost.className} hidden lg:flex items-center h-[52px] font-normal lg:text-base xl:text-sm bg-white text-sm 2xl:text-lg relative`}
        style={{ boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.1)", zIndex: "10" }}
      >
        <Container>
          <nav className="flex w-[95%] mx-auto  flex-row  xl:gap-[0px] 2xl:gap-[0px] 2xl:text-[20px] xl:text-sm   justify-between xl:justify-around items-center py-3 font-normal">
            {mainLinks?.map((link, index) => (
              <Link
                className={`box-border pb-2 -mb-2 text-nowrap uppercase ${
                  index === 0 ? "text-sale" : ""
                }`}
                key={link.id}
                href={link.href === "/brands" ? "" : link.href}
                style={{
                  boxShadow:
                    hoveredLink.id === link.id
                      ? `inset 0 -2px 0 0 var(--color-hover)`
                      : "inset 0 -2px 0 0 transparent",
                  transition: "box-shadow 0.3s ease",
                }}
                onMouseEnter={() =>
                  setHoveredLink({
                    id: link.id,
                    href: link.href?.toLowerCase(),
                    img: link.menu_img,
                  })
                }
                onClick={closeMegaMenu}
              >
                <div>{link.name}</div>
              </Link>
            ))}
          </nav>
        </Container>
      </div>
      {shouldShowMegaMenu && (
        <div
          className="absolute top-full left-0 w-full"
          onMouseEnter={() => clearTimeout()}
          onMouseLeave={handleMouseLeave}
        >
          <MegaMenu
            hoveredLink={{
              ...hoveredLink,
              href: hoveredLink.href?.toLowerCase(),
            }}
            links={links.map((link) => ({
              ...link,
              href: link.href?.toLowerCase(),
            }))}
            closeMegaMenu={closeMegaMenu}
          />
        </div>
      )}
    </div>
  );
}
