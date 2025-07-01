'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import axiosClient from "@/lib/axiosClient";
import { useRouter } from 'next/navigation';

interface Company {
    id: number
    name: string
    uen: string
    companyId: number | null
    createdAt: string
    updatedAt: string
    parent?: Company
}

export default function CompaniesPage() {
    const [companies, setCompanies] = useState<Company[]>([])
    const [nameFilter, setNameFilter] = useState('')
    const [uenFilter, setUenFilter] = useState('')
    const [loading, setLoading] = useState(true)

    const router = useRouter()

    useEffect(() => {
        async function fetchCompanies() {
            const res = await fetch('http://localhost:3001/companies')
            const data = await res.json()
            setCompanies(data)
            setLoading(false)
        }
        fetchCompanies()
    }, [])

    const filteredCompanies = companies.filter(c => {
        return c.name.toLowerCase().includes(nameFilter.toLowerCase())
    })

    const handleDelete = async (id: number) => {
        const res = await axiosClient.delete(`/companies/${id}`)
        if (res.status >= 200 && res.status < 300) {
            router.push('/admin/companies')
        }
    }

    return (
        <div className="p-6">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-semibold">Companies</h1>
                <Link href="/admin/companies/new" className="bg-blue-600 text-white px-4 py-2 rounded">
                    New Company
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 max-w-md">
                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        className="w-full border rounded px-2 py-1"
                        value={nameFilter}
                        onChange={e => setNameFilter(e.target.value)}
                        placeholder="Filter by name"
                    />
                </div>

            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="w-full text-sm border">
                    <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-2 border">ID</th>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Created At</th>
                        <th className="p-2 border">Updated At</th>
                        <th className="p-2 border">Client</th>
                        <th className="p-2 border">UEN</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredCompanies.map(company => (
                        <tr key={company.id} className="border-t">
                            <td className="p-2 border">{company.id}</td>
                            <td className="p-2 border">{company.name}</td>
                            <td className="p-2 border">{new Date(company.createdAt).toLocaleString()}</td>
                            <td className="p-2 border">{new Date(company.updatedAt).toLocaleString()}</td>
                            <td className="p-2 border">
                                {company.parent ? (
                                    <Link href={`/admin/companies/${company.parent.id}`} className="text-blue-600 underline">
                                        {company.parent.name}
                                    </Link>
                                ) : '-'}
                            </td>
                            <td className="p-2 border">{company.uen}</td>
                            <td className="p-2 border space-x-2">
                                <Link href={`/admin/companies/${company.id}/edit`} className="text-blue-600 underline">Edit</Link>
                                <button
                                    className="text-red-600"
                                    onClick={() => handleDelete(company.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
