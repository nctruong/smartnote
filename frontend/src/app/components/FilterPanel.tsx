'use client'

import { useState } from 'react'

export default function FilterPanel({ onFilter }: { onFilter: (f: any) => void }) {
    const [email, setEmail] = useState('')
    const [company, setCompany] = useState('')

    return (
        <aside className="w-64 border rounded p-4 bg-white">
            <h2 className="text-md font-semibold mb-4">Filters</h2>
            <div className="mb-4">
                <label className="block text-xs text-gray-500 mb-1">Email</label>
                <input
                    className="w-full border px-2 py-1 rounded text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-xs text-gray-500 mb-1">Company</label>
                <select
                    className="w-full border px-2 py-1 rounded text-sm"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                >
                    <option value="">Any</option>
                    <option>Hong Lam Receiving Vessel</option>
                    <option>Trust Ship Mgmt Pte Ltd</option>
                </select>
            </div>
            <div className="flex gap-2">
                <button
                    className="bg-blue-600 text-white px-3 py-1 text-sm rounded"
                    onClick={() => onFilter({ email, company })}
                >
                    Filter
                </button>
                <button
                    className="text-sm px-2 py-1 border rounded"
                    onClick={() => {
                        setEmail('')
                        setCompany('')
                        onFilter({ email: '', company: '' })
                    }}
                >
                    Clear Filters
                </button>
            </div>
        </aside>
    )
}
