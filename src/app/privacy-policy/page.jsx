"use client"

import React from 'react'
import { jost, lexendDeca } from "../../../components/ui/fonts"
import Container from '../../../components/container'
import Breadcrumb from '../../../components/BreadCrumb'

const Head = ({ children }) => (
  <h2 className={`text-2xl font-semibold mt-8 mb-4 ${jost.className}`}>
    {children}
  </h2>
)

const Para = ({ children }) => (
  <p className={`mb-4 ${lexendDeca.className}`}>
    {children}
  </p>
)

export default function PrivacyPolicy() {
  return (
    <Container>
      <Breadcrumb
        links={[
          { name: "Home", route: "/" },
          { name: "Privacy Policy", route: "/privacy-policy" },
        ]}
      />
      <div className="my-16">
        <h1 className={`text-3xl font-bold mb-6 ${jost.className}`}>PRIVACY POLICY</h1>
        
        <Head>About Policy</Head>
        <Para>
          Glam Beauty Store UK is committed to protecting our customer&apos;s privacy. Please take the time to review this notice which explains what information we collect about you, how we use it, and your rights. Glam Beauty Store UK (&quot;Glam Beauty Store UK&quot;, &quot;we&quot; or &quot;us&quot;) is the data controller of the personal data collected via or in connection with Glam Beauty Store UK and any associated App (the &quot;Site&quot;).
        </Para>

        <Head>What personal Data Is Collected?</Head>
        <Para>
          We collect personal data from you when you provide it to us directly and through your use of the Site. This information may include:
        </Para>
        <ul className={`list-disc pl-6 mb-4 ${lexendDeca.className}`}>
          <li>Information you provide to us when you use our Site (e.g. your name, contact details, gender, product reviews, and any information which you add to your account profile);</li>
          <li>Transaction and billing information, if you make any purchases from us or using our Site (e.g. credit/debit card details and delivery information);</li>
          <li>Records of your interactions with us (e.g. if you contact our customer service team, interact with us on social media);</li>
          <li>Information you provide us when you enter a competition or participate in a survey;</li>
          <li>Information collected automatically, using cookies and other tracking technologies (e.g. which pages you viewed and whether you clicked on a link in one of our email updates). We may also collect information about the device you use to access our Site; and</li>
          <li>Other information necessary to provide the Site, for example we may access your location if you give us your consent.</li>
        </ul>
        <Para>
          If you also shop in one of our stores, we may combine information you give us in-store (e.g. if you make a purchase or join our mailing list in-store) with the information above.
        </Para>

        <Head>How Is Your Personal Data Used?</Head>
        <Para>
          Depending on how you use our Site, your interactions with us, and the permissions you give us, the purposes for which we use your personal data include:
        </Para>
        <ul className={`list-disc pl-6 mb-4 ${lexendDeca.className}`}>
          <li>To fulfill your order and maintain your online account.</li>
          <li>To manage and respond to any queries or complaints to our customer service team.</li>
          <li>To personalize the Site to you and show you content we think you will be most interested in, based on your account information, your purchase history and your browsing activity.</li>
          <li>To improve and maintain the Site, and monitor its usage.</li>
          <li>For market research, e.g. we may contact you for feedback about our products.</li>
          <li>To send you marketing messages and show you targeted advertising, where we have your consent or are otherwise permitted to do so.</li>
          <li>For security purposes, to investigate fraud and where necessary to protect ourselves and third parties.</li>
          <li>To comply with our legal and regulatory obligations.</li>
        </ul>

        <Head>Marketing</Head>
        <Para>
          We love to communicate with our customers and so, depending on your marketing preferences, we may use your personal data to send you marketing messages by email, phone or post. Some of these messages may be tailored to you, based on your previous browsing or purchase activity, and other information we hold about you.
        </Para>
        <Para>
          If you no longer want to receive marketing communications from us (or would like to opt back in!), you can change your preferences at any time by contacting us (details below), clicking on the &apos;unsubscribe&apos; link in any email, or updating your settings in your account. If you unsubscribe from marketing, please note we may still contact you with service messages from time to time (e.g. order and delivery confirmations, and information about your legal rights).
        </Para>
        <Para>
          You may also see ads for our Site on third party websites, including on social media. These ads may be tailored to you using cookies (which track your web activity, so enable us to serve ads to customers who have visited our Site). Where you see an ad on social media, this may because we have engaged the social network to show ads to our customers, or users who match the demographic profile of our customers. In some cases, this may involve sharing your email address with the social network. If you no longer want to see tailored ads you can change your cookie and privacy settings on your browser and these third party websites.
        </Para>
      </div>
    </Container>
  )
}