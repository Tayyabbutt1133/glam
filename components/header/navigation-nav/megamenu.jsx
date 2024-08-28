"use client";
import React from "react";

export default function MegaMenu() {
  return (
    <div className="relative w-full bg-white shadow-lg z-50 transition duration-300 ease-in-out p-4">
      {/* Horizontal line */}
      <div className="h-px bg-gray-300"></div>
      <div className="py-8 overflow-x-auto mx-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 lg:gap-8">
          <div>
            <h4 className="font-bold mb-2 text-lg">Featured Brands</h4>
            <ul className="space-y-4 text-sm">
              <li className="cursor-pointer">7th Heaven</li>
              <li className="cursor-pointer">Biotherm</li>
              <li className="cursor-pointer">Bobbi Brown</li>
              <li className="cursor-pointer">Clarins</li>
              <li className="cursor-pointer">Clinique</li>
              <li className="cursor-pointer">Delia</li>
              <li className="cursor-pointer">Dr. Hauschka</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-lg">Moisturisers</h4>
            <ul className="space-y-4 text-sm">
              <li className="cursor-pointer">Balm</li>
              <li className="cursor-pointer">Lotion</li>
              <li className="cursor-pointer">Day Cream</li>
              <li className="cursor-pointer">Night Cream</li>
              <li className="cursor-pointer">Face Oil</li>
              <li className="cursor-pointer">Face Serum</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-lg">Eye Care</h4>
            <ul className="space-y-4 text-sm">
              <li className="cursor-pointer">Eye Serum</li>
              <li className="cursor-pointer">Eye Cream</li>
              <li className="cursor-pointer">Eye Gel</li>
              <li className="cursor-pointer">Eye Patch</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-lg">Cleansers</h4>
            <ul className="space-y-4 text-sm cursor-pointer">
              <li className="cursor-pointer">Face Wash & Cleanser</li>
              <li className="cursor-pointer">Liquid Exfoliators</li>
              <li className="cursor-pointer">Face Scrubs</li>
              <li className="cursor-pointer">Micellar Water</li>
              <li className="cursor-pointer">Wipes</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-lg">Toners</h4>
            <ul className="space-y-4 text-sm cursor-pointer">
              <li>Facial Spray</li>
              <li>Toner</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-lg">Masks</h4>
            <ul className="space-y-4 text-sm cursor-pointer">
              <li>Face Mask</li>
              <li>Sheet Mask</li>
              <li>Clay Mask</li>
              <li>Peel Off Mask</li>
              <li>Eye Mask</li>
              <li>Lip Mask</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
