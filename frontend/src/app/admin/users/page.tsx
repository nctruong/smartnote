'use client'

import FilterPanel from '@/app/components/FilterPanel'
import {useEffect, useState} from 'react'
import Link from "next/link";
import InviteModal from "@/app/components/InviteModal";
import axiosClient from "@/lib/axiosClient";

const users = [
    {
        id: 36,
        company: 'Hong Lam Receiving Vessel',
        email: 'ksan10@yahoo.com',
        role: 'member',
        verified: true,
        bunker: 'Yes',
        vessel: 'OOCL VALENCIA',
        imo: '9922598',
    },
    // Add more mock users here...
]

interface BunkerTanker {
    name: string
}

export default function AdminUsersPage() {
    const [filteredUsers, setFilteredUsers] = useState(users)
    const [inviteEmail, setInviteEmail] = useState<string | null>(null)

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axiosClient.get(`/users`)
            setFilteredUsers(res.data)
        }
        fetchUsers()
    }, [])

    const handleDelete = async (id: number) => {
        const confirm = window.confirm('Are you sure you want to delete this user?')
        if (!confirm) return

        const res = await fetch(`http://localhost:3001/users/${id}`, {
            method: 'DELETE',
        })

        if (res.ok) {
            setFilteredUsers(prev => prev.filter(user => user.id !== id))
        } else {
            alert('Failed to delete user.')
        }
    }

    return (
        <div className="flex gap-6">
            {/* Main Table */}
            <div className="flex-1">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-semibold">Users</h1>
                    <div className="flex gap-2">
                        <Link href="/admin/users/new">
                            <button className="border px-3 py-1 rounded">New User</button>
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto border rounded">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-2"><input type="checkbox" /></th>
                            <th className="p-2">ID</th>
                            <th className="p-2">Company</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Role</th>
                            <th className="p-2">Verified</th>
                            <th className="p-2">Bunker Tanker</th>
                            <th className="p-2">Vessel</th>
                            <th className="p-2">IMO</th>
                            <th className="p-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="border-t">
                                <td className="p-2"><input type="checkbox" /></td>
                                <td className="p-2 text-blue-600">{user.id}</td>
                                <td className="p-2 text-blue-600">{user.company.name}</td>
                                <td className="p-2">{user.email}</td>
                                <td className="p-2">{user.role}</td>
                                <td className="p-2">
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Yes</span>
                                </td>
                                <td className="p-2">{user.bunkerTankers?.map((bunker: BunkerTanker) => bunker.name).join(', ')}</td>
                                <td className="p-2">{user.vessel}</td>
                                <td className="p-2">{user.imo}</td>
                                <td className="p-2 text-blue-600 space-x-2">
                                    {/*<button>View</button>*/}
                                    <Link href={`/admin/users/${user.id}/edit`} className="text-blue-600">
                                        Edit
                                    </Link>
                                    <button
                                        className="text-red-600"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </button>
                                    <button onClick={() => setInviteEmail(user.email)} className="text-blue-500">
                                        Invite
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Filter Sidebar */}
            <FilterPanel onFilter={(filters) => {
                const { email, company } = filters
                setFilteredUsers(
                    users.filter(user =>
                        (!email || user.email.includes(email)) &&
                        (!company || user.company === company)
                    )
                )
            }} />
            {inviteEmail && (
                <InviteModal
                    email={inviteEmail}
                    onClose={() => setInviteEmail(null)}
                />
            )}
        </div>

    )
}
