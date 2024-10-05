"use client";
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";

const Page = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (token) {
            setLoggedIn(true);
            
            // Fetch user details
            fetch('/api/users/auth/details', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setUserDetails(data.user);
                } else {
                    // Handle token expiry or invalid token
                    localStorage.removeItem('token');
                    router.push('/');
                }
            })
            .catch(error => {
                console.error("Error fetching user details:", error);
                router.push('/');
            });
        } else {
            router.push('/');
        }
    }, [router]);

    return (
        <div>
            {loggedIn ? (
                <div>
                    <h1>You are logged in</h1>
                    {userDetails ? (
                        <div>
                            <p>Name: {userDetails.name}</p>
                            <p>Email: {userDetails.email}</p>
                            {/* Add more user details here */}
                            <a href="/logout">Logout</a>
                        </div>
                    ) : (
                        <p>Loading user details...</p>
                    )}
                </div>
            ) : (
                <p>Redirecting...</p>
            )}
        </div>
    )
}

export default Page;
