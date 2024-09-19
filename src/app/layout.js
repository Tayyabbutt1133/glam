import { Inter } from "next/font/google";
import "./globals.css";
import CurrencyLanguagePopUp from "../../components/currency-language-pop-up";
import Header from "../../components/header/header";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Glam Studio",
  description: "Home page glam studio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
      <script type="text/javascript" src="https://www.bugherd.com/sidebarv2.js?apikey=fhpij2lzixqjqywxhkpnba" async="true"></script>
      </Head>
      <body className={inter.className}>
        <CurrencyLanguagePopUp />
        <Header/>
        {children}
        <ToastContainer position="top-right" />
        <Newsletter />
        <Footer/>
      </body>
    </html>
  );
}
