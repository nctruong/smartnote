'use client'

import {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'
import axiosClient from "@/lib/axiosClient";

export default function NewUserPage() {
    const router = useRouter()
    const [companies, setCompanies] = useState([])
    const [form, setForm] = useState({
        email: '',
        companyId: '',
        role: 'MEMBER',
        invited: false,
        password: '',
        passwordConfirmation: '',
    })

    useEffect(() => {
        const fetchCompanies = async () => {
            const res = await axiosClient.get(`/companies`)
            if (res.status >= 200 && res.status < 300) {
                setCompanies(res.data)
            }
        }
        fetchCompanies()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target
        let val: string | boolean = type === 'checkbox' ? checked : value;
        if (name === 'role') {
            val = value.toUpperCase(); // force MEMBER or ADMIN
        }

        setForm((prev) => ({
            ...prev,
            [name]: val,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const { passwordConfirmation, ...rest } = form
        const res = await axiosClient.post('/users', rest)
        if (res.status >= 200 && res.status < 300) {
            router.push('/admin/users')
        }
        // router.push('/admin/users')
    }

    return (
        <div className="max-w-3xl">
            <h1 className="text-xl font-semibold mb-6">New User</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                        name="companyId"
                        value={form.companyId}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">Select Company</option>
                        {companies.map((company) => (
                            <option value={company.id}>{company.name}</option>
                        ))}
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

                {/* Active + Invite checkboxes */}
                <div className="space-x-4">

                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            name="invited"
                            checked={form.invited}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        Send invite email
                    </label>
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium">Password *</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2 bg-blue-50"
                    />
                </div>

                {/* Password confirmation */}
                <div>
                    <label className="block text-sm font-medium">Password confirmation</label>
                    <input
                        type="password"
                        name="passwordConfirmation"
                        value={form.passwordConfirmation}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
                    >
                        Create User
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

        </div>
    )
}
