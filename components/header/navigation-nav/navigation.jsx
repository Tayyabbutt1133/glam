
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Jost } from "next/font/google";
import Container from "../../container";
import MegaMenu from "./megamenu";

const jost = Jost({ subsets: ["latin"] });

export default function Navigation() {
  const [hoveredLink, setHoveredLink] = useState({ id: null, href: null});
  const [links, setLinks] = useState([]);
  const mainLinks = links?.filter(link => link.parent === "0") 
  
  // fetching data from URL
  useEffect(()=> {
    const fetchLinks = async () => {
      try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/test-6`, {
          method: "GET",
          cache: "no-store",
        });
        const data = await res.json()
        setLinks(data)
      }
      catch(err){
        console.error(err)
      }
    }
    fetchLinks()
  }, [])
  
  // condition of mega menu
  // no megamenu for sale and new-in
  const shouldShowMegaMenu = links?.find(link => {
    return link.id === hoveredLink.id && link.href !== "/sale" && link.href !== "/new-in"
  })


  // handling clicking
  const handleLinkClick = (link) => {
    setHoveredLink({ id: null, href: null });
  };


  return (
    <div
      className={`${jost.className} hidden lg:flex items-center h-[52px] font-normal lg:text-base xl:text-sm bg-white text-sm 2xl:text-lg relative`}
      onMouseLeave={() => setHoveredLink({ id: null, href: null})} // Close mega menu when mouse leaves the entire navigation area
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
                boxShadow: hoveredLink.id === link.id ? `inset 0 -2px 0 0 var(--color-hover)` : "inset 0 -2px 0 0 transparent",
                transition: "box-shadow 0.3s ease",
              }}
              onMouseEnter={() => setHoveredLink({ id: link.id, href: link.href })}
              // this is will show the data on console and pass data of clicked link category
              onClick={()=>handleLinkClick(link)}
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
