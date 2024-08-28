"use client";
import React from "react";
import { jost, lexendDeca } from "../../ui/fonts";

export default function MegaMenu() {
  return (
    <div className="relative w-full bg-white shadow-lg z-50 transition duration-300 ease-in-out p-4">
      {/* Horizontal line */}
      <div className="h-px bg-gray-300"></div>
      <div className="py-8 overflow-x-auto mx-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 lg:gap-8">
          <div>
            <h4 className={`font-semibold uppercase mb-2 text-lg ${jost.className}`}>Featured Brands</h4>
            <ul className="space-y-4 text-sm">
              <li className={`cursor-pointer ${lexendDeca.className}`}>7th Heaven</li>
              <li className={`cursor-pointer ${lexendDeca.className}`}>Biotherm</li>
              <li className={`cursor-pointer ${lexendDeca.className}`}>Bobbi Brown</li>
              <li className={`cursor-pointer ${lexendDeca.className}`}>Clarins</li>
              <li className={`cursor-pointer ${lexendDeca.className}`}>Clinique</li>
              <li className={`cursor-pointer ${lexendDeca.className}`}>Delia</li>
              <li className={`cursor-pointer ${lexendDeca.className}`}>Dr. Hauschka</li>
            </ul>
          </div>
          <div>
            <h4 className={`font-semibold uppercase mb-2 text-lg ${jost.className}`}>Moisturisers</h4>
            <ul className="space-y-4 text-sm">
              <li className={`cursor-pointer ${lexendDeca.className}`}>Balm</li>
              <li className={`cursor-pointer ${lexendDeca.className}`}>Lotion</li>
              <li className={`cursor-pointer ${lexendDeca.className}`}>Day Cream</li>
              <li className={`cursor-pointer ${lexendDeca.className}`}>Night Cream</li>
              <li className={`cursor-pointer ${lexendDeca.className}`}>Face Oil</li>
              <li className={`cursor-pointer ${lexendDeca.className}`}>Face Serum</li>
            </ul>
          </div>
          <div>
            <h4 className={`font-semibold uppercase mb-2 text-lg ${jost.className}`}>Eye Care</h4>
            <ul className="space-y-4 text-sm">
              <li className={`cursor-pointer ${lexendDeca.className}`}>Eye Serum</li>
              <li className={`cursor-pointer ${lexendDeca.className}`}>Eye Cream</li>
              <li className={`cursor-pointer ${lexendDeca.className}`}>Eye Gel</li>
              <li className={`cursor-pointer ${lexendDeca.className}`}>Eye Patch</li>
            </ul>
          </div>
          <div>
            <h4 className={`font-semibold uppercase mb-2 text-lg ${jost.className}`}>Cleansers</h4>
            <ul className="space-y-4 text-sm cursor-pointer">
              <li className={`cursor-pointer ${lexendDeca.className}`}>Face Wash & Cleanser</li>
              <li className={`cursor-pointer ${lexendDeca.className}`}>Liquid Exfoliators</li>
              <li className={`cursor-pointer ${lexendDeca.className}`}>Face Scrubs</li>
              <li className={`cursor-pointer ${lexendDeca.className}`}>Micellar Water</li>
              <li className={`cursor-pointer ${lexendDeca.className}`}>Wipes</li>
            </ul>
          </div>
          <div>
            <h4 className={`font-semibold uppercase mb-2 text-lg ${jost.className}`}>Toners</h4>
            <ul className="space-y-4 text-sm cursor-pointer">
              <li className={`${lexendDeca.className}`}>Facial Spray</li>
              <li className={`${lexendDeca.className}`}>Toner</li>
            </ul>
          </div>
          <div>
            <h4 className={`font-semibold uppercase mb-2 text-lg ${jost.className}`}>Masks</h4>
            <ul className="space-y-4 text-sm cursor-pointer">
              <li className={`${lexendDeca.className}`}>Face Mask</li>
              <li className={`${lexendDeca.className}`}>Sheet Mask</li>
              <li className={`${lexendDeca.className}`}>Clay Mask</li>
              <li className={`${lexendDeca.className}`}>Peel Off Mask</li>
              <li className={`${lexendDeca.className}`}>Eye Mask</li>
              <li className={`${lexendDeca.className}`}>Lip Mask</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
