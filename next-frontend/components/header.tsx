'use client'; // using client side rendering

import React, { useEffect, useState } from 'react';
import "../app/css/navigation.module.css"

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

import useScroll from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';
import axios from 'axios';


function Header() {
    const scrolled = useScroll(5);
    const selectedLayout = useSelectedLayoutSegment();

    const [username, setUsername] = useState('');

    async function getUserDetails() {

        const url = 'http://localhost:3001/home/findUserWithEmail';

        const value: any = {
            email: sessionStorage.getItem('email')?.toString()
        }
        const response = await axios.post(url, value);
        setUsername(response.data.user.name);
        
        if(response){
            sessionStorage.setItem("name", response.data.user.name);
            sessionStorage.setItem("userType", response.data.user.type);
            sessionStorage.setItem("casual", response.data.user.casual);
            sessionStorage.setItem("annual", response.data.user.annual);
            sessionStorage.setItem("medical", response.data.user.medical);
            sessionStorage.setItem("custom", response.data.user.custom);
        }
    }

    useEffect(() => {
        getUserDetails()
    })
    return (
        <div
            className={cn(
                `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200`,
                {
                    'border-b border-gray-200 bg-white/75 backdrop-blur-lg': scrolled,
                    'border-b border-gray-200 bg-white': selectedLayout,
                },
            )}
        >
            <div className="flex h-[47px] items-center justify-end px-4">
                <div className="flex items-center space-x-4">
                    <Link
                        href="/"
                        className="flex flex-row space-x-3 items-center justify-center md:hidden"
                    >
                        <span className="h-7 w-7 bg-zinc-300 rounded-lg" />
                        <span className="font-bold text-xl flex ">Logo</span>
                    </Link>
                </div>

                <div className="hidden md:block mr-2">
                    <div>
                        <span className="font-bold text-sm flex ">{username}</span>
                    </div>
                </div>
                <div className="hidden md:block">
                    <div className="h-8 w-8 rounded-full bg-zinc-300 flex items-center justify-center text-center">
                        <span className="font-semibold text-sm">HQ</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;