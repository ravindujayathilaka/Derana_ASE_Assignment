"use client";

import React, { useEffect, useState } from 'react'
import styles from "./dashboard.module.css";
import {
    Card,
    CardContent
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"

import Image from 'next/image'

import { LeaveRequest, columns } from "./table/columns"
import { DataTable } from './table/data-table';
import { Button } from "@/components/ui/button";

import { ChevronRight, X } from 'lucide-react';
import { handleAuthSSR } from '@/app/utils/auth';
import axios from 'axios';

import casualImage from '../../../public/casualLeave.png'
import annualImage from '../../../public/annualLeave.png'
import medicalImage from '../../../public/medicalLeave.jpg'
import customImage from '../../../public/customLeave.jpg'
import { Separator } from '@radix-ui/react-separator';

function DashboardPage() {

    const [leaveData, setLeaveData] = useState([]);

    async function getAllRequests() {
        const url = 'http://localhost:3001/leave/getAllRequest'

        const response = await axios.get(url);
        const filtered = response.data.leaves.filter((leave) => leave.email === sessionStorage.getItem('email'))
        setLeaveData(filtered);
    }

    function createRequest(value: string) {
        sessionStorage.setItem('leaveType', value);
        location.replace('http://localhost:3000/home/leave/create-leave-request')
    }
    useEffect( () => {
        handleAuthSSR();
        getAllRequests();
    }, []);
    
    
    return (
        <div>
            <main className={styles.maincls}>
                <div className={styles.card1}>
                    <div className={styles.carddiv}>
                        <div className={styles.cardlable}>
                            Leave Allocation
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className={styles.cardbtn}>
                                        <Button variant="outline" className={styles.applyleavebtn}>
                                            Apply Leave <ChevronRight />
                                        </Button>
                                    </div>
                                    {/* <Button variant="outline">Edit Profile</Button> */}
                                </DialogTrigger>
                                <DialogContent className="max-w-6xl">
                                    <DialogHeader>
                                        <DialogTitle>Select the Leave Type</DialogTitle>
                                    </DialogHeader>
                                    <div className={styles.dialogcard}>
                                        <div className={styles.dialoginnercard2}>
                                            <div className={styles.clickhover} onClick={() => createRequest('casual')}>
                                                <div className='ml-auto mr-auto mt-auto mb-auto'>
                                                    <Image
                                                        src={casualImage}
                                                        width={60}
                                                        height={60}
                                                        alt="Picture of the author"
                                                        />
                                                </div>
                                                <div>
                                                    <div>
                                                        <span className="font-bold text-3xl flex ">Casual</span>
                                                    </div>
                                                    <div className='flex'>
                                                        <span className="font-bold text-4xl flex ">{sessionStorage.getItem('casual')}</span>
                                                        <span className="text-sm flex mt-auto mb-0">/7</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-xs">Available</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Separator orientation="vertical" style={{border: '1px solid lightgray', marginLeft: '40px'}}/>
                                        </div>
                                        <div className={styles.dialoginnercard2}>
                                            <div className={styles.clickhover} onClick={() => createRequest('annual')}>
                                                <div className='ml-auto mr-auto mt-auto mb-auto'>
                                                    <Image
                                                        src={annualImage}
                                                        width={60}
                                                        height={60}
                                                        alt="Picture of the author"
                                                        />
                                                </div>
                                                <div>
                                                    <div>
                                                        <span className="font-bold text-3xl flex ">Annual</span>
                                                    </div>
                                                    <div className='flex'>
                                                        <span className="font-bold text-4xl flex ">{sessionStorage.getItem('annual')}</span>
                                                        <span className="text-sm flex mt-auto mb-0">/7</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-xs">Available</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Separator orientation="vertical" style={{border: '1px solid lightgray', marginLeft: '40px'}}/>
                                        </div>
                                        <div className={styles.dialoginnercard2}>
                                            <div className={styles.clickhover} onClick={() => createRequest('medical')}>
                                                <div className=' mr-auto ml-auto mt-auto mb-auto'>
                                                    <Image
                                                        src={medicalImage}
                                                        width={60}
                                                        height={60}
                                                        alt="Picture of the author"
                                                        />
                                                </div>
                                                <div>
                                                    <div>
                                                        <span className="font-bold text-3xl flex ">Medical</span>
                                                    </div>
                                                    <div className='flex'>
                                                        <span className="font-bold text-4xl flex ">{sessionStorage.getItem('medical')}</span>
                                                        <span className="text-sm flex mt-auto mb-0">/7</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-xs">Available</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Separator orientation="vertical" style={{border: '1px solid lightgray', marginLeft: '40px'}}/>
                                        </div>
                                        <div className={styles.dialoginnercard2}>
                                            <div className={styles.clickhover} onClick={() => createRequest('custom')}>
                                                <div className='ml-auto mr-auto mt-auto mb-auto'>
                                                    <Image
                                                        src={customImage}
                                                        width={60}
                                                        height={60}
                                                        alt="Picture of the author"
                                                        />
                                                </div>
                                                <div>
                                                    <div>
                                                        <span className="font-bold text-3xl flex ">Custom</span>
                                                    </div>
                                                    <div className='flex'>
                                                        <span className="font-bold text-4xl flex ">{sessionStorage.getItem('custom')}</span>
                                                        <span className="text-sm flex mt-auto mb-0">/7</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-xs">Available</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="outline" className={styles.cancelbtn}>
                                                Cancel <X size={20} className={styles.cancelicon} />
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <Card>
                        <CardContent className='mr-auto ml-auto '>
                            <div className={styles.innercard2}>
                                <div className='ml-auto mr-auto mt-auto mb-auto'>
                                    <Image
                                        src={casualImage}
                                        width={50}
                                        height={50}
                                        alt="Picture of the author"
                                        />
                                </div>
                                <div>
                                    <div>
                                        <span className="font-bold text-3xl flex ">Casual</span>
                                    </div>
                                    <div className='flex'>
                                        <span className="font-bold text-4xl flex ">{sessionStorage.getItem('casual')}</span>
                                        <span className="text-sm flex mt-auto mb-0">/7</span>
                                    </div>
                                    <div>
                                        <span className="text-xs">Available</span>
                                    </div>
                                </div>
                                <Separator orientation="vertical" style={{border: '1px solid lightgray', marginLeft: '40px'}}/>
                            </div>
                            <div className={styles.innercard2}>
                                <div className='ml-auto mr-auto mt-auto mb-auto'>
                                    <Image
                                        src={annualImage}
                                        width={60}
                                        height={60}
                                        alt="Picture of the author"
                                        />
                                </div>
                                <div>
                                    <div>
                                        <span className="font-bold text-3xl flex ">Annual</span>
                                    </div>
                                    <div className='flex'>
                                        <span className="font-bold text-4xl flex ">{sessionStorage.getItem('annual')}</span>
                                        <span className="text-sm flex mt-auto mb-0">/7</span>
                                    </div>
                                    <div>
                                        <span className="text-xs">Available</span>
                                    </div>
                                </div>
                                <Separator orientation="vertical" style={{border: '1px solid lightgray', marginLeft: '40px'}}/>
                            </div>
                            <div className={styles.innercard2}>
                                <div className=' mr-1 mt-auto mb-auto'>
                                    <Image
                                        src={medicalImage}
                                        width={70}
                                        height={70}
                                        alt="Picture of the author"
                                        />
                                </div>
                                <div>
                                    <div>
                                        <span className="font-bold text-3xl flex ">Medical</span>
                                    </div>
                                    <div className='flex'>
                                        <span className="font-bold text-4xl flex ">{sessionStorage.getItem('medical')}</span>
                                        <span className="text-sm flex mt-auto mb-0">/7</span>
                                    </div>
                                    <div>
                                        <span className="text-xs">Available</span>
                                    </div>
                                </div>
                                <Separator orientation="vertical" style={{border: '1px solid lightgray', marginLeft: '40px'}}/>
                            </div>
                            <div className={styles.innercard2}>
                                <div className='ml-auto mr-auto mt-auto mb-auto'>
                                    <Image
                                        src={customImage}
                                        width={60}
                                        height={60}
                                        alt="Picture of the author"
                                        />
                                </div>
                                <div>
                                    <div>
                                        <span className="font-bold text-3xl flex ">Custom</span>
                                    </div>
                                    <div className='flex'>
                                        <span className="font-bold text-4xl flex ">{sessionStorage.getItem('custom')}</span>
                                        <span className="text-sm flex mt-auto mb-0">/7</span>
                                    </div>
                                    <div>
                                        <span className="text-xs">Available</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className={styles.card2}>
                    <div className={styles.cardlable2}>My Leave Requests</div>
                    <Card>
                        <CardContent>
                            <div className="container mx-auto py-10">
                                <DataTable columns={columns} data={leaveData} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}

export default DashboardPage
