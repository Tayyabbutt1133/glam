"use client";
import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use 'next/router' for versions below Next.js 13

export default function Logout() {
    const router = useRouter();

    const handleLogout = async () => {
        const response = await fetch('/api/deletecookie', {
            method: 'POST',
        });

        if (response.ok) {
            router.push('/'); // Redirect to home page after logout
        } else {
            console.error('Logout failed');
        }
    };

    useEffect(() => {
        handleLogout();
    }, []); // Call the logout on component mount

    return (
        <div>
            <h1>Logging out....</h1>
        </div>
    );
}
