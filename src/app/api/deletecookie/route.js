// pages/api/logout.js
import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ message: 'Logged out successfully' });

    // Clear the cookie
    response.cookies.set('authToken', '', {
        httpOnly: true,
        maxAge: 0, // Expire the cookie
        path: '/',
    });

    return response;
}
