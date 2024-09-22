'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import ArrowDown from "../../../public/icons/arrow-down"
import { lexendDeca } from "../../ui/fonts"
import Container from "../../container"
import { usePopupStore } from "../../../states/use-popup-store.jsx"
import uk_flag from '../../../public/Flag_uk.png'
import Text from '../../../components/ui/Text'






export default function NewsBannerNav() {
  const [mounted, setMounted] = useState(false)
  const onOpen = usePopupStore((state) => state.onOpen)
  const selectedCountryFromStore = usePopupStore((state) => state.selectedCountry)

  const defaultCountry = { countryCode: "en", code: "GBP", country: "United Kingdom" }

  const [selectedCountry, setSelectedCountry] = useState(() => {
    if (typeof window !== "undefined") {
      const savedCountry = localStorage.getItem("selectedCountry")
      return savedCountry
        ? JSON.parse(savedCountry)
        : defaultCountry
    } else {
      return defaultCountry
    }
  })

  const [flagUrl, setFlagUrl] = useState("")

  const fetchFlag = async (countryCode) => {
    if (countryCode === "en") {
      setFlagUrl("") // We'll use the custom UK flag, so we don't need a URL
    } else {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
        const data = await response.json()
        setFlagUrl(data[0].flags.svg)
      } catch (error) {
        console.error("Error fetching flag:", error)
      }
    }
  }

  useEffect(() => {
    if (selectedCountry.countryCode) {
      fetchFlag(selectedCountry.countryCode)
    }
  }, [selectedCountry])

  useEffect(() => {
    const unsubscribe = usePopupStore.subscribe((state) => {
      const updatedCountry = state.selectedCountry
      if (updatedCountry && updatedCountry.countryCode !== selectedCountry.countryCode) {
        setSelectedCountry(updatedCountry)
        if (typeof window !== "undefined") {
          localStorage.setItem("selectedCountry", JSON.stringify(updatedCountry))
        }
      }
    })

    return () => unsubscribe()
  }, [selectedCountry])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className={`hidden lg:flex ${lexendDeca.className} w-full bg-[#F7EBE0]`}>
      <Container>
        <div className="flex w-full justify-center items-center relative py-2">
          <Text style={"sm"} className="text-center ">
            Up to 50% off selected brands + UK next day delivery over £40
          </Text>
          <div className="flex flex-row gap-1 absolute right-0">
            <div className="relative flex w-10">
              {selectedCountry.countryCode === "en" ? (
                <Image
                  src={uk_flag}
                  alt="United Kingdom Flag"
                  width={31}
                  height={22}
                  objectFit="contain"
                />
              ) : flagUrl ? (
                <Image
                  src={flagUrl}
                  alt={`${selectedCountry.country} Flag`}
                  width={31}
                  height={22}
                  objectFit="contain"
                />
              ) : null}
            </div>
            <button
              className={`flex flex-row items-center cursor-pointer gap-2`}
              onClick={onOpen}
            >
              <div className={`font-normal text-base`}>
                <span className="lowercase">{selectedCountry.countryCode}</span> - {selectedCountry.code}
              </div>
              <ArrowDown className="w-3 h-auto" />
            </button>
          </div>
        </div>
      </Container>
    </div>
  )
}