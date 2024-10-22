"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Overview from "..//..//../components/user_account_dashboard/overview/Overview";
import Orders from "../../../components/user_account_dashboard/orders/DoOrders";
import Address from "../../../components/user_account_dashboard/addresses/Add_Edit_Addresses";
import Payment from "../../../components/user_account_dashboard/payments/Add_Payments";

import user from "../../../public/myaccount_icons/user.svg";
import orders from "../../../public/myaccount_icons/orders.svg";
import address from "../../../public/myaccount_icons/map.svg";
import credit from "../../../public/myaccount_icons/credit-card.svg";
import power_off from "../../../public/myaccount_icons/power.svg";
import { lexendDeca, jost } from "../../../components/ui/fonts";
import Logout from "..//..//../components/user_account_dashboard/Logout";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Breadcrumb from "../../../components/BreadCrumb";

function DashboardContent() {
  const [activeSection, setActiveSection] = useState("overview");
  const [showContent, setShowContent] = useState(false);
  const menuItems = [
    { id: "overview", label: "Overview", icon: user },
    { id: "orders", label: "Your Orders", icon: orders },
    { id: "address", label: "Saved Address", icon: address },
    { id: "payment", label: "Payment Methods", icon: credit },
    { id: "logout", label: "Logout", icon: power_off },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <Overview />;
      case "orders":
        return <Orders />;
      case "address":
        return <Address />;
      case "payment":
        return <Payment />;
      case "logout":
        return <Logout />;
      default:
        return null;
    }
  };

  const handleItemClick = (id) => {
    setActiveSection(id);
    setShowContent(true);
  };

  const handleBackClick = () => {
    setShowContent(false);
    setActiveSection(null);
  };
 
  return (
    <>
      <div className="px-12">
        <Breadcrumb links={[{ name: "Home", route: "/" }, { name: "My Account", route: "/myaccount" }]} />
      </div>
      <div className="md:flex p-12 hidden ">
        {/* Sidebar */}
        <div className="w-1/4 p-4 border-r">
          <nav className="space-y-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded ${
                  activeSection === item.id
                    ? "text-black text-lg bg-gray-200"
                    : "text-gray-500"
                } hover:text-black`}
              >
                <Image src={item.icon} alt={item.label} />
                <span className={`${jost.className}`}>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-8">
          {renderContent()}
        </div>
      </div>

      <div className="flex flex-col h-screen md:hidden">
        {showContent && (
          <header className="bg-white p-4 shadow-md flex items-center">
            <button onClick={handleBackClick} className="mr-4">
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <h1 className={`${jost.className} text-2xl font-bold text-center flex-grow`}>
              {menuItems.find(item => item.id === activeSection)?.label}
            </h1>
          </header>
        )}

        {!showContent ? (
          <div className="w-full p-4 border-sb">
            <nav className="space-y-6">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className="flex items-center justify-between w-full px-4 py-2 rounded text-gray-500 hover:text-black"
                >
                  <div className="flex items-center space-x-2">
                    <Image src={item.icon} alt={item.label} />
                    <span className={`${jost.className}`}>{item.label}</span>
                  </div>
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              ))}
            </nav>
          </div>
        ) : (
          <main className="flex-1 overflow-y-auto p-4">
            {renderContent()}
          </main>
        )}
      </div>
    </>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}