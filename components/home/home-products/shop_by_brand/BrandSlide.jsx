'use client'

import React from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import Link from 'next/link'
import { jost } from '../../../ui/fonts'

// Import your images
import rimmel from '../../../../public/brand_slider/brand_one.svg'
import loreal from '../../../../public/brand_slider/Group.svg'
import bourjois from '../../../../public/brand_slider/brand_three.svg'
import kerastase from '../../../../public/brand_slider/brand_four.svg'
import max_factor from '../../../../public/brand_slider/brand_five.svg'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const brands = [
  { id: 79, name: 'rimmel', image: rimmel, width: 129, height: 32 },
  { id: 72, name: 'loreal', image: loreal, width: 129, height: 32 },
  { id: 70, name: 'bourjois', image: bourjois, width: 129, height: 32 },
  { id: 936, name: 'kerastase', image: kerastase, width: 129, height: 32 },
  { id: 74, name: 'max-factor', image: max_factor, width: 129, height: 32 },
]

export default function BrandSlide() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className="my-12 container">
      <h2 className={`2xl:text-[36px] xs:text-2xl text-[20px] font-semibold mb-8 uppercase ${jost.className}`}>Shop by Brand</h2>
      <div className="overflow-hidden">
        <Slider {...settings} className="brand-slider -mx-4">
          {brands.map((brand) => (
            <div key={brand.id} className="px-4">
              <Link href={`/brands/${brand.name}`}>
                <div className="flex items-center justify-center h-20 rounded-lg hover:border-gray-300 transition duration-300">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={brand.width}
                    height={brand.height}
                    className="max-h-full w-auto object-contain hover:opacity-75 transition duration-300 grayscale hover:grayscale-0"
                  />
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}