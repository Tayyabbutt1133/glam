"use client";

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Container from "../../../components/container"
import Text from "../../../components/ui/Text"
import Image from "next/image"
import Link from "next/link"
import { jost, lexendDeca } from "../../../components/ui/fonts"

const decodeHtmlEntities = (text) => {
  return text.replace(/&amp;/g, '&')
}

const SkeletonLoader = () => (
  <div className="aspect-square w-full bg-gray-200 rounded-lg animate-pulse"></div>
)

const RecentlyViewedItem = ({ product }) => {
  const decodedName = decodeHtmlEntities(product.name)

  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="aspect-square w-full relative border border-gray-100 rounded-sm">
        <Image
          src={product.images[0]?.src || '/placeholder.png'}
          alt={decodedName}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
    </Link>
  )
}

const Recientlyviewed = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get('https://glam.clickable.site/wp-json/wc/v3/products/', {
        params: {
          consumer_key: "ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d",
          consumer_secret: "cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc",
          orderby: 'date',
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
    <Container className="space-y-6 mb-14 mt-20">
   <h1 className={`${jost.className} font-semibold text-2xl`}> Recently Viewed</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {loading
          ? Array(4).fill().map((_, index) => <SkeletonLoader key={index} />)
          : products.map((product) => (
              <RecentlyViewedItem key={product.id} product={product} />
            ))
        }
      </div>
    </Container>
  )
}

export default Recientlyviewed