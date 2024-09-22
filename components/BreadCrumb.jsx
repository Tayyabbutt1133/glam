// components/Breadcrumb.js

"use client"
// components/Breadcrumb.js

import Link from 'next/link';

const Breadcrumb = ({ links }) => {
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };
      
  return (
    <nav aria-label="Breadcrumb" className="my-4 ">
      <ol className="flex space-x-2 text-sm ">
        {links.map((link, index) => (
          <li key={index} className="flex items-center">
            {link.route ? (
              <Link href={link.route} className={`${index == links.length -1 ? "font-semibold":"text-[#8B929D]"}`}>
               {capitalizeFirstLetter(link.name)}
              </Link>
            ) : (
              <span className="text-gray-400">{capitalizeFirstLetter(link.name)}</span>
            )}
            {index < links.length - 1 && (
              <span className="mx-1 text-[#8B929D]">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

