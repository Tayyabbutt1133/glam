"use client";

import React, { useState } from "react";

import MobileHeader from "./MobileHeader";

import MobileSidebar2 from "./MObileSidebar2";
export default function MainLayoutMobile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <main className=" flex flex-col  z-50 lg:hidden">
      <MobileHeader onOpenSidebar={openSidebar} />
     
      <MobileSidebar2 isOpen={isSidebarOpen} onClose={closeSidebar} />
    </main>
  );
}
