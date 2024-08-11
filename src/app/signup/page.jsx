'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc'; // Google icon
import { FaApple } from 'react-icons/fa'; // Apple icon

export default function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1'); // Default to +1 (USA)
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreeToTerms) {
      alert('You must agree to the Terms and Conditions and Privacy Policy.');
      return;
    }

    try {
      const response = await axios.post('/api/signup', {
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
      <div className="w-full max-w-md p-8 bg-white rounded-lg">
        <div className="flex justify-between mb-6">
        <div className="flex-1 text-center">
            <Link href="/login">
              <span className="text-2xl font-bold cursor-pointer relative">
                Login
                <div className="absolute left-0 w-full h-1 bg-gray-700 hover:bg-darkorange transition-all duration-300"></div>
              </span>
            </Link>
          </div>
          <div className="flex-1 text-center">
            <Link href="/signup">
              <span className="text-2xl font-bold cursor-pointer relative">
                Sign Up
                <div className="absolute left-0 w-full h-1 bg-gray-700 hover:bg-darkorange transition-all duration-300"></div>
              </span>
            </Link>
          </div>
         
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
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
                className="block w-full px-4 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
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
            <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-900">
              By ticking, you are confirming that you agree to our <a href="/terms" className="text-purple-600">Terms and Conditions</a> and <a href="/privacy" className="text-purple-600">Privacy Policy</a> *
            </label>
          </div>
          <Link href="/">
          <button
            type="submit"
            className="w-full py-2 bg-purple-600 text-white font-semibold rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Sign Up
            </button>
            </Link>
        </form>
        <div className="mt-6 text-center text-gray-600">or Register with</div>
        <div className="flex justify-between mt-4 space-x-4">
          <button
            className="flex items-center justify-center w-full px-4 py-2 bg-gray-100 text-gray-800 font-semibold rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <FcGoogle className="mr-2" />
            Google
          </button>
          <button
            className="flex items-center justify-center w-full px-4 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <FaApple className="mr-2" />
            Apple
          </button>
        </div>
      </div>
    </div>
  );
}
