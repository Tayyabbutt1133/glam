import React from "react";
import logo from "../public/logo.svg";
import app_store from "../public/app_store.svg";
import play_store from "../public/play_store.svg";
import Image from "next/image";
import Container from "./container";

export default function Footer() {
  return (
    <Container>
      <footer className="bg-white">
        <div className="mx-auto w-full">
          <div className="md:flex md:justify-between md:items-center my-10 gap-16">
            <div className="mb-6 md:mb-0">
              <a
                href="https://glambeauty-demo.vercel.app/"
                className="flex items-center space-x-3"
              >
                <Image src={logo} />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
              </a>
            </div>

            {/* Nav links */}
            <div className="grid grid-cols-1 space-y-10 sm:grid-cols-4 sm:space-y-0">
              <div className="">
                <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase ">
                  Glam Beauty
                </h2>
                <ul className="text-gray-500 text-sm space-y-3">
                  <li>
                    <a href="#" className="hover:underline">
                      About us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Partnerships & Suppliers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Sitemap
                    </a>
                  </li>
                </ul>
              </div>
              {/* Row 2 */}
              <div>
                <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">
                  Help & Information
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 text-sm space-y-3">
                  <li>
                    <a href="#" className="hover:underline">
                      Delivery Information
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Returns Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      FAQs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Student Discounts
                    </a>
                  </li>
                </ul>
              </div>
              {/* Row 3 */}
              <div>
                <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">
                  Legal
                </h2>
                <ul className="text-gray-500 text-sm space-y-3">
                  <li>
                    <a href="#" className="hover:underline">
                      Terms &amp; Conditions
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Cookie Policy (EU)
                    </a>
                  </li>
                </ul>
              </div>
              {/* Row 4 */}
              <div>
                <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">
                  Download App
                </h2>
                <p className="text-gray-500 text-sm mb-4">
                  Download the App and get an extra 10% off your first order!
                </p>
                <div className="flex sm:flex-col xl:flex-row gap-6">
                  <Image src={app_store} />
                  <Image src={play_store} />
                </div>
              </div>
            </div>
          </div>

          <hr className=" border-gray-200 sm:mx-auto dark:border-gray-700" />

          <div className="sm:flex sm:items-center sm:justify-between ">
            <span className="text-sm text-gray-500 sm:text-center">
              GLAMBEAUTY © 2024. All Rights Reserved.
            </span>
            <div className="flex sm:justify-center sm:mt-0 -space-x-8">
              <a href="#">
                <Image width={100} height={100} src={"/card-logos/visa.png"} alt="Card 1" />
              </a>
              <a href="#">
                <Image width={100} height={100} src={"/card-logos/master.png"} alt="Card 2" />
              </a>
              <a href="#">
                <Image width={100} height={100} src={"/card-logos/maestro.png"} alt="Card 3" />
              </a>
              <a href="#">
                <Image width={100} height={100} src={"/card-logos/american-express.png"} alt="Card 4" />
              </a>
              <a href="#">
                <Image width={100} height={100} src={"/card-logos/paypal.png"} alt="Card 5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </Container>
  );
}
