import React from "react";
import Image from "next/image";
import arrow_previous from "/public/Keyboard arrow left.svg";
import arrow_forward from "/public/Keyboard arrow right.svg";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-end items-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`mx-1 flex items-center justify-center rounded-[4px] border transition duration-300 ease-in-out ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed text-gray-400 bg-transparent border-[#EFEFEF]"
            : "bg-white text-black border-[#EFEFEF] hover:bg-gray-200 hover:text-white"
        }`}
        style={{
          width: "var(--Spacing-5, 40px)",
          height: "var(--Spacing-5, 40px)",
        }}
        aria-label="Previous page"
      >
        <Image src={arrow_previous} width={24} height={24} alt="Previous" />
      </button>

      {currentPage > 2 && (
        <button
          onClick={() => onPageChange(1)}
          className="mx-1 flex items-center justify-center rounded-[4px] border border-[#EFEFEF] bg-white hover:bg-gray-200 hover:text-white transition duration-300 ease-in-out"
          style={{
            width: "var(--Spacing-5, 40px)",
            height: "var(--Spacing-5, 40px)",
          }}
        >
          1
        </button>
      )}

      {currentPage > 3 && <span className="px-2">...</span>}

      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="mx-1 flex items-center justify-center rounded-[4px] border border-[#EFEFEF] bg-white hover:bg-gray-200 hover:text-white transition duration-300 ease-in-out"
          style={{
            width: "var(--Spacing-5, 40px)",
            height: "var(--Spacing-5, 40px)",
          }}
        >
          {currentPage - 1}
        </button>
      )}

      <button
        onClick={() => onPageChange(currentPage)}
        className="mx-1 flex items-center justify-center rounded-[4px] border border-[#EFEFEF] bg-black text-white"
        style={{
          width: "var(--Spacing-5, 40px)",
          height: "var(--Spacing-5, 40px)",
        }}
        aria-current="page"
      >
        {currentPage}
      </button>

      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="mx-1 flex items-center justify-center rounded-[4px] border border-[#EFEFEF] bg-white hover:bg-gray-200 hover:text-white transition duration-300 ease-in-out"
          style={{
            width: "var(--Spacing-5, 40px)",
            height: "var(--Spacing-5, 40px)",
          }}
        >
          {currentPage + 1}
        </button>
      )}

      {currentPage < totalPages - 2 && <span className="px-2">...</span>}

      {currentPage < totalPages - 1 && (
        <button
          onClick={() => onPageChange(totalPages)}
          className="mx-1 flex items-center justify-center rounded-[4px] border border-[#EFEFEF] bg-white hover:bg-gray-200 hover:text-white transition duration-300 ease-in-out"
          style={{
            width: "var(--Spacing-5, 40px)",
            height: "var(--Spacing-5, 40px)",
          }}
        >
          {totalPages}
        </button>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`mx-1 flex items-center justify-center rounded-[4px] border transition duration-300 ease-in-out ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed text-gray-400 bg-transparent border-[#EFEFEF]"
            : "bg-white text-black border-[#EFEFEF] hover:bg-gray-200 hover:text-white"
        }`}
        style={{
          width: "var(--Spacing-5, 40px)",
          height: "var(--Spacing-5, 40px)",
        }}
        aria-label="Next page"
      >
        <Image src={arrow_forward} width={24} height={24} alt="Next" />
      </button>
    </div>
  );
}
