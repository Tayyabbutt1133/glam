"use client"

import { useState, useEffect } from "react"
import Container from "/components/container"
import MenucategoryLandingPage from "/components/lifecycle/category/MenucategoryLandingPage.jsx"
import Bestseller from "/components/lifecycle/category/categoriescomponents/Bestseller"
import Staffpicks from "/components/single-product/components/Staffpicks"
import Aboutbrand from "/components/lifecycle/brand/Aboutbrand"
import Faqsbrand from "/components/lifecycle/brand/Faqsbrand"
import olaplexbrand from "/public/about_brands/olaplexslide.svg"
import SliderComponent from "/components/lifecycle/mutual-components/slider"
import Newin from "/components/lifecycle/category/categoriescomponents/Newin"
import MakeupTips from "/components/lifecycle/mutual-components/makeup-tips"

export default function Page() {
  const [result, setResult] = useState(null)

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


  return (
    <div>
      <div className="">
        <Container>
          <MenucategoryLandingPage brands={result} />
        </Container>
        <SliderComponent bannerObject={bannerObject} />
        <Container>
          <Bestseller />
          <Aboutbrand />
        </Container>
        <Newin />
        <Container>
          <Staffpicks />
          <MakeupTips />
          <Faqsbrand />
        </Container>
      </div>
    </div>
  )
}