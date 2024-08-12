"use client";

import { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { FaApple } from "react-icons/fa"; // Apple icon

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+1"); // Default to +1 (USA)
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToOffers, setagreeToOffers] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(""); // State to track the hovered tab

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreeToTerms) {
      alert("You must agree to the Terms and Conditions and Privacy Policy.");
      return;
    }

    try {
      const response = await axios.post("/api/signup", {
        fullName,
        email,
        password,
        phone,
        countryCode,
      });
      console.log(response.data);
      // Handle successful sign-up (e.g., redirect to a different page)
    } catch (error) {
      console.error(error);
      // Handle errors (e.g., show an error message to the user)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 bg-white rounded-lg  pt-16 pb-20">

       {/* Social Login Buttons */}
       <div className="flex justify-between space-x-4">
          <button className="flex items-center justify-center w-full px-4 py-2 bg-white text-gray-800 font-semibold rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300">
            <FcGoogle className="mr-2" />
            Google
          </button>
          <button className="flex items-center justify-center w-full px-4 py-2 bg-white text-black font-semibold rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900">
            <FaApple className="mr-2" />
            Apple
          </button>
        </div>
        

       
        {/* Separator */}
        <div className="relative  text-center my-6">
          <span className="mx-4 text-sm text-gray-500 font-sans">or Continue with</span>
        </div>



        <div className="flex justify-between mb-6">
          <div
            className="flex-1 text-center"
            onMouseEnter={() => setHoveredTab("login")}
            onMouseLeave={() => setHoveredTab("")}
          >
            <Link href="/login">
              <span
                className={`block w-full text-2xl font-bold relative pb-2 ${
                  hoveredTab === "login" ? "text-black" : ""
                }`}
              >
                Login
                <div
                  className={`absolute left-0 bottom-0 w-full h-[2px] ${
                    hoveredTab === "login" ? "bg-black" : "bg-transparent"
                  } transition-all duration-300`}
                ></div>
              </span>
            </Link>
          </div>
          <div
            className="flex-1 text-center"
            onMouseEnter={() => setHoveredTab("signup")}
            onMouseLeave={() => setHoveredTab("")}
          >
            <Link href="/signup">
              <span
                className={`block w-full text-2xl font-bold relative pb-2 ${
                  hoveredTab === "signup" ? "text-black" : ""
                }`}
              >
                Sign up
                <div
                  className={`absolute left-0 bottom-0 w-full h-[2px] ${
                    hoveredTab === "signup" ? "bg-black" : "bg-[#D9D9D9]"
                  } transition-all duration-300`}
                ></div>
              </span>
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name*"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address*"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password*"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <div className="flex mt-1">
              <select
                id="countryCode"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="block w-20 px-4 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+91">+91</option>
                <option value="+92">+92</option>
                {/* Add more options as needed */}
              </select>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number*"
                className="block w-full px-4 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agreeToOffers"
              checked={agreeToOffers}
              onChange={(e) => setagreeToOffers(e.target.checked)}
              className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              required
            />

            <label
              htmlFor="agreeToTerms"
              className="ml-2 block text-sm text-gray-900"
            >
            Tick here if you do not wish to receive exclusive offers and discounts via email.
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="agreeToTerms"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              required
            />

            <label
              htmlFor="agreeToTerms"
              className="ml-2 block text-sm text-gray-900"
            >
              By ticking, you are confirming that you agree to our{" "}
              <a href="/terms" className="text-purple-600">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-purple-600">
                Privacy Policy
              </a>{" "}
              *
            </label>
          </div>
          <button
            type="submit"
            className="w-full mt-6 py-2 bg-black text-white font-semibold rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            REGISTER
          </button>
        </form>
       
        
      </div>
    </div>
  );
}
