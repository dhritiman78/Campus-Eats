"use client";
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        const logout = async () => {
            if (token) {
                try {
                    const res = await fetch('/api/users/auth/logout', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                    });

                    const data = await res.json();

                    if (data.success) {
                        console.log('Logged out successfully');
                        localStorage.removeItem('token');
                        router.push('/');
                    } else {
                        console.error('Error logging out:', data.message);
                    }
                } catch (error) {
                    console.error('Error logging out:', error);
                }
            } else {
                router.push('/');
            }
        };

        logout();
    }, [router]);

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
}

export default Page;
