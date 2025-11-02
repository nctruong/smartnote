'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axiosClient from '@/lib/axiosClient';

type Company = {
    name: string;
};

export default function NewCompany() {
    const { register, handleSubmit, reset } = useForm<Company>();
    const router = useRouter();

    const onSubmit = async (data: Company) => {
        try {
            const res = await axiosClient.post('/companies', data);

            if (res.status >= 200 && res.status < 300) {
                router.push('/admin/companies'); // Redirect to company list
            } else {
                alert(`Failed to create company: ${JSON.stringify(res)}`);
            }
        } catch (error) {
            alert(`Error: ${error}`);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
            <div>
                <label className="block font-semibold">Name</label>
                <input
                    {...register('name', { required: true })}
                    className="border px-2 py-1 w-full"
                />
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Save Company
            </button>
        </form>
    );
}
