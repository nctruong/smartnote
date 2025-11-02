'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useParams } from 'next/navigation';
import axiosClient from "@/lib/axiosClient";

type Company = {
    id: number;
    name: string;
};

export default function EditCompany() {
    const { register, handleSubmit, reset } = useForm<Company>();
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    useEffect(() => {
        if (!id) return;
        const fetchCompany = async () => {
            try {
                const res = await axiosClient.get(`/companies/${id}`);
                reset(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCompany();
    }, [id, reset]);

    const onSubmit = async (data: Company) => {
        try {
            const res = await axiosClient.put(`/companies/${id}`, { name: data.name });
            if (res.status >= 200 && res.status < 300) {
                router.push('/admin/companies');
            } else {
                alert(`Failed to update company: ${JSON.stringify(res)}`);
            }
        } catch (error) {
            alert(`Error: ${error}`);
        }
    };

    if (loading) return <p>Loading...</p>;

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
