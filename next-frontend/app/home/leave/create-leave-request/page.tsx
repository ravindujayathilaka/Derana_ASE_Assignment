"use client"

import React, { useEffect, useState } from 'react'
import styles from './leaveRequest.module.css'
import { Separator } from "@/components/ui/separator"

import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Textarea } from "@/components/ui/textarea"
import { toast, Toaster } from "sonner"


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from 'axios'

const formSchema = z.object({
    comment: z.string(),
    duration: z.string(),
    selectedDates: z.string(),
    leaveType: z.string(),
    email: z.string(),
    status: z.string(),
})

function CreateLeaveRequestPage() {
    
    const userEmails: any[] = [];
    const [recipient, setUserEmails] = React.useState<string[] | undefined>(userEmails);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: "",
            duration: "" ,
            selectedDates: "",
            leaveType: sessionStorage.getItem('leaveType')?.toString(),
            email: sessionStorage.getItem('email')?.toString(),
            status: "pending",
        },
    })
    
    function getRecipients() {
        const url = 'http://localhost:3001/home/findAllUsers'
        const users = axios.get(url)
        .then((res) => {
            const users = res.data.users;
            // console.log(users)
            const list : any[] = []
            users.map((user) => {
                userEmails.push(user.email);
            });
            console.log(list)
            setUserEmails(list);
            console.log("recipients",recipient);
        })
    }
    function onSubmit(values: z.infer<typeof formSchema>) {
        const selectedDays: string[] = [];
        days?.map((day) => {
            selectedDays.push(day.toString().replace('00:00:00 GMT+0530 (India Standard Time)', ''));
        });

        values.selectedDates = selectedDays.toString();

        const url = 'http://localhost:3001/leave/createRequest';
        const leave = axios.post(url, values)
        .then((res) => {
            toast.success('Successfully Created a Leave Request');
            window.location.reload();
        }).catch((err) =>{
            toast.error(err.message);
        })
    }
    const initialDays: Date[] | undefined = [];
    const [days, setDays] = React.useState<Date[] | undefined>(initialDays);


    const clearDates = () => {
        setDays([]);
    }

    const footer =
        days && days.length > 0 ? (
            <div>
                <Button variant="outline" className={styles.clearbtn} onClick={() => clearDates()}>
                    Clear Dates
                </Button>
                <p>You selected {days.length} day(s).</p>
            </div>
        ) : (
            <p>Please pick one or more days.</p>
        );

        useEffect(() => {
            getRecipients();
        }, []);

    return (
        <div>
            <main>
                <Toaster richColors position="top-right" />
                <div className={styles.container}>
                    <div className='mx-5'>
                        <Label className='text-3xl font-bold'>Apply Leave</Label>
                    </div>
                    <Separator className="my-4" />
                    <div className={styles.left}>
                        <div className='my-5 mx-5'>
                            <Label className='text-xl'>Select Dates</Label>
                        </div>
                        <div className={styles.calender}>
                            <Calendar

                                mode="multiple"
                                selected={days}
                                onSelect={setDays}
                                className="rounded-md"
                                footer={footer}
                            />
                        </div>
                        <div className={styles.bottommargin}>
                            {days.map((days) =>
                                <Badge variant="outline" className={styles.badges}>
                                    {(days).toString().replace('00:00:00 GMT+0530 (India Standard Time)', '')}
                                </Badge>
                            )}
                        </div>
                        <div className="w-full ml-auto mr-auto max-w-sm items-center space-x-2 mt-7 mb-9">
                            {/* <Form {...form}>
                                <form className="space-y-6">
                                    <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel className='w-2/4 mt-auto mb-auto text-base'>Select Recipient</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {userEmails.map((userEmail) => {
                                                    <SelectItem value={userEmail}>{userEmail}</SelectItem>
                                                })
                                                }x
                                            </SelectContent>
                                        </Select>
                                        </FormItem>
                                    )}
                                    />
                                </form>
                            </Form> */}
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.requestForm}>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <div>
                                        <FormLabel className='text-xl'>Select Duration</FormLabel>
                                    </div>
                                    <div style={{marginTop: '10px'}} className={styles.durationdiv}>
                                        <FormField
                                        control={form.control}
                                        name="duration"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel className='w-2/4'>Select Duration</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="" />
                                                </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                <SelectItem value="Half Day">Half Day</SelectItem>
                                                <SelectItem value="Full Day">Full Day</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            </FormItem>
                                        )}
                                        />
                                    </div>
                                    <div style={{marginTop: '10px'}}>
                                        <FormField
                                            control={form.control}
                                            name="comment"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Comment</FormLabel>
                                                    <FormControl>
                                                        <Textarea className='' placeholder="Add message" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div style={{marginTop: '20px'}}>
                                        <FormLabel>Leave Summary</FormLabel>
                                    </div>
                                    <div style={{marginTop: '10px'}} className="flex w-full max-w-sm items-center space-x-2">
                                        <FormField
                                            control={form.control}
                                            name="leaveType"
                                            render={({ field }) => (
                                                <FormItem className='contents'>
                                                    <FormLabel className='w-2/4'>Leave Type</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="leave Type" {...field} disabled />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div style={{marginTop: '10px'}} className="flex w-full max-w-sm items-center space-x-2">
                                        <FormField
                                            control={form.control}
                                            name="duration"
                                            render={({ field }) => (
                                                <FormItem className='contents'>
                                                    <FormLabel className='w-2/4'>Duration</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Duration" {...field} disabled />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div style={{marginTop: '10px'}} className="flex w-full max-w-sm items-center space-x-2">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem className='contents'>
                                                    <FormLabel className='w-2/4'>Recipient</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Recipient" {...field} disabled />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div style={{marginTop: '10px'}}>
                                        <Button type="submit" className={styles.footerbtnssubmit} onClick={() => form.handleSubmit(onSubmit)}>Submit</Button>
                                        <Button className={styles.footerbtnscancel}>Cancel</Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CreateLeaveRequestPage;
