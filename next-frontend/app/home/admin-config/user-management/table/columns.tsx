"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import axios from "axios";

export type UserInfo = {
    id: string
    name: string
    username: string
    gender: string
}

function deleteUser(value: any) {
    const url = `http://localhost:3001/home/deleteUser/${value._id}`;

    const deleteUser = axios.delete(url)
    window.location.reload();
    
}

export const columns: ColumnDef<UserInfo>[] = [
    {
        accessorKey: "_id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "department",
        header: "Department",
    },
    {
        accessorKey: "type",
        header: "User Type",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const userInfo = row.original

            return (
                <Button variant="destructive" onClick={() => deleteUser(userInfo)}>Delete User</Button>
            )
        },
    },
]
