"use client";

import React, { useState } from 'react';
import axios from 'axios';

import styles from "../../css/login.module.css";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { login } from '../../utils/auth'
import { useRouter } from 'next/navigation';


export default function LoginPage()  {
    
    const router = useRouter();

    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function onEmailChange(value: string) {
        setEmail(value);
    };

    function onPasswordChange(value: string) {
        setPassword(value);
    };

    async function getUserDetails() {

        const url = 'http://localhost:3001/home/findUserWithEmail';

        const value: any = {
            email: sessionStorage.getItem('email')?.toString()
        }
        const response = await axios.post(url, value);
        
        if(response){
            sessionStorage.setItem("name", response.data.user.name);
            sessionStorage.setItem("recipient", response.data.user.email);
            sessionStorage.setItem("userType", response.data.user.type);
            sessionStorage.setItem("casual", response.data.user.casual);
            sessionStorage.setItem("annual", response.data.user.annual);
            sessionStorage.setItem("medical", response.data.user.medical);
            sessionStorage.setItem("custom", response.data.user.custom);
        }
    }

    function redirect() {
        router.push('/home/dashboard');
    }
    async function onLoginClick () {
        try {
            const url = `http://localhost:3001/api/login`;
            const response = await axios.post(url, {
                email,
                password,
            });

            sessionStorage.setItem("email", email);
            if(response){
                getUserDetails();
            }
                const { token } = response.data;
                await login({ token });
                    setToken(token)
                await redirect();

        } catch (error) {
            console.error(
                'You have an error in your code or there are Network issues.',
                error,
            );
            console.log(error);
            setError('error');
        }
    };

        return (
            <div>
                <main>
                    <div className={styles.left}></div>
                    <div className={styles.loginWidth}>
                        <Card className={styles.cardWidth}>
                        <CardHeader>
                            <CardTitle className="text-3xl text-center">
                            Login to your Dashboard account
                            </CardTitle>
                            <CardDescription className="text-center">
                            Enter your email below to create the account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Email</Label>
                                <Input 
                                    id="name" 
                                    name="email"
                                    placeholder="Enter your email address" 
                                    onChange={(e) => onEmailChange(e.target.value)}/>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Password</Label>
                                <Input
                                    id="name"
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    onChange={(e) => onPasswordChange(e.target.value)}
                                />
                                </div>
                            </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button className={styles.btnWidth} type='submit' onClick={() => onLoginClick()}>Sign In</Button>
                            <p>{error && `Error: ${error}`}</p>
                        </CardFooter>
                        </Card>
                    </div>
                </main>
            </div>
        );
}