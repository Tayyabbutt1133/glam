"use client";

import { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { FaApple } from "react-icons/fa"; // Apple icon
import axios from "axios"; // Ensure axios is installed and imported

import { lexendDeca } from "../../../components/ui/fonts";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState(""); // State to hold the success or error message
  const [hoveredTab, setHoveredTab] = useState(""); // State to track the hovered tab

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
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 rounded-lg">
        {/* Social Login Buttons */}
        <div className={` ${inter.className} flex justify-between space-x-4`}>
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
          <span className={`mx-4 text-sm text-gray-500 ${lexendDeca.className}`}>or Continue with</span>
        </div>

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
                className={`block w-full text-2xl font-bold relative pb-2 ${
                  hoveredTab === "login" ? "text-black" : ""
                }`}
              >
                Login
                <div
                  className={`absolute left-0 bottom-0 w-full h-[2px]  ${
                    hoveredTab === "login" ? "bg-[#CF8562]" : " bg-[#D9D9D9]"
                  } transition-all duration-300`}
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
                className={`block w-full text-2xl font-bold relative pb-2 ${
                  hoveredTab === "signup" ? "text-black" : ""
                }`}
              >
                Sign up
                <div
                  className={`absolute left-0 bottom-0 w-full h-[2px] ${
                    hoveredTab === "signup" ? "bg-[#CF8562]" : "bg-transparent"
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
              className={`block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${lexendDeca.className}`}
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
              className={`block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${lexendDeca.className}`}
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label
              htmlFor="rememberMe"
              className={`ml-2 block text-sm text-gray-900  ${lexendDeca.className}`}
            >
              Remember Me
            </label>
          </div>

          {/* Forgot Password Link */}
          <div className="flex">
            <Link href="/forgot-password" className={`text-sm text-gray-600 underline ${lexendDeca.className}`}>
              Forgot your Password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className={`w-full py-2 bg-black text-white font-semibold rounded-lg shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 ${lexendDeca.className}`}
          >
            SIGN IN
          </button>
        </form>

        {/* Message */}
        {message && (
          <div className="mt-4 text-center text-sm text-red-600">{message}</div>
        )}
      </div>
    </div>
  );
}
