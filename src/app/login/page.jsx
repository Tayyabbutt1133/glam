'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc'; // Google icon
import { FaApple } from 'react-icons/fa'; // Apple icon
import axios from 'axios'; // Ensure axios is installed and imported

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState(''); // State to hold the success or error message

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', {
        email,
        password,
        rememberMe
      });
      if (response.data.success) {
        setMessage('Successfully logged in!');
      } else {
        setMessage('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred. Please try again later.');
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
                <div className="absolute left-0 w-full h-1 bg-gray-300 hover:bg-black"></div>
              </span>
            </Link>
          </div>
          <div className="flex-1 text-center">
            <Link href="/signup">
              <span className="text-2xl font-bold cursor-pointer relative">
                Sign Up
                <div className="absolute left-0 w-full h-1 bg-gray-300 hover:bg-black"></div>
              </span>
            </Link>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
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
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">Remember me</label>
          </div>

          <Link href="/">
          <button
            type="submit"
            className="w-full py-2 bg-black text-white font-semibold rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            Sign In
          </button>
          </Link>

        </form>
        {message && <div className="mt-4 text-center text-sm text-red-600">{message}</div>}
        <div className="mt-6 text-center text-gray-600">or Sign in with</div>
        <div className="flex justify-between mt-4 space-x-4">
          <button
            className="flex items-center justify-center w-full px-4 py-2 bg-gray-100 text-gray-800 font-semibold rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <FcGoogle className="mr-2" />
            Google
          </button>
          <button
            className="flex items-center justify-center w-full px-4 py-2 bg-black text-white font-semibold rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <FaApple className="mr-2" />
            Apple
          </button>
        </div>
      </div>
    </div>
  );
}
