'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axiosClient from '@/lib/axiosClient';
import {useAuth} from "@/app/components/AuthProvider";

export default function NewReceivingVesselPage() {
    const { user } = useAuth()
    const [companies, setCompanies] = useState([])
    const router = useRouter();

    const [form, setForm] = useState({
        name: '',
        imo: '',
        serialNo: '',
        sbNo: '',
        s3Key: '',
        type: '',
        companyId: '',
        userId: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axiosClient.post('/api/receiving-vessel-company', form);
            router.push('/admin/receiving-vessel-company');
        } catch (error) {
            alert('Failed to create receiving vessel');
            console.error(error);
        }
    };
    useEffect(() => {
        const fetchCompanies = async () => {
            const res = await axiosClient.get(`/companies`)
            if (res.status >= 200 && res.status < 300) {
                setCompanies(res.data)
            }
        }
        fetchCompanies()
    }, [])
    return (
        <div className="p-6 max-w-3xl">
            <h1 className="text-xl font-semibold mb-6">New Receiving Vessel</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Name" name="name" value={form.name} onChange={handleChange} />
                <Input label="IMO (optional)" name="imo" value={form.imo} onChange={handleChange} />
                <Input label="Serial No (UEN) *" name="serialNo" value={form.serialNo} onChange={handleChange} />
                <Input label="SB No (optional)" name="sbNo" value={form.sbNo} onChange={handleChange} />
                <Input label="Type" name="type" value={form.type} onChange={handleChange} />
                <div>
                    <label className="block text-sm font-medium">Company *</label>
                    <select
                        name="companyId"
                        value={user?.companyId}
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
                <Input label="Chief Engineer" name="userId" value={form.userId} onChange={handleChange} />

                <div className="flex gap-4 pt-4">
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
                        Create
                    </button>
                    <button
                        type="button"
                        className="text-sm text-gray-600"
                        onClick={() => router.push('/admin/receiving-vessel-company')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

function Input({
                   label,
                   name,
                   value,
                   onChange,
               }: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                className="w-full border px-3 py-2 rounded"
                required
            />
        </div>
    );
}
