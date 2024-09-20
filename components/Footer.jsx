"use client"
import React, { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Container from "./container";

import logo from "../public/logo.svg";
import app_store from "../public/app_store.svg";
import play_store from "../public/play_store.svg";
import fb from '../public/socials/fb.svg';
import Insta from '../public/socials/instagram.svg';
import pin from '../public/socials/pinterest.svg';
import tik from '../public/socials/tiktok.svg';
import visa from "../public/card-logos/visa.svg";
import master from "../public/card-logos/master.svg"
import maestro from "../public/card-logos/maestro.svg"
import ae from "../public/card-logos/american-express.svg"
import paypal from "../public/card-logos/paypal.svg"
import { lexendDeca, jost} from "./ui/fonts";
import { ChevronDown, ChevronUp } from "lucide-react";
import useWindowWidth from "../hooks/useWindow";

export default function Footer() {
  const [openSections, setOpenSections] = useState({
    glamBeauty: false,
    helpInfo: false,
    legal: false,
    
  });
  const toggleSection = (section) => {
    setOpenSections((prev) => {
      const newState = { glamBeauty: false, helpInfo: false, legal: false };
      newState[section] = !prev[section];
      return newState;
    });
  };
  const windowWidth = useWindowWidth();
  return (
    <main className=" w-[95%] mx-auto lg:w-[92%]">
      <footer className="">


        <div className="mx-auto w-full ">

          <div className="md:flex md:justify-between md:items-center my-10">

            {/* logo */}
            <div className=" flex flex-col gap-8">
              <a
                href="https://glambeauty-demo.vercel.app/"
                className="flex items-center space-x-3"
              >
                <Image src={logo} />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
              </a>
              <p className={`text-sm lg:text-[14px] xl:text-[16px]  text-[#7E7E7E] w-60 ${lexendDeca.className} font-normal`}>We are the fastest-growing beauty retailer, always offering huge discounts off the RRP.</p>
              <div name="socials" className=" flex gap-4">
                <Image src={fb} />
                <Image src={Insta} />
                <Image src={pin} />
                <Image src={tik}/>
              </div>
            </div>

            



         {/* Nav links */}
         <div className="grid px-3 py-2 sm:px-0 mt-4 grid-cols-1 space-y-1 md:grid-cols-4 sm:space-y-0 lg:ml-16 md:ml-6">
              <div className="">
                <h2
                  className={`mb-4 text-sm mt-4 text-[18px] xl:text-[20px] capitalize flex items-center justify-between font-semibold text-black ${jost.className}`}
                  onClick={() => toggleSection('glamBeauty')}
                >
                  GlamBeauty {openSections.glamBeauty ? <ChevronUp className="inline-flex ml-auto md:hidden" /> : <ChevronDown className="inline-flex ml-auto md:hidden" />}
                </h2>
                <ul className={`text-[#8B929D] lg:text-[14px] xl:text-[16px] text-sm pb-3 space-y-3 ${lexendDeca.className} font-normal transition-all duration-300 ease-in-out ${openSections.glamBeauty || windowWidth >= 768 ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  <li className="">
                    <a href="#" className="hover:underline">
                      About us
                    </a>
                  </li>
                  <li className="">
                    <a href="#" className="hover:underline">
                      Partnerships & Suppliers
                    </a>
                  </li>
                  <li className="">
                    <a href="#" className="hover:underline">
                      Sitemap
                    </a>
                  </li>
                </ul>
              </div>
              {/* Row 2 */}
              <div>
                <h2
                  className={`mb-4 text-sm mt-4 text-[18px] xl:text-[20px] capitalize flex items-center justify-between font-semibold text-black ${jost.className}`}
                  onClick={() => toggleSection('helpInfo')}
                >
                  Help & Information {openSections.helpInfo ? <ChevronUp className="inline-flex ml-auto md:hidden" /> : <ChevronDown className="inline-flex ml-auto md:hidden" />}
                </h2>
                <ul className={`text-[#8B929D] text-sm lg:text-[14px] xl:text-[16px] space-y-3 ${lexendDeca.className} font-normal transition-all duration-300 ease-in-out ${openSections.helpInfo || windowWidth >= 768 ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  <li className="">
                    <a href="#" className="hover:underline">
                      Delivery Information
                    </a>
                  </li>
                  <li className="">
                    <a href="#" className="hover:underline">
                      Returns Policy
                    </a>
                  </li>
                  <li className="">
                    <a href="#" className="hover:underline">
                      FAQs
                    </a>
                  </li>
                  <li className="">
                    <a href="#" className="hover:underline">
                      Contact Us
                    </a>
                  </li>
                  <li className="">
                    <a href="#" className="hover:underline">
                      Student Discounts
                    </a>
                  </li>
                </ul>
              </div>
              {/* Row 3 */}
              <div>
                <h2
                  className={`mb-4 text-sm mt-4 text-[18px] xl:text-[20px] capitalize flex items-center justify-between font-semibold text-black ${jost.className}`}
                  onClick={() => toggleSection('legal')}
                >
                  Legal {openSections.legal ? <ChevronUp className="inline-flex ml-auto md:hidden" /> : <ChevronDown className="inline-flex ml-auto md:hidden" />}
                </h2>
                <ul className={`text-[#8B929D] text-sm lg:text-[14px] xl:text-[16px] space-y-3 ${lexendDeca.className} font-normal transition-all duration-300 ease-in-out ${openSections.legal || windowWidth >= 768 ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  <li className="">
                    <a href="#" className="hover:underline">
                      Terms &amp; Conditions
                    </a>
                  </li>
                  <li className="">
                    <a href="#" className="hover:underline">
                      Privacy Policy
                    </a>
                  </li>
                  <li className="">
                    <a href="#" className="hover:underline">
                      Cookie Policy (EU)
                    </a>
                  </li>
                </ul>
              </div>
              {/* Row 4 */}
              <div>
                <h2
                  className={`mb-4 text-sm mt-4 text-[18px] xl:text-[20px] capitalize flex items-center justify-between font-semibold text-black ${jost.className}`}
                >
                  Download App
                </h2>
                <p className={`text-[#8B929D] text-sm lg:text-[14px] xl:text-[16px] space-y-3 ${lexendDeca.className} font-normal mb-4`}>
                  Download the App and get an extra 10% off your first order...!
                </p>
                <div className="flex sm:flex-col xl:flex-row gap-6">
                  <Image src={app_store} />
                  <Image src={play_store} />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200 sm:mx-auto dark:border-gray-700" />

          <div className="sm:flex sm:items-center sm:justify-between my-4">
            <span className="text-sm lg:text-[14px] xl:text-[16px] text-[#8B929D] font-normal sm:text-center">
              GLAMBEAUTY © 2024. All Rights Reserved.
            </span>
            <div className="flex sm:justify-between mt-2 sm:mt-0 items-center gap-3">
              <Link className="grid place-items-center w-[50px] h-[32px] border border-gray-300 rounded-[8px]" href="#">
                <Image width={35} height={0} src={visa} alt="Card 1" />
              </Link>
              <Link className="grid place-items-center w-[50px] h-[32px] border border-gray-300 rounded-[8px]" href="#">
                <Image width={24} height={0} src={maestro} alt="Card 3" />
              </Link>
              <Link className="grid place-items-center w-[50px] h-[32px] border border-gray-300 rounded-[8px]" href="#">
                <Image width={27} height={0} src={master} alt="Card 2" />
              </Link>
              <Link className="flex justify-end w-[50px] h-[32px] border border-gray-300 rounded-[8px]" href="#">
                <Image width={27} height={0} src={ae} alt="Card 4" />
              </Link>
              <Link className="grid place-items-center w-[50px] h-[32px] border border-gray-300 rounded-[8px]" href="#">
                <Image width={35} height={0} src={paypal} alt="Card 5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}