"use client"

import { useState, useEffect } from "react"
import olaplexbrand from "/public/about_brands/olaplexslide.svg"
import Container from "../../../../components/container"
import MenucategoryLandingPage from "../../../../components/lifecycle/category/MenucategoryLandingPage"
import SliderComponent from "../../../../components/lifecycle/mutual-components/slider"
import Bestseller from "../../../../components/lifecycle/category/categoriescomponents/Bestseller"
import MakeupTips from "../../../../components/lifecycle/mutual-components/makeup-tips"
import Aboutbrand from "../../../../components/lifecycle/brand/Aboutbrand"
import InFocus from "../../../../components/lifecycle/brand/Infocus"
import NewIn from "../../../../components/lifecycle/category/categoriescomponents/Newin"
import Faqsbrand from "../../../../components/lifecycle/brand/Faqsbrand"




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