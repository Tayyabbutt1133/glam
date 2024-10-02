'use client'

import Link from 'next/link'
import { jost } from './ui/fonts';


const Breadcrumb = ({ links }) => {
  const sanitizeText = (text) => {
    return text.replace(/&amp;/g, "&");
  };

  const capitalizeFirstLetter = (string) => {
    
    return sanitizeText(string && string.length > 0 ? string.charAt(0).toUpperCase() + string.slice(1) : '')
  }

  return (
    <nav aria-label="Breadcrumb" className="my-4">
      <ol className="flex space-x-2">
        {links.map((link, index) => (
          <li key={index} className={`flex  items-center ${jost.className}`}>
            {link.route ? (
              <Link
                href={link.route}
                className={`${index === links.length - 1 ? 'font-semibold' : 'text-[#8B929D]'}`}
              >
                {capitalizeFirstLetter(link.name)}
              </Link>
            ) : (
              <span className="text-gray-400 text-sm 2xl:text-[16px]">{capitalizeFirstLetter(link.name)}</span>
            )}
            {index < links.length - 1 && <span className="mx-1 text-[#8B929D]">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb