'use client'

import React, { Suspense } from "react"
import Breadcrumb from "../../../components/BreadCrumb"
import Container from "../../../components/container"
import { jost, lexendDeca } from "../../../components/ui/fonts"

const breadcrumbLinks = [
  { name: "Home", route: "/" },
  { name: "Partnerships & Suppliers", route: "/partnerships-and-suppliers" },
]

function PartnershipsAndSuppliersContent() {
  return (
    <Container>
      <Breadcrumb links={breadcrumbLinks} />
      <div className="my-16">
        <h1 className={`text-3xl ${jost.className} font-bold mb-4`}>Partnerships & Suppliers</h1>
        <p className={`${lexendDeca.className}`}>
          GlamBeauty.com is one of the UK&apos;s fastest growing online retailers for
          premium hair and beauty products. We have only one aim; to make hair and
          beauty brands more accessible to customers across the globe. If you are
          interested in working with us as a supplier or any other form of
          partnership, please get in contact via our email address
          partnerships@glambeauty.com.
        </p>
      </div>
    </Container>
  )
}

export default function PartnershipsAndSuppliers() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PartnershipsAndSuppliersContent />
    </Suspense>
  )
}