"use client";
import React, { useState, useRef } from "react";
import { useCartStore } from "../../../states/Cardstore"; // Adjust the path
import { CartIcon } from "../../../public/icons/cart"; // Make sure this path is correct
import CartDropdown from "../../Cartdropdown"; // Adjust the path
import Container from "../../container";
import Link from "next/link";
import SearchBarWithDropdown from "./searchbar";
import glam_logo from "../../../public/logo.svg";
import Image from "next/image";
import { UserIcon } from "../../../public/icons/user";
import { jost } from "../../ui/fonts";

export default function MiddleBarNav() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useCartStore((state) => state.cartItems);

  const toggleCartDropdown = () => {
    setIsCartOpen((prev) => !prev);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const dropdownRef = useRef(null);
  const accountLinkRef = useRef(null);

  const handleMouseEnterAccount = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeaveAccount = () => {
    setIsDropdownOpen(false);
  };

  // const handleMouseEnterDropdown = () => {
  //   setIsDropdownOpen(true);
  // };

  // const handleMouseLeaveDropdown = () => {
  //   setIsDropdownOpen(false);
  // };

  return (
    <div className="flex w-full bg-white font-normal">
      <Container>
        <div className="flex flex-row w-full justify-between items-center py-4">
          {/* Logo */}
          <Link href="/">
            <Image
              src={glam_logo}
              alt="Glam Beauty Logo"
              width={193}
              height={45}
            />
          </Link>

          {/* Search bar */}
          <SearchBarWithDropdown />

          {/* Account and Cart */}
          <section className="flex flex-row justify-between items-center gap-6 text-primary">
            {/* Account Section */}
            <div className="relative">
              <div
                ref={accountLinkRef}
                onMouseEnter={handleMouseEnterAccount}
                onMouseLeave={handleMouseLeaveAccount}
              >
                
                <Link href="/signup">
                  <div className="flex flex-row justify-center items-center gap-3 ">
                    <UserIcon className={"w-4"} />
                    <span
                      className={`capitalize text-nowrap font-normal lg:text-base xl:text-lg ${jost.className}`}
                    >
                      my account
                    </span>
                  </div>
                </Link>
              </div>
            </div>
            {/* Cart Section */}
            <div className="relative">
              <div
                className="flex flex-row justify-center items-center gap-3 cursor-pointer"
                onClick={toggleCartDropdown}
              >
                <div className="relative">
                  <CartIcon className="w-7" />
                  {cartItems.length > 0 && (
                    <span className="absolute  -top-4 -right-2 h-5 w-5  inline-flex items-center justify-center  bg-black text-white text-xs font-bold leading-none rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </div>
                <span
                  className={`capitalize ${jost.className} text-nowrap lg:text-base font-normal xl:text-lg`}
                >
                  My Bag
                </span>
              </div>
              {isCartOpen && <CartDropdown />}
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
