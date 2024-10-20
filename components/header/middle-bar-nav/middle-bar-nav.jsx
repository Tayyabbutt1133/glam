import React, { useState, useEffect } from "react";
import { useCartStore } from "../../../states/Cardstore";
import { CartIcon } from "../../../public/icons/cart";
import CartDropdown from "../../Cartdropdown";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  const toggleCartDropdown = () => {
    setIsCartOpen((prev) => !prev);
  };

  // checking authentication/validaton status for conditional routing
  const checkAuthStatus = async () => {
    try {
      setLoading(true); // Start loading
      const response = await fetch("/api/setCookie", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response from API:", data.token); // Log the API response
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []); // Empty dependency array means this effect runs once on mount

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
              <div onClick={checkAuthStatus}>
                <Link href={isAuthenticated ? "/myaccount" : "/signup"}>
                  <div className="flex flex-row justify-center items-center gap-3">
                    <UserIcon className={"w-4"} />
                    {loading ? (
                      <span className={`capitalize text-nowrap font-normal lg:text-base xl:text-lg ${jost.className}`}>
                        Checking...
                      </span>
                    ) : (
                      <span
                        className={`capitalize text-nowrap font-normal lg:text-base xl:text-lg ${jost.className}`}
                      >
                        My Account
                      </span>
                    )}
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
                <CartIcon className="w-7" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-4 -right-2 h-5 w-5 inline-flex items-center justify-center bg-black text-white text-xs font-bold leading-none rounded-full">
                    {cartItems.length}
                  </span>
                )}
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
