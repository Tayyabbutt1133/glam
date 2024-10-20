"use client";

import { useState, useEffect, useMemo } from 'react';
import { usePathname } from "next/navigation";
import NewsBannerNav from "./news-banner-nav/news-banner-nav";
import MiddleBarNav from "./middle-bar-nav/middle-bar-nav";
import Navigation from "./navigation-nav/navigation";
import Promo from "./banner/Promo";
import MainLayoutMobile from "./mobile/MainLayoutMobile";
import CheckoutHeader from "./CheckoutHeader";


const SCROLL_THRESHOLD = 100;

export default function Header() {
  const [showFullHeader, setShowFullHeader] = useState(true);
  const url = usePathname();

  const memoizedComponents = useMemo(() => ({
    NewsBannerNav: <NewsBannerNav />,
    MiddleBarNav: <MiddleBarNav />,
    MainLayoutMobile: <MainLayoutMobile />,
    Navigation: <Navigation />,
    Promo: <Promo />,
  }), []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const show = currentScrollPos <= SCROLL_THRESHOLD;
      
      if (show !== showFullHeader) {
        setShowFullHeader(show);
        localStorage.setItem('showFullHeader', JSON.stringify(show));
      }
    };

    const savedShowFullHeader = JSON.parse(localStorage.getItem('showFullHeader'));
    if (savedShowFullHeader !== null) {
      setShowFullHeader(savedShowFullHeader);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showFullHeader]);

  if (url.includes("/checkout")) {
    return <CheckoutHeader />;
  }

  return (
    <header className="sticky top-0 left-0 z-[110]">
      <div className={`transition-all duration-300 ${showFullHeader ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden'}`}>
        {memoizedComponents.NewsBannerNav}
        <div className="hidden lg:block">
          {memoizedComponents.MiddleBarNav}
        </div>
        {memoizedComponents.MainLayoutMobile}
      </div>
      {memoizedComponents.Navigation}
      <div className={`transition-all duration-300 ${showFullHeader ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden'}`}>
        {memoizedComponents.Promo}
      </div>
    </header>
  );
}