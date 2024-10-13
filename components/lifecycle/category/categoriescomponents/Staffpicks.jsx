"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"
import Container from "../../../container"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { jost } from "../../../ui/fonts"
import NextArrowIcon from "../../../../public/hero-banners/next-arrow"
import PrevArrowIcon from "../../../../public/hero-banners/prev-arrow"
import { useCategoryIdState } from "../../../../states/use-category-id"
import Product from "../../../product"
import Text from "../../../ui/Text"

const arrowStyles = {
  width: "40px",
  height: "40px",
  zIndex: 1,
  transition: "all 0.3s ease-in-out",
}

const NextArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={`absolute top-1/2 transform -translate-y-1/2 -right-4 ${className}`}
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

const decodeHtmlEntities = (text) => {
  const textarea = document.createElement("textarea")
  textarea.innerHTML = text
  return textarea.value
}

export default function Staffpicks() {
  const [favorites, setFavorites] = useState({})
  const [staffPicks, setStaffPicks] = useState([])
  const [loading, setLoading] = useState(true)
  const categoryId = useCategoryIdState((state) => state.categoryId)

  useEffect(() => {
    const fetchStaffPicks = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/api/staffpicks/${categoryId}`)
        setStaffPicks(response.data)
      } catch (error) {
        console.error("Error fetching staff picks:", error)
      } finally {
        setLoading(false)
      }
    }
    if (categoryId) fetchStaffPicks()
  }, [categoryId])

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    prevArrow: <div className="hidden md:block"><PrevArrow /></div>,
    nextArrow: <div className="hidden md:block"><NextArrow /></div>,
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

  const handleProductClick = (productId) => {
    console.log(`Product clicked: ${productId}`)
  }

  const handleFavoriteClick = (productId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [productId]: !prevFavorites[productId],
    }))
  }

  if (!categoryId) return null

  return (
    <Container className="my-16">
      <h1
       className={`uppercase font-medium xs:font-semibold mb-14  mt-14 text-[20px] xs:text-2xl 2xl:text-[36px] ${jost.className}`}
      >
        Staff Picks
      </h1>
      <div className="relative">
        {loading ? (
          <Slider {...settings}>
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="px-2">
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden relative flex flex-col h-full min-h-[420px] border border-gray-300">
                    <div className="w-full h-48">
                      <Skeleton height="100%" />
                    </div>
                    <div className="px-4 pb-4 flex-grow">
                      <Skeleton height={24} width="80%" className="mb-2" />
                      <Skeleton height={20} width="100%" className="mb-2" />
                      <Skeleton height={20} width="90%" className="mb-2" />
                      <Skeleton height={20} width="50%" className="mb-4" />
                      <Skeleton height={32} width="100%" />
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        ) : (
          <Slider {...settings}>
            {staffPicks?.map((product) => (
              <div key={product.id} className="px-2 h-full">
                <Product product={product} />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </Container>
  )
}