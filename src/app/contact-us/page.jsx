"use client";

import React, { Suspense } from "react";
import Breadcrumb from "../../../components/BreadCrumb";
import Container from "../../../components/container";
import { jost, lexendDeca } from "../../../components/ui/fonts";
import { AiOutlineMail } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { RiHome5Line } from "react-icons/ri";

const breadcrumbLinks = [
  { name: "Home", route: "/" },
  { name: "Contact Us", route: "/contact-us" },
];

function ContactUsContent() {
  return (
    <Container>
      <Breadcrumb links={breadcrumbLinks} />
      <div className="py-16">
        <h1 className={`text-3xl ${jost.className} font-bold mb-4`}>
          CONTACT US
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <h2 className={`text-2xl font-semibold mb-4 ${jost.className}`}>
              Reach Out, We&apos;re Here
            </h2>
            <p className={`mb-6 ${lexendDeca.className}`}>
              Have questions about your order or products? For the speediest
              answer, check out our FAQ section. Need something else? Come
              find us below.
            </p>
            <hr className="my-6" />
            <div className="mb-6">
              <div className={`${jost.className}`}>
                <h3 className="">GLAMBEAUTY</h3>
                <p>Registered office address:</p>
                <p>133 Ley Street, Ilford, Essex, IG1 4BH</p>
              </div>
            </div>
            <div>
              <h3 className={`font-semibold text-lg ${jost.className} mb-2`}>Customer Support</h3>
              <div className="flex items-center gap-2">
                <AiOutlineMail size={20}/>
                <p className={`${lexendDeca.className}`}>cs@glambeauty.com</p>
              </div>
              <div className="flex items-center gap-2">
                <FaWhatsapp size={20}/>
                <p className={`${lexendDeca.className}`}>+447418626360</p>
              </div>
            </div>
            <div>
              <h3 className={`font-semibold text-lg mb-2 mt-8 ${jost.className}`}>Press Inquiries</h3>
              <div className="flex items-center gap-2">
                <RiHome5Line size={20}/>
                <p className={`${lexendDeca.className}`}>info@glambeauty.com</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <form className="space-y-4">
              <div>
                <label htmlFor="message" className={`block ${jost.className} mb-2`}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className={`w-full ${lexendDeca.className} px-3 py-2 border border-gray-300 rounded-md`}
                  placeholder="Your message"
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="name" className={`block ${jost.className} mb-2`}>
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`w-full ${lexendDeca.className} px-3 py-2 border border-gray-300 rounded-md`}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className={`block ${jost.className} mb-2`}>
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full ${lexendDeca.className} px-3 py-2 border border-gray-300 rounded-md`}
                  required
                />
              </div>
              <button
                type="submit"
                className={`w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 ${jost.className}`}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default function ContactUsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactUsContent />
    </Suspense>
  );
}