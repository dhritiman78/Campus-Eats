"use client";
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";



const page = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setLoggedIn(true)
        } else {
            router.push('/')
        }
    }
)
  return (
    <div>
        {loggedIn  && "You are logged in"}
    </div>
  )
}

export default page