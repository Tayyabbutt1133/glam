"use client";

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Container from '../../../../components/container'
// import Text from "../../../../ui/Text"
import Text from '../../../../components/ui/Text'
import Image from "next/image"
import Link from "next/link"
import { jost } from "../../../../components/ui/fonts"
import { useCartStore } from '/states/Cardstore'

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
  const addToCart = useCartStore((state) => state.addToCart)
  const brand = product.attributes.find((attr) => attr.name === "Brand")?.options[0] || "Unknown Brand"
  const decodedName = decodeHtmlEntities(product.name)
  const shortName = shortenProductName(decodedName)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  return (
    <div className="flex flex-col items-start gap-5 h-full">
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
        <Text style="h3" className="font-semibold uppercase">
          {brand}
        </Text>
        <Text style="sm" className="line-clamp-2">
          {shortName}
        </Text>
      </div>
      <Link href={`/product/${product.id}`}>
      <CustomButton onClick={handleAddToCart} className="mt-auto  uppercase hover:bg-[#CF8562]">
        Shop Now
      </CustomButton>
      </Link>
    </div>
  )
}

const Newin = () => {
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

  if (error) {
    return <Container className="text-center py-10 text-red-500">{error}</Container>
  }

  return (
    <Container className="space-y-10 mb-28 mt-20">
      <Text style="h1" className="uppercase">New In</Text>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array(4).fill().map((_, index) => <SkeletonLoader key={index} />)
          : products.map((product) => (
              <SingleMakeupPick key={product.id} product={product} />
            ))
        }
      </div>
    </Container>
  )
}

export default Newin