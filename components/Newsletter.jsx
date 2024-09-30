import React from "react";
import { jost } from "./ui/fonts";

export default function Newsletter() {
  return (
    <>
      <section className="bg-bg-01 h-[140px] sm:h-[238px] grid place-items-center">
        <main className=" w-[97%] mx-auto">
          <div className="lg:flex justify-center items-center mx-auto w-full sm:py-10">

            <div className="sm:text-center block md:flex flex-col sm:flex-row space-y-6 md:space-y-0 md:gap-16">
              <div className="flex items-center justify-center sm:px-3 lg:px-0 sm:justify-start">
                <h2 className={` text-[17px] mx-2 sm:mx-0 sm:text-2xl md:text-[24px] ${jost.className} capitalize  text-black sm:text-2xl`}>
                  <span className="text-[#CF8562] font-medium">SIGN UP</span> TO RECEIVE
                  OFFERS AND UPDATES
                </h2>
              </div>
  
              <form action="#">
                <div className="items-center mx-auto justify-center  sm:justify-normal   gap-3 max-w-screen-sm flex flex-row sm:space-y-0 sm:space-x-4">

                  <div className="  relative w-[60%] sm:w-full">
                    <label
                      htmlFor="email"
                      className={`hidden mb-2 text-sm lg:text-[20px] font-normal text-black ${jost.className}`}
                    >
                      Email address
                    </label>
                    
                    <input
                      className={`block box-border p-3 pl-4  h-[36px] md:h-[46px] 2xl:h-[55px] bg-transparent lg:text-[17px]  xl:text-[18px]  w-full sm:min-w-80 lg:min-w-[360px] xl:min-w-[390px] text-sm text-black rounded-lg outline outline-1 outline-black  focus:ring-primary-500 focus:border-primary-500 placeholder:text-black ${jost.className} 2xl:text-[20px]`}
                      placeholder="Enter your email"
                      type="email"
                      id="email"
                      required
                    />
                  </div>

               
                    <button
                      type="submit"
                      className={`box-border hover:bg-hover px-7 uppercase   text-sm lg:text-[17px] 2xl:text-[20px] font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-700 border-primary-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 bg-black ${jost.className}`}
                    >
                      Subscribe
                    </button>
              
                </div>

              </form>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}
