'use client'

import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import axiosClient from "@/lib/axiosClient";

interface User {
    id: number,
    email: string,
    name: string,
    role: string,
    company: {
        id: number,
        name: string,
    },
    password: string,
    passwordConfirm: string,
}
export default function EditUserPage() {
    const [user, setUser] = useState({} as User)
    const router = useRouter()
    const { id } = useParams()

    const [loading, setLoading] = useState(true)
    const [form, setForm] = useState({
        email: '',
        role: 'MEMBER'
    })

    // Fetch user by ID
    useEffect(() => {
        async function fetchUser() {
            const res = await axiosClient.get(`http://localhost:3001/users/${id}`);
            setUser(res.data);
            setLoading(false);
        }

        fetchUser();
    }, [id])

    useEffect(() => {
        setForm({
            email: user.email,
            role: user.role
        })
    }, [user])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log(`form: ${JSON.stringify(form)}`)
        await axiosClient.put(`http://localhost:3001/users/${id}`, {
            body: JSON.stringify(form),
        })

        router.push('/admin/users')
    }

    if (loading) return <p className="p-4">Loading...</p>

    return (
        <div className="max-w-3xl">
            <h1 className="text-xl font-semibold mb-6">Edit User</h1>
            {user && (<form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                    <label className="block text-sm font-medium">Email *</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2 bg-blue-50"
                    />
                </div>

                {/* Company */}
                <div>
                    <label className="block text-sm font-medium">Company *</label>
                    <select
                        name="company"
                        value={user.company?.id}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value={user.company?.id}>{user.company?.name}</option>
                    </select>
                </div>

                {/* Role */}
                <div>
                    <label className="block text-sm font-medium">Role *</label>
                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="MEMBER">Member</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>

                {/* Active checkbox */}
                <div>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            name="active"
                            checked={form?.active}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        Active
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium">New Password</label>
                    <input
                        type="password"
                        name="password"
                        value={''}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 bg-blue-50"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Password confirmation</label>
                    <input
                        type="password"
                        name="passwordConfirmation"
                        value={''}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
                    >
                        Save Changes
                    </button>
                    <button
                        type="button"
                        className="text-sm"
                        onClick={() => router.push('/admin/users')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
            )}
        </div>
    )
}
