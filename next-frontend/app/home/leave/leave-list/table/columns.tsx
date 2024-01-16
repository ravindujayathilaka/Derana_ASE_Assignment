"use client"

import { ColumnDef } from "@tanstack/react-table"

import {
    Card,
    CardContent,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Separator } from "@/components/ui/separator"
import styles from "../leavelist.module.css"
import { Badge } from "@/components/ui/badge"

export type LeaveRequest = {
    _id: String,
    leaveType: String,
    duration: String,
    leaveDates: String,
    email: String,
    comment: String,
    status: String,
}

import axios from "axios";
import Image from 'next/image';

import casualImage from '../../../../../public/casualLeave.png'
import annualImage from '../../../../../public/annualLeave.png'
import medicalImage from '../../../../../public/medicalLeave.jpg'
import customImage from '../../../../../public/customLeave.jpg'
import { toast } from "sonner"

export const columns: ColumnDef<LeaveRequest>[] = [
    {
        accessorKey: "_id",
        header: "Id",
    },
    {
        accessorKey: "leaveType",
        header: "Leave Type",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => {

            const leaveRequest = row.original;

            let backgroundColor;

            switch (leaveRequest.status.toLowerCase()) {
                case 'accept':
                backgroundColor = 'green';
                break;
                case 'reject':
                backgroundColor = 'red';
                break;
                case 'pending':
                backgroundColor = 'orange';
                break;
                default:
                backgroundColor = 'black'; // default color, you can change it as needed
                break;
            }

            return (
                <div>
                    <Badge style={{backgroundColor}} className="text-sm">{leaveRequest.status}</Badge>
                </div>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {

            
            async function leaveCount(email: any, type: any, count: any) {
                
                const value = {
                    email,
                    type,
                    count,
                }
                const url = 'http://localhost:3001/home/updateLeaveCount'
                
                const response = await axios.put(url, value);
                sessionStorage.setItem('requestcasual', response.data.updatedDocument.casual)
                sessionStorage.setItem('requestannual', response.data.updatedDocument.annual)
                sessionStorage.setItem('requestmedical', response.data.updatedDocument.medical)
                sessionStorage.setItem('requestcustom', response.data.updatedDocument.custom)
                
                
            }

            async function acceptRequest(){
                const url = `http://localhost:3001/leave/acceptRequest/${leaveRequest._id}`

                const response = await axios.put(url);

                if(response){
                    leaveCount(leaveRequest.email, leaveRequest.leaveType, (leaveRequest.leaveDates).split(',').length);
                    toast.success("Leave Accepted");
                    window.location.reload();
                }
            }
            
            async function rejectRequest(){
                const url = `http://localhost:3001/leave/rejectRequest/${leaveRequest._id}`
                
                const response = await axios.put(url);
                if(response){
                    toast.error("Leave Rejected");
                    window.location.reload();
                }
            }
            
            async function deleteRequest(value:any) {
                const url = `http://localhost:3001/leave/deleteRequest/${value}`
                
                const response = await axios.delete(url);
                if(response){
                    toast.error("Leave Request Deleted");
                    window.location.reload();
                    
                }
            }
            
            let responseDetails: any;
            
            async function getUserData() {
                
                const url = 'http://localhost:3001/home/findUserWithEmail';
                
                const value: any = {
                    email: leaveRequest.email,
                }
                const response = await axios.post(url, value);

                responseDetails = response.data.users
                
            }
            
            console.log("requestcasual", responseDetails);
            // let requestannual: Number = responseDetails.annual;
            // let requestcasual: Number = responseDetails.casual;
            // let requestmedical: Number = responseDetails.medical;
            // let requestcustom: Number = responseDetails.custom;
            let requestannual: Number;
            let requestcasual: Number;
            let requestmedical: Number;
            let requestcustom: Number ;

            const leaveRequest = row.original

            const duration = (leaveRequest.leaveDates).split(',').length;
            const first = (leaveRequest.leaveDates).split(',')[0];
            const last = (leaveRequest.leaveDates).split(',')[duration - 1]

            let backgroundColor;

            switch (leaveRequest.status.toLowerCase()) {
                case 'accept':
                backgroundColor = 'green';
                break;
                case 'reject':
                backgroundColor = 'red';
                break;
                case 'pending':
                backgroundColor = 'orange';
                break;
                default:
                backgroundColor = 'black'; // default color, you can change it as needed
                break;
            }
            return (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className={styles.morebtn} onClick={() => getUserData()}>More...</Button>
                    </DialogTrigger>
                        <Button className={styles.deletebtn} onClick={() => deleteRequest(leaveRequest._id)}>Delete</Button>
                    <DialogContent className="sm:max-w-2xl">
                        <DialogHeader>
                            <DialogTitle className='text-2xl'>Approve Leave</DialogTitle>
                        <Separator />
                        </DialogHeader>
                        <div className="flex justify-between">
                            <div className={styles.usernamediv}>
                                <div className="hidden md:block">
                                    <div className="h-20 w-20 rounded-full bg-zinc-300 flex items-center justify-center text-center">
                                        <span className="font-semibold text-base">HQ</span>
                                    </div>
                                </div>
                                <div className="hidden md:block mr-2 mt-auto mb-auto ml-4">
                                    <div>
                                        <span className="font-bold text-base flex ">{sessionStorage.getItem('user')}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex mt-auto mb-auto">
                                <div className="mr-3 text-sm font-bold mt-auto mb-auto">Status</div>
                                <div>
                                    <Badge style={{backgroundColor}} className="text-sm">{leaveRequest.status}</Badge>
                                </div>
                            </div>
                        </div>
                        <div>
                            <span className="font-bold text-sm flex ">Leave Summary</span>
                        </div>
                        <div className='flex'>
                            <div className='flex mr-10'>
                                <div>
                                    <span className="text-sm font-bold">Leave Type : </span>
                                </div>
                                <div>
                                    <span className="text-sm ml-1">{leaveRequest.leaveType}</span>
                                </div>
                            </div>
                            <div className='flex ml-10 mr-10 mb-10'>
                                <div>
                                    <span className="text-sm font-bold">Duration : </span>
                                </div>
                                <div>
                                    <span className="text-sm ml-1">{duration}</span>
                                </div>
                            </div>
                            <div className='flex ml-10'>
                                <div>
                                    <span className="text-sm font-bold">Recipient : </span>
                                </div>
                                <div>
                                    <span className="text-sm ml-1">{leaveRequest.email}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2">
                                <span className="font-bold text-sm flex ">Leave Summary</span>
                            </div>
                            <Separator />
                            <div className='flex mt-5'>
                                <div>
                                    <span className="text-sm font-bold">Leave Days : </span>
                                </div>
                                <div>
                                    <span className="text-sm ml-2">{first + " to " + last}</span>
                                </div>
                            </div>
                            <div className='border h-20 p-3 mt-3'>
                                <p>{leaveRequest.comment}</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span className="font-bold text-sm flex ">Remaining Leaves</span>
                            </div>
                            <div>
                                <Card>
                                    <CardContent className="p-0">
                                        <div className='mr-auto ml-auto'>
                                            <div className={styles.innercard2}>
                                                <div className='ml-auto mr-auto mt-auto mb-auto'>
                                                    <Image
                                                        src={casualImage}
                                                        width={20}
                                                        height={20}
                                                        alt="Picture of the author"
                                                        />
                                                </div>
                                                <div>
                                                    <div>
                                                        <span className="font-bold text-base flex ">Casual</span>
                                                    </div>
                                                    <div className='flex'>
                                                        <span className="font-bold text-base flex ">{requestcasual}</span>
                                                        <span className="text-sm flex mt-auto mb-0">/7</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-xs">Available</span>
                                                    </div>
                                                </div>
                                                <Separator orientation="vertical" style={{border: '1px solid lightgray', marginLeft: '10px'}}/>
                                            </div>
                                            <div className={styles.innercard2}>
                                                <div className='ml-auto mr-auto mt-auto mb-auto'>
                                                    <Image
                                                        src={annualImage}
                                                        width={20}
                                                        height={20}
                                                        alt="Picture of the author"
                                                        />
                                                </div>
                                                <div>
                                                    <div>
                                                        <span className="font-bold text-base flex ">Annual</span>
                                                    </div>
                                                    <div className='flex'>
                                                        <span className="font-bold text-base flex ">{requestannual}</span>
                                                        <span className="text-sm flex mt-auto mb-0">/7</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-xs">Available</span>
                                                    </div>
                                                </div>
                                                <Separator orientation="vertical" style={{border: '1px solid lightgray', marginLeft: '10px'}}/>
                                            </div>
                                            <div className={styles.innercard2}>
                                                <div className=' mr-1 mt-auto mb-auto'>
                                                    <Image
                                                        src={medicalImage}
                                                        width={20}
                                                        height={20}
                                                        alt="Picture of the author"
                                                        />
                                                </div>
                                                <div>
                                                    <div>
                                                        <span className="font-bold text-base flex ">Medical</span>
                                                    </div>
                                                    <div className='flex'>
                                                        <span className="font-bold text-base flex ">{requestmedical}</span>
                                                        <span className="text-sm flex mt-auto mb-0">/7</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-xs">Available</span>
                                                    </div>
                                                </div>
                                                <Separator orientation="vertical" style={{border: '1px solid lightgray', marginLeft: '10px'}}/>
                                            </div>
                                            <div className={styles.innercard2}>
                                                <div className='ml-auto mr-auto mt-auto mb-auto'>
                                                    <Image
                                                        src={customImage}
                                                        width={20}
                                                        height={20}
                                                        alt="Picture of the author"
                                                        />
                                                </div>
                                                <div>
                                                    <div>
                                                        <span className="font-bold text-base flex ">Custom</span>
                                                    </div>
                                                    <div className='flex'>
                                                        <span className="font-bold text-base flex ">{requestcustom}</span>
                                                        <span className="text-sm flex mt-auto mb-0">/7</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-xs">Available</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        <DialogFooter className="sm:justify-start">
                            <Button type="button" className={styles.footerbtnsaccept} onClick={() => acceptRequest()}>
                                Accept Leave
                            </Button>
                            <Button type="button" className={styles.footerbtnsreject} onClick={() => rejectRequest()}>
                                Reject Leave
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )
        },
    },
]
