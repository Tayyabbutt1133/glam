"use client";
import React, { useState } from "react";
import { jost, lexendDeca } from "../../ui/fonts";
import Text from "../../ui/Text";

export default function Faqsbrand() {
  // State to track which accordion item is open
  const [openIndex, setOpenIndex] = useState(null);

  // Function to toggle the accordion item
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Are MAC products cruelty-free?",
      answer:
        'To contact customer support, look for a "Contact us" or "Help" button or link on the website or platform. You may be able to email, call, or chat with customer support for assistance.',
    },
    {
      question: "Is MAC makeup high quality and worth buying?",
      answer:
        'To reset your password, go to the login page and click on the "Forgot Password" link. Follow the instructions to reset your password via email.',
    },
    {
      question: "Does MAC work for sensitive and acne prone skin?",
      answer:
        'To contact customer support, look for a "Contact us" or "Help" button or link on the website or platform. You may be able to email, call, or chat with customer support for assistance.',
    },
  ];

  return (
    <div>
      {/* <!-- component --> */}
      <section className=" py-4 lg:py-7">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-2">
            <Text style={"h1"} className={`uppercase leading-[3.25rem] `}>
              Frequently asked questions
            </Text>
          </div>

          <div className="accordion-group">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`accordion py-8 px-6 border-b border-solid border-gray-200 transition-all duration-500 rounded-2xl hover:bg-indigo-50 ${
                  openIndex === index
                    ? "accordion-active:bg-indigo-50 active"
                    : ""
                }`}
              >
                <button
                  className="accordion-toggle group inline-flex items-center justify-between leading-8 text-gray-900 w-full transition duration-500 text-left hover:text-indigo-600"
                  aria-controls={`basic-collapse-${index}`}
                  onClick={() => toggleAccordion(index)}
                >
                  <h5 className={`${lexendDeca.className} font-medium`}>
                    {faq.question}
                  </h5>
                  <svg
                    className={`text-gray-500 transition duration-500 group-hover:text-indigo-600 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
                <div
                  id={`basic-collapse-${index}`}
                  className="accordion-content w-full px-0 overflow-hidden transition-max-height duration-500 ease-in-out"
                  aria-labelledby={`basic-heading-${index}`}
                  style={{
                    maxHeight: openIndex === index ? "250px" : "0",
                  }}
                >
                  <p
                    className={`text-sm opacity-85 sm:text-base text-gray-900 leading-6 ${lexendDeca.className}`}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
