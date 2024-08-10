import React from "react";
import logo from "../public/logo.svg";
import card1 from "../public/cards_logos/Badge.svg";
import card2 from "../public/cards_logos/Badgetwo.svg";
import card3 from "../public/cards_logos/Badgethree.svg";
import card4 from "../public/cards_logos/Badgefour.svg";
import card5 from "../public/cards_logos/Badgefive.svg";
import app_store from "../public/app_store.svg";
import play_store from "../public/play_store.svg";
import Image from "next/image";

export default function Footer() {
  return (
    <div>
      <footer className="bg-white dark:bg-gray-900 ">
        <div className="mx-auto w-full max-w-screen-xl px-4 py-8 ">
          <div className="md:flex md:justify-between md:items-center mb-8  gap-16">
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
            <div className="grid grid-cols-2  sm:grid-cols-4 ">
              <div className="">
                <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Glam Beauty
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 text-sm space-y-3">
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
                <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
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
                <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Legal
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 text-sm space-y-3">
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
                <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Download App
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  Download the App and get an extra 10% off your first order!
                </p>
                <div className=" flex gap-6">
                  <Image src={app_store} />
                  <Image src={play_store} />
                </div>
              </div>
            </div>
          </div>

          <hr className=" border-gray-200 sm:mx-auto dark:border-gray-700" />

          <div className="sm:flex sm:items-center sm:justify-between ">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 mb-10">
              GLAMBEAUTY © 2024. All Rights Reserved.
            </span>
            <div className="flex sm:justify-center sm:mt-0 -space-x-16">
              <a href="#">
                <Image className="" src={card1} alt="Card 1" />
              </a>
              <a href="#">
                <Image className="" src={card2} alt="Card 2" />
              </a>
              <a href="#">
                <Image className="" src={card3} alt="Card 3" />
              </a>
              <a href="#">
                <Image className="" src={card4} alt="Card 4" />
              </a>
              <a href="#">
                <Image className="" src={card5} alt="Card 5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
