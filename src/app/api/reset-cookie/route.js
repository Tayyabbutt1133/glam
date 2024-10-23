// app/api/reset-cookie/route.js
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { reset_key, login } = await request.json()
    
    if (!reset_key || !login) {
      return NextResponse.json(
        { error: 'Reset key and login email are required' },
        { status: 400 }
      )
    }

    // Set HTTP-only cookies for both reset key and login
    cookies().set('reset_key', reset_key, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60, // 15 minutes in seconds
      path: '/'
    })

    cookies().set('reset_login', login, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60, // 15 minutes in seconds
      path: '/'
    })

    return NextResponse.json({ status: 'success' })
  } catch (error) {
    console.error('Error setting reset cookies:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const resetKey = cookies().get('reset_key')
    const resetLogin = cookies().get('reset_login')
    
    if (!resetKey || !resetLogin) {
      return NextResponse.json(
        { error: 'Reset information not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      reset_key: resetKey.value,
      login: resetLogin.value
    })
  } catch (error) {
    console.error('Error getting reset cookies:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  try {
    cookies().delete('reset_key')
    cookies().delete('reset_login')
    return NextResponse.json({ status: 'success' })
  } catch (error) {
    console.error('Error deleting reset cookies:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}