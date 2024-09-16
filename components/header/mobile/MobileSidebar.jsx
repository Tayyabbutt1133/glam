'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, ChevronRight, ChevronLeft, Home } from 'lucide-react'
import { jost } from '../../ui/fonts'
import { usePopupStore } from '../../../states/use-popup-store'
import ArrowDown from 'public/icons/arrow-down'

export default function MobileSidebar({ isOpen, onClose }) {
  const [links, setLinks] = useState([])
  const [currentCategory, setCurrentCategory] = useState(null)
  const [currentSubCategory, setCurrentSubCategory] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mounted, setMounted] = useState(false)

  const onOpen = usePopupStore((state) => state.onOpen)
  const selectedCountryFromStore = usePopupStore((state) => state.selectedCountry)

  const [selectedCountry, setSelectedCountry] = useState(() => {
    if (typeof window !== 'undefined') {
      if (
        selectedCountryFromStore &&
        selectedCountryFromStore.countryCode &&
        selectedCountryFromStore.countryCode.length === 2
      ) {
        return selectedCountryFromStore
      }
      const savedCountry = localStorage.getItem('selectedCountry')
      const parsedCountry = savedCountry ? JSON.parse(savedCountry) : null
      return parsedCountry &&
        parsedCountry.countryCode &&
        parsedCountry.countryCode.length === 2
        ? parsedCountry
        : { countryCode: 'gb', code: 'GBP', country: 'United Kingdom' }
    } else {
      return { countryCode: 'gb', code: 'GBP', country: 'United Kingdom' }
    }
  })
  const [flagUrl, setFlagUrl] = useState('')

  const fetchFlag = async (countryCode) => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/alpha/${countryCode}`
      )
      const data = await response.json()
      setFlagUrl(data[0].flags.svg)
    } catch (error) {
      console.error('Error fetching flag:', error)
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
      if (
        updatedCountry &&
        updatedCountry.countryCode !== selectedCountry.countryCode
      ) {
        setSelectedCountry(updatedCountry)
        if (typeof window !== 'undefined') {
          localStorage.setItem(
            'selectedCountry',
            JSON.stringify(updatedCountry)
          )
        }
      }
    })

    return () => unsubscribe()
  }, [selectedCountry])

  useEffect(() => {
    const fetchLinks = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/test-6`,
          {
            method: 'GET',
            cache: 'no-store',
          }
        )
        if (!res.ok) {
          throw new Error('Failed to fetch navigation data')
        }
        const data = await res.json()
        setLinks(data)
      } catch (err) {
        console.error(err)
        setError('Failed to load navigation. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchLinks()
  }, [])

  const mainLinks = links?.filter((link) => link.parent === '0')

  const goBack = () => {
    if (currentSubCategory) {
      setCurrentSubCategory(null)
    } else if (currentCategory) {
      setCurrentCategory(null)
    } else {
      onClose()
    }
  }

  const renderCategories = () => {
    if (isLoading) {
      return <div className="text-center py-4">Loading...</div>
    }

    if (error) {
      return <div className="text-center py-4 text-red-500">{error}</div>
    }

    if (currentSubCategory) {
      const subCategoryLink = links.find(
        (link) => link.name === currentSubCategory
      )
      const items = links.filter((link) => link.parent === subCategoryLink?.id)
      return (
        <>
          <div className="flex items-center mb-4">
            <button onClick={goBack} className="mr-2" aria-label="Go back">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-semibold">{currentSubCategory}</h2>
          </div>
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="flex items-center justify-between py-2 border-b"
              onClick={onClose}
            >
              {item.name}
            </Link>
          ))}
        </>
      )
    }

    if (currentCategory) {
      const categoryLink = links.find((link) => link.name === currentCategory)
      const items = links.filter((link) => link.parent === categoryLink?.id)
      return (
        <>
          <div className="flex items-center mb-4">
            <button onClick={goBack} className="mr-2" aria-label="Go back">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-semibold">{currentCategory}</h2>
          </div>
          {items.map((item) => (
            <button
              key={item.id}
              className="flex items-center justify-between w-full py-2 border-b"
              onClick={() => setCurrentSubCategory(item.name)}
            >
              {item.name}
              <ChevronRight className="w-5 h-5" />
            </button>
          ))}
        </>
      )
    }

    return mainLinks?.map((category, index) => (
      <button
        key={category.id}
        className={`flex items-center justify-between w-full py-2 border-b ${
          index === 0 ? 'text-sale' : ''
        }`}
        onClick={() => setCurrentCategory(category.name)}
      >
        {category.name}
        <ChevronRight className="w-5 h-5" />
      </button>
    ))
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div
      className={`fixed inset-0 bg-white z-20 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } ${jost.className}`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <button onClick={onClose} className="p-2" aria-label="Close sidebar">
          <X className="w-6 h-6" />
        </button>
        <Link href="/" className="p-2" onClick={onClose} aria-label="Go to home">
          <Home className="w-6 h-6" />
        </Link>
      </div>
      <div className="p-4 overflow-y-auto h-[calc(100vh-180px)]">
        {renderCategories()}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {flagUrl && (
              <div className="relative w-8 h-6 mr-2">
                <Image
                  src={flagUrl}
                  alt={`${selectedCountry.country} Flag`}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            )}
            <button
              className="flex items-center gap-2 font-normal text-base"
              onClick={onOpen}
            >
              <span className="lowercase">{selectedCountry.countryCode}</span>
              {' - '}
              {selectedCountry.code}
              <ArrowDown className="w-3 h-auto" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}