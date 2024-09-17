"use client";

import React, { useState } from "react";

import MobileHeader from "./MobileHeader";

import MobileSidebar2 from "./MObileSidebar2";
import { jost } from "@/components/ui/fonts";
import { Minus } from "lucide-react";
export default function MainLayoutMobile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <main className=" flex flex-col  z-50 lg:hidden">
      <MobileHeader onOpenSidebar={openSidebar} />
      <p className={`text-center w-full p-2 text-sm ${jost.className}  font-light flex items-center gap-1 justify-center  bg-[#F7EBE0]`}>
        <span className="font-semibold">Free  </span> Shipping £10+ <Minus className=" opacity-60  h-6 w-4 rotate-90" /> <span className="font-semibold">Next Day </span> Delivery  £40+
      </p>
      <MobileSidebar2 isOpen={isSidebarOpen} onClose={closeSidebar} />
    </main>
  );
}
