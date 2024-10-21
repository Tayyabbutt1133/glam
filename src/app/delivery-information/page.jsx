"use client"

import React from 'react'
import Container from '../../../components/container'
import { jost, lexendDeca } from '../../../components/ui/fonts'
import Breadcrumb from '../../../components/BreadCrumb'



const breadcrumbLinks = [
    { name: "Home", route: "/" },
    { name: "Delivery Information", route: "/Delivery Information" },
  ];



export default function DeliveryInformation() {
    return (
        <Container>
            <Breadcrumb links={breadcrumbLinks} />
            <h2 className={`text-3xl ${jost.className} font-bold mb-2`}>DELIVERY INFORMATION</h2>
    <div className="font-sans my-14">
      <p className={`mb-4 ${jost.lexendDeca} font-semibold`}>United Kingdom.</p>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-black text-white">
            <th className={`p-2 text-left ${jost.className}`}>Delivery Service</th>
            <th className={`p-2 text-left ${jost.className}`}>Shipping Cost</th>
            <th className={`p-2 text-left ${jost.className}`}>Delivery Aim</th>
          </tr>
        </thead>
        <tbody>
          <tr className={`border-b border-gray-200 ${lexendDeca.className}`}>
            <td className="p-2">Royal Mail Tracked 48</td>
            <td className="p-2">
              FREE for orders over £10
              <br />
              £2.49 for orders under £10
            </td>
            <td className="p-2">2-3 business days (inc. Saturday)</td>
          </tr>
          <tr className={`border-b border-gray-200 ${lexendDeca.className}`}>
            <td className="p-2">Royal Mail Tracked 24</td>
            <td className="p-2">
              £1.99 for orders over £10
              <br />
              £3.99 for orders under £10
            </td>
            <td className="p-2">1-2 business days (inc. Saturday)</td>
          </tr>
          <tr className={`border-b border-gray-200 ${lexendDeca.className}`}>
            <td className="p-2">DPD Next Day</td>
            <td className="p-2">£4.99</td>
            <td className="p-2">
              Next business day
              <br />
              Order by 3pm
            </td>
          </tr>
          <tr className={`border-b border-gray-200 ${lexendDeca.className}`}>
            <td className="p-2">Royal Mail Special Delivery</td>
            <td className="p-2">£5.99</td>
            <td className="p-2">
              Next business day (inc. Saturday)
              <br />
              Order by 3pm
            </td>
          </tr>
        </tbody>
      </table>
            </div>
            </Container>
  )
  
}