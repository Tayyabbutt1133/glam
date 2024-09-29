'use client'

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import logo from "../public/logo.svg";
import app_store from "../public/app_store.svg";
import play_store from "../public/play_store.svg";
import fb from "../public/socials/fb.svg";
import Insta from "../public/socials/instagram.svg";
import pin from "../public/socials/pinterest.svg";
import tik from "../public/socials/tiktok.svg";
import visa from "../public/card-logos/visa.svg";
import master from "../public/card-logos/master.svg"
import maestro from "../public/card-logos/maestro.svg"
import ae from "../public/card-logos/american-express.svg"
import paypal from "../public/card-logos/paypal.svg"
import { lexendDeca, jost } from "./ui/fonts";
import { ChevronDown, ChevronUp } from "lucide-react";
import Container from "./container";

export default function Footer() {
  const [openSections, setOpenSections] = useState({
    glamBeauty: false,
    helpInfo: false,
    legal: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => {
      const newState = { ...prev };
      newState[section] = !prev[section];
      return newState;
    });
  };

  return (
    <Container>
    <main className="">
      <footer>
        <div className="mx-auto w-full">
          <div className="md:flex md:justify-between md:items-center my-10">
            {/* logo */}
            <div className="flex flex-col gap-8">
              <Link href="https://glambeauty-demo.vercel.app/" className="flex items-center space-x-3">
                <Image src={logo} alt="GlamBeauty Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
              </Link>
              <p className={`text-sm lg:text-[14px] 2xl:text-[16px] text-[#7E7E7E] md:w-64 ${lexendDeca.className} font-normal`}>
                We are the fastest-growing beauty retailer, always offering huge discounts off the RRP.
              </p>
              <div className="flex gap-4">
                <Link href="https://www.facebook.com/GLAMBEAUTYCOM/">
                  <Image className="hover:scale-110 transition-transform duration-300 cursor-pointer" src={fb} alt="Facebook" />
                </Link>
                <Link href="https://www.instagram.com/glambeautycom?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                  <Image className="hover:scale-110 transition-transform duration-300 cursor-pointer" src={Insta} alt="Instagram" />
                </Link>
                <Link href="https://pin.it/3pO8viGHf">
                  <Image className="hover:scale-110 transition-transform duration-300 cursor-pointer" src={pin} alt="Pinterest" />
                </Link>
                <Link href="https://www.tiktok.com/@glambeautycom?is_from_webapp=1&sender_device=pc">
                  <Image className="hover:scale-110 transition-transform duration-300 cursor-pointer" src={tik} alt="TikTok" />
                </Link>
              </div>
            </div>

            {/* Nav links */}
            {/* Nav links */}
            <div className="grid px-3 py-2 sm:px-0 mt-4 grid-cols-1 space-y-1 md:grid-cols-4 sm:space-y-0 lg:ml-16 md:ml-6">
              {/* GlamBeauty Section */}
              <div>
                <h2
                  className={`mb-4 text-sm mt-4 md:text-[18px] 2xl:text-[20px] capitalize flex items-center justify-between font-semibold text-black ${jost.className}`}
                  onClick={() => toggleSection("glamBeauty")}
                >
                  GlamBeauty{" "}
                  {openSections.glamBeauty ? (
                    <ChevronUp className="inline-flex ml-auto md:hidden" />
                  ) : (
                    <ChevronDown className="inline-flex ml-auto md:hidden" />
                  )}
                </h2>
                <ul className={`text-[#8B929D] lg:text-[14px] 2xl:text-[16px] text-sm pb-3 space-y-3 ${lexendDeca.className} font-normal transition-all duration-300 ease-in-out ${openSections.glamBeauty || 'md:block' ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  <li>
                    <Link href="/aboutus" className="hover:underline">
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      Partnerships & Suppliers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      Sitemap
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Help & Information Section */}
              <div>
                <h2
                  className={`mb-4 text-sm mt-4 md:text-[18px] 2xl:text-[20px] capitalize flex items-center justify-between font-semibold text-black ${jost.className}`}
                  onClick={() => toggleSection("helpInfo")}
                >
                  Help & Information{" "}
                  {openSections.helpInfo ? (
                    <ChevronUp className="inline-flex ml-auto md:hidden" />
                  ) : (
                    <ChevronDown className="inline-flex ml-auto md:hidden" />
                  )}
                </h2>
                <ul className={`text-[#8B929D] text-sm lg:text-[14px] 2xl:text-[16px] space-y-3 ${lexendDeca.className} font-normal transition-all duration-300 ease-in-out ${openSections.helpInfo || 'md:block' ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  <li>
                    <Link href="#" className="hover:underline">
                      Delivery Information
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      Returns Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact-us" className="hover:underline">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      Student Discounts
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal Section */}
              <div>
                <h2
                  className={`mb-4 text-sm mt-4 md:text-[18px] 2xl:text-[20px] capitalize flex items-center justify-between font-semibold text-black ${jost.className}`}
                  onClick={() => toggleSection("legal")}
                >
                  Legal{" "}
                  {openSections.legal ? (
                    <ChevronUp className="inline-flex ml-auto md:hidden" />
                  ) : (
                    <ChevronDown className="inline-flex ml-auto md:hidden" />
                  )}
                </h2>
                <ul className={`text-[#8B929D] text-sm lg:text-[14px] 2xl:text-[16px] space-y-3 ${lexendDeca.className} font-normal transition-all duration-300 ease-in-out ${openSections.legal || 'md:block' ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  <li>
                    <Link href="/terms-and-conditions" className="hover:underline">
                      Terms &amp; Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      Cookie Policy (EU)
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Download App Section */}
              <div className="">
                <h2 className={`mb-4 text-sm mt-4 md:text-[18px] 2xl:text-[20px] capitalize flex items-center justify-between font-semibold text-black ${jost.className}`}>
                  Download App
                </h2>
                <p
                  className={`text-[#8B929D] text-sm lg:text-[14px] 2xl:text-[16px] space-y-3 ${lexendDeca.className} font-normal mb-4`}
                >
                  Download the App and get an extra 10% off your first order...!
                </p>
                <div className="flex sm:flex-col xl:flex-row gap-6 2xl:gap-3">
                  <Image className="hover:scale-110 cursor-pointer transition-transform duration-300" src={app_store} alt="App Store" />
                  <Image className="hover:scale-110 cursor-pointer transition-transform duration-300" src={play_store} alt="Play Store" />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200 sm:mx-auto dark:border-gray-700" />

          <div className="sm:flex sm:items-center sm:justify-between my-4">
            <span className="text-sm lg:text-[14px] 2xl:text-[16px] text-[#8B929D] font-normal sm:text-center">
              GLAMBEAUTY © 2024. All Rights Reserved.
            </span>
            <div className="flex sm:justify-between mt-2 sm:mt-0 items-center gap-3">
              <Link className="grid place-items-center w-[50px] h-[32px] border border-gray-300 rounded-[8px]" href="#">
                <Image className="hover:scale-110 transition-transform duration-300" width={35} height={0} src={visa} alt="Visa" />
              </Link>
              <Link className="grid place-items-center w-[50px] h-[32px] border border-gray-300 rounded-[8px]" href="#">
                <Image className="hover:scale-110 transition-transform duration-300" width={24} height={0} src={maestro} alt="Maestro" />
              </Link>
              <Link className="grid place-items-center w-[50px] h-[32px] border border-gray-300 rounded-[8px]" href="#">
                <Image className="hover:scale-110 transition-transform duration-300" width={27} height={0} src={master} alt="Mastercard" />
              </Link>
              <Link className="flex justify-end w-[50px] h-[32px] border border-gray-300 rounded-[8px]" href="#">
                <Image className="hover:scale-110 transition-transform duration-300" width={27} height={0} src={ae} alt="American Express" />
              </Link>
              <Link className="grid place-items-center w-[50px] h-[32px] border border-gray-300 rounded-[8px]" href="#">
                <Image className="hover:scale-110 transition-transform duration-300" width={35} height={0} src={paypal} alt="PayPal" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
      </main>
      </Container>
  );
}
