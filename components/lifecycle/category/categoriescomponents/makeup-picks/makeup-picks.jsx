"use client";

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Container from "../../../../container"
import Text from "../../../../ui/Text"
import Image from "next/image"
import Link from "next/link"
import { jost, lexendDeca } from "../../../../ui/fonts"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const decodeHtmlEntities = (text) => {
  return text.replace(/&amp;/g, '&')
}

const shortenProductName = (name, maxLength = 50) => {
  if (name.length <= maxLength) return name
  return name.substring(0, maxLength - 3) + '...'
}

const SkeletonLoader = () => (
  <div className="flex flex-col items-start gap-5 h-full animate-pulse">
    <div className="aspect-square w-full bg-gray-200 rounded-lg"></div>
    <div className="flex-grow flex flex-col gap-3 items-start justify-start w-full">
      <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </div>
    <div className="w-full h-10 bg-gray-200 rounded-lg"></div>
  </div>
)

const CustomButton = ({ onClick, children, className }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors ${className} ${jost.className}`}
  >
    {children}
  </button>
)

const SingleMakeupPick = ({ product }) => {
  const brand = product.attributes.find((attr) => attr.name === "Brand")?.options[0] || "Unknown Brand"
  const decodedName = decodeHtmlEntities(product.name)

  return (
    <div className="flex flex-col items-start gap-5 h-full px-2">
      <Link href={`/product/${product.id}`} className="w-full">
        <div className="aspect-square w-full relative cursor-pointer">
          <Image
            src={product.images[0]?.src || '/placeholder.png'}
            alt={decodedName}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </Link>
      <div className="flex-grow flex flex-col gap-3 items-start justify-start">
        <h1 className={`font-semibold uppercase ${jost.className}`}>
          {brand}
        </h1>
        <p className={`${lexendDeca.className} font-normal`}>
          {decodedName}
        </p>
      </div>
      <Link href={`/product/${product.id}`} className="w-full">
        <CustomButton className="mt-auto text-sm xl:w-[55%] hover:bg-[#CF8562] uppercase">
          Shop Now
        </CustomButton>
      </Link>
    </div>
  )
}

const MakeupPicks = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get('https://glam.clickable.site/wp-json/wc/v3/products/', {
        params: {
          consumer_key: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
          consumer_secret: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
          orderby: 'popularity',
          order: 'desc',
          per_page: 4,
        },
      })
      .then((response) => {
        setProducts(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching product data:', error)
        setError('Failed to load products. Please try again later.')
        setLoading(false)
      })
  }, [])

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '60px',
        }
      }
    ]
  }

  if (error) {
    return <Container className="text-center py-10 text-red-500">{error}</Container>
  }

  return (
    <Container className="space-y-10 mb-32 mt-20">
      <h1 className={`uppercase font-medium xs:font-semibold mt-14 text-[20px] xs:text-2xl 2xl:text-[36px] ${jost.className}`}>
        Makeup Picks for You
      </h1>
      <div className="hidden lg:grid lg:grid-cols-4 gap-6">
        {loading
          ? Array(4).fill().map((_, index) => <SkeletonLoader key={index} />)
          : products.map((product) => (
              <SingleMakeupPick key={product.id} product={product} />
            ))
        }
      </div>
      <div className="lg:hidden">
        <Slider {...sliderSettings}>
          {loading
            ? Array(4).fill().map((_, index) => (
                <div key={index} className="px-2">
                  <SkeletonLoader />
                </div>
              ))
            : products.map((product) => (
                <SingleMakeupPick key={product.id} product={product} />
              ))
          }
        </Slider>
      </div>
    </Container>
  )
}

export default MakeupPicks