"use client";

import React, { useState, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { format } from "date-fns"; // for formatting date
import { lexendDeca, jost } from "../../ui/fonts";
import Link from "next/link";

const Overview = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState(null); // Initially null to handle the date object
  const [submittedName, setSubmittedName] = useState("");

  const formRef = useRef(null); // Ref to access the form element

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedName(firstName); // This will update the submitted name to be displayed

    console.log({
      firstName,
      lastName,
      email,
      password,
      phone,
      dob: dob ? format(dob, "dd/MM/yyyy") : "", // Formatting the date before logging
    });
  };

  const handleButtonClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit(); // Trigger form submission programmatically
    }
  };

  return (
    <div>
      <h1 className={`${lexendDeca.className} text-lg md:text-3xl md:-mt-4 mb-3 md:mb-16`}>
        Hello {submittedName || ""}
      </h1>
      <form
        className="space-y-4"
        onSubmit={handleSubmit}
        ref={formRef} // Attach the ref to the form
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              id="firstName"
              className={`w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${lexendDeca.className}`}
              placeholder="First Name*"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              id="lastName"
              className={`w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${lexendDeca.className}`}
              placeholder="Last Name*"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <input
              type="email"
              id="email"
              className={`w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${lexendDeca.className}`}
              placeholder="Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <div className="relative flex items-center">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                className={`w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${lexendDeca.className}`}
                placeholder="Password*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3"
              >
                {passwordVisible ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 ">
          <div className="relative">
            <PhoneInput
              country={"gb"}
              value={phone}
              onChange={(phone) => setPhone(phone)}
              inputClass="w-full p-3 border border-gray-300 rounded-md shadow-sm"
              buttonClass="p-3"
              className={`${lexendDeca.className}`}
              placeholder="Phone*"
              containerClass="relative"
              inputStyle={{
                width: '91%',
                padding: '0.75rem', // Match padding of other inputs
                fontSize: '0.875rem', // Match font size
                height: '3rem', // Match height
                marginLeft: "35px"
              }}
              buttonStyle={{
                backgroundColor: '#f9fafb',
                borderTopLeftRadius: '0.375rem',
                borderBottomLeftRadius: '0.375rem',
                borderColor: '#d1d5db' // Match border color
              }}
            />
          </div>
          <div>
            <DatePicker
              selected={dob}
              onChange={(date) => setDob(date)}
              dateFormat="dd/MM/yyyy" // Ensures the date is displayed in the desired format
              placeholderText="Date of Birth*"
              className={`w-[400px] p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${lexendDeca.className}`}
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
            />
          </div>
        </div>
      </form>
      <button
        type="button"
        onClick={handleButtonClick}
        className={`md:mt-32 mt-5 px-6 py-3 bg-black text-white rounded-md shadow-sm w-full md:w-[30%] ${jost.className}`}
      >
        SAVE CHANGES
      </button>
    </div>
  );
};

export default Overview;
