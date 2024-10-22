"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import NewsBannerNav from "./news-banner-nav/news-banner-nav";
import MiddleBarNav from "./middle-bar-nav/middle-bar-nav";
import Navigation from "./navigation-nav/navigation";
import Promo from "./banner/Promo";
import MainLayoutMobile from "./mobile/MainLayoutMobile";
import { usePathname } from "next/navigation";
import CheckoutHeader from "./CheckoutHeader";

export default function Header() {
  const [showTopElements, setShowTopElements] = useState(true);
  const headerRef = useRef(null);
  const url = usePathname();

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollPos = window.pageYOffset;
          const isScrollingUp = prevScrollPos > currentScrollPos;

          setShowTopElements(isScrollingUp || currentScrollPos < 100);
          prevScrollPos = currentScrollPos;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (url.includes("/checkout")) {
    return <CheckoutHeader />;
  }

  return (
    <div ref={headerRef} className="sticky top-0 left-0 z-[110]">
      <div
        className={`transition-transform duration-300 ease-in-out ${
          showTopElements ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <NewsBannerNav />
      </div>

      <Suspense fallback={null}>
        <MiddleBarNav />
      </Suspense>
      <MainLayoutMobile />
      <Navigation />

      <div
        className={`transition-transform duration-300 ease-in-out ${
          showTopElements ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Promo />
      </div>
    </div>
  );
}