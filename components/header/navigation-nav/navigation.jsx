"use client";
import Link from "next/link";
import { Jost } from "next/font/google";

import Container from "../../container";

const jost = Jost({ subsets: ["latin"] });

let links = [
  { name: "Sale", link: "/sale" },
  { name: "New In", link: "/new-in" },
  { name: "Brands", link: "/product-categories/brands" },
  { name: "Makeup", link: "/product-categories/makeup" },
  { name: "Skincare", link: "/product-categories/skincare" },
  { name: "Hair", link: "/product-categories/hair" },
  { name: "Nails", link: "/product-categories/nails" },
  { name: "Fragrance", link: "/product-categories/fragrance" },
  { name: "Bath & Body", link: "/product-categories/bath-&-body" },
  { name: "Home", link: "/product-categories/homes" },
  { name: "Wellness", link: "/product-categories/wellness" },
  { name: "Electrics", link: "/product-categories/electrics" },
];


export default function Navigation() {
  return (
    <>
      <div
        className={`${jost.className} hidden lg:flex items-center h-[52px] font-normal lg:text-base xl:text-sm bg-white text-sm 2xl:text-lg`}
      >
        <Container>
          <nav className="flex flex-row w-full justify-between items-center py-3">
            {links.map((link, index) => (
              <Link
                className={`box-border pb-2 -mb-2 text-nowrap uppercase ${
                  index === 0 ? "text-sale" : ""
                }`}
                key={index}
                href={link.link}
                style={{
                  boxShadow: "inset 0 -2px 0 0 transparent",
                  transition: "box-shadow 0.3s ease",
                }}

                onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'inset 0px -2px 0px var(--color-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'inset 0 -2px 0 transparent'}
              >
                <div>{link.name}</div>
              </Link>
            ))}
          </nav>
        </Container>
      </div>
    </>
  );
}
