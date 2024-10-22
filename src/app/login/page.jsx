"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import axios from "axios";

import { jost, lexendDeca } from "../../../components/ui/fonts";
import { Inter } from "next/font/google";
import { toast } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("login");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://glam.clickable.site/wp-json/wc-users/v1/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data) {
        if (response.data.success) {
          setMessage("Successfully logged in!");
          toast.success("Successfully logged in!");
          const token = response.data.token;

          await fetch("/api/setCookie", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          });

          router.push("/");
        } else {
          setMessage(
            "Login failed. Please check your credentials and try again."
          );
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        setMessage(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        setMessage("Network error. Please check your connection.");
      } else {
        setMessage("Error: " + error.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get(
        "https://glam.clickable.site/wp-json/wc-users/v1/google-sso-init"
      );
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error initiating Google login:", error);
    }
  };

  const handleAppleLogin = async () => {
    try {
      const response = await axios.get(
        "https://glam.clickable.site/wp-json/wc-users/v1/apple-sso-initiate"
      );
      window.location.href = response.data.redirect_url;
    } catch (error) {
      console.error("Error initiating Apple login:", error);
      setMessage("Failed to initiate Apple login. Please try again.");
    }
  };

  const inputStyles = `
    block w-full 2xl:w-[521px] px-4 py-2
    border border-[#D9D9D9] rounded-md
    focus:outline-none focus:ring-2
    focus:ring-black focus:border-transparent
    ${lexendDeca.className}
  `;

  return (
    <div className="flex justify-center items-center">
      <div className="p-8 rounded-lg w-full max-w-md 2xl:max-w-[580px]">
        <div className="flex justify-between mb-6">
          <div className="flex-1 text-center">
            <Link href="/login">
              <span
                className={`block w-full ${jost.className} text-2xl font-semibold relative pb-2 ${
                  activeTab === "login" ? "text-black" : "text-[#8B929D]"
                }`}
                onClick={() => setActiveTab("login")}
              >
                Login
                <div
                  className={`absolute left-0 bottom-0 w-full h-[2px] ${
                    activeTab === "login" ? "bg-[#CF8562]" : "bg-[#D9D9D9]"
                  } transition-all duration-300`}
                ></div>
              </span>
            </Link>
          </div>

          <div className="flex-1 text-center">
            <Link href="/signup">
              <span
                className={`block w-full ${jost.className} text-2xl font-semibold relative pb-2 ${
                  activeTab === "signup" ? "text-black" : "text-[#8B929D]"
                }`}
                onClick={() => setActiveTab("signup")}
              >
                Sign up
                <div
                  className={`absolute left-0 bottom-0 w-full h-[2px] ${
                    activeTab === "signup" ? "bg-[#CF8562]" : "bg-[#D9D9D9]"
                  } transition-all duration-300`}
                ></div>
              </span>
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or Phone Number*"
              className={inputStyles}
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
              className={inputStyles}
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
              className={`ml-2 block text-sm 2xl:text-[16px] text-gray-900 ${lexendDeca.className}`}
            >
              Remember Me
            </label>
          </div>

          <div className="flex">
            <Link
              href="/forgot-password"
              className={`text-sm 2xl:text-[16px] text-[#8B929D] underline ${lexendDeca.className}`}
            >
              Forgot your Password?
            </Link>
          </div>

          <button
            type="submit"
            className={`w-full text-sm 2xl:text-[20px] 2xl:w-[521px] py-2 2xl:py-3 bg-black text-white font-medium rounded-lg shadow-sm hover:bg-[#CF8562] transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900 ${jost.className}`}
          >
            SIGN IN
          </button>
        </form>

        {message && (
          <div className="mt-4 text-center text-sm text-red-600">{message}</div>
        )}

        <div className="relative text-center my-6">
          <span
            className={`text-sm 2xl:text-[16px] text-[#8B929D] ${lexendDeca.className}`}
          >
            or Continue with
          </span>
        </div>

        <div className={`${inter.className} flex justify-between space-x-4`}>
          <button
            onClick={handleGoogleLogin}
            className="flex items-center border border-[#EFEFEF] justify-center w-full px-4 py-2 bg-white text-gray-800 font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <FcGoogle className="mr-2" />
            Google
          </button>
          <button
            onClick={handleAppleLogin}
            className="flex items-center justify-center w-full px-4 py-2 bg-white text-black font-semibold rounded-lg border border-[#EFEFEF] focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <FaApple className="mr-2" />
            Apple
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}