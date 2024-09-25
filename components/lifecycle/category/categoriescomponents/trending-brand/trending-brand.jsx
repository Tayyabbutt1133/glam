import Link from 'next/link'
import Image from 'next/image'
import Container from "../../../../container"
import Text from "../../../../ui/Text"

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

export default function TrendingBrand() {
  
  return (
    <Container className="my-24">
      <Text style={"h1"} className="uppercase mb-14 mt-14">
        trending brands
      </Text>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <Link 
            key={brand.id} 
            href={`/brands/${brand.brandLanding}/${brand.brandListing}`}
            className="block"
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
            <div className="flex  2xl:w-[194px] 2xl:h-[32px]">
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                width={120}
                height={40}
              />
            </div>
          </Link>
        ))}
      </div>
    </Container>
  )
}