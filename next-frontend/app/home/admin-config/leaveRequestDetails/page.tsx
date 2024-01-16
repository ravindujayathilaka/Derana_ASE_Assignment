import React from 'react'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import styles from './leaveRequestDetails.module.css';


function LeaveRequestDetailsPage() {
    
    return (
        <div>
            <h2>Leave Request Details Page</h2>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Share</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className='text-2xl'>Approve Leave</DialogTitle>
                    <Separator />
                    </DialogHeader>
                    <div className={styles.usernamediv}>
                        <div className="hidden md:block">
                            <div className="h-20 w-20 rounded-full bg-zinc-300 flex items-center justify-center text-center">
                                <span className="font-semibold text-base">HQ</span>
                            </div>
                        </div>
                        <div className="hidden md:block mr-2 mt-auto mb-auto ml-4">
                            <div>
                                <span className="font-bold text-base flex ">User Name</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span className="font-bold text-sm flex ">Leave Summary</span>
                    </div>
                    <div className='flex'>
                        <div className='flex mr-10'>
                            <div>
                                <span className="text-sm font-bold">Leave Type</span>
                            </div>
                            <div>
                                <span className="text-sm ml-1">Leave Type</span>
                            </div>
                        </div>
                        <div className='flex ml-10 mr-10 mb-10'>
                            <div>
                                <span className="text-sm font-bold">Duration</span>
                            </div>
                            <div>
                                <span className="text-sm ml-1">Leave Type</span>
                            </div>
                        </div>
                        <div className='flex ml-10'>
                            <div>
                                <span className="text-sm font-bold">Recipient</span>
                            </div>
                            <div>
                                <span className="text-sm ml-1">Leave Type</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <span className="font-bold text-sm flex ">Leave Summary</span>
                        </div>
                        <div className='border h-40 p-3'>
                            <p>Reason</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <span className="font-bold text-sm flex ">Remaining Leaves</span>
                        </div>
                        <div>
                            <Card>
                                <CardContent>
                                    <div className={styles.innercard2}>
                                        Casual Leave
                                    </div>
                                    <div className={styles.innercard2}>
                                        Annual Leave
                                    </div>
                                    <div className={styles.innercard2}>
                                        Medical Leave
                                    </div>
                                    <div className={styles.innercard2}>
                                        Custom Leave
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <Button type="button">
                            Accept Leave
                        </Button>
                        <Button type="button" variant="outline">
                            Reject Leave
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default LeaveRequestDetailsPage
