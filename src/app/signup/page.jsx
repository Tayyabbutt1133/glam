"use client";

import { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { FaApple } from "react-icons/fa"; // Apple icon
import { lexendDeca } from "../../../components/ui/fonts";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Importing default styles for react-phone-input-2

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(""); // Phone now stores both phone number and country code
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToOffers, setagreeToOffers] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(""); // State to track the hovered tab

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreeToTerms) {
      toast.error("You must agree to the Terms and Conditions and Privacy Policy.");
      return;
    }

    try {
      const response = await axios.post("/api/signup", {
        fullName,
        email,
        password,
        phone,
      });
      console.log(response.data);
      // Handle successful sign-up (e.g., redirect to a different page)
    } catch (error) {
      console.error(error);
      // Handle errors (e.g., show an error message to the user)
    }
  };
  const backgroundColor = '#f9f9f9' // Light grey background
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="w-full max-w-md p-8 bg-white rounded-lg pt-16">
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
                      hoveredTab === "login" ? "bg-[#CF8562]" : "bg-transparent"
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
                      hoveredTab === "signup" ? "bg-[#CF8562]" : "bg-[#D9D9D9]"
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
                className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${lexendDeca.className}`}
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
                className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${lexendDeca.className}`}
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
                className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${lexendDeca.className}`}
                required
              />
            </div>
            <div>
            <div className="relative w-full">
      <PhoneInput
        country={'gb'}
        value={phone}
        onChange={(phone) => setPhone(phone)}
        inputStyle={{
          width: '100%',
          height: '44px',
          fontSize: '16px',
          paddingLeft: '52px',
          borderRadius: '6px',
          border: '1px solid #e2e8f0',
          backgroundColor: 'white',
        }}
        buttonStyle={{
          border: 'none',
          backgroundColor: '#f3f4f6',
          borderTopLeftRadius: '4px',
          borderBottomLeftRadius: '4px',
          borderRight: '1px solid #e2e8f0',
        }}
        containerStyle={{
          width: '100%',
        }}
        inputClass="w-full h-10 pl-13 pr-4 text-base rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        buttonClass="absolute left-0 top-0 bottom-0 flex items-center justify-center px-2"
        dropdownStyle={{
          width: '300px',
        }}
        placeholder="Phone number"
      />
      <style jsx global>{`
        .react-tel-input .flag-dropdown.open,
        .react-tel-input .selected-flag:hover,
        .react-tel-input .selected-flag:focus,
        .react-tel-input .selected-flag.open {
          background-color: #f3f4f6 !important;
        }
        .react-tel-input .selected-flag {
          width: 44px;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }
        .react-tel-input .selected-flag .arrow {
          left: 28px;
        }
      `}</style>
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
                className={`ml-2 block text-sm text-gray-900 ${lexendDeca.className}`}
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
                className={`ml-2 block text-sm text-gray-900 ${lexendDeca.className}`}
              >
                By ticking, you are confirming that you agree to our{" "}
                <a href="/terms" className="text-[#8B929D] underline">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-[#8B929D] underline">
                  Privacy Policy
                </a>{" "}
                *
              </label>
            </div>
            <button
              type="submit"
              className={`w-full mt-6 py-2 bg-black text-white font-semibold rounded-lg shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 ${lexendDeca.className}`}
            >
              REGISTER
            </button>
          </form>
          
          {/* Separator */}
          <div className="relative mt-8 text-center">
            <span className={`mx-4 text-sm text-gray-500 ${lexendDeca.className}`}>
              or Continue with
            </span>
          </div>

          {/* Social Login Buttons */}
          <div className="flex justify-between space-x-4 mt-6">
            <button className="flex items-center border border-[#EFEFEF] justify-center w-full px-4 py-2 bg-white text-gray-800 font-semibold rounded-lg shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300">
              <FcGoogle className="mr-2" />
              Google
            </button>
            <button className="flex items-center border border-[#EFEFEF] justify-center w-full px-4 py-2 bg-white text-black font-semibold rounded-lg shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900">
              <FaApple className="mr-2" />
              Apple
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
