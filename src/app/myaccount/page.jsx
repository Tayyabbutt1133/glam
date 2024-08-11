"use client";

import React, { useState } from 'react';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <>
      <div className="flex p-12">
        {/* Sidebar */}
        <div className="w-1/4 p-4 border-r">
          <nav className="space-y-4">
            <button 
              onClick={() => setActiveSection('overview')} 
              className={`flex items-center space-x-2 ${activeSection === 'overview' ? 'text-blue-600 font-bold' : ''}`}
            >
              <span>🏠</span>
              <span>Overview</span>
            </button>
            <button 
              onClick={() => setActiveSection('orders')} 
              className={`flex items-center space-x-2 ${activeSection === 'orders' ? 'text-blue-600 font-bold' : ''}`}
            >
              <span>📦</span>
              <span>Your Orders</span>
            </button>
            <button 
              onClick={() => setActiveSection('address')} 
              className={`flex items-center space-x-2 ${activeSection === 'address' ? 'text-blue-600 font-bold' : ''}`}
            >
              <span>📍</span>
              <span>Saved Address</span>
            </button>
            <button 
              onClick={() => setActiveSection('payment')} 
              className={`flex items-center space-x-2 ${activeSection === 'payment' ? 'text-blue-600 font-bold' : ''}`}
            >
              <span>💳</span>
              <span>Payment Methods</span>
            </button>
            <button 
              onClick={() => setActiveSection('logout')} 
              className="flex items-center space-x-2"
            >
              <span>🔒</span>
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-8">
          {activeSection === 'overview' && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Hello</h1>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="firstName">
                      First Name*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full p-2 border rounded"
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="lastName">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full p-2 border rounded"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="email">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 border rounded"
                    placeholder="Email"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="password">
                      Password*
                    </label>
                    <div className="flex items-center">
                      <input
                        type="password"
                        id="password"
                        className="w-full p-2 border rounded"
                        placeholder="Password"
                      />
                      <button type="button" className="ml-2 text-blue-600">
                        ✏️
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="phone">
                      Phone*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full p-2 border rounded bg-gray-200"
                      placeholder="Phone"
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="dob">
                    Date of Birth
                  </label>
                  <input
                    type="text"
                    id="dob"
                    className="w-full p-2 border rounded"
                    placeholder="Date of Birth"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 px-4 py-2 bg-black text-white rounded"
                >
                  SAVE CHANGES
                </button>
              </form>
            </div>
          )}
          {activeSection === 'orders' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
              <p>Order history and tracking info...</p>
            </div>
          )}
          {activeSection === 'address' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Saved Address</h2>
              <p>Your saved addresses...</p>
            </div>
          )}
          {activeSection === 'payment' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Payment Methods</h2>
              <p>Your payment methods...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
