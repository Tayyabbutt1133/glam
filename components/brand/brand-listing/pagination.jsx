import React from 'react'
import { lexendDeca } from '/components/ui/fonts'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className={`flex justify-end items-center ${lexendDeca.className}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 mx-1 bg-transparent border border-gray-300 rounded hover:bg-black hover:text-white transition ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        &lt;
      </button>
      {currentPage > 2 && (
        <button
          onClick={() => onPageChange(1)}
          className="px-4 py-2 mx-1 bg-transparent border border-gray-300 rounded hover:bg-black hover:text-white transition"
        >
          1
        </button>
      )}
      {currentPage > 3 && <span className="px-4 py-2">...</span>}
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-4 py-2 mx-1 bg-transparent border border-gray-300 rounded hover:bg-black hover:text-white transition"
        >
          {currentPage - 1}
        </button>
      )}
      <button className="px-4 py-2 mx-1 bg-black text-white rounded">
        {currentPage}
      </button>
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-4 py-2 mx-1 bg-transparent border border-gray-300 rounded hover:bg-black hover:text-white transition"
        >
          {currentPage + 1}
        </button>
      )}
      {currentPage < totalPages - 2 && <span className="px-4 py-2">...</span>}
      {currentPage < totalPages - 1 && (
        <button
          onClick={() => onPageChange(totalPages)}
          className="px-4 py-2 mx-1 bg-transparent border border-gray-300 rounded hover:bg-black hover:text-white transition"
        >
          {totalPages}
        </button>
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 mx-1 bg-transparent border border-gray-300 rounded hover:bg-black hover:text-white transition ${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        &gt;
      </button>
    </div>
  )
}