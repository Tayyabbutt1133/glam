"use client";
import NewsBannerNav from "./news-banner-nav/news-banner-nav";
import MiddleBarNav from "./middle-bar-nav/middle-bar-nav";
import Navigation from "./navigation-nav/navigation";
import Promo from "./banner/Promo";
import MainLayoutMobile from "./mobile/MainLayoutMobile";
import { usePathname } from "next/navigation";
import CheckoutHeader from "./CheckoutHeader";
export default function Header() {
  const url = usePathname();
  if (url.includes("/checkout")) {
    return (
      <CheckoutHeader />
    );
  } else
    return (
      <header className="sticky top-0 left-0 z-50">
        <NewsBannerNav />
        <div className=" hidden lg:block">
          <MiddleBarNav />
        </div>
        <MainLayoutMobile />
        <Navigation />
        <Promo />
      </header>
    );
}
