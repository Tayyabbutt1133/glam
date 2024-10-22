'use client'

import React, { Suspense } from "react"
import { jost, lexendDeca } from "../../../components/ui/fonts"
import Breadcrumb from "../../../components/BreadCrumb"
import Container from "../../../components/container"
import { useSearchParams } from "next/navigation"

const Head = ({ children }) => {
  return (
    <h2 className={`text-[24px] font-semibold mt-[40px] my-2 ${jost.className}`}>
      {children}
    </h2>
  )
}

const Para = ({ children }) => {
  return (
    <p className={`mb-3 ${lexendDeca.className}`}>
      {children}
    </p>
  )
}

function TermsAndConditionsContent() {
  const searchParams = useSearchParams()

  return (
    <main className="">
      <Container>
        <Breadcrumb
          links={[
            { name: "Home", route: "/" },
            { name: "Terms and Conditions", route: "/terms-and-conditions" },
          ]}
        />
      </Container>
      <Container className="my-14">
        <h1 className={`${jost.className} mb-7 mt-14 font-semibold text-3xl 2xl:text-4xl`}>
          TERMS AND CONDITIONS
        </h1>
        <Para>
          These terms and conditions (&quot;Terms&quot;) govern the use of the website https://www.glambeauty.com/ (&quot;Website&quot;) by users (&quot;you&quot; or &quot;your&quot;) and their relationship with GLAMBEAUTY INTERNATIONAL LIMITED (trading as www.glambeauty.com) whose registered office is at 133 Ley Street, Ilford, Essex, IG1 4BH, company registration number 14517764. <br /> <br />
          Please read the terms and conditions carefully, as they affect your legal rights and obligations. If you do not agree to these Terms and Conditions, please do not access or use the Website. By ordering our goods or services, you agree to comply with these Terms and Conditions. It is recommended that you print a copy of these Terms and Conditions so that you have them at your fingertips. If you have any questions about these Terms and Conditions, please contact us.
        </Para>
        <Head>Agreement</Head>
        <Para>By using the Website you agree to be bound by these Terms.</Para>
        <Head>Amendments</Head>
        <Para>
          We reserve the right to update these Terms from time to time and any changes will be notified to you via a suitable announcement on the Website. It is your responsibility to check for such changes. The changes will apply to the use of the Website after we have given such announcement. If you do not wish to accept the new Terms you should not continue to use the Website. If you continue to use the Website after the date on which the change comes into effect, your use of the Website indicates your agreement to be bound by the new Terms; and modify or withdraw, temporarily or permanently, this Website and the material contained within (or any part) without notice to you and you confirm that we shall not be liable to you for any modification to or withdrawal of the Website or its contents.
        </Para>
        <Head>Registration</Head>
        <Para>
          You warrant that the personal information which you are required to provide when you register is true, accurate, current and complete in all respects; and you are not impersonating any other person or entity. <br /> <br />
          The products purchased on this site are for private and domestic use only and are not for re sale. You will notify us immediately of any changes to the personal information by e-mailing or telephoning our customer service representatives at feedback@glambeauty.com.
        </Para>
        <Head>Privacy Policy</Head>
        <Para>
          We will treat all your personal information as confidential and we will only use it in accordance with our Privacy Policy. <br /> <br />
          When you shop on this Website, we will ask you to input personal details in order for us to identify you, such as your name, e-mail address, billing address, delivery address, credit card or other payment information. We confirm that this information will be held by us in accordance with the registration we have with the Data Commissioner&apos;s office.
        </Para>
        {/* ... (rest of the content) ... */}
        <Head>Complaints</Head>
        <Para>
          If you feel you have any cause to complain, you can contact us via one
          of the following methods. We will respond to all queries and will always
          aim to resolve the matter for you. Contact us using the website contact
          form or alternatively email us at cs@glambeauty.com.
        </Para>
      </Container>
    </main>
  )
}

function TermsAndConditions() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TermsAndConditionsContent />
    </Suspense>
  )
}

export default TermsAndConditions