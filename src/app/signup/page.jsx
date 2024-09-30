"use client";

import { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { jost, lexendDeca } from "../../../components/ui/fonts";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToOffers, setAgreeToOffers] = useState(false);
  const [activeTab, setActiveTab] = useState("signup");

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

  const inputStyles = `
    mt-1 block w-full 2xl:w-[521px] px-4 py-2 
    border border-[#D9D9D9] rounded-md 
    focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent 
    ${lexendDeca.className}
    text-[#8B929D]
    text-base font-normal leading-5 tracking-[0.2px]
  `;

  return (
    <>
      <div className="flex justify-center  items-center min-h-screen bg-white">
        <div className="w-full max-w-md 2xl:max-w-[580px] p-8 bg-white rounded-lg">
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
            <div>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name*"
                className={inputStyles}
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
                className={inputStyles}
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
                className={inputStyles}
                required
              />
            </div>
            <div>
            <div className={`relative w-full 2xl:w-[521px] ${lexendDeca.className}`}>
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
      color: '#707070',
      fontFamily: '"Lexend Deca", sans-serif',
      fontWeight: 400,
      lineHeight: '20px',
      letterSpacing: '0.2px',
    }}
    buttonStyle={{
      border: 'none',
      backgroundColor: '#E9E9E9',
      borderTopLeftRadius: '4px',
      borderBottomLeftRadius: '4px',
      borderRight: '1px solid #e2e8f0',
    }}
    containerStyle={{
      width: '100%',
    }}
    inputClass={`w-full h-10 pl-13 pr-4 text-base rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-purple-500`}
    buttonClass="absolute left-0 top-0 bottom-0 flex px-2"
    dropdownStyle={{
      width: '300px',
    }}
    placeholder="Phone number"
    disableCountryCode={true}
    countryCodeEditable={false}
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
    .react-tel-input .country-list {
      width: 300px;
    }
    .react-tel-input .country-list .country {
      display: flex;
      align-items: center;
    }
    .react-tel-input .country-list .country .dial-code {
      display: none;
    }
    .react-tel-input input {
      font-family: "Lexend Deca", sans-serif !important;
      font-size: 16px !important;
      font-style: normal !important;
      font-weight: 400 !important;
      line-height: 20px !important;
      letter-spacing: 0.2px !important;
      color: #707070 !important;
      /* Removed text-align: center to make the text left-aligned */
    }
  `}</style>
</div>
            </div>
            <div className="flex items-start">
              <input
                type="checkbox"
                id="agreeToOffers"
                checked={agreeToOffers}
                onChange={(e) => setAgreeToOffers(e.target.checked)}
                className="h-[23.387px] w-[25px] text-black border-gray-300 rounded focus:ring-black accent-black mt-1"
              />
              <label
                htmlFor="agreeToOffers"
                className={`ml-2 block text-sm 2xl:text-[16px] text-gray-900 ${lexendDeca.className}`}
              >
                Tick here if you do not wish to receive exclusive offers and discounts via email.
              </label>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="h-[23.387px] w-[25px] text-black border-gray-300 rounded focus:ring-black accent-black mt-1"
                required
              />
              <label
                htmlFor="agreeToTerms"
                className={`ml-2 block text-sm 2xl:text-[16px] text-gray-900 ${lexendDeca.className}`}
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
              className={`w-full 2xl:text-[20px] 2xl:w-[521px] mt-6 py-2 bg-black text-white rounded-lg shadow-sm hover:bg-[#CF8562] transition duration-300 focus:outline-none font-medium focus:ring-2 focus:ring-gray-900 ${jost.className}`}
            >
              REGISTER
            </button>
          </form>
          
          {/* Separator */}
          <div className="relative mt-8 text-center">
            <span className={`mx-4 text-sm 2xl:text-[16px] text-gray-500 ${lexendDeca.className}`}>
              or Continue with
            </span>
          </div>

          {/* Social Login Buttons */}
          <div className="flex justify-between space-x-4 mt-6">
            <button className={`flex items-center border border-[#EFEFEF] justify-center w-full 2xl:w-[253px] px-4 py-2 bg-white text-gray-800 font-semibold rounded-lg shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 ${lexendDeca.className}`}>
              <FcGoogle className="mr-2" />
              Google
            </button>
            <button className={`flex items-center border border-[#EFEFEF] justify-center w-full 2xl:w-[253px] px-4 py-2 bg-white text-black font-semibold rounded-lg shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 ${lexendDeca.className}`}>
              <FaApple className="mr-2" />
              Apple
            </button>
          </div>
        </div>
      </div>
    </>
  );
}