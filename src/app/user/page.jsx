import React from 'react'

import Link from "next/link";

export default function page() {
    return (
      <>
        <h1 className=' text-3xl font-bold text-center mt-10'>My Account</h1>
      <div className=' p-48 flex gap-12 justify-center'>
          <Link href="/login">
          <button className=' border border-black px-4 py-2 hover:bg-[#F7EBE0] transition ease-out duration-300'>
              Login In 
          </button>
          </Link>

          <Link href="/signup">
          <button className=' border border-black px-4 py-2 hover:bg-[#F7EBE0] transition ease-out duration-300'>
              Sign Up
              </button>
              </Link>
            </div>
            </>
  )
}
