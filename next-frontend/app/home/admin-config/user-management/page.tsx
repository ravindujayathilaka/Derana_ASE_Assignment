"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Card,
    CardContent
} from "@/components/ui/card"

import { Input } from "@/components/ui/input";
import { ChevronRight, X } from 'lucide-react';
import styles from "./user-management.module.css";
import { UserInfo, columns } from "./table/columns"
import { DataTable } from './table/data-table';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
    name: z.string(),
    email: z.string().min(2).max(50),
    password: z.string(),
    department: z.string(),
    type: z.string()
})

function UserManagementPage() {

    const [userData, setUserData] = useState([]);

    
    async function getAllUsers() {
        const url = 'http://localhost:3001/home/findAllUsers'

        const response = await axios.get(url);
        setUserData(response.data.users);
    }
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            department: "",
            type: "",
        },
    })
    
    function onSubmit(values: z.infer<typeof formSchema>) {
        
        const url = 'http://localhost:3001/api/register';

        const user = axios.post(url, values)
        .then(() => {
            window.location.reload();
            console.log("User Details",user);
        })
    }
    
    useEffect(() => {
        getAllUsers();
    }, []);

        return (
            <div>
                <Dialog>
                    <DialogTrigger asChild>
                        <div className={styles.cardbtn}>
                            <Button variant="outline">
                                Create User <ChevronRight />
                            </Button>
                        </div>
                        {/* <Button variant="outline">Edit Profile</Button> */}
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create Profile</DialogTitle>
                        </DialogHeader>
                            <main className={styles.maincls}>
                                <div className={styles.container}>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Name</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="shadcn" {...field} />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Email</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="shadcn" {...field} />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="password"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Password</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="shadcn" {...field} />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="department"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Department</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="shadcn" {...field} />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="type"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>User Type</FormLabel>
                                                            <FormControl>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <SelectTrigger className="w-[180px]">
                                                                        <SelectValue placeholder="Select User Type" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="user">User</SelectItem>
                                                                        <SelectItem value="supervisor">Supervisor</SelectItem>
                                                                        <SelectItem value="admin">Admin</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <Button type="submit">Submit</Button>
                                        </form>
                                    </Form>
                                </div>
                            </main>
                    </DialogContent>
                </Dialog>
                <div>
                    <main className={styles.maincls}>
                        <div className={styles.cardtable}>
                            <div style={{ padding: '30px'}}>
                                <div className='mx-5'>
                                    <Label className='text-3xl font-bold'>User List</Label>
                                </div>
                                <Separator className="my-4" />
                                <div style={{ margin: '10px' }}>
                                    <Card className='border-none'>
                                        <CardContent>
                                            <div className="container mx-auto py-10">
                                                <DataTable columns={columns} data={userData} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        )
    }

    export default UserManagementPage
