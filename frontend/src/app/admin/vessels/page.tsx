'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axiosClient from '@/lib/axiosClient';

type ReceivingVessel = {
    id: string;
    name: string;
    serialNo: string; // Assuming serialNo is UEN
};

export default function ReceivingVesselCompanyPage() {
    const [data, setData] = useState<ReceivingVessel[]>([]);
    const [filters, setFilters] = useState({ name: '', serialNo: '' });

    useEffect(() => {
        const fetch = async () => {
            const res = await axiosClient.get('/receiving-vessels', {
                params: filters,
            });
            setData(res.data);
        };
        fetch();
    }, [filters]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const clearFilters = () => {
        setFilters({ name: '', serialNo: '' });
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold">Receiving Vessels</h1>
                <Link
                    href="/admin/vessels/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
                >
                    New Receiving Vessel
                </Link>
            </div>

            {/* Filters */}
            <div className="flex gap-4 mb-4">

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={filters.name}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                />
                <button
                    onClick={clearFilters}
                    className="px-3 py-2 border rounded bg-gray-100 text-sm"
                >
                    Clear Filters
                </button>
            </div>

            {/* Table */}
            <table className="w-full text-sm border">
                <thead>
                <tr className="bg-gray-100 text-left">
                    <th className="p-2">Name</th>
                    <th className="p-2">UEN</th>
                    <th className="p-2 text-right">Actions</th>
                </tr>
                </thead>
                <tbody>
                {data.length === 0 ? (
                    <tr>
                        <td colSpan={3} className="text-center py-4 text-gray-400">
                            No receiving vessels found
                        </td>
                    </tr>
                ) : (
                    data.map((item) => (
                        <tr key={item.id} className="border-t">
                            <td className="p-2">{item.name}</td>
                            <td className="p-2">{item.serialNo}</td>
                            <td className="p-2 text-right space-x-2">
                                <Link href={`/admin/receiving-vessel-company/${item.id}`}>View</Link>
                                <Link href={`/admin/receiving-vessel-company/${item.id}/edit`}>Edit</Link>
                                <button
                                    onClick={async () => {
                                        if (confirm('Are you sure?')) {
                                            await axiosClient.delete(`/api/receiving-vessel-company/${item.id}`);
                                            setData((prev) => prev.filter((x) => x.id !== item.id));
                                        }
                                    }}
                                    className="text-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}
