"use client"
import React, { Suspense } from 'react'
import Breadcrumb from '../../../components/BreadCrumb'
import Container from '../../../components/container'
import { jost, lexendDeca } from '../../../components/ui/fonts'
import Link from 'next/link'

const breadcrumbLinks = [
  { name: "Home", route: "/" },
  { name: "About Us", route: "/about" },
]

export default function AboutUsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container>
        <Breadcrumb links={breadcrumbLinks} />
      </Container>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h1 className={`text-3xl font-bold text-center mb-8 ${jost.className}`}>About Us</h1>
              <h2 className={`text-2xl font-semibold mb-4 ${jost.className}`}>Our Mission</h2>
              <p className={`text-gray-700 ${lexendDeca.className} leading-relaxed mb-8`}>
                We are a dedicated team of beauty devotees on the hunt for the coolest beauty products the world has to offer – from the latest scientific discoveries to hundred-year-old remedies that have never been bettered – GlamBeauty is the destination for those looking for the next big thing. Whether it&apos;s a problem-solving treatment or a yet unheard-of oil, we pride ourselves on our transparency (we list full ingredients and publish all reviews) and only sell the products that blow us away.
              </p>
            </div>
          </section>

          <section className="bg-gray-900 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className={`text-2xl font-semibold text-white mb-8 text-center ${jost.className}`}>Who We Are</h2>
              <div className="relative h-[600px] rounded-lg overflow-hidden">
                <video
                  src="/video.mp4"
                  controls
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  playsInline
                  autoPlay
                  loop
                  muted
                  disablePictureInPicture
                  controlsList="nodownload noplaybackrate"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </section>

          <section className="bg-teal-200 py-12">
            <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
              <h2 className={`text-2xl ${jost.className} font-semibold mb-4`}>Want to receive more useful information from us?</h2>
              <Link href="/contact-us">
                <button className={`bg-pink-500 hover:bg-white hover:text-black text-white font-bold py-3 px-10 rounded transition duration-300 ${lexendDeca.className}`}>
                  Contact us
                </button>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </Suspense>
  )
}