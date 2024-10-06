"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "../../../states/Cardstore";
import { CartIcon } from "../../../public/icons/cart";
import { UserIcon } from "../../../public/icons/user";
import { MenuIcon, SearchIcon } from "lucide-react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import glam_logo from "../../../public/logo.svg";
import SearchBarWithDropdown from "../middle-bar-nav/searchbar";
import Cartdropdown from "../../Cartdropdown";

export default function MobileHeader({ onOpenSidebar }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useCartStore((state) => state.cartItems);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const toggleCartDropdown = () => {
    setIsCartOpen((prev) => !prev);
  };
  const toggleSearch = () => {
    // Add this function
    setIsSearchVisible((prev) => !prev);
  };

  return (
    <>
      <header className="flex items-center justify-between px-4 py-2 bg-white shadow-md lg:hidden z-50">
        <aside className="flex items-center space-x-4">
          <button onClick={onOpenSidebar} className="p-2">
            <HiOutlineMenuAlt1 className="w-6 h-6" />
          </button>
          <button onClick={toggleSearch}>
            <SearchIcon className="w-6 h-6" />
          </button>
        </aside>
        <Link href="/">
          <Image
            src={glam_logo}
            alt="Glam Beauty Logo"
            width={160}
            height={60}
          />
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/signup">
            <UserIcon className="w-6 h-6" />
          </Link>
          <div className="relative">
            <div
              className="flex flex-row justify-center items-center gap-3 cursor-pointer"
              onClick={toggleCartDropdown}
            >
              <div className="relative">
                <CartIcon className="w-7" />
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center h-4 w-4 bg-black text-white text-xs font-bold leading-none rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </div>
              {/* <span
                className={`capitalize ${jost.className} text-nowrap lg:text-base font-normal xl:text-lg`}
              >
                My Bag
              </span> */}
            </div>
            {isCartOpen && <Cartdropdown />}
          </div>
        </div>
      </header>
      {isSearchVisible && (
        <div className="px-4 py-2 bg-white shadow-md ">
          <SearchBarWithDropdown formobile={true} />
        </div>
      )}
    </>
  );
}
