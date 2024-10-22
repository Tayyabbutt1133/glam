"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { lexendDeca, jost } from "./ui/fonts";
import Container from "./container";

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

export default function Footer() {
  const [openSections, setOpenSections] = useState({
    glamBeauty: false,
    helpInfo: false,
    legal: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <Container>
      <footer className="w-full">
        <div className="w-full">
          <div className="md:flex md:justify-between md:items-center my-10">
            {/* logo */}
            <div className="flex flex-col gap-4">
              <Link href="https://glambeauty-demo.vercel.app/" className="flex items-center space-x-3">
                <Image src={logo} alt="GlamBeauty Logo" width={193} height={45} />
              </Link>
              <p className={`text-sm lg:text-[14px] 2xl:text-[16px] text-[#8B929D] md:w-64 ${lexendDeca.className} font-normal leading-6`}>
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
            <div className="grid  py-2  mt-4 grid-cols-1 md:grid-cols-4 lg:ml-16 md:ml-6">
              {/* GlamBeauty Section */}
              <div className="border-b border-gray-200 md:border-none">
                <h2
                  className={`py-4 text-[16px] md:text-[18px] 2xl:text-[20px] capitalize flex items-center justify-between font-medium text-black ${jost.className}`}
                  onClick={() => toggleSection("glamBeauty")}
                >
                  GlamBeauty
                  <span className="md:hidden">
                    {openSections.glamBeauty ? (
                      <ChevronUp className="w-6 h-6" />
                    ) : (
                      <ChevronDown className="w-6 h-6" />
                    )}
                  </span>
                </h2>
                <ul className={`text-[#8B929D] lg:text-[14px] 2xl:text-[16px] text-sm space-y-3 ${lexendDeca.className} font-normal transition-all duration-300 ease-in-out ${openSections.glamBeauty ? 'max-h-screen opacity-100 pb-4' : 'max-h-0 opacity-0 overflow-hidden'} md:max-h-screen md:opacity-100 md:overflow-visible`}>
                  <li><Link href="/aboutus" className="hover:underline">About us</Link></li>
                  <li><Link href="/partnerships-suppliers" className="hover:underline">Partnerships & Suppliers</Link></li>
                  <li><Link href="/" className="hover:underline">Sitemap</Link></li>
                </ul>
              </div>

              {/* Help & Information Section */}
              <div className="border-b border-gray-200 md:border-none">
                <h2
                  className={`py-4 text-[16px] md:text-[18px] 2xl:text-[20px] capitalize flex items-center justify-between font-semibold text-black ${jost.className}`}
                  onClick={() => toggleSection("helpInfo")}
                >
                  Help & Information
                  <span className="md:hidden">
                    {openSections.helpInfo ? (
                      <ChevronUp className="w-6 h-6" />
                    ) : (
                      <ChevronDown className="w-6 h-6" />
                    )}
                  </span>
                </h2>
                <ul className={`text-[#8B929D] text-sm lg:text-[14px] 2xl:text-[16px] space-y-3 ${lexendDeca.className} font-normal transition-all duration-300 ease-in-out ${openSections.helpInfo ? 'max-h-screen opacity-100 pb-4' : 'max-h-0 opacity-0 overflow-hidden'} md:max-h-screen md:opacity-100 md:overflow-visible`}>
                  <li><Link href="/delivery-information" className="hover:underline">Delivery Information</Link></li>
                  <li><Link href="/return-policy" className="hover:underline">Returns Policy</Link></li>
                  <li><Link href="/faq" className="hover:underline">FAQs</Link></li>
                  <li><Link href="/contact-us" className="hover:underline">Contact Us</Link></li>
                </ul>
              </div>

              {/* Legal Section */}
              <div className="border-b border-gray-200 md:border-none">
                <h2
                  className={`py-4 text-[16px] md:text-[18px] 2xl:text-[20px] capitalize flex items-center justify-between font-semibold text-black ${jost.className}`}
                  onClick={() => toggleSection("legal")}
                >
                  Legal
                  <span className="md:hidden">
                    {openSections.legal ? (
                      <ChevronUp className="w-6 h-6" />
                    ) : (
                      <ChevronDown className="w-6 h-6" />
                    )}
                  </span>
                </h2>
                <ul className={`text-[#8B929D] text-sm lg:text-[14px] 2xl:text-[16px] space-y-3 ${lexendDeca.className} font-normal transition-all duration-300 ease-in-out ${openSections.legal ? 'max-h-screen opacity-100 pb-4' : 'max-h-0 opacity-0 overflow-hidden'} md:max-h-screen md:opacity-100 md:overflow-visible`}>
                  <li><Link href="/terms-and-conditions" className="hover:underline">Terms & Conditions</Link></li>
                  <li><Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
                  <li><Link href="/cookie-policy" className="hover:underline">Cookie Policy (EU)</Link></li>
                </ul>
              </div>

              {/* Download App Section */}
              <div className="mt-8 md:mt-0">
                <h2 className={`py-4 text-[20px] capitalize font-semibold text-black ${jost.className}`}>
                  Download App
                </h2>
                <p className={`text-[#8B929D] text-sm lg:text-[14px] 2xl:text-[16px] ${lexendDeca.className} font-normal mb-4`}>
                  Download the App and get extra 10% off your First Order...!
                </p>
                <div className="flex sm:flex-col xl:flex-row gap-6 2xl:gap-3">
                  <Image className="hover:scale-110 cursor-pointer transition-transform duration-300" src={app_store} alt="App Store" />
                  <Image className="hover:scale-110 cursor-pointer transition-transform duration-300" src={play_store} alt="Play Store" />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200 sm:mx-auto dark:border-gray-700" />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between my-4">
            <span className={`text-sm lg:text-[14px] ${lexendDeca.className} 2xl:text-[16px] text-[#8B929D] font-normal`}>
    GLAMBEAUTY © 2024. All Rights Reserved.
  </span>
  <div className="flex flex-row sm:justify-between mt-4 sm:mt-0 items-start sm:items-center gap-3">
    <Link className="grid place-items-center w-[50px] h-[32px] border border-gray-300 rounded-[8px]" href="#">
      <Image className="hover:scale-110 transition-transform duration-300" width={35} height={0} src={visa} alt="Visa" />
    </Link>
    <Link className="grid place-items-center w-[50px] h-[32px] border border-gray-300 rounded-[8px]" href="#">
      <Image className="hover:scale-110 transition-transform duration-300" width={24} height={0} src={maestro} alt="Maestro" />
    </Link>
    <Link className="grid place-items-center w-[50px] h-[32px] border border-gray-300 rounded-[8px]" href="#">
      <Image className="hover:scale-110 transition-transform duration-300" width={27} height={0} src={master} alt="Mastercard" />
    </Link>
    <Link className="grid place-items-center w-[50px] h-[32px] border border-gray-300 rounded-[8px]" href="#">
      <Image className="hover:scale-110 transition-transform duration-300" width={27} height={0} src={ae} alt="American Express" />
    </Link>
    <Link className="grid place-items-center w-[50px] h-[32px] border border-gray-300 rounded-[8px]" href="#">
      <Image className="hover:scale-110 transition-transform duration-300" width={35} height={0} src={paypal} alt="PayPal" />
    </Link>
  </div>
</div>
        </div>
      </footer>
    </Container>
  );
}