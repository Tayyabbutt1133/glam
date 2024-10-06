"use client"

import Link from 'next/link'
import Image from 'next/image'
import Container from "../../../../container"
import Text from "../../../../ui/Text"
import { jost } from '../../../../ui/fonts'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import bourjois from "/public/lifecycle/trending brands/bourjois.png"
import bourjoisLogo from "/public/lifecycle/trending brands/bourjois.svg"
import kerastase from "/public/lifecycle/trending brands/kerastase.png"
import kerastaseLogo from "/public/lifecycle/trending brands/kerastase.svg"
import maxfactor from "/public/lifecycle/trending brands/maxfactor.png"
import maxfactorLogo from "/public/lifecycle/trending brands/maxfactor.svg"
import rimmle from "/public/lifecycle/trending brands/rimmel.png"
import rimmleLogo from "/public/lifecycle/trending brands/rimmel.svg"

const rimmelBrandLanding = "rimmel"
const rimmelBrandListing = "79"

const maxFactorBrandLanding = "max-factor"
const maxFactorBrandListing = "74"

const bourjoisBrandLanding = "bourjois"
const bourjoisBrandListing = "70"

const kerastaseBrandLanding = "kerastase"
const kerastaseBrandListing = "936"

const brands = [
  {
    id: 70,
    img: bourjois,
    logo: bourjoisLogo,
    name: "Bourjois",
    brandLanding: bourjoisBrandLanding,
    brandListing: bourjoisBrandListing
  },
  {
    id: 79,
    img: rimmle,
    logo: rimmleLogo,
    name: "Rimmel",
    brandLanding: rimmelBrandLanding,
    brandListing: rimmelBrandListing
  },
  {
    id: 74,
    img: maxfactor,
    logo: maxfactorLogo,
    name: "Max Factor",
    brandLanding: maxFactorBrandLanding,
    brandListing: maxFactorBrandListing
  },
  {
    id: 936,
    img: kerastase,
    logo: kerastaseLogo,
    name: "Kerastase",
    brandLanding: kerastaseBrandLanding,
    brandListing: kerastaseBrandListing
  }
]

const BrandItem = ({ brand }) => (
  <Link 
    href={`/brands/${brand.brandLanding}/${brand.brandListing}`}
    className="block px-2"
  >
    <div className="aspect-square relative mb-4">
      <Image
        src={brand.img}
        alt={`${brand.name} products`}
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
    </div>
    <div className="flex justify-center">
      <Image
        src={brand.logo}
        alt={`${brand.name} logo`}
        width={206}
        height={32}
      />
    </div>
  </Link>
)

export default function TrendingBrand() {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          centerMode: true,
          centerPadding: '60px',
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      }
    ]
  }
  
  return (
    <Container className="my-24">
      <h1 className={`uppercase font-medium xs:font-semibold mb-14 mt-14 text-[20px] xs:text-2xl 2xl:text-[36px] ${jost.className}`}>
        trending brands
      </h1>
      <div className="hidden xl:grid xl:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <BrandItem key={brand.id} brand={brand} />
        ))}
      </div>
      <div className="xl:hidden">
        <Slider {...sliderSettings}>
          {brands.map((brand) => (
            <BrandItem key={brand.id} brand={brand} />
          ))}
        </Slider>
      </div>
    </Container>
  )
}