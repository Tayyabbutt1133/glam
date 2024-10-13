import { Inter } from "next/font/google";
import "./globals.css";

import { ApolloWrapper } from "./components/ApolloProvider";
import CurrencyLanguagePopUp from "../../components/currency-language-pop-up";
import Header from "../../components/header/header";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script"; // Use next/script instead of Head

export const metadata = {
  title: "Glam Studio",
  description: "Home page glam studio",
};
//
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>{/* Include any other meta tags or link elements */}</head>
      <body>
        <ApolloWrapper>
          <CurrencyLanguagePopUp />
          <Header />

          {children}
          <ToastContainer position="top-right" />
          <Newsletter />
          <Footer />
        </ApolloWrapper>
        {/* Add BugHerd script */}
        <Script
          id="bugherd-script"
          strategy="afterInteractive" // Ensures script loads after the page is interactive
          src="https://www.bugherd.com/sidebarv2.js?apikey=fhpij2lzixqjqywxhkpnba"
        />
      </body>
    </html>
  );
}
