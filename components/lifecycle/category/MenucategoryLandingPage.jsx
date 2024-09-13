'use client'

import React, { useState, useEffect, memo } from "react"
import Image from "next/image"
import Link from 'next/link'
import logo_one from "../../../public/product_category_landing/rounded_cat/one.svg"
import logo_two from "../../../public/product_category_landing/rounded_cat/two.svg"
import logo_three from "../../../public/product_category_landing/rounded_cat/three.svg"
import logo_four from "../../../public/product_category_landing/rounded_cat/four.svg"
import logo_five from "../../../public/product_category_landing/rounded_cat/five.svg"
import logo_six from "../../../public/product_category_landing/rounded_cat/six.svg"
import logo_seven from "../../../public/product_category_landing/rounded_cat/seven.svg"
import { jost } from "../../ui/fonts"
import axios from "axios"
import { useParams } from "next/navigation"
import Skeleton from "react-loading-skeleton"

import { useCategoryIdState } from "../../../states/use-category-id"
import Container from "../../container"

const MenucategoryLandingPage = () => {
  const [mainCategory, setMainCategory] = useState(null)
  const [subCategories, setSubCategories] = useState([])
  const { categorylanding } = useParams()

  const setCategoryId = useCategoryIdState((state) => state.setCategoryId)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const fetchData = async () => {
      try {
        if (categorylanding) {
          setMainCategory(null)
          setSubCategories([])
          setCategoryId(null)

          const cateId = await axios.get(`/api/${categorylanding}`, { signal })
          setCategoryId(cateId.data)

          if (cateId.data) {
            const mainCateData = await axios.get(
              `/api/categoryData/${cateId.data}`,
              { signal },
            )
            setMainCategory(mainCateData.data.mainCategory)
            setSubCategories(mainCateData.data.subCategories)
          }
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message)
        } else {
          console.log("Error fetching data:", error)
        }
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }
  }, [categorylanding, setCategoryId])

  const sanitizeText = (text) => {
    return text?.replace(/&amp;/g, "&")
  }

  const logos = [
    logo_one,
    logo_two,
    logo_three,
    logo_four,
    logo_five,
    logo_six,
    logo_seven,
  ]

  return (
    <Container className="my-14">
      <h1
        className={`text-2xl ${jost.className} uppercase font-bold text-center mt-10`}
      >
        {mainCategory ? (
          sanitizeText(mainCategory?.name)
        ) : (
          <Skeleton width={200} height={30} />
        )}
      </h1>

      <div className="mt-10">
        <ul className="flex justify-center gap-8">
          {subCategories.length > 0 ? (
            subCategories.map((subCat, index) => (
              <li
                key={subCat.id}
                className="flex flex-col items-center text-center"
              >
                <Link href={`/product-categories/${categorylanding}/${subCat.slug}`} passHref>
                  <div className="flex justify-center items-center w-24 h-24 rounded-full overflow-hidden border-4 border-transparent hover:border-blue-500 transition-all duration-300 ease-in-out">
                    <Image
                      src={logos[index]}
                      alt={sanitizeText(subCat.name)}
                      className="object-cover w-full h-full cursor-pointer"
                    />
                  </div>
                  <p className={`mt-2 text-sm text-center font-semibold ${jost.className}`}>
                    {sanitizeText(subCat.name)}
                  </p>
                </Link>
              </li>
            ))
          ) : (
            Array(7)
              .fill(null)
              .map((_, index) => (
                <li
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <div className="flex justify-center items-center w-24 h-24 rounded-full overflow-hidden border-4 border-transparent">
                    <Skeleton circle={true} width={96} height={96} />
                  </div>
                  <p className={`mt-2 text-sm font-semibold ${jost.className}`}>
                    <Skeleton width={80} height={15} />
                  </p>
                </li>
              ))
          )}
        </ul>
      </div>
    </Container>
  )
}

export default memo(MenucategoryLandingPage)