import React from "react"
import { jost } from "./ui/fonts"
import Container from "./container"

export default function Newsletter() {
  return (
    <section className="bg-bg-01 h-[140px] sm:h-[238px] grid place-items-center">
      <Container>
        <div className="flex flex-col lg:flex-row items-center lg:justify-center gap-6">
          {/* title */}
          <div className="sm:px-3 lg:px-0 min-w-fit w-full lg:w-auto">
            <h2
              className={`text-center lg:text-right text-[16px] mx-2 sm:mx-0 sm:text-2xl md:text-[24px] ${jost.className} capitalize text-black sm:text-2xl`}
            >
              <span className="text-[#CF8562] font-medium">SIGN UP</span> TO
              RECEIVE OFFERS AND UPDATES
            </h2>
          </div>

          {/* Form Input */}
          <form action="#" className="w-full lg:w-auto max-w-[450px] lg:max-w-none">
            <div className="flex flex-row w-full items-center gap-3 sm:space-y-0 sm:space-x-4">
              <input
                className={`
                  block box-border p-3 pl-4 h-[36px]
                  md:h-[46px] 2xl:h-[55px] bg-transparent
                  lg:text-[17px] xl:text-[18px]
                  w-full lg:min-w-[200px] lg:w-[28vw] lg:max-w-[420px]
                  text-sm text-black rounded-lg outline outline-1
                  outline-black focus:ring-primary-500
                  focus:border-primary-500 placeholder:text-black
                  ${jost.className} 2xl:text-[20px]
                `}
                placeholder="Enter your email"
                type="email"
                id="email"
                required
              />

              <button
                type="submit"
                className={`
                  box-border
                  hover:bg-hover
                  min-w-fit
                  2xl:px-10
                  2xl:py-[19px]
                  xl:px-8
                  xl:py-[15px]
                  lg:px-6
                  lg:py-[13px]
                  md:px-5
                  md:py-[13px]
                  px-4
                  py-[9px]
                  uppercase
                  text-sm
                  lg:text-[17px]
                  2xl:text-[20px]
                  font-medium
                  text-center
                  text-white
                  tracking-wide
                  rounded-lg
                  border
                  cursor-pointer
                  bg-primary-700
                  border-primary-600
                  hover:bg-primary-800
                  focus:ring-4
                  focus:ring-primary-300
                  bg-black
                  transition-all
                  ease
                  duration-300
                  ${jost.className}
                `}
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </Container>
    </section>
  )
}