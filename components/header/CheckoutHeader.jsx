"use client"
import React, { useEffect, useState } from 'react'
import glam_logo from "../../public/logo.svg";
import Cartdropdown from '../../components/Cartdropdown';
import { jost } from '../../components/ui/fonts';
import { useCartStore } from '../../states/Cardstore';

import { CartIcon } from '../../public/icons/cart';
import Image from 'next/image';
import Link from 'next/link';
function CheckoutHeader() {
    const [isMounted, setIsMounted] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useCartStore((state) => state.cartItems);

  const toggleCartDropdown = () => {
    setIsCartOpen((prev) => !prev);
  };

    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) return null

  return (
    <header className="sticky top-0 bg-white left-0 z-[120] py-6 min-h-12 md:h-[70px] px-[4vw]   flex items-center justify-center md:justify-between   shadow-md shadow-slate-100 ">
        <Link href="/">
          <Image
            src={glam_logo}
            alt="Glam Beauty Logo"
            width={160}
            height={80}
          />
        </Link>
        <div className="relative hidden md:block">
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
                <span
                  className={`capitalize ${jost.className} text-nowrap lg:text-base font-normal xl:text-lg`}
                >
                  My Bag
                </span>
              </div>
              {isCartOpen && <Cartdropdown />}
            </div>
      </header>
  )
}

export default CheckoutHeader