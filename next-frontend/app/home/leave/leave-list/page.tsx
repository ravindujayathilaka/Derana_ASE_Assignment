"use client";

import React, { useEffect, useState } from 'react'
import styles from "../../dashboard/dashboard.module.css";
import {
    Card,
    CardContent
} from "@/components/ui/card"

import { LeaveRequest, columns } from "./table/columns"
import { DataTable } from './table/data-table';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import axios from 'axios';
import { handleAuthSSR } from '@/app/utils/auth';

function LeaveListPage() {
    
    const [leaveData, setLeaveData] = useState([]);

    async function getAllRequests() {
        const url = 'http://localhost:3001/leave/getAllRequest'

        const response = await axios.get(url);
        setLeaveData(response.data.leaves);
    }

    useEffect( () => {
        handleAuthSSR();
        getAllRequests();
    }, []);

    return (
        <div>
            <main className={styles.maincls}>
                <div className={styles.cardtable}>
                    <div style={{ padding: '30px'}}>
                        <div className='mx-5'>
                            <Label className='text-3xl font-bold'>Leave List</Label>
                        </div>
                        <Separator className="my-4" />
                        <div style={{ margin: '10px' }}>
                            <Card className='border-none'>
                                <CardContent>
                                    <div className="container mx-auto py-10">
                                        <DataTable columns={columns} data={leaveData} />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default LeaveListPage
