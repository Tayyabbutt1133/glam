"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Overview from '..//..//../components/user_account_dashboard/overview/Overview';
import Orders from '../../../components/user_account_dashboard/orders/DoOrders';
import Address from '../../../components/user_account_dashboard/addresses/Add_Edit_Addresses';
import Payment from '../../../components/user_account_dashboard/payments/Add_Payments';



import user from '../../../public/myaccount_icons/user.svg';
import orders from '../../../public/myaccount_icons/orders.svg';
import address from '../../../public/myaccount_icons/map.svg';
import credit from '../../../public/myaccount_icons/credit-card.svg';
import power_off from '../../../public/myaccount_icons/power.svg';
import { lexendDeca, jost } from '../../../components/ui/fonts'; 
import Logout from '..//..//../components/user_account_dashboard/Logout';




const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="flex p-12">
      {/* Sidebar */}
      <div className="w-1/4 p-4 border-r">
        <nav className="space-y-6">
          <button 
            onClick={() => setActiveSection('overview')} 
            className={`flex items-center space-x-2 px-4 py-2 rounded ${activeSection === 'overview' ? 'text-black text-lg   bg-gray-200' : 'text-gray-500'} hover:text-black`}
          >
            <Image src={user} />
            <span className={`${jost.className}`}>Overview</span>
          </button>

          <button 
            onClick={() => setActiveSection('orders')} 
            className={`flex items-center space-x-2 px-4 py-2 rounded ${activeSection === 'orders' ? 'text-black text-lg bg-gray-200' : 'text-gray-500'} hover:text-black`}
          >
            <Image src={orders} />
            <span className={`${jost.className}`}>Your Orders</span>
          </button>

          <button 
            onClick={() => setActiveSection('address')} 
            className={`flex items-center space-x-2 px-4 py-2 rounded ${activeSection === 'address' ? 'text-black text-lg bg-gray-200' : 'text-gray-500'} hover:text-black`}
          >
            <Image src={address} />
            <span className={`${jost.className}`}>Saved Address</span>
          </button>

          <button 
            onClick={() => setActiveSection('payment')} 
            className={`flex items-center space-x-2 px-4 py-2 rounded ${activeSection === 'payment' ? 'text-black text-lg bg-gray-200' : 'text-gray-500'} hover:text-black`}
          >
            <Image src={credit} />
            <span className={`${jost.className}`}>Payment Methods</span>
          </button>

          <button 
            onClick={() => setActiveSection('logout')} 
            className="flex items-center space-x-2 px-4 py-2 rounded text-gray-500 hover:text-black"
          >
            <Image src={power_off} />
            <span  className={`${jost.className}`}>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      {/* It will be rendering components and updating state */}
      <div className="w-3/4 p-8">
        {activeSection === 'overview' && <Overview />}
        {activeSection === 'orders' && <Orders />}
        {activeSection === 'address' && <Address />}
        {activeSection === 'payment' && <Payment />}
        {activeSection === 'logout' && <Logout />}
      </div>
    </div>
  );
};

export default Dashboard;
