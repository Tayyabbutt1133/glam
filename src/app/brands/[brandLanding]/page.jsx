'use client'

import { useState, useEffect } from "react"
import olaplexbrand from "/public/about_brands/olaplexslide.svg"
import SliderComponent from "/components/lifecycle/mutual-components/slider"
import NewIn from "/components/lifecycle/category/categoriescomponents/Newin"
import MakeupTips from "/components/lifecycle/mutual-components/makeup-tips"
import { usePathname } from "next/navigation"
import BreadCrumb from "../../../../components/BreadCrumb"
import Container from "../../../../components/container"
import MenucategoryLandingPage from "../../../../components/lifecycle/category/MenucategoryLandingPage"
import Bestseller from "../../../../components/lifecycle/category/categoriescomponents/Bestseller"
import Aboutbrand from '../../../../components/lifecycle/brand/Aboutbrand'
import InFocus from '../../../../components/lifecycle/brand/Infocus'
import Faqsbrand from '../../../../components/lifecycle/brand/Faqsbrand'

export default function Page() {
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const path = usePathname()
  const currentBrand = path.split("/").pop()

  useEffect(() => {
    const fetchProductCategories = async () => {
      try {
        const res = await fetch(
          "https://glam.clickable.site/wp-json/api/v2/product_categories"
        )
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        setResult(data.result)
      } catch (e) {
        console.error(e.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProductCategories()
  }, [])

  useEffect(() => {
    if (result) {
      console.log(result)
    }
  }, [result])

  let bannerObject = [
    {
      title: "DISCOVER MAC STUDIO RADIANCE",
      description: "Discover MAC Beauty's latest Radiance Foundation Range. ",
      src: olaplexbrand,
    },
  ]

  const breadcrumblinks = [
    { name: "Home", route: "/" },
    { name: currentBrand, route: `/brands/${currentBrand}` },
  ]

  return (
    <div>
      <div className="">
        <Container>
          {!isLoading && <BreadCrumb links={breadcrumblinks} />}
          <MenucategoryLandingPage brands={result} />
        </Container>
        <SliderComponent bannerObject={bannerObject} />
        <Bestseller />
        <Aboutbrand />
        <NewIn />
        <Container>
          <InFocus />
          <MakeupTips />
          <Faqsbrand />
        </Container>
      </div>
    </div>
  )
}