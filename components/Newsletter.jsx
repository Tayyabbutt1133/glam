import React from "react";
import Container from "./container";

export default function Newsletter() {
  return (
    <>
      <section className="bg-bg-01 h-[238px] grid place-items-center">
        <Container>
          <div className="flex justify-center items-center mx-auto w-full py-10">

            <div className="sm:text-center flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:gap-16">
              <div className="flex items-center">
                <h2 className="text-3xl tracking-tight font-normal text-gray-900 sm:text-2xl">
                  <span className="text-[#CF8562]">SIGN UP</span> TO RECEIVE
                  OFFERS AND UPDATES
                </h2>
              </div>
  
              <form action="#">
                <div className="items-center mx-auto space-y-4 max-w-screen-sm sm:flex sm:flex-row sm:space-y-0 sm:space-x-4">

                  <div className="relative w-full">
                    <label
                      htmlFor="email"
                      className="hidden mb-2 text-sm font-medium text-gray-900"
                    >
                      Email address
                    </label>
                    
                    <input
                      className="block box-border p-3 pl-4 bg-transparent w-full sm:min-w-80 text-sm text-black rounded-lg outline outline-1 outline-black  focus:ring-primary-500 focus:border-primary-500 placeholder:text-gray-500"
                      placeholder="Enter your email"
                      type="email"
                      id="email"
                      required
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="box-border py-3 px-8 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-700 border-primary-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 bg-black"
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
