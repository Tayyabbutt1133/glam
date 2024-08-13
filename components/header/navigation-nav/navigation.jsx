"use client";
import Link from "next/link";
import { Jost } from "next/font/google";

import Container from "../../container";

const jost = Jost({ subsets: ["latin"] });

let links = [
  "Sale",
  "New In",
  "Brands",
  "Makeup",
  "Skincare",
  "Hair",
  "Nails",
  "Fragrance",
  "Bath & Body",
  "Home",
  "Wellness",
  "Electrics",
];

export default function Navigation() {
  return (
    <>
      <div
        className={`${jost.className} flex items-center h-[66px] font-normal lg:text-sm xl:text-xl bg-white`}
      >
        <Container>
          <nav className="flex flex-row w-full justify-center items-center py-3 lg:gap-4 xl:gap-6 2xl:gap-11">
            {links.map((link, index) => (
              <Link
                className={`box-border pb-2 -mb-2 text-nowrap uppercase ${
                  index === 0 ? "text-sale" : ""
                }`}
                key={index}
                href={"#"}
                style={{
                  boxShadow: "inset 0 -2px 0 0 transparent",
                  transition: "box-shadow 0.3s ease",
                }}

                onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'inset 0px -2px 0px var(--color-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'inset 0 -2px 0 transparent'}
              >
                <div>{link}</div>
              </Link>
            ))}
          </nav>
        </Container>
      </div>
    </>
  );
}
