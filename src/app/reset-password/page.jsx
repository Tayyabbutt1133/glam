"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { lexendDeca, jost } from '../../../components/ui/fonts'

export default function ResetPassword() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [resetInfo, setResetInfo] = useState(null)

  useEffect(() => {
    // Check if reset info exists in cookies when component mounts
    const checkResetInfo = async () => {
      try {
        const response = await fetch('/api/reset-cookie')
        const data = await response.json()
        
        if (!data.reset_key || !data.login) {
          // If no reset info is found, redirect back to forgot password
          router.push('/forgot-password')
        } else {
          setResetInfo(data)
        }
      } catch (error) {
        console.error('Error checking reset info:', error)
        router.push('/forgot-password')
      }
    }

    checkResetInfo()
  }, [router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }
    
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('https://glam.clickable.site/wp-json/wc-users/v1/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': document.cookie
        },
        credentials: 'include',
        body: JSON.stringify({
          reset_key: resetInfo?.reset_key,
          login: resetInfo?.login,
          password: password
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.status === 'success') {
        // Clear the reset cookies
        await fetch('/api/reset-cookie', { 
          method: 'DELETE',
          credentials: 'include'
        })
        
        // Show brief success message
        setError('') // Clear any existing errors
        
        // Redirect to login page
        router.push('/login')
      } else {
        setError(data.message || 'Failed to reset password. Please try again.')
      }
    } catch (err) {
      console.error('Error resetting password:', err)
      setError('An error occurred while resetting your password. Please try again or contact support.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className={`text-2xl ${jost.className} font-bold text-center text-gray-800 mb-2`}>Reset Password</h2>
          <p className={`text-center text-gray-600 mb-6 ${lexendDeca.className}`}>
            Enter your new password below.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="password"
                placeholder="New Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${lexendDeca.className}`}
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Confirm New Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${lexendDeca.className}`}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-black text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 hover:bg-[#CF8562] ${lexendDeca.className} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Resetting...' : 'Set New Password'}
            </button>
          </form>
          {error && (
            <p className={`mt-4 text-red-600 text-center ${lexendDeca.className}`}>{error}</p>
          )}
        </div>
      </div>
    </div>
  )
}