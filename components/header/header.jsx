import NewsBannerNav from "./news-banner-nav/news-banner-nav";
import MiddleBarNav from "./middle-bar-nav/middle-bar-nav";
import Navigation from "./navigation-nav/navigation";
import Promo from "./banner/Promo";

export default function Header() {
    return (
        <header>
            <NewsBannerNav />
            <MiddleBarNav />
            <Navigation />
            <Promo/>
        </header>
    )
}