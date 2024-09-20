import React from "react";
import Container from "./container";
import { jost } from "./ui/fonts";

export default function Newsletter() {
  return (
    <>
      <section className="bg-bg-01 h-[238px] grid place-items-center">
        <Container>
          <div className="lg:flex justify-center items-center mx-auto w-full py-10">

            <div className="sm:text-center block md:flex flex-col sm:flex-row space-y-6 md:space-y-0 md:gap-16">
              <div className="flex items-center justify-center md:justify-start">
                <h2 className={` text-lg sm:text-xl md:text-[24px] ${jost.className} capitalize  text-black sm:text-2xl`}>
                  <span className="text-[#CF8562]">SIGN UP</span> TO RECEIVE
                  OFFERS AND UPDATES
                </h2>
              </div>
  
              <form action="#">
                <div className="items-center mx-auto  gap-3 max-w-screen-sm flex flex-row sm:space-y-0 sm:space-x-4">

                  <div className="relative w-full">
                    <label
                      htmlFor="email"
                      className={`hidden mb-2 text-sm 2xl:text-[20px] font-normal text-black ${jost.className}`}
                    >
                      Email address
                    </label>
                    
                    <input
                      className={`block box-border p-3 pl-4 bg-transparent w-full sm:min-w-80 text-sm text-black rounded-lg outline outline-1 outline-black  focus:ring-primary-500 focus:border-primary-500 placeholder:text-black ${jost.className} 2xl:text-[20px]`}
                      placeholder="Enter your email"
                      type="email"
                      id="email"
                      required
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className={`box-border h-[45px]  px-7 uppercase   text-sm 2xl:text-[20px] font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-700 border-primary-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 bg-black ${jost.className}`}
                    >
                      Subscribe
                    </button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
