"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Jost } from "next/font/google";
import Container from "../../container";
import MegaMenu from "./megamenu"; // Make sure the path is correct
import axios from "axios";

const jost = Jost({ subsets: ["latin"] });

// let links = [
//   { name: "Sale", link: "/sale" },
//   { name: "New In", link: "/new-in" },
//   { name: "Brands", link: "/brands" },
//   { name: "Makeup", link: "/product-categories/makeup" },
//   { name: "Skincare", link: "/product-categories/skincare" },
//   { name: "Hair", link: "/product-categories/hair" },
//   { name: "Nails", link: "/product-categories/nails" },
//   { name: "Fragrance", link: "/product-categories/fragrance" },
//   { name: "Bath & Body", link: "/product-categories/bath-&-body" },
//   { name: "Home", link: "/product-categories/homes" },
//   { name: "Wellness", link: "/product-categories/wellness" },
//   { name: "Electrics", link: "/product-categories/electrics" },
// ];


export default function Navigation() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [links, setLinks] = useState([]);
  const mainLinks = links.filter(link => link.parent === "0") 
  
  
  
  useEffect(()=> {
    const fetchLinks = async () => {
      try{
        const res = await fetch('/api/nav')
        const data = res.data
        setLinks(data)
      }
      catch(err){
        console.error(err)
      }
    }
    fetchLinks()
  }, [])
  
  // no megamenu for sale and new-in
  const shouldShowMegaMenu = links.find(link => {
    return link.id === hoveredLink && link.href !== "/sale" && link.href !== "/new-in"
  })

  const handleLinkClick = () => {
    setHoveredLink(null);
  };

  return (
    <div
      className={`${jost.className} hidden lg:flex items-center h-[52px] font-normal lg:text-base xl:text-sm bg-white text-sm 2xl:text-lg relative`}
      onMouseLeave={() => setHoveredLink(null)} // Close mega menu when mouse leaves the entire navigation area
    >
      <Container>
        <nav className="flex flex-row w-full justify-between items-center py-3">
          {mainLinks?.map((link, index) => (
            <Link
              className={`box-border pb-2 -mb-2 text-nowrap uppercase ${
                index === 0 ? "text-sale" : ""
              }`}
              key={link.id}
              href={link.href}
              style={{
                boxShadow: hoveredLink === link.id ? `inset 0 -2px 0 0 var(--color-hover)` : "inset 0 -2px 0 0 transparent",
                transition: "box-shadow 0.3s ease",
              }}
              onMouseEnter={() => setHoveredLink(link.id)}
              onClick={handleLinkClick}
            >
              <div>{link.name}</div>
            </Link>
          ))}
        </nav>
      </Container>
      {shouldShowMegaMenu && (
        <div className="absolute top-full left-0 w-full">
          <MegaMenu hoveredLink={hoveredLink} links={links} />
        </div>
      )}
    </div>
  );
}
