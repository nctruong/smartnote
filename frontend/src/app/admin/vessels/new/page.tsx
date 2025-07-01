'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosClient from '@/lib/axiosClient';

export default function NewReceivingVesselPage() {
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

    return (
        <div className="p-6 max-w-3xl">
            <h1 className="text-xl font-semibold mb-6">New Receiving Vessel Company</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Name" name="name" value={form.name} onChange={handleChange} />
                <Input label="IMO" name="imo" value={form.imo} onChange={handleChange} />
                <Input label="Serial No (UEN)" name="serialNo" value={form.serialNo} onChange={handleChange} />
                <Input label="SB No" name="sbNo" value={form.sbNo} onChange={handleChange} />
                <Input label="S3 Key" name="s3Key" value={form.s3Key} onChange={handleChange} />
                <Input label="Type" name="type" value={form.type} onChange={handleChange} />
                <Input label="Company ID" name="companyId" value={form.companyId} onChange={handleChange} />
                <Input label="User ID" name="userId" value={form.userId} onChange={handleChange} />

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
