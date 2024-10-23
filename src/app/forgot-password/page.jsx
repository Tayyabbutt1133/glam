"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { lexendDeca, jost } from '../../../components/ui/fonts'

export default function ForgotPassword() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Make the forgot password request
      const response = await fetch('https://glam.clickable.site/wp-json/wc-users/v1/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      console.log('Forgot password response:', data)

      if (response.ok && data.status === 'success' && data.reset_key) {
        // Store both reset key and email in our secure cookie
        const cookieResponse = await fetch('/api/reset-cookie', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            reset_key: data.reset_key,
            login: email // Store the email as login
          }),
        })

        if (cookieResponse.ok) {
          // Redirect to reset password page
          router.push('/reset-password')
        } else {
          throw new Error('Failed to store reset information')
        }
      } else {
        // Enhanced error handling
        if (data.code === 'invalid_email') {
          setError('Please enter a valid email address.')
        } else if (data.code === 'email_not_found' || data.message?.toLowerCase().includes('not registered')) {
          setError('This email is not registered. Please check your email or create a new account.')
        } else if (data.code === 'user_not_found') {
          setError('No account found with this email address. Please check your email or create a new account.')
        } else {
          setError(data.message || 'An error occurred. Please try again.')
        }
      }
    } catch (err) {
      console.error('Error in password reset process:', err)
      setError('An error occurred. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className={`text-2xl ${jost.className} font-bold text-center text-gray-800 mb-2`}>Forgot Password</h2>
          <p className={`text-center text-gray-600 mb-6 ${lexendDeca.className}`}>
            Enter your email address to reset your password.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${lexendDeca.className}`}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-black text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 hover:bg-[#CF8562] ${lexendDeca.className} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Processing...' : 'Reset Password'}
            </button>
          </form>
          {error && (
            <div className="mt-4">
              <p className={`text-red-600 text-center ${lexendDeca.className}`}>{error}</p>
              {(error.includes('not registered') || error.includes('No account found')) && (
                <p className={`mt-2 text-sm text-gray-600 text-center ${lexendDeca.className}`}>
                  Want to create an account?{' '}
                  <Link href="/signup" className="text-black hover:underline">
                    Sign up here
                  </Link>
                </p>
              )}
            </div>
          )}
        </div>
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <Link href="/login" className={`text-sm text-black hover:underline flex justify-center ${lexendDeca.className}`}>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}