'use client'

import React from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import Link from 'next/link'

// Import your images
import rimmel from '../../../../public/brand_slider/brand_one.svg'
import loreal from '../../../../public/brand_slider/Group.svg'
import bourjois from '../../../../public/brand_slider/brand_three.svg'
import kerastase from '../../../../public/brand_slider/brand_four.svg'
import max_factor from '../../../../public/brand_slider/brand_five.svg'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const brands = [
  { id: 79, name: 'Rimmel', image: rimmel },
  { id: 72, name: 'L\'Oreal', image: loreal },
  { id: 70, name: 'Bourjois', image: bourjois },
  { id: 936, name: 'Kerastase', image: kerastase },
  { id: 74, name: 'Max Factor', image: max_factor },
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
    <div className="my-8">
      <Slider {...settings}>
        {brands.map((brand) => (
          <div key={brand.id} className="mx-8">
            <Link href={`/brands/${brand.id}`}>
              <Image
                src={brand.image}
                alt={brand.name}
                className="h-8 md:h-10 w-auto hover:brightness-75 transition duration-300 cursor-pointer"
              />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  )
}