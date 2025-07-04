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

    async function fetchCompanies() {
        const res = await axiosClient.get('http://localhost:3001/companies')
        setCompanies(res.data)
        setLoading(false)
    }

    useEffect(() => {

        fetchCompanies()
    }, [])

    const filteredCompanies = companies.filter(c => {
        return c.name.toLowerCase().includes(nameFilter.toLowerCase())
    })

    const handleDelete = async (id: number) => {
        const res = await axiosClient.delete(`/companies/${id}`)
        if (res.status >= 200 && res.status < 300) {
            fetchCompanies()
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
                <table className="min-w-full table-auto border border-gray-200 shadow-sm rounded-lg text-sm">
                    <thead className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wider">
                    <tr>
                        <th className="p-3 text-left">ID</th>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Created At</th>
                        <th className="p-3 text-left">Updated At</th>
                        <th className="p-3 text-left">Client</th>
                        <th className="p-3 text-left">UEN</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredCompanies.map(company => (
                        <tr key={company.id} className="hover:bg-gray-50">
                            <td className="p-3 font-medium text-blue-600">{company.id}</td>
                            <td className="p-3">{company.name}</td>
                            <td className="p-3 text-gray-600">{new Date(company.createdAt).toLocaleString()}</td>
                            <td className="p-3 text-gray-600">{new Date(company.updatedAt).toLocaleString()}</td>
                            <td className="p-3 text-blue-600">
                                {company.parent ? (
                                    <Link href={`/admin/companies/${company.parent.id}`} className="hover:underline">
                                        {company.parent.name}
                                    </Link>
                                ) : (
                                    <span className="text-gray-400 italic">—</span>
                                )}
                            </td>
                            <td className="p-3">{company.uen}</td>
                            <td className="p-3 whitespace-nowrap space-x-3">
                                <Link
                                    href={`/admin/companies/${company.id}/edit`}
                                    className="text-blue-600 hover:underline"
                                >
                                    Edit
                                </Link>
                                <button
                                    className="text-red-600 hover:underline"
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
