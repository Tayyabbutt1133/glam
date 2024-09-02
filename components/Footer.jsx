import React from "react";
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


export default function Footer() {
  return (
    <Container>
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
              <p className={`text-sm 2xl:text-[16px]  text-[#7E7E7E] w-60 ${lexendDeca.className} font-normal`}>We are the fastest-growing beauty retailer, always offering huge discounts off the RRP.</p>
              <div name="socials" className=" flex gap-4">
                <Image src={fb} />
                <Image src={Insta} />
                <Image src={pin} />
                <Image src={tik}/>
              </div>
            </div>

            



            {/* Nav links */}
            <div className="grid grid-cols-1 space-y-10 sm:grid-cols-4 sm:space-y-0 ml-16">
              <div className="">
                <h2 className={`mb-4 text-sm 2xl:font-[20px] capitalize font-semibold text-black ${jost.className}`}>
                  GlamBeauty
                </h2>
                <ul className={`text-[#8B929D]  text-sm 2xl:text-[16px] space-y-3 ${lexendDeca.className} font-normal`}>
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
              <h2 className={`mb-4 text-sm 2xl:font-[20px] capitalize font-semibold text-black ${jost.className}`}>
              Help & Information
                </h2>
                <ul className={`text-[#8B929D]  text-sm 2xl:text-[16px] space-y-3 ${lexendDeca.className} font-normal`}>
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
              <h2 className={`mb-4 text-sm 2xl:font-[20px] capitalize font-semibold text-black ${jost.className}`}>
              Legal
                </h2>
                <ul className={`text-[#8B929D]  text-sm 2xl:text-[16px] space-y-3 ${lexendDeca.className} font-normal`}>
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
              <h2 className={`mb-4 text-sm 2xl:font-[20px] capitalize font-semibold text-black ${jost.className}`}>
              Download App
                </h2>
                <p className={`text-[#8B929D]  text-sm 2xl:text-[16px] space-y-3 ${lexendDeca.className} font-normal mb-4`}>
                  Download the App and get an extra 10% off your first order...!
                </p>
                <div className="flex sm:flex-col xl:flex-row gap-6">
                  <Image src={app_store} />
                  <Image src={play_store} />
                </div>
              </div>
            </div>
          </div>

          <hr className=" border-gray-200 sm:mx-auto dark:border-gray-700" />

          <div className="sm:flex sm:items-center sm:justify-between my-4">
            <span className="text-sm 2xl:text-[16px] text-[#8B929D] font-normal sm:text-center">
              GLAMBEAUTY © 2024. All Rights Reserved.
            </span>
            <div className="flex justify-between items-center gap-3">
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
    </Container>
  );
}
