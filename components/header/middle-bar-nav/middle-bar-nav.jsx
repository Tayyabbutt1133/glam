"use client";

// import { FiSearch } from "react-icons/fi";
import { UserIcon } from "../../../public/icons/user";
import { CartIcon } from "../../../public/icons/cart";
import Link from "next/link";
import SearchBarWithDropdown from "./searchbar";
import Container from "../../container";
import Image from "next/image";
import { useState, useRef } from 'react';
import { Jost } from "next/font/google";

const jost = Jost({subsets: ['latin']});

export default function MiddleBarNav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const accountLinkRef = useRef(null);

  const handleMouseEnterAccount = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeaveAccount = () => {
    setIsDropdownOpen(false);
  };

  const handleMouseEnterDropdown = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeaveDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <>
      <div className={`${jost.className} flex w-full border-b-2 border-gray-100 bg-white font-normal`}>
        <Container>
          <div className="flex flex-row w-full justify-between items-center py-4">
            {/* Logo */}
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Glam Beauty Logo"
                width={120}
                height={40}
              />
            </Link>

            {/* Search bar */}
            <SearchBarWithDropdown />

            {/* Account and Cart */}
            <section className="flex flex-row justify-between items-center gap-6">
              <div className="relative">
                <div
                  ref={accountLinkRef}
                  onMouseEnter={handleMouseEnterAccount}
                  onMouseLeave={handleMouseLeaveAccount}
                >
                  <Link href="/#">
                    <div className="flex flex-row justify-center items-center gap-2">
                      <UserIcon className={"w-4"} />
                      <span className="capitalize text-nowrap lg:text-base xl:text-xl">my account</span>
                    </div>
                  </Link>
                </div>
                {isDropdownOpen && (
                  <ul
                    className=" w-44 text-center absolute top-full left-0 bg-white rounded-md shadow-md"
                    ref={dropdownRef}
                    onMouseEnter={handleMouseEnterDropdown}
                    onMouseLeave={handleMouseLeaveDropdown}
                  >
                    <li>
                      <Link href="/login" className=" hover:bg-[#F7EBE0] block px-4 py-2 border-b transition duration-300 ease-in-out ">Login</Link>
                    </li>
                    <li>
                      <Link href="/signup" className="block px-4 py-2 hover:bg-[#F7EBE0]  transition duration-300 ease-in-out ">Sign Up</Link>
                    </li>
                  </ul>
                )}
              </div>

              <div>
                <div className="flex flex-row justify-center items-center gap-2">
                  <CartIcon className={"w-7"} />
                  <span className="capitalize text-nowrap lg:text-base xl:text-xl">My Bag</span>
                </div>
              </div>
            </section>
          </div>
        </Container>
      </div>
    </>
  );
}
