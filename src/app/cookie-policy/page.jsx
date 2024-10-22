'use client'

import React, { useState, Suspense } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
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

const CookieSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`font-semibold ${jost.className}`}>{title}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  )
}

const breadcrumbLinks = [
  { name: "Home", route: "/" },
  { name: "Cookie Policy (EU)", route: "/cookie-policy" },
]

function CookiePolicyContent() {
  return (
    <Container>
      <Breadcrumb links={breadcrumbLinks}/>
      <div className="my-16">
        <h1 className={`text-3xl font-bold mb-6 ${jost.className}`}>COOKIE POLICY (EU)</h1>
        <Para>
          This Cookie Policy was last updated on 16 July 2023 and applies to citizens and legal permanent residents of the European Economic Area and Switzerland.
        </Para>

        <Head>1. Introduction</Head>
        <Para>
          Our website, https://www.glambeauty.com (hereinafter: &quot;the website&quot;) uses cookies and other related technologies (for convenience all technologies are referred to as &quot;cookies&quot;). Cookies are also placed by third parties we have engaged. In the document below we inform you about the use of cookies on our website.
        </Para>

        <Head>2. What are cookies?</Head>
        <Para>
          A cookie is a small simple file that is sent along with pages of this website and stored by your browser on the hard drive of your computer or another device. The information stored therein may be returned to our servers or to the servers of the relevant third parties during a subsequent visit.
        </Para>

        <Head>3. What are scripts?</Head>
        <Para>
          A script is a piece of program code that is used to make our website function properly and interactively. This code is executed on our server or on your device.
        </Para>

        <Head>4. What is a web beacon?</Head>
        <Para>
          A web beacon (or a pixel tag) is a small, invisible piece of text or image on a website that is used to monitor traffic on a website. In order to do this, various data about you is stored using web beacons.
        </Para>

        <Head>5. Cookies</Head>
        <CookieSection title="5.1 Technical or functional cookies">
          <Para>
            Some cookies ensure that certain parts of the website work properly and that your user preferences remain known. By placing functional cookies, we make it easier for you to visit our website. This way, you do not need to repeatedly enter the same information when visiting our website and, for example, the items remain in your shopping cart until you have paid. We may place these cookies without your consent.
          </Para>
        </CookieSection>

        <CookieSection title="5.2 Statistics cookies">
          <Para>
            We use statistics cookies to optimise the website experience for our users. With these statistics cookies we get insights in the usage of our website. We ask your permission to place statistics cookies.
          </Para>
        </CookieSection>

        <CookieSection title="5.3 Marketing/Tracking cookies">
          <Para>
            Marketing/Tracking cookies are cookies or any other form of local storage, used to create user profiles to display advertising or to track the user on this website or across several websites for similar marketing purposes.
          </Para>
        </CookieSection>

        <Head>6. Placed cookies</Head>
        <CookieSection title="Jetpopup">
          <Para>Functional</Para>
          <table className="w-full border-collapse border border-gray-300 mt-2">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Expiration</th>
                <th className="border border-gray-300 p-2">Function</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">jetPopupData</td>
                <td className="border border-gray-300 p-2">persistent</td>
                <td className="border border-gray-300 p-2">Store if a message has been dismissed</td>
              </tr>
            </tbody>
          </table>
        </CookieSection>

        <CookieSection title="Elementor">
          <Para>Statistics (anonymous)</Para>
          <table className="w-full border-collapse border border-gray-300 mt-2">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Expiration</th>
                <th className="border border-gray-300 p-2">Function</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">elementor</td>
                <td className="border border-gray-300 p-2">persistent</td>
                <td className="border border-gray-300 p-2">Store performed actions on the website</td>
              </tr>
            </tbody>
          </table>
        </CookieSection>

        <CookieSection title="Google reCAPTCHA">
          <Para>Functional, Marketing/Tracking</Para>
          <table className="w-full border-collapse border border-gray-300 mt-2">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Expiration</th>
                <th className="border border-gray-300 p-2">Function</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">_grecaptcha</td>
                <td className="border border-gray-300 p-2">6 months</td>
                <td className="border border-gray-300 p-2">Provide spam protection</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">rc::a</td>
                <td className="border border-gray-300 p-2">persistent</td>
                <td className="border border-gray-300 p-2">Read and filter requests from bots</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">rc::b</td>
                <td className="border border-gray-300 p-2">session</td>
                <td className="border border-gray-300 p-2">Read and filter requests from bots</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">rc::c</td>
                <td className="border border-gray-300 p-2">session</td>
                <td className="border border-gray-300 p-2">Read and filter requests from bots</td>
              </tr>
            </tbody>
          </table>
        </CookieSection>

        <Head>7. Consent</Head>
        <Para>
          When you visit our website for the first time, we will show you a pop-up with an explanation about cookies. As soon as you click on &quot;Save preferences&quot;, you consent to us using the categories of cookies and plug-ins you selected in the pop-up, as described in this Cookie Policy. You can disable the use of cookies via your browser, but please note that our website may no longer work properly.
        </Para>

        <Head>8. Enabling/disabling and deleting cookies</Head>
        <Para>
          You can use your internet browser to automatically or manually delete cookies. You can also specify that certain cookies may not be placed. Another option is to change the settings of your internet browser so that you receive a message each time a cookie is placed. For more information about these options, please refer to the instructions in the Help section of your browser.
        </Para>

        <Head>9. Your rights with respect to personal data</Head>
        <Para>
          You have the following rights with respect to your personal data:
        </Para>
        <ul className={`list-disc pl-6 mb-4 ${lexendDeca.className}`}>
          <li>You have the right to know why your personal data is needed, what will happen to it, and how long it will be retained for.</li>
          <li>Right of access: You have the right to access your personal data that is known to us.</li>
          <li>Right to rectification: you have the right to supplement, correct, have deleted or blocked your personal data whenever you wish.</li>
          <li>If you give us your consent to process your data, you have the right to revoke that consent and to have your personal data deleted.</li>
          <li>Right to transfer your data: you have the right to request all your personal data from the controller and transfer it in its entirety to another controller.</li>
          <li>Right to object: you may object to the processing of your data. We comply with this, unless there are justified grounds for processing.</li>
        </ul>
        <Para>
          To exercise these rights, please contact us. Please refer to the contact details at the bottom of this Cookie Policy. If you have a complaint about how we handle your data, we would like to hear from you, but you also have the right to submit a complaint to the supervisory authority (the Data Protection Authority).
        </Para>

        <Head>10. Contact details</Head>
        <Para>
          For questions and/or comments about our Cookie Policy and this statement, please contact us by using the following contact details:
        </Para>
        <address className={`not-italic ${lexendDeca.className}`}>
          Glam beauty<br />
          133 ley street<br />
          Ilford<br />
          IG1 4BH<br />
          United Kingdom<br />
          Website: https://www.glambeauty.com<br />
          Email: admin@glambeauty.com<br />
          Phone number: 07969172103
        </address>
      </div>
    </Container>
  )
}

export default function CookiePolicy() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CookiePolicyContent />
    </Suspense>
  )
}