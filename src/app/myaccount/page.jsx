"use client";

import React, { useState } from "react";
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

const Dashboard = () => {
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
        return <Orders/>
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
      <div className="md:flex p-12 hidden ">
        {/* Sidebar */}
        <div className="w-1/4 p-4 border-r">
          <nav className="space-y-6">
            <button
              onClick={() => setActiveSection("overview")}
              className={`flex items-center space-x-2 px-4 py-2 rounded ${
                activeSection === "overview"
                  ? "text-black text-lg   bg-gray-200"
                  : "text-gray-500"
              } hover:text-black`}
            >
              <Image src={user} />
              <span className={`${jost.className}`}>Overview</span>
            </button>

            <button
              onClick={() => setActiveSection("orders")}
              className={`flex items-center space-x-2 px-4 py-2 rounded ${
                activeSection === "orders"
                  ? "text-black text-lg bg-gray-200"
                  : "text-gray-500"
              } hover:text-black`}
            >
              <Image src={orders} />
              <span className={`${jost.className}`}>Your Orders</span>
            </button>

            <button
              onClick={() => setActiveSection("address")}
              className={`flex items-center space-x-2 px-4 py-2 rounded ${
                activeSection === "address"
                  ? "text-black text-lg bg-gray-200"
                  : "text-gray-500"
              } hover:text-black`}
            >
              <Image src={address} />
              <span className={`${jost.className}`}>Saved Address</span>
            </button>

            <button
              onClick={() => setActiveSection("payment")}
              className={`flex items-center space-x-2 px-4 py-2 rounded ${
                activeSection === "payment"
                  ? "text-black text-lg bg-gray-200"
                  : "text-gray-500"
              } hover:text-black`}
            >
              <Image src={credit} />
              <span className={`${jost.className}`}>Payment Methods</span>
            </button>

            <button
              onClick={() => setActiveSection("logout")}
              className="flex items-center space-x-2 px-4 py-2 rounded text-gray-500 hover:text-black"
            >
              <Image src={power_off} />
              <span className={`${jost.className}`}>Logout</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        {/* It will be rendering components and updating state */}
        <div className="w-3/4 p-8">
          {activeSection === "overview" && <Overview />}
          {activeSection === "orders" && <Orders />}
          {activeSection === "address" && <Address />}
          {activeSection === "payment" && <Payment />}
          {activeSection === "logout" && <Logout />}
        </div>
      </div>

      <div className="flex flex-col h-screen md:hidden">
      <header className="bg-white p-4 shadow-md flex items-center">
          {showContent && (
            <button onClick={handleBackClick} className="mr-4">
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
          )}
          <h1 className={`${jost.className} text-2xl font-bold text-center flex-grow`}>
            {showContent ? menuItems.find(item => item.id === activeSection)?.label : "My Account"}
          </h1>
        </header>

        {!showContent ? (
          <div className="w-full p-4 border-sb">
            <nav className="space-y-6">
              <button
                onClick={() => handleItemClick("overview")}
                className="flex items-center justify-between w-full px-4 py-2 rounded text-gray-500 hover:text-black"
              >
                <div className="flex items-center space-x-2">
                  <Image src={user} alt="Overview" />
                  <span className={`${jost.className}`}>Overview</span>
                </div>
                <ChevronRightIcon className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleItemClick("orders")}
                className="flex items-center justify-between w-full px-4 py-2 rounded text-gray-500 hover:text-black"
              >
                <div className="flex items-center space-x-2">
                  <Image src={orders} alt="Your Orders" />
                  <span className={`${jost.className}`}>Your Orders</span>
                </div>
                <ChevronRightIcon className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleItemClick("address")}
                className="flex items-center justify-between w-full px-4 py-2 rounded text-gray-500 hover:text-black"
              >
                <div className="flex items-center space-x-2">
                  <Image src={address} alt="Saved Address" />
                  <span className={`${jost.className}`}>Saved Address</span>
                </div>
                <ChevronRightIcon className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleItemClick("payment")}
                className="flex items-center justify-between w-full px-4 py-2 rounded text-gray-500 hover:text-black"
              >
                <div className="flex items-center space-x-2">
                  <Image src={credit} alt="Payment Methods" />
                  <span className={`${jost.className}`}>Payment Methods</span>
                </div>
                <ChevronRightIcon className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleItemClick("logout")}
                className="flex items-center justify-between w-full px-4 py-2 rounded text-gray-500 hover:text-black"
              >
                <div className="flex items-center space-x-2">
                  <Image src={power_off} alt="Logout" />
                  <span className={`${jost.className}`}>Logout</span>
                </div>
                <ChevronRightIcon className="w-5 h-5" />
              </button>
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
};

export default Dashboard;
 {/* Bottom Navigation
        <nav className="bg-white shadow-md">
          <ul className="flex justify-between">
            {menuItems.map((item) => (
              <li key={item.id} className="flex-1">
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full py-4 flex flex-col items-center justify-center ${
                    activeSection === item.id ? "text-black" : "text-gray-500"
                  }`}
                >
                  <Image src={item.icon} alt={item.label} width={20} height={20} />
                  <span className={`${jost.className} text-xs mt-1`}>
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav> */}