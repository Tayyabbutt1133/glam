import { Inter } from "next/font/google";
import "./globals.css";
import CurrencyLanguagePopUp from "../../components/currency-language-pop-up";
import Header from "../../components/header/header";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
// import CurrencyLanguagePopUp from '../components/currency-language-pop-up.jsx'
const inter = Inter({ subsets: ["latin"] });

// import Header from '../components/header/header.jsx';
// import Newsletter from '../components/Newsletter.jsx'
// import Footer from '../components/Footer.jsx';

export const metadata = {
  title: "Glam Studio",
  description: "Home page glam studio",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        <CurrencyLanguagePopUp />
        <Header/>
        {children}
        <Newsletter />
        <Footer/>
      </body>
    </html>
  );
}
