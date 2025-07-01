'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useParams } from 'next/navigation'
import axiosClient from "@/lib/axiosClient";

type Company = {
    id: number;
    name: string;
};

export default function NewCompany({ params }: { params: { id: string } }) {
    const { register, handleSubmit, reset } = useForm<Company>();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const onSubmit = async (data: Company) => {
        const { name } = data
        const res = await axiosClient.post(`/companies/`, {
            name
        });

        if (res.status >= 200 && res.status < 300) {
            router.push('/admin/companies'); // Redirect to company list
        } else {
            alert(`Failed to update company: ${JSON.stringify(res)}`);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
            <div>
                <label className="block font-semibold">Name</label>
                <input {...register('name')} className="border px-2 py-1 w-full" />
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                Save Changes
            </button>
        </form>
    );
}
