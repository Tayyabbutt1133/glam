"use client";

import React, { useState } from "react";
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

  return (
    <div>
      <h1 className={`${lexendDeca.className} text-3xl -mt-4 mb-16`}>
        Hello {submittedName || ""}
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              id="firstName"
              className={`w-full p-3 border rounded ${lexendDeca.className}`}
              placeholder="First Name*"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              id="lastName"
              className={`w-full p-3 border rounded ${lexendDeca.className}`}
              placeholder="Last Name*"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="email"
              id="email"
              className={`w-full p-3 border rounded ${lexendDeca.className}`}
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
                className={`w-full p-3 border rounded ${lexendDeca.className}`}
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
        <div className="grid grid-cols-2 gap-4">
          <div className="border-red-900">
            <PhoneInput
              country={"gb"}
              value={phone}
              onChange={(phone) => setPhone(phone)}
              inputClass="w-[100%] p-3 border rounded"
              buttonClass="p-3"
              className={`${lexendDeca.className}`}
              placeholder="Phone*"
            />
          </div>
          <div>
            <DatePicker
              selected={dob}
              onChange={(date) => setDob(date)}
              dateFormat="dd/MM/yyyy" // Ensures the date is displayed in the desired format
              placeholderText="Date of Birth*"
              className={`w-[375px] p-3 border rounded  ${lexendDeca.className}`}
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
            />
          </div>
        </div>
        <button
          type="submit"
          className={`mt-24 px-6 py-3 bg-black text-white rounded w-[30%] ${jost.className}`}
        >
          SAVE CHANGES
        </button>
      </form>
    </div>
  );
};

export default Overview;
