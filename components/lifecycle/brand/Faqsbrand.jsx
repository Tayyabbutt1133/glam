'use client'

import React, { useState } from "react"
import { jost, lexendDeca } from "../../ui/fonts"
import Container from "../../container"

export default function Faqsbrand() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqs = [
    {
      question: "Are MAC products cruelty-free?",
      answer:
        "To contact customer support, look for a 'Contact us' or 'Help' button or link on the website or platform. You may be able to email, call, or chat with customer support for assistance.",
    },
    {
      question: "Is MAC makeup high quality and worth buying?",
      answer:
        "To reset your password, go to the login page and click on the 'Forgot Password' link. Follow the instructions to reset your password via email.",
    },
    {
      question: "Does MAC work for sensitive and acne prone skin?",
      answer:
        "To contact customer support, look for a 'Contact us' or 'Help' button or link on the website or platform. You may be able to email, call, or chat with customer support for assistance.",
    },
  ]

  return (
    <Container>
    <div className="py-4 lg:py-7 mt-16">
      <div className="mb-10">
        <h2 className={`${jost.className} text-2xl font-bold mb-6`}>
          FREQUENTLY ASKED QUESTIONS
        </h2>

        <div className="accordion-group">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-200 py-4"
            >
              <button
                className="flex items-center justify-between w-full text-left transition-colors duration-300 ease-in-out focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <h3 className={`${lexendDeca.className} text-lg font-medium transition-colors duration-300 ease-in-out ${openIndex === index ? 'text-primary' : 'text-[#121212]'}`}>
                  {faq.question}
                </h3>
                <svg
                  className={`transform transition-transform duration-300 ease-in-out ${
                    openIndex === index ? "rotate-180 text-primary" : "text-gray-500"
                  }`}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 9L12 16L5 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div
                className={`mt-2 transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className={`${lexendDeca.className} text-[#121212] transition-opacity duration-300 font-medium text-2xl:text-[20px] ease-in-out ${openIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      </Container>
  )
}