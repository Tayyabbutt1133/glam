"use client"


import React from 'react';
import { jost } from '../../ui/fonts';
import Link from 'next/link';


const Orders = () => {
  return (
    <div>
          <h2 className={`text-2xl  font-medium mb-4 ${jost.className} uppercase`}>Your Orders</h2>
          <div className=' mt-10 space-y-4 '>
              <h1 className={ `${jost.className} text-lg text-[#000] font-medium`}>No purchases yet!</h1>
          <p className={ `${jost.className}`}>Your orders will appears here once you start shopping.</p>         
          </div>
          
      <Link href="/">
      <button className={` mt-24 uppercase bg-black py-[0.7rem] px-6 text-sm text-white rounded-md ${jost.className}`}>Shop now</button>
      </Link>
    </div>
  );
};

export default Orders;
