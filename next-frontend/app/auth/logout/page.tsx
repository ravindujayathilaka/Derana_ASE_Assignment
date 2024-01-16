"use client";

import { logout } from '@/app/utils/auth'
import React, { useEffect } from 'react'

function LogoutPage() {

    useEffect(() => {
        logout();
    }, [])
    return (
        <div>
            Logout Page
        </div>
    )
}

export default LogoutPage
