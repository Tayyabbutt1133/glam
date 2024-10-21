"use client";
import React from 'react';
import { jost, lexendDeca } from '../../../components/ui/fonts';
import Breadcrumb from '../../../components/BreadCrumb';
import Container from '../../../components/container';

const breadcrumbLinks = [
  { name: "Home", route: "/" },
  { name: "Returns Policy", route: "/Returns Policy" },
];

function page() {
  return (
    <>
      <Container>
        <Breadcrumb links={breadcrumbLinks} />
        <h1 className={`text-3xl ${jost.className} font-bold mb-2`}>Returns Policy</h1>
        <div className={`my-16 ${lexendDeca.className}`}>
          <p className="mb-6">Our returns policy is simple! You have 30 days from the date of receipt to start a return. We accept returns on all orders, provided they are in perfect condition. This means that they have not been opened, remain unused, and any seals remain intact. If unsealed after delivery, products that are not suitable for return due to health or hygiene reasons will not be accepted (unless these items were damaged or faulty when delivered to you or have been incorrectly delivered).</p>

          <p className="mb-6">If you wish to return your order, kindly contact us via email at cs@glambeauty.com before returning the package. </p>

          <p className="mb-6">If an item is damaged, defective, or incorrect, kindly contact our customer service team via email at cs@glambeauty.com. They will address the matter on a case-by-case basis. Please ensure that you have photographic or video evidence to help us process your claim as quickly as possible. </p>

          <p className="mb-6">You may return your items to us through your local post office. To return via your post office, you will need to complete an online form. This can be found at Tracked Returns on the Royal Mail website.</p>

          <p className="mb-6">The cost of postage will be deducted from your refund unless an incorrect or faulty item was delivered. Please keep a copy of your proof of postage, as we cannot be held responsible for goods that have been damaged or lost in transit. </p>

          <p className="mb-6">Your refund should be returned to your account within 5 working days, and we will send you an email to let you know.</p>

          <p className="mb-6">If you have not received your refund, and it has been 10 working days since you received our email, then you will need to contact our Customer Service team via email. </p>

          <p className="mb-6">Kindly be advised that we do not offer exchanges. You will need to place a new order and return the original order for a refund. </p>

          <p className="mb-6">This policy is offered as a supplement to your legal rights.</p>
        </div>
      </Container>
    </>
  );
}

export default page;
