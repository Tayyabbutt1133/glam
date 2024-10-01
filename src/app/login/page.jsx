"use client";

import { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import axios from "axios";

import { jost, lexendDeca } from "../../../components/ui/fonts";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const [hoveredTab, setHoveredTab] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/login", {
        email,
        password,
        rememberMe,
      });
      if (response.data.success) {
        setMessage("Successfully logged in!");
      } else {
        setMessage(
          "Login failed. Please check your credentials and try again."
        );
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className=" p-8 rounded-lg w-full max-w-md 2xl:max-w-[580px]">
        {/* Login/Sign-Up Tabs */}
        <div className="flex justify-between mb-6">
          {/* Login Tab */}
          <div
            className="flex-1 text-center"
            onMouseEnter={() => setHoveredTab("login")}
            onMouseLeave={() => setHoveredTab("")}
          >
            <Link href="/login">
              <span
                className={`block w-full ${jost.className} text-2xl font-semibold relative pb-2 ${
                  hoveredTab === "login" ? "text-black" : ""
                }`}
              >
                Login
                <div
                  className="absolute left-0 bottom-0 w-full h-[2px] bg-[#CF8562] transition-all duration-300"
                ></div>
              </span>
            </Link>
          </div>

          {/* Sign-Up Tab */}
          <div
            className="flex-1 text-center"
            onMouseEnter={() => setHoveredTab("signup")}
            onMouseLeave={() => setHoveredTab("")}
          >
            <Link href="/signup">
              <span
                className={`block w-full ${jost.className} text-2xl font-semibold relative pb-2 ${
                  hoveredTab === "signup" ? "text-black" : ""
                }`}
              >
                Sign up
                <div
                  className={`absolute left-0 bottom-0 w-full h-[2px] ${
                    hoveredTab === "signup" ? "bg-[#CF8562]" : "bg-[#D9D9D9]"
                  } transition-all duration-300`}
                ></div>
              </span>
            </Link>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or Phone Number*"
              className={`block w-full 2xl:w-[521px] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${lexendDeca.className}`}
              required
            />
          </div>
          <div className="relative">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password*"
              className={`block w-full 2xl:w-[521px] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${lexendDeca.className}`}
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black accent-black"
            />
            <label
              htmlFor="rememberMe"
              className={`ml-2 block text-sm 2xl:text-[16px]  text-gray-900 ${lexendDeca.className}`}
            >
              Remember Me
            </label>
          </div>

          {/* Forgot Password Link */}
          <div className="flex">
            <Link href="/forgot-password" className={`text-sm 2xl:text-[16px] text-[#8B929D] underline ${lexendDeca.className}`}>
              Forgot your Password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className={`w-full text-sm 2xl:text-[20px] 2xl:w-[521px] py-2 bg-black text-white font-medium rounded-lg shadow-sm hover:bg-[#CF8562] transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900 ${jost.className}`}
          >
            SIGN IN
          </button>
        </form>

        {/* Message */}
        {message && (
          <div className="mt-4 text-center text-sm text-red-600">{message}</div>
        )}

        {/* Separator */}
        <div className="relative text-center my-6">
          <span className={`text-sm 2xl:text-[16px] text-[#8B929D] ${lexendDeca.className}`}>or Continue with</span>
        </div>
        
        {/* Social Login Buttons */}
        <div className={`${inter.className} flex justify-between space-x-4`}>
          <button className="flex items-center border border-[#EFEFEF] justify-center w-full px-4 py-2  bg-white text-gray-800 font-semibold rounded-lg  focus:outline-none focus:ring-2 focus:ring-gray-300">
            <FcGoogle className="mr-2" />
            Google
          </button>
          <button className="flex items-center justify-center w-full px-4 py-2 bg-white text-black  font-semibold rounded-lg border border-[#EFEFEF] focus:outline-none focus:ring-2 focus:ring-gray-900">
            <FaApple className="mr-2" />
            Apple
          </button>
        </div>
      </div>
    </div>
  );
}