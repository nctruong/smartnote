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

                <div className="overflow-x-auto rounded">
                    <table className="min-w-full table-auto border border-gray-200 shadow-sm rounded-lg text-sm">
                        <thead className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wider">
                        <tr>
                            <th className="p-3 text-left"><input type="checkbox" className="accent-blue-500"/></th>
                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">Company</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Role</th>
                            <th className="p-3 text-left">Verified</th>
                            <th className="p-3 text-left">Bunker Tanker</th>
                            <th className="p-3 text-left">Vessel</th>
                            <th className="p-3 text-left">IMO</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="p-3"><input type="checkbox" className="accent-blue-500"/></td>
                                <td className="p-3 font-medium text-blue-600">{user.id}</td>
                                <td className="p-3 text-blue-600">{user.company.name}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3">{user.role}</td>
                                <td className="p-3">
          <span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
            Yes
          </span>
                                </td>
                                <td className="p-3 text-gray-700">
                                    {user.bunkerTankers?.map((bunker: BunkerTanker) => bunker.name).join(', ')}
                                </td>
                                <td className="p-3">{user.vessel}</td>
                                <td className="p-3">{user.imo}</td>
                                <td className="p-3 space-x-2 whitespace-nowrap">
                                    <Link href={`/admin/users/${user.id}/edit`}
                                          className="text-blue-600 hover:underline">
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => setInviteEmail(user.email)}
                                        className="text-blue-500 hover:underline"
                                    >
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
                const {email, company} = filters
                setFilteredUsers(
                    users.filter(user =>
                        (!email || user.email.includes(email)) &&
                        (!company || user.company === company)
                    )
                )
            }}/>
            {inviteEmail && (
                <InviteModal
                    email={inviteEmail}
                    onClose={() => setInviteEmail(null)}
                />
            )}
        </div>

    )
}
