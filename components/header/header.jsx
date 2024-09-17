import NewsBannerNav from "./news-banner-nav/news-banner-nav";
import MiddleBarNav from "./middle-bar-nav/middle-bar-nav";
import Navigation from "./navigation-nav/navigation";
import Promo from "./banner/Promo";
import MainLayoutMobile from "./mobile/MainLayoutMobile";

export default function Header() {
    return (
        <header className="sticky top-0 left-0 z-10">
            <NewsBannerNav />
            <div className=" hidden lg:block"><MiddleBarNav /></div>
            <MainLayoutMobile/>
            <Navigation />
            <Promo/>
        </header>
    )
}