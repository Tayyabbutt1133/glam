"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"
import Product from "../../../product"
import Container from "../../../container"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import NextArrowIcon from "../../../../public/hero-banners/next-arrow"
import PrevArrowIcon from "../../../../public/hero-banners/prev-arrow"
import { useCategoryIdState } from "../../../../states/use-category-id"
import Text from "../../../ui/Text"
import { jost } from "../../../ui/fonts"

const arrowStyles = {
  width: "40px",
  height: "40px",
  zIndex: 1,
  transition: "all 0.3s ease-in-out",
}

const NextArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={`absolute top-1/2 transform -translate-y-1/2 -right-2 ${className}`}
      onClick={onClick}
      style={{
        ...style,
        ...arrowStyles,
      }}
    >
      <NextArrowIcon />
    </div>
  )
}

const PrevArrow = ({ className, style, onClick }) => (
  <div
    className={`absolute top-1/2 transform -translate-y-1/2 -left-7 ${className}`}
    onClick={onClick}
    style={{
      ...style,
      ...arrowStyles,
    }}
  >
    <PrevArrowIcon />
  </div>
)

export default function Bestseller() {
  const [bestSellers, setBestSellers] = useState([])
  const [loading, setLoading] = useState(true)
  const categoryId = 147

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/api/bestsellers/${categoryId}`)
        setBestSellers(response.data)
      } catch (error) {
        console.error("Error fetching staff picks:", error)
      } finally {
        setLoading(false)
      }
    }
    if (categoryId) fetchBestSellers()
  }, [categoryId])

  const settings = {
    dots: false,
    infinite: true,
    speed: 900,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    arrows: true,
    prevArrow: <div className="hidden sm:block"><PrevArrow /></div>,
    nextArrow: <div className="hidden sm:block"><NextArrow /></div>,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          arrows: true,
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
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          rows: 2,
          slidesPerRow: 1,
        },
      },
    ],
  }

  if (!categoryId) return null

  return (
    <Container className="my-16">
      <h1 className={`uppercase mb-8 2xl:text-[36px] xs:text-2xl text-[20px] ${jost.className} font-semibold`}>
        Bestsellers
      </h1>
      <div className="relative">
        {!bestSellers.length ? (
          <Slider {...settings}>
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="px-2">
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden relative flex flex-col h-full min-h-[420px] border border-gray-300">
                    <div className="flex items-center w-full h-48">
                      <Skeleton height="100%" />
                    </div>
                    <div className="px-4 pb-4 flex-grow">
                      <Skeleton height={24} width="80%" className="mb-3" />
                      <Skeleton height={20} width="100%" className="mb-3" />
                      <Skeleton height={20} width="90%" className="mb-3" />
                      <Skeleton height={20} width="50%" className="mb-4" />
                      <Skeleton height={32} width="100%" />
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        ) : (
          <Slider {...settings}>
            {bestSellers.map((product) => (
              <div key={product.id} className="">
                <Product product={product} />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </Container>
  )
}