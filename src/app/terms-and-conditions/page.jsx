import React from "react";
import { jost, lexendDeca } from "../../../components/ui/fonts";
import Breadcrumb from "../../../components/BreadCrumb";
import Container from "../../../components/container";

const Head = ({ children }) => {
  return (
    <h2 className={`text-[24px] font-semibold mt-[40px] my-2 ${jost.className}`}>
      {children}
    </h2>
  );
};

const Para = ({ children }) => {
  return (
    <p className={`mb-3 ${lexendDeca.className}`}>
      {children}
    </p>
  );
};

function TermsAndConditions() {
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
        <Head>Protecting Your Security</Head>
        <Para>
          To ensure that your credit, debit or charge card is not being used without your consent, we will validate name, address and other personal information supplied by you during the order process against appropriate third party databases.<br /> <br />
          We take the risk of internet fraud very seriously. With the volume of fraudulent credit card transactions increasing, we make every effort to ensure all orders are thoroughly checked using the information already supplied. There is a possibility we may contact you to make additional security checks and we ask for your co-operation to enable us to complete them. We will not tolerate fraudulent transactions and such transactions will be reported to the relevant authorities.<br /> <br />
          By accepting these terms and conditions you consent to such checks being made. In performing these checks personal information provided by you may be disclosed to a registered Credit Reference Agency which may keep a record of that information. You can rest assured that this is done only to confirm your identity, that a credit check is not performed and that your credit rating will be unaffected. All information provided by you will be treated securely and strictly in accordance with the Data Protection Act 1998.
        </Para>
        <Head>Compliance</Head>
        <Para>
          The Website may only be used for lawful purposes and in a lawful manner. You agree to comply with all applicable laws, statutes and regulations regarding the Website and its use. You agree not to upload or transmit through the Website any computer viruses or anything else designed to interfere with, interrupt or disrupt the normal operating procedures of a computer; and any material which is defamatory, offensive or of an obscene character.
        </Para>
        <Head>Indemnity</Head>
        <Para>
          You agree to fully indemnify, defend and hold us, and our officers, directors, employees and suppliers, harmless immediately on demand, from and against all claims, losses, costs and expenses, including reasonable legal fees, arising out of any breach of these Terms by you, or any other liabilities arising out of your use of this Website or any other person accessing the Website using your personal information.
        </Para>
        <Head>Third Party Links</Head>
        <Para>
          As a convenience to our customers, the Website may include links to other websites or material which is beyond our control. For your information, we are not responsible for such websites or material nor do we review or endorse them. We will not be liable, whether directly or indirectly, for the privacy practices or content of such websites nor for any damage, loss or offence caused or alleged to be caused in connection with, the use of or reliance on any such advertising, content, products, materials or services available on such external websites or resources.
        </Para>
        <Head>Orders</Head>
        <Para>
          All orders are subject to acceptance and availability. If the goods ordered are not available you will be notified by e-mail (or by other means if no e-mail address has been provided). You will have the option either to wait until the item is available from stock or to cancel your order.<br /> <br />
          Any orders placed by you will be treated as an offer to purchase the goods or services from us and we have the right to reject such offers at any time. You acknowledge that any automated acknowledgment of your order which you may receive from us shall not amount to our acceptance of your offer to purchase goods or services advertised on the Website. The conclusion of a contract between you and us will take place when we (i) debit your credit, debit card or PayPal account or (ii) dispatch the goods to you or commence the services, whichever is the later. We will take all reasonable care, in so far as it is in our power to do so, to keep the details of your order and payment secure, but in the absence of negligence on our part we cannot be liable for any loss you may suffer if a third party procures unauthorised access to any data provided by you when accessing or ordering from the Website.<br /> <br />
          You will assume the risk for the products once they have been delivered to the delivery address which you specified when ordering the products. We accept no liability where you provide an incorrect delivery address or where you fail to collect the products from the delivery address which you specified. Notwithstanding that risk of loss or damage to the products only passes to you once they have been delivered to the delivery address, ownership of the products shall pass to you on the later of: (a) the products being dispatched by us; and (b) us receiving payment in respect of the same.<br /> <br />
          We do not allow drop-shipping.<br /> <br />
          Images are for illustration purposes only.<br /> <br />
          If you are sent an item and it is held at the local sorting office and Royal Mail have attempted and failed delivery (for any reason such as but not limited to the address being inaccessible, you not being in to sign for the goods etc.) it is your responsibility to collect it from said sorting office. Any items that aren&apos;t collected are returned back to us. We will then ask you to pay an additional £2.50 postage to have the goods re-sent to you or if you request a refund, you will be refunded minus £2.50 to cover the costs of Royal Mail returning your order to us.<br /> <br />
          GlamBeauty accepts no responsibility for transport delays or circumstances outside of our control causing late delivery. Delivery will be to the address advised in your order. We will only deliver to the address provided at checkout. If no one is available at the postal address provided at the time of delivery, a note will be left to advise you or Royal Mail may deliver to a neighbour. Recipients can opt out of Delivery to neighbour and can also nominate a specific neighbour if they wish. Details of how to do so can be found here:<a href="https://www.royalmail.com/personal/receiving-mail/delivery-to-neighbour" target="_blank"> https://www.royalmail.com/personal/receiving-mail/delivery-to-neighbour</a>
          We do not allow collections.
        </Para>
        <Head>Cancellation Rights</Head>
        <Para>
          Where you have purchased the goods or services as a consumer (i.e. for private use as opposed to business use), you are entitled to cancel any contract completed with us within 14 days from the day on which you acquire physical possession of the goods.<br /> <br />
          If you wish to cancel a contract pursuant to this clause please see our Returns Policy for further details on how to do this.
        </Para>
        <Head>Price and Payment</Head>
        <Para>
          All prices shown are inclusive of VAT (only where applicable – see below) at the current rates and are correct at the time of entering the information onto the system. We reserve the right, however, to change prices at any time without notice to you. If your delivery address is within the United Kingdom, no additional taxes will be charged to you.
          If your delivery address is outside of the United Kingdom you may be subject to import duties and taxes (including VAT), which are levied once a delivery reaches your destination country. Any such additional charges must be borne by you. (if your delivery address is inside the European Union (&quot;EU&quot;) see &quot;Customs clearance responsibilities for EU delivery addresses&quot;). You should note that customs policies and practices vary widely from country to country. We recommend that you contact your local customs office for information.
          Please note that when shipping goods from outside the United Kingdom, cross border shipments may be subject to opening and inspection by customs authorities. In respect of all goods dispatched to you to an address outside of the United Kingdom, you are deemed to be the importer of the goods and must therefore comply with all the laws and regulations of the country into which the goods are being delivered.<br /> <br />
          Payment can be made by any major credit or debit card or via your PayPal account. Payment will be debited and cleared from your account before the dispatch of your good or provision of the service to you.<br /> <br />
          If payment is to be made via a credit card, a pre-auth value of £0.01 will be held against the card until the card issuer validates the payment. In the unlikely event that the price shown on the checkout page is wrong, and we discover this before accepting your order in accordance with clause 9, we are not required to sell the goods to you at the price shown. We always try and ensure that the prices of goods shown on our Website are accurate, but occasionally genuine errors may occur. If we discover an error in the price of the goods that you have ordered we will let you know as soon as possible and give you the option of reconfirming your order at the correct price or cancelling it. If you cancel your order and you have already paid for the goods, then you will receive a full refund.<br /> <br />
          You confirm that the credit, debit card or PayPal account that is being used is yours. All credit/debit cardholders are subject to validation checks and authorisation by the card issuer. If the issuer of your payment card refuses to or does not, for any reason, authorise payment to us we will not be liable to you for any delay or non-delivery.
          If your credit or debit card payment is not processed successfully for any reason, we reserve the right to reattempt to process payment within 48 hours. In the event that the payment is still unsuccessful, we will give you at least 48 hours&apos; notice in advance of any further reattempt to process payment by sending an email to the email address you have provided to us. If you do not want us to reattempt to process payment, you must cancel your order in advance.<br /> <br />
          You may only use one discount code with each order. We reserve the right to reject or cancel any orders where you add more than one discount code to the basket. We allow you to use discount codes strictly on the terms and conditions upon which they were issued which, amongst other things, may include terms relating to your eligibility to use them and a maximum order value.<br /> <br />
          Please familiarise yourself with these terms and conditions before you place an order as we reserve the right to reject or cancel any orders which do not comply with these terms even if your credit or debit card has been charged. If there is any inconsistency between the terms and conditions upon which the discount codes were issued and these terms and conditions, the discount code terms and conditions prevail. A copy of the discount code terms and conditions can be obtained by mailing or telephoning our customer service representatives at:cs@glambeauty.com<br /> <br />
          Customs clearance responsibilities for EU delivery addresses: For orders dispatched from the UK only. For deliveries to addresses within the EU, for legal purposes you are the importer of the goods, and are responsible for any import formalities as well as any duties, tariffs, or taxes which may be charged by any customs authority.<br /> <br />
          However, we have collected these amounts from you as part of your purchase, and by agreeing to these terms, you hereby authorise us to appoint our designated carrier(s) to carry out any required customs formalities on your behalf, including payment of any duties, tariffs, or taxes to the appropriate customs authority.<br /> <br />
          The designated carrier will deliver the goods to you in addition to carrying out the customs formalities on your behalf. These customs formalities will be carried out in different countries depending on the country in which your delivery address belongs, and the carrier used. Your goods will be cleared for customs purposes in one of the following clearance countries:

          DPD <br /> <br />1. Cyprus (for addresses in Cyprus) <br /> <br />2. France (for addresses in France, Austria, Bulgaria, Croatia, Czech Republic, Estonia, Greece, Hungary, Italy, Latvia, Lithuania, Portugal, Romania, Slovakia, and Slovenia) <br /> <br />3. Ireland (for addresses in Ireland) <br /> <br />4. Malta (for addresses in Malta) <br /> <br />5. Spain (for addresses in Spain) <br /> <br />6. The Netherlands (for addresses in the Netherlands, Belgium, Denmark, Finland, Germany, Luxembourg, Poland, and Sweden) Hermes <br /> <br />7. Belgium (for addresses in Belgium and Ireland) <br /> <br />8. Otherwise, in the country in which your address belongs.
          <br /> <br />
          DHL 9. In the country in which your address belongs.
          <br /> <br />
          P2P 10. The Netherlands (for all addresses) <br /> <br />
          This means that you will be charged duties, tariffs, or taxes at the rate applicable in the clearance country – these will be paid on your behalf by the designated carrier. These clearance countries are subject to change without notice being provided to you.
          By accepting these terms, you consent to us appointing a  designated carrier to act on your behalf as described above, and that the designated carrier is acting solely for you as your customs direct representative. <br /> <br />
          We do not issue tax invoices for shipments to the EU from the UK. Any proof-of-sale document we provide at your request is provided entirely at our discretion, and serves as a record of your purchase only. The document may not comply with the requirements imposed by the tax authorities in your local jurisdiction for the purposes of reclaiming VAT, and we are unable to provide additional documentation in this regard.
        </Para>
        <Head>Eligibility to Purchase</Head>
        <Para>
          To be eligible to purchase goods on this Website and lawfully enter into
          and form contracts on this Website under English law you must, if an
          individual, be 18 years of age or over; and register your real name,
          address, phone number, e-mail address any other details requested. By
          offering to purchase goods and services you represent to us that you
          are 18 years of age or over and authorise us to transmit information
          (included updated information) to obtain information from third
          parties, including but not limited to, your debit or credit card numbers
          or credit reports to authenticate your identity, to validate your
          credit card, to obtain an initial credit card authorisation and to
          authorise individual purchase transactions.
        </Para>
        <Head>Intellectual Property</Head>
        <Para>
          The content of the Website is protected by copyright, trademarks,
          database and other intellectual property rights and you acknowledge
          that the material and content supplied as part of the Website shall
          remain with us or our licensors. You may retrieve and display the
          content of the Website on a computer screen, store such content in
          electronic form on disk (but not any server or other storage device
          connected to a network) or print one copy of such content for your own
          personal, non-commercial use, provided you keep intact all and any
          copyright and proprietary notices. You may not otherwise reproduce,
          modify, copy or distribute or use for commercial purposes any of the
          materials or content on the Website.
        </Para>
        <Head>Limitation of Liability</Head>
        <Para>
          Notwithstanding any other provision in the Terms, nothing in these Terms
          affect or limit your rights as a consumer under English law; or will
          exclude or limit our liability for death or personal injury resulting
          from our negligence. The Website is provided on an &apos;as is&apos; and &apos;as
          available&apos; basis without any representation or endorsement made and we
          make no warranties, whether express or implied, in relation to it and
          its use. You acknowledge that we cannot guarantee and cannot be
          responsible for the security or privacy of the Website and any
          information provided by you. You must bear the risk associated with the
          use of the Internet.
        </Para>
        <Para>
          Whilst we will try to ensure that material included on the Website is
          correct, reputable and of high quality, we cannot accept responsibility
          if this is not the case. We will not be responsible for any errors or
          omissions or for the results obtained from the use of such information
          or for any technical problems you may experience with the Website. If we
          are informed of any inaccuracies in the material on the Website we will
          attempt to correct this as soon as we reasonably can.
        </Para>
        <Para>
          In particular, we disclaim all liabilities in connection with the
          following: incompatibility of the Website with any of your equipment,
          software or telecommunications links; technical problems including
          errors or interruptions of the Website; unsuitability, unreliability or
          inaccuracy of the Website; and failure of the Website to meet your
          requirements.
        </Para>
        <Head>Severance</Head>
        <Para>
          If any part of the Terms shall be deemed unlawful, void or for any
          reason unenforceable, then that provision shall be deemed severable from
          these Terms and shall not affect the validity and enforceability of any
          remaining provisions of the Terms.
        </Para>
        <Head>Waiver</Head>
        <Para>
          No waiver by us shall be construed as a waiver of any proceeding or
          succeeding breach of any provision.
        </Para>
        <Head>Entire Agreement</Head>
        <Para>
          These Terms form the entire basis of any agreement reached between you
          and us.
        </Para>
        <Head>Law and Jurisdiction</Head>
        <Para>
          These Terms shall be governed by and construed in accordance with the
          laws of England and Wales and any disputes will be decided only by the
          English courts.
        </Para>
        <Head>All Competitions</Head>
        <Para>
          We reserve the right to amend these Terms from time to time. These rules
          will be deemed incorporated into each competition except to the extent
          that any specific instruction in a competition provides otherwise. By
          entering the competition entrants will be deemed to have read and
          understood these Terms and be bound by them. All of our decisions will
          be final and binding and no correspondence will be entered into.
        </Para>
        <Para>
          Any person who is an employee or an immediate family member of an
          employee of GLAMBEAUTY INTERNATIONAL LIMITED or any other person who is
          directly connected with the organisation of any particular competition
          is ineligible to participate. Competitions are only open to residents of
          the UK (excluding Northern Ireland).
        </Para>
        <Para>
          All entrants are to be aged 18 or over unless any other age restriction
          is specified or implied. Entrants should, if under 18, obtain permission
          in advance from their parent or guardian.
        </Para>
        <Para>
          All entries must be received by the closing date specified in the
          competition. Answers will be entered upon submission. No responsibility
          will be taken for any answers that are misdirected, lost for technical
          or other reasons or received after the closing date.
        </Para>
        <Para>
          We reserve the absolute right to disqualify without notice any entries
          to any competition which we consider have used improper technical means
          to enter and/or we believe is fraudulent. Entrants are liable for their
          costs to access computer networks.
        </Para>
        <Para>
          We will not be liable for or accept any responsibility for: (i) any
          failure by the winner or any entrant to comply with these terms and
          conditions; (ii) any disruption, delay or misdirection of entries; or
          (iii) any server, system or network failures, malfunctioning or
          inaccessibility.
        </Para>
        <Para>
          We shall be the promoter of all competitions subject to these terms and
          conditions unless stated otherwise.
        </Para>
        <Head>Prizes</Head>
        <Para>
          If for any reason an advertised prize is unavailable we reserve the
          right at our absolute discretion to substitute a similar prize of
          equivalent or greater value.
        </Para>
        <Para>
          Only one prize will be awarded per household. There will be no cash or
          other alternative to the prize offered and prizes are not transferable.
          The products purchased on this site are for private and domestic use
          only and are not for re sale.
        </Para>
        <Head>Notification</Head>
        <Para>
          The winner&apos;s name will be selected in a random draw, after the closing
          date, from all correct answers received. The winner of a prize will be
          notified within 28 days after the winner has been ascertained.
        </Para>
        <Para>
          Please allow 28 days for delivery of all prizes. If the winner of a
          competition is unable to take up a prize for any reason or if the winner
          cannot be notified after reasonable efforts having been made then we may
          dispose of the prize as we think fit without any liability to the winner
          for having done so.
        </Para>
        <Head>Claiming Prizes</Head>
        <Para>
          Prizes involving Travel: (a) Travel arrangements are the responsibility
          of prize winners unless otherwise stated; (b) we reserve the right to
          require written permission from the parent or guardian of any winner who
          is under the age of 16 and to require such a winner to choose as a
          companion someone 18 or over.
        </Para>
        <Head>Reviews</Head>
        <Para>
          If you submit a review, you grant us a non-exclusive, royalty-free,
          perpetual, irrevocable, and fully sub-licensable right to use,
          reproduce, modify, adapt, publish, translate, create derivative works
          from, distribute, and display such content throughout the world in any
          media.
        </Para>
        <Head>Multibuy Offers</Head>
        <Para>
          This offer applies only to qualifying items listed in the Multibuy area
          of this Website. Where any goods are returned (except for an exchange
          where products are faulty/defective), we are entitled to either require
          the return of all goods delivered as part of that Multibuy offer at your
          cost or charge you for the goods retained by you at the full price
          quoted on this site.
        </Para>
        <Head>Free Gift with Products Promotions</Head>
        <Para>
          Where we are offering a free gift with a product, we shall only provide
          one free gift per transaction (irrespective of how many products are
          purchased). The free gift is subject to availability and we reserve the
          right to change the free gift for an alternative gift.
        </Para>
        <Head>Eligibility to Purchase</Head>
        <Para>
          If you are not at least 16 years of age, please do not access, use,
          register or purchase merchandise on the GlamBeauty website. In the event
          that we become aware that you&apos;re under 16, we will terminate your
          registration.
        </Para>
        <Head>External Sites</Head>
        <Para>
          Glambeauty.com is not responsible for the content of external websites.
        </Para>
        <Head>Complaints</Head>
        <Para>
          If you feel you have any cause to complain, you can contact us via one
          of the following methods. We will respond to all queries and will always
          aim to resolve the matter for you. Contact us using the website contact
          form or alternatively email us at cs@glambeauty.com.
        </Para>
      </Container>
    </main>
  );
}

export default TermsAndConditions;