'use client'
import { useAuth } from '../components/AuthProvider'

export default function DashboardPage() {
    const { user } = useAuth()

    return (
        <div className="p-4">
            <h1 className="text-2xl">Welcome {user?.email}</h1>
        </div>
    )
}
